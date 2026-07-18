"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function FestivalCommandCenter() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="mb-10 text-center md:text-left">
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
          The Divine Festival Command Center
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          AI Anticipated Demands & Planning
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white/60 backdrop-blur-xl border border-gold-start/40 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.1)] relative overflow-hidden flex flex-col md:flex-row gap-12 items-center"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-radial from-gold-start/20 to-transparent blur-[50px] pointer-events-none" />
        
        <div className="flex-1 relative z-10">
          <div className="inline-flex items-center gap-3 bg-white border border-gold-start/30 rounded-full px-6 py-2 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-gold-start" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#5C1A1A]">
              WONDERFUL NEWS
            </span>
          </div>
          
          <h4 className="font-display text-3xl font-bold text-[#5C1A1A] tracking-wider mb-6">
            Janmashtami is beautifully approaching.
          </h4>
          
          <div className="w-12 h-[1px] bg-gold-start/50 mb-8" />
          
          <div className="font-medium italic text-lg text-charcoal/80 leading-relaxed mb-10 space-y-4">
            <p>
              Janmashtami is after <span className="font-bold text-[#5C1A1A] not-italic">5 DAYS</span>.
            </p>
            <p>
              320 Divine Offerings have already been prepared.
            </p>
            <p>
              Festival Collections are ready to welcome our beloved devotees.
            </p>
          </div>
          
          <Link href="/admin/festivals">
            <button className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2">
              Manage Festival Collections <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="flex-1 w-full bg-gradient-to-br from-[#FFFBF4] to-white border border-gold-start/30 rounded-3xl p-8 relative z-10">
          <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8B6F4E] mb-8 text-center border-b border-gold-start/20 pb-4">
            AI Predictions
          </h5>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-charcoal/70 uppercase tracking-wider">EXPECTED TRAFFIC</span>
              <span className="text-sm font-bold text-[#5C1A1A]">Very High (15k/day)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-charcoal/70 uppercase tracking-wider">MOST PURCHASED</span>
              <span className="text-sm font-bold text-[#5C1A1A]">Premium Krishna Poshak</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-charcoal/70 uppercase tracking-wider">LOW STOCK ALERT</span>
              <span className="text-sm font-bold text-rose-600">Size 4 Mukuts</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
