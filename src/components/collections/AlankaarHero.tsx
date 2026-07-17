"use client";

import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";

export default function AlankaarHero() {
  return (
    <div className="relative w-full pt-32 pb-16 px-6 lg:px-16 flex flex-col items-center justify-center text-center z-10 overflow-hidden">
      
      {/* ── Sacred Jewel (Ratna) Background ── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 flex justify-center opacity-30">
        {/* Subtle geometric mandala representing jewel facets */}
        <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax slice" fill="none">
          <circle cx="500" cy="300" r="250" stroke="#FFB7B2" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="500" cy="300" r="150" stroke="#D4A853" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M 500 50 L 750 300 L 500 550 L 250 300 Z" stroke="#FFB7B2" strokeWidth="0.5" strokeOpacity="0.5" />
          <path d="M 500 150 L 650 300 L 500 450 L 350 300 Z" stroke="#D4A853" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
      </div>

      {/* ── Atmospheric Temple Lighting ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[50vh] bg-gradient-to-b from-lotus/20 via-gold-start/10 to-transparent blur-[80px] pointer-events-none z-0" />
      <div className="absolute top-32 left-10 w-72 h-72 bg-lotus/15 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-gold-start/15 rounded-full blur-[60px] pointer-events-none" />

      {/* ── Floating Sparkles (Diamond/Pearl effect) ── */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute pointer-events-none z-0"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            scale: [0.5, 1.2, 0.5],
            opacity: [0.2, 0.8, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <Sparkles className="w-3 h-3 text-gold-start/70" />
        </motion.div>
      ))}

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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-lotus/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
        >
          <Star className="w-3.5 h-3.5 text-lotus fill-lotus/30" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-charcoal">
            The Divine Ornaments
          </span>
          <Star className="w-3.5 h-3.5 text-lotus fill-lotus/30" />
        </motion.div>

        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#5C1A1A] tracking-wider leading-[1.15] drop-shadow-sm">
          Shri Radha Rani & Shri Radha Raman Ji's<br/>
          <span className="bg-gradient-to-r from-[#D4A853] via-[#FFB7B2] to-[#D4A853] text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient">
            Ratna Alankaar Mandir
          </span>
        </h1>

        <p className="text-sm md:text-base text-[#8B6F4E] font-medium max-w-2xl mx-auto leading-relaxed tracking-wide">
          Step into the sacred treasury of Vrindavan. Every Mukut, every Bansuri, and every pearl is a handcrafted expression of pure Bhakti, ready to adorn your beloved Thakurji.
        </p>

        {/* ── Premium Quick Filters (CTAs) ── */}
        <div className="pt-8 flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(212,168,83,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] bg-[length:200%_auto] text-white font-bold text-[10px] uppercase tracking-[0.15em] shadow-[0_4px_15px_rgba(212,168,83,0.3)] hover:bg-[position:right_center] transition-all duration-500 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            Latest Divine Ornaments
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255,183,178,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3.5 rounded-full bg-white/60 backdrop-blur-md border border-lotus/40 text-[#5C1A1A] font-bold text-[10px] uppercase tracking-[0.15em] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] hover:bg-white transition-all"
          >
            Mukut & Bansuri Collections
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
