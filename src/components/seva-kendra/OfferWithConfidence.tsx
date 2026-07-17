"use client";

import { motion } from "framer-motion";

const CONFIDENCE_ITEMS = [
  "Premium Packaging",
  "Secure Payments",
  "Handcrafted Collections",
  "WhatsApp Support",
  "Premium Quality",
  "Made For Thakurji"
];

export default function OfferWithConfidence() {
  return (
    <div className="w-full max-w-5xl mx-auto mb-32 px-6 relative z-10 text-center">
      <h3 className="font-display text-2xl font-bold text-charcoal/80 tracking-wider mb-10">
        Offer With Confidence
      </h3>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-x-12 md:gap-y-6">
        {CONFIDENCE_ITEMS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gold-start" />
            <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#8B6F4E]">
              {item}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
