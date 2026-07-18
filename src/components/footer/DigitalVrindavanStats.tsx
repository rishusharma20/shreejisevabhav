"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "25,000+", label: "BELOVED DEVOTEES" },
  { value: "2,50,000+", label: "DIVINE OFFERINGS" },
  { value: "365 DAYS", label: "OF BHAKTI & PREM" },
  { value: "25+", label: "DIVINE FESTIVALS" }
];

export default function DigitalVrindavanStats() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-16 relative z-10 text-center border-t border-gold-start/20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {STATS.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="flex flex-col items-center justify-center p-4"
          >
            <span className="font-display text-2xl md:text-3xl font-bold text-[#5C1A1A] tracking-wider mb-2">
              {stat.value}
            </span>
            <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
