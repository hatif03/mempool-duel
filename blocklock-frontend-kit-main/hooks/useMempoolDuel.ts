"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers, getBytes } from "ethers";
import { Blocklock, encodeCiphertextToSolidity, encodeCondition } from "blocklock-js";
import { useEthersProvider, useEthersSigner } from "@/hooks/useEthers";
import { useAccount } from "wagmi";
import { CONTRACT_ABI, CHAIN_ID_TO_ADDRESS, CHAIN_ID_BLOCK_TIME } from "@/lib/contract";

export interface Duel {
  id: string;
  player1: string;
  player2?: string;
  wager: string;
  status: string;
  targetBlock: number;
  currentBlock: number;
  createdAt: number;
}

export interface DuelStatus {
  status: string;
  player1Move: number | null;
  player2Move: number | null;
  winner: string | null;
  isDraw: boolean;
}

export const useMempoolDuel = () => {
  const [openDuels, setOpenDuels] = useState<Duel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const signer = useEthersSigner();
  const provider = useEthersProvider();
  const { chainId, address } = useAccount();

  const CONTRACT_ADDRESS = chainId ? CHAIN_ID_TO_ADDRESS[chainId.toString() as keyof typeof CHAIN_ID_TO_ADDRESS] : null;
  const secondsPerBlock = chainId ? CHAIN_ID_BLOCK_TIME[chainId.toString() as keyof typeof CHAIN_ID_BLOCK_TIME] : 12;

  // Debug logging
  console.log("useMempoolDuel hook state:", {
    chainId,
    address,
    contractAddress: CONTRACT_ADDRESS,
    secondsPerBlock,
    provider: !!provider,
    signer: !!signer
  });

  // Check if user is on the correct network
  useEffect(() => {
    if (chainId && !CONTRACT_ADDRESS) {
      console.warn(`No contract address found for chain ID ${chainId}. Please switch to a supported network.`);
      console.log("Supported chain IDs:", Object.keys(CHAIN_ID_TO_ADDRESS));
    }
  }, [chainId, CONTRACT_ADDRESS]);

  // Fetch open duels
  const fetchOpenDuels = useCallback(async () => {
    if (!provider || !CONTRACT_ADDRESS) {
      console.log("Provider or contract address not available:", { provider: !!provider, contractAddress: CONTRACT_ADDRESS });
      return;
    }

    try {
      setIsLoading(true);
      console.log("Fetching open duels from contract:", CONTRACT_ADDRESS);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      
      // First, test if the contract is accessible
      let totalDuels;
      try {
        console.log("Calling duelCounter...");
        totalDuels = await contract.duelCounter();
        console.log("Total duels:", totalDuels.toString());
      } catch (error) {
        console.error("duelCounter call failed:", error);
        // If duelCounter fails, try to get duels directly
        console.log("Trying alternative approach...");
        setOpenDuels([]);
        return;
      }

      const duels: Duel[] = [];

      // Fetch recent duels (last 10)
      const startId = Math.max(0, Number(totalDuels) - 10);
      console.log("Fetching duels from", startId, "to", totalDuels.toString());
      
      for (let i = startId; i < Number(totalDuels); i++) {
        try {
          console.log(`Fetching duel ${i}...`);
          const duel = await contract.duels(i);
          const currentBlock = await provider.getBlockNumber();
          console.log(`Duel ${i}:`, duel);
          
          // Only include open duels (waiting for player2)
          if (duel.status === 0 && !duel.player2) {
            duels.push({
              id: i.toString(),
              player1: duel.player1,
              player2: duel.player2,
              wager: ethers.formatEther(duel.wager),
              status: duel.status.toString(),
              targetBlock: Number(duel.targetBlock),
              currentBlock: currentBlock,
              createdAt: Number(duel.createdAt) * 1000, // Convert to milliseconds
            });
          }
        } catch (error) {
          console.error(`Failed to fetch duel ${i}:`, error);
        }
      }

      console.log("Open duels found:", duels);
      setOpenDuels(duels.reverse()); // Show newest first
    } catch (error) {
      console.error("Failed to fetch open duels:", error);
      // Log more details about the error
      if (error instanceof Error) {
        console.error("Error details:", {
          message: error.message,
          name: error.name,
          stack: error.stack
        });
      }
      // Set empty array on error
      setOpenDuels([]);
    } finally {
      setIsLoading(false);
    }
  }, [provider, CONTRACT_ADDRESS]);

  // Create a new duel
  const createDuel = useCallback(async (wager: string): Promise<Duel> => {
    if (!signer || !provider || !CONTRACT_ADDRESS || !chainId) {
      throw new Error("Please connect your wallet");
    }

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    
    // Calculate target block (current + 3 blocks for quick resolution)
    const currentBlock = await provider.getBlockNumber();
    const targetBlock = currentBlock + 3;
    
    // Convert wager to wei
    const wagerWei = ethers.parseEther(wager);
    
    try {
      const tx = await contract.createDuel(targetBlock, { value: wagerWei });
      await tx.wait(2);
      
      // Get the created duel
      const duelId = await contract.duelCounter();
      const duel = await contract.duels(duelId - 1);
      
      return {
        id: (Number(duelId) - 1).toString(),
        player1: duel.player1,
        player2: duel.player2,
        wager: ethers.formatEther(duel.wager),
        status: duel.status.toString(),
        targetBlock: Number(duel.targetBlock),
        currentBlock: currentBlock,
        createdAt: Date.now(),
      };
    } catch (error) {
      console.error("Failed to create duel:", error);
      throw new Error("Failed to create duel. Please try again.");
    }
  }, [signer, provider, CONTRACT_ADDRESS, chainId]);

  // Join an existing duel
  const joinDuel = useCallback(async (duelId: string): Promise<Duel> => {
    if (!signer || !provider || !CONTRACT_ADDRESS) {
      throw new Error("Please connect your wallet");
    }

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    
    try {
      // Get duel info first
      const duel = await contract.duels(duelId);
      const wagerWei = duel.wager;
      
      // Join the duel
      const tx = await contract.joinDuel(duelId, { value: wagerWei });
      await tx.wait(2);
      
      // Get updated duel info
      const updatedDuel = await contract.duels(duelId);
      const currentBlock = await provider.getBlockNumber();
      
      return {
        id: duelId,
        player1: updatedDuel.player1,
        player2: updatedDuel.player2,
        wager: ethers.formatEther(updatedDuel.wager),
        status: updatedDuel.status.toString(),
        targetBlock: Number(updatedDuel.targetBlock),
        currentBlock: currentBlock,
        createdAt: Number(updatedDuel.createdAt) * 1000,
      };
    } catch (error) {
      console.error("Failed to join duel:", error);
      throw new Error("Failed to join duel. Please try again.");
    }
  }, [signer, provider, CONTRACT_ADDRESS]);

  // Commit a move
  const commitMove = useCallback(async (duelId: string, move: number) => {
    if (!signer || !provider || !CONTRACT_ADDRESS || !chainId) {
      throw new Error("Please connect your wallet");
    }

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    
    try {
      // Get duel info
      const duel = await contract.duels(duelId);
      const targetBlock = Number(duel.targetBlock);
      
      // Encode the move
      const moveBytes = ethers.AbiCoder.defaultAbiCoder().encode(
        ["uint8"],
        [move]
      );
      const encodedMove = getBytes(moveBytes);
      
      // Encrypt using Blocklock
      const blocklockjs = Blocklock.createFromChainId(signer, chainId);
      const cipherMove = blocklockjs.encrypt(encodedMove, BigInt(targetBlock));
      
      // Commit the encrypted move
      const tx = await contract.commitMove(duelId, encodeCiphertextToSolidity(cipherMove));
      await tx.wait(2);
      
      console.log("Move committed successfully");
    } catch (error) {
      console.error("Failed to commit move:", error);
      throw new Error("Failed to commit move. Please try again.");
    }
  }, [signer, provider, CONTRACT_ADDRESS, chainId]);

  // Get duel status
  const getDuelStatus = useCallback(async (duelId: string): Promise<DuelStatus> => {
    if (!provider || !CONTRACT_ADDRESS) {
      throw new Error("Provider not available");
    }

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    try {
      console.log(`Getting duel status for duel ${duelId} from contract:`, CONTRACT_ADDRESS);
      // Get the full duel information using getDuel
      const duel = await contract.getDuel(duelId);
      console.log(`Duel ${duelId} data:`, duel);
      
      return {
        status: duel.status.toString(),
        player1Move: duel.player1RevealedMove ? Number(duel.player1RevealedMove) : null,
        player2Move: duel.player2RevealedMove ? Number(duel.player2RevealedMove) : null,
        winner: duel.winner || null,
        isDraw: duel.isDraw || false,
      };
    } catch (error) {
      console.error(`Failed to get duel status for duel ${duelId}:`, error);
      // Log more details about the error
      if (error instanceof Error) {
        console.error("Error details:", {
          message: error.message,
          name: error.name,
          stack: error.stack
        });
      }
      throw new Error("Failed to get duel status");
    }
  }, [provider, CONTRACT_ADDRESS]);

  // Refresh open duels
  const refreshDuels = useCallback(() => {
    fetchOpenDuels();
  }, [fetchOpenDuels]);

  // Test contract accessibility
  const testContract = useCallback(async () => {
    if (!provider || !CONTRACT_ADDRESS) {
      return { accessible: false, error: "Provider or contract address not available" };
    }
    
    try {
      console.log("Testing contract accessibility...");
      console.log("Contract address:", CONTRACT_ADDRESS);
      console.log("Provider:", provider);
      console.log("Chain ID:", await provider.getNetwork().then(n => n.chainId));
      
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      
      // Try to get the contract code first
      console.log("Checking if contract code exists...");
      const code = await provider.getCode(CONTRACT_ADDRESS);
      console.log("Contract code length:", code.length);
      if (code === "0x") {
        return { accessible: false, error: "No contract deployed at this address" };
      }
      
      console.log("Contract code exists, testing functions...");
      
      // Try to call a simple view function
      console.log("Calling duelCounter...");
      const totalDuels = await contract.duelCounter();
      console.log("Contract is accessible, total duels:", totalDuels.toString());
      
      return { accessible: true, totalDuels: totalDuels.toString() };
    } catch (error) {
      console.error("Contract accessibility test failed:", error);
      
      // Provide more specific error information
      if (error instanceof Error) {
        if (error.message.includes("execution reverted")) {
          return { accessible: false, error: "Contract call reverted - function may not exist or contract may be paused" };
        } else if (error.message.includes("missing revert data")) {
          return { accessible: false, error: "Contract call failed - network or contract issue" };
        } else {
          return { accessible: false, error: error.message };
        }
      }
      
      return { accessible: false, error: "Unknown error occurred" };
    }
  }, [provider, CONTRACT_ADDRESS]);

  // Auto-refresh duels every 10 seconds
  useEffect(() => {
    fetchOpenDuels();
    
    const interval = setInterval(fetchOpenDuels, 10000);
    return () => clearInterval(interval);
  }, [fetchOpenDuels]);

  return {
    openDuels,
    isLoading,
    createDuel,
    joinDuel,
    commitMove,
    getDuelStatus,
    refreshDuels,
    testContract,
  };
};

