// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {MempoolDuel} from "../src/MempoolDuel.sol";

contract DeployMempoolDuel is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Game parameters
        uint256 minWager = 0.001 ether; // 0.001 ETH minimum wager
        uint256 maxWager = 1 ether;     // 1 ETH maximum wager
        uint256 gameTimeoutBlocks = 100; // 100 blocks timeout
        
        // You'll need to deploy the blocklock sender contract first and get its address
        address blocklockSender = vm.envAddress("BLOCKLOCK_SENDER_ADDRESS");
        
        vm.startBroadcast(deployerPrivateKey);
        
        new MempoolDuel(
            blocklockSender,
            minWager,
            maxWager,
            gameTimeoutBlocks
        );
        
        vm.stopBroadcast();
        
        // Log deployment information
        // Note: In Foundry scripts, you can use vm.log() for debugging
        // or check the deployment transaction for contract address
    }
}
