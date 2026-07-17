"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const TIMELINE_STEPS = [
  { id: 1, label: "Accepted With Love" },
  { id: 2, label: "Lovingly Prepared" },
  { id: 3, label: "Blessed With Premium Packaging" },
  { id: 4, label: "Travelling Towards Your Home" },
  { id: 5, label: "Received With Divine Blessings" }
];

export default function DivineJourneyTimeline() {
  const currentStep = 4; // Mock active step for demo purposes

  return (
    <div className="w-full bg-white/60 backdrop-blur-xl border border-gold-start/20 rounded-3xl p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_40px_rgba(212,168,83,0.05)] relative overflow-hidden">
      
      <div className="text-center mb-10 relative z-10">
        <h3 className="text-[10px] uppercase tracking-widest font-bold text-warm-gray mb-2">
          Your Divine Journey
        </h3>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wide flex items-center justify-center gap-3">
          <Sparkles className="w-5 h-5 text-gold-start" />
          The Divine Journey Of Your Offering
          <Sparkles className="w-5 h-5 text-gold-start" />
        </h2>
      </div>

      <div className="relative z-10 max-w-sm mx-auto">
        {TIMELINE_STEPS.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isPending = step.id > currentStep;
          const isLast = index === TIMELINE_STEPS.length - 1;

          return (
            <div key={step.id} className="relative flex gap-6 pb-10">
              
              {/* Vertical Line */}
              {!isLast && (
                <div className="absolute left-[15px] top-8 bottom-0 w-[2px]">
                  <div className="absolute inset-0 bg-gold-start/15" />
                  {isCompleted && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
                      className="absolute top-0 w-full bg-gradient-to-b from-gold-start to-lotus" 
                    />
                  )}
                </div>
              )}

              {/* Node Icon */}
              <div className="relative shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm z-10 border-2 transition-colors duration-500"
                   style={{ 
                     borderColor: isCompleted || isActive ? 'var(--gold-start, #D4A853)' : 'rgba(212,168,83,0.2)',
                     color: isCompleted || isActive ? 'var(--gold-start, #D4A853)' : 'rgba(212,168,83,0.2)'
                   }}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isActive ? (
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <MapPin className="w-4 h-4 text-lotus fill-lotus/20" />
                  </motion.div>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gold-start/20" />
                )}
                
                {/* Active Glow Pulse */}
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-lotus/50 pointer-events-none"
                    animate={{ scale: [1, 2], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                  />
                )}
              </div>

              {/* Text Label */}
              <div className={`pt-1.5 transition-colors duration-500 ${
                isActive ? 'text-[#5C1A1A] scale-105 origin-left' : isCompleted ? 'text-charcoal' : 'text-warm-gray/50'
              }`}>
                <h4 className="text-[12px] uppercase tracking-widest font-bold">
                  {step.label}
                </h4>
                {isActive && (
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-lotus mt-1 font-medium italic"
                  >
                    On Its Divine Journey...
                  </motion.p>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Ambient background glow behind the timeline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-full bg-radial from-gold-start/10 to-transparent blur-[50px] pointer-events-none" />

    </div>
  );
}
