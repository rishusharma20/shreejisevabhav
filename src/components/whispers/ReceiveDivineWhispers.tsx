"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const NOTIFICATION_TYPES = [
  "TODAY'S BLESSINGS",
  "FESTIVAL NOTIFICATIONS",
  "DIVINE DARSHAN",
  "LATEST DIVINE ARRIVALS"
];

export default function ReceiveDivineWhispers() {
  return (
    <div className="w-full max-w-5xl mx-auto mb-24 px-6 relative z-10 text-center">
      <div className="bg-[#FFFBF4] backdrop-blur-md border border-gold-start/20 rounded-[40px] p-10 md:p-14 shadow-sm relative overflow-hidden">
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-4 relative z-10">
          Receive Divine Whispers of Vrindavan
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E] mb-10 relative z-10">
          Only Receive What Your Heart Desires
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 relative z-10">
          {NOTIFICATION_TYPES.map((type, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-charcoal">
                {type}
              </span>
              {idx < NOTIFICATION_TYPES.length - 1 && (
                <Plus className="w-3 h-3 text-gold-start/50" />
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <button className="bg-gradient-to-r from-gold-start to-[#d4af37] text-white rounded-full px-12 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all">
            Offer With Love
          </button>
        </motion.div>
      </div>
    </div>
  );
}
