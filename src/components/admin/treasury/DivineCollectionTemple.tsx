"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CATEGORIES = [
  "KRISHNA POSHAKS",
  "RADHA RANI COLLECTIONS",
  "PREMIUM MUKUTS",
  "PREMIUM MORPANKHS",
  "DIVINE JEWELLERY",
  "FESTIVAL COLLECTIONS",
  "PREMIUM ALANKAAR",
  "LIMITED DIVINE OFFERINGS",
  "CUSTOM COLLECTIONS"
];

export default function DivineCollectionTemple() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10 text-center">
      <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
        The Divine Collection Temple
      </h3>
      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E] mb-12">
        Every Offering One Click Away
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <Link href={`/admin/treasury/${cat.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="bg-white/80 backdrop-blur-md border border-gold-start/30 rounded-full px-8 py-4 flex items-center justify-center shadow-sm hover:bg-gold-start/10 hover:border-gold-start/50 transition-colors group cursor-pointer">
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-charcoal group-hover:text-[#5C1A1A] transition-colors">
                  {cat}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
