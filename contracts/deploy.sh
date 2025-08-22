#!/bin/bash

# Mempool Duel Deployment Script
# This script deploys the MempoolDuel smart contract using Foundry

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f .env ]; then
    print_error ".env file not found. Please create one with the following variables:"
    echo "PRIVATE_KEY=your_private_key_here"
    echo "RPC_URL=your_rpc_url_here"
    echo "BLOCKLOCK_SENDER_ADDRESS=blocklock_sender_contract_address"
    echo "CHAIN_ID=your_chain_id"
    exit 1
fi

# Load environment variables
source .env

# Validate required environment variables
if [ -z "$PRIVATE_KEY" ]; then
    print_error "PRIVATE_KEY is not set in .env file"
    exit 1
fi

if [ -z "$RPC_URL" ]; then
    print_error "RPC_URL is not set in .env file"
    exit 1
fi

if [ -z "$BLOCKLOCK_SENDER_ADDRESS" ]; then
    print_error "BLOCKLOCK_SENDER_ADDRESS is not set in .env file"
    exit 1
fi

if [ -z "$CHAIN_ID" ]; then
    print_error "CHAIN_ID is not set in .env file"
    exit 1
fi

# Check if Foundry is installed
if ! command -v forge &> /dev/null; then
    print_error "Foundry is not installed. Please install it first:"
    echo "curl -L https://foundry.paradigm.xyz | bash"
    echo "foundryup"
    exit 1
fi

print_status "Starting MempoolDuel contract deployment..."

# Build the project first
print_status "Building project..."
forge build

if [ $? -ne 0 ]; then
    print_error "Build failed. Please fix compilation errors first."
    exit 1
fi

print_success "Build successful!"

# Create deployment script
print_status "Creating deployment script..."

cat > DeployMempoolDuel.s.sol << 'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {MempoolDuel} from "./src/MempoolDuel.sol";

contract DeployMempoolDuel is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Game parameters
        uint256 minWager = 0.001 ether; // 0.001 ETH minimum wager
        uint256 maxWager = 1 ether;     // 1 ETH maximum wager
        uint256 gameTimeoutBlocks = 100; // 100 blocks timeout
        
        // Get blocklock sender address from environment
        address blocklockSender = vm.envAddress("BLOCKLOCK_SENDER_ADDRESS");
        
        vm.startBroadcast(deployerPrivateKey);
        
        MempoolDuel mempoolDuel = new MempoolDuel(
            blocklockSender,
            minWager,
            maxWager,
            gameTimeoutBlocks
        );
        
        vm.stopBroadcast();
        
        // Deployment successful - Foundry will show the contract address in the output
    }
}
EOF

print_success "Deployment script created!"

# Deploy the contract
print_status "Deploying MempoolDuel contract to chain ID $CHAIN_ID..."

# Set Foundry environment variables with proper 0x prefix for private key
export PRIVATE_KEY=0x$PRIVATE_KEY
export BLOCKLOCK_SENDER_ADDRESS=$BLOCKLOCK_SENDER_ADDRESS

# Deploy using Foundry
forge script DeployMempoolDuel.s.sol:DeployMempoolDuel \
    --rpc-url $RPC_URL \
    --broadcast \
    --verify \
    --etherscan-api-key $ETHERSCAN_API_KEY \
    --chain-id $CHAIN_ID \
    --verifier etherscan

if [ $? -eq 0 ]; then
    print_success "Contract deployed successfully!"
    
    # Get the deployed contract address from the deployment
    print_status "Retrieving deployed contract address..."
    
    # Create a simple script to get the contract address
    cat > GetDeployedAddress.s.sol << 'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";

contract GetDeployedAddress is Script {
    function run() external view {
        // Check the deployment output above for the contract address
    }
}
EOF
    
    print_status "Deployment complete! Check the output above for the contract address."
    print_status "You can now interact with your deployed MempoolDuel contract."
    
else
    print_error "Deployment failed. Please check the error messages above."
    exit 1
fi

# Clean up temporary files
rm -f DeployMempoolDuel.s.sol GetDeployedAddress.s.sol

print_success "Deployment script completed!"
