"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const REGIONAL_CELEBRATIONS = [
  { city: "DELHI", count: "5200", festival: "JANMASHTAMI" },
  { city: "MUMBAI", count: "2200", festival: "RADHASHTAMI" },
  { city: "LUCKNOW", count: "1800", festival: "DIVINE JOURNEYS" }
];

export default function DivineCelebrationMap() {
  return (
    <div className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-md border border-gold-start/50 rounded-3xl p-8 shadow-[0_10px_30px_rgba(212,168,83,0.1)] relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-gold-start/20 to-transparent blur-[30px] pointer-events-none" />
      
      <div className="mb-8">
        <h4 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase mb-1">
          The Divine Celebration Map
        </h4>
        <p className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E]">
          Regional Devotional Demands
        </p>
      </div>

      <div className="space-y-4">
        {REGIONAL_CELEBRATIONS.map((region, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex items-center justify-between p-4 bg-white/60 border border-gold-start/20 rounded-2xl hover:border-gold-start/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gold-start/10 flex items-center justify-center text-gold-start">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-display text-lg font-bold text-[#5C1A1A] uppercase">
                  {region.city}
                </span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-rose-500">
                  {region.festival}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <span className="block font-display text-2xl font-bold text-[#5C1A1A]">
                {region.count}
              </span>
              <span className="text-[8px] uppercase tracking-widest font-bold text-[#8B6F4E]">
                CELEBRATIONS
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
