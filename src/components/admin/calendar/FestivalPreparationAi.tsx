"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FestivalPreparationAi() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-xl border border-gold-start/50 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.15)] relative overflow-hidden flex flex-col md:flex-row gap-12 items-center"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-radial from-rose-200/40 to-transparent blur-[50px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-radial from-gold-start/20 to-transparent blur-[50px] pointer-events-none" />
        
        <div className="flex-1 relative z-10 w-full text-center md:text-left">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gold-start/30 rounded-full px-6 py-2 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#5C1A1A]">
              WONDERFUL NEWS
            </span>
          </div>
          
          <h4 className="font-display text-2xl md:text-4xl font-bold text-[#5C1A1A] tracking-wider mb-6 leading-tight uppercase">
            15 Days remain for the beautiful celebration of Janmashtami.
          </h4>
          
          <div className="w-12 h-[2px] bg-gold-start/50 mb-8 mx-auto md:mx-0" />
          
          <div className="space-y-4 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">EXPECTED DIVINE JOURNEYS:</span>
              <span className="font-bold text-rose-600 text-2xl tracking-wider">25,000+</span>
            </div>
          </div>

          <div className="mb-10">
             <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-4">PREPARATIONS MAY NOW BEGIN FOR:</p>
             <div className="flex flex-wrap justify-center md:justify-start gap-3">
               {["Premium Poshaks", "Mukut Collections", "Divine Jewellery", "Premium Packaging"].map((item, idx) => (
                 <span key={idx} className="bg-white border border-gold-start/30 text-[#5C1A1A] text-[9px] uppercase tracking-widest font-bold px-4 py-2 rounded-full shadow-sm hover:bg-gold-start/5 transition-colors cursor-default">
                   {item}
                 </span>
               ))}
             </div>
          </div>
          
          <Link href="/admin/treasury/prepare">
            <button className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
              Begin Preparations <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
