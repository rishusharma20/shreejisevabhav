"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, Sparkles, User, ArrowLeft } from "lucide-react";

export default function ContinueJourney() {
  return (
    <div className="w-full relative z-10 flex flex-col items-center pt-8 pb-12 text-center">
      
      <p className="font-display text-2xl font-bold text-[#5C1A1A] mb-8 italic">
        Continue Your Divine Journey...
      </p>

      <div className="flex flex-wrap justify-center gap-4 px-4">
        <Link href="/">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-[#5C1A1A] rounded-full px-6 py-4 flex items-center justify-center gap-3 text-white text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold shadow-[0_10px_30px_rgba(92,26,26,0.3)] hover:bg-[#8B2B2B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return To Temple
          </motion.div>
        </Link>
        
        <Link href="/festivals">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-white/60 backdrop-blur-md border border-gold-start/40 rounded-full px-6 py-4 flex items-center justify-center gap-3 text-[#5C1A1A] text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold shadow-sm hover:bg-white/80 transition-colors"
          >
            Festival Collections <Sparkles className="w-4 h-4 text-gold-start" />
          </motion.div>
        </Link>
        
        <Link href="/creator">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-white/60 backdrop-blur-md border border-gold-start/40 rounded-full px-6 py-4 flex items-center justify-center gap-3 text-[#5C1A1A] text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold shadow-sm hover:bg-white/80 transition-colors"
          >
            The Creator <Heart className="w-4 h-4 text-rose-500" />
          </motion.div>
        </Link>
      </div>

    </div>
  );
}
