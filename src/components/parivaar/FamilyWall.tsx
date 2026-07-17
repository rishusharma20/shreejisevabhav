"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function FamilyWall() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-32 px-6 relative z-10 text-center">
      <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-12">
        The Divine Family Of Shreeji Seva Bhav
      </h3>

      <div className="bg-[#5C1A1A] rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(92,26,26,0.3)] relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-gold-start/20 to-transparent blur-[50px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial from-rose-500/20 to-transparent blur-[50px] pointer-events-none" />

        <h4 className="text-[12px] md:text-sm uppercase tracking-[0.4em] font-bold text-gold-start mb-12">
          Welcome To The Divine Family.
        </h4>

        <div className="flex justify-center items-center gap-6 mb-12 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-white/90">
          <span>Bhakti</span>
          <Sparkles className="w-3 h-3 text-gold-start" />
          <span>Prem</span>
          <Sparkles className="w-3 h-3 text-gold-start" />
          <span>Seva</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-display text-3xl md:text-4xl font-bold text-white mb-2">15,000+</div>
            <div className="text-[9px] uppercase tracking-widest font-bold text-gold-start/80">Beloved Devotees</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="font-display text-3xl md:text-4xl font-bold text-white mb-2">1,25,000+</div>
            <div className="text-[9px] uppercase tracking-widest font-bold text-gold-start/80">Divine Offerings</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="font-display text-3xl md:text-4xl font-bold text-white mb-2">25+</div>
            <div className="text-[9px] uppercase tracking-widest font-bold text-gold-start/80">Divine Festivals</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="font-display text-3xl md:text-4xl font-bold text-white mb-2">365 Days</div>
            <div className="text-[9px] uppercase tracking-widest font-bold text-gold-start/80">Of Bhakti & Prem</div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[10px] md:text-xs uppercase tracking-widest font-bold text-white/60 mb-12">
          <span>Made With Love.</span>
          <span className="hidden md:inline">•</span>
          <span>Made In India.</span>
          <span className="hidden md:inline">•</span>
          <span>Made For Thakurji.</span>
        </div>

        <Link href="/">
          <button className="bg-white text-[#5C1A1A] rounded-full px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg hover:bg-gold-start hover:text-white transition-colors">
            Continue Your Journey
          </button>
        </Link>
      </div>

    </div>
  );
}
