"use client";

import { motion } from "framer-motion";
import { Link as LinkIcon, Heart, Sparkles, Crown } from "lucide-react";
import Link from "next/link";

interface CompleteOfferingProps {
  offeringType: "poshak" | "jewellery";
}

export default function CompleteOffering({ offeringType }: CompleteOfferingProps) {
  // If viewing a poshak, recommend jewellery. If viewing jewellery, recommend poshak.
  const isPoshak = offeringType === "poshak";

  return (
    <div className="w-full mt-16 mb-24 relative pt-16 border-t border-gold-start/15">
      <div className="text-center mb-12 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center mb-4">
          <LinkIcon className="w-5 h-5 text-gold-start" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
          Complete Your Divine Offering
        </h2>
        <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E]">
          {isPoshak 
            ? "Adorn this beautiful Poshak with matching Ratna Alankaar" 
            : "Find the perfect Vastra to complement this sacred ornament"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Mock Recommendation 1 */}
        <Link href={isPoshak ? "/jewellery" : "/divine-wardrobe"}>
          <motion.div 
            whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(212,168,83,0.15)" }}
            className="group relative bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all h-[320px] flex flex-col"
          >
            <div className="relative w-full flex-1 bg-cream/40 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gold-start/5 group-hover:bg-gold-start/10 transition-colors z-0" />
              {isPoshak ? <Sparkles className="w-8 h-8 text-lotus z-10 opacity-50" /> : <Heart className="w-8 h-8 text-lotus z-10 opacity-50" />}
            </div>
            <div className="p-5 relative z-20 bg-white/60 backdrop-blur-md border-t border-gold-start/10">
              <div className="text-[8px] uppercase tracking-widest font-bold text-warm-gray mb-1">
                {isPoshak ? "Matching Mukut" : "Matching Radha Vastra"}
              </div>
              <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-gold-start transition-colors">
                {isPoshak ? "Golden Zardozi Mukut" : "Lotus Pink Zardozi Lehenga"}
              </h3>
            </div>
          </motion.div>
        </Link>

        {/* Mock Recommendation 2 */}
        <Link href={isPoshak ? "/jewellery" : "/krishna-vastra"}>
          <motion.div 
            whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(30,58,138,0.15)" }}
            className="group relative bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all h-[320px] flex flex-col"
          >
            <div className="relative w-full flex-1 bg-cream/40 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[#1E3A8A]/5 group-hover:bg-[#1E3A8A]/10 transition-colors z-0" />
              {isPoshak ? <Crown className="w-8 h-8 text-[#1E3A8A] z-10 opacity-50" /> : <Crown className="w-8 h-8 text-[#1E3A8A] z-10 opacity-50" />}
            </div>
            <div className="p-5 relative z-20 bg-white/60 backdrop-blur-md border-t border-gold-start/10">
              <div className="text-[8px] uppercase tracking-widest font-bold text-warm-gray mb-1">
                {isPoshak ? "Matching Bansuri" : "Matching Thakurji Vastra"}
              </div>
              <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-[#1E3A8A] transition-colors">
                {isPoshak ? "Emerald Encrusted Flute" : "Peacock Blue Silk Set"}
              </h3>
            </div>
          </motion.div>
        </Link>
        
        {/* Explore All Link - Takes up 2 columns on lg */}
        <Link href={isPoshak ? "/jewellery" : "/collections"} className="lg:col-span-2 sm:col-span-2">
          <motion.div 
            whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(212,168,83,0.2)" }}
            className="group relative bg-gradient-to-br from-[#D4A853] via-[#E8850A] to-[#D4A853] bg-[length:200%_auto] rounded-3xl overflow-hidden shadow-lg transition-all h-[320px] flex flex-col items-center justify-center text-center p-8 border border-white/20"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-0" />
            <div className="relative z-10">
              <Sparkles className="w-10 h-10 text-white mb-4 mx-auto" />
              <h3 className="font-display text-2xl font-bold text-white tracking-widest uppercase mb-2">
                {isPoshak ? "Explore Ratna Alankaar" : "Explore All Collections"}
              </h3>
              <p className="text-[11px] text-white/90 uppercase tracking-widest font-bold">
                Continue Your Divine Journey
              </p>
            </div>
          </motion.div>
        </Link>

      </div>
    </div>
  );
}
