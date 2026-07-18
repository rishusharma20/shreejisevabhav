"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Sparkles } from "lucide-react";
import { useState } from "react";

const TIMELINE_STAGES = [
  "15 DAYS LEFT",
  "PREPARATIONS BEGIN",
  "FESTIVAL COLLECTIONS ARE LIVE",
  "DIVINE WHISPERS HAVE BEEN SENT",
  "DIVINE OFFERINGS BEGIN THEIR JOURNEY",
  "THE BEAUTIFUL CELEBRATION BEGINS."
];

export default function DivineCelebrationTimeline() {
  const [currentStage, setCurrentStage] = useState(2); // 0-indexed

  return (
    <div className="bg-white/70 backdrop-blur-md border border-gold-start/30 rounded-3xl p-8 shadow-[0_10px_30px_rgba(212,168,83,0.05)] relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-200/20 to-transparent blur-[30px] pointer-events-none" />
      
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-gold-start" />
          <h4 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase">
            Janmashtami Timeline
          </h4>
        </div>
        <span className="bg-emerald-100 text-emerald-700 text-[8px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
          Auto-Managed
        </span>
      </div>

      <div className="relative pl-4 space-y-8">
        <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-gold-start/20" />
        <div 
          className="absolute left-6 top-4 w-[2px] bg-gradient-to-b from-gold-start to-rose-400 transition-all duration-700 ease-in-out" 
          style={{ height: `${(currentStage / (TIMELINE_STAGES.length - 1)) * 100}%` }}
        />

        {TIMELINE_STAGES.map((stage, idx) => {
          const isCompleted = idx < currentStage;
          const isActive = idx === currentStage;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative z-10 flex items-start gap-6 group"
            >
              <div className="bg-white rounded-full p-1 relative z-10 mt-1">
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-gold-start" />
                ) : isActive ? (
                  <Clock className="w-6 h-6 text-rose-500 animate-pulse" />
                ) : (
                  <Circle className="w-6 h-6 text-gold-start/30" />
                )}
              </div>
              
              <div className="flex-1 pt-1">
                <p className={`text-xs md:text-sm uppercase tracking-widest font-bold leading-relaxed transition-colors ${
                  isCompleted || isActive ? 'text-[#5C1A1A]' : 'text-charcoal/40'
                }`}>
                  {stage}
                </p>
                {isActive && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-[9px] uppercase tracking-[0.2em] font-bold text-rose-400 mt-2"
                  >
                    Current Automated Stage
                  </motion.p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
