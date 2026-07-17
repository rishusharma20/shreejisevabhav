"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const FESTIVALS = [
  "Janmashtami",
  "Radhashtami",
  "Jhulan Yatra",
  "Diwali",
  "Annakut",
  "Kartik Maas"
];

export default function FestivalExperiences() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-32 px-6 relative z-10 text-center">
      <div className="mb-16">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Experience The Festivals Of Vrindavan
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          The Divine Cycle
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-4 mb-16 relative">
        {/* Connection line for desktop */}
        <div className="hidden md:block absolute top-1/2 left-10 right-10 h-[1px] bg-gold-start/30 -translate-y-1/2 z-0" />
        
        {FESTIVALS.map((fest, idx) => (
          <div key={idx} className="relative z-10 flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#FFFBF4] border border-gold-start/30 rounded-full px-6 py-3 shadow-sm hover:bg-gold-start/10 transition-colors cursor-pointer"
            >
              <span className="text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-[#8B6F4E] hover:text-[#5C1A1A]">
                {fest}
              </span>
            </motion.div>
            
            {/* Down arrow for mobile */}
            {idx < FESTIVALS.length - 1 && (
              <div className="md:hidden w-[1px] h-6 bg-gold-start/30 my-2" />
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
        <Link href="/festivals">
          <button className="bg-transparent border border-gold-start text-[#5C1A1A] rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold-start/10 transition-colors inline-flex items-center gap-2">
            Explore Collections <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
