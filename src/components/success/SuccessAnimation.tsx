"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Bell } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SuccessAnimationProps {
  onComplete: () => void;
}

export default function SuccessAnimation({ onComplete }: SuccessAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 6.5s animation before unmounting
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // 1s fade out duration
    }, 6500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="success-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFFBF4] overflow-hidden"
        >
          {/* ── ATMOSPHERIC BACKGROUND ── */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Golden Glow Effects */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.4 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] bg-radial from-gold-start/30 to-transparent blur-[80px]"
            />
            {/* Floating Clouds (Blur effects) */}
            <motion.div
              initial={{ x: "-20%", opacity: 0 }}
              animate={{ x: "20%", opacity: 0.5 }}
              transition={{ duration: 6, ease: "linear" }}
              className="absolute top-[20%] left-0 w-full h-[40vh] bg-gradient-to-r from-transparent via-[#FFF5E6] to-transparent blur-[40px]"
            />

            {/* Flower Petals */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`success-petal-${i}`}
                className="absolute rounded-[40%_0_40%_0] bg-lotus/40 blur-[1px]"
                style={{ 
                  width: Math.random() * 15 + 15, 
                  height: Math.random() * 15 + 15,
                  left: `${Math.random() * 100}%`,
                  top: `-10%` // Start above the screen
                }}
                animate={{ 
                  y: ['0vh', '110vh'],
                  x: [0, (Math.random() - 0.5) * 200],
                  rotate: [0, 360] 
                }}
                transition={{ duration: 4 + Math.random() * 3, ease: "linear", delay: Math.random() * 2 }}
              />
            ))}
          </div>

          {/* ── CENTER CONTENT ── */}
          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Temple Bell Animation (Simulated with icon + motion) */}
            <motion.div
              initial={{ opacity: 0, y: -20, rotate: -15 }}
              animate={{ opacity: 1, y: 0, rotate: [15, -10, 5, 0] }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              className="mb-8"
            >
              <Bell className="w-12 h-12 text-gold-start drop-shadow-[0_0_15px_rgba(212,168,83,0.5)]" />
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="mb-12"
            >
              <Image 
                src="/logo.png" 
                alt="Shreeji Seva Bhav" 
                width={200} 
                height={80} 
                className="object-contain"
              />
            </motion.div>

            {/* Text Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[#5C1A1A] tracking-wider mb-4 flex items-center gap-3 justify-center">
                <Sparkles className="w-8 h-8 text-gold-start" />
                Your Seva Has Been Accepted
                <Sparkles className="w-8 h-8 text-gold-start" />
              </h1>
              <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
                Thank You For Becoming A Part Of Our Divine Journey
              </p>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
