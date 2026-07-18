"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FooterTodaysBlessing() {
  return (
    <div className="w-full px-6 py-16 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex justify-center mb-6">
          <Sparkles className="w-8 h-8 text-gold-start" />
        </div>
        
        <h4 className="font-display text-2xl md:text-3xl font-bold text-[#5C1A1A] tracking-widest mb-6">
          जय श्री राधे।
        </h4>
        
        <div className="w-16 h-[1px] bg-gold-start/50 mx-auto mb-8" />
        
        <p className="font-medium italic text-xl md:text-2xl text-charcoal/80 leading-relaxed mb-10">
          "May Shri Radha Raman Ji always illuminate your path with Bhakti, Prem & Seva."
        </p>

        <Link href="/">
          <button className="bg-transparent text-[#5C1A1A] border border-gold-start/30 rounded-full px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold-start/10 transition-all inline-flex items-center gap-2">
            Continue Your Journey <ArrowRight className="w-3 h-3 text-gold-start" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
