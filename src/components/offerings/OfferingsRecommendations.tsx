"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

export default function OfferingsRecommendations() {
  return (
    <div className="w-full mt-24 pt-16 border-t border-gold-start/15">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-6 h-6 text-gold-start" />
          Complete Your Divine Offering
          <Sparkles className="w-6 h-6 text-gold-start" />
        </h2>
        <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
          Continue Your Divine Journey With These Sacred Pairings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        
        {/* Mock Recommendation 1 */}
        <Link href="/krishna-vastra" className="block">
          <motion.div 
            whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(30,58,138,0.15)" }}
            className="group relative bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all flex flex-col h-[320px]"
          >
            <div className="h-[200px] bg-[#E0E7FF]/30 w-full relative overflow-hidden flex items-center justify-center border-b border-gold-start/10">
               {/* Placeholder for Product Image */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10" />
               <Sparkles className="w-8 h-8 text-[#1E3A8A]/40" />
               <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[8px] uppercase tracking-widest font-bold text-[#1E3A8A] z-20 shadow-sm border border-white/50">
                 Perfect Match
               </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center text-center">
              <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-[#1E3A8A] transition-colors mb-2">
                Premium Midnight Blue Vastra
              </h3>
              <p className="text-[10px] uppercase tracking-widest font-bold text-warm-gray flex items-center justify-center gap-1 group-hover:text-[#1E3A8A] transition-colors">
                View Offering <ArrowRight className="w-3 h-3" />
              </p>
            </div>
          </motion.div>
        </Link>

        {/* Mock Recommendation 2 */}
        <Link href="/jewellery" className="block">
          <motion.div 
            whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(255,183,178,0.15)" }}
            className="group relative bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all flex flex-col h-[320px]"
          >
            <div className="h-[200px] bg-[#FFF5F7]/50 w-full relative overflow-hidden flex items-center justify-center border-b border-gold-start/10">
               <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10" />
               <Heart className="w-8 h-8 text-lotus/40" />
               <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[8px] uppercase tracking-widest font-bold text-lotus z-20 shadow-sm border border-white/50">
                 Most Loved
               </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center text-center">
              <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-lotus transition-colors mb-2">
                Gold Plated Peacock Mukut
              </h3>
              <p className="text-[10px] uppercase tracking-widest font-bold text-warm-gray flex items-center justify-center gap-1 group-hover:text-lotus transition-colors">
                View Offering <ArrowRight className="w-3 h-3" />
              </p>
            </div>
          </motion.div>
        </Link>
        
        {/* Return to Temple CTA Box */}
        <Link href="/" className="block">
          <motion.div 
            whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(92,26,26,0.2)" }}
            className="group relative bg-gradient-to-br from-[#5C1A1A] to-[#8B3A3A] rounded-3xl overflow-hidden shadow-lg transition-all h-[320px] flex flex-col items-center justify-center text-center p-8 border border-white/20"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-0" />
            
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-start via-transparent to-transparent z-0 blur-[20px]" />

            <div className="relative z-10 flex flex-col items-center">
              <h3 className="font-display text-3xl font-bold text-white tracking-widest uppercase mb-4 leading-tight">
                Return<br/>To<br/>Temple
              </h3>
              <div className="w-12 h-[1px] bg-gold-start mb-4" />
              <div className="flex items-center gap-2 text-[10px] text-white/90 uppercase tracking-widest font-bold group-hover:translate-x-2 transition-transform">
                Go Home <ArrowRight className="w-4 h-4 text-gold-start" />
              </div>
            </div>
          </motion.div>
        </Link>

      </div>
    </div>
  );
}
