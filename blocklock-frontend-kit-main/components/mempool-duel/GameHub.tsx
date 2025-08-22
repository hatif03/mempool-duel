"use client";
import React, { useState } from "react";
import { useAccount, useSwitchChain, usePublicClient } from "wagmi";
import { useMempoolDuel } from "@/hooks/useMempoolDuel";
import { Duel } from "@/hooks/useMempoolDuel";
import CreateDuelPanel from "./CreateDuelPanel";
import DuelBoard from "./DuelBoard";
import GameArena from "./GameArena";

export default function GameHub() {
  const [currentDuel, setCurrentDuel] = useState<Duel | null>(null);
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [testResult, setTestResult] = useState<string>("");
  const [manualContractAddress, setManualContractAddress] = useState<string>("");
  const [isTestingManualAddress, setIsTestingManualAddress] = useState(false);
  const { openDuels, isLoading, createDuel, joinDuel, testContract } = useMempoolDuel();
  const { chainId, address } = useAccount();
  const { switchChain } = useSwitchChain();
  const publicClient = usePublicClient();
  
  // Get contract address from the hook's internal state
  const CONTRACT_ADDRESS = chainId ? 
    (chainId === 314 ? "0x2Eb638C8d78673A14322aBE1d0317AD32F3f5249" :
     chainId === 314159 ? "0x0F75cB85debC7A32a8B995362F28393E84ABABA6" :
     chainId === 421614 ? "0xBCF043CFB1D15cbAa22075B5FDA0554E3410Fa04" :
     chainId === 11155420 ? "0x77d0A7cBa96AA6d739BEc63Ac53602c0f30a7947" :
     chainId === 84532 ? "0x6913a0E073e9009e282b7C5548809Ac8274f2e9B" : null) : null;

  const handleSwitchToBaseSepolia = async () => {
    try {
      await switchChain({ chainId: 84532 });
    } catch (error) {
      console.error("Failed to switch network:", error);
      alert("Please manually switch to Base Sepolia network in your wallet");
    }
  };

  const handleCreateDuel = async (wager: string) => {
    try {
      const duel = await createDuel(wager);
      setCurrentDuel(duel);
      setShowCreatePanel(false);
    } catch (error) {
      console.error("Failed to create duel:", error);
      alert("Failed to create duel. Please try again.");
    }
  };

  const handleJoinDuel = async (duelId: string) => {
    try {
      const updatedDuel = await joinDuel(duelId);
      setCurrentDuel(updatedDuel);
    } catch (error) {
      console.error("Failed to join duel:", error);
      alert("Failed to join duel. Please try again.");
    }
  };

  const handleQuickDuel = async () => {
    // Quick duel with default wager (0.001 ETH)
    await handleCreateDuel("0.001");
  };

  const handleBackToHub = () => {
    setCurrentDuel(null);
  };

  const handleTestContract = async () => {
    try {
      const result = await testContract();
      if (result.accessible) {
        setTestResult(`✅ Contract accessible! Total duels: ${result.totalDuels}`);
      } else {
        setTestResult(`❌ Contract not accessible: ${result.error}`);
      }
    } catch (error) {
      setTestResult(`❌ Test failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  // Simple contract existence check
  const checkContractExists = async () => {
    if (!publicClient || !CONTRACT_ADDRESS) return;
    
    try {
      const code = await publicClient.getCode({ address: CONTRACT_ADDRESS as `0x${string}` });
      if (code === "0x") {
        setTestResult("❌ No contract deployed at this address");
      } else {
        setTestResult(`✅ Contract exists at ${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`);
      }
    } catch (error) {
      setTestResult(`❌ Error checking contract: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  // Test manual contract address
  const testManualContractAddress = async () => {
    if (!publicClient || !manualContractAddress) return;
    
    setIsTestingManualAddress(true);
    try {
      const code = await publicClient.getCode({ address: manualContractAddress as `0x${string}` });
      if (code === "0x") {
        setTestResult(`❌ No contract deployed at ${manualContractAddress.slice(0, 6)}...${manualContractAddress.slice(-4)}`);
      } else {
        setTestResult(`✅ Contract exists at ${manualContractAddress.slice(0, 6)}...${manualContractAddress.slice(-4)} (${code?.length || 0} bytes)`);
      }
    } catch (error) {
      setTestResult(`❌ Error checking manual contract: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsTestingManualAddress(false);
    }
  };

  // If there's an active duel, show the game arena
  if (currentDuel) {
    return (
      <GameArena 
        duel={currentDuel} 
        onBackToHub={handleBackToHub}
        playerAddress={address}
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with pixel grid */}
      <div className="absolute inset-0 pixel-grid"></div>
      
      {/* Floating pixel stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="pixel-star" style={{ top: '10%', left: '10%' }}></div>
        <div className="pixel-star" style={{ top: '20%', left: '80%' }}></div>
        <div className="pixel-star" style={{ top: '30%', left: '20%' }}></div>
        <div className="pixel-star" style={{ top: '40%', left: '70%' }}></div>
        <div className="pixel-star" style={{ top: '50%', left: '15%' }}></div>
        <div className="pixel-star" style={{ top: '60%', left: '85%' }}></div>
        <div className="pixel-star" style={{ top: '70%', left: '25%' }}></div>
        <div className="pixel-star" style={{ top: '80%', left: '75%' }}></div>
      </div>

      {/* Floating pixel clouds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="pixel-cloud" style={{ top: '15%', left: '30%', width: '40px', height: '24px' }}></div>
        <div className="pixel-cloud" style={{ top: '45%', right: '20%', width: '32px', height: '20px' }}></div>
        <div className="pixel-cloud" style={{ top: '75%', left: '60%', width: '36px', height: '22px' }}></div>
      </div>

      <div className="relative z-10 space-y-8 px-4 py-8">
        {/* Hero Section */}
        <div className="text-center py-16">
          <div className="relative">
            <h1 className="pixel-title mb-6">
              THE TERMINAL
            </h1>
            
            {/* Pixel Art Style Decoration */}
            <div className="flex justify-center space-x-2 mb-4">
              <div className="w-4 h-4 bg-white border-2 border-black"></div>
              <div className="w-4 h-4 bg-black border-2 border-white"></div>
              <div className="w-4 h-4 bg-white border-2 border-black"></div>
            </div>
          </div>
          
          <p className="pixel-text-white text-xl max-w-3xl mx-auto leading-relaxed">
            Welcome to the digital arena, Runner. Choose your path: create a challenge, 
            accept an existing duel, or jump into a quick match.
          </p>
          
          {/* Pixel Art Decorative Elements */}
          <div className="flex justify-center mt-8 space-x-4">
            <div className="w-2 h-8 bg-white border border-black"></div>
            <div className="w-2 h-12 bg-white border border-black"></div>
            <div className="w-2 h-8 bg-white border border-black"></div>
          </div>
        </div>

        {/* Countdown Timer Section */}
        <div className="text-center mb-12">
          <h2 className="pixel-text-white text-2xl mb-4">STARTS IN</h2>
          <div className="countdown-timer">
            <div className="countdown-unit">
              <span className="countdown-number">10</span>
              <span className="countdown-label">DAYS</span>
            </div>
            <div className="countdown-unit">
              <span className="countdown-number">12</span>
              <span className="countdown-label">HOURS</span>
            </div>
            <div className="countdown-unit">
              <span className="countdown-number">34</span>
              <span className="countdown-label">MINUTES</span>
            </div>
            <div className="countdown-unit">
              <span className="countdown-number">24</span>
              <span className="countdown-label">SECONDS</span>
            </div>
          </div>
        </div>

        {/* Quick Duel Button */}
        <div className="mb-8 text-center">
          <button
            onClick={handleQuickDuel}
            className="pixel-button px-16 py-6 text-2xl"
          >
            ⚔️ QUICK DUEL ⚔️
          </button>
        </div>

        {/* Test Contract Button */}
        <div className="mb-6 text-center">
          <button
            onClick={handleTestContract}
            className="pixel-button px-6 py-3 text-lg"
          >
            🔧 TEST CONTRACT
          </button>
          {testResult && (
            <div className="mt-3 p-3 pixel-card max-w-md mx-auto">
              <p className="pixel-text text-sm">{testResult}</p>
            </div>
          )}
        </div>

        {/* Check Contract Existence Button */}
        <div className="mb-6 text-center">
          <button
            onClick={checkContractExists}
            className="pixel-button px-6 py-3 text-lg"
          >
            🔍 CHECK CONTRACT EXISTS
          </button>
        </div>

        {/* Manual Contract Address Testing */}
        <div className="mb-6 text-center">
          <div className="pixel-card p-4 max-w-md mx-auto">
            <p className="pixel-text text-sm mb-3 font-bold">TEST MANUAL CONTRACT ADDRESS</p>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={manualContractAddress}
                onChange={(e) => setManualContractAddress(e.target.value)}
                placeholder="Enter contract address (0x...)"
                className="flex-1 px-3 py-2 pixel-input"
              />
              <button
                onClick={testManualContractAddress}
                disabled={!manualContractAddress || isTestingManualAddress}
                className="pixel-button px-4 py-2 text-sm"
              >
                {isTestingManualAddress ? "TESTING..." : "TEST"}
              </button>
            </div>
            <p className="pixel-text text-xs">
              Use this to test if a contract exists at a specific address
            </p>
          </div>
        </div>

        {/* Network Info */}
        <div className="mb-6 text-center">
          <div className="inline-block p-3 pixel-card">
            <p className="pixel-text text-xs mb-1 font-bold">NETWORK STATUS</p>
            <p className="pixel-text text-sm">
              {chainId ? `Chain ID: ${chainId}` : "Not connected"}
            </p>
            {CONTRACT_ADDRESS && (
              <p className="pixel-text text-xs mt-1">
                Contract: {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
              </p>
            )}
            {chainId && !CONTRACT_ADDRESS && (
              <p className="pixel-text text-xs text-red-600 mt-1">
                ⚠️ Unsupported network. Please switch to Base Sepolia (84532)
              </p>
            )}
            {chainId && CONTRACT_ADDRESS && (
              <div className="mt-2">
                <p className="pixel-text text-xs">
                  Expected Network: Base Sepolia (84532)
                </p>
                <p className="pixel-text text-xs">
                  Current Network: {chainId === 84532 ? "✅ Correct" : "❌ Wrong Network"}
                </p>
              </div>
            )}
          </div>
          
          {/* Network Switch Button */}
          {chainId && chainId !== 84532 && (
            <div className="mt-3">
              <button
                onClick={handleSwitchToBaseSepolia}
                className="pixel-button px-6 py-3 text-sm"
              >
                🔄 SWITCH TO BASE SEPOLIA
              </button>
            </div>
          )}
        </div>

        {/* Troubleshooting Info */}
        <div className="mb-6 text-center">
          <div className="pixel-card p-4 max-w-2xl mx-auto">
            <h3 className="pixel-text text-lg mb-3 font-bold">🔧 TROUBLESHOOTING</h3>
            <div className="text-left text-sm space-y-2">
              <p className="pixel-text font-bold">Common Issues:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 pixel-text">
                <li>Contract not deployed on Base Sepolia</li>
                <li>Wrong network connected</li>
                <li>Contract address outdated</li>
                <li>RPC endpoint issues</li>
              </ul>
              <p className="mt-3 pixel-text font-bold">Solutions:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 pixel-text">
                <li>Ensure you&apos;re on Base Sepolia (Chain ID: 84532)</li>
                <li>Check if contract exists using the test buttons above</li>
                <li>Try testing with a different contract address</li>
                <li>Verify your wallet connection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Create Duel Panel */}
        {showCreatePanel && (
          <div className="mb-8">
            <CreateDuelPanel
              onCreateDuel={handleCreateDuel}
              onCancel={() => setShowCreatePanel(false)}
            />
          </div>
        )}

        {/* Duel Board */}
        <div className="pixel-card p-6 max-w-4xl mx-auto">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-black border-2 border-white flex items-center justify-center mr-4">
              <span className="text-white text-xl">📋</span>
            </div>
            <h3 className="pixel-text text-2xl font-bold">DUEL BOARD</h3>
          </div>
          <DuelBoard 
            duels={openDuels} 
            isLoading={isLoading}
            onJoinDuel={handleJoinDuel}
            playerAddress={address}
          />
        </div>

        {/* Bottom Decorative Bar */}
        <div className="flex justify-center py-8">
          <div className="w-full max-w-4xl h-2 bg-white border-2 border-black"></div>
        </div>
      </div>
    </div>
  );
}

