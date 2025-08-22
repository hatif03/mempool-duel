"use client";
import React from "react";
import { Duel } from "@/hooks/useMempoolDuel";

interface DuelBoardProps {
  duels: Duel[];
  isLoading: boolean;
  onJoinDuel: (duelId: string) => void;
  playerAddress?: string;
}

const DuelBoard: React.FC<DuelBoardProps> = ({ 
  duels, 
  isLoading, 
  onJoinDuel, 
  playerAddress 
}) => {
  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s ago`;
    }
    return `${seconds}s ago`;
  };

  const handleJoinDuel = (duelId: string) => {
    onJoinDuel(duelId);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="pixel-text text-sm">
          SCANNING FOR CHALLENGES...
        </p>
      </div>
    );
  }

  if (duels.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-black border-2 border-white flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">📋</span>
        </div>
        <h3 className="pixel-text text-lg mb-2 font-bold">
          NO ACTIVE CHALLENGES
        </h3>
        <p className="pixel-text text-sm">
          Be the first to create a duel and challenge other Runners!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <span className="pixel-text text-sm font-bold">
          ACTIVE CHALLENGES ({duels.length})
        </span>
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-black border border-white"></div>
          <div className="w-2 h-2 bg-white border border-black"></div>
          <div className="w-2 h-2 bg-black border border-white"></div>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {duels.map((duel) => (
          <div
            key={duel.id}
            className="pixel-card p-4 hover:bg-gray-100 transition-colors duration-200 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black border-2 border-white flex items-center justify-center">
                  <span className="text-white text-sm font-bold">⚡</span>
                </div>
                <div>
                  <div className="pixel-text text-xs">
                    CHALLENGER
                  </div>
                  <div className="pixel-text text-sm font-bold">
                    {duel.player1.slice(0, 6)}...{duel.player1.slice(-4)}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="pixel-text text-xs">
                  WAGER
                </div>
                <div className="pixel-text text-sm font-bold">
                  {duel.wager} ETH
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="pixel-text text-xs">
                {formatTimeAgo(duel.createdAt)}
              </div>
              
              {duel.player1 !== playerAddress && (
                <button
                  onClick={() => handleJoinDuel(duel.id)}
                  className="px-4 py-2 pixel-button text-sm group-hover:bg-black group-hover:text-white"
                >
                  ACCEPT CHALLENGE
                </button>
              )}
              
              {duel.player1 === playerAddress && (
                <div className="px-4 py-2 bg-gray-300 pixel-text text-sm font-bold">
                  YOUR CHALLENGE
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Refresh Indicator */}
      <div className="text-center pt-4">
        <div className="inline-flex items-center space-x-2 pixel-text text-xs">
          <div className="w-2 h-2 bg-black border border-white"></div>
          <span>Auto-refreshing every 10 seconds</span>
        </div>
      </div>
    </div>
  );
};

export default DuelBoard;

