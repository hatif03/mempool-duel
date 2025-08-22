# Mempool Duel - Cyberpunk Rock Paper Scissors

A high-stakes, two-player web game based on Rock Paper Scissors logic with cryptographic fairness guaranteed by the Blocklock network. Players settle disputes through encrypted duels where moves are hidden until simultaneous reveal.

## 🎮 Game Concept

**Mempool Duel** is a quick, high-stakes game where two rival data couriers ("Runners") in a cyberpunk universe settle their disputes through decisive digital duels. The game uses the classic Rock Paper Scissors logic but with a futuristic twist:

- **ICE** (Rock): A brute-force defensive program
- **Spike** (Paper): A sharp, invasive script that bypasses defenses  
- **Glitch** (Scissors): A disruptive code snippet that corrupts invasive scripts

## 🚀 How It Works

### 1. The Wager
- Two players connect their wallets and place equal wagers (e.g., 0.001 ETH)
- The total pot is held in escrow by the smart contract

### 2. The Choice
- Both players simultaneously choose their move from ICE, Spike, or Glitch
- Each move is encrypted using Blocklock-js with a target block just 3 blocks into the future

### 3. The Duel
- Players submit their encrypted moves to the blockchain
- Moves remain completely secret and unreadable until reveal

### 4. The Resolution
- When the target block is reached, the Blocklock network automatically delivers decryption keys
- The smart contract instantly resolves the duel and transfers winnings to the winner
- In case of a draw, wagers are automatically returned

## 🎯 Game Rules

- **ICE breaks Glitch** (defensive program overpowers disruptive code)
- **Glitch corrupts Spike** (disruptive code corrupts invasive scripts)  
- **Spike bypasses ICE** (invasive script bypasses defensive programs)
- **Winner takes all** - the entire pot goes to the victor
- **Draw returns wagers** - both players get their money back

## 🛠️ Technical Architecture

### Frontend Components
- **GameHub**: Main entry point with duel board and creation panel
- **GameArena**: Core game interface with move selection and phases
- **MoveSelector**: Interface for choosing ICE, Spike, or Glitch
- **WaitingPhase**: Shows encrypted moves and block countdown
- **GameResult**: Displays duel outcome with animations

### Smart Contract Integration
- Uses existing Blocklock-js library for encryption
- Integrates with the MempoolDuel smart contract
- Supports multiple blockchain networks (Polygon, Arbitrum, Base, etc.)
- Automatic move commitment and resolution

### Key Features
- **Cryptographic Fairness**: No player can see the other's move until reveal
- **Fast Resolution**: Games resolve in just 3 blocks (~36 seconds on most chains)
- **Automatic Payouts**: Smart contract handles all winnings distribution
- **Cross-Chain Support**: Works on any EVM-compatible blockchain

## 🚀 Getting Started

### Prerequisites
- Node.js 22.0.0 or higher
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Some testnet ETH for wagers

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Navigate to `/mempool-duel` in your browser

### Configuration
The game automatically detects your connected network and uses the appropriate contract address. Supported networks include:
- Polygon Mainnet (Chain ID: 137)
- Arbitrum One (Chain ID: 42161)  
- Base (Chain ID: 8453)
- Various testnets

## 🎮 How to Play

### Creating a Duel
1. Connect your wallet
2. Click "CREATE DUEL" 
3. Set your wager amount (0.001 ETH minimum)
4. Confirm the transaction
5. Wait for an opponent to join

### Joining a Duel
1. Browse the "DUEL BOARD" for open challenges
2. Click "ACCEPT" on a duel you want to join
3. Confirm the transaction with the matching wager
4. Both players are now locked into the duel

### Making Your Move
1. Choose between ICE, Spike, or Glitch
2. Click "COMMIT MOVE" to encrypt and submit your choice
3. Your move is now locked and cannot be changed
4. Wait for both players to commit their moves

### Waiting for Resolution
1. Both moves are encrypted and hidden
2. Watch the block counter tick down to the target block
3. The Blocklock network will automatically reveal the moves
4. Winner is determined and winnings are distributed

## 🔧 Development

### Project Structure
```
components/mempool-duel/
├── GameHub.tsx          # Main game interface
├── GameArena.tsx        # Game phases management
├── MoveSelector.tsx     # Move selection interface
├── WaitingPhase.tsx     # Encrypted moves display
├── GameResult.tsx       # Results and animations
├── DuelBoard.tsx        # Open challenges list
├── CreateDuelPanel.tsx  # Duel creation form
└── QuickDuelButton.tsx  # Quick match button

hooks/
└── useMempoolDuel.ts    # Game logic and contract interactions

lib/
├── contract.ts          # Contract ABIs and addresses
└── mempoolDuelContract.ts # Simplified game interface
```

### Key Hooks
- **useMempoolDuel**: Main game logic hook
- **useEthers**: Web3 provider and signer management
- **useNetworkConfig**: Network-specific configuration

### Styling
- Built with Tailwind CSS
- Cyberpunk theme with neon cyan/purple accents
- Responsive design for mobile and desktop
- Smooth animations and transitions

## 🌐 Deployment

### Smart Contract
The game requires a deployed MempoolDuel smart contract. The contract should:
- Accept ETH deposits for wagers
- Use Blocklock for move encryption/decryption
- Handle game state management
- Automatically resolve duels and distribute winnings

### Frontend
1. Build the project: `npm run build`
2. Deploy to your preferred hosting service (Vercel, Netlify, etc.)
3. Update contract addresses in `lib/contract.ts` for production networks

## 🔒 Security Features

- **Move Encryption**: All moves are encrypted until simultaneous reveal
- **Blocklock Integration**: Uses time-locked encryption for fairness
- **Smart Contract Escrow**: Wagers are held securely until resolution
- **No Front-Running**: Players cannot see or change moves after commitment
- **Automatic Resolution**: No manual intervention required for payouts

## 🎨 Customization

### Themes
The game uses a cyberpunk aesthetic but can be easily customized:
- Modify color schemes in Tailwind config
- Update icons and emojis for moves
- Customize animations and transitions

### Game Mechanics
- Adjust block countdown (currently 3 blocks)
- Modify wager limits and presets
- Add additional game modes or variations

## 🤝 Contributing

Contributions are welcome! Areas for improvement include:
- Additional blockchain network support
- Enhanced UI/UX features
- Mobile app development
- Smart contract optimizations
- Testing and documentation

## 📄 License

This project is part of the Blocklock Frontend Kit and follows the same licensing terms.

## 🆘 Support

For issues or questions:
- Check the existing documentation
- Review the smart contract code
- Open an issue on GitHub
- Join the community discussions

---

**Ready to enter the digital arena? Connect your wallet and start dueling!** ⚔️


