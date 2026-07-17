"use client";

import { motion } from "framer-motion";

export default function SangamHero() {
  return (
    <div className="w-full text-center relative z-10 pt-16 pb-20 px-4">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-[#8B6F4E] mb-6">
          Welcome To
        </h1>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#5C1A1A] tracking-wider mb-6 leading-tight drop-shadow-sm max-w-4xl mx-auto">
          The Divine Sangam<br />Of Shreeji Seva Bhav
        </h2>
        
        <div className="w-16 h-[1px] bg-gold-start/40 mx-auto mb-8" />
        
        <div className="max-w-2xl mx-auto text-charcoal/80 font-medium italic text-lg md:text-xl leading-relaxed">
          <p>Where Every Question Is Lovingly Received</p>
          <p className="mt-2">And Every Divine Journey Is Beautifully Guided.</p>
        </div>
      </motion.div>
      
    </div>
  );
}
