"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import DivineGreeting from "@/components/intelligence/DivineGreeting";
import DivineMemorySystem from "@/components/intelligence/DivineMemorySystem";
import PersonalizedCollections from "@/components/intelligence/PersonalizedCollections";
import DigitalDivineMemories from "@/components/intelligence/DigitalDivineMemories";
import CompleteDivineOffering from "@/components/intelligence/CompleteDivineOffering";
import DivineCalendarAI from "@/components/intelligence/DivineCalendarAI";
import DivineSakhiAI from "@/components/intelligence/DivineSakhiAI";
import ContinueJourneyAI from "@/components/intelligence/ContinueJourneyAI";

export default function DivineIntelligencePage() {
  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-12 pt-32">
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-90" />
        
        {/* Divine Glowing Orbs representing intelligence/memory */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 3 }}
          className="absolute w-[90%] h-[90%] top-[5%] left-[5%] bg-radial from-gold-start/15 via-[#FFF3DF]/40 to-transparent filter blur-[150px]" 
        />
        
        {/* Subtle floating petals */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={`petal-intel-${i}`}
            className="absolute rounded-[50%_0_50%_0] bg-gold-start/20 blur-[1px]"
            style={{ 
              width: Math.random() * 12 + 8, 
              height: Math.random() * 12 + 8,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              y: [0, -120], 
              opacity: [0, 0.6, 0], 
              rotate: [0, 360] 
            }}
            transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      {/* ── DIVINE NAVIGATION ── */}
      <div className="w-full max-w-7xl mx-auto px-6 mb-4 relative z-50">
        <div className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-widest font-bold mb-8">
          <Link href="/" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-gold-start/50" />
          <span className="text-[#5C1A1A]">My Divine Journey</span>
        </div>
      </div>

      {/* ── PAGE CONTENT ── */}
      <DivineGreeting />
      <DivineMemorySystem />
      <PersonalizedCollections />
      <DigitalDivineMemories />
      <CompleteDivineOffering />
      <DivineCalendarAI />
      <DivineSakhiAI />
      
      {/* ── RULE NO. 20: CONTINUE JOURNEY ── */}
      <ContinueJourneyAI />

    </main>
  );
}
