"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DivineTraditionEngine() {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-gold-start/30 rounded-3xl p-8 shadow-[0_10px_30px_rgba(212,168,83,0.05)] relative overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-200/20 to-transparent blur-[30px] pointer-events-none" />
      
      <div className="mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-rose-500">
            WONDERFUL NEWS
          </span>
        </div>
        
        <h4 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider mb-4 leading-relaxed uppercase">
          Janmashtami has beautifully become one of our most cherished Divine Traditions.
        </h4>
        
        <div className="bg-gradient-to-r from-rose-50 to-white border border-rose-200/50 rounded-xl p-4 mb-6">
          <p className="font-bold text-rose-600 tracking-widest uppercase text-sm mb-1">
            15,000+ DEVOTEES
          </p>
          <p className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E]">
            CELEBRATE JANMASHTAMI EVERY YEAR
          </p>
        </div>

        <p className="font-medium italic text-charcoal/80">
          "These devotees have beautifully celebrated with us for over 5 consecutive years."
        </p>
      </div>
      
      <div className="relative z-10">
        <Link href="/admin">
          <button className="bg-transparent border border-gold-start/50 text-[#5C1A1A] rounded-full px-6 py-3 text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-gold-start/10 transition-colors inline-flex items-center gap-2 w-full justify-center">
            View Beautiful Traditions <ArrowRight className="w-3 h-3" />
          </button>
        </Link>
      </div>
    </div>
  );
}
