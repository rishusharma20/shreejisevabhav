"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import DivineWhispersHero from "@/components/whispers/DivineWhispersHero";
import TodaysDivineBlessing from "@/components/whispers/TodaysDivineBlessing";
import FestivalWhispers from "@/components/whispers/FestivalWhispers";
import LiveDivineJourney from "@/components/whispers/LiveDivineJourney";
import DivineMemoriesWhisper from "@/components/whispers/DivineMemoriesWhisper";
import ReceiveDivineWhispers from "@/components/whispers/ReceiveDivineWhispers";
import SakhiWhisperReminder from "@/components/whispers/SakhiWhisperReminder";
import ContinueJourneyWhispers from "@/components/whispers/ContinueJourneyWhispers";

export default function DivineWhispersPage() {
  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-12 pt-32">
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-80" />
        
        {/* Divine Glowing Orbs (Soft, representing whispers) */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 4 }}
          className="absolute w-[100%] h-[100%] top-[0%] left-[0%] bg-radial from-[#FFF3DF]/30 via-transparent to-transparent filter blur-[100px]" 
        />
        
        {/* Very subtle floating petals for "Whispers" */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`petal-whisper-${i}`}
            className="absolute rounded-[50%_0_50%_0] bg-gold-start/15 blur-[2px]"
            style={{ 
              width: Math.random() * 8 + 6, 
              height: Math.random() * 8 + 6,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              y: [0, -80], 
              opacity: [0, 0.4, 0], 
              rotate: [0, 360] 
            }}
            transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      {/* ── DIVINE NAVIGATION ── */}
      <div className="w-full max-w-7xl mx-auto px-6 mb-4 relative z-50">
        <div className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-widest font-bold mb-8">
          <Link href="/" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-gold-start/50" />
          <span className="text-[#5C1A1A]">Divine Whispers</span>
        </div>
      </div>

      {/* ── PAGE CONTENT ── */}
      <DivineWhispersHero />
      <TodaysDivineBlessing />
      <FestivalWhispers />
      <LiveDivineJourney />
      <DivineMemoriesWhisper />
      <ReceiveDivineWhispers />
      <SakhiWhisperReminder />
      
      {/* ── RULE NO. 22: CONTINUE JOURNEY ── */}
      <ContinueJourneyWhispers />

    </main>
  );
}
