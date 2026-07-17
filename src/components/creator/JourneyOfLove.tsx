"use client";

import { motion } from "framer-motion";

const JOURNEY_STEPS = [
  "From Vrindavan",
  "Handcrafted With Love",
  "Premium Divine Craftsmanship",
  "Temple Inspired Packaging",
  "Premium Collections",
  "Your Divine Offering",
  "Received With Divine Blessings"
];

export default function JourneyOfLove() {
  return (
    <div className="w-full max-w-3xl mx-auto mb-24 px-6 relative z-10 text-center">
      <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-16">
        The Journey Of Love
      </h3>

      <div className="flex flex-col items-center relative">
        {/* Continuous Line Background */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-gold-start/20 z-0 left-1/2 -translate-x-1/2" />
        
        {JOURNEY_STEPS.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative z-10 w-full flex flex-col items-center mb-10 last:mb-0 group"
          >
            <div className="w-4 h-4 rounded-full bg-[#FFFBF4] border border-gold-start/50 flex items-center justify-center shadow-[0_0_10px_rgba(212,168,83,0.3)] mb-4 group-hover:scale-125 group-hover:bg-gold-start transition-all duration-500">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-start group-hover:bg-white transition-colors" />
            </div>
            <h4 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-charcoal/80 group-hover:text-gold-start transition-colors">
              {step}
            </h4>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
