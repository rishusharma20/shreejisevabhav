"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, SlidersHorizontal, Diamond } from "lucide-react";

const categories = [
  "All Ratna Alankaar", 
  "Mukut Collections", 
  "Morpankh Collections", 
  "Bansuri Collections", 
  "Necklace Collections", 
  "Pearl Collections",
  "Divine Alankaar"
];

const deities = ["All Deities", "Shri Radha Rani", "Shri Radha Raman Ji", "Laddu Gopal Ji"];
const festivals = ["All Festivals", "Janmashtami", "Radhashtami", "Diwali", "Holi"];

export default function AlankaarFilters() {
  const [activeCategory, setActiveCategory] = useState("All Ratna Alankaar");
  const [activeDeity, setActiveDeity] = useState("All Deities");
  const [activeFestival, setActiveFestival] = useState("All Festivals");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  
  return (
    <div className="w-full max-w-7xl mx-auto px-6 mb-12 relative z-40">
      <div className="bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl p-4 md:p-6 shadow-[0_12px_40px_rgba(255,183,178,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] flex flex-col gap-6">
        
        <div className="flex flex-col xl:flex-row gap-6 items-center justify-between">
          
          {/* Scrolling Pill Selectors for Ornaments */}
          <div className="w-full xl:flex-1 overflow-x-auto hide-scrollbar pb-2 xl:pb-0">
            <div className="flex items-center gap-3 w-max">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative px-5 py-2.5 rounded-full text-[9px] uppercase tracking-[0.15em] font-bold transition-all duration-300 ${
                      isActive 
                        ? "text-[#5C1A1A]" 
                        : "text-warm-gray hover:text-charcoal bg-white/40 hover:bg-white/70 border border-gold-start/20"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeAlankaarFilter"
                        className="absolute inset-0 bg-gradient-to-r from-lotus/20 to-gold-start/20 rounded-full border border-lotus/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {isActive && <Diamond className="w-3 h-3 text-gold-start" />}
                      {category}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Quick Dropdown: Deity */}
          <div className="flex items-center gap-4 w-full xl:w-auto justify-center xl:justify-end shrink-0">
            <div className="relative group">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-lotus/30 text-[9px] uppercase tracking-[0.15em] font-bold text-charcoal hover:bg-white transition-all shadow-sm">
                <span className="text-warm-gray mr-1">For:</span>
                {activeDeity}
                <ChevronDown className="w-3 h-3 text-gold-start transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl border border-lotus/30 rounded-2xl p-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top transform scale-95 group-hover:scale-100 z-50">
                {deities.map((deity) => (
                  <button 
                    key={deity}
                    onClick={() => setActiveDeity(deity)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-colors ${
                      activeDeity === deity ? "bg-lotus/15 text-[#5C1A1A]" : "text-warm-gray hover:bg-cream hover:text-charcoal"
                    }`}
                  >
                    {deity}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-lotus/30 text-[9px] uppercase tracking-[0.15em] font-bold text-charcoal hover:bg-white transition-all shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-start" />
              Filters
            </button>
          </div>
        </div>

        {/* ── Expanded Filters Panel ── */}
        <AnimatePresence>
          {showMoreFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-gold-start/15 pt-6 mt-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Festival Filter */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-saffron-deep mb-3">Festival Ornaments</h4>
                  <div className="flex flex-wrap gap-2">
                    {festivals.map((festival) => (
                      <button
                        key={festival}
                        onClick={() => setActiveFestival(festival)}
                        className={`px-3 py-1.5 rounded-full border text-[9px] font-bold uppercase transition-all ${
                          activeFestival === festival 
                            ? "border-[#5C1A1A] bg-[#5C1A1A]/5 text-[#5C1A1A]" 
                            : "border-gold-start/20 bg-white/40 text-warm-gray hover:border-gold-start/50"
                        }`}
                      >
                        {festival}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Offering Range Filter */}
                <div className="lg:col-span-2">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-saffron-deep mb-3">Divine Offering Range</h4>
                  <div className="px-2 max-w-md">
                    <input type="range" className="w-full accent-gold-start" />
                    <div className="flex justify-between text-[9px] font-bold text-warm-gray mt-2">
                      <span>₹1,000</span>
                      <span>₹50,000+</span>
                    </div>
                  </div>
                </div>
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
