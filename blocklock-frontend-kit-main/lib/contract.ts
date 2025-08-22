import { ethers } from "ethers";

export const CONTRACT_ADDRESS_FILECOIN =
  "0x2Eb638C8d78673A14322aBE1d0317AD32F3f5249";

export const CONTRACT_ADDRESS_CALIBRATION =
  "0x0F75cB85debC7A32a8B995362F28393E84ABABA6";

export const CONTRACT_ADDRESS_ARBITRUM_SEPOLIA =
  "0xBCF043CFB1D15cbAa22075B5FDA0554E3410Fa04";
export const CONTRACT_ADDRESS_OPTIMISM_SEPOLIA =
  "0x77d0A7cBa96AA6d739BEc63Ac53602c0f30a7947";
export const CONTRACT_ADDRESS_BASE_SEPOLIA =
  "0x6913a0E073e9009e282b7C5548809Ac8274f2e9B";

export const CHAIN_ID_TO_ADDRESS = {
  "314": CONTRACT_ADDRESS_FILECOIN,
  "314159": CONTRACT_ADDRESS_CALIBRATION,
  "421614": CONTRACT_ADDRESS_ARBITRUM_SEPOLIA,
  "11155420": CONTRACT_ADDRESS_OPTIMISM_SEPOLIA,
  "84532": CONTRACT_ADDRESS_BASE_SEPOLIA,
};

export const CHAIN_ID_BLOCK_TIME = {
  "314": 30,
  "314159": 30,
  "421614": 1,
  "11155420": 2,
  "84532": 1,
};

export const CHAIN_ID_GAS_CONFIG = {
  "137": {
    gasLimit: 10_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
    gasBufferPercent: 100,
    callbackGasLimitDefault: 100_000,
    gasMultiplierDefault: 10,
    blocklockAddress: "0x82Fed730CbdeC5A2D8724F2e3b316a70A565e27e",
  },
  "314": {
    gasLimit: 5_000_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
    gasBufferPercent: 400,
    callbackGasLimitDefault: 444_000_000,
    gasMultiplierDefault: 50,
    blocklockAddress: "0x34092470CC59A097d770523931E3bC179370B44b",
  },
  "314159": {
    gasLimit: 5_000_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
    gasBufferPercent: 400,
    callbackGasLimitDefault: 444_000_000,
    gasMultiplierDefault: 50,
    blocklockAddress: "0xF00aB3B64c81b6Ce51f8220EB2bFaa2D469cf702",
  },
  "421614": {
    gasLimit: 100_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
    gasBufferPercent: 100,
    callbackGasLimitDefault: 1_000_000,
    gasMultiplierDefault: 10,
    blocklockAddress: "0xd22302849a87d5B00f13e504581BC086300DA080",
  },
  "11155420": {
    gasLimit: 100_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
    gasBufferPercent: 100,
    callbackGasLimitDefault: 1_000_000,
    gasMultiplierDefault: 10,
    blocklockAddress: "0xd22302849a87d5B00f13e504581BC086300DA080",
  },
  "84532": {
    gasLimit: 100_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
    gasBufferPercent: 100,
    callbackGasLimitDefault: 1_000_000,
    gasMultiplierDefault: 10,
    blocklockAddress: "0x82Fed730CbdeC5A2D8724F2e3b316a70A565e27e",
  },
};

export const BLOCKLOCK_CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "uint32", name: "_callbackGasLimit", type: "uint32" },
      { internalType: "uint256", name: "_requestGasPriceWei", type: "uint256" },
    ],
    name: "estimateRequestPriceNative",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

