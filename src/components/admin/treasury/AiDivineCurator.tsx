"use client";

import { motion } from "framer-motion";
import { Sparkles, HeartHandshake } from "lucide-react";

export default function AiDivineCurator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-md border border-gold-start/50 rounded-3xl p-8 shadow-[0_10px_30px_rgba(212,168,83,0.1)] relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-gold-start/20 to-transparent blur-[30px] pointer-events-none" />
      
      <div className="flex-1 relative z-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-gold-start" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
            AI DIVINE CURATOR
          </span>
        </div>
        
        <div className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider mb-4 leading-relaxed">
          THIS DIVINE OFFERING BEAUTIFULLY COMPLEMENTS:
        </div>
        
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
          {["Premium Mukuts", "Divine Jewellery", "Janmashtami Collections", "Festival Packaging"].map((item, idx) => (
            <span key={idx} className="bg-white border border-gold-start/30 text-[#8B6F4E] text-[9px] uppercase tracking-widest font-bold px-4 py-2 rounded-full shadow-sm">
              {item}
            </span>
          ))}
        </div>
        
        <p className="font-medium italic text-[#5C1A1A]">
          "Would You Like To Create A Complete Divine Offering?"
        </p>
      </div>
      
      <div className="relative z-10">
        <button className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 whitespace-nowrap">
          <HeartHandshake className="w-4 h-4" /> Curate Together
        </button>
      </div>
    </motion.div>
  );
}
