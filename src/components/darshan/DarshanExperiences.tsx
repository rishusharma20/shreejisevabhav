"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DarshanExperiences() {
  return (
    <div className="w-full max-w-5xl mx-auto mb-32 px-6 relative z-10 text-center">
      <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-8">
        Divine Experiences
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-[#FFFBF4] to-[#FFF5E6] border border-gold-start/20 rounded-[40px] p-12 md:p-20 shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-radial from-gold-start/10 to-transparent blur-[50px] pointer-events-none" />
        
        <p className="font-display text-2xl md:text-3xl font-bold text-charcoal/90 leading-relaxed mb-12 relative z-10 max-w-3xl mx-auto">
          &quot;Thousands of devotees have lovingly celebrated their Divine Journey with Shreeji Seva Bhav.&quot;
        </p>
        
        <div className="w-16 h-[1px] bg-gold-start/40 mx-auto mb-12 relative z-10" />

        <Link href="/">
          <button className="bg-[#5C1A1A] text-white rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:bg-[#8B2B2B] transition-colors inline-flex items-center gap-3 relative z-10">
            Continue Your Journey <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
