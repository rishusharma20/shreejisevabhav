"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const MUSEUM_ITEMS = [
  "THE FIRST LOGO",
  "THE FIRST COLLECTION",
  "THE FIRST JANMASHTAMI",
  "THE FIRST DIVINE JOURNEY"
];

export default function DigitalMuseum() {
  return (
    <div id="museum" className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="flex flex-col items-center text-center mb-10">
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
          The Digital Museum of Vrindavan
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Preserving the Beautiful Evolution
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MUSEUM_ITEMS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white/80 backdrop-blur-md border border-gold-start/30 rounded-3xl p-8 shadow-[0_10px_30px_rgba(212,168,83,0.05)] hover:shadow-[0_10px_30px_rgba(212,168,83,0.1)] hover:border-gold-start/60 transition-all flex flex-col justify-between group"
          >
            <div className="mb-8">
              <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center text-gold-start mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h5 className="font-display text-lg font-bold text-[#5C1A1A] tracking-wider uppercase group-hover:text-gold-start transition-colors">
                {item}
              </h5>
            </div>
            
            <Link href="/admin">
              <button className="w-full bg-transparent border border-gold-start/50 text-[#5C1A1A] rounded-full px-4 py-2 text-[8px] uppercase tracking-widest font-bold hover:bg-gold-start/10 transition-colors inline-flex items-center justify-center gap-2">
                View Memory <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
