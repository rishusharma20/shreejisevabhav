"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import DarshanHero from "@/components/darshan/DarshanHero";
import TodaysDarshan from "@/components/darshan/TodaysDarshan";
import DarshanMessage from "@/components/darshan/DarshanMessage";
import OfferPrayers from "@/components/darshan/OfferPrayers";
import DivineCalendar from "@/components/darshan/DivineCalendar";
import LiveCelebrations from "@/components/darshan/LiveCelebrations";
import DarshanExperiences from "@/components/darshan/DarshanExperiences";
import TimeSpentBlessing from "@/components/darshan/TimeSpentBlessing";

export default function DivineDarshanPage() {
  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-12 pt-32">
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[70vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-80" />
        
        {/* Divine Glowing Orbs */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 3 }}
          className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-radial from-gold-start/10 via-[#FFF3DF]/40 to-transparent filter blur-[120px]" 
        />
        
        {/* Subtle floating petals */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`petal-darshan-${i}`}
            className="absolute rounded-[50%_0_50%_0] bg-gold-start/20 blur-[1px]"
            style={{ 
              width: Math.random() * 12 + 8, 
              height: Math.random() * 12 + 8,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              y: [0, -150], 
              opacity: [0, 0.7, 0], 
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
          <span className="text-[#5C1A1A]">The Divine Darshan</span>
        </div>
      </div>

      {/* ── PAGE CONTENT ── */}
      <DarshanHero />
      <TodaysDarshan />
      <DarshanMessage />
      <DivineCalendar />
      <LiveCelebrations />
      <OfferPrayers />
      <DarshanExperiences />
      
      {/* ── RULE NO. 16: RETURN TO TEMPLE / CONTINUE JOURNEY ── */}
      <div className="w-full relative z-10 flex flex-col items-center pt-8">
        <Link href="/">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-[#5C1A1A] rounded-full px-12 py-5 flex items-center justify-center gap-3 text-white text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold shadow-[0_10px_30px_rgba(92,26,26,0.3)] hover:bg-[#8B2B2B] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Return To Temple
          </motion.div>
        </Link>
        <p className="font-display text-xl font-bold text-[#5C1A1A] italic">
          Continue Your Divine Journey...
        </p>
      </div>

      {/* GLOBAL 20-MIN (20-SEC FOR DEV) BLESSING */}
      <TimeSpentBlessing />

    </main>
  );
}
