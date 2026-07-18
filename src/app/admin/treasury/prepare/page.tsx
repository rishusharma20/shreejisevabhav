"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import DivineCraftsmanshipCenter from "@/components/admin/treasury/DivineCraftsmanshipCenter";
import CollectionJourneyTimeline from "@/components/admin/treasury/CollectionJourneyTimeline";

export default function DivinePrepareOfferingPage() {
  return (
    <main className="w-full pb-20">
      {/* ── ATMOSPHERIC HEADER ── */}
      <div className="w-full text-center mb-16 px-6">
        <Link href="/admin/treasury" className="inline-block mb-6">
          <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors inline-flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Return to Treasury
          </button>
        </Link>
        
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-4 bg-white/40 backdrop-blur-md border border-gold-start/30 rounded-full px-8 py-3 shadow-sm"
          >
            <Sparkles className="w-5 h-5 text-gold-start" />
            <span className="font-display text-lg md:text-xl font-bold text-[#5C1A1A] tracking-widest uppercase">
              Preparing A New Divine Offering
            </span>
            <Sparkles className="w-5 h-5 text-gold-start" />
          </motion.div>
        </div>
      </div>

      <DivineCraftsmanshipCenter />

      <div className="w-full max-w-5xl mx-auto px-6">
        <CollectionJourneyTimeline />
      </div>
    </main>
  );
}
