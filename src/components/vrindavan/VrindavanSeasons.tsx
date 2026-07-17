"use client";

import { motion } from "framer-motion";
import { Leaf, Sun, CloudRain, Snowflake } from "lucide-react";

const SEASONS = [
  {
    name: "Spring",
    festival: "Flower Holi",
    icon: Leaf,
    color: "text-green-600",
    glow: "from-green-500/10"
  },
  {
    name: "Summer",
    festival: "Jhulan Yatra",
    icon: Sun,
    color: "text-amber-500",
    glow: "from-amber-500/10"
  },
  {
    name: "Monsoon",
    festival: "Radhashtami",
    icon: CloudRain,
    color: "text-blue-500",
    glow: "from-blue-500/10"
  },
  {
    name: "Winter",
    festival: "Kartik Maas & Annakut",
    icon: Snowflake,
    color: "text-sky-400",
    glow: "from-sky-400/10"
  }
];

export default function VrindavanSeasons() {
  return (
    <div className="w-full max-w-5xl mx-auto mb-32 px-6 relative z-10">
      
      <div className="text-center mb-16">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Vrindavan Through The Seasons
        </h3>
        <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
          The Divine Calendar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {SEASONS.map((season, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="group relative bg-white/40 backdrop-blur-md border border-gold-start/20 rounded-3xl p-8 flex flex-col items-center text-center overflow-hidden hover:bg-white/60 transition-colors"
          >
            {/* Dynamic Glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-radial ${season.glow} to-transparent blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 relative z-10">
              <season.icon className={`w-5 h-5 ${season.color}`} />
            </div>

            <h4 className="font-display text-xl font-bold text-charcoal mb-2 relative z-10">
              {season.name}
            </h4>
            
            <div className="w-8 h-[1px] bg-gold-start/30 mb-4" />
            
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] relative z-10">
              {season.festival}
            </p>
          </motion.div>
        ))}
      </div>
      
    </div>
  );
}
