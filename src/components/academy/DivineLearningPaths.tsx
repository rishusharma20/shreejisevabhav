"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

const PATHS = [
  { label: "Begin Your Divine Journey", bg: "bg-white/80" },
  { label: "The Art Of Divine Offerings", bg: "bg-[#FFFBF4]" },
  { label: "The Beauty Of Temple Traditions", bg: "bg-white/80" },
  { label: "The Divine Festivals Of Vrindavan", bg: "bg-gold-start/10" }
];

export default function DivineLearningPaths() {
  return (
    <div className="w-full max-w-2xl mx-auto mb-32 px-6 relative z-10 text-center">
      <div className="mb-16">
        <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Divine Learning Paths
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Follow The Spiritual Progression
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        {PATHS.map((path, idx) => (
          <div key={idx} className="w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`w-full max-w-sm ${path.bg} border border-gold-start/30 rounded-3xl py-6 px-4 shadow-sm hover:border-gold-start/60 transition-colors cursor-pointer`}
            >
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#5C1A1A]">
                {path.label}
              </span>
            </motion.div>
            
            {idx < PATHS.length - 1 && (
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
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-12"
      >
        <Link href="/">
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors border-b border-[#8B6F4E]/30 pb-1 cursor-pointer">
            Continue Your Divine Journey
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
