"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const REGIONAL_DEMAND = [
  { city: "DELHI", journeys: "5200" },
  { city: "LUCKNOW", journeys: "2200" },
  { city: "JAIPUR", journeys: "1800" },
  { city: "MUMBAI", journeys: "1500" },
  { city: "HYDERABAD", journeys: "1200" }
];

export default function LiveFestivalReserveMap() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
            Live Festival Reserve Map
          </h3>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
            Predicting Regional Demands
          </p>
        </div>
        <div className="bg-white/60 backdrop-blur-md border border-gold-start/30 rounded-full px-6 py-2 shadow-sm">
          <span className="text-[9px] uppercase tracking-widest font-bold text-[#5C1A1A]">
            AI NEXT FESTIVAL PREDICTION ACTIVE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {REGIONAL_DEMAND.map((region, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white/70 backdrop-blur-md border border-gold-start/30 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center hover:border-gold-start/60 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-gold-start/5 flex items-center justify-center text-gold-start mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <h5 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase mb-2">
              {region.city}
            </h5>
            <div className="w-8 h-[1px] bg-gold-start/30 mb-2" />
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed">
              {region.journeys} DIVINE JOURNEYS
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
