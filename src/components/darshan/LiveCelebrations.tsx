"use client";

import { motion } from "framer-motion";
import { Sparkles, CalendarDays } from "lucide-react";
import Link from "next/link";

export default function LiveCelebrations() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-32 px-6 relative z-10 text-center">
      <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-8">
        Live Divine Celebrations
      </h3>

      <div className="bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-[40px] p-8 md:p-12 shadow-sm relative overflow-hidden">
        
        {/* Dynamic Festival Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B]/10 to-transparent pointer-events-none" />
        
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#0B132B]/5 rounded-full text-[10px] uppercase tracking-widest font-bold text-[#0B132B] mb-8 relative z-10">
          <CalendarDays className="w-3 h-3" /> Upcoming Festival
        </div>

        <h4 className="font-display text-4xl md:text-5xl font-extrabold text-[#0B132B] tracking-widest mb-10 relative z-10 drop-shadow-sm">
          Janmashtami
        </h4>

        {/* Animated Countdown */}
        <div className="flex justify-center items-center gap-4 md:gap-8 mb-12 relative z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/80 border border-[#0B132B]/10 flex items-center justify-center font-display text-3xl md:text-4xl font-bold text-[#0B132B] shadow-sm mb-2">
              15
            </div>
            <span className="text-[9px] uppercase tracking-widest font-bold text-charcoal/70">Days</span>
          </motion.div>

          <span className="text-2xl font-bold text-[#0B132B]/30 mb-6">:</span>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/80 border border-[#0B132B]/10 flex items-center justify-center font-display text-3xl md:text-4xl font-bold text-[#0B132B] shadow-sm mb-2">
              08
            </div>
            <span className="text-[9px] uppercase tracking-widest font-bold text-charcoal/70">Hours</span>
          </motion.div>
        </div>

        <Link href="/festivals/janmashtami" className="relative z-10 inline-block">
          <button className="bg-[#0B132B] rounded-full px-10 py-4 flex items-center justify-center gap-3 text-gold-start text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:bg-[#15234b] transition-colors w-full md:w-auto">
            Prepare Your Offering <Sparkles className="w-4 h-4" />
          </button>
        </Link>
      </div>

    </div>
  );
}
