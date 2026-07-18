"use client";

import { motion } from "framer-motion";
import { Sparkles, Library } from "lucide-react";

const LEGACY_EVENTS = [
  { year: "2026", title: "THE BEGINNING", description: "The First Janmashtami Celebration" },
  { year: "2027", title: "THE GROWTH", description: "The First 25,000+ Divine Journeys" },
  { year: "2030", title: "THE EXPANSION", description: "1,00,000+ Divine Offerings Beautifully Continued" },
  { year: "2040", title: "THE LEGACY", description: "Another Beautiful Divine Chapter Begins" },
  { year: "2050", title: "THE CONTINUATION", description: "Generations of Bhakti, Prem, and Seva" }
];

export default function DivineLegacyTimeline() {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-gold-start/30 rounded-3xl p-8 shadow-[0_10px_30px_rgba(212,168,83,0.05)] relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-200/20 to-transparent blur-[30px] pointer-events-none" />
      
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <Library className="w-5 h-5 text-gold-start" />
          <h4 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase">
            The Living Vrindavan Timeline
          </h4>
        </div>
      </div>

      <div className="relative pl-4 space-y-8">
        <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-gold-start/20" />

        {LEGACY_EVENTS.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative z-10 flex items-start gap-6 group"
          >
            <div className="bg-white rounded-full p-2 relative z-10 border border-gold-start/30 shadow-sm mt-1 group-hover:scale-110 transition-transform">
               <Sparkles className="w-4 h-4 text-gold-start" />
            </div>
            
            <div className="flex-1 pt-1">
              <span className="block font-display text-xl font-bold text-rose-500 mb-1">
                {event.year}
              </span>
              <p className="text-xs md:text-sm uppercase tracking-widest font-bold text-[#5C1A1A] mb-1">
                {event.title}
              </p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
