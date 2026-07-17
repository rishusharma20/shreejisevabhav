"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import OfferingsFilter from "@/components/offerings/OfferingsFilter";
import OfferingHistoryCard from "@/components/offerings/OfferingHistoryCard";
import OfferingsRecommendations from "@/components/offerings/OfferingsRecommendations";

const MOCK_OFFERINGS = [
  {
    id: "1",
    orderNumber: "SSB-2026-108",
    date: "August 12, 2026",
    items: [
      "Premium Krishna Poshak (Midnight Blue Zardozi)",
      "Premium Gold Plated Peacock Mukut"
    ],
    total: 12500,
    status: "prepared" as const,
    hasFestivalPackaging: true
  },
  {
    id: "2",
    orderNumber: "SSB-2026-092",
    date: "July 24, 2026",
    items: [
      "Radha Rani's Divine Poshak (Lotus Pink)",
      "Premium Pearl Necklace Set"
    ],
    total: 18400,
    status: "journey" as const,
    hasFestivalPackaging: false
  },
  {
    id: "3",
    orderNumber: "SSB-2026-015",
    date: "March 18, 2026",
    items: [
      "Premium Holi Festival Collection",
      "Golden Murli"
    ],
    total: 8900,
    status: "received" as const,
    hasFestivalPackaging: true
  }
];

export default function MyDivineOfferingsPage() {
  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-24 pt-32">
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-60" />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 2 }}
          className="absolute w-[80%] h-[80%] top-[10%] right-[-10%] bg-radial from-gold-start/20 via-[#FFF3DF]/50 to-transparent filter blur-[100px]" 
        />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 2, delay: 0.5 }}
          className="absolute w-[60%] h-[60%] top-[30%] left-[-10%] bg-radial from-lotus/10 to-transparent filter blur-[100px]" 
        />
        {/* Subtle floating petals */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`petal-history-${i}`}
            className="absolute rounded-[40%_0_40%_0] bg-gold-start/20 blur-[1.5px]"
            style={{ 
              width: Math.random() * 15 + 10, 
              height: Math.random() * 15 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              y: [0, -100], 
              opacity: [0, 0.6, 0], 
              rotate: [0, 180] 
            }}
            transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      {/* ── DIVINE NAVIGATION ── */}
      <div className="w-full max-w-5xl mx-auto px-6 mb-12 relative z-50">
        <div className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-widest font-bold mb-8">
          <Link href="/" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-gold-start/50" />
          <Link href="/my-seva" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">My Seva</Link>
          <ChevronRight className="w-3 h-3 text-gold-start/50" />
          <span className="text-[#5C1A1A]">My Divine Offerings</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
            My Divine Offerings
          </h1>
          <p className="text-sm md:text-base text-warm-gray max-w-2xl font-medium italic">
            Lovingly witness your sacred offerings as they continue their divine journey to your beloved Thakurji.
          </p>
        </motion.div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <OfferingsFilter />
        </motion.div>

        <div className="flex flex-col gap-8">
          {MOCK_OFFERINGS.map((offering, index) => (
            <motion.div
              key={offering.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
            >
              <OfferingHistoryCard {...offering} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <OfferingsRecommendations />
        </motion.div>

      </div>
    </main>
  );
}
