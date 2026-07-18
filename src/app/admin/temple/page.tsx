"use client";

import { motion } from "framer-motion";
import EternalVrindavanOverlay from "@/components/admin/temple/EternalVrindavanOverlay";
import TempleHero from "@/components/admin/temple/TempleHero";
import LivingVrindavanSystem from "@/components/admin/temple/LivingVrindavanSystem";
import EternalEvolutionEngine from "@/components/admin/temple/EternalEvolutionEngine";
import DivineContinuationSystem from "@/components/admin/temple/DivineContinuationSystem";

export default function DigitalTemplePage() {
  return (
    <main className="w-full relative min-h-screen bg-[#FAFAFA]">
      <EternalVrindavanOverlay />
      
      <div className="relative z-10 pt-10">
        <TempleHero />
        <LivingVrindavanSystem />
        <EternalEvolutionEngine />
        
        <div className="w-full max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-start/30 to-transparent" />
        </div>
        
        <DivineContinuationSystem />
      </div>
    </main>
  );
}
