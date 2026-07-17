"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CheckoutRecommendations() {
  return (
    <div className="w-full mt-16 pt-16 border-t border-gold-start/15">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
          You May Also Love
        </h2>
        <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
          Most Loved By Devotees
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Mock Recommendation 1 */}
        <Link href="/krishna-vastra">
          <motion.div 
            whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(212,168,83,0.15)" }}
            className="group relative bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all h-[240px] flex flex-col items-center justify-center text-center p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5E6] to-transparent z-0 group-hover:opacity-50 transition-opacity" />
            <Sparkles className="w-8 h-8 text-gold-start mb-4 relative z-10" />
            <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-gold-start transition-colors relative z-10 mb-1">
              Latest Divine Arrivals
            </h3>
            <p className="text-[9px] uppercase tracking-widest font-bold text-warm-gray relative z-10">
              Vastra Mandir
            </p>
          </motion.div>
        </Link>

        {/* Mock Recommendation 2 */}
        <Link href="/divine-wardrobe">
          <motion.div 
            whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(255,183,178,0.15)" }}
            className="group relative bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all h-[240px] flex flex-col items-center justify-center text-center p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F7] to-transparent z-0 group-hover:opacity-50 transition-opacity" />
            <Sparkles className="w-8 h-8 text-lotus mb-4 relative z-10" />
            <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-lotus transition-colors relative z-10 mb-1">
              Festival Collections
            </h3>
            <p className="text-[9px] uppercase tracking-widest font-bold text-warm-gray relative z-10">
              Janmashtami
            </p>
          </motion.div>
        </Link>

        {/* Action Link: Continue Divine Journey */}
        <Link href="/collections" className="md:col-span-2">
          <motion.div 
            whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(212,168,83,0.2)" }}
            className="group relative bg-gradient-to-r from-gold-start via-[#E8850A] to-gold-start bg-[length:200%_auto] rounded-3xl overflow-hidden shadow-lg transition-all h-[240px] flex flex-col items-center justify-center text-center p-8 border border-white/20"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-0" />
            <div className="relative z-10 flex flex-col items-center">
              <h3 className="font-display text-2xl font-bold text-white tracking-widest uppercase mb-3">
                Continue Your <br/> Divine Journey
              </h3>
              <div className="flex items-center gap-2 text-[10px] text-white/90 uppercase tracking-widest font-bold group-hover:translate-x-1 transition-transform">
                Explore All Offerings <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </motion.div>
        </Link>

      </div>
    </div>
  );
}
