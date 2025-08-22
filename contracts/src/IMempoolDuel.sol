// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {TypesLib} from "blocklock-solidity/src/libraries/TypesLib.sol";

/**
 * @title IMempoolDuel
 * @author Mempool Duel Team
 * @notice Interface for the Mempool Duel contract
 */
interface IMempoolDuel {
    
    // Enums
    enum Move { ICE, SPIKE, GLITCH }
    enum DuelStatus { 
        WAITING_FOR_PLAYER, 
        MOVES_COMMITTED, 
        REVEALING, 
        FINISHED 
    }
    
    // Structs
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
    
    // Functions
    function createDuel(uint256 targetBlock) external payable;
    function joinDuel(uint256 duelId) external payable;
    function commitMove(uint256 duelId, TypesLib.Ciphertext calldata encryptedMove) external;
    function handleTimeout(uint256 duelId) external;
    
    // View functions
    function getDuel(uint256 duelId) external view returns (Duel memory);
    function getDuelStatus(uint256 duelId) external view returns (DuelStatus);
    function canCommitMove(uint256 duelId, address player) external view returns (bool);
    function getTotalDuels() external view returns (uint256);
    function getContractBalance() external view returns (uint256);
    
    // Admin functions
    function updateGameParameters(
        uint256 _minWager,
        uint256 _maxWager,
        uint256 _gameTimeoutBlocks
    ) external;
    
    function emergencyWithdraw(uint256 amount, address recipient) external;
    
    // State variables
    function duels(uint256 duelId) external view returns (Duel memory);
    function duelCounter() external view returns (uint256);
    function minWager() external view returns (uint256);
    function maxWager() external view returns (uint256);
    function gameTimeoutBlocks() external view returns (uint256);
}
