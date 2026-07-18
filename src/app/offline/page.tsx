"use client";

import { motion } from "framer-motion";
import { WifiOff, Flower, Sparkles } from "lucide-react";
import Link from "next/link";

export default function OfflineDarshanPage() {
  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-12 pt-16 md:pt-32 flex flex-col items-center justify-center">
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-80" />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 4 }}
          className="absolute w-[100%] h-[100%] top-[0%] left-[0%] bg-radial from-[#FFF3DF]/30 via-transparent to-transparent filter blur-[100px]" 
        />
      </div>

      <div className="w-full max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/60 backdrop-blur-xl border border-gold-start/30 rounded-[40px] p-8 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.05)] relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-start/20 to-gold-start/5 flex items-center justify-center mx-auto mb-8 border border-gold-start/30 shadow-sm relative z-10">
            <WifiOff className="w-8 h-8 text-gold-start" />
          </div>

          <h4 className="font-display text-2xl font-bold text-[#5C1A1A] tracking-wider mb-2 relative z-10">
            JAI SHRI RADHE.
          </h4>
          <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-warm-gray mb-6 relative z-10">
            You are currently offline.
          </h5>
          
          <div className="w-12 h-[1px] bg-gold-start/50 mx-auto mb-8 relative z-10" />
          
          <div className="font-medium italic text-lg md:text-xl text-charcoal/80 leading-relaxed max-w-xl mx-auto mb-10 relative z-10">
            <p>
              May Shri Radha Raman Ji always illuminate your path.
            </p>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 relative z-10">
            <button className="bg-white/80 border border-gold-start/30 text-[#5C1A1A] rounded-full px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold shadow-sm inline-flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-gold-start" /> Today's Blessing
            </button>
            <button className="bg-white/80 border border-gold-start/30 text-[#5C1A1A] rounded-full px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold shadow-sm inline-flex items-center gap-2">
              <Flower className="w-3 h-3 text-gold-start" /> Saved Divine Darshan
            </button>
          </div>
          
          <div className="mt-12">
            <Link href="/">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-start hover:text-[#5C1A1A] transition-colors underline underline-offset-4">
                Continue Your Journey
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
