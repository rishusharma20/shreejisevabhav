"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BLESSINGS = [
  "May your home forever remain filled with love, peace and devotion.",
  "May the divine dust of Vrindavan always guide your steps and protect your path.",
  "Every act of Seva brings you closer to the divine lotus feet of Shri Radha Raman Ji.",
  "May your heart be filled with the eternal joy of Bhakti and Prem."
];

export default function SangamTodaysBlessing() {
  const [blessing, setBlessing] = useState("");

  useEffect(() => {
    // Randomize on client mount
    setBlessing(BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)]);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mb-32 px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-xl border border-gold-start/40 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.15)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-rose-400/10 to-transparent blur-[50px] pointer-events-none" />
        
        <h4 className="font-display text-2xl font-bold text-[#5C1A1A] tracking-wider mb-6">
          जय श्री राधे।
        </h4>
        
        <div className="w-12 h-[1px] bg-gold-start/50 mx-auto mb-8" />
        
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8B6F4E] mb-6">
          Today's Divine Blessing
        </p>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={blessing}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="min-h-[120px] flex items-center justify-center"
          >
            <p className="font-medium text-charcoal/80 text-xl md:text-2xl italic leading-relaxed max-w-2xl mx-auto">
              {blessing}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10">
          <Link href="/">
            <button className="bg-[#5C1A1A] text-white rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg hover:bg-[#8B2B2B] transition-colors inline-flex items-center gap-2">
              Continue Your Journey <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
