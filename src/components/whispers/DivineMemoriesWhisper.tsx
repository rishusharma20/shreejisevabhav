"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DivineMemoriesWhisper() {
  return (
    <div className="w-full max-w-5xl mx-auto mb-24 px-6 relative z-10 text-center">
      <div className="mb-12">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Divine Memories of Vrindavan
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          We Lovingly Remember Your Traditions
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-xl border border-gold-start/40 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.15)] relative overflow-hidden max-w-4xl mx-auto"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-radial from-gold-start/10 to-transparent blur-[50px] pointer-events-none" />
        
        <h4 className="font-display text-xl md:text-2xl font-bold text-[#8B6F4E] tracking-widest mb-6">
          WELCOME BACK RISHU.
        </h4>
        
        <div className="w-12 h-[1px] bg-gold-start/50 mx-auto mb-8" />
        
        <div className="font-medium italic text-lg md:text-xl text-charcoal/80 leading-relaxed max-w-xl mx-auto mb-10">
          <p>
            Last year you lovingly celebrated <span className="font-bold text-[#5C1A1A] not-italic">JANMASHTAMI</span> with Shreeji Seva Bhav.
          </p>
          <p className="mt-4">
            May we continue this beautiful tradition once again?
          </p>
        </div>

        <Link href="/festivals/janmashtami">
          <button className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
            Continue Your Journey <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
