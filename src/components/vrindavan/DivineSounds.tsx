"use client";

import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { useState } from "react";

export default function DivineSounds() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // In a real implementation, this would connect to an HTMLAudioElement.
  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="w-full max-w-4xl mx-auto mb-32 px-6 relative z-10">
      
      <div className="text-center mb-12">
        <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Divine Sounds Of Vrindavan
        </h3>
        <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
          Experience The Ambience (Temple Bells & Soft Bansuri)
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-[#FFFBF4]/80 backdrop-blur-2xl border border-gold-start/30 rounded-full p-4 md:p-6 shadow-[0_20px_50px_rgba(212,168,83,0.15)] flex items-center justify-between overflow-hidden"
      >
        {/* Animated Sound Waves Background */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full bg-gold-start rounded-full"
            />
          </div>
        )}

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-start to-[#8B6F4E] flex items-center justify-center text-white shadow-inner">
            <Music className="w-5 h-5" />
          </div>
          <div className="hidden md:block">
            <h4 className="font-display font-bold text-[#5C1A1A]">Mangal Aarti Ambience</h4>
            <p className="text-[9px] uppercase tracking-widest font-bold text-warm-gray">Shri Radha Raman Ji Temple</p>
          </div>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          <button 
            onClick={toggleMute}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gold-start/10 text-charcoal transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-[#5C1A1A] text-white flex items-center justify-center hover:bg-[#8B2B2B] shadow-md transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
          </button>
        </div>

      </motion.div>
    </div>
  );
}
