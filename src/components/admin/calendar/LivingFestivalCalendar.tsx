"use client";

import { motion } from "framer-motion";
import { Moon, Sun, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LivingFestivalCalendar() {
  return (
    <div id="celebrations" className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="mb-10 text-center md:text-left">
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
          The Living Festival Calendar
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          365 Days of Vrindavan
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Today's Tithi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-4 bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-gold-start/10 to-transparent blur-[20px] group-hover:scale-110 transition-transform" />
          
          <div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-full bg-gold-start/10 flex items-center justify-center text-gold-start">
                <Sun className="w-4 h-4" />
              </div>
              <h5 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase">
                Today
              </h5>
            </div>
            
            <span className="block font-display text-2xl font-bold text-[#5C1A1A] mb-2 relative z-10 uppercase">
              Shravana Shukla Purnima
            </span>
            <p className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed mb-6">
              TODAY'S TITHI
            </p>

            <span className="block font-display text-xl font-bold text-rose-500 mb-2 relative z-10 uppercase">
              Jhulan Yatra
            </span>
            <p className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed">
              TODAY'S FESTIVAL
            </p>
          </div>
        </motion.div>

        {/* Upcoming Celebrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-8 bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-sm flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-200/30 to-transparent blur-[30px]" />
          
          <div className="flex items-center gap-3 mb-8 relative z-10 border-b border-gold-start/20 pb-4">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
              <Moon className="w-4 h-4" />
            </div>
            <h5 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase">
              Upcoming Divine Celebrations
            </h5>
          </div>
          
          <div className="space-y-6 relative z-10">
            {/* Janmashtami */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-gold-start/20 hover:shadow-md transition-all">
              <div>
                <span className="block font-display text-lg font-bold text-[#5C1A1A] uppercase">Janmashtami</span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E]">Bhadrapada Krishna Ashtami</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <span className="block font-bold text-rose-500 text-lg">15</span>
                  <span className="text-[8px] uppercase tracking-widest font-bold text-charcoal/50">DAYS LEFT</span>
                </div>
                <button className="bg-transparent border border-gold-start/50 text-[#5C1A1A] rounded-full px-4 py-2 text-[8px] uppercase tracking-[0.2em] font-bold hover:bg-gold-start/10 transition-colors inline-flex items-center gap-1">
                  View <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Radhashtami */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white/50 border border-gold-start/10">
              <div>
                <span className="block font-display text-lg font-bold text-[#5C1A1A] uppercase">Radhashtami</span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E]">Bhadrapada Shukla Ashtami</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <span className="block font-bold text-[#5C1A1A] text-lg">30</span>
                  <span className="text-[8px] uppercase tracking-widest font-bold text-charcoal/50">DAYS LEFT</span>
                </div>
                <button className="bg-transparent border border-gold-start/30 text-charcoal/50 rounded-full px-4 py-2 text-[8px] uppercase tracking-[0.2em] font-bold hover:bg-gold-start/10 hover:text-[#5C1A1A] transition-colors inline-flex items-center gap-1">
                  View <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
