"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar } from "lucide-react";

const CALENDAR_FESTIVALS = [
  "JANMASHTAMI",
  "RADHASHTAMI",
  "JHULAN YATRA",
  "KARTIK MAAS",
  "HOLI",
  "ANNAKUT"
];

export default function FooterDivineCalendar() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-16 relative z-10 text-center border-t border-gold-start/20">
      <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8B6F4E] mb-12">
        The Divine Calendar of Vrindavan
      </h3>

      <div className="flex flex-wrap items-center justify-center gap-y-6 gap-x-4">
        {CALENDAR_FESTIVALS.map((fest, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Link href="/festivals">
              <div className="bg-white/60 backdrop-blur-md border border-gold-start/30 rounded-full px-6 py-3 flex items-center gap-3 shadow-sm hover:border-gold-start transition-colors group cursor-pointer">
                <Calendar className="w-3 h-3 text-gold-start" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-charcoal group-hover:text-[#5C1A1A] transition-colors">
                  {fest}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
