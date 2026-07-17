"use client";

import { motion } from "framer-motion";
import { Link as LinkIcon, Heart, Sparkles, Crown } from "lucide-react";
import Link from "next/link";

export default function CartRecommendations() {
  return (
    <div className="w-full mt-16 relative pt-12 border-t border-gold-start/15">
      <div className="mb-8 flex flex-col items-start md:items-center md:flex-row justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
            Recommended Divine Offerings
          </h2>
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
            Curated pieces to complete your Seva
          </p>
        </div>
      </div>

      {/* ── Horizontal Scroll Grid ── */}
      <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory">
        
        {/* Mock Cart Recommendation 1: Jewellery */}
        <Link href="/jewellery" className="shrink-0 w-[280px] snap-center">
          <motion.div 
            whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(212,168,83,0.15)" }}
            className="group relative bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all h-[360px] flex flex-col"
          >
            <div className="relative w-full flex-1 bg-cream/40 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gold-start/5 group-hover:bg-gold-start/10 transition-colors z-0" />
              <Sparkles className="w-8 h-8 text-lotus z-10 opacity-50" />
            </div>
            <div className="p-5 relative z-20 bg-white/60 backdrop-blur-md border-t border-gold-start/10">
              <div className="text-[8px] uppercase tracking-widest font-bold text-warm-gray mb-1 flex justify-between">
                <span>Matching Mukut</span>
                <span className="text-gold-start">₹4,200</span>
              </div>
              <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-gold-start transition-colors mb-4 line-clamp-1">
                Golden Zardozi Mukut
              </h3>
              <button className="w-full py-2.5 rounded-xl border-2 border-gold-start/30 bg-white/50 text-[9px] uppercase tracking-widest font-bold text-charcoal group-hover:border-gold-start/60 group-hover:bg-gold-start/5 transition-all">
                Add To Seva
              </button>
            </div>
          </motion.div>
        </Link>

        {/* Mock Cart Recommendation 2: Poshak */}
        <Link href="/krishna-vastra" className="shrink-0 w-[280px] snap-center">
          <motion.div 
            whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(30,58,138,0.15)" }}
            className="group relative bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all h-[360px] flex flex-col"
          >
            <div className="relative w-full flex-1 bg-cream/40 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[#1E3A8A]/5 group-hover:bg-[#1E3A8A]/10 transition-colors z-0" />
              <Crown className="w-8 h-8 text-[#1E3A8A] z-10 opacity-50" />
            </div>
            <div className="p-5 relative z-20 bg-white/60 backdrop-blur-md border-t border-gold-start/10">
              <div className="text-[8px] uppercase tracking-widest font-bold text-warm-gray mb-1 flex justify-between">
                <span>Matching Thakurji Vastra</span>
                <span className="text-gold-start">₹8,100</span>
              </div>
              <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-[#1E3A8A] transition-colors mb-4 line-clamp-1">
                Peacock Blue Silk Set
              </h3>
              <button className="w-full py-2.5 rounded-xl border-2 border-gold-start/30 bg-white/50 text-[9px] uppercase tracking-widest font-bold text-charcoal group-hover:border-[#1E3A8A]/40 group-hover:bg-[#1E3A8A]/5 transition-all">
                Add To Seva
              </button>
            </div>
          </motion.div>
        </Link>

        {/* Mock Cart Recommendation 3: Accessories */}
        <Link href="/jewellery" className="shrink-0 w-[280px] snap-center">
          <motion.div 
            whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(212,168,83,0.15)" }}
            className="group relative bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all h-[360px] flex flex-col"
          >
            <div className="relative w-full flex-1 bg-cream/40 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gold-start/5 group-hover:bg-gold-start/10 transition-colors z-0" />
              <Heart className="w-8 h-8 text-lotus z-10 opacity-50" />
            </div>
            <div className="p-5 relative z-20 bg-white/60 backdrop-blur-md border-t border-gold-start/10">
              <div className="text-[8px] uppercase tracking-widest font-bold text-warm-gray mb-1 flex justify-between">
                <span>Matching Bansuri</span>
                <span className="text-gold-start">₹3,500</span>
              </div>
              <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-gold-start transition-colors mb-4 line-clamp-1">
                Emerald Encrusted Flute
              </h3>
              <button className="w-full py-2.5 rounded-xl border-2 border-gold-start/30 bg-white/50 text-[9px] uppercase tracking-widest font-bold text-charcoal group-hover:border-gold-start/60 group-hover:bg-gold-start/5 transition-all">
                Add To Seva
              </button>
            </div>
          </motion.div>
        </Link>

      </div>
    </div>
  );
}
