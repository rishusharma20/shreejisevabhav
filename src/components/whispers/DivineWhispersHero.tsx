"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function DivineWhispersHero() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-12 pb-16 px-6 relative z-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-16 h-16 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center mx-auto mb-6 border border-gold-start/30 shadow-sm relative">
          <div className="absolute inset-0 bg-gold-start/10 rounded-full animate-ping opacity-50" style={{ animationDuration: '3s' }} />
          <Sparkles className="w-8 h-8 text-[#8B6F4E] relative z-10" />
        </div>
        
        <h4 className="font-display text-xl md:text-2xl font-bold text-[#8B6F4E] tracking-wider mb-4 uppercase">
          The Divine Whispers Of Vrindavan
        </h4>
        
        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#5C1A1A] tracking-wider mb-8 leading-tight drop-shadow-sm">
          The website lovingly<br />remembers you, even<br />when you are away.
        </h1>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-start/50 to-transparent mx-auto mb-8" />
        
        <p className="font-medium italic text-lg text-charcoal/80 max-w-xl mx-auto">
          "Receive gentle blessings, festival reminders, and the beautiful traditions of Vrindavan."
        </p>
      </motion.div>
    </div>
  );
}
