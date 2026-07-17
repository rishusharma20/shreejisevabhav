"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";

const OFFERING_STEPS = [
  "Poshak",
  "Mukut",
  "Morpankh",
  "Bansuri",
  "Necklace",
  "Flower Collections",
  "Premium Packaging"
];

export default function CompleteOfferingGuide() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-32 px-6 relative z-10 text-center">
      <div className="mb-16">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          The Complete Divine Offering Guide
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          How To Prepare Your Seva
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-16">
        {OFFERING_STEPS.map((step, idx) => (
          <div key={idx} className="flex items-center gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/60 backdrop-blur-md border border-gold-start/30 rounded-2xl px-6 py-4 shadow-sm"
            >
              <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#5C1A1A]">
                {step}
              </span>
            </motion.div>
            
            {idx < OFFERING_STEPS.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
              >
                <Plus className="w-5 h-5 text-gold-start/60" />
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
      >
        <Link href="/krishna-vastra">
          <button className="bg-gradient-to-r from-gold-start to-[#d4af37] text-white rounded-full px-12 py-5 text-[10px] uppercase tracking-[0.2em] font-bold shadow-[0_10px_30px_rgba(212,168,83,0.3)] hover:shadow-[0_15px_40px_rgba(212,168,83,0.4)] transition-all">
            Complete Your Divine Offering
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
