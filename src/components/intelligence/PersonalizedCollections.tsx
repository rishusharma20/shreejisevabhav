"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const COLLECTIONS = [
  "PREMIUM MUKUTS",
  "DIVINE JEWELLERY",
  "FESTIVAL COLLECTIONS",
  "DIVINE DARSHAN",
  "LATEST ARRIVALS"
];

export default function PersonalizedCollections() {
  return (
    <div className="w-full max-w-5xl mx-auto mb-32 px-6 relative z-10 text-center">
      <div className="mb-16">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Rishu's Divine Collections
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Your Personalised Divine Journey
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 mb-16">
        {COLLECTIONS.map((collection, idx) => (
          <div key={idx} className="w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/60 backdrop-blur-md border border-gold-start/30 rounded-full px-8 py-4 shadow-sm w-full max-w-sm"
            >
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-[#5C1A1A]">
                {collection}
              </span>
            </motion.div>
            
            {idx < COLLECTIONS.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                className="my-3 text-gold-start/50"
              >
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Link href="#">
          <button className="bg-white text-[#5C1A1A] rounded-full px-12 py-5 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:bg-gold-start hover:text-white transition-colors flex items-center gap-3 mx-auto border border-gold-start/20 hover:border-gold-start">
            Continue Your Journey <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
