"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const MESSAGES = [
  {
    greeting: "जय श्री राधे",
    message: "May your home forever remain filled with love, peace and devotion."
  },
  {
    greeting: "श्री कृष्ण शरणं मम",
    message: "Surrender your worries to Thakurji. Every offering made with love is accepted."
  },
  {
    greeting: "वृन्दावन धाम की जय",
    message: "May the divine dust of Vrindavan always guide your steps."
  }
];

export default function DarshanMessage() {
  const [msg, setMsg] = useState(MESSAGES[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MESSAGES.length);
    setMsg(MESSAGES[randomIndex]);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto mb-32 px-6 relative z-10 text-center">
      <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-8">
        Today&apos;s Divine Message
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="bg-white/50 backdrop-blur-xl border border-gold-start/20 rounded-[40px] p-12 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-radial from-rose-400/20 to-transparent blur-[40px]" />
        
        <h4 className="font-display text-4xl font-extrabold text-[#5C1A1A] tracking-widest mb-8">
          {msg.greeting}
        </h4>
        
        <div className="w-16 h-[1px] bg-gold-start/40 mx-auto mb-8" />
        
        <p className="font-medium text-charcoal/80 text-xl md:text-2xl italic leading-relaxed mb-12">
          {msg.message}
        </p>

        <Link href="/">
          <button className="text-[10px] uppercase tracking-widest font-bold text-gold-start hover:text-[#5C1A1A] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-gold-start/30 after:hover:bg-[#5C1A1A] after:transition-colors mb-12">
            Continue Your Seva
          </button>
        </Link>

        <div className="flex justify-center items-center gap-6 text-[9px] uppercase tracking-[0.3em] font-bold text-[#8B6F4E]">
          <span>Bhakti</span>
          <Sparkles className="w-3 h-3 text-gold-start" />
          <span>Prem</span>
          <Sparkles className="w-3 h-3 text-gold-start" />
          <span>Seva</span>
        </div>
      </motion.div>
    </div>
  );
}
