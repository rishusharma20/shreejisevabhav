"use client";

import { motion } from "framer-motion";

const LEGACY_ITEMS = [
  "Made In India",
  "Handcrafted With Love",
  "Made For Thakurji",
  "Inspired By Vrindavan",
  "Celebrating Every Divine Festival",
  "Serving With Bhakti, Prem & Seva"
];

export default function FooterLegacy() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-16 relative z-10 text-center border-t border-gold-start/20">
      <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8B6F4E] mb-12">
        The Divine Legacy of Shreeji Seva Bhav
      </h3>
      
      <div className="flex flex-col items-center justify-center gap-y-4">
        {LEGACY_ITEMS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-charcoal/70">
              {item}
            </span>
            {idx < LEGACY_ITEMS.length - 1 && (
              <div className="w-4 h-[1px] bg-gold-start/30 my-4" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
