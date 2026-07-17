"use client";

import { motion } from "framer-motion";
import { Sparkles, Feather } from "lucide-react";
import { useEffect, useState } from "react";

const BLESSINGS = [
  {
    sanskrit: "जय श्री राधे।",
    english: "May Shri Radha Raman Ji's divine grace forever remain upon your family."
  },
  {
    sanskrit: "राधे राधे।",
    english: "May Srimati Radharani's unconditional love guide your path today and always."
  },
  {
    sanskrit: "हरे कृष्ण।",
    english: "May the divine flute of Thakurji bring eternal peace to your heart."
  }
];

export default function DigitalBlessings() {
  const [blessing, setBlessing] = useState(BLESSINGS[0]);

  useEffect(() => {
    // Randomize blessing on component mount (acting as 'Today's Blessing')
    const randomIdx = Math.floor(Math.random() * BLESSINGS.length);
    setBlessing(BLESSINGS[randomIdx]);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="w-full relative group mt-8"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold-start/10 to-lotus/10 blur-[20px] rounded-[2rem] group-hover:blur-[30px] transition-all duration-700" />
      
      <div className="relative bg-white/70 backdrop-blur-xl border border-gold-start/30 rounded-[2rem] p-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFFBF4] px-4 py-1.5 rounded-full border border-gold-start/30 flex items-center gap-2 shadow-sm">
          <Sparkles className="w-3 h-3 text-gold-start" />
          <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#5C1A1A]">
            Today's Divine Blessing
          </span>
          <Sparkles className="w-3 h-3 text-gold-start" />
        </div>

        <Feather className="w-6 h-6 text-lotus mx-auto mb-4 opacity-80" />

        <h3 className="font-display text-xl md:text-2xl font-bold text-charcoal mb-4 leading-relaxed text-[#5C1A1A]">
          {blessing.sanskrit}
        </h3>

        <p className="text-sm text-warm-gray italic mb-6 max-w-sm mx-auto">
          {blessing.english}
        </p>

        <div className="w-12 h-[1px] bg-gold-start/30 mx-auto" />

      </div>
    </motion.div>
  );
}
