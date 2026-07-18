"use client";

import { motion } from "framer-motion";
import { Scissors, Palette, CheckCircle, Package } from "lucide-react";
import { useState } from "react";

const CUSTOM_STAGES = [
  { label: "DESIGN APPROVED", icon: Palette },
  { label: "FABRIC APPROVED", icon: Scissors },
  { label: "PREPARING WITH LOVE", icon: Package },
  { label: "DIVINE JOURNEY BEGINS", icon: CheckCircle }
];

export default function CustomDivineOfferingCard() {
  const [currentStage, setCurrentStage] = useState(2); // 0-indexed

  return (
    <div className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-md border border-gold-start/50 rounded-3xl p-8 shadow-[0_10px_30px_rgba(212,168,83,0.1)] relative overflow-hidden mt-8">
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-gold-start/20 to-transparent blur-[30px] pointer-events-none" />
      
      <div className="flex justify-between items-end mb-8 border-b border-gold-start/20 pb-4">
        <div>
          <h4 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase mb-1">
            Custom Divine Offering
          </h4>
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
            Special Janmashtami Collection
          </p>
        </div>
        <span className="bg-gold-start/10 text-gold-start text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border border-gold-start/30">
          In Progress
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CUSTOM_STAGES.map((stage, idx) => {
          const isCompleted = idx < currentStage;
          const isActive = idx === currentStage;
          
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              onClick={() => setCurrentStage(idx)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                isActive 
                  ? 'bg-white border-gold-start/50 shadow-md' 
                  : isCompleted 
                    ? 'bg-gold-start/5 border-gold-start/20' 
                    : 'bg-transparent border-charcoal/10 opacity-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                isActive || isCompleted ? 'bg-gold-start/10 text-gold-start' : 'bg-charcoal/5 text-charcoal/40'
              }`}>
                <stage.icon className="w-4 h-4" />
              </div>
              <span className={`text-[9px] uppercase tracking-widest font-bold ${
                isActive || isCompleted ? 'text-[#5C1A1A]' : 'text-charcoal/40'
              }`}>
                {stage.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
