# MempoolDuel Contract Deployment Guide

This guide explains how to deploy the MempoolDuel smart contract using the provided deployment script.

## Prerequisites

### 1. Install Foundry
```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Verify installation
forge --version
```

### 2. Set Up Environment Variables
Copy the environment template and fill in your values:
```bash
cp env.template .env
```

Edit `.env` with your actual values:
```bash
# Your private key (without 0x prefix - the script adds 0x automatically)
PRIVATE_KEY=abc123...

# RPC URL for your target network
RPC_URL=https://polygon-rpc.com

# Blocklock sender contract address
BLOCKLOCK_SENDER_ADDRESS=0x1234...

# Chain ID for your target network
CHAIN_ID=137

# Optional: Etherscan API key for verification
ETHERSCAN_API_KEY=abc123...
```

## Deployment Steps

### 1. Build the Project
```bash
forge build
```

### 2. Run the Deployment Script
```bash
./deploy.sh
```

**Note**: If you're on Windows, you may need to run this in Git Bash or WSL, or use the PowerShell equivalent.

### 3. Verify Deployment
The script will output the deployed contract address. You can verify it on your blockchain explorer.

## Network-Specific Configuration

### Base Sepolia (Recommended for testing)
- **RPC URL**: `https://sepolia.base.org/`
- **Chain ID**: `84532`
- **Block Explorer**: https://sepolia.basescan.org/
- **Faucet**: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
- **Blocklock Sender**: `0x82Fed730CbdeC5A2D8724F2e3b316a70A565e27e`

### Polygon (Alternative)
- **RPC URL**: `https://polygon-rpc.com`
- **Chain ID**: `137`
- **Block Explorer**: https://polygonscan.com

### Mumbai Testnet
- **RPC URL**: `https://rpc-mumbai.maticvigil.com`
- **Chain ID**: `80001`
- **Block Explorer**: https://mumbai.polygonscan.com

### Local Development
- **RPC URL**: `http://localhost:8545`
- **Chain ID**: `31337`
- **Block Explorer**: N/A

## Important Notes

### Base Sepolia Setup
For Base Sepolia deployment, you'll need:
1. **Base Sepolia ETH** - Get from the official faucet: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
2. **Blocklock Sender Contract** - Already deployed at `0x82Fed730CbdeC5A2D8724F2e3b316a70A565e27e`
3. **Base Sepolia RPC** - Use `https://sepolia.base.org/`

### Blocklock Sender Contract
The blocklock sender contract is already deployed on Base Sepolia at `0x82Fed730CbdeC5A2D8724F2e3b316a70A565e27e`. You don't need to deploy this yourself.

### Gas Fees
Ensure your deployment account has sufficient funds for:
- Contract deployment gas fees
- Any initial setup transactions

### Security
- **Never commit your `.env` file** to version control
- Keep your private key secure
- Consider using a dedicated deployment wallet

## Troubleshooting

### Common Issues

1. **"Foundry not found"**
   - Install Foundry using the commands above

2. **"Build failed"**
   - Fix any compilation errors first
   - Run `forge build` to see specific errors

3. **"Insufficient funds"**
   - Ensure your deployment account has enough ETH/MATIC

4. **"Invalid private key"**
   - Check that your private key is correct (no 0x prefix)
   - Verify the key corresponds to the account you want to deploy from

### Getting Help
- Check the Foundry documentation: https://book.getfoundry.sh/
- Review the contract compilation output
- Ensure all dependencies are properly installed

## Post-Deployment

After successful deployment:

1. **Save the contract address** from the deployment output
2. **Verify the contract** on your blockchain explorer (if supported)
3. **Test the contract** with small amounts first
4. **Update your frontend** with the new contract address

## Contract Parameters

The deployed contract will have these default parameters:
- **Minimum Wager**: 0.001 ETH/MATIC
- **Maximum Wager**: 1 ETH/MATIC  
- **Game Timeout**: 100 blocks
- **Owner**: Your deployment address

These can be updated later using the `updateGameParameters` function (owner only).
