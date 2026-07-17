"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function CreatorPortrait() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-20 relative z-10 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative rounded-t-[100px] rounded-b-[40px] overflow-hidden bg-[#FFFBF4] border border-gold-start/20 shadow-[0_30px_60px_rgba(92,26,26,0.08)]"
      >
        {/* Soft Golden Lighting Effects & Temple Inspired Frame */}
        <div className="absolute inset-0 border-[8px] border-white/40 rounded-t-[100px] rounded-b-[40px] pointer-events-none z-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#5C1A1A]/80 via-transparent to-transparent pointer-events-none z-10" />
        
        <div className="relative w-full aspect-[3/4] md:aspect-[16/10]">
          {/* PLACEHOLDER IMAGE - User to replace with actual uploaded image */}
          <Image
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop"
            alt="Akriti Sharma - The Creator"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-30 text-center flex flex-col items-center justify-end">
          <h1 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold-start mb-3">
            The Creator
          </h1>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wider mb-2">
            Akriti Sharma
          </h2>
          <div className="w-12 h-[1px] bg-gold-start/50 my-4" />
          <p className="text-sm md:text-base text-white/90 font-medium tracking-wide">
            A Humble Servant Of Shri Radha Raman Ji.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
