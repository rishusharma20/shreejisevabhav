"use client";

import { motion } from "framer-motion";

const SIZES = [
  { size: "Size 0", desc: "New Born", thakurji: "Laddu Gopal Ji" },
  { size: "Size 1", desc: "Infant", thakurji: "Laddu Gopal Ji" },
  { size: "Size 2", desc: "Toddler", thakurji: "Laddu Gopal Ji" },
  { size: "Size 3", desc: "Small", thakurji: "Laddu Gopal Ji" },
  { size: "Size 4", desc: "Medium", thakurji: "Laddu Gopal Ji" },
  { size: "Size 5", desc: "Large", thakurji: "Laddu Gopal Ji" },
];

export default function DivineSizeGuide() {
  return (
    <div id="size-guide" className="w-full max-w-5xl mx-auto mb-32 px-6 relative z-10 text-center pt-10">
      <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
        Divine Size Guide
      </h3>
      <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-12">
        Find Your Perfect Divine Offering
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {SIZES.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
            className="bg-white/50 backdrop-blur-md border border-gold-start/20 rounded-[30px] p-6 shadow-sm hover:shadow-[0_15px_30px_rgba(212,168,83,0.1)] hover:border-gold-start/50 transition-all duration-300"
          >
            <h4 className="font-display text-2xl md:text-3xl font-bold text-[#5C1A1A] mb-2">
              {item.size}
            </h4>
            <div className="w-8 h-[1px] bg-gold-start/30 mx-auto mb-3" />
            <p className="text-[9px] uppercase tracking-widest font-bold text-warm-gray mb-1">
              {item.desc}
            </p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
              {item.thakurji}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
