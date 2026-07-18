"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DivineInsightWall() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-gold-start/5 to-rose-50/50 backdrop-blur-xl border border-gold-start/40 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.1)] relative overflow-hidden flex flex-col items-center text-center"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-rose-200/40 to-transparent blur-[50px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial from-gold-start/20 to-transparent blur-[50px] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-3xl">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gold-start/30 rounded-full px-6 py-2 mb-8 shadow-sm mx-auto">
            <Sparkles className="w-4 h-4 text-gold-start" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#5C1A1A]">
              THE DIVINE INSIGHT WALL
            </span>
          </div>
          
          <h4 className="font-display text-2xl md:text-4xl font-bold text-[#5C1A1A] tracking-wider mb-6 leading-tight uppercase">
            98% OF OUR BELOVED DEVOTEES HAVE CONTINUED THEIR DIVINE JOURNEY WITH US THIS YEAR.
          </h4>
          
          <div className="w-12 h-[2px] bg-gold-start/50 mb-8 mx-auto" />
          
          <p className="font-display text-xl md:text-2xl font-bold text-rose-600 tracking-wider mb-8 uppercase drop-shadow-sm">
            May Shri Radha Raman Ji forever bless every beautiful Divine Journey.
          </p>
          
          <Link href="/admin">
            <button className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2">
              Continue Your Journey <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
