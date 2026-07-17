"use client";

import { motion } from "framer-motion";
import { Flower2, Heart, Star } from "lucide-react";
import Link from "next/link";

export default function MyDivineJourneyStats() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-32 px-6 relative z-10 text-center">
      
      <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-12">
        Your Divine Journey
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
        {/* Stat 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-md border border-gold-start/30 flex items-center justify-center mb-4 shadow-sm text-3xl font-display font-bold text-[#8B6F4E]">
            25
          </div>
          <p className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-charcoal/80 flex items-center gap-2">
            <Star className="w-3 h-3 text-gold-start" /> Divine Offerings
          </p>
        </motion.div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] h-16 bg-gold-start/30" />
        <div className="md:hidden w-16 h-[1px] bg-gold-start/30" />

        {/* Stat 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-md border border-gold-start/30 flex items-center justify-center mb-4 shadow-sm text-3xl font-display font-bold text-[#8B6F4E]">
            8
          </div>
          <p className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-charcoal/80 flex items-center gap-2">
            <Flower2 className="w-3 h-3 text-gold-start" /> Divine Festivals Celebrated
          </p>
        </motion.div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] h-16 bg-gold-start/30" />
        <div className="md:hidden w-16 h-[1px] bg-gold-start/30" />

        {/* Stat 3 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-md border border-gold-start/30 flex items-center justify-center mb-4 shadow-sm text-3xl font-display font-bold text-[#8B6F4E]">
            14
          </div>
          <p className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-charcoal/80 flex items-center gap-2">
            <Heart className="w-3 h-3 text-rose-400" /> Beloved Collections
          </p>
        </motion.div>
      </div>

      <Link href="/divine-wardrobe">
        <button className="text-[10px] uppercase tracking-widest font-bold text-gold-start hover:text-[#5C1A1A] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-gold-start/30 after:hover:bg-[#5C1A1A] after:transition-colors">
          Continue Your Seva
        </button>
      </Link>
      
    </div>
  );
}
