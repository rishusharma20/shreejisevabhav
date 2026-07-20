"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function CreatorMessage() {
  return (
    <div className="w-full max-w-3xl mx-auto mb-24 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="bg-white/60 backdrop-blur-xl border border-gold-start/20 rounded-[40px] p-10 md:p-16 shadow-[0_20px_40px_rgba(92,26,26,0.03)] text-center relative overflow-hidden"
      >
        {/* Subtle glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-gold-start/10 to-transparent blur-[40px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial from-rose-500/5 to-transparent blur-[40px] pointer-events-none" />

        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-widest mb-10">
          RADHE RADHE.
        </h3>

        <div className="space-y-8 font-medium text-charcoal/80 text-lg md:text-xl leading-relaxed italic">
          <p>
            Every thread woven at Shreeji Seva Bhav is more than merely fabric.
          </p>
          <p>
            It carries love.<br/>
            It carries devotion.<br/>
            It carries prayers.
          </p>
          <p>
            Every ornament is created with gratitude towards our beloved Thakurji.
          </p>
          <p>
            May Shri Radha Raman Ji forever bless you and your family.
          </p>
        </div>

        <div className="flex justify-center items-center gap-6 my-10 text-[10px] uppercase tracking-[0.3em] font-bold text-gold-start">
          <span>Bhakti</span>
          <Sparkles className="w-3 h-3 text-gold-start/50" />
          <span>Prem</span>
          <Sparkles className="w-3 h-3 text-gold-start/50" />
          <span>Seva</span>
        </div>

        <div className="w-24 h-[1px] bg-gold-start/30 mx-auto mb-6" />

        <p className="font-display text-2xl font-bold text-[#5C1A1A]">
          ~ Akriti Sharma
        </p>

      </motion.div>
    </div>
  );
}
