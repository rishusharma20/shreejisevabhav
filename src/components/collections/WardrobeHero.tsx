"use client";

import { motion } from "framer-motion";
import { Sparkles, Crown } from "lucide-react";

export default function WardrobeHero() {
  return (
    <div className="relative w-full pt-32 pb-16 px-6 lg:px-16 flex flex-col items-center justify-center text-center z-10">
      {/* ── Atmospheric Temple Lighting ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-gradient-to-b from-gold-start/20 to-transparent blur-[80px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-saffron-muted/15 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute top-32 left-10 w-72 h-72 bg-lotus/10 rounded-full blur-[60px] pointer-events-none" />

      {/* ── Hero Content ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-4xl mx-auto space-y-6 relative"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-gold-start/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-saffron-deep" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-charcoal">
            The Divine Offerings
          </span>
          <Sparkles className="w-3.5 h-3.5 text-saffron-deep" />
        </motion.div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#5C1A1A] tracking-wider leading-[1.1] drop-shadow-sm">
          Radha Rani's<br/>
          <span className="bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient">
            Divine Wardrobe
          </span>
        </h1>

        <p className="text-sm md:text-base text-[#8B6F4E] font-medium max-w-2xl mx-auto leading-relaxed tracking-wide">
          Step into the sacred boutique of Vrindavan. Every Poshak is not merely woven; it is lovingly handcrafted as an offering of Bhakti, Prem, and Seva for your beloved Thakurji.
        </p>

        {/* ── Premium Quick Filters (CTAs) ── */}
        <div className="pt-8 flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(212,168,83,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] bg-[length:200%_auto] text-white font-bold text-[10px] uppercase tracking-[0.15em] shadow-[0_4px_15px_rgba(212,168,83,0.2)] hover:bg-[position:right_center] transition-all duration-500"
          >
            Latest Divine Arrivals
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(45,42,38,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3.5 rounded-full bg-white/60 backdrop-blur-md border border-gold-start/40 text-[#5C1A1A] font-bold text-[10px] uppercase tracking-[0.15em] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] flex items-center gap-2 hover:bg-white transition-all"
          >
            <Crown className="w-3.5 h-3.5 text-gold-start" />
            Premium Collections
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
