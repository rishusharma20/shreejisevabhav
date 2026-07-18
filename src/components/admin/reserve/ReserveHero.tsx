"use client";

import { motion } from "framer-motion";
import { Archive, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ReserveHero() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-16 px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex-1"
      >
        <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md border border-gold-start/30 rounded-full px-6 py-2 mb-8 shadow-sm">
          <Archive className="w-4 h-4 text-gold-start" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
            THE DIVINE RESERVE
          </span>
        </div>
        
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[#5C1A1A] tracking-wider mb-6 drop-shadow-sm uppercase">
          Welcome To The Divine Reserve of Vrindavan
        </h1>
        
        <p className="font-medium italic text-lg text-charcoal/80 max-w-xl mx-auto md:mx-0 leading-relaxed mb-8">
          "Where every Divine Offering beautifully awaits its beloved Divine Journey."
        </p>

        <Link href="#preparation-center">
          <button className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-3">
            View Preparation Center <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex-1 w-full relative h-[300px] md:h-[400px] rounded-[40px] overflow-hidden border border-gold-start/30 shadow-[0_20px_50px_rgba(212,168,83,0.15)] bg-white/50 backdrop-blur-md flex items-center justify-center group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold-start/20 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
        <div className="relative z-10 flex flex-col items-center p-8 text-center">
           <Archive className="w-16 h-16 text-gold-start mb-6 opacity-80" />
           <p className="font-display text-2xl text-[#5C1A1A] font-bold tracking-widest uppercase">
             Sacred Preservation
           </p>
           <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8B6F4E] mt-4">
             Bhakti • Prem • Seva
           </p>
        </div>
      </motion.div>
    </div>
  );
}
