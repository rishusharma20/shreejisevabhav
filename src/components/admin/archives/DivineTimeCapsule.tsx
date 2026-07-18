"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowDown } from "lucide-react";

export default function DivineTimeCapsule() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-xl border border-gold-start/40 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.1)] relative overflow-hidden text-center"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-rose-200/30 to-transparent blur-[50px] pointer-events-none" />
        
        <div className="inline-flex items-center gap-3 bg-white border border-gold-start/30 rounded-full px-6 py-2 mb-12 shadow-sm mx-auto">
          <Sparkles className="w-4 h-4 text-gold-start" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#5C1A1A]">
            THE DIVINE TIME CAPSULE
          </span>
        </div>
        
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E] mb-4">TODAY</span>
          <h4 className="font-display text-xl md:text-2xl font-bold text-[#5C1A1A] tracking-wider mb-8 uppercase">
            You have beautifully completed your first Divine Journey.
          </h4>
          
          <div className="w-px h-16 bg-gold-start/30 mb-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 border border-gold-start/20">
               <ArrowDown className="w-3 h-3 text-gold-start" />
            </div>
          </div>
          
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E] mb-4">5 YEARS LATER</span>
          <h4 className="font-display text-xl md:text-2xl font-bold text-[#5C1A1A] tracking-wider mb-8 uppercase">
            You have beautifully celebrated Janmashtami with us for five consecutive years.
          </h4>
          
          <div className="w-12 h-[2px] bg-gold-start/50 mb-8 mx-auto" />
          
          <p className="font-medium italic text-lg text-rose-500">
            "May this beautiful tradition continue forever."
          </p>
        </div>
      </motion.div>
    </div>
  );
}
