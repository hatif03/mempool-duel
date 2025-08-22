"use client";
import React, { useState } from "react";

interface CreateDuelPanelProps {
  onCreateDuel: (wager: string) => void;
  onCancel: () => void;
}

const CreateDuelPanel: React.FC<CreateDuelPanelProps> = ({ onCreateDuel, onCancel }) => {
  const [wager, setWager] = useState("0.001");
  const [isCreating, setIsCreating] = useState(false);

  const presetWagers = ["0.001", "0.01", "0.1", "1.0"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wager || isCreating) return;

    setIsCreating(true);
    try {
      await onCreateDuel(wager);
    } catch (error) {
      console.error("Failed to create duel:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="pixel-card p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="pixel-text text-3xl font-bold mb-2">CREATE DUEL</h3>
        <p className="pixel-text text-sm">Set your wager and challenge other Runners</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Wager Selection */}
        <div>
          <label className="block pixel-text font-bold text-sm mb-3">
            SELECT WAGER AMOUNT
          </label>
          <div className="grid grid-cols-2 gap-3">
            {presetWagers.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setWager(preset)}
                className={`pixel-button p-3 text-sm ${
                  wager === preset
                    ? "bg-black text-white border-white"
                    : ""
                }`}
              >
                {preset} ETH
              </button>
            ))}
          </div>
        </div>

        {/* Custom Wager Input */}
        <div>
          <label className="block pixel-text font-bold text-sm mb-3">
            CUSTOM WAGER
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.001"
              min="0.001"
              value={wager}
              onChange={(e) => setWager(e.target.value)}
              className="w-full px-4 py-3 pixel-input"
              placeholder="Enter wager amount"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pixel-text text-sm">
              ETH
            </div>
          </div>
        </div>

        {/* Create Button */}
        <button
          type="submit"
          disabled={isCreating || !wager}
          className="w-full py-4 pixel-button text-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span>CREATING DUEL...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-3">
              <span>⚔️</span>
              <span>CREATE CHALLENGE</span>
              <span>⚔️</span>
            </div>
          )}
        </button>

        {/* Cancel Button */}
        <button
          type="button"
          onClick={onCancel}
          className="w-full py-3 pixel-button text-lg"
        >
          CANCEL
        </button>
      </form>

      {/* Game Rules */}
              <div className="mt-6 p-4 pixel-card">
          <h4 className="pixel-text font-bold text-sm mb-3">DUEL RULES</h4>
          <div className="space-y-2 text-xs pixel-text">
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

export default CreateDuelPanel;

