"use client";

import { motion } from "framer-motion";
import { Gem, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TreasuryHero() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-16 px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex-1"
      >
        <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md border border-gold-start/30 rounded-full px-6 py-2 mb-8 shadow-sm">
          <Gem className="w-4 h-4 text-gold-start" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
            THE DIVINE TREASURY
          </span>
        </div>
        
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[#5C1A1A] tracking-wider mb-6 drop-shadow-sm uppercase">
          Welcome To The Divine Treasury of Vrindavan
        </h1>
        
        <p className="font-medium italic text-lg text-charcoal/80 max-w-xl mx-auto md:mx-0 leading-relaxed mb-8">
          "Where every Divine Offering is lovingly prepared with Bhakti, Prem, and Seva."
        </p>

        <Link href="/admin/treasury/prepare">
          <button className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-3">
            Offer A New Divine Collection <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex-1 w-full relative h-[300px] md:h-[400px] rounded-[40px] overflow-hidden border border-gold-start/30 shadow-[0_20px_50px_rgba(212,168,83,0.15)]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent z-10" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          {/* We will use a beautiful background representing the treasury / fabrics */}
          <source src="https://player.vimeo.com/external/498774785.hd.mp4?s=d00ff51d8b2d1d0c5a01bc1cfab56cd56543ed9f&profile_id=174" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gold-start/10 mix-blend-overlay z-20" />
      </motion.div>
    </div>
  );
}
