"use client";

import { motion } from "framer-motion";
import { Sparkles, Feather } from "lucide-react";
import { useEffect, useState } from "react";

const BLESSINGS = [
  {
    type: "Bhagavad Gita",
    sanskrit: "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः।",
    english: "Wherever there is Krishna, the master of all mystics, and wherever there is Arjuna, the supreme archer, there will also certainly be opulence, victory, extraordinary power, and morality.",
    message: "May Shri Radha Raman Ji always shower His divine blessings upon your home."
  },
  {
    type: "Vrindavan Blessing",
    sanskrit: "वृन्दावनं परं स्थानं यत्र राधा विराजते।",
    english: "Vrindavan is the supreme abode where Sri Radha gracefully resides.",
    message: "May the dust of Vrindavan always guide your path to pure devotion."
  },
  {
    type: "Radha Rani Quote",
    sanskrit: "राधे राधे",
    english: "With love for Radha, one naturally attains the supreme grace of Krishna.",
    message: "May Srimati Radharani fill your heart with unconditional love and Prem."
  }
];

export default function DigitalPrasad() {
  const [blessing, setBlessing] = useState(BLESSINGS[0]);

  useEffect(() => {
    // Randomly select a blessing on mount
    const randomIdx = Math.floor(Math.random() * BLESSINGS.length);
    setBlessing(BLESSINGS[randomIdx]);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="w-full max-w-2xl mx-auto mt-16 relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold-start/20 to-lotus/20 blur-[30px] rounded-[3rem] group-hover:blur-[40px] transition-all duration-700" />
      
      <div className="relative bg-white/70 backdrop-blur-xl border border-gold-start/30 rounded-[3rem] p-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFFBF4] px-6 py-2 rounded-full border border-gold-start/30 flex items-center gap-2 shadow-sm">
          <Sparkles className="w-4 h-4 text-gold-start" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#5C1A1A]">
            A Divine Blessing For You
          </span>
          <Sparkles className="w-4 h-4 text-gold-start" />
        </div>

        <Feather className="w-8 h-8 text-lotus mx-auto mb-6 opacity-80" />

        <h3 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6 leading-relaxed text-[#5C1A1A]">
          "{blessing.sanskrit}"
        </h3>

        <p className="text-sm md:text-base text-warm-gray italic mb-8 max-w-lg mx-auto">
          {blessing.english}
        </p>

        <div className="w-16 h-[1px] bg-gold-start/30 mx-auto mb-8" />

        <p className="text-sm font-bold text-charcoal tracking-wide">
          {blessing.message}
        </p>

      </div>
    </motion.div>
  );
}
