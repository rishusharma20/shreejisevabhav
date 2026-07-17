"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DigitalDivineMemories() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-32 px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-xl border border-gold-start/30 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.15)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-rose-400/5 to-transparent blur-[50px] pointer-events-none" />
        
        <h4 className="font-display text-2xl font-bold text-[#5C1A1A] tracking-wider mb-6">
          JAI SHRI RADHE.
        </h4>
        
        <div className="w-12 h-[1px] bg-gold-start/50 mx-auto mb-8" />
        
        <div className="font-medium italic text-lg md:text-xl text-charcoal/80 leading-relaxed max-w-xl mx-auto mb-8">
          <p>
            You lovingly celebrated <span className="font-bold text-[#5C1A1A] not-italic">RADHASHTAMI</span> last year with Shreeji Seva Bhav.
          </p>
        </div>

        <p className="font-medium text-lg text-charcoal/70 mb-10">
          Would you like to continue your beautiful tradition?
        </p>

        <Link href="/festivals">
          <button className="bg-[#5C1A1A] text-white rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg hover:bg-[#8B2B2B] transition-colors inline-flex items-center gap-2">
            Explore Collections <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
