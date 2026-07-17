"use client";

import { motion } from "framer-motion";
import { Crown, Star } from "lucide-react";

export default function VastraMandirHero() {
  return (
    <div className="relative w-full pt-32 pb-16 px-6 lg:px-16 flex flex-col items-center justify-center text-center z-10 overflow-hidden">
      
      {/* ── Architectural Mandir Background ── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 flex justify-center opacity-30">
        <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax slice" fill="none">
          {/* Subtle Temple Arches (Jharokha style) */}
          <path d="M 200 600 L 200 200 C 200 50, 350 -50, 500 100 C 650 -50, 800 50, 800 200 L 800 600" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="6 6" />
          <path d="M 300 600 L 300 250 C 300 120, 420 50, 500 150 C 580 50, 700 120, 700 250 L 700 600" stroke="#E8850A" strokeWidth="0.5" />
          
          <path d="M 400 600 L 400 300 C 400 200, 460 150, 500 220 C 540 150, 600 200, 600 300 L 600 600" stroke="#D4A853" strokeWidth="1.5" />
        </svg>
      </div>

      {/* ── Atmospheric Temple Lighting ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[50vh] bg-gradient-to-b from-peacock/20 via-saffron-muted/10 to-transparent blur-[80px] pointer-events-none z-0" />
      <div className="absolute top-32 left-10 w-72 h-72 bg-peacock/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-saffron-deep/10 rounded-full blur-[60px] pointer-events-none" />

      {/* ── Hero Content ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-4xl mx-auto space-y-6 relative z-10"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-[#1E3A8A]/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
        >
          <Star className="w-3.5 h-3.5 text-peacock fill-peacock/30" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-charcoal">
            The Supreme Offering
          </span>
          <Star className="w-3.5 h-3.5 text-peacock fill-peacock/30" />
        </motion.div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#5C1A1A] tracking-wider leading-[1.1] drop-shadow-sm">
          Shri Radha Raman Ji's<br/>
          <span className="bg-gradient-to-r from-[#1E3A8A] via-[#E8850A] to-[#1E3A8A] text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient">
            Divine Vastra Mandir
          </span>
        </h1>

        <p className="text-sm md:text-base text-[#8B6F4E] font-medium max-w-2xl mx-auto leading-relaxed tracking-wide">
          Enter the sacred temple of Thakurji’s attire. Every thread woven into these Poshaks is an act of pure devotion, preparing your beloved Krishna for his eternal pastimes.
        </p>

        {/* ── Premium Quick Filters (CTAs) ── */}
        <div className="pt-8 flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(30,58,138,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#1E3A8A] via-[#2A3A6A] to-[#1E3A8A] bg-[length:200%_auto] text-white font-bold text-[10px] uppercase tracking-[0.15em] shadow-[0_4px_15px_rgba(30,58,138,0.3)] hover:bg-[position:right_center] transition-all duration-500 flex items-center gap-2"
          >
            <Crown className="w-3.5 h-3.5 text-white" />
            Latest Divine Offerings
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(232,133,10,0.15)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3.5 rounded-full bg-white/60 backdrop-blur-md border border-saffron/40 text-[#5C1A1A] font-bold text-[10px] uppercase tracking-[0.15em] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] hover:bg-white transition-all"
          >
            Janmashtami Collections
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
