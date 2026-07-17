"use client";

import { motion } from "framer-motion";

const REASONS = [
  "To Serve.",
  "To Celebrate The Divine Festivals Of Vrindavan.",
  "To Create Premium Handcrafted Divine Offerings.",
  "To Spread Love, Devotion And Service.",
  "To Preserve The Beauty Of Our Divine Traditions."
];

const VALUES = [
  "Bhakti",
  "Prem",
  "Seva",
  "Handcrafted With Love",
  "Made In India",
  "Made For Thakurji",
  "Premium Quality",
  "Temple Inspired"
];

export default function DivineValues() {
  return (
    <div className="w-full max-w-5xl mx-auto mb-24 px-6 relative z-10">
      
      {/* Why Shreeji Seva Bhav Was Created */}
      <div className="mb-24 text-center">
        <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-12">
          Why Shreeji Seva Bhav Was Created
        </h3>
        
        <div className="flex flex-col items-center gap-8">
          {REASONS.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <h4 className="text-[12px] md:text-sm uppercase tracking-[0.2em] font-bold text-charcoal/90 text-center">
                {reason}
              </h4>
              {idx < REASONS.length - 1 && (
                <div className="w-[2px] h-8 bg-gradient-to-b from-gold-start/50 to-transparent mt-8" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our Divine Values */}
      <div className="text-center">
        <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-12">
          Our Divine Values
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {VALUES.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-white/40 backdrop-blur-md border border-gold-start/20 rounded-2xl p-6 flex items-center justify-center text-center shadow-sm hover:shadow-md hover:bg-white/60 transition-all"
            >
              <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#8B6F4E]">
                {value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
