"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PocketVrindavanHero from "@/components/mobile/PocketVrindavanHero";
import DivineInstallPrompt from "@/components/mobile/DivineInstallPrompt";
import DigitalDivineMemoriesMobile from "@/components/mobile/DigitalDivineMemoriesMobile";
import ContinueJourneyMobile from "@/components/mobile/ContinueJourneyMobile";

export default function PocketVrindavanPage() {
  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-12 pt-16 md:pt-32">
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-80" />
        
        {/* Divine Glowing Orbs */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 4 }}
          className="absolute w-[100%] h-[100%] top-[0%] left-[0%] bg-radial from-[#FFF3DF]/40 via-transparent to-transparent filter blur-[100px]" 
        />
        
        {/* Very subtle floating petals */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`petal-mobile-${i}`}
            className="absolute rounded-[50%_0_50%_0] bg-gold-start/20 blur-[1px]"
            style={{ 
              width: Math.random() * 10 + 6, 
              height: Math.random() * 10 + 6,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              y: [0, -100], 
              opacity: [0, 0.5, 0], 
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
          <span className="text-[#5C1A1A]">Pocket Vrindavan</span>
        </div>
      </div>

      {/* ── PAGE CONTENT ── */}
      <PocketVrindavanHero />
      <DivineInstallPrompt />
      <DigitalDivineMemoriesMobile />
      
      {/* ── RULE NO. 23: VRINDAVAN SHOULD NEVER CLOSE ── */}
      <ContinueJourneyMobile />

    </main>
  );
}
