"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

export default function DivineMemoryEngine() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="mb-10 text-center md:text-left">
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
          The Divine Memory Engine
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Preserving Lifelong Devotion
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-sm flex flex-col relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-rose-200/30 to-transparent blur-[20px]" />
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
              <Heart className="w-4 h-4" />
            </div>
            <h5 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase">
              Most Loved Festivals
            </h5>
          </div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-rose-500 leading-relaxed relative z-10 mb-2">
            Janmashtami & Radhashtami
          </p>
          <p className="text-sm italic text-charcoal/80 relative z-10">
            "These celebrations continue to touch the most hearts across our Divine Family."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-md flex flex-col relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-gold-start/20 to-transparent blur-[30px]" />
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-full bg-gold-start/10 flex items-center justify-center text-gold-start">
              <Sparkles className="w-4 h-4" />
            </div>
            <h5 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase">
              Lifelong Memories
            </h5>
          </div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed relative z-10 mb-2">
            Premium Poshaks & Mukuts
          </p>
          <p className="text-sm italic text-charcoal/80 relative z-10">
            "These offerings have beautifully become cherished traditions in thousands of homes."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-sm flex flex-col relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-rose-200/30 to-transparent blur-[20px]" />
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
              <Heart className="w-4 h-4" />
            </div>
            <h5 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase">
              Continuing Journeys
            </h5>
          </div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-rose-500 leading-relaxed relative z-10 mb-2">
            18,500+ Devotees
          </p>
          <p className="text-sm italic text-charcoal/80 relative z-10">
            "Have beautifully continued their Divine Journey with us year after year."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
