"use client";

import { motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

const OFFERING_PARTS = [
  "KRISHNA POSHAK",
  "PREMIUM MUKUT",
  "MORPANKH",
  "PREMIUM NECKLACE",
  "FLOWER COLLECTIONS",
  "FESTIVAL PACKAGING"
];

export default function CompleteSearchOffering() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-32 px-6 relative z-10 text-center">
      <div className="mb-16">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Complete Your Divine Offering
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Filter By Devotion, Not By Price
        </p>
      </div>

      <div className="bg-white/50 backdrop-blur-md border border-gold-start/20 rounded-[40px] p-8 md:p-12 shadow-[0_15px_40px_rgba(212,168,83,0.08)]">
        <div className="flex flex-wrap items-center justify-center gap-y-6 gap-x-4 mb-12">
          {OFFERING_PARTS.map((part, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-gold-start/30 rounded-full px-6 py-3 shadow-sm hover:border-gold-start transition-colors cursor-pointer"
              >
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#5C1A1A]">
                  {part}
                </span>
              </motion.div>
              
              {idx < OFFERING_PARTS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 + 0.1 }}
                  className="text-gold-start/60"
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
          <Link href="/divine-cart">
            <button className="bg-[#5C1A1A] text-white rounded-full px-12 py-5 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg hover:bg-[#8B2B2B] hover:shadow-xl transition-all inline-flex items-center gap-3">
              Complete Your Divine Journey <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
