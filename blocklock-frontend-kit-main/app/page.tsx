"use client";
import React from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import GameHub from "@/components/mempool-duel/GameHub";
import Header from "@/components/mempool-duel/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const { isConnected } = useAccount();

  return isConnected ? (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <GameHub />
      </div>
      <Footer />
    </div>
  ) : (
    <div className="min-h-screen pixel-grid flex items-center justify-center relative overflow-hidden">
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

      <div className="relative z-10 text-center">
        <div className="pixel-card p-12 max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-black border-4 border-white flex items-center justify-center mx-auto mb-8">
            <div className="w-10 h-10 bg-white border-2 border-black"></div>
          </div>
          
          <h1 className="pixel-title text-5xl md:text-6xl mb-6">
            MEMPOOL DUEL
          </h1>
          
          <p className="pixel-text text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Connect your wallet to enter the digital arena where data couriers settle disputes through encrypted duels
          </p>
          
          <div className="flex justify-center mb-6">
            <ConnectButton />
          </div>
          
          {/* Decorative elements */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-black border border-white"></div>
            <div className="w-2 h-2 bg-white border border-black"></div>
            <div className="w-2 h-2 bg-black border border-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
