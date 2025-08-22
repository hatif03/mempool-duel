"use client";
import React from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const { address } = useAccount();

  return (
    <header className="relative border-b-4 border-black bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-black border-4 border-white flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-white border-2 border-black"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold pixel-text">
                MEMPOOL DUEL
              </h1>
              <p className="pixel-text text-sm">
                Digital Arena
              </p>
            </div>
          </div>

          {/* Runner ID and Connect Button */}
          <div className="flex items-center space-x-4">
            {address && (
              <div className="text-right">
                <div className="pixel-text text-xs">RUNNER ID</div>
                <div className="pixel-text text-sm font-bold">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </div>
              </div>
            )}
            <div className="transform scale-90">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
      
      {/* Pixel Art Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Stars */}
        <div className="pixel-star" style={{ top: '10px', left: '20%' }}></div>
        <div className="pixel-star" style={{ top: '15px', left: '80%' }}></div>
        <div className="pixel-star" style={{ top: '25px', left: '60%' }}></div>
        
        {/* Clouds */}
        <div className="pixel-cloud" style={{ top: '5px', left: '40%', width: '20px', height: '12px' }}></div>
        <div className="pixel-cloud" style={{ top: '20px', right: '30%', width: '16px', height: '10px' }}></div>
      </div>
    </header>
  );
};

export default Header;

