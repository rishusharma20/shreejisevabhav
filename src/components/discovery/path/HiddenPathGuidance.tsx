"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function HiddenPathGuidance() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-24 px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white/60 backdrop-blur-xl border border-gold-start/40 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.15)] relative overflow-hidden max-w-3xl mx-auto"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-gold-start/10 to-transparent blur-[50px] pointer-events-none" />
        
        <h4 className="font-display text-xl md:text-2xl font-bold text-[#8B6F4E] tracking-widest mb-6 uppercase">
          No Divine Journey Is Ever Lost.
        </h4>
        
        <div className="w-12 h-[1px] bg-gold-start/50 mx-auto mb-8" />
        
        <div className="font-medium italic text-xl md:text-2xl text-[#5C1A1A] leading-relaxed max-w-xl mx-auto mb-10 relative z-10">
          <p>
            "Perhaps the Divine Path you were seeking has gracefully led you towards another beautiful experience awaiting you."
          </p>
        </div>
        
        <div className="absolute -bottom-4 -left-4 text-gold-start/10 rotate-45 pointer-events-none">
          <Leaf className="w-32 h-32" />
        </div>
      </motion.div>
    </div>
  );
}
