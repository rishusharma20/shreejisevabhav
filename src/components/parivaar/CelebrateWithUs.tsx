"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CelebrateWithUs() {
  return (
    <div className="w-full max-w-3xl mx-auto mb-24 px-6 relative z-10 text-center">
      <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-8">
        Celebrate With Us
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="bg-white/60 backdrop-blur-xl border border-gold-start/30 rounded-[40px] p-10 shadow-[0_20px_50px_rgba(212,168,83,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-400/20 to-transparent blur-[30px]" />
        
        <h4 className="font-display text-2xl font-bold text-charcoal tracking-wider mb-6">
          Wonderful News.
        </h4>
        
        <div className="w-12 h-[1px] bg-gold-start/50 mx-auto mb-6" />
        
        <p className="font-medium text-charcoal/80 text-lg italic leading-relaxed mb-8">
          The Divine Festival Of <br/>
          <span className="font-display text-2xl font-bold text-[#8B6F4E] not-italic my-2 block">
            Radhashtami
          </span>
          is approaching.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link href="/">
            <button className="text-[10px] uppercase tracking-widest font-bold text-charcoal/70 hover:text-[#5C1A1A] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-transparent after:hover:bg-[#5C1A1A]/30 after:transition-colors">
              Continue Your Journey
            </button>
          </Link>

          <Link href="/festivals">
            <button className="bg-[#5C1A1A] rounded-full px-8 py-4 flex items-center justify-center gap-3 text-white text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:bg-[#8B2B2B] transition-colors">
              Explore Festival Collections <Sparkles className="w-4 h-4" />
            </button>
          </Link>
          
          <Link href="/divine-wardrobe">
            <button className="text-[10px] uppercase tracking-widest font-bold text-gold-start hover:text-[#5C1A1A] transition-colors flex items-center gap-2">
              Offer With Love <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
