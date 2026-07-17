"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function VisitDivineStreets() {
  return (
    <div className="w-full max-w-5xl mx-auto mb-32 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="bg-[#5C1A1A] rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(92,26,26,0.3)] relative overflow-hidden text-center"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-radial from-gold-start/20 to-transparent blur-[50px] pointer-events-none" />
        
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-8 border border-white/20">
          <MapPin className="w-8 h-8 text-gold-start" />
        </div>

        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-wider mb-8">
          Visit The Divine Streets<br />Of Vrindavan
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[11px] uppercase tracking-widest font-bold text-white/80 mb-10">
          <span>VRINDAVAN</span>
          <div className="hidden md:block w-4 h-[1px] bg-gold-start/50" />
          <span>UTTAR PRADESH</span>
          <div className="hidden md:block w-4 h-[1px] bg-gold-start/50" />
          <span>INDIA</span>
        </div>
        
        <div className="w-16 h-[1px] bg-gold-start/50 mx-auto mb-8" />

        <div className="font-medium italic text-lg md:text-xl text-white/90 leading-relaxed max-w-xl mx-auto mb-12">
          <p>Experience The Divine Festivals</p>
          <p>Of Vrindavan.</p>
        </div>

        <Link href="/vrindavan">
          <button className="bg-white text-[#5C1A1A] rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg hover:bg-gold-start hover:text-white transition-colors relative z-10 inline-flex items-center gap-2">
            Continue Your Journey <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
