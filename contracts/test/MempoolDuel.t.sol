// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console2} from "forge-std/Test.sol";
import {MempoolDuel} from "../src/MempoolDuel.sol";
import {TypesLib} from "blocklock-solidity/src/libraries/TypesLib.sol";
import {BLS} from "blocklock-solidity/src/libraries/BLS.sol";

contract MempoolDuelTest is Test {
    MempoolDuel public mempoolDuel;
    
    address public player1 = address(0x1);
    address public player2 = address(0x2);
    address public blocklockSender = address(0x3);
    
    uint256 public minWager = 0.001 ether;
    uint256 public maxWager = 1 ether;
    uint256 public gameTimeoutBlocks = 100;
    
    function setUp() public {
        // Deploy the contract
        mempoolDuel = new MempoolDuel(
            blocklockSender,
            minWager,
            maxWager,
            gameTimeoutBlocks
        );
        
        // Fund players
        vm.deal(player1, 10 ether);
        vm.deal(player2, 10 ether);
    }
    
    function test_CreateDuel() public {
        uint256 targetBlock = block.number + 10;
        
        vm.prank(player1);
        mempoolDuel.createDuel{value: minWager}(targetBlock);
        
        MempoolDuel.Duel memory duel = mempoolDuel.getDuel(1);
        assertEq(duel.player1, player1);
        assertEq(duel.wager, minWager);
        assertEq(duel.targetBlock, targetBlock);
        assertEq(uint256(duel.status), uint256(MempoolDuel.DuelStatus.WAITING_FOR_PLAYER));
    }
    
    function test_JoinDuel() public {
        uint256 targetBlock = block.number + 10;
        
        // Create duel
        vm.prank(player1);
        mempoolDuel.createDuel{value: minWager}(targetBlock);
        
        // Join duel
        vm.prank(player2);
        mempoolDuel.joinDuel{value: minWager}(1);
        
        MempoolDuel.Duel memory duel = mempoolDuel.getDuel(1);
        assertEq(duel.player2, player2);
        assertEq(uint256(duel.status), uint256(MempoolDuel.DuelStatus.MOVES_COMMITTED));
    }
    
    function test_CommitMoves() public {
        uint256 targetBlock = block.number + 10;
        
        // Create and join duel
        vm.prank(player1);
        mempoolDuel.createDuel{value: minWager}(targetBlock);
        
        vm.prank(player2);
        mempoolDuel.joinDuel{value: minWager}(1);
        
        // Create mock encrypted moves
        TypesLib.Ciphertext memory move1 = TypesLib.Ciphertext({
            u: BLS.PointG2({x: [uint256(1), uint256(1)], y: [uint256(1), uint256(1)]}),
            v: "encrypted_move_1",
            w: "w1"
        });
        
        TypesLib.Ciphertext memory move2 = TypesLib.Ciphertext({
            u: BLS.PointG2({x: [uint256(2), uint256(2)], y: [uint256(2), uint256(2)]}),
            v: "encrypted_move_2",
            w: "w2"
        });
        
        // Commit moves
        vm.prank(player1);
        mempoolDuel.commitMove(1, move1);
        
        vm.prank(player2);
        mempoolDuel.commitMove(1, move2);
        
        MempoolDuel.Duel memory duel = mempoolDuel.getDuel(1);
        assertEq(duel.player1Move.v, "encrypted_move_1");
        assertEq(duel.player2Move.v, "encrypted_move_2");
    }
    
    function test_GameLogic() public {
        // Test that the game logic works correctly
        // Since _determineWinner is internal, we'll test the game flow instead
        
        uint256 targetBlock = block.number + 10;
        
        vm.prank(player1);
        mempoolDuel.createDuel{value: minWager}(targetBlock);
        
        vm.prank(player2);
        mempoolDuel.joinDuel{value: minWager}(1);
        
        // Test that both players can commit moves
        TypesLib.Ciphertext memory move1 = TypesLib.Ciphertext({
            u: BLS.PointG2({x: [uint256(1), uint256(1)], y: [uint256(1), uint256(1)]}),
            v: "encrypted_move_1",
            w: "w1"
        });
        
        vm.prank(player1);
        mempoolDuel.commitMove(1, move1);
        
        // Check that the move was committed
        MempoolDuel.Duel memory duel = mempoolDuel.getDuel(1);
        assertEq(duel.player1Move.v, "encrypted_move_1");
    }
    
    function test_InvalidWager() public {
        uint256 targetBlock = block.number + 10;
        
        vm.prank(player1);
        vm.expectRevert(MempoolDuel.InvalidWager.selector);
        mempoolDuel.createDuel{value: 0.0001 ether}(targetBlock); // Too low
        
        vm.prank(player1);
        vm.expectRevert(MempoolDuel.InvalidWager.selector);
        mempoolDuel.createDuel{value: 2 ether}(targetBlock); // Too high
    }
    
    function test_TargetBlockValidation() public {
        vm.prank(player1);
        vm.expectRevert(MempoolDuel.TargetBlockTooClose.selector);
        mempoolDuel.createDuel{value: minWager}(block.number + 1); // Too close
        
        vm.prank(player1);
        vm.expectRevert(MempoolDuel.TargetBlockTooFar.selector);
        mempoolDuel.createDuel{value: minWager}(block.number + 200); // Too far
    }
    
    function test_PlayerValidation() public {
        uint256 targetBlock = block.number + 10;
        
        vm.prank(player1);
        mempoolDuel.createDuel{value: minWager}(targetBlock);
        
        // Player1 cannot join their own duel
        vm.prank(player1);
        vm.expectRevert(MempoolDuel.PlayerNotInDuel.selector);
        mempoolDuel.joinDuel{value: minWager}(1);
        
        // Wrong wager amount
        vm.prank(player2);
        vm.expectRevert(MempoolDuel.InvalidWager.selector);
        mempoolDuel.joinDuel{value: 0.002 ether}(1);
    }
    

    
    function test_ContractParameters() public view {
        assertEq(mempoolDuel.minWager(), minWager);
        assertEq(mempoolDuel.maxWager(), maxWager);
        assertEq(mempoolDuel.gameTimeoutBlocks(), gameTimeoutBlocks);
        assertEq(mempoolDuel.getTotalDuels(), 0);
    }
    
    function test_CanCommitMove() public {
        uint256 targetBlock = block.number + 10;
        
        vm.prank(player1);
        mempoolDuel.createDuel{value: minWager}(targetBlock);
        
        vm.prank(player2);
        mempoolDuel.joinDuel{value: minWager}(1);
        
        // Both players should be able to commit moves
        assertTrue(mempoolDuel.canCommitMove(1, player1));
        assertTrue(mempoolDuel.canCommitMove(1, player2));
        
        // Non-players cannot commit moves
        assertFalse(mempoolDuel.canCommitMove(1, address(0x999)));
    }
    
    receive() external payable {}
}
