"use client";

import { motion } from "framer-motion";
import { Flower, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TodaysDivineDarshan404() {
  return (
    <div className="w-full max-w-5xl mx-auto mb-24 px-6 relative z-10 text-center">
      <div className="mb-12">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Today's Divine Darshan
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          May Shri Radha Raman Ji Illuminate Your Path
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white/50 backdrop-blur-xl border border-gold-start/40 rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(212,168,83,0.1)] relative overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 text-left"
      >
        <div className="w-full md:w-1/2 aspect-[3/4] relative rounded-[30px] overflow-hidden border border-gold-start/30 shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1599407338507-6a1005a5a1f2?q=80&w=800&auto=format&fit=crop"
            alt="Divine Darshan"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white text-center">
            <h4 className="font-display text-2xl font-bold tracking-widest mb-1">
              SHRI RADHA RAMAN JI
            </h4>
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/80">
              Vrindavan
            </p>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-6">
            <Flower className="w-5 h-5 text-gold-start" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8B6F4E]">
              Today's Blessing
            </span>
          </div>
          
          <h4 className="font-display text-2xl font-bold text-[#5C1A1A] tracking-wider mb-6">
            जय श्री राधे।
          </h4>
          
          <div className="font-medium italic text-lg text-charcoal/80 leading-relaxed mb-10">
            "May Shri Radha Raman Ji always illuminate your path with Bhakti, Prem & Seva."
          </div>

          <Link href="/divine-darshan">
            <button className="bg-gradient-to-r from-gold-start to-[#d4af37] text-white rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
              Receive Blessing <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
