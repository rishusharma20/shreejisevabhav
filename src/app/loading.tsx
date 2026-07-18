"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Flower } from "lucide-react";

const BLESSINGS = [
  "Receiving Today's Divine Blessings...",
  "Preparing Your Divine Offering...",
  "May Shri Radha Raman Ji guide your Divine Journey...",
  "The Divine Experience awaits your arrival...",
  "Gathering flower petals for your Journey..."
];

export default function Loading() {
  const [blessing, setBlessing] = useState(BLESSINGS[0]);

  useEffect(() => {
    // Pick a random blessing on mount
    setBlessing(BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)]);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-[100] flex items-center justify-center bg-[#FFFBF4]/80 backdrop-blur-xl">
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[70vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-90" />
        
        {/* Divine Glowing Orbs */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ duration: 1 }}
          className="absolute w-[60%] h-[60%] top-[20%] left-[20%] bg-radial from-gold-start/20 via-[#FFF3DF]/50 to-transparent filter blur-[100px]" 
        />
        
        {/* Rapid subtle floating petals for loading state */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`loading-petal-${i}`}
            className="absolute rounded-[50%_0_50%_0] bg-gold-start/30 blur-[1px]"
            style={{ 
              width: Math.random() * 10 + 6, 
              height: Math.random() * 10 + 6,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              y: [0, -100], 
              opacity: [0, 0.8, 0], 
              rotate: [0, 360] 
            }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/70 border border-gold-start/30 rounded-full py-4 px-8 inline-flex items-center gap-4 shadow-sm"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Flower className="w-5 h-5 text-gold-start" />
          </motion.div>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-[#5C1A1A]">
            {blessing}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
