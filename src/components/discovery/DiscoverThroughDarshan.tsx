"use client";

import { motion } from "framer-motion";
import { Flower, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const DEITIES = [
  "SHRI RADHA RAMAN JI",
  "SHRI LADLI JI",
  "BANKI BIHARI JI",
  "SHRINATH JI",
  "PREM MANDIR"
];

export default function DiscoverThroughDarshan() {
  const [activeDeity, setActiveDeity] = useState<string | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto mb-32 px-6 relative z-10 text-center">
      <div className="mb-12">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Discover Through Divine Darshan
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Offer Love To Your Beloved Thakurji
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-12">
        {DEITIES.map((deity, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <button 
              onClick={() => setActiveDeity(deity)}
              className={`border rounded-full px-8 py-4 shadow-sm transition-all group flex items-center gap-3 ${activeDeity === deity ? 'bg-[#5C1A1A] border-[#5C1A1A] text-white' : 'bg-[#FFFBF4] border-gold-start/30 text-charcoal hover:border-gold-start'}`}
            >
              <Flower className={`w-4 h-4 transition-colors ${activeDeity === deity ? 'text-white' : 'text-gold-start'}`} />
              <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${activeDeity === deity ? 'text-white' : 'group-hover:text-[#5C1A1A]'}`}>
                {deity}
              </span>
            </button>
          </motion.div>
        ))}
      </div>

      {activeDeity && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: 20 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/60 backdrop-blur-xl border border-gold-start/40 rounded-[30px] p-8 md:p-12 shadow-[0_15px_40px_rgba(212,168,83,0.1)] max-w-3xl mx-auto"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-warm-gray mb-6">
            Lovingly Curated For
          </p>
          <h4 className="font-display text-2xl font-bold text-[#5C1A1A] tracking-wider mb-8">
            {activeDeity}
          </h4>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
            {['SPECIAL COLLECTIONS', 'KRISHNA POSHAKS', 'PREMIUM MUKUTS', 'DIVINE ALANKAAR'].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
                  {item}
                </span>
                {idx < 3 && (
                  <div className="hidden md:block w-4 h-[1px] bg-gold-start/30" />
                )}
              </div>
            ))}
          </div>

          <Link href="/divine-wardrobe">
            <button className="bg-gradient-to-r from-gold-start to-[#d4af37] text-white rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2">
              Complete Your Divine Offering <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
