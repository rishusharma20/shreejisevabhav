"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export default function DivineSoundController() {
  const [isPlaying, setIsPlaying] = useState(false);

  // In a real implementation, this would connect to an audio element playing Temple Bells/Bansuri
  // Audio must always default to OFF to respect privacy and browser auto-play policies.

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 right-6 z-[100]">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSound}
        className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border shadow-lg transition-all ${
          isPlaying 
            ? 'bg-gold-start/20 border-gold-start/50 text-[#5C1A1A]' 
            : 'bg-white/60 border-gold-start/30 text-charcoal/50 hover:bg-white'
        }`}
        title={isPlaying ? "Mute Divine Sounds" : "Play Divine Sounds"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
}
