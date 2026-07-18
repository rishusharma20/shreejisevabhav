"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function DivineMemoryVault() {
  return (
    <div className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-md border border-gold-start/50 rounded-3xl p-8 shadow-[0_10px_30px_rgba(212,168,83,0.1)] relative overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-200/30 to-transparent blur-[30px] pointer-events-none" />
      
      <div className="mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 mb-6">
          <Heart className="w-4 h-4 text-rose-400" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-rose-500">
            THE DIVINE MEMORY VAULT
          </span>
        </div>
        
        <h4 className="font-display text-xl md:text-2xl font-bold text-[#5C1A1A] tracking-wider mb-6 leading-relaxed uppercase">
          15,000+ beloved devotees have beautifully celebrated Janmashtami for 5 consecutive years.
        </h4>
        
        <div className="w-12 h-[2px] bg-gold-start/50 mb-6" />

        <p className="font-bold text-[#8B6F4E] tracking-widest uppercase text-sm">
          ANOTHER BEAUTIFUL TRADITION CONTINUES.
        </p>
      </div>

      <div className="relative z-10">
        <p className="text-[9px] uppercase tracking-widest font-bold text-charcoal/50">
          PRESERVED BY AI MEMORY ENGINE
        </p>
      </div>
    </div>
  );
}
