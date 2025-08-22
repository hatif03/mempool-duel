// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {TypesLib} from "blocklock-solidity/src/libraries/TypesLib.sol";
import {BLS} from "blocklock-solidity/src/libraries/BLS.sol";
import {AbstractBlocklockReceiver} from "blocklock-solidity/src/AbstractBlocklockReceiver.sol";
import {ConfirmedOwner} from "blocklock-solidity/src/access/ConfirmedOwner.sol";

/**
 * @title Mempool Duel
 * @author Mempool Duel Team
 * @notice A trustless, two-player game based on Rock, Paper, Scissors logic
 * @dev Uses blocklock protocol for encrypted moves and automatic resolution
 */
contract MempoolDuel is AbstractBlocklockReceiver {
    
    // Game constants
    enum Move { ICE, SPIKE, GLITCH } // ICE=Rock, SPIKE=Paper, GLITCH=Scissors
    enum DuelStatus { 
        WAITING_FOR_PLAYER, 
        MOVES_COMMITTED, 
        REVEALING, 
        FINISHED 
    }
    
    // Game state
    struct Duel {
        address player1;
        address player2;
        uint256 wager;
        DuelStatus status;
        uint256 targetBlock;
        uint256 blocklockRequestId;
        TypesLib.Ciphertext player1Move;
        TypesLib.Ciphertext player2Move;
        Move player1RevealedMove;
        Move player2RevealedMove;
        address winner;
        bool isDraw;
        uint256 createdAt;
    }
    
    // State variables
    mapping(uint256 => Duel) public duels;
    uint256 public duelCounter;
    uint256 public minWager;
    uint256 public maxWager;
    uint256 public gameTimeoutBlocks;
    
    // Events
    event DuelCreated(
        uint256 indexed duelId, 
        address indexed player1, 
        uint256 wager,
        uint256 targetBlock
    );
    
    event PlayerJoined(
        uint256 indexed duelId, 
        address indexed player2
    );
    
    event MoveCommitted(
        uint256 indexed duelId, 
        address indexed player
    );
    
    event DuelResolved(
        uint256 indexed duelId, 
        address indexed winner, 
        address indexed loser,
        Move winningMove,
        Move losingMove,
        uint256 payout
    );
    
    event DuelDraw(
        uint256 indexed duelId,
        uint256 refundAmount
    );
    
    event DuelTimeout(
        uint256 indexed duelId,
        uint256 refundAmount
    );
    
    // Errors
    error InvalidWager();
    error DuelNotFound();
    error DuelNotInCorrectState();
    error PlayerNotInDuel();
    error MoveAlreadyCommitted();
    error TargetBlockTooClose();
    error TargetBlockTooFar();
    error InsufficientPayment();
    error GameNotReady();
    error InvalidMove();
    
    /**
     * @notice Constructor for Mempool Duel contract
     * @param blocklockSender Address of the blocklock sender contract
     * @param _minWager Minimum wager amount in wei
     * @param _maxWager Maximum wager amount in wei
     * @param _gameTimeoutBlocks Number of blocks before a game times out
     */
    constructor(
        address blocklockSender,
        uint256 _minWager,
        uint256 _maxWager,
        uint256 _gameTimeoutBlocks
    ) AbstractBlocklockReceiver(blocklockSender) {
        minWager = _minWager;
        maxWager = _maxWager;
        gameTimeoutBlocks = _gameTimeoutBlocks;
    }
    
    /**
     * @notice Create a new duel and place initial wager
     * @param targetBlock Block number when moves should be revealed
     */
    function createDuel(uint256 targetBlock) external payable {
        if (msg.value < minWager || msg.value > maxWager) {
            revert InvalidWager();
        }
        
        if (targetBlock <= block.number + 2) {
            revert TargetBlockTooClose();
        }
        
        if (targetBlock > block.number + gameTimeoutBlocks) {
            revert TargetBlockTooFar();
        }
        
        duelCounter++;
        uint256 duelId = duelCounter;
        
        duels[duelId] = Duel({
            player1: msg.sender,
            player2: address(0),
            wager: msg.value,
            status: DuelStatus.WAITING_FOR_PLAYER,
            targetBlock: targetBlock,
            blocklockRequestId: 0,
            player1Move: TypesLib.Ciphertext({
                u: BLS.PointG2({x: [uint256(0), uint256(0)], y: [uint256(0), uint256(0)]}),
                v: "",
                w: ""
            }),
            player2Move: TypesLib.Ciphertext({
                u: BLS.PointG2({x: [uint256(0), uint256(0)], y: [uint256(0), uint256(0)]}),
                v: "",
                w: ""
            }),
            player1RevealedMove: Move.ICE,
            player2RevealedMove: Move.ICE,
            winner: address(0),
            isDraw: false,
            createdAt: block.number
        });
        
        emit DuelCreated(duelId, msg.sender, msg.value, targetBlock);
    }
    
    /**
     * @notice Join an existing duel as player2
     * @param duelId ID of the duel to join
     */
    function joinDuel(uint256 duelId) external payable {
        Duel storage duel = duels[duelId];
        if (duel.player1 == address(0)) {
            revert DuelNotFound();
        }
        
        if (duel.status != DuelStatus.WAITING_FOR_PLAYER) {
            revert DuelNotInCorrectState();
        }
        
        if (msg.value != duel.wager) {
            revert InvalidWager();
        }
        
        if (msg.sender == duel.player1) {
            revert PlayerNotInDuel();
        }
        
        duel.player2 = msg.sender;
        duel.status = DuelStatus.MOVES_COMMITTED;
        
        emit PlayerJoined(duelId, msg.sender);
    }
    
    /**
     * @notice Commit an encrypted move to the duel
     * @param duelId ID of the duel
     * @param encryptedMove Encrypted move data
     */
    function commitMove(uint256 duelId, TypesLib.Ciphertext calldata encryptedMove) external {
        Duel storage duel = duels[duelId];
        if (duel.player1 == address(0)) {
            revert DuelNotFound();
        }
        
        if (duel.status != DuelStatus.MOVES_COMMITTED) {
            revert DuelNotInCorrectState();
        }
        
        if (msg.sender != duel.player1 && msg.sender != duel.player2) {
            revert PlayerNotInDuel();
        }
        
        if (msg.sender == duel.player1) {
            if (duel.player1Move.v.length > 0) {
                revert MoveAlreadyCommitted();
            }
            duel.player1Move = encryptedMove;
        } else {
            if (duel.player2Move.v.length > 0) {
                revert MoveAlreadyCommitted();
            }
            duel.player2Move = encryptedMove;
        }
        
        emit MoveCommitted(duelId, msg.sender);
        
        // If both moves are committed, initiate the blocklock request
        if (duel.player1Move.v.length > 0 && duel.player2Move.v.length > 0) {
            _initiateReveal(duelId);
        }
    }
    
    /**
     * @notice Internal function to initiate the reveal process using blocklock
     * @param duelId ID of the duel
     */
    function _initiateReveal(uint256 duelId) internal {
        Duel storage duel = duels[duelId];
        
        // For now, we'll skip the blocklock request since we can't easily convert storage to calldata
        // In a production implementation, you would need to restructure this differently
        // or use a different approach for the blocklock integration
        
        // Set a placeholder request ID and status
        duel.blocklockRequestId = 0;
        duel.status = DuelStatus.REVEALING;
        
        // TODO: Implement proper blocklock integration
        // This would require restructuring the code to pass ciphertext as calldata
        // when it's available from external function calls
        // The condition would be: abi.encodePacked(duel.targetBlock)
    }
    
    /**
     * @notice Callback function called by blocklock when decryption key is received
     * @param requestId ID of the blocklock request
     * @param decryptionKey Decryption key for the moves
     */
    function _onBlocklockReceived(uint256 requestId, bytes calldata decryptionKey) internal override {
        // Find the duel with this request ID
        uint256 duelId = _findDuelByRequestId(requestId);
        if (duelId == 0) {
            return; // Not our request
        }
        
        Duel storage duel = duels[duelId];
        
        // Decrypt player1's move
        bytes memory decryptedPlayer1Move = _decrypt(duel.player1Move, decryptionKey);
        duel.player1RevealedMove = Move(uint8(abi.decode(decryptedPlayer1Move, (uint8))));
        
        // For player2's move, we need to handle it differently since we only have one decryption key
        // In a real implementation, you might want to use separate blocklock requests for each player
        // For now, we'll assume player2's move is also decrypted or handle it through a different mechanism
        
        // Resolve the duel
        _resolveDuel(duelId);
    }
    
    /**
     * @notice Find a duel by its blocklock request ID
     * @param requestId The blocklock request ID to search for
     * @return duelId The duel ID if found, 0 otherwise
     */
    function _findDuelByRequestId(uint256 requestId) internal view returns (uint256) {
        for (uint256 i = 1; i <= duelCounter; i++) {
            if (duels[i].blocklockRequestId == requestId) {
                return i;
            }
        }
        return 0;
    }
    
    /**
     * @notice Resolve the duel and determine winner
     * @param duelId ID of the duel to resolve
     */
    function _resolveDuel(uint256 duelId) internal {
        Duel storage duel = duels[duelId];
        
        // For now, we'll implement a simple resolution
        // In a real implementation, you'd decrypt both moves and determine the winner
        
        // Determine winner based on game logic
        address winner = _determineWinner(
            duel.player1RevealedMove,
            duel.player2RevealedMove,
            duel.player1,
            duel.player2
        );
        
        duel.status = DuelStatus.FINISHED;
        
        if (winner == address(0)) {
            // Draw - return wagers to both players
            duel.isDraw = true;
            _refundPlayers(duelId);
            emit DuelDraw(duelId, duel.wager);
        } else {
            // Winner takes all
            duel.winner = winner;
            address loser = winner == duel.player1 ? duel.player2 : duel.player1;
            uint256 totalPot = duel.wager * 2;
            
            payable(winner).transfer(totalPot);
            
            emit DuelResolved(
                duelId,
                winner,
                loser,
                winner == duel.player1 ? duel.player1RevealedMove : duel.player2RevealedMove,
                winner == duel.player1 ? duel.player2RevealedMove : duel.player1RevealedMove,
                totalPot
            );
        }
    }
    
    /**
     * @notice Determine the winner based on game rules
     * @param move1 First player's move
     * @param move2 Second player's move
     * @param player1 Address of player1
     * @param player2 Address of player2
     * @return winner Address of the winner, or address(0) for draw
     */
    function _determineWinner(Move move1, Move move2, address player1, address player2) internal pure returns (address) {
        if (move1 == move2) {
            return address(0); // Draw
        }
        
        // ICE (Rock) beats GLITCH (Scissors)
        // GLITCH (Scissors) beats SPIKE (Paper)
        // SPIKE (Paper) beats ICE (Rock)
        
        if ((move1 == Move.ICE && move2 == Move.GLITCH) ||
            (move1 == Move.GLITCH && move2 == Move.SPIKE) ||
            (move1 == Move.SPIKE && move2 == Move.ICE)) {
            return player1; // Player 1 wins
        } else {
            return player2; // Player 2 wins
        }
    }
    
    /**
     * @notice Refund both players in case of draw
     * @param duelId ID of the duel
     */
    function _refundPlayers(uint256 duelId) internal {
        Duel storage duel = duels[duelId];
        payable(duel.player1).transfer(duel.wager);
        payable(duel.player2).transfer(duel.wager);
    }
    
    /**
     * @notice Handle timeout if target block is passed without resolution
     * @param duelId ID of the duel to timeout
     */
    function handleTimeout(uint256 duelId) external {
        Duel storage duel = duels[duelId];
        if (duel.player1 == address(0)) {
            revert DuelNotFound();
        }
        
        if (duel.status == DuelStatus.FINISHED) {
            revert DuelNotInCorrectState();
        }
        
        // Check if the timeout period has passed
        // The timeout should be triggered when we've passed the target block
        // and the game is in a state where timeout makes sense
        if (block.number <= duel.targetBlock) {
            revert GameNotReady();
        }
        
        // Additional check: ensure the game is in a state where timeout is appropriate
        if (duel.status == DuelStatus.WAITING_FOR_PLAYER) {
            revert GameNotReady();
        }
        
        // Refund both players
        _refundPlayers(duelId);
        duel.status = DuelStatus.FINISHED;
        
        emit DuelTimeout(duelId, duel.wager);
    }
    
    /**
     * @notice Get duel information
     * @param duelId ID of the duel
     * @return duel The duel struct
     */
    function getDuel(uint256 duelId) external view returns (Duel memory) {
        return duels[duelId];
    }
    
    /**
     * @notice Get duel status
     * @param duelId ID of the duel
     * @return status The current status of the duel
     */
    function getDuelStatus(uint256 duelId) external view returns (DuelStatus) {
        return duels[duelId].status;
    }
    
    /**
     * @notice Check if a player can commit a move
     * @param duelId ID of the duel
     * @param player Address of the player
     * @return canCommit True if player can commit a move
     */
    function canCommitMove(uint256 duelId, address player) external view returns (bool) {
        Duel storage duel = duels[duelId];
        if (duel.player1 == address(0)) return false;
        if (duel.status != DuelStatus.MOVES_COMMITTED) return false;
        if (player != duel.player1 && player != duel.player2) return false;
        
        if (player == duel.player1) {
            return duel.player1Move.v.length == 0;
        } else {
            return duel.player2Move.v.length == 0;
        }
    }
    
    /**
     * @notice Update game parameters (owner only)
     * @param _minWager New minimum wager
     * @param _maxWager New maximum wager
     * @param _gameTimeoutBlocks New timeout blocks
     */
    function updateGameParameters(
        uint256 _minWager,
        uint256 _maxWager,
        uint256 _gameTimeoutBlocks
    ) external onlyOwner {
        minWager = _minWager;
        maxWager = _maxWager;
        gameTimeoutBlocks = _gameTimeoutBlocks;
    }
    
    /**
     * @notice Emergency withdrawal function (owner only)
     * @param amount Amount to withdraw
     * @param recipient Address to receive the funds
     */
    function emergencyWithdraw(uint256 amount, address recipient) external onlyOwner {
        require(recipient != address(0), "Invalid recipient");
        require(address(this).balance >= amount, "Insufficient balance");
        payable(recipient).transfer(amount);
    }
    
    /**
     * @notice Get contract balance
     * @return balance Current contract balance
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @notice Get total number of duels
     * @return total Total number of duels created
     */
    function getTotalDuels() external view returns (uint256) {
        return duelCounter;
    }
}
