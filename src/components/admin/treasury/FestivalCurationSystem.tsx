"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FestivalCurationSystem() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-xl border border-gold-start/40 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.1)] relative overflow-hidden flex flex-col md:flex-row gap-12 items-center"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-rose-200/30 to-transparent blur-[50px] pointer-events-none" />
        
        <div className="flex-1 relative z-10">
          <div className="inline-flex items-center gap-3 bg-white border border-gold-start/30 rounded-full px-6 py-2 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-gold-start" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#5C1A1A]">
              WONDERFUL NEWS
            </span>
          </div>
          
          <div className="font-display text-2xl md:text-3xl font-bold text-[#5C1A1A] tracking-wider mb-6 leading-relaxed">
            JANMASHTAMI SPECIAL COLLECTIONS SHOULD NOW BE FEATURED ON THE HOME PAGE.
          </div>
          
          <div className="w-12 h-[1px] bg-gold-start/50 mb-8" />
          
          <div className="font-medium italic text-lg text-charcoal/80 leading-relaxed mb-10">
            <p className="mb-4">
              EXPECTED DEMAND: <span className="font-bold text-[#5C1A1A] not-italic">+250%</span>
            </p>
            <p>
              AI has analyzed user behaviour, purchase history, and seasonal trends to curate this beautiful recommendation.
            </p>
          </div>
          
          <Link href="/admin/featured">
            <button className="bg-transparent border border-gold-start/50 text-[#5C1A1A] rounded-full px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold-start/10 transition-colors inline-flex items-center gap-2">
              Curate Homepage <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="flex-1 w-full bg-gradient-to-br from-[#FFFBF4] to-white border border-gold-start/30 rounded-3xl p-8 relative z-10 text-center">
          <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8B6F4E] mb-8 border-b border-gold-start/20 pb-4">
            AI Festival Curation
          </h5>
          
          <div className="space-y-6">
            <div className="p-4 bg-white rounded-2xl border border-gold-start/20 shadow-sm">
              <span className="block text-xs font-bold text-charcoal/70 uppercase tracking-widest mb-1">JANMASHTAMI</span>
              <span className="text-sm font-bold text-[#5C1A1A]">In 7 Days</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gold-start/20 shadow-sm opacity-60">
              <span className="block text-xs font-bold text-charcoal/70 uppercase tracking-widest mb-1">RADHASHTAMI</span>
              <span className="text-sm font-bold text-[#5C1A1A]">In 22 Days</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gold-start/20 shadow-sm opacity-40">
              <span className="block text-xs font-bold text-charcoal/70 uppercase tracking-widest mb-1">DIWALI</span>
              <span className="text-sm font-bold text-[#5C1A1A]">In 80 Days</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
