"use client";
import React from "react";

interface GameResultProps {
  player1Move: number | null;
  player2Move: number | null;
  winner: string | null;
  isDraw: boolean;
  wager: string;
  onPlayAgain: () => void;
  onBackToHub: () => void;
}

const GameResult: React.FC<GameResultProps> = ({
  player1Move,
  player2Move,
  winner,
  isDraw,
  wager,
  onPlayAgain,
  onBackToHub,
}) => {
  const getMoveName = (move: number) => {
    switch (move) {
      case 0: return "ICE";
      case 1: return "SPIKE";
      case 2: return "GLITCH";
      default: return "UNKNOWN";
    }
  };

  const getMoveIcon = (move: number) => {
    switch (move) {
      case 0: return "🛡️";
      case 1: return "⚡";
      case 2: return "💀";
      default: return "❓";
    }
  };

  const getMoveColor = (move: number) => {
    switch (move) {
      case 0: return "bg-blue-600";
      case 1: return "bg-yellow-600";
      case 2: return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getResultText = () => {
    if (isDraw) return "DRAW";
    if (winner) return "VICTORY";
    return "DEFEAT";
  };

  const getResultColor = () => {
    if (isDraw) return "text-yellow-600";
    if (winner) return "text-green-600";
    return "text-red-600";
  };

  return (
    <div className="text-center py-20">
      {/* Result Title */}
      <div className="mb-12">
        <h1 className={`pixel-title ${getResultColor()}`}>
          {getResultText()}
        </h1>
        
        {/* Pixel Art Style Decoration */}
        <div className="flex justify-center space-x-2 mb-4">
          <div className="w-4 h-4 bg-white border-2 border-black"></div>
          <div className="w-4 h-4 bg-black border-2 border-white"></div>
          <div className="w-4 h-4 bg-white border-2 border-black"></div>
        </div>
      </div>

      {/* Moves Reveal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
        {/* Player 1 Move */}
        <div className="pixel-card p-8">
          <div className="pixel-text text-sm mb-4 font-bold">PLAYER 1</div>
          <div className={`${getMoveColor(player1Move || 0)} p-6 border-2 border-black relative overflow-hidden`}>
            <div className="text-5xl mb-3 text-white">{getMoveIcon(player1Move || 0)}</div>
            <div className="pixel-text text-white text-2xl mb-2">{getMoveName(player1Move || 0)}</div>
            <div className="text-white/80 text-sm">Brute-force defensive program</div>
          </div>
        </div>

        {/* Player 2 Move */}
        <div className="pixel-card p-8">
          <div className="pixel-text text-sm mb-4 font-bold">PLAYER 2</div>
          <div className={`${getMoveColor(player2Move || 0)} p-6 border-2 border-black relative overflow-hidden`}>
            <div className="text-5xl mb-3 text-white">{getMoveIcon(player2Move || 0)}</div>
            <div className="pixel-text text-white text-2xl mb-2">{getMoveName(player2Move || 0)}</div>
            <div className="text-white/80 text-sm">Sharp, invasive script</div>
          </div>
        </div>
      </div>

      {/* Result Details */}
      <div className="pixel-card p-8 max-w-2xl mx-auto mb-12">
        {isDraw ? (
          <div className="text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="pixel-text text-2xl text-yellow-600 mb-4 font-bold">
              IT&apos;S A DRAW!
            </h3>
            <p className="pixel-text mb-4">
              Both players chose the same move. Wagers will be returned.
            </p>
            <div className="pixel-text text-lg font-bold">
              Refund: {wager} ETH
            </div>
          </div>
        ) : winner ? (
          <div className="text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="pixel-text text-2xl text-green-600 mb-4 font-bold">
              WINNER TAKES ALL!
            </h3>
            <p className="pixel-text mb-4">
              The victor claims the entire pot.
            </p>
            <div className="pixel-text text-lg font-bold">
              Payout: {parseFloat(wager) * 2} ETH
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-4">💀</div>
            <h3 className="pixel-text text-2xl text-red-600 mb-4 font-bold">
              BETTER LUCK NEXT TIME
            </h3>
            <p className="pixel-text mb-4">
              Your move was countered by the opponent.
            </p>
            <div className="pixel-text text-lg font-bold">
              Loss: {wager} ETH
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
        <button
          onClick={onPlayAgain}
          className="pixel-button px-12 py-4 text-xl"
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">⚔️</span>
            <span>DUEL AGAIN</span>
            <span className="text-2xl">⚔️</span>
          </div>
        </button>

        <button
          onClick={onBackToHub}
          className="pixel-button px-12 py-4 text-xl"
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🏠</span>
            <span>BACK TO TERMINAL</span>
            <span className="text-2xl">🏠</span>
          </div>
        </button>
      </div>

      {/* Transaction Info */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center space-x-2 pixel-text text-xs">
          <div className="w-2 h-2 bg-black border border-white"></div>
          <span>Transaction completed on blockchain</span>
        </div>
      </div>
    </div>
  );
};

export default GameResult;

