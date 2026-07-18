"use client";

import { motion } from "framer-motion";
import { Sparkles, Crown } from "lucide-react";
import Image from "next/image";

export default function CommandTempleHero() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-16 px-6 relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex-1"
      >
        <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md border border-gold-start/30 rounded-full px-6 py-2 mb-8 shadow-sm">
          <Crown className="w-4 h-4 text-gold-start" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
            SUPER ADMIN
          </span>
        </div>
        
        <h4 className="font-display text-xl md:text-2xl font-bold text-[#8B6F4E] tracking-widest mb-4 uppercase">
          GOOD MORNING
        </h4>
        
        <h1 className="font-display text-4xl md:text-6xl font-extrabold text-[#5C1A1A] tracking-wider mb-8 drop-shadow-sm">
          Akriti Sharma.
        </h1>
        
        <p className="font-medium italic text-lg text-charcoal/80 max-w-xl mx-auto md:mx-0 leading-relaxed">
          "May Shri Radha Raman Ji's divine blessings forever remain upon the Divine Family of Shreeji Seva Bhav."
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gold-start/20 rounded-full blur-[40px] animate-pulse" />
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-gold-start/40 shadow-[0_20px_50px_rgba(212,168,83,0.2)] relative z-10">
          <Image
            src="https://images.unsplash.com/photo-1616239401777-6d2c49b6b772?q=80&w=400&auto=format&fit=crop"
            alt="Akriti Sharma"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
