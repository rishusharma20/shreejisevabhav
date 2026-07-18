"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Star, Cloud } from "lucide-react";

const PHASES = [
  { title: "PHASE 1-10", subtitle: "THE DIVINE EXPERIENCES", icon: Cloud },
  { title: "PHASE 11-20", subtitle: "THE BEAUTIFUL MEMORIES", icon: Heart },
  { title: "PHASE 21-35", subtitle: "THE ETERNAL LEGACY", icon: Star }
];

export default function LivingVrindavanSystem() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="text-center mb-12">
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2 uppercase">
          One Living Experience
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Unifying Every Divine Journey
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
        {PHASES.map((phase, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full md:w-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white/70 backdrop-blur-md border border-gold-start/30 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center w-full md:w-64 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-gold-start/10 to-transparent blur-[20px]" />
              <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center text-gold-start mb-6 group-hover:scale-110 transition-transform">
                <phase.icon className="w-5 h-5" />
              </div>
              <h4 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider mb-1 uppercase">
                {phase.title}
              </h4>
              <p className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E]">
                {phase.subtitle}
              </p>
            </motion.div>

            {/* Connector */}
            {idx < PHASES.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx * 0.2) + 0.3 }}
                className="hidden md:flex text-gold-start/40"
              >
                <div className="w-8 h-[2px] bg-gold-start/30" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-12 text-center"
      >
        <div className="inline-block p-1 border border-gold-start/20 rounded-full bg-white/40">
           <div className="bg-gradient-to-r from-gold-start/10 to-rose-100/30 rounded-full px-8 py-3 flex items-center gap-3">
             <Sparkles className="w-4 h-4 text-gold-start" />
             <span className="font-display text-lg font-bold text-[#5C1A1A] uppercase tracking-widest">
               PHASE 36: THE LIVING DIGITAL VRINDAVAN
             </span>
             <Sparkles className="w-4 h-4 text-gold-start" />
           </div>
        </div>
      </motion.div>
    </div>
  );
}
