"use client";
import React, { useState, useEffect } from "react";

interface Duel {
  id: string;
  player1: string;
  player2?: string;
  wager: string;
  status: string;
}

interface MoveSelectorProps {
  onMoveSelect: (move: number) => void;
  selectedMove: number | null;
  duel: Duel;
  playerAddress?: string;
}

const MoveSelector: React.FC<MoveSelectorProps> = ({ 
  onMoveSelect, 
  selectedMove, 
  duel
}) => {
  const [countdown, setCountdown] = useState(15);
  const [isWaitingForOpponent, setIsWaitingForOpponent] = useState(false);

  const moves = [
    {
      id: 0,
      name: "ICE",
      description: "Brute-force defensive program",
      icon: "🛡️",
      color: "bg-blue-600",
      beats: "Glitch"
    },
    {
      id: 1,
      name: "SPIKE",
      description: "Sharp, invasive script",
      icon: "⚡",
      color: "bg-yellow-600",
      beats: "Ice"
    },
    {
      id: 2,
      name: "GLITCH",
      description: "Disruptive code snippet",
      icon: "💀",
      color: "bg-red-600",
      beats: "Spike"
    }
  ];

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    // Check if opponent has joined
    if (duel.player2) {
      setIsWaitingForOpponent(true);
    }
  }, [duel.player2]);

  const handleMoveSelect = (moveId: number) => {
    onMoveSelect(moveId);
  };

  if (isWaitingForOpponent && !duel.player2) {
    return (
      <div className="text-center py-20">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        
        <h2 className="pixel-title text-4xl mb-6">
          AWAITING OPPONENT
        </h2>
        
        <div className="pixel-card p-6 max-w-md mx-auto">
          <p className="pixel-text text-lg text-black mb-4">
            Waiting for another Runner to accept your challenge...
          </p>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-black border border-white"></div>
            <div className="w-2 h-2 bg-white border border-black"></div>
            <div className="w-2 h-2 bg-black border border-white"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* Game Title */}
      <div className="mb-12">
        <h1 className="pixel-title mb-6">
          CHOOSE YOUR MOVE
        </h1>
                  <p className="pixel-text-white text-xl">
            Select your strategy and commit to the blockchain
          </p>
      </div>

      {/* Countdown Timer */}
      <div className="mb-12">
        <div className="relative">
          <div className="text-7xl font-bold text-white pixel-text mb-2">
            {countdown}
          </div>
        </div>
        <p className="pixel-text-white tracking-wide">SECONDS TO DECIDE</p>
        
        {/* Progress bar */}
        <div className="w-32 h-2 bg-white border border-black mx-auto mt-4 overflow-hidden">
          <div 
            className="h-full bg-black transition-all duration-1000"
            style={{ width: `${(countdown / 15) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Move Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {moves.map((move) => (
          <div
            key={move.id}
            className={`relative group cursor-pointer transition-all duration-300 ${
              selectedMove === move.id ? 'scale-110' : 'hover:scale-105'
            }`}
            onClick={() => handleMoveSelect(move.id)}
          >
            {/* Move Card */}
            <div className={`pixel-card p-8 ${selectedMove === move.id ? 'ring-4 ring-black' : ''}`}>
              {/* Icon */}
              <div className="text-6xl mb-4">{move.icon}</div>
              
              {/* Name */}
              <h3 className="pixel-text text-2xl mb-2 font-bold">
                {move.name}
              </h3>
              
              {/* Description */}
              <p className="pixel-text text-sm mb-3">
                {move.description}
              </p>
              
              {/* Beats */}
              <div className="text-xs pixel-text opacity-75">
                Beats: {move.beats}
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedMove === move.id && (
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-black border-2 border-white rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-lg">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Commit Button */}
      {selectedMove !== null && (
        <div className="mb-12">
          <button
            onClick={() => onMoveSelect(selectedMove)}
            className="pixel-button px-16 py-6 text-2xl"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔒</span>
              <span>COMMIT MOVE</span>
              <span className="text-2xl">🔒</span>
            </div>
          </button>
          
          <p className="pixel-text-white text-sm mt-4">
            Your choice will be encrypted and locked until reveal
          </p>
        </div>
      )}

      {/* Game Rules */}
      <div className="pixel-card p-6 max-w-2xl mx-auto">
        <h3 className="pixel-text text-lg mb-4 font-bold">DUEL RULES</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm pixel-text">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-blue-600 border border-black"></span>
            <span><span className="font-bold">ICE</span> breaks <span className="font-bold">Glitch</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-red-600 border border-black"></span>
            <span><span className="font-bold">Glitch</span> corrupts <span className="font-bold">Spike</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-yellow-600 border border-black"></span>
            <span><span className="font-bold">Spike</span> bypasses <span className="font-bold">Ice</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveSelector;

