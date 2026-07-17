"use client";

import { motion } from "framer-motion";
import { Sparkles, CalendarDays } from "lucide-react";

export default function FestivalCountdown() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-6 relative z-10">
      
      {/* Personalized Greeting Card */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 bg-white/60 backdrop-blur-xl border border-gold-start/20 rounded-3xl p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_40px_rgba(212,168,83,0.05)] relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-gold-start/10 to-transparent blur-[30px] group-hover:from-gold-start/20 transition-all duration-700 pointer-events-none" />
        
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-warm-gray mb-1">
          Welcome Back
        </h4>
        <h2 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-6">
          RISHU.
        </h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-gold-start" />
            <p className="text-sm font-medium text-charcoal">
              <span className="font-bold text-[#5C1A1A]">JANMASHTAMI</span> is after 15 DAYS.
            </p>
          </div>
          <div className="w-12 h-[1px] bg-gold-start/30" />
          <ul className="space-y-2 mt-4 text-[10px] uppercase tracking-widest font-bold text-warm-gray">
            <li className="hover:text-gold-start cursor-pointer transition-colors">Continue Your Seva</li>
            <li className="hover:text-gold-start cursor-pointer transition-colors">Track My Seva</li>
            <li className="hover:text-gold-start cursor-pointer transition-colors">Beloved Collections</li>
            <li className="hover:text-gold-start cursor-pointer transition-colors">Festival Recommendations</li>
          </ul>
        </div>
      </motion.div>

      {/* Digital Festival Countdown */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-3xl p-8 shadow-2xl relative overflow-hidden group text-center flex flex-col justify-center items-center border border-white/10"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-radial from-gold-start/20 to-transparent blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/70 mb-2 flex items-center gap-2 relative z-10">
          <CalendarDays className="w-3.5 h-3.5" /> Next Divine Festival
        </h4>
        <h2 className="font-display text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-start to-white tracking-widest mb-6 relative z-10">
          JANMASHTAMI
        </h2>

        {/* The Timer */}
        <div className="flex items-center gap-4 text-white relative z-10 mb-8">
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl font-bold">25</span>
            <span className="text-[8px] uppercase tracking-widest text-white/50">Days</span>
          </div>
          <span className="text-xl font-light text-gold-start/50 pb-2">:</span>
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl font-bold">14</span>
            <span className="text-[8px] uppercase tracking-widest text-white/50">Hours</span>
          </div>
          <span className="text-xl font-light text-gold-start/50 pb-2">:</span>
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl font-bold">12</span>
            <span className="text-[8px] uppercase tracking-widest text-white/50">Mins</span>
          </div>
        </div>

        <div className="relative z-10 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-start mb-4">
          Prepare Your Divine Offering
        </div>
        <button className="relative z-10 px-6 py-2.5 rounded-full border border-white/20 text-white text-[9px] uppercase tracking-widest font-bold hover:bg-white hover:text-[#1E3A8A] transition-colors">
          Explore Collections
        </button>
      </motion.div>

    </div>
  );
}
