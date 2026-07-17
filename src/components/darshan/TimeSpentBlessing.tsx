"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Flame } from "lucide-react";

export default function TimeSpentBlessing() {
  const [showBlessing, setShowBlessing] = useState(false);

  useEffect(() => {
    // For development testing, trigger after 20 seconds instead of 20 minutes
    const timer = setTimeout(() => {
      setShowBlessing(true);
    }, 20000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showBlessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-lg bg-gradient-to-br from-[#FFFBF4] to-[#FFF5E6] border border-gold-start/30 rounded-[40px] p-10 md:p-14 shadow-2xl relative overflow-hidden text-center"
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowBlessing(false)}
              className="absolute top-6 right-6 text-charcoal/40 hover:text-[#5C1A1A] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Glowing Diya Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-radial from-amber-500/20 to-transparent blur-[40px] pointer-events-none" />
            
            <div className="flex justify-center mb-8 relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame className="w-12 h-12 text-amber-500 fill-current" />
              </motion.div>
            </div>

            <h4 className="font-display text-2xl font-bold text-[#5C1A1A] tracking-wider mb-6 relative z-10">
              MAY SHRI RADHA RAMAN JI <br/> FOREVER BLESS YOU.
            </h4>
            
            <div className="w-12 h-[1px] bg-gold-start/40 mx-auto mb-6 relative z-10" />
            
            <p className="font-medium text-charcoal/80 text-lg italic leading-relaxed mb-10 relative z-10">
              Thank You For Being A Part Of The Divine Family Of Shreeji Seva Bhav.
            </p>

            <Link href="/" onClick={() => setShowBlessing(false)} className="relative z-10 inline-block">
              <button className="bg-[#5C1A1A] text-white rounded-full px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:bg-[#8B2B2B] transition-colors">
                Continue Your Divine Journey
              </button>
            </Link>

            {/* Floating Petals for the popup */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`popup-petal-${i}`}
                className="absolute rounded-[50%_0_50%_0] bg-rose-400/30 blur-[1px] pointer-events-none"
                style={{ 
                  width: 10, height: 10,
                  left: `${Math.random() * 100}%`,
                  bottom: "-10%"
                }}
                animate={{ 
                  y: [0, -300], 
                  opacity: [0, 1, 0], 
                  rotate: [0, 360] 
                }}
                transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
