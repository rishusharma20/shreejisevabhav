"use client";

import CommandTempleHero from "@/components/admin/dashboard/CommandTempleHero";
import CommandTempleStats from "@/components/admin/dashboard/CommandTempleStats";
import TodaysDivineJourneyAdmin from "@/components/admin/dashboard/TodaysDivineJourneyAdmin";
import FestivalCommandCenter from "@/components/admin/dashboard/FestivalCommandCenter";
import DivineFamilyAdminStats from "@/components/admin/dashboard/DivineFamilyAdminStats";
import LiveDivineMap from "@/components/admin/dashboard/LiveDivineMap";
import AiDivineInsightsAdmin from "@/components/admin/dashboard/AiDivineInsightsAdmin";
import CommandTempleNavigation from "@/components/admin/dashboard/CommandTempleNavigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function DivineCommandTemplePage() {
  return (
    <main className="w-full">
      {/* ── ATMOSPHERIC HEADER ── */}
      <div className="w-full text-center mb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-4 bg-white/40 backdrop-blur-md border border-gold-start/30 rounded-full px-8 py-3 shadow-sm"
        >
          <Sparkles className="w-5 h-5 text-gold-start" />
          <span className="font-display text-lg md:text-xl font-bold text-[#5C1A1A] tracking-widest uppercase">
            The Divine Command Temple
          </span>
          <Sparkles className="w-5 h-5 text-gold-start" />
        </motion.div>
      </div>

      <CommandTempleHero />
      <CommandTempleStats />
      <TodaysDivineJourneyAdmin />
      <FestivalCommandCenter />
      <LiveDivineMap />
      <DivineFamilyAdminStats />
      <AiDivineInsightsAdmin />
      
      {/* ── TODAY'S DIVINE BLESSINGS (Admin Footer) ── */}
      <div className="w-full max-w-4xl mx-auto px-6 py-16 text-center border-t border-gold-start/20 relative z-10 mb-12">
        <h4 className="font-display text-2xl font-bold text-[#5C1A1A] tracking-wider mb-6">
          JAI SHRI RADHE.
        </h4>
        <div className="w-12 h-[1px] bg-gold-start/50 mx-auto mb-6" />
        <p className="font-medium italic text-lg text-charcoal/80 leading-relaxed max-w-xl mx-auto">
          "May Shri Radha Raman Ji continue blessing every beautiful Divine Journey that begins today."
        </p>
      </div>

      <CommandTempleNavigation />
    </main>
  );
}
