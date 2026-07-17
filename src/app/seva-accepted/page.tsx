"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import SuccessAnimation from "@/components/success/SuccessAnimation";
import AcceptedSummary from "@/components/success/AcceptedSummary";
import DigitalPrasad from "@/components/success/DigitalPrasad";
import SuccessRecommendations from "@/components/success/SuccessRecommendations";

export default function SevaAcceptedPage() {
  const [showMainContent, setShowMainContent] = useState(false);

  return (
    <>
      <SuccessAnimation onComplete={() => setShowMainContent(true)} />

      <main 
        className={`min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-24 pt-32 transition-opacity duration-1000 ${showMainContent ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}
      >
        {/* ── ATMOSPHERIC BACKGROUND ── */}
        <div className="fixed inset-0 pointer-events-none select-none z-0">
          <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-60" />
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 2 }}
            className="absolute w-[80%] h-[80%] top-[10%] right-[-10%] bg-radial from-gold-start/20 via-[#FFF3DF]/50 to-transparent filter blur-[100px]" 
          />
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 2, delay: 0.5 }}
            className="absolute w-[60%] h-[60%] top-[30%] left-[-10%] bg-radial from-lotus/10 to-transparent filter blur-[100px]" 
          />
          {/* Subtle floating petals */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`petal-accepted-${i}`}
              className="absolute rounded-[40%_0_40%_0] bg-gold-start/20 blur-[1.5px]"
              style={{ 
                width: Math.random() * 15 + 10, 
                height: Math.random() * 15 + 10,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{ 
                y: [0, -100], 
                opacity: [0, 0.6, 0], 
                rotate: [0, 180] 
              }}
              transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
            />
          ))}
        </div>

        {/* ── DIVINE NAVIGATION ── */}
        <div className="w-full max-w-7xl mx-auto px-6 mb-8 relative z-50">
          <div className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-widest font-bold">
            <Link href="/" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-gold-start/50" />
            <Link href="/collections" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Divine Offering</Link>
            <ChevronRight className="w-3 h-3 text-gold-start/50" />
            <span className="text-[#5C1A1A]">Your Seva Has Been Accepted</span>
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto px-6 relative z-10">
          
          {/* ── LOGGED IN WELCOME (Optional addition per request) ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: showMainContent ? 1 : 0, y: showMainContent ? 0 : -20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
             <p className="text-[12px] uppercase tracking-widest font-bold text-warm-gray">
               Welcome back, Rishu.
             </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: showMainContent ? 1 : 0, scale: showMainContent ? 1 : 0.95 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AcceptedSummary />
          </motion.div>

          <DigitalPrasad />

          <SuccessRecommendations />

        </div>
      </main>
    </>
  );
}
