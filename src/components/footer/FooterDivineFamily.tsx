"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const FAMILY_LINKS = [
  "INSTAGRAM",
  "WHATSAPP SEVA",
  "YOUTUBE",
  "EMAIL",
  "DIVINE WHISPERS",
  "PREM PARIVAAR"
];

export default function FooterDivineFamily() {
  return (
    <div className="w-full px-6 py-16 relative z-10 text-center border-t border-gold-start/20">
      <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8B6F4E] mb-12">
        The Divine Family of Shreeji Seva Bhav
      </h3>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-y-4 gap-x-8 mb-12 flex-wrap">
        {FAMILY_LINKS.map((link, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <Link href="/">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-charcoal/80 hover:text-[#5C1A1A] transition-colors"
              >
                {link}
              </motion.span>
            </Link>
            {idx < FAMILY_LINKS.length - 1 && (
              <div className="hidden md:block w-3 h-[1px] bg-gold-start/30" />
            )}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <button className="bg-gradient-to-r from-gold-start to-[#d4af37] text-white rounded-full px-12 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all">
          Offer With Love
        </button>
      </motion.div>
    </div>
  );
}
