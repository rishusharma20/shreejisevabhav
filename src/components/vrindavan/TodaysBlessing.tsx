"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BLESSINGS = [
  {
    hindi: "जय श्री राधे",
    english: "May Shri Radha Raman Ji's divine grace forever remain upon your family."
  },
  {
    hindi: "राधे राधे",
    english: "Wherever the mind wanders, may it always return to the dust of Vrindavan."
  },
  {
    hindi: "श्री कृष्ण शरणं मम",
    english: "Surrender your worries. Every offering made with love reaches Thakurji."
  },
  {
    hindi: "वृन्दावन धाम की जय",
    english: "May your heart always be a sacred temple for Shri Radha Raman Ji."
  }
];

export default function TodaysBlessing() {
  const [blessing, setBlessing] = useState(BLESSINGS[0]);

  useEffect(() => {
    // Pick a random blessing on client load so it changes on refresh
    const randomIndex = Math.floor(Math.random() * BLESSINGS.length);
    setBlessing(BLESSINGS[randomIndex]);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mb-32 px-6 relative z-10 text-center">
      <h3 className="font-display text-2xl font-bold text-[#8B6F4E] tracking-wider mb-8">
        Today&apos;s Divine Blessing
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="bg-white/50 backdrop-blur-xl border border-gold-start/20 rounded-3xl p-10 shadow-[0_15px_40px_rgba(212,168,83,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-gold-start/20 to-transparent blur-[30px]" />
        
        <h4 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-widest mb-6">
          {blessing.hindi}
        </h4>
        
        <div className="w-16 h-[1px] bg-gold-start/40 mx-auto mb-6" />
        
        <p className="font-medium text-charcoal/80 text-lg md:text-xl italic leading-relaxed">
          {blessing.english}
        </p>

      </motion.div>
    </div>
  );
}
