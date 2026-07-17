"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Flower2 } from "lucide-react";

const TEMPLES = [
  { name: "Shri Radha Raman Ji", type: "Thakurji Temple" },
  { name: "Banke Bihari Ji", type: "Thakurji Temple" },
  { name: "Prem Mandir", type: "Divine Monument" },
  { name: "ISKCON Vrindavan", type: "Krishna Balaram Mandir" },
  { name: "Radha Damodar", type: "Thakurji Temple" },
  { name: "Nidhivan", type: "Sacred Forest" },
  { name: "Seva Kunj", type: "Sacred Garden" },
  { name: "Govardhan", type: "Sacred Hill" }
];

export default function DivineTemples() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-32 px-6 relative z-10">
      <div className="text-center mb-16">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          The Divine Temples Of Vrindavan
        </h3>
        <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
          Experience The Sacred Sites
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEMPLES.map((temple, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group relative bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(212,168,83,0.15)] hover:border-gold-start/40 transition-all duration-500 flex flex-col items-center justify-center text-center p-8 h-[220px]"
          >
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 bg-radial from-gold-start/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <Flower2 className="w-6 h-6 text-gold-start/40 mb-4 group-hover:text-gold-start transition-colors duration-500" />
            
            <h4 className="font-display text-xl font-bold text-[#5C1A1A] mb-2 relative z-10">
              {temple.name}
            </h4>
            <p className="text-[9px] uppercase tracking-widest font-bold text-warm-gray mb-6 relative z-10">
              {temple.type}
            </p>
            
            <Link href="/divine-wardrobe">
              <div className="text-[9px] uppercase tracking-widest font-bold text-gold-start flex items-center gap-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500 relative z-10">
                Offer With Love <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
