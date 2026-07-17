"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Link from "next/link";

const LIBRARY_CATEGORIES = [
  "Divine Festivals",
  "Divine Offerings",
  "Divine Traditions",
  "Divine Alankaar",
  "Divine Calendar",
  "Divine Blessings",
  "Temple Traditions"
];

export default function DivineLibrary() {
  return (
    <div className="w-full max-w-5xl mx-auto mb-32 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="bg-[#5C1A1A] rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(92,26,26,0.3)] relative overflow-hidden text-center"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-radial from-gold-start/20 to-transparent blur-[50px] pointer-events-none" />
        
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-8 h-8 text-gold-start" />
        </div>

        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-wider mb-10">
          The Divine Library Of Vrindavan
        </h3>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {LIBRARY_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              className="bg-white/10 border border-white/20 rounded-full px-6 py-3 cursor-pointer transition-colors"
            >
              <span className="text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-white/90">
                {cat}
              </span>
            </motion.div>
          ))}
        </div>

        <Link href="/">
          <button className="bg-white text-[#5C1A1A] rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg hover:bg-gold-start hover:text-white transition-colors relative z-10">
            Continue Your Journey
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
