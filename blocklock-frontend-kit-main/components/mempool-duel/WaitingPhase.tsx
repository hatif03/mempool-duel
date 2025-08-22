"use client";
import React, { useState, useEffect } from "react";

interface Duel {
  id: string;
  player1: string;
  player2?: string;
  wager: string;
  status: string;
}

interface WaitingPhaseProps {
  duel: Duel;
  currentBlock: number;
  targetBlock: number;
}

const WaitingPhase: React.FC<WaitingPhaseProps> = ({ 
  currentBlock, 
  targetBlock 
}) => {
  const [blocksRemaining, setBlocksRemaining] = useState(targetBlock - currentBlock);
  const [estimatedTime, setEstimatedTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, targetBlock - currentBlock);
      setBlocksRemaining(remaining);
      
      // Estimate time remaining (assuming 12 second blocks)
      const secondsRemaining = remaining * 12;
      const minutes = Math.floor(secondsRemaining / 60);
      const seconds = secondsRemaining % 60;
      setEstimatedTime(`${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentBlock, targetBlock]);

  return (
    <div className="text-center py-20">
      {/* Title with Pixel Art Style */}
      <div className="relative mb-12">
        <h1 className="pixel-title mb-4">
          THE MEMPOOL
        </h1>
        
        {/* Pixel Art Style Decoration */}
        <div className="flex justify-center space-x-2 mb-4">
          <div className="w-4 h-4 bg-white border-2 border-black"></div>
          <div className="w-4 h-4 bg-black border-2 border-white"></div>
          <div className="w-4 h-4 bg-white border-2 border-black"></div>
        </div>
      </div>
      
      {/* Status */}
      <div className="mb-12">
        <div className="pixel-text-white text-3xl mb-4">
          MOVES LOCKED
        </div>
        <div className="pixel-text-white text-xl">
          AWAITING BLOCK CONFIRMATION
        </div>
      </div>

      {/* Encrypted Moves Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
        {/* Player 1 Move */}
        <div className="pixel-card p-8">
          <div className="pixel-text text-sm mb-4 font-bold">PLAYER 1</div>
          <div className="bg-gray-200 p-6 border-2 border-black relative overflow-hidden">
            <div className="text-5xl mb-3">🔒</div>
            <div className="pixel-text text-xl">ENCRYPTED DATA</div>
            <div className="pixel-text text-sm mt-3">Move locked in ciphertext</div>
          </div>
        </div>

        {/* Player 2 Move */}
        <div className="pixel-card p-8">
          <div className="pixel-text text-sm mb-4 font-bold">PLAYER 2</div>
          <div className="bg-gray-200 p-6 border-2 border-black relative overflow-hidden">
            <div className="text-5xl mb-3">🔒</div>
            <div className="pixel-text text-xl">ENCRYPTED DATA</div>
            <div className="pixel-text text-sm mt-3">Move locked in ciphertext</div>
          </div>
        </div>
      </div>

      {/* Data Flow Animation */}
      <div className="mb-12">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-4 h-4 bg-white border border-black"></div>
          <div className="w-4 h-4 bg-black border border-white"></div>
          <div className="w-4 h-4 bg-white border border-black"></div>
        </div>
        
        {/* Smart Contract Icon */}
        <div className="w-16 h-16 bg-black border-2 border-white flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">⚡</span>
        </div>
        
        <div className="pixel-text-white text-sm">
          SYNCHRONIZING WITH BLOCKCHAIN...
        </div>
      </div>

      {/* Block Counter */}
      <div className="pixel-card p-8 max-w-2xl mx-auto mb-8">
        <div className="pixel-text text-sm mb-4 font-bold">BLOCK PROGRESS</div>
        
        <div className="text-5xl font-bold pixel-text mb-4">
          {currentBlock} / {targetBlock}
        </div>
        
        <div className="pixel-text mb-6 text-lg">
          {blocksRemaining} blocks remaining
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white border-2 border-black h-4 mb-6 overflow-hidden">
          <div 
            className="bg-black h-4 transition-all duration-1000"
            style={{ width: `${Math.max(0, Math.min(100, ((targetBlock - blocksRemaining) / targetBlock) * 100))}%` }}
          ></div>
        </div>
        
        <div className="pixel-text text-sm">
          Estimated time: {estimatedTime}
        </div>
      </div>

      {/* Explanation */}
      <div className="pixel-card p-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <span className="text-2xl mr-3">ℹ️</span>
          <h3 className="pixel-text text-lg font-bold">HOW IT WORKS</h3>
        </div>
        <p className="pixel-text text-sm leading-relaxed">
          Your moves are encrypted and hidden from each other until they are revealed simultaneously 
          at the target block. This prevents cheating and ensures a fair duel. The blocklock network 
          will automatically deliver the decryption keys when the time comes.
        </p>
        
        {/* Decorative elements */}
        <div className="flex justify-center mt-4 space-x-2">
          <div className="w-2 h-2 bg-black border border-white"></div>
          <div className="w-2 h-2 bg-white border border-black"></div>
          <div className="w-2 h-2 bg-black border border-white"></div>
        </div>
      </div>
    </div>
  );
};

export default WaitingPhase;

