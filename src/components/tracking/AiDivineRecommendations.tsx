"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

export default function AiDivineRecommendations() {
  return (
    <div className="w-full mt-24 pt-16 border-t border-gold-start/15">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-6 h-6 text-gold-start" />
          You May Also Love
          <Sparkles className="w-6 h-6 text-gold-start" />
        </h2>
        <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
          Explore Divine Pairings Handpicked For Your Seva
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        
        {/* Recommendation Grid Items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
          
          <div className="bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-2xl p-4 text-center group cursor-pointer hover:border-gold-start transition-colors">
            <h3 className="font-display text-sm font-bold text-charcoal group-hover:text-gold-start transition-colors">
              Premium Mukut
            </h3>
          </div>
          
          <div className="bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-2xl p-4 text-center group cursor-pointer hover:border-gold-start transition-colors">
            <h3 className="font-display text-sm font-bold text-charcoal group-hover:text-gold-start transition-colors">
              Premium Morpankh
            </h3>
          </div>
          
          <div className="bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-2xl p-4 text-center group cursor-pointer hover:border-gold-start transition-colors">
            <h3 className="font-display text-sm font-bold text-charcoal group-hover:text-gold-start transition-colors">
              Premium Bansuri
            </h3>
          </div>
          
          <div className="bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-2xl p-4 text-center group cursor-pointer hover:border-gold-start transition-colors">
            <h3 className="font-display text-sm font-bold text-charcoal group-hover:text-gold-start transition-colors">
              Premium Necklace
            </h3>
          </div>

        </div>

        {/* Explore Collection Link */}
        <Link href="/jewellery" className="shrink-0 mt-4 md:mt-0 w-full md:w-auto">
          <motion.div 
            whileHover={{ y: -2 }}
            className="group bg-charcoal rounded-2xl px-8 py-5 h-full flex items-center justify-center gap-3 text-white text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:bg-[#5C1A1A] transition-colors"
          >
            Explore Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </Link>
        
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-12 text-[10px] uppercase tracking-widest font-bold text-warm-gray">
        <Link href="/divine-wardrobe" className="hover:text-gold-start transition-colors">Latest Divine Arrivals</Link>
        <span>•</span>
        <Link href="/krishna-vastra" className="hover:text-gold-start transition-colors">Most Loved By Devotees</Link>
        <span>•</span>
        <Link href="/collections" className="hover:text-gold-start transition-colors">Festival Collections</Link>
        <span>•</span>
        <Link href="/my-seva" className="hover:text-gold-start transition-colors">My Seva</Link>
      </div>

    </div>
  );
}
