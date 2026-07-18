"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function LiveCollectionAnalytics() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="mb-10 text-center md:text-left">
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
          Live Collection Analytics
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Real-Time Devotional Engagement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-gold-start/10 to-transparent blur-[20px] group-hover:scale-110 transition-transform" />
          <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center mb-6 text-gold-start">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="font-display text-2xl md:text-3xl font-bold text-[#5C1A1A] mb-2 uppercase">
            Premium Mukuts
          </span>
          <span className="text-xl font-bold text-emerald-600 mb-4">+180% DEMAND</span>
          <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed border-t border-gold-start/20 pt-4">
            Compared to last week
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-gold-start/10 to-transparent blur-[20px] group-hover:scale-110 transition-transform" />
          <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center mb-6 text-gold-start">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="font-display text-2xl md:text-3xl font-bold text-[#5C1A1A] mb-2 uppercase">
            Krishna Collections
          </span>
          <span className="text-xl font-bold text-emerald-600 mb-4">+240% DEMAND</span>
          <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed border-t border-gold-start/20 pt-4">
            Highest engagement today
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-md border border-gold-start/50 rounded-3xl p-8 shadow-md flex flex-col items-center text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-200/30 to-transparent blur-[30px] group-hover:scale-110 transition-transform" />
          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-6 text-rose-500">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="font-display text-2xl md:text-3xl font-bold text-[#5C1A1A] mb-2 uppercase">
            Radhashtami Specials
          </span>
          <span className="text-sm font-bold text-rose-500 mb-4 uppercase tracking-widest mt-2">
            Trending This Week
          </span>
          <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed border-t border-gold-start/20 pt-4">
            Anticipated sell-out in 4 days
          </p>
        </motion.div>
      </div>
    </div>
  );
}
