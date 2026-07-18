"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export default function DigitalDivineMemoriesMobile() {
  return (
    <div className="w-full max-w-5xl mx-auto mb-24 px-6 relative z-10 text-center">
      <div className="mb-12">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Digital Divine Memories
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Celebrating Your Devotion
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-xl border border-gold-start/40 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.15)] relative overflow-hidden max-w-4xl mx-auto"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-radial from-gold-start/10 to-transparent blur-[50px] pointer-events-none" />
        
        <h4 className="font-display text-xl md:text-2xl font-bold text-[#8B6F4E] tracking-widest mb-6 uppercase">
          Wonderful News.
        </h4>
        
        <div className="w-12 h-[1px] bg-gold-start/50 mx-auto mb-8" />
        
        <div className="font-medium italic text-lg md:text-xl text-charcoal/80 leading-relaxed max-w-xl mx-auto mb-10">
          <p>
            Thank You For Continuing Your Beautiful Divine Journey With Us For <span className="font-bold text-[#5C1A1A] not-italic">100 DAYS</span>.
          </p>
          <p className="mt-4">
            May Shri Radha Raman Ji always remain upon your family.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white border border-gold-start/30 rounded-full py-4 px-8 inline-flex items-center gap-3 mb-10 shadow-sm"
        >
          <Star className="w-4 h-4 text-gold-start fill-gold-start/20" />
          <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#5C1A1A]">
            100 DAYS OF BHAKTI
          </span>
        </motion.div>
        
        <br />

        <Link href="/">
          <button className="bg-gradient-to-r from-gold-start to-[#d4af37] text-white rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
            Continue Your Journey <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
