

// Simplified contract interface for Mempool Duel
export const MEMPOOL_DUEL_ABI = [
  // Core game functions
  {
    inputs: [{ internalType: "uint256", name: "targetBlock", type: "uint256" }],
    name: "createDuel",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "duelId", type: "uint256" }],
    name: "joinDuel",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "duelId", type: "uint256" },
      { internalType: "tuple", name: "encryptedMove", type: "tuple", components: [
        { internalType: "tuple", name: "u", type: "tuple", components: [
          { internalType: "uint256[2]", name: "x", type: "uint256[2]" },
          { internalType: "uint256[2]", name: "y", type: "uint256[2]" }
        ]},
        { internalType: "bytes", name: "v", type: "bytes" },
        { internalType: "bytes", name: "w", type: "bytes" }
      ]}
    ],
    name: "commitMove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "duelId", type: "uint256" }],
    name: "getDuel",
    outputs: [{ internalType: "tuple", name: "", type: "tuple", components: [
      { internalType: "address", name: "player1", type: "address" },
      { internalType: "address", name: "player2", type: "address" },
      { internalType: "uint256", name: "wager", type: "uint256" },
      { internalType: "uint8", name: "status", type: "uint8" },
      { internalType: "uint256", name: "targetBlock", type: "uint256" },
      { internalType: "uint256", name: "blocklockRequestId", type: "uint256" },
      { internalType: "tuple", name: "player1Move", type: "tuple", components: [
        { internalType: "tuple", name: "u", type: "tuple", components: [
          { internalType: "uint256[2]", name: "x", type: "uint256[2]" },
          { internalType: "uint256[2]", name: "y", type: "uint256[2]" }
        ]},
        { internalType: "bytes", name: "v", type: "bytes" },
        { internalType: "bytes", name: "w", type: "bytes" }
      ]},
      { internalType: "tuple", name: "player2Move", type: "tuple", components: [
        { internalType: "tuple", name: "u", type: "tuple", components: [
          { internalType: "uint256[2]", name: "x", type: "uint256[2]" },
          { internalType: "uint256[2]", name: "y", type: "uint256[2]" }
        ]},
        { internalType: "bytes", name: "v", type: "bytes" },
        { internalType: "bytes", name: "w", type: "bytes" }
      ]},
      { internalType: "uint8", name: "player1RevealedMove", type: "uint8" },
      { internalType: "uint8", name: "player2RevealedMove", type: "uint8" },
      { internalType: "address", name: "winner", type: "address" },
      { internalType: "bool", name: "isDraw", type: "bool" },
      { internalType: "uint256", name: "createdAt", type: "uint256" }
    ]}],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "duelCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "duels",
    outputs: [{ internalType: "tuple", name: "", type: "tuple", components: [
      { internalType: "address", name: "player1", type: "address" },
      { internalType: "address", name: "player2", type: "address" },
      { internalType: "uint256", name: "wager", type: "uint256" },
      { internalType: "uint8", name: "status", type: "uint8" },
      { internalType: "uint256", name: "targetBlock", type: "uint256" },
      { internalType: "uint256", name: "blocklockRequestId", type: "uint256" },
      { internalType: "tuple", name: "player1Move", type: "tuple", components: [
        { internalType: "tuple", name: "u", type: "tuple", components: [
          { internalType: "uint256[2]", name: "x", type: "uint256[2]" },
          { internalType: "uint256[2]", name: "y", type: "uint256[2]" }
        ]},
        { internalType: "bytes", name: "v", type: "bytes" },
        { internalType: "bytes", name: "w", type: "bytes" }
      ]},
      { internalType: "tuple", name: "player2Move", type: "tuple", components: [
        { internalType: "tuple", name: "u", type: "tuple", components: [
          { internalType: "uint256[2]", name: "x", type: "uint256[2]" },
          { internalType: "uint256[2]", name: "y", type: "uint256[2]" }
        ]},
        { internalType: "bytes", name: "v", type: "bytes" },
        { internalType: "bytes", name: "w", type: "bytes" }
      ]},
      { internalType: "uint8", name: "player1RevealedMove", type: "uint8" },
      { internalType: "uint8", name: "player2RevealedMove", type: "uint8" },
      { internalType: "address", name: "winner", type: "address" },
      { internalType: "bool", name: "isDraw", type: "bool" },
      { internalType: "uint256", name: "createdAt", type: "uint256" }
    ]}],
    stateMutability: "view",
    type: "function",
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "duelId", type: "uint256" },
      { indexed: true, internalType: "address", name: "player1", type: "address" },
      { indexed: false, internalType: "uint256", name: "wager", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "targetBlock", type: "uint256" }
    ],
    name: "DuelCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "duelId", type: "uint256" },
      { indexed: true, internalType: "address", name: "player2", type: "address" }
    ],
    name: "PlayerJoined",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "duelId", type: "uint256" },
      { indexed: true, internalType: "address", name: "player", type: "address" }
    ],
    name: "MoveCommitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "duelId", type: "uint256" },
      { indexed: true, internalType: "address", name: "winner", type: "address" },
      { indexed: true, internalType: "address", name: "loser", type: "address" },
      { indexed: false, internalType: "uint8", name: "winningMove", type: "uint8" },
      { indexed: false, internalType: "uint8", name: "losingMove", type: "uint8" },
      { indexed: false, internalType: "uint256", name: "payout", type: "uint256" }
    ],
    name: "DuelResolved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "duelId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "refundAmount", type: "uint256" }
    ],
    name: "DuelDraw",
    type: "event",
  }
];

// Game status enum
export enum DuelStatus {
  WAITING_FOR_PLAYER2 = 0,
  WAITING_FOR_MOVES = 1,
  WAITING_FOR_REVEAL = 2,
  COMPLETED = 3,
  TIMEOUT = 4
}

// Move enum
export enum Move {
  ICE = 0,
  SPIKE = 1,
  GLITCH = 2
}

// Game result helper
export const getGameResult = (move1: Move, move2: Move): { winner: number; isDraw: boolean } => {
  if (move1 === move2) {
    return { winner: -1, isDraw: true };
  }
  
  // ICE beats GLITCH, GLITCH beats SPIKE, SPIKE beats ICE
  if ((move1 === Move.ICE && move2 === Move.GLITCH) ||
      (move1 === Move.GLITCH && move2 === Move.SPIKE) ||
      (move1 === Move.SPIKE && move2 === Move.ICE)) {
    return { winner: 0, isDraw: false }; // Player 1 wins
  } else {
    return { winner: 1, isDraw: false }; // Player 2 wins
  }
};

// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  // Add your deployed contract addresses here
  // Example:
  // 137: "0x...", // Polygon
  // 42161: "0x...", // Arbitrum
  // 8453: "0x...", // Base
};

