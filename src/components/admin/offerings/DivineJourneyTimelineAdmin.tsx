"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Sparkles } from "lucide-react";
import { useState } from "react";

const TIMELINE_STAGES = [
  "YOUR DIVINE OFFERING HAS BEEN ACCEPTED.",
  "YOUR DIVINE OFFERING IS LOVINGLY BEING PREPARED.",
  "YOUR DIVINE OFFERING HAS BEAUTIFULLY BEGUN ITS JOURNEY FROM VRINDAVAN.",
  "YOUR DIVINE OFFERING IS APPROACHING ITS BELOVED HOME.",
  "YOUR DIVINE OFFERING HAS LOVINGLY ARRIVED."
];

export default function DivineJourneyTimelineAdmin() {
  // In a real app, this would be passed as a prop based on DB state
  const [currentStage, setCurrentStage] = useState(2); // 0-indexed, so 3rd stage is active

  const handleUpdateJourney = (idx: number) => {
    // Admins can click to advance/revert the journey
    setCurrentStage(idx);
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border border-gold-start/30 rounded-3xl p-8 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-gold-start/10 to-transparent blur-[30px] pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="w-5 h-5 text-gold-start" />
        <h4 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase">
          Divine Journey Timeline
        </h4>
      </div>

      <div className="relative pl-4 space-y-8">
        {/* Continuous Line */}
        <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-gold-start/20" />
        
        {/* Active Line Progress */}
        <div 
          className="absolute left-6 top-4 w-[2px] bg-gradient-to-b from-gold-start to-rose-400 transition-all duration-700 ease-in-out" 
          style={{ height: `${(currentStage / (TIMELINE_STAGES.length - 1)) * 100}%` }}
        />

        {TIMELINE_STAGES.map((stage, idx) => {
          const isCompleted = idx < currentStage;
          const isActive = idx === currentStage;
          const isPending = idx > currentStage;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative z-10 flex items-start gap-6 cursor-pointer group"
              onClick={() => handleUpdateJourney(idx)}
            >
              <div className="bg-white rounded-full p-1 relative z-10 group-hover:scale-110 transition-transform">
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
                    Current Stage
                  </motion.p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 p-4 bg-gold-start/5 border border-gold-start/20 rounded-2xl text-center">
        <p className="font-medium italic text-sm text-[#8B6F4E]">
          "May Shri Radha Raman Ji forever bless your beautiful offering."
        </p>
      </div>
    </div>
  );
}
