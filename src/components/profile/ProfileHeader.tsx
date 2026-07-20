"use client";

import { motion } from "framer-motion";
import { User, PackageOpen, Heart, Crown, Sparkles, Star } from "lucide-react";

export default function ProfileHeader() {
  const userName = "Devotee"; // Dynamic user name
  const status = "Premium Devotee"; // Dynamic status

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full relative rounded-[2rem] overflow-hidden p-[1px] group"
    >
      {/* ── Premium Gradient Border Overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-start/50 via-transparent to-saffron/40 rounded-[2rem] z-0 pointer-events-none transition-opacity duration-700 group-hover:opacity-80 opacity-50" />
      
      {/* ── Glassmorphic Container ── */}
      <div className="relative z-10 w-full bg-white/40 backdrop-blur-[32px] rounded-[31px] p-8 md:p-10 shadow-[0_20px_50px_rgba(212,168,83,0.1),inset_0_1px_0_rgba(255,255,255,0.6)] overflow-hidden">
        
        {/* Decorative inner mandala glows (Vision OS inspired depth) */}
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-gradient-to-br from-gold-start/20 to-saffron/10 rounded-full blur-[50px] pointer-events-none transition-all duration-1000 group-hover:scale-110" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-lotus/15 to-saffron-muted/20 rounded-full blur-[50px] pointer-events-none transition-all duration-1000 group-hover:scale-110" />

        <div className="relative z-10 flex flex-col xl:flex-row items-center gap-8 xl:gap-12">
          
          {/* Avatar Section */}
          <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
            {/* Halo ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-gold-start/50 p-2 opacity-80"
            />
            {/* Inner Gold ring */}
            <div className="absolute inset-2 rounded-full border border-gold-start/60 p-1 shadow-[0_0_20px_rgba(212,168,83,0.2)]">
              <div className="w-full h-full bg-cream rounded-full overflow-hidden flex items-center justify-center">
                <User className="w-10 h-10 text-gold-start/80" strokeWidth={1.5} />
              </div>
            </div>
            {/* Premium VIP Badge */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="absolute -bottom-2 -right-2 bg-gradient-to-br from-[#D4A853] via-[#E8850A] to-[#A38120] text-white p-2.5 rounded-full shadow-[0_4px_15px_rgba(212,168,83,0.5)] border-2 border-white cursor-pointer"
            >
              <Crown className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Welcome Text, Blessings & Philosophy */}
          <div className="flex-1 text-center xl:text-left space-y-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-saffron-deep"
            >
              {status}
            </motion.div>
            <h1 className="font-display text-3xl md:text-4xl text-[#5C1A1A] font-extrabold tracking-wide drop-shadow-sm">
              Radhe Radhe, {userName}
            </h1>
            <p className="text-xs md:text-sm text-[#8B6F4E] font-medium tracking-wide">
              May Shri Radha Raman Ji’s grace forever illuminate your path.
            </p>
            <div className="pt-2 flex items-center justify-center xl:justify-start gap-3">
              <span className="text-[9px] uppercase tracking-widest text-warm-gray font-bold">Bhakti</span>
              <div className="w-1 h-1 rounded-full bg-gold-start/40" />
              <span className="text-[9px] uppercase tracking-widest text-warm-gray font-bold">Prem</span>
              <div className="w-1 h-1 rounded-full bg-gold-start/40" />
              <span className="text-[9px] uppercase tracking-widest text-warm-gray font-bold">Seva</span>
            </div>
          </div>
          

          
        </div>
      </div>
    </motion.div>
  );
}
