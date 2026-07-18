"use client";

import { motion } from "framer-motion";
import { PackageOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LiveDivineJourney() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-24 px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-xl border border-gold-start/30 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.05)] relative overflow-hidden"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-start/20 to-gold-start/5 flex items-center justify-center mx-auto mb-8 border border-gold-start/30 shadow-sm relative z-10">
          <PackageOpen className="w-8 h-8 text-gold-start" />
        </div>

        <h4 className="font-display text-xl md:text-2xl font-bold text-[#8B6F4E] tracking-widest mb-6">
          WONDERFUL NEWS.
        </h4>
        
        <div className="w-12 h-[1px] bg-gold-start/50 mx-auto mb-8 relative z-10" />
        
        <div className="font-medium italic text-lg md:text-xl text-charcoal/80 leading-relaxed max-w-xl mx-auto mb-10 relative z-10">
          <p>
            Your Divine Offering has begun its Divine Journey.
          </p>
          <p className="mt-4 text-sm not-italic font-bold text-[#5C1A1A]">
            Estimated arrival: Tomorrow.
          </p>
        </div>

        <div className="relative z-10">
          <Link href="/track-seva/active">
            <button className="bg-transparent border border-[#5C1A1A] text-[#5C1A1A] rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-sm hover:bg-[#5C1A1A] hover:text-white transition-all inline-flex items-center gap-2">
              Track My Seva <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
