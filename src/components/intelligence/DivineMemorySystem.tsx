"use client";

import { motion } from "framer-motion";
import { Ruler, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const REMEMBERED_TRAITS = [
  { label: "SIZE-4", icon: Ruler },
  { label: "PREMIUM FABRICS", icon: Sparkles },
  { label: "FESTIVAL COLLECTIONS", icon: Sparkles }
];

export default function DivineMemorySystem() {
  return (
    <div className="w-full max-w-5xl mx-auto mb-32 px-6 relative z-10">
      <div className="text-center mb-16">
        <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Divine Memory System
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          We Lovingly Remember Your Preferences
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="bg-white/60 backdrop-blur-xl border border-gold-start/30 rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(212,168,83,0.1)] relative text-center"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12">
          {REMEMBERED_TRAITS.map((trait, idx) => {
            const Icon = trait.icon;
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#FFFBF4] border border-gold-start/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold-start" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#5C1A1A]">
                    {trait.label}
                  </span>
                </div>
                {idx < REMEMBERED_TRAITS.length - 1 && (
                  <div className="hidden md:block w-8 h-[1px] bg-gold-start/30 mt-[-20px]" />
                )}
              </div>
            );
          })}
        </div>

        <div className="font-medium italic text-xl md:text-2xl text-charcoal/80 leading-relaxed mb-10">
          YOUR <span className="text-[#5C1A1A] font-bold not-italic">SIZE-4</span> BELOVED COLLECTIONS<br />ARE WAITING FOR YOU.
        </div>

        <Link href="#">
          <button className="bg-gradient-to-r from-gold-start to-[#d4af37] text-white rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-[0_10px_30px_rgba(212,168,83,0.3)] hover:shadow-[0_15px_40px_rgba(212,168,83,0.4)] transition-all flex items-center gap-3 mx-auto">
            Continue Your Journey <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
