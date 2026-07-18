"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ArchivesHero from "@/components/admin/archives/ArchivesHero";
import DivineLegacyTimeline from "@/components/admin/archives/DivineLegacyTimeline";
import DivineMemoryVault from "@/components/admin/archives/DivineMemoryVault";
import DigitalMuseum from "@/components/admin/archives/DigitalMuseum";
import DivineTimeCapsule from "@/components/admin/archives/DivineTimeCapsule";

export default function EternalArchivesPage() {
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
            The Eternal Archives of Vrindavan
          </span>
          <Sparkles className="w-5 h-5 text-gold-start" />
        </motion.div>
      </div>

      <ArchivesHero />
      
      <div className="w-full max-w-7xl mx-auto px-6 mb-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <DivineLegacyTimeline />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="h-full"
        >
          <DivineMemoryVault />
        </motion.div>
      </div>

      <DigitalMuseum />
      <DivineTimeCapsule />

      {/* Navigation */}
      <div className="w-full max-w-7xl mx-auto px-6 mb-20 text-center border-t border-gold-start/20 pt-16 mt-16">
        <Link href="/admin">
          <button className="bg-white/80 backdrop-blur-md border border-gold-start/30 rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-[#5C1A1A] shadow-sm hover:bg-gold-start/10 transition-all inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Return To Command Temple
          </button>
        </Link>
      </div>
    </main>
  );
}
