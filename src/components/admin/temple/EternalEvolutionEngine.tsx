"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const EVOLUTIONS = [
  { title: "CREATED", detail: "New Beautiful Traditions" },
  { title: "IMPROVED", detail: "The Divine Experiences" },
  { title: "CELEBRATED", detail: "Thousands of Divine Journeys" },
  { title: "PRESERVED", detail: "Every Beautiful Memory" },
  { title: "CONTINUED", detail: "The Eternal Legacy" }
];

export default function EternalEvolutionEngine() {
  return (
    <div id="evolution" className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-[#FFFBF4] to-rose-50/50 backdrop-blur-xl border border-gold-start/40 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-rose-200/40 to-transparent blur-[50px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial from-gold-start/20 to-transparent blur-[50px] pointer-events-none" />
        
        <div className="relative z-10 text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white border border-gold-start/30 rounded-full px-6 py-2 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-gold-start" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#5C1A1A]">
              THE ETERNAL EVOLUTION ENGINE
            </span>
          </div>
          
          <h4 className="font-display text-2xl md:text-3xl font-bold text-[#5C1A1A] tracking-wider mb-4 leading-tight uppercase">
            Digital Vrindavan Never Grows Old
          </h4>
          <p className="font-medium italic text-charcoal/80 max-w-xl mx-auto">
            "The platform will never become Version 1 or Version 2. It will beautifully evolve alongside every Divine Journey."
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
          {EVOLUTIONS.map((evo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/80 border border-gold-start/20 rounded-2xl p-4 text-center hover:border-gold-start/60 transition-colors group"
            >
              <h5 className="font-display text-sm font-bold text-rose-600 tracking-wider mb-2 uppercase group-hover:text-gold-start transition-colors">
                {evo.title}
              </h5>
              <p className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed">
                {evo.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
