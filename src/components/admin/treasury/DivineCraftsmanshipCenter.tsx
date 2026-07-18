"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, ChevronRight, Flower2, Heart, Sparkles, Image as ImageIcon } from "lucide-react";
import AiDivineCurator from "./AiDivineCurator";

const CRAFT_STAGES = [
  { id: 1, label: "SELECT COLLECTION", title: "Which Divine Collection does this belong to?" },
  { id: 2, label: "ADD DIVINE DETAILS", title: "Describe the beautiful details of this Offering." },
  { id: 3, label: "ADD PREMIUM IMAGES", title: "Upload Ultra HD Images & 360° Views." },
  { id: 4, label: "ADD FESTIVAL DETAILS", title: "Is this Offering curated for a special Festival?" },
  { id: 5, label: "AI RECOMMENDATIONS", title: "Let the AI Divine Curator recommend complements." },
  { id: 6, label: "COMPLETE OFFERING", title: "The Divine Offering is beautifully prepared." }
];

export default function DivineCraftsmanshipCenter() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);

  const nextStep = () => {
    if (currentStep < 6) {
      setDirection(1);
      setCurrentStep(s => s + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(s => s - 1);
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      filter: "blur(4px)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)"
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 50 : -50,
      opacity: 0,
      filter: "blur(4px)"
    })
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 relative z-10 mb-20">
      
      {/* ── PROGRESS INDICATOR ── */}
      <div className="flex flex-wrap justify-center md:justify-between items-center mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gold-start/20 -translate-y-1/2 hidden md:block z-0" />
        
        {CRAFT_STAGES.map((stage) => {
          const isActive = currentStep === stage.id;
          const isCompleted = currentStep > stage.id;
          
          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center gap-2 w-1/3 md:w-auto mb-6 md:mb-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isActive ? 'bg-rose-100 text-rose-500 border border-rose-200 scale-110 shadow-md' :
                isCompleted ? 'bg-gold-start/10 text-gold-start border border-gold-start/30' :
                'bg-white text-charcoal/30 border border-charcoal/10'
              }`}>
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{stage.id}</span>}
              </div>
              <span className={`text-[8px] uppercase tracking-widest font-bold text-center ${
                isActive ? 'text-[#5C1A1A]' : 'text-charcoal/50'
              }`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── STAGE CONTENT ── */}
      <div className="bg-white/70 backdrop-blur-xl border border-gold-start/40 rounded-[40px] p-8 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.1)] relative overflow-hidden min-h-[400px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="w-full h-full flex flex-col"
          >
            <h4 className="font-display text-2xl md:text-3xl font-bold text-[#5C1A1A] tracking-wider mb-8 text-center uppercase">
              {CRAFT_STAGES[currentStep - 1].title}
            </h4>

            <div className="flex-1 flex flex-col items-center justify-center min-h-[200px]">
              {/* Mocking the interior of the steps for the architecture */}
              {currentStep === 1 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                  {["Krishna Poshaks", "Premium Mukuts", "Radha Rani", "Jewellery"].map((opt) => (
                    <div key={opt} className="border border-gold-start/30 rounded-2xl p-6 text-center cursor-pointer hover:bg-gold-start/5 hover:border-gold-start/50 transition-all">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#5C1A1A]">{opt}</span>
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 2 && (
                <div className="w-full max-w-xl space-y-4">
                  <input type="text" placeholder="Divine Offering Name" className="w-full bg-transparent border-b border-gold-start/30 p-4 outline-none text-charcoal placeholder-charcoal/40 font-bold tracking-wider" />
                  <textarea placeholder="Describe the handcrafted details..." className="w-full bg-transparent border-b border-gold-start/30 p-4 outline-none text-charcoal placeholder-charcoal/40 h-24 resize-none" />
                </div>
              )}

              {currentStep === 3 && (
                <div className="w-full max-w-xl h-40 border-2 border-dashed border-gold-start/40 rounded-3xl flex flex-col items-center justify-center text-charcoal/50 hover:bg-gold-start/5 hover:border-gold-start/60 transition-colors cursor-pointer gap-2">
                  <ImageIcon className="w-8 h-8 text-gold-start/50" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Upload Ultra HD Images</span>
                </div>
              )}

              {currentStep === 4 && (
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {["Janmashtami", "Radhashtami", "Diwali", "Daily Seva"].map((opt) => (
                    <div key={opt} className="border border-rose-200/50 rounded-2xl p-4 text-center cursor-pointer hover:bg-rose-50 transition-all">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#5C1A1A]">{opt}</span>
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 5 && (
                <div className="w-full">
                  <AiDivineCurator />
                </div>
              )}

              {currentStep === 6 && (
                <div className="text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gold-start/10 text-gold-start flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h5 className="font-display text-2xl font-bold text-[#5C1A1A] mb-2">Beautifully Accepted.</h5>
                  <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E]">
                    Now Blessing The Divine Family
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 border-t border-gold-start/20 pt-8">
              {currentStep > 1 ? (
                <button onClick={prevStep} className="text-[10px] uppercase tracking-widest font-bold text-charcoal/50 hover:text-[#5C1A1A] transition-colors">
                  Go Back
                </button>
              ) : <div />}
              
              {currentStep < 6 && (
                <button onClick={nextStep} className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2">
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
