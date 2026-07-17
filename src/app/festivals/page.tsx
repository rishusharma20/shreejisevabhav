"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import FestivalCountdown from "@/components/festivals/FestivalCountdown";
import FestivalCalendar from "@/components/festivals/FestivalCalendar";

export default function FestivalHubPage() {
  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-24 pt-32">
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-60" />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 2 }}
          className="absolute w-[80%] h-[80%] top-[10%] right-[-10%] bg-radial from-gold-start/20 via-[#FFF3DF]/50 to-transparent filter blur-[100px]" 
        />
        {/* Subtle floating petals */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`petal-festival-${i}`}
            className="absolute rounded-[40%_0_40%_0] bg-gold-start/20 blur-[1px]"
            style={{ 
              width: Math.random() * 15 + 10, 
              height: Math.random() * 15 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              y: [0, -150], 
              opacity: [0, 0.8, 0], 
              rotate: [0, 360] 
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
          <span className="text-[#5C1A1A]">Festival Collections</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div>
            <h1 className="text-[12px] uppercase tracking-[0.3em] font-bold text-[#8B6F4E] mb-3">
              Shreeji Seva Bhav Presents
            </h1>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold text-[#5C1A1A] tracking-wider mb-4 leading-tight">
              The Divine Festivals <br/> Of Vrindavan
            </h2>
            <p className="text-sm md:text-base text-warm-gray max-w-2xl font-medium italic">
              Celebrate every divine festival with love and devotion. Explore sacred offerings lovingly prepared for Thakurji.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 relative z-10 flex flex-col gap-16">
        
        <FestivalCountdown />
        
        <FestivalCalendar />

        {/* ── RULE NO 10: HOW TO CONTINUE? ── */}
        <div className="w-full border-t border-gold-start/15 pt-16 flex flex-col items-center">
          <h3 className="font-display text-2xl font-bold text-[#5C1A1A] tracking-wider mb-8">
            Continue Your Divine Journey
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] uppercase tracking-widest font-bold text-warm-gray">
            <Link href="/divine-wardrobe" className="hover:text-gold-start transition-colors px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-gold-start/20">Radha Dresses</Link>
            <Link href="/krishna-vastra" className="hover:text-gold-start transition-colors px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-gold-start/20">Krishna Vastra</Link>
            <Link href="/jewellery" className="hover:text-gold-start transition-colors px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-gold-start/20">Ratna Alankaar</Link>
            <Link href="/my-seva" className="hover:text-gold-start transition-colors px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-gold-start/20">My Seva</Link>
          </div>
          
          <Link href="/" className="mt-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-charcoal rounded-full px-8 py-4 flex items-center justify-center gap-3 text-white text-[10px] uppercase tracking-widest font-bold shadow-sm hover:bg-[#5C1A1A] transition-colors"
            >
              Return To Temple <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </div>

      </div>
    </main>
  );
}
