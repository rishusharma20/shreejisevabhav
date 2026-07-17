"use client";

import { motion } from "framer-motion";
import { Sparkles, History, Heart } from "lucide-react";
import Link from "next/link";

export default function CheckoutWelcome() {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-white/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-gold-start/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
      
      {/* Devotional Greeting */}
      <div className="flex-1">
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2 flex items-center gap-3">
          JAI SHRI RADHE <Sparkles className="w-5 h-5 text-gold-start" />
        </h2>
        <p className="text-sm md:text-base text-warm-gray leading-relaxed max-w-lg">
          Welcome back, Rishu. <br className="hidden md:block" />
          May Shri Radha Raman Ji's divine blessings forever remain upon your family.
        </p>
      </div>

      {/* Quick Navigation for Logged In User */}
      <div className="flex flex-wrap items-center gap-3 md:gap-4 shrink-0">
        <Link href="/my-seva">
          <button className="px-4 py-2 rounded-full bg-white/60 hover:bg-white text-[9px] uppercase tracking-widest font-bold text-charcoal border border-lotus/20 transition-all flex items-center gap-2 shadow-sm">
            <History className="w-3.5 h-3.5 text-gold-start" /> Recently Viewed
          </button>
        </Link>
        <Link href="/my-seva">
          <button className="px-4 py-2 rounded-full bg-white/60 hover:bg-white text-[9px] uppercase tracking-widest font-bold text-charcoal border border-lotus/20 transition-all flex items-center gap-2 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-lotus fill-lotus/20" /> Beloved Collections
          </button>
        </Link>
      </div>
      
    </div>
  );
}
