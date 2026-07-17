"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AuthForm from "@/components/auth/AuthForm";
import { useState, useEffect } from "react";

// Premium floating lotus petals
const floatingPetals = [
  { id: 1, left: "15%", delay: 0, size: 28, duration: 12 },
  { id: 2, left: "75%", delay: 2, size: 24, duration: 15 },
  { id: 3, left: "45%", delay: 5, size: 20, duration: 10 },
  { id: 4, left: "85%", delay: 8, size: 32, duration: 14 },
  { id: 5, left: "25%", delay: 3.5, size: 22, duration: 11 },
];

export default function LoginPage() {
  const [showEntrance, setShowEntrance] = useState(true);

  // 1-1.5 second page entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setShowEntrance(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showEntrance && (
          <motion.div
            key="entrance"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-[#FFFBF4] flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gold-start/30 blur-[40px] rounded-full scale-150" />
              <Image src="/images/logo.png" alt="Shreeji Seva Bhav" width={180} height={180} className="relative z-10 opacity-80" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen w-full bg-[#FFFBF4] flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* ── LEFT SECTION (60%) DESKTOP ── */}
        <div className="hidden lg:flex relative z-10 w-[60%] min-h-screen flex-col justify-center items-center p-16 border-r border-gold-start/10 overflow-hidden">
          
          {/* Atmospheric Background strictly for Left Section */}
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            {/* Soft clouds */}
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 2 }}
              className="absolute w-[120%] h-[80%] top-[-10%] left-[-20%] bg-radial from-[#FFF3DF] via-[#FFEED4]/40 to-transparent filter blur-3xl" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ duration: 2, delay: 0.3 }}
              className="absolute w-[120%] h-[80%] bottom-[-20%] right-[-10%] bg-radial from-[#FFF5E6] via-[#FFF3DF]/50 to-transparent filter blur-3xl" 
            />
            
            {/* Golden particles */}
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={`p-${i}`}
                className="absolute w-1 h-1 rounded-full bg-gold-start/50"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.1, 0.7, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Floating lotus petals */}
            {floatingPetals.map((petal) => (
              <motion.div
                key={`petal-${petal.id}`}
                className="absolute"
                style={{ left: petal.left, top: "-10%" }}
                animate={{
                  y: ["0vh", "110vh"],
                  x: [0, 45, -45, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: petal.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: petal.delay,
                }}
              >
                <svg width={petal.size} height={petal.size} viewBox="0 0 40 40" fill="none">
                  <path d="M20 5 C10 18 10 32 20 35 C30 32 30 18 20 5 Z" fill="#FFB7B2" opacity="0.65" />
                </svg>
              </motion.div>
            ))}
          </div>

          <Link href="/" className="absolute top-12 left-12 z-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors"
            >
              ← Back to Temple
            </motion.div>
          </Link>

          {/* Logo/Image Container with Golden Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="relative w-full max-w-lg aspect-square flex items-center justify-center mb-8"
          >
            {/* Subtle pulsating glow behind logo */}
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-4 bg-gold-start/20 rounded-full blur-[50px] z-0" 
            />
            <div className="relative z-10 w-full h-full p-4">
              <Image
                src="/images/logo.png"
                alt="Shreeji Seva Bhav Premium Logo"
                fill
                className="object-contain filter drop-shadow-[0_12px_30px_rgba(212,168,83,0.35)]"
                priority
              />
            </div>
          </motion.div>

          {/* Philosophy Text & 3 Divine Statements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center space-y-6 max-w-md relative z-10"
          >
            <h1 className="font-display text-3xl text-[#5C1A1A] font-extrabold tracking-widest uppercase drop-shadow-sm">
              Bhakti • Prem • Seva
            </h1>
            
            <div className="flex flex-col items-center gap-3 pt-2">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                className="text-[11px] font-bold tracking-[0.25em] text-[#8B6F4E] uppercase"
              >
                Every Thread Is An Offering
              </motion.div>
              <div className="w-1 h-1 rounded-full bg-gold-start/40" />
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                className="text-[11px] font-bold tracking-[0.25em] text-[#8B6F4E] uppercase"
              >
                Every Ornament Is A Prayer
              </motion.div>
              <div className="w-1 h-1 rounded-full bg-gold-start/40" />
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
                className="text-[11px] font-bold tracking-[0.25em] text-[#8B6F4E] uppercase"
              >
                Every Creation Is A Seva
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── MOBILE HEADER (Dedicated Mobile Implementation) ── */}
        <div className="lg:hidden relative w-full pt-8 pb-4 px-6 flex flex-col items-center border-b border-gold-start/10 bg-cream/40 backdrop-blur-sm z-20">
          <Link href="/" className="absolute top-6 left-6 z-20">
            <motion.div className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
              ← Temple
            </motion.div>
          </Link>
          <div className="relative w-28 h-28 mb-3 mt-4">
            <div className="absolute inset-0 bg-gold-start/20 rounded-full blur-[20px] z-0" />
            <Image src="/images/logo.png" alt="Shreeji Seva Bhav" fill className="object-contain relative z-10" />
          </div>
          <h1 className="font-display text-lg text-[#5C1A1A] font-extrabold tracking-widest uppercase">
            Bhakti • Prem • Seva
          </h1>
        </div>

        {/* ── RIGHT SECTION (40%) ── */}
        <div className="relative z-10 w-full lg:w-[40%] flex-1 flex items-center justify-center p-6 lg:p-12 bg-white/10 lg:bg-cream/30 backdrop-blur-md lg:backdrop-blur-sm shadow-[-10px_0_30px_rgba(212,168,83,0.03)]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="w-full max-w-md mx-auto"
          >
            <AuthForm />
          </motion.div>
        </div>
      </main>
    </>
  );
}
