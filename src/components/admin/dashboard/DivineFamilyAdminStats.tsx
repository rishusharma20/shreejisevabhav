"use client";

import { motion } from "framer-motion";
import { Users, Heart } from "lucide-react";

export default function DivineFamilyAdminStats() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="mb-10 text-center md:text-left">
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
          The Divine Family of Vrindavan
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          New Divine Journeys Today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center mb-6 text-gold-start">
            <Users className="w-5 h-5" />
          </div>
          <span className="font-display text-4xl font-bold text-[#5C1A1A] mb-4">52</span>
          <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed">
            NEW DEVOTEES<br />WELCOMED TODAY
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-6 text-rose-500">
            <Heart className="w-5 h-5" />
          </div>
          <span className="font-display text-4xl font-bold text-[#5C1A1A] mb-4">18</span>
          <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed">
            NEW PREM PARIVAAR<br />MEMBERS JOINED
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center mb-6 text-gold-start">
            <Users className="w-5 h-5" />
          </div>
          <span className="font-display text-4xl font-bold text-[#5C1A1A] mb-4">15</span>
          <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed">
            NEW DIVINE JOURNEYS<br />HAVE BEGUN TODAY
          </p>
        </motion.div>
      </div>
    </div>
  );
}
