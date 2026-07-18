"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const SUGGESTIONS = [
  "JANMASHTAMI COLLECTIONS",
  "SIZE-4 POSHAKS",
  "PREMIUM MUKUTS",
  "DIVINE DARSHAN",
  "PREM PARIVAAR",
  "FESTIVAL COLLECTIONS"
];

export default function DivineDiscoverySearch() {
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isFocused || searchQuery) return;
    const interval = setInterval(() => {
      setSuggestionIndex((prev) => (prev + 1) % SUGGESTIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isFocused, searchQuery]);

  return (
    <div className="w-full max-w-4xl mx-auto pt-12 pb-16 px-6 relative z-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h4 className="font-display text-xl md:text-2xl font-bold text-[#5C1A1A] tracking-wider mb-6">
          JAI SHRI RADHE
        </h4>
        
        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#5C1A1A] tracking-wider mb-12 leading-tight drop-shadow-sm">
          What would you like to<br />lovingly offer today?
        </h1>

        <div className="relative max-w-2xl mx-auto">
          <motion.div 
            className={`absolute inset-0 -z-10 rounded-full transition-all duration-700 blur-[20px] ${isFocused ? 'bg-radial from-gold-start/40 to-transparent scale-105' : 'bg-transparent scale-100'}`}
          />
          
          <div className={`relative flex items-center bg-white/70 backdrop-blur-xl border-2 transition-colors duration-500 rounded-full px-6 md:px-8 py-4 md:py-5 shadow-[0_15px_40px_rgba(212,168,83,0.15)] ${isFocused ? 'border-gold-start' : 'border-gold-start/30 hover:border-gold-start/60'}`}>
            <Search className={`w-6 h-6 mr-4 transition-colors duration-500 ${isFocused ? 'text-[#5C1A1A]' : 'text-gold-start'}`} />
            
            <div className="relative flex-grow">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-transparent outline-none text-charcoal font-medium text-lg md:text-xl placeholder-transparent z-10 relative"
              />
              
              {!searchQuery && !isFocused && (
                <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
                  <span className="text-warm-gray text-lg md:text-xl italic mr-2 whitespace-nowrap">Lovingly discover</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={suggestionIndex}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.5 }}
                      className="text-[#8B6F4E] font-bold tracking-wider text-sm md:text-base uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {SUGGESTIONS[suggestionIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full p-3 shadow-md"
            >
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
