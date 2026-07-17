"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function OfferPrayers() {
  const [prayer, setPrayer] = useState("");
  const [isOffered, setIsOffered] = useState(false);

  const handleOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (prayer.trim()) {
      setIsOffered(true);
      // Reset after animation
      setTimeout(() => {
        setPrayer("");
        setIsOffered(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-32 px-6 relative z-10 text-center">
      <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-8">
        Offer Your Prayers
      </h3>

      <div className="bg-white/40 backdrop-blur-md border border-gold-start/20 rounded-[40px] p-10 md:p-14 shadow-sm relative overflow-hidden">
        
        <p className="font-medium text-charcoal/80 text-lg md:text-xl italic leading-relaxed mb-10">
          May Shri Radha Raman Ji <br/>
          always illuminate your path.
        </p>

        <form onSubmit={handleOffer} className="relative max-w-lg mx-auto">
          {!isOffered ? (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <textarea
                value={prayer}
                onChange={(e) => setPrayer(e.target.value)}
                placeholder="Write Your Prayer..."
                className="w-full bg-white/60 border border-gold-start/30 rounded-3xl p-6 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold-start/50 resize-none h-32 placeholder:text-warm-gray italic"
              />
              
              <button 
                type="submit"
                className="bg-[#5C1A1A] text-white rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:bg-[#8B2B2B] transition-colors w-full flex justify-center items-center gap-2"
              >
                Offer With Love <Heart className="w-4 h-4 fill-current" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-48 flex flex-col items-center justify-center space-y-4"
            >
              <motion.div
                animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-12 h-12 text-rose-500 fill-current" />
              </motion.div>
              <p className="font-display text-2xl font-bold text-[#5C1A1A]">
                Your Prayer Has Been Offered.
              </p>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}
