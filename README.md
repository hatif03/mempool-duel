# 🎮 Mempool Duel

> **A lightning-fast, cryptographically fair two-player web game built on blockchain technology**

[![Next.js](https://img.shields.io/badge/Next.js-13-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Ethereum](https://img.shields.io/badge/Ethereum-1.0-3C3C3D?style=for-the-badge&logo=ethereum)](https://ethereum.org/)
[![Blocklock](https://img.shields.io/badge/Blocklock-js-FF6B6B?style=for-the-badge)](https://github.com/randa-mu/blocklock-js)

## 🌟 Overview

**Mempool Duel** is a high-stakes, two-player web game based on the classic "Rock, Paper, Scissors" logic, designed for fast rounds of play where fairness is cryptographically guaranteed. Built on blockchain technology using the dcipher network's blocklock encryption, it provides a secure and transparent gaming experience.

### 🎯 Game Concept

In the neon-drenched metropolis of Neo-Kyoto, information is the most valuable currency. Rival data couriers, known as "Runners," constantly vie for supremacy on the digital frontier. When two Runners cross paths with conflicting contracts, disputes are settled not with weapons, but with code.

**Mempool Duel** is the digital arena where these conflicts are resolved—a lightning-fast game of strategy where a single move can determine the outcome. Victory requires anticipating your opponent's logic, but the system's integrity is absolute, ensuring no Runner can cheat the code.

## 🚀 Features

### 🎮 **Core Gameplay**
- **Three Strategic Moves**: ICE (Rock), Spike (Paper), Glitch (Scissors)
- **Cryptographic Fairness**: Time-locked encryption prevents cheating
- **Instant Resolution**: Automatic decryption and payout when conditions are met
- **Wager System**: Place bets in MATIC, USDC, or other supported tokens

### 🔐 **Security & Transparency**
- **Blocklock Encryption**: Uses dcipher network for time-locked encryption
- **Smart Contract Escrow**: Automated wager holding and payout
- **On-Chain Verification**: All game results are publicly verifiable
- **No Front-Running**: Encrypted moves prevent manipulation

### 🎨 **User Experience**
- **Pixel-Art Aesthetic**: Retro gaming style with modern blockchain functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-Time Updates**: Live game status and blockchain confirmation
- **Wallet Integration**: Seamless MetaMask and other wallet connections

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 13** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Wagmi** - React hooks for Ethereum
- **Ethers.js** - Ethereum library

### **Blockchain**
- **Solidity** - Smart contract development
- **Hardhat** - Development environment
- **Blocklock-js** - Time-locked encryption
- **dcipher Network** - Decentralized encryption infrastructure

### **Networks Supported**
- **Base Sepolia** (Testnet) - Primary development network
- **Polygon Mumbai** (Testnet) - Alternative testnet
- **Ethereum Sepolia** (Testnet) - Ethereum testnet

## 📋 Prerequisites

Before you begin, ensure you have the following:

- **Node.js** (v16 or later)
- **npm** (v7 or later) or **yarn**
- **MetaMask** or compatible Web3 wallet
- **Test tokens** for your chosen network
- **Basic knowledge** of blockchain and Web3 concepts

## 🚀 Quick Start

### 1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/mempool-duel.git
cd mempool-duel
```

### 2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

### 3. **Environment Setup**
Create a `.env.local` file in the root directory:
```env
# Network RPC URLs
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
NEXT_PUBLIC_POLYGON_MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com

# Contract Addresses (Base Sepolia - Deployed)
NEXT_PUBLIC_MEMPOOL_DUEL_CONTRACT=0xF0Fb1a485571Db8475A1271C6f7f47b695e51971
NEXT_PUBLIC_BLOCKLOCK_SENDER=0x82Fed730CbdeC5A2D8724F2e3b316a70A565e27e
```

### 4. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### **5. Test the Deployed Contract** 🧪
The contract is already deployed on Base Sepolia testnet! To test it:

1. **Switch to Base Sepolia** in your wallet
2. **Get test ETH** from the faucet links above
3. **Connect your wallet** to the game
4. **Create a duel** with 0.001 ETH wager
5. **Test the game flow** with another player

## 🎯 How to Play

### **1. Connect Your Wallet**
- Click "Connect Wallet" and authorize your Web3 wallet
- Ensure you're on a supported network (Base Sepolia recommended)
- Have test tokens ready for wagers

### **2. Join or Create a Duel**
- **Quick Duel**: Get matched automatically with another player
- **Create Duel**: Set your own wager amount and wait for challengers
- **Join Duel**: Accept an existing challenge from the Duel Board

### **3. Make Your Move**
- Choose from three strategic options:
  - **ICE** 🧊: Defensive program (beats Glitch)
  - **Spike** ⚡: Invasive script (beats ICE)
  - **Glitch** 💀: Corruptive code (beats Spike)
- Your choice is encrypted and committed to the blockchain

### **4. Wait for Resolution**
- Both players' moves remain encrypted until the target block
- The dcipher network automatically delivers decryption keys
- Smart contract resolves the duel and distributes winnings

### **5. Claim Your Victory**
- Winners automatically receive the entire pot
- Draws result in wager returns to both players
- All results are verifiable on-chain

## 🏗️ Project Structure

```
mempool-duel/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles and pixel-art theme
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main entry point
├── components/                   # React components
│   └── mempool-duel/           # Game-specific components
│       ├── Header.tsx          # Game header with wallet connection
│       ├── GameHub.tsx         # Main game hub and navigation
│       ├── CreateDuelPanel.tsx # Duel creation interface
│       ├── DuelBoard.tsx       # List of open duels
│       ├── GameArena.tsx       # Main game interface
│       ├── MoveSelector.tsx    # Move selection component
│       ├── WaitingPhase.tsx    # Encryption waiting period
│       └── GameResult.tsx      # Game outcome display
├── hooks/                       # Custom React hooks
│   └── useMempoolDuel.ts      # Game logic and blockchain interactions
├── lib/                         # Utility libraries
│   ├── contract.ts             # Contract ABIs and addresses
│   └── mempoolDuelContract.ts  # Simplified contract interface
├── public/                      # Static assets
│   └── cyberpunk-icon.svg      # Game icon
└── README.md                    # This file
```

## 🔧 Configuration

### **Network Configuration**
The game supports multiple networks with automatic detection:

```typescript
// Supported networks and their configurations
const CHAIN_ID_TO_ADDRESS = {
  "84532": "0xF0Fb1a485571Db8475A1271C6f7f47b695e51971", // Base Sepolia (Deployed)
  "80001": "0x...", // Polygon Mumbai
  "11155111": "0x..." // Ethereum Sepolia
};
```

### **Contract Deployment**
To deploy your own contracts:

1. **Compile Contracts**
   ```bash
   npx hardhat compile
   ```

2. **Deploy to Network**
   ```bash
   npx hardhat run scripts/deploy.js --network baseSepolia
   ```

3. **Update Environment Variables**
   Update `.env.local` with your deployed contract addresses

### **Current Deployment Status** ✅

**Base Sepolia Testnet (Chain ID: 84532)**
- **Contract Address**: `0xF0Fb1a485571Db8475A1271C6f7f47b695e51971`
- **Blocklock Sender**: `0x82Fed730CbdeC5A2D8724F2e3b316a70A565e27e`
- **Deployment Block**: `30023696`
- **Transaction Hash**: `0x36f54706e398d6da62d88c007066a125a04276c971a750d039575fe9478d6d02`
- **Verification**: ✅ [Verified on Basescan](https://sepolia.basescan.org/address/0xf0fb1a485571db8475a1271c6f7f47b695e51971)
- **Gas Used**: `2,398,063` gas
- **Cost**: `0.000002398202087654 ETH`

**Contract Parameters**
- **Min Wager**: `0.001 ETH` (1,000,000,000,000,000 wei)
- **Max Wager**: `1 ETH` (1,000,000,000,000,000,000 wei)
- **Timeout Blocks**: `100` blocks

## 🧪 Testing

### **Run Tests**
```bash
npm run test
# or
yarn test
```

### **Test on Testnet**
1. Ensure you have test tokens (Base Sepolia ETH)
2. Connect to **Base Sepolia** (Chain ID: 84532) - **Recommended for testing**
3. Create a test duel with minimal wager (0.001 ETH minimum)
4. Test the complete game flow

**Getting Base Sepolia Testnet ETH**
- **Faucet**: [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
- **Alternative**: [Chainlink Faucet](https://faucets.chain.link/base-sepolia)
- **RPC URL**: `https://sepolia.base.org`

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
npm run build
vercel --prod
```

### **Other Platforms**
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted servers

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **dcipher Network** - For providing the blocklock encryption infrastructure
- **Base Network** - For testnet support and development resources
- **Ethereum Community** - For the foundation of decentralized applications
- **Open Source Contributors** - For the tools and libraries that make this possible

## 📞 Support

- **Documentation**: [docs.dcipher.network](https://docs.dcipher.network)
- **Issues**: [GitHub Issues](https://github.com/yourusername/mempool-duel/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/mempool-duel/discussions)
- **Discord**: [Join our community](https://discord.gg/your-invite)

## 🔮 Roadmap

### **Phase 1: Core Gameplay** ✅
- [x] Basic game mechanics
- [x] Smart contract integration
- [x] Wallet connection
- [x] Pixel-art UI theme

### **Phase 2: Enhanced Features** 🚧
- [ ] Tournament system
- [ ] Leaderboards
- [ ] NFT rewards
- [ ] Mobile app

### **Phase 3: Advanced Features** 📋
- [ ] Cross-chain support
- [ ] Social features
- [ ] Advanced betting options
- [ ] API for third-party integrations

---

**Ready to duel? Connect your wallet and enter the arena!** 🎮⚡

*Built with ❤️ by the Mempool Duel team*
