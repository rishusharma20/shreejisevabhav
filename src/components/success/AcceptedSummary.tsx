"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Package, Compass } from "lucide-react";
import Link from "next/link";

export default function AcceptedSummary() {
  return (
    <div className="w-full bg-white/50 backdrop-blur-2xl border border-gold-start/30 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(212,168,83,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] relative overflow-hidden">
      
      {/* Background Mandala / Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-radial from-gold-start/20 to-transparent blur-[60px] pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4 flex items-center justify-center gap-3">
          JAI SHRI RADHE
        </h2>
        <p className="text-base md:text-lg text-charcoal max-w-lg mx-auto font-medium">
          May Shri Radha Raman Ji's divine blessings forever remain upon you and your family.
        </p>
        <p className="text-sm text-warm-gray mt-6 max-w-xl mx-auto italic">
          "Every Divine Offering created by Shreeji Seva Bhav is lovingly handcrafted with Bhakti, Prem and Seva for your beloved Thakurji."
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
        
        {/* ── LEFT: OFFERING DETAILS ── */}
        <div className="flex-1 w-full space-y-8">
          
          <div className="border-l-4 border-gold-start pl-6 py-2 bg-gradient-to-r from-gold-start/5 to-transparent">
            <p className="text-[10px] uppercase tracking-widest font-bold text-warm-gray mb-1">
              Divine Offering No.
            </p>
            <p className="font-display text-2xl font-bold text-charcoal">
              SSB-2026-108
            </p>
          </div>

          <div>
            <h3 className="text-[12px] uppercase tracking-widest font-bold text-charcoal mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-gold-start" /> Your Offerings
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-gold-start mt-1">+</span>
                <span className="text-sm font-medium text-charcoal">Premium Krishna Poshak (Midnight Blue Zardozi)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold-start mt-1">+</span>
                <span className="text-sm font-medium text-charcoal">Premium Gold Plated Peacock Mukut</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold-start mt-1">+</span>
                <span className="text-sm font-medium text-charcoal">Premium Festival Packaging</span>
              </li>
            </ul>
          </div>

        </div>

        {/* ── RIGHT: DELIVERY & ACTIONS ── */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* FESTIVAL AWARE DELIVERY */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/60 rounded-2xl p-6 border border-lotus/20 shadow-sm relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-24 h-24 bg-lotus/10 blur-[20px] rounded-bl-full" />
            <h4 className="text-[12px] uppercase tracking-widest font-bold text-lotus mb-3 flex items-center gap-2">
              Wonderful News <Sparkles className="w-4 h-4" />
            </h4>
            <p className="text-sm text-charcoal font-medium mb-4 leading-relaxed">
              Your Divine Offering will arrive before <br/><span className="font-bold text-[#5C1A1A] text-lg">JANMASHTAMI</span>.
            </p>
            <div className="inline-block px-3 py-1 bg-lotus/10 rounded-full text-[9px] uppercase tracking-widest font-bold text-lotus">
              Estimated Delivery: 2 Days
            </div>
          </motion.div>

          {/* ACTIONS */}
          <Link href="/my-seva">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-charcoal text-white text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:bg-[#5C1A1A] transition-colors flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" /> Track My Seva
            </motion.button>
          </Link>

          <Link href="/collections">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-transparent border-2 border-gold-start/30 text-charcoal text-[10px] uppercase tracking-[0.2em] font-bold hover:border-gold-start hover:bg-gold-start/5 transition-all flex items-center justify-center"
            >
              Continue Your Divine Journey
            </motion.button>
          </Link>

        </div>
      </div>
    </div>
  );
}
