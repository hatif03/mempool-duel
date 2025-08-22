"use client";
import React, { useState, useEffect } from "react";
import { useMempoolDuel } from "@/hooks/useMempoolDuel";
import MoveSelector from "./MoveSelector";
import WaitingPhase from "./WaitingPhase";
import GameResult from "./GameResult";

interface Duel {
  id: string;
  player1: string;
  player2?: string;
  wager: string;
  status: string;
  targetBlock: number;
  currentBlock: number;
}

interface GameArenaProps {
  duel: Duel;
  onBackToHub: () => void;
  playerAddress?: string;
}

type GamePhase = "selecting" | "waiting" | "result";

const GameArena: React.FC<GameArenaProps> = ({ 
  duel, 
  onBackToHub, 
  playerAddress 
}) => {
  const [gamePhase, setGamePhase] = useState<GamePhase>("selecting");
  const [selectedMove, setSelectedMove] = useState<number | null>(null);
  const [player1Move, setPlayer1Move] = useState<number | null>(null);
  const [player2Move, setPlayer2Move] = useState<number | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  
  const { commitMove, getDuelStatus } = useMempoolDuel();

  useEffect(() => {
    // Poll for game status updates
    const interval = setInterval(async () => {
      try {
        const status = await getDuelStatus(duel.id);
        if (status.status === "completed") {
          setGamePhase("result");
          setPlayer1Move(status.player1Move);
          setPlayer2Move(status.player2Move);
          setWinner(status.winner);
          setIsDraw(status.isDraw);
        }
      } catch (error) {
        console.error("Failed to get duel status:", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [duel.id, getDuelStatus]);

  const handleMoveCommit = async (move: number) => {
    try {
      setSelectedMove(move);
      await commitMove(duel.id, move);
      setGamePhase("waiting");
    } catch (error) {
      console.error("Failed to commit move:", error);
      setSelectedMove(null);
    }
  };

  const handlePlayAgain = () => {
    onBackToHub();
  };

  const getCurrentPhase = () => {
    switch (gamePhase) {
      case "selecting":
        return (
          <MoveSelector
            onMoveSelect={handleMoveCommit}
            selectedMove={selectedMove}
            duel={duel}
            playerAddress={playerAddress}
          />
        );
      case "waiting":
        return (
          <WaitingPhase
            duel={duel}
            currentBlock={duel.currentBlock}
            targetBlock={duel.targetBlock}
          />
        );
      case "result":
        return (
          <GameResult
            player1Move={player1Move}
            player2Move={player2Move}
            winner={winner}
            isDraw={isDraw}
            wager={duel.wager}
            onPlayAgain={handlePlayAgain}
            onBackToHub={onBackToHub}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-cyan-500/30 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={onBackToHub}
            className="text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
          >
            ← BACK TO TERMINAL
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-cyan-400 font-mono">
              THE ARENA
            </h1>
            <p className="text-gray-400 text-sm font-mono">
              Duel #{duel.id}
            </p>
          </div>
          <div className="text-right">
            <div className="text-cyan-400 text-xs font-mono">POT</div>
            <div className="text-white font-bold font-mono">
              {parseFloat(duel.wager) * 2} ETH
            </div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {getCurrentPhase()}
      </div>
    </div>
  );
};

export default GameArena;

