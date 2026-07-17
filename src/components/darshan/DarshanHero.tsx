"use client";

import { motion } from "framer-motion";

export default function DarshanHero() {
  return (
    <div className="w-full text-center relative z-10 pt-16 pb-20 px-4">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-[#8B6F4E] mb-6">
          Welcome To The
        </h1>
        <h2 className="font-display text-4xl md:text-6xl font-extrabold text-[#5C1A1A] tracking-wider mb-8 leading-tight drop-shadow-sm">
          Divine Darshan
        </h2>
        
        <div className="max-w-2xl mx-auto space-y-2 text-charcoal/80 font-medium italic text-lg md:text-xl">
          <p>May Shri Radha Raman Ji&apos;s</p>
          <p>divine blessings forever remain upon your family.</p>
        </div>
      </motion.div>
      
    </div>
  );
}
