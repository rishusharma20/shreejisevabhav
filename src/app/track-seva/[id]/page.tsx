"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import DivineJourneyTimeline from "@/components/tracking/DivineJourneyTimeline";
import LiveDeliveryUpdate from "@/components/tracking/LiveDeliveryUpdate";
import DigitalBlessings from "@/components/tracking/DigitalBlessings";
import AiDivineRecommendations from "@/components/tracking/AiDivineRecommendations";
import { use } from "react";

export default function TrackSevaPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  
  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-24 pt-32">
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-60" />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 2 }}
          className="absolute w-[80%] h-[80%] top-[10%] right-[-10%] bg-radial from-gold-start/20 via-[#FFF3DF]/50 to-transparent filter blur-[100px]" 
        />
        {/* Subtle floating petals */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`petal-tracking-${i}`}
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
      <div className="w-full max-w-5xl mx-auto px-6 mb-8 relative z-50">
        <div className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-widest font-bold">
          <Link href="/" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-gold-start/50" />
          <Link href="/my-offerings" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">My Divine Offerings</Link>
          <ChevronRight className="w-3 h-3 text-gold-start/50" />
          <span className="text-[#5C1A1A]">Track My Seva</span>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 relative z-10 flex flex-col gap-12">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
              Track My Seva
            </h1>
            <p className="text-[12px] uppercase tracking-widest font-bold text-warm-gray mb-1">
              Divine Offering No. <span className="text-charcoal">{unwrappedParams.id}</span>
            </p>
          </div>
          <div className="text-center md:text-right">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-warm-gray mb-1">
              Sacred Offerings
            </h4>
            <p className="text-sm font-medium text-charcoal">
              Premium Krishna Poshak + Mukut + Morpankh
            </p>
          </div>
        </motion.div>

        {/* ── RULE NO 10: 1. WHERE AM I? (Timeline & Location) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <DivineJourneyTimeline />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            <LiveDeliveryUpdate />
            <DigitalBlessings />
          </motion.div>
        </div>

        {/* ── RULE NO 10: 2 & 3. WHAT NEXT? HOW TO CONTINUE? (Recommendations & Navigation) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <AiDivineRecommendations />
        </motion.div>

        <div className="flex justify-center pt-8">
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-transparent border-2 border-charcoal rounded-full px-8 py-4 flex items-center justify-center gap-3 text-charcoal text-[10px] uppercase tracking-widest font-bold shadow-sm hover:bg-charcoal hover:text-white transition-colors"
            >
              Return To Temple <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </div>

      </div>
    </main>
  );
}
