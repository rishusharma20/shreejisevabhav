"use client";

import { motion } from "framer-motion";
import { Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TodaysDivineBlessing() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-24 px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-xl border border-gold-start/40 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.15)] relative overflow-hidden max-w-3xl mx-auto"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-gold-start/10 to-transparent blur-[50px] pointer-events-none" />
        
        <h4 className="font-display text-xl md:text-2xl font-bold text-[#8B6F4E] tracking-widest mb-6">
          TODAY'S DIVINE BLESSING
        </h4>
        
        <div className="w-12 h-[1px] bg-gold-start/50 mx-auto mb-8" />
        
        <div className="font-medium italic text-xl md:text-2xl text-[#5C1A1A] leading-relaxed max-w-xl mx-auto mb-10">
          <p>
            "May your home forever remain filled with love, peace and devotion."
          </p>
        </div>

        <Link href="/">
          <button className="bg-transparent border border-gold-start/50 text-[#5C1A1A] rounded-full px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold-start/5 hover:border-gold-start transition-all inline-flex items-center gap-2">
            Continue Your Journey <ArrowRight className="w-3 h-3 text-gold-start" />
          </button>
        </Link>
        
        <div className="absolute -bottom-4 -left-4 text-gold-start/10 rotate-45 pointer-events-none">
          <Leaf className="w-32 h-32" />
        </div>
      </motion.div>
    </div>
  );
}
