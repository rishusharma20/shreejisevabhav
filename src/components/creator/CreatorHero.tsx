"use client";

import { motion } from "framer-motion";

export default function CreatorHero() {
  return (
    <div className="w-full text-center relative z-10 pt-12 pb-16">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-[12px] uppercase tracking-[0.4em] font-bold text-[#8B6F4E] mb-6">
          The Heart Of
        </h1>
        <h2 className="font-display text-4xl md:text-6xl font-extrabold text-[#5C1A1A] tracking-wider mb-8 leading-tight">
          Shreeji Seva Bhav
        </h2>
        
        <div className="max-w-2xl mx-auto space-y-6 text-charcoal/80 font-medium italic text-lg leading-relaxed">
          <p>
            Every Divine Offering begins with love,
          </p>
          <p>
            continues through Bhakti,
          </p>
          <p>
            and reaches you with blessings.
          </p>
        </div>
      </motion.div>
      
    </div>
  );
}
