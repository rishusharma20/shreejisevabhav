"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import DivineJourneysOverview from "@/components/admin/offerings/DivineJourneysOverview";
import DivineOfferingList from "@/components/admin/offerings/DivineOfferingList";

export default function DivineOfferingsPage() {
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
            The Divine Journey Command
          </span>
          <Sparkles className="w-5 h-5 text-gold-start" />
        </motion.div>
      </div>

      <DivineJourneysOverview />
      <DivineOfferingList />

      {/* Navigation */}
      <div className="w-full max-w-7xl mx-auto px-6 mb-20 text-center">
        <Link href="/admin">
          <button className="bg-white/80 backdrop-blur-md border border-gold-start/30 rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-[#5C1A1A] shadow-sm hover:bg-gold-start/10 transition-all inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Return To Command Temple
          </button>
        </Link>
      </div>
    </main>
  );
}
