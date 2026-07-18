"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const FESTIVALS = [
  "JANMASHTAMI",
  "RADHASHTAMI",
  "HOLI",
  "JHULAN YATRA",
  "KARTIK MAAS",
  "ANNAKUT",
  "EKADASHI",
  "SHARAD PURNIMA"
];

export default function DiscoverThroughFestivals() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-32 px-6 relative z-10 text-center">
      <div className="mb-12">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Discover Through Festivals
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Explore Divine Collections
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {FESTIVALS.map((festival, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <Link href={`/festivals/${festival.toLowerCase().replace(" ", "-")}`}>
              <div className="bg-white/60 backdrop-blur-md border border-gold-start/30 rounded-full px-6 py-3 shadow-sm hover:border-gold-start hover:shadow-md transition-all cursor-pointer group flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-gold-start/50 group-hover:text-gold-start transition-colors" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-charcoal group-hover:text-[#5C1A1A] transition-colors">
                  {festival}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
