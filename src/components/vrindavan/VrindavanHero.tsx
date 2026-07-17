"use client";

import { motion } from "framer-motion";

export default function VrindavanHero() {
  return (
    <div className="w-full text-center relative z-10 pt-16 pb-20">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-[#8B6F4E] mb-6">
          Welcome To The Divine Land Of
        </h1>
        <h2 className="font-display text-5xl md:text-7xl font-extrabold text-[#5C1A1A] tracking-wider mb-8 leading-tight drop-shadow-sm">
          Vrindavan
        </h2>
        
        <div className="max-w-xl mx-auto space-y-2 text-charcoal/80 font-medium italic text-lg md:text-xl">
          <p>Where Every Flower</p>
          <p>Whispers The Name Of Shri Radhe.</p>
        </div>
      </motion.div>
      
    </div>
  );
}
