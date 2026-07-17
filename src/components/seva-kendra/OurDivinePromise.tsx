"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OurDivinePromise() {
  return (
    <div id="promise" className="w-full max-w-4xl mx-auto mb-32 px-6 relative z-10 text-center pt-10">
      <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-8">
        Our Divine Promise
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#5C1A1A] rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(92,26,26,0.3)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-radial from-gold-start/20 to-transparent blur-[50px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-radial from-rose-500/20 to-transparent blur-[50px] pointer-events-none" />

        <p className="font-display text-xl md:text-2xl font-bold text-white leading-relaxed max-w-2xl mx-auto mb-12 relative z-10">
          Every Divine Offering created by Shreeji Seva Bhav is lovingly prepared with Bhakti, Prem & Seva.
        </p>

        <div className="flex flex-col items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold text-gold-start/90 mb-12 relative z-10">
          <span>Premium Quality.</span>
          <div className="w-4 h-[1px] bg-gold-start/30" />
          <span>Temple Inspired Packaging.</span>
          <div className="w-4 h-[1px] bg-gold-start/30" />
          <span>Secure Deliveries.</span>
        </div>

        <Link href="/" className="relative z-10 inline-block">
          <button className="bg-white text-[#5C1A1A] rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg hover:bg-gold-start hover:text-white transition-colors flex items-center gap-2">
            Continue Your Journey <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