export const CONTRACT_ABI = [
  {
     "type":"constructor",
     "inputs":[
        {
           "name":"blocklockSender",
           "type":"address",
           "internalType":"address"
        },
        {
           "name":"_minWager",
           "type":"uint256",
           "internalType":"uint256"
        },
        {
           "name":"_maxWager",
           "type":"uint256",
           "internalType":"uint256"
        },
        {
           "name":"_gameTimeoutBlocks",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "stateMutability":"nonpayable"
  },
  {
     "type":"receive",
     "stateMutability":"payable"
  },
  {
     "type":"function",
     "name":"acceptOwnership",
     "inputs":[
        
     ],
     "outputs":[
        
     ],
     "stateMutability":"nonpayable"
  },
  {
     "type":"function",
     "name":"blocklock",
     "inputs":[
        
     ],
     "outputs":[
        {
           "name":"",
           "type":"address",
           "internalType":"contract IBlocklockSender"
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"canCommitMove",
     "inputs":[
        {
           "name":"duelId",
           "type":"uint256",
           "internalType":"uint256"
        },
        {
           "name":"player",
           "type":"address",
           "internalType":"address"
        }
     ],
     "outputs":[
        {
           "name":"",
           "type":"bool",
           "internalType":"bool"
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"commitMove",
     "inputs":[
        {
           "name":"duelId",
           "type":"uint256",
           "internalType":"uint256"
        },
        {
           "name":"encryptedMove",
           "type":"tuple",
           "internalType":"struct TypesLib.Ciphertext",
           "components":[
              {
                 "name":"u",
                 "type":"tuple",
                 "internalType":"struct BLS.PointG2",
                 "components":[
                    {
                       "name":"x",
                       "type":"uint256[2]",
                       "internalType":"uint256[2]"
                    },
                    {
                       "name":"y",
                       "type":"uint256[2]",
                       "internalType":"uint256[2]"
                    }
                 ]
              },
              {
                 "name":"v",
                 "type":"bytes",
                 "internalType":"bytes"
              },
              {
                 "name":"w",
                 "type":"bytes",
                 "internalType":"bytes"
              }
           ]
        }
     ],
     "outputs":[
        
     ],
     "stateMutability":"nonpayable"
  },
  {
     "type":"function",
     "name":"createDuel",
     "inputs":[
        {
           "name":"targetBlock",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "outputs":[
        
     ],
     "stateMutability":"payable"
  },
  {
     "type":"function",
     "name":"createSubscriptionAndFundNative",
     "inputs":[
        
     ],
     "outputs":[
        
     ],
     "stateMutability":"payable"
  },
  {
     "type":"function",
     "name":"duelCounter",
     "inputs":[
        
     ],
     "outputs":[
        {
           "name":"",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"duels",
     "inputs":[
        {
           "name":"",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "outputs":[
        {
           "name":"player1",
           "type":"address",
           "internalType":"address"
        },
        {
           "name":"player2",
           "type":"address",
           "internalType":"address"
        },
        {
           "name":"wager",
           "type":"uint256",
           "internalType":"uint256"
        },
        {
           "name":"status",
           "type":"uint8",
           "internalType":"enum MempoolDuel.DuelStatus"
        },
        {
           "name":"targetBlock",
           "type":"uint256",
           "internalType":"uint256"
        },
        {
           "name":"blocklockRequestId",
           "type":"uint256",
           "internalType":"uint256"
        },
        {
           "name":"player1Move",
           "type":"tuple",
           "internalType":"struct TypesLib.Ciphertext",
           "components":[
              {
                 "name":"u",
                 "type":"tuple",
                 "internalType":"struct BLS.PointG2",
                 "components":[
                    {
                       "name":"x",
                       "type":"uint256[2]",
                       "internalType":"uint256[2]"
                    },
                    {
                       "name":"y",
                       "type":"uint256[2]",
                       "internalType":"uint256[2]"
                    }
                 ]
              },
              {
                 "name":"v",
                 "type":"bytes",
                 "internalType":"bytes"
              },
              {
                 "name":"w",
                 "type":"bytes",
                 "internalType":"bytes"
              }
           ]
        },
        {
           "name":"player2Move",
           "type":"tuple",
           "internalType":"struct TypesLib.Ciphertext",
           "components":[
              {
                 "name":"u",
                 "type":"tuple",
                 "internalType":"struct BLS.PointG2",
                 "components":[
                    {
                       "name":"x",
                       "type":"uint256[2]",
                       "internalType":"uint256[2]"
                    },
                    {
                       "name":"y",
                       "type":"uint256[2]",
                       "internalType":"uint256[2]"
                    }
                 ]
              },
              {
                 "name":"v",
                 "type":"bytes",
                 "internalType":"bytes"
              },
              {
                 "name":"w",
                 "type":"bytes",
                 "internalType":"bytes"
              }
           ]
        },
        {
           "name":"player1RevealedMove",
           "type":"uint8",
           "internalType":"enum MempoolDuel.Move"
        },
        {
           "name":"player2RevealedMove",
           "type":"uint8",
           "internalType":"enum MempoolDuel.Move"
        },
        {
           "name":"winner",
           "type":"address",
           "internalType":"address"
        },
        {
           "name":"isDraw",
           "type":"bool",
           "internalType":"bool"
        },
        {
           "name":"createdAt",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"emergencyWithdraw",
     "inputs":[
        {
           "name":"amount",
           "type":"uint256",
           "internalType":"uint256"
        },
        {
           "name":"recipient",
           "type":"address",
           "internalType":"address"
        }
     ],
     "outputs":[
        
     ],
     "stateMutability":"nonpayable"
  },
  {
     "type":"function",
     "name":"fundContractNative",
     "inputs":[
        
     ],
     "outputs":[
        
     ],
     "stateMutability":"payable"
  },
  {
     "type":"function",
     "name":"gameTimeoutBlocks",
     "inputs":[
        
     ],
     "outputs":[
        {
           "name":"",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"getBalance",
     "inputs":[
        
     ],
     "outputs":[
        {
           "name":"",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"getContractBalance",
     "inputs":[
        
     ],
     "outputs":[
        {
           "name":"",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"getDuel",
     "inputs":[
        {
           "name":"duelId",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "outputs":[
        {
           "name":"",
           "type":"tuple",
           "internalType":"struct MempoolDuel.Duel",
           "components":[
              {
                 "name":"player1",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"player2",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"wager",
                 "type":"uint256",
                 "internalType":"uint256"
              },
              {
                 "name":"status",
                 "type":"uint8",
                 "internalType":"enum MempoolDuel.DuelStatus"
              },
              {
                 "name":"targetBlock",
                 "type":"uint256",
                 "internalType":"uint256"
              },
              {
                 "name":"blocklockRequestId",
                 "type":"uint256",
                 "internalType":"uint256"
              },
              {
                 "name":"player1Move",
                 "type":"tuple",
                 "internalType":"struct TypesLib.Ciphertext",
                 "components":[
                    {
                       "name":"u",
                       "type":"tuple",
                       "internalType":"struct BLS.PointG2",
                       "components":[
                          {
                             "name":"x",
                             "type":"uint256[2]",
                             "internalType":"uint256[2]"
                          },
                          {
                             "name":"y",
                             "type":"uint256[2]",
                             "internalType":"uint256[2]"
                          }
                       ]
                    },
                    {
                       "name":"v",
                       "type":"bytes",
                       "internalType":"bytes"
                    },
                    {
                       "name":"w",
                       "type":"bytes",
                       "internalType":"bytes"
                    }
                 ]
              },
              {
                 "name":"player2Move",
                 "type":"tuple",
                 "internalType":"struct TypesLib.Ciphertext",
                 "components":[
                    {
                       "name":"u",
                       "type":"tuple",
                       "internalType":"struct BLS.PointG2",
                       "components":[
                          {
                             "name":"x",
                             "type":"uint256[2]",
                             "internalType":"uint256[2]"
                          },
                          {
                             "name":"y",
                             "type":"uint256[2]",
                             "internalType":"uint256[2]"
                          }
                       ]
                    },
                    {
                       "name":"v",
                       "type":"bytes",
                       "internalType":"bytes"
                    },
                    {
                       "name":"w",
                       "type":"bytes",
                       "internalType":"bytes"
                    }
                 ]
              },
              {
                 "name":"player1RevealedMove",
                 "type":"uint8",
                 "internalType":"enum MempoolDuel.Move"
              },
              {
                 "name":"player2RevealedMove",
                 "type":"uint8",
                 "internalType":"enum MempoolDuel.Move"
              },
              {
                 "name":"winner",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"isDraw",
                 "type":"bool",
                 "internalType":"bool"
              },
              {
                 "name":"createdAt",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ]
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"getDuelStatus",
     "inputs":[
        {
           "name":"duelId",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "outputs":[
        {
           "name":"",
           "type":"uint8",
           "internalType":"enum MempoolDuel.DuelStatus"
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"getTotalDuels",
     "inputs":[
        
     ],
     "outputs":[
        {
           "name":"",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"handleTimeout",
     "inputs":[
        {
           "name":"duelId",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "outputs":[
        
     ],
     "stateMutability":"nonpayable"
  },
  {
     "type":"function",
     "name":"isInFlight",
     "inputs":[
        {
           "name":"requestId",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "outputs":[
        {
           "name":"",
           "type":"bool",
           "internalType":"bool"
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"joinDuel",
     "inputs":[
        {
           "name":"duelId",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "outputs":[
        
     ],
     "stateMutability":"payable"
  },
  {
     "type":"function",
     "name":"maxWager",
     "inputs":[
        
     ],
     "outputs":[
        {
           "name":"",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"minWager",
     "inputs":[
        
     ],
     "outputs":[
        {
           "name":"",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"owner",
     "inputs":[
        
     ],
     "outputs":[
        {
           "name":"",
           "type":"address",
           "internalType":"address"
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"pendingRequestExists",
     "inputs":[
        {
           "name":"subId",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "outputs":[
        {
           "name":"",
           "type":"bool",
           "internalType":"bool"
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"receiveBlocklock",
     "inputs":[
        {
           "name":"requestId",
           "type":"uint256",
           "internalType":"uint256"
        },
        {
           "name":"decryptionKey",
           "type":"bytes",
           "internalType":"bytes"
        }
     ],
     "outputs":[
        
     ],
     "stateMutability":"nonpayable"
  },
  {
     "type":"function",
     "name":"setBlocklock",
     "inputs":[
        {
           "name":"_blocklock",
           "type":"address",
           "internalType":"address"
        }
     ],
     "outputs":[
        
     ],
     "stateMutability":"nonpayable"
  },
  {
     "type":"function",
     "name":"setSubId",
     "inputs":[
        {
           "name":"subId",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "outputs":[
        
     ],
     "stateMutability":"nonpayable"
  },
  {
     "type":"function",
     "name":"subscriptionId",
     "inputs":[
        
     ],
     "outputs":[
        {
           "name":"",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "stateMutability":"view"
  },
  {
     "type":"function",
     "name":"topUpSubscriptionNative",
     "inputs":[
        
     ],
     "outputs":[
        
     ],
     "stateMutability":"payable"
  },
  {
     "type":"function",
     "name":"transferOwnership",
     "inputs":[
        {
           "name":"to",
           "type":"address",
           "internalType":"address"
        }
     ],
     "outputs":[
        
     ],
     "stateMutability":"nonpayable"
  },
  {
     "type":"function",
     "name":"updateGameParameters",
     "inputs":[
        {
           "name":"_minWager",
           "type":"uint256",
           "internalType":"uint256"
        },
        {
           "name":"_maxWager",
           "type":"uint256",
           "internalType":"uint256"
        },
        {
           "name":"_gameTimeoutBlocks",
           "type":"uint256",
           "internalType":"uint256"
        }
     ],
     "outputs":[
        
     ],
     "stateMutability":"nonpayable"
  },
  {
     "type":"function",
     "name":"updateSubscription",
     "inputs":[
        {
           "name":"consumers",
           "type":"address[]",
           "internalType":"address[]"
        }
     ],
     "outputs":[
        
     ],
     "stateMutability":"nonpayable"
  },
  {
     "type":"function",
     "name":"withdrawNative",
     "inputs":[
        {
           "name":"amount",
           "type":"uint256",
           "internalType":"uint256"
        },
        {
           "name":"recipient",
           "type":"address",
           "internalType":"address"
        }
     ],
     "outputs":[
        
     ],
     "stateMutability":"nonpayable"
  },
  {
     "type":"event",
     "name":"DuelCreated",
     "inputs":[
        {
           "name":"duelId",
           "type":"uint256",
           "indexed":true,
           "internalType":"uint256"
        },
        {
           "name":"player1",
           "type":"address",
           "indexed":true,
           "internalType":"address"
        },
        {
           "name":"wager",
           "type":"uint256",
           "indexed":false,
           "internalType":"uint256"
        },
        {
           "name":"targetBlock",
           "type":"uint256",
           "indexed":false,
           "internalType":"uint256"
        }
     ],
     "anonymous":false
  },
  {
     "type":"event",
     "name":"DuelDraw",
     "inputs":[
        {
           "name":"duelId",
           "type":"uint256",
           "indexed":true,
           "internalType":"uint256"
        },
        {
           "name":"refundAmount",
           "type":"uint256",
           "indexed":false,
           "internalType":"uint256"
        }
     ],
     "anonymous":false
  },
  {
     "type":"event",
     "name":"DuelResolved",
     "inputs":[
        {
           "name":"duelId",
           "type":"uint256",
           "indexed":true,
           "internalType":"uint256"
        },
        {
           "name":"winner",
           "type":"address",
           "indexed":true,
           "internalType":"address"
        },
        {
           "name":"loser",
           "type":"address",
           "indexed":true,
           "internalType":"address"
        },
        {
           "name":"winningMove",
           "type":"uint8",
           "indexed":false,
           "internalType":"enum MempoolDuel.Move"
        },
        {
           "name":"losingMove",
           "type":"uint8",
           "indexed":false,
           "internalType":"enum MempoolDuel.Move"
        },
        {
           "name":"payout",
           "type":"uint256",
           "indexed":false,
           "internalType":"uint256"
        }
     ],
     "anonymous":false
  },
  {
     "type":"event",
     "name":"DuelTimeout",
     "inputs":[
        {
           "name":"duelId",
           "type":"uint256",
           "indexed":true,
           "internalType":"uint256"
        },
        {
           "name":"refundAmount",
           "type":"uint256",
           "indexed":false,
           "internalType":"uint256"
        }
     ],
     "anonymous":false
  },
  {
     "type":"event",
     "name":"Funded",
     "inputs":[
        {
           "name":"sender",
           "type":"address",
           "indexed":true,
           "internalType":"address"
        },
        {
           "name":"amount",
           "type":"uint256",
           "indexed":false,
           "internalType":"uint256"
        }
     ],
     "anonymous":false
  },
  {
     "type":"event",
     "name":"MoveCommitted",
     "inputs":[
        {
           "name":"duelId",
           "type":"uint256",
           "indexed":true,
           "internalType":"uint256"
        },
        {
           "name":"player",
           "type":"address",
           "indexed":true,
           "internalType":"address"
        }
     ],
     "anonymous":false
  },
  {
     "type":"event",
     "name":"NewSubscriptionId",
     "inputs":[
        {
           "name":"subscriptionId",
           "type":"uint256",
           "indexed":true,
           "internalType":"uint256"
        }
     ],
     "anonymous":false
  },
  {
     "type":"event",
     "name":"OwnershipTransferRequested",
     "inputs":[
        {
           "name":"from",
           "type":"address",
           "indexed":true,
           "internalType":"address"
        },
        {
           "name":"to",
           "type":"address",
           "indexed":true,
           "internalType":"address"
        }
     ],
     "anonymous":false
  },
  {
     "type":"event",
     "name":"OwnershipTransferred",
     "inputs":[
        {
           "name":"from",
           "type":"address",
           "indexed":true,
           "internalType":"address"
        },
        {
           "name":"to",
           "type":"address",
           "indexed":true,
           "internalType":"address"
        }
     ],
     "anonymous":false
  },
  {
     "type":"event",
     "name":"PlayerJoined",
     "inputs":[
        {
           "name":"duelId",
           "type":"uint256",
           "indexed":true,
           "internalType":"uint256"
        },
        {
           "name":"player2",
           "type":"address",
           "indexed":true,
           "internalType":"address"
        }
     ],
     "anonymous":false
  },
  {
     "type":"event",
     "name":"Received",
     "inputs":[
        {
           "name":"",
           "type":"address",
           "indexed":false,
           "internalType":"address"
        },
        {
           "name":"",
           "type":"uint256",
           "indexed":false,
           "internalType":"uint256"
        }
     ],
     "anonymous":false
  },
  {
     "type":"event",
     "name":"Withdrawn",
     "inputs":[
        {
           "name":"recipient",
           "type":"address",
           "indexed":true,
           "internalType":"address"
        },
        {
           "name":"amount",
           "type":"uint256",
           "indexed":false,
           "internalType":"uint256"
        }
     ],
     "anonymous":false
  },
  {
     "type":"error",
     "name":"DuelNotFound",
     "inputs":[
        
     ]
  },
  {
     "type":"error",
     "name":"DuelNotInCorrectState",
     "inputs":[
        
     ]
  },
  {
     "type":"error",
     "name":"GameNotReady",
     "inputs":[
        
     ]
  },
  {
     "type":"error",
     "name":"InsufficientPayment",
     "inputs":[
        
     ]
  },
  {
     "type":"error",
     "name":"InvalidMove",
     "inputs":[
        
     ]
  },
  {
     "type":"error",
     "name":"InvalidWager",
     "inputs":[
        
     ]
  },
  {
     "type":"error",
     "name":"MoveAlreadyCommitted",
     "inputs":[
        
     ]
  },
  {
     "type":"error",
     "name":"PlayerNotInDuel",
     "inputs":[
        
     ]
  },
  {
     "type":"error",
     "name":"TargetBlockTooClose",
     "inputs":[
        
     ]
  },
  {
     "type":"error",
     "name":"TargetBlockTooFar",
     "inputs":[
        
     ]
  }
];
