"use client";

import { motion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import Link from "next/link";

const CUSTOM_STEPS = [
  "JANMASHTAMI SPECIAL POSHAKS",
  "CUSTOM MUKUT",
  "CUSTOM JEWELLERY",
  "FESTIVAL COLLECTIONS",
  "PREMIUM GIFT PACKAGING"
];

export default function CustomDivineOfferings() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-32 px-6 relative z-10 text-center">
      <div className="mb-16">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Custom Divine Offerings
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Designed With Love For Thakurji
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 mb-16">
        {CUSTOM_STEPS.map((step, idx) => (
          <div key={idx} className="w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/60 backdrop-blur-md border border-gold-start/30 rounded-full px-8 py-4 shadow-sm"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#5C1A1A]">
                {step}
              </span>
            </motion.div>
            
            {idx < CUSTOM_STEPS.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                className="my-3 text-gold-start/50"
              >
                <ArrowDown className="w-5 h-5" />
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
        className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8"
      >
        <Link href="#">
          <button className="bg-gradient-to-r from-gold-start to-[#d4af37] text-white rounded-full px-12 py-5 text-[10px] uppercase tracking-[0.2em] font-bold shadow-[0_10px_30px_rgba(212,168,83,0.3)] hover:shadow-[0_15px_40px_rgba(212,168,83,0.4)] transition-all flex items-center gap-3">
            <MessageCircle className="w-4 h-4 fill-white" /> Akriti Sharma's Team
          </button>
        </Link>
        <span className="text-[9px] uppercase tracking-widest font-bold text-warm-gray">
          Custom Offering Requests
        </span>
      </motion.div>
    </div>
  );
}
