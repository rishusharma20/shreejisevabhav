"use client";

import { motion } from "framer-motion";

const ADMIN_STATS = [
  { value: "25,000+", label: "BELOVED DEVOTEES" },
  { value: "1,25,000+", label: "DIVINE OFFERINGS" },
  { value: "35", label: "DIVINE FESTIVALS CELEBRATED" },
  { value: "250+", label: "DIVINE JOURNEYS CONTINUING TODAY" }
];

export default function CommandTempleStats() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ADMIN_STATS.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-white/60 backdrop-blur-xl border border-gold-start/30 rounded-3xl p-8 shadow-[0_10px_30px_rgba(212,168,83,0.05)] text-center flex flex-col items-center justify-center relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold-start/10 rounded-full blur-[20px]" />
            <span className="font-display text-3xl md:text-4xl font-bold text-[#5C1A1A] tracking-wider mb-3 relative z-10">
              {stat.value}
            </span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed relative z-10 max-w-[80%]">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
