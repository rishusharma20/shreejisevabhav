"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AiDivineInsightsAdmin() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="mb-10 text-center md:text-left">
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
          AI Divine Insights
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Intelligent Devotional Analytics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-[30px] p-8 md:p-10 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-gold-start/10 to-transparent blur-[20px]" />
          
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-gold-start" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
              WONDERFUL NEWS
            </span>
          </div>
          
          <div className="font-medium italic text-lg text-charcoal/80 leading-relaxed mb-8">
            <p>
              RADHASHTAMI collections have received 250% higher engagement than last year.
            </p>
            <p className="mt-4 text-[#5C1A1A]">
              May we lovingly prepare additional Festival Collections?
            </p>
          </div>
          
          <Link href="/admin/collections">
            <button className="bg-transparent border border-gold-start/50 text-[#5C1A1A] rounded-full px-6 py-2 text-[9px] uppercase tracking-widest font-bold hover:bg-gold-start/10 transition-colors inline-flex items-center gap-2">
              Prepare Collections <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-[30px] p-8 md:p-10 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-gold-start/10 to-transparent blur-[20px]" />
          
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-gold-start" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
              UPCOMING DEMAND
            </span>
          </div>
          
          <div className="font-medium italic text-lg text-charcoal/80 leading-relaxed mb-8">
            <p>
              JANMASHTAMI is expected to become the most celebrated festival this month.
            </p>
            <p className="mt-4 text-[#5C1A1A]">
              Ensure Size 4 and Size 5 Poshaaks are abundantly available.
            </p>
          </div>
          
          <Link href="/admin/inventory">
            <button className="bg-transparent border border-gold-start/50 text-[#5C1A1A] rounded-full px-6 py-2 text-[9px] uppercase tracking-widest font-bold hover:bg-gold-start/10 transition-colors inline-flex items-center gap-2">
              Review Inventory <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
