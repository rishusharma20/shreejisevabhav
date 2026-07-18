"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const CELEBRATED_FESTIVALS = [
  { name: "JANMASHTAMI", count: "42,000+", label: "DIVINE JOURNEYS" },
  { name: "RADHASHTAMI", count: "25,000+", label: "DIVINE CELEBRATIONS" },
  { name: "KARTIK MAAS", count: "18,000+", label: "DIVINE MEMORIES" }
];

export default function DivineEmotionAnalytics() {
  return (
    <div className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-md border border-gold-start/50 rounded-3xl p-8 shadow-[0_10px_30px_rgba(212,168,83,0.1)] relative overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-200/30 to-transparent blur-[30px] pointer-events-none" />
      
      <div className="mb-8">
        <h4 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase mb-1">
          Most Beautifully Celebrated Festivals
        </h4>
        <p className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E]">
          The Heartbeat of Digital Vrindavan
        </p>
      </div>

      <div className="space-y-4 relative z-10">
        {CELEBRATED_FESTIVALS.map((fest, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex items-center justify-between p-4 bg-white/60 border border-gold-start/20 rounded-2xl hover:border-gold-start/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-display text-lg font-bold text-[#5C1A1A] uppercase">
                  {fest.name}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <span className="block font-display text-2xl font-bold text-rose-500">
                {fest.count}
              </span>
              <span className="text-[8px] uppercase tracking-widest font-bold text-rose-400">
                {fest.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
