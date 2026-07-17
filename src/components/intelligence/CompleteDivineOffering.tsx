"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const OFFERING_STEPS = [
  "KRISHNA POSHAK",
  "MUKUT",
  "MORPANKH",
  "NECKLACE",
  "FLOWER COLLECTIONS",
  "PREMIUM PACKAGING"
];

export default function CompleteDivineOffering() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-32 px-6 relative z-10 text-center">
      <div className="mb-16">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Complete Your Divine Offering
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Lovingly Prepare Your Seva
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        {OFFERING_STEPS.map((step, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/60 backdrop-blur-md border border-gold-start/30 rounded-full px-6 py-3 shadow-sm"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#5C1A1A]">
                {step}
              </span>
            </motion.div>
            
            {idx < OFFERING_STEPS.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 + 0.1 }}
                className="text-gold-start/50"
              >
                <Plus className="w-4 h-4" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <button className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-12 py-5 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg hover:shadow-xl transition-all">
          Complete Your Divine Offering
        </button>
      </motion.div>
    </div>
  );
}
