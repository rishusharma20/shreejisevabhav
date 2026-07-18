"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, BarChart2 } from "lucide-react";

export default function AiFestivalInsights() {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-gold-start/30 rounded-3xl p-8 shadow-[0_10px_30px_rgba(212,168,83,0.05)] relative overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-200/20 to-transparent blur-[30px] pointer-events-none" />
      
      <div className="mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-gold-start" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
            AI DIVINE CELEBRATION INSIGHTS
          </span>
        </div>
        
        <h4 className="font-display text-2xl font-bold text-[#5C1A1A] tracking-wider mb-4 leading-relaxed uppercase">
          Janmashtami is expected to become the most beautifully celebrated festival this year.
        </h4>
        
        <p className="font-medium italic text-charcoal/80">
          "Based on regional trends and historic devotional engagement."
        </p>
      </div>

      <div className="relative z-10 pt-6 border-t border-gold-start/20 flex flex-col gap-4">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
             <TrendingUp className="w-4 h-4 text-rose-500" />
             <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
               EXPECTED DEMAND
             </span>
           </div>
           <span className="font-display text-2xl font-bold text-rose-600">42,000+</span>
        </div>
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
             <BarChart2 className="w-4 h-4 text-emerald-500" />
             <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
               CONFIDENCE SCORE
             </span>
           </div>
           <span className="font-bold text-emerald-600">98.5%</span>
        </div>
      </div>
    </div>
  );
}
