"use client";

import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DivineContinuationSystem() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10 text-center pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 mb-8 mx-auto shadow-sm">
          <Heart className="w-6 h-6 animate-pulse" />
        </div>
        
        <h4 className="font-display text-2xl md:text-3xl font-bold text-[#5C1A1A] tracking-wider mb-6 leading-tight uppercase">
          May Shri Radha Raman Ji Forever Remain Upon Your Beautiful Family.
        </h4>
        
        <div className="w-16 h-[2px] bg-gold-start/50 mb-6 mx-auto" />
        
        <p className="font-display text-lg font-bold text-rose-600 tracking-wider mb-2 uppercase">
          Thank you for continuing your Divine Journey with us.
        </p>
        <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-12">
          We shall lovingly await your return.
        </p>
        
        <p className="font-display text-4xl text-rose-500 font-bold drop-shadow-sm mb-12 uppercase tracking-widest">
          JAI SHRI RADHE
        </p>
        
        <Link href="/">
          <button className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-12 py-5 text-[12px] uppercase tracking-[0.2em] font-bold shadow-xl hover:shadow-2xl transition-all inline-flex items-center justify-center gap-3 w-full md:w-auto">
            Continue Your Journey <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
