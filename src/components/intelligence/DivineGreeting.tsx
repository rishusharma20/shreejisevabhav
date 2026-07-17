"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar } from "lucide-react";

export default function DivineGreeting() {
  return (
    <div className="w-full text-center relative z-10 pt-16 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-[#8B6F4E] mb-6">
          The Divine Intelligence
        </h1>
        
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#5C1A1A] tracking-wider mb-8 leading-tight drop-shadow-sm">
          WELCOME BACK<br />RISHU.
        </h2>

        {/* Festival Alert Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="inline-flex items-center gap-4 bg-gradient-to-r from-[#FFF5E6] to-[#FFFBF4] border border-gold-start/40 rounded-full px-8 py-4 mb-8 shadow-sm"
        >
          <Calendar className="w-5 h-5 text-gold-start" />
          <div className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest font-bold">
            <span className="text-charcoal">JANMASHTAMI</span>
            <span className="text-warm-gray">is after</span>
            <span className="text-[#5C1A1A]">8 DAYS.</span>
          </div>
        </motion.div>
        
        <div className="w-16 h-[1px] bg-gold-start/40 mx-auto mb-8" />
        
        <div className="text-charcoal/80 font-medium italic text-lg md:text-xl leading-relaxed flex flex-col items-center">
          <p className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-gold-start" />
            YOUR BELOVED COLLECTIONS ARE WAITING FOR YOU.
            <Sparkles className="w-5 h-5 text-gold-start" />
          </p>
        </div>
      </motion.div>
    </div>
  );
}
