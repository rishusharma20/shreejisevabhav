"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import CreatorHero from "@/components/creator/CreatorHero";
import CreatorPortrait from "@/components/creator/CreatorPortrait";
import CreatorMessage from "@/components/creator/CreatorMessage";
import DivineValues from "@/components/creator/DivineValues";
import JourneyOfLove from "@/components/creator/JourneyOfLove";

export default function TheHeartOfShreejiSevaBhav() {
  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-24 pt-32">
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-60" />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 2 }}
          className="absolute w-[80%] h-[80%] top-[10%] left-[-10%] bg-radial from-gold-start/20 via-[#FFF3DF]/50 to-transparent filter blur-[100px]" 
        />
        {/* Subtle floating petals */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`petal-creator-${i}`}
            className="absolute rounded-[40%_0_40%_0] bg-gold-start/20 blur-[1px]"
            style={{ 
              width: Math.random() * 15 + 10, 
              height: Math.random() * 15 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              y: [0, -100], 
              opacity: [0, 0.6, 0], 
              rotate: [0, 360] 
            }}
            transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      {/* ── DIVINE NAVIGATION ── */}
      <div className="w-full max-w-5xl mx-auto px-6 mb-4 relative z-50">
        <div className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-widest font-bold mb-8">
          <Link href="/" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-gold-start/50" />
          <span className="text-charcoal/70">Our Divine Journey</span>
          <ChevronRight className="w-3 h-3 text-gold-start/50" />
          <span className="text-[#5C1A1A]">The Heart Of Shreeji Seva Bhav</span>
        </div>
      </div>

      {/* ── PAGE CONTENT ── */}
      <CreatorHero />
      <CreatorPortrait />
      <CreatorMessage />
      <DivineValues />
      <JourneyOfLove />

      {/* ── RETURN TO TEMPLE CTA ── */}
      <div className="w-full relative z-10 flex justify-center pt-8">
        <Link href="/">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-[#5C1A1A] rounded-full px-10 py-5 flex items-center justify-center gap-3 text-white text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold shadow-[0_10px_30px_rgba(92,26,26,0.3)] hover:bg-[#8B2B2B] transition-colors"
          >
            Return To Temple <ArrowRight className="w-4 h-4" />
          </motion.div>
        </Link>
      </div>

    </main>
  );
}
