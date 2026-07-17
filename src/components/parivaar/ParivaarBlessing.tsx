"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ParivaarBlessing() {
  return (
    <div className="w-full max-w-2xl mx-auto mb-32 px-6 relative z-10 text-center">
      <h3 className="font-display text-2xl font-bold text-[#8B6F4E] tracking-wider mb-8">
        Today&apos;s Divine Blessing
      </h3>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="bg-white/50 backdrop-blur-xl border border-gold-start/20 rounded-[40px] p-10 md:p-14 shadow-[0_20px_50px_rgba(212,168,83,0.15)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-40 h-40 bg-radial from-rose-400/10 to-transparent blur-[30px]" />
        
        <h4 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-6">
          Wonderful News.
        </h4>
        
        <div className="w-16 h-[1px] bg-gold-start/40 mx-auto mb-6" />
        
        <div className="space-y-4 font-medium text-charcoal/80 text-lg md:text-xl italic leading-relaxed mb-8">
          <p>
            You have lovingly completed
          </p>
          <p className="font-bold text-[#8B6F4E] text-2xl not-italic py-2">
            20 Divine Offerings.
          </p>
          <p>
            May Shri Radha Raman Ji&apos;s divine grace forever remain upon you.
          </p>
        </div>

        <Link href="/">
          <button className="text-[10px] uppercase tracking-widest font-bold text-[#5C1A1A] hover:text-gold-start transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-[#5C1A1A]/30 after:hover:bg-gold-start after:transition-colors">
            Continue Your Journey
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
