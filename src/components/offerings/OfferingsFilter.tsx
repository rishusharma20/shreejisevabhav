"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const FILTER_CATEGORIES = [
  "All Offerings",
  "Active Seva",
  "Received Blessings",
  "Festival Offerings"
];

export default function OfferingsFilter() {
  const [activeTab, setActiveTab] = useState("All Offerings");

  return (
    <div className="w-full flex items-center justify-start md:justify-center overflow-x-auto hide-scrollbar py-4 mb-8 snap-x snap-mandatory px-4 md:px-0">
      <div className="flex bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-full p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] relative">
        {FILTER_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`relative shrink-0 px-6 py-2.5 rounded-full text-[10px] md:text-[11px] uppercase tracking-widest font-bold transition-colors snap-center ${
              activeTab === category ? "text-white" : "text-charcoal hover:text-gold-start"
            }`}
          >
            {activeTab === category && (
              <motion.div
                layoutId="activeOfferingTab"
                className="absolute inset-0 bg-gradient-to-r from-gold-start to-[#E8850A] rounded-full shadow-md"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
