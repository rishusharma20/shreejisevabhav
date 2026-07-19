"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-12 pt-32">
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[70vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-80" />
        
        {/* Divine Glowing Orbs (Diyas) */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 3 }}
          className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-radial from-gold-start/15 via-[#FFF3DF]/40 to-transparent filter blur-[120px]" 
        />
        
        {/* Subtle floating petals */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`petal-404-${i}`}
            className="absolute rounded-[50%_0_50%_0] bg-gold-start/20 blur-[1px]"
            style={{ 
              width: ((i * 13) % 12) + 8, 
              height: ((i * 17) % 12) + 8,
              left: `${(i * 23) % 100}%`,
              top: `${(i * 29) % 100}%`
            }}
            animate={{ 
              y: [0, -150], 
              opacity: [0, 0.6, 0], 
              rotate: [0, 360] 
            }}
            transition={{ duration: 15 + ((i * 7) % 10), repeat: Infinity, delay: (i * 3) % 5 }}
          />
        ))}
      </div>

      {/* ── DIVINE NAVIGATION ── */}
      <div className="w-full max-w-7xl mx-auto px-6 mb-4 relative z-50">
        <div className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-widest font-bold mb-8">
          <Link href="/" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-gold-start/50" />
          <span className="text-[#5C1A1A]">Divine Path</span>
        </div>
      </div>

      <div className="relative z-50 text-center py-20">
        <h1 className="text-4xl font-display text-[#5C1A1A] mb-4">Divine Path Not Found</h1>
        <p className="text-[#8B6F4E]">The path you seek is currently unavailable.</p>
        <Link href="/" className="mt-8 inline-block px-8 py-3 bg-[#5C1A1A] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#8B6F4E] transition-colors">
          Return to Temple
        </Link>
      </div>

    </main>
  );
}
