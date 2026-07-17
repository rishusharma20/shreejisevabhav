"use client";

import { motion } from "framer-motion";
import { Droplets, Sparkles, Box, ShieldCheck, Heart } from "lucide-react";

const CARE_ITEMS = [
  { title: "Premium Fabrics", icon: Droplets },
  { title: "Temple Inspired Collections", icon: Heart },
  { title: "Festival Collections", icon: Sparkles },
  { title: "Premium Jewellery", icon: ShieldCheck },
  { title: "Divine Packaging", icon: Box },
];

export default function DivineCareGuide() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-32 px-6 relative z-10 text-center">
      <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
        Love & Care For Your Divine Offerings
      </h3>
      <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-12">
        Preserve Their Beauty With Love
      </p>

      <div className="bg-gradient-to-br from-[#FFFBF4] to-[#FFF5E6] border border-gold-start/20 rounded-[40px] p-8 md:p-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-gold-start/20 to-transparent blur-[30px]" />

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {CARE_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/60 backdrop-blur-md border border-gold-start/30 rounded-full px-6 py-4 flex items-center gap-3 shadow-sm hover:border-gold-start/60 transition-colors"
              >
                <Icon className="w-4 h-4 text-[#8B6F4E]" />
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#5C1A1A]">
                  {item.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
