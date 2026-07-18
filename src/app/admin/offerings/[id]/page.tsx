"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import OfferingDetailsPanel from "@/components/admin/offerings/OfferingDetailsPanel";
import DivineJourneyTimelineAdmin from "@/components/admin/offerings/DivineJourneyTimelineAdmin";
import CustomDivineOfferingCard from "@/components/admin/offerings/CustomDivineOfferingCard";

export default function DivineOfferingDetailsPage() {
  const params = useParams();
  const offeringId = params?.id || "SSB-2026-25478";

  return (
    <main className="w-full pb-20">
      {/* ── ATMOSPHERIC HEADER ── */}
      <div className="w-full text-center mb-16 px-6">
        <Link href="/admin/offerings" className="inline-block mb-6">
          <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors inline-flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Return to Offerings
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
              Divine Offering #{offeringId}
            </span>
            <Sparkles className="w-5 h-5 text-gold-start" />
          </motion.div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Timeline & Custom Options */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <DivineJourneyTimelineAdmin />
            <CustomDivineOfferingCard />
          </motion.div>

          {/* Right Column: Offering Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <OfferingDetailsPanel />
          </motion.div>
        </div>
        
        {/* Divine Blessing Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-12 py-5 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-3">
            <HeartHandshake className="w-5 h-5" /> Save Divine Updates
          </button>
        </motion.div>
      </div>
    </main>
  );
}
