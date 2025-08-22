"use client";
import React from "react";

interface QuickDuelButtonProps {
  onClick: () => void;
}

const QuickDuelButton: React.FC<QuickDuelButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative px-16 py-6 bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 text-white font-bold text-2xl font-mono rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Glitch Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      
      {/* Button Content */}
      <div className="relative flex items-center space-x-3">
        <span className="text-3xl">⚔️</span>
        <span className="tracking-wider">QUICK DUEL</span>
        <span className="text-3xl">⚔️</span>
      </div>
      
      {/* Neon Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      
      {/* Pixel Art Border */}
      <div className="absolute inset-0 rounded-xl border-2 border-cyan-400/50 group-hover:border-cyan-300 transition-colors duration-300"></div>
    </button>
  );
};

export default QuickDuelButton;

