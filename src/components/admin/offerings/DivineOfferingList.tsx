"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const MOCK_OFFERINGS = [
  {
    id: "SSB-2026-25478",
    title: "Krishna Poshak",
    size: "Size-4",
    collection: "Janmashtami Special Collection",
    status: "DIVINE JOURNEY CONTINUING....."
  },
  {
    id: "SSB-2026-25479",
    title: "Premium Mukut",
    size: "Size-2",
    collection: "Radhashtami Exclusive",
    status: "LOVINGLY BEING PREPARED....."
  },
  {
    id: "SSB-2026-25480",
    title: "Complete Shringar Set",
    size: "Size-5",
    collection: "Daily Seva Offerings",
    status: "BEAUTIFULLY ACCEPTED....."
  }
];

export default function DivineOfferingList() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="flex justify-between items-end mb-8 border-b border-gold-start/20 pb-4">
        <h4 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider">
          Active Offerings
        </h4>
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
          Sort By: Newest First
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_OFFERINGS.map((offering, idx) => (
          <motion.div
            key={offering.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white/80 backdrop-blur-md border border-gold-start/30 rounded-3xl p-8 shadow-[0_10px_30px_rgba(212,168,83,0.05)] hover:shadow-[0_10px_30px_rgba(212,168,83,0.1)] transition-all flex flex-col"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-3 h-3 text-gold-start" />
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
                DIVINE OFFERING #{offering.id}
              </span>
            </div>

            <div className="flex-1 mb-8">
              <h5 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider mb-2 uppercase">
                {offering.title}
              </h5>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-charcoal/70 uppercase tracking-widest">
                  {offering.size}
                </span>
                <span className="text-xs font-bold text-charcoal/70 uppercase tracking-widest">
                  {offering.collection}
                </span>
              </div>
            </div>

            <div className="w-12 h-[1px] bg-gold-start/30 mb-6" />

            <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-gold-start mb-6">
              {offering.status}
            </p>

            <Link href={`/admin/offerings/${offering.id}`}>
              <button className="w-full bg-transparent border border-gold-start/50 text-[#5C1A1A] rounded-full px-6 py-3 text-[9px] uppercase tracking-widest font-bold hover:bg-gold-start/10 transition-colors inline-flex items-center justify-center gap-2">
                Continue Journey <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
