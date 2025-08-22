# Mempool Duel Smart Contract

## Overview

Mempool Duel is a trustless, two-player web game based on Rock, Paper, Scissors logic, designed for fast rounds of play where fairness is cryptographically guaranteed. The game uses the blocklock protocol for encrypted moves and automatic resolution.

## Game Concept

In the cyberpunk universe of Neo-Kyoto, rival data couriers (Runners) settle disputes through digital duels. Mempool Duel is the digital arena where these conflicts are resolved—a lightning-fast game of strategy where a single move can determine the outcome.

## Game Mechanics

### The Three Moves
- **ICE (Rock)**: A brute-force defensive program
- **Spike (Paper)**: A sharp, invasive script that bypasses defenses  
- **Glitch (Scissors)**: A disruptive code snippet that corrupts invasive scripts

### Game Rules
- ICE breaks Glitch
- Glitch corrupts Spike
- Spike bypasses ICE
- Same moves result in a draw

## Smart Contract Features

### Core Components
- **Trustless Escrow**: Holds both players' wagers securely
- **State Management**: Tracks duel states from creation to resolution
- **Fairness through Confidentiality**: Uses blocklock protocol for encrypted moves
- **Automated Resolution**: Determines outcome and executes payouts automatically

### Key Functions

#### `createDuel(uint256 targetBlock)`
- Creates a new duel with initial wager
- Sets target block for move revelation
- Emits `DuelCreated` event

#### `joinDuel(uint256 duelId)`
- Allows second player to join existing duel
- Requires matching wager amount
- Changes status to `MOVES_COMMITTED`

#### `commitMove(uint256 duelId, TypesLib.Ciphertext encryptedMove)`
- Submits encrypted move to the duel
- Uses blocklock protocol for encryption
- Automatically initiates reveal when both moves are committed

#### `handleTimeout(uint256 duelId)`
- Handles game timeouts
- Refunds both players if game doesn't resolve
- Can be called by anyone after timeout period

### State Management

The contract tracks four main states:
1. **WAITING_FOR_PLAYER**: Waiting for second player to join
2. **MOVES_COMMITTED**: Both players joined, waiting for moves
3. **REVEALING**: Moves committed, waiting for blocklock resolution
4. **FINISHED**: Game completed, winner determined

## Technical Implementation

### Blocklock Integration
- Uses `AbstractBlocklockReceiver` for encrypted move handling
- Automatically requests decryption at target block
- Processes decryption keys via `_onBlocklockReceived` callback

### Security Features
- **Access Control**: Only duel participants can commit moves
- **Wager Validation**: Enforces minimum and maximum wager limits
- **Block Validation**: Prevents games with invalid target blocks
- **Timeout Protection**: Automatic refunds for unresolved games

### Data Structures

```solidity
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
```

## Deployment

### Prerequisites
1. Deploy blocklock sender contract
2. Set environment variables:
   - `PRIVATE_KEY`: Deployer private key
   - `BLOCKLOCK_SENDER_ADDRESS`: Address of blocklock sender contract

### Deployment Parameters
- **minWager**: Minimum wager amount (e.g., 0.001 ETH)
- **maxWager**: Maximum wager amount (e.g., 1 ETH)
- **gameTimeoutBlocks**: Number of blocks before timeout (e.g., 100)

### Deployment Command
```bash
forge script script/DeployMempoolDuel.s.sol --rpc-url <RPC_URL> --broadcast
```

## Usage Flow

### 1. Create Duel
```solidity
// Player 1 creates a duel with 0.01 ETH wager
mempoolDuel.createDuel{value: 0.01 ether}(block.number + 10);
```

### 2. Join Duel
```solidity
// Player 2 joins the duel with matching wager
mempoolDuel.joinDuel{value: 0.01 ether}(duelId);
```

### 3. Commit Moves
```solidity
// Both players commit encrypted moves
mempoolDuel.commitMove(duelId, encryptedMove);
```

### 4. Automatic Resolution
- Blocklock protocol automatically decrypts moves at target block
- Smart contract determines winner and distributes pot
- Winner receives total pot (2x wager)
- Draws result in refunds to both players

## Events

The contract emits several events for frontend integration:

- `DuelCreated`: New duel created
- `PlayerJoined`: Second player joined duel
- `MoveCommitted`: Player committed a move
- `DuelResolved`: Game resolved with winner
- `DuelDraw`: Game ended in draw
- `DuelTimeout`: Game timed out

## Testing

Run the test suite to verify contract functionality:

```bash
forge test
```

Tests cover:
- Duel creation and joining
- Move commitment
- Game logic validation
- Error handling
- Timeout scenarios

## Security Considerations

### Access Control
- Only duel participants can commit moves
- Owner can update game parameters
- Emergency withdrawal function for contract owner

### Reentrancy Protection
- Uses `_initiateReveal` internal function
- State changes before external calls

### Input Validation
- Wager amount validation
- Target block validation
- Player address validation

## Gas Optimization

- Efficient state management
- Minimal storage operations
- Optimized event emissions
- Batch operations where possible

## Future Enhancements

### Potential Improvements
1. **Multiple Game Modes**: Different game types beyond RPS
2. **Tournament Support**: Multi-player tournaments
3. **NFT Integration**: Collectible game items
4. **Cross-Chain Support**: Multi-chain gameplay
5. **Advanced Encryption**: Enhanced privacy features

### Scalability Features
- Batch duel creation
- Optimized storage patterns
- Layer 2 integration support

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## Support

For questions or issues:
- Open GitHub issue
- Check documentation
- Review test cases
- Consult smart contract audit reports
