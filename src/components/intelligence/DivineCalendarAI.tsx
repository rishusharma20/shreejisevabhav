"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Link from "next/link";

const RECOMMENDED_FESTIVALS = [
  "JANMASHTAMI",
  "RADHASHTAMI",
  "HOLI",
  "KARTIK MAAS",
  "ANNAKUT",
  "EKADASHI",
  "SHARAD PURNIMA"
];

export default function DivineCalendarAI() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-32 px-6 relative z-10 text-center">
      <div className="mb-12">
        <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center mx-auto mb-6 border border-gold-start/30 shadow-sm">
          <Calendar className="w-8 h-8 text-[#8B6F4E]" />
        </div>
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Divine Calendar AI
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E] max-w-md mx-auto">
          Based On Your Divine Journey, We Lovingly Recommend These Festivals
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-16">
        {RECOMMENDED_FESTIVALS.map((festival, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <Link href={`/festivals/${festival.toLowerCase().replace(" ", "-")}`}>
              <div className="bg-[#FFFBF4] border border-gold-start/30 rounded-full px-6 py-3 shadow-sm hover:border-gold-start hover:shadow-md transition-all cursor-pointer group">
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
