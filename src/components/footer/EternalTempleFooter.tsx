"use client";

import { motion } from "framer-motion";
import DivineNavigationTemple from "./DivineNavigationTemple";
import FooterTodaysBlessing from "./FooterTodaysBlessing";
import FooterDivineCalendar from "./FooterDivineCalendar";
import FooterMessageAkriti from "./FooterMessageAkriti";
import DigitalVrindavanStats from "./DigitalVrindavanStats";
import FooterLegacy from "./FooterLegacy";
import FooterDivineFamily from "./FooterDivineFamily";
import { Sparkles, Leaf } from "lucide-react";

export default function EternalTempleFooter() {
  return (
    <footer className="w-full relative overflow-hidden bg-[#FFFBF4] pt-32 pb-32">
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#FFFBF4] via-[#FFF5E6] to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#FFF3DF]/50 to-transparent opacity-80" />
        
        {/* Divine Glowing Orbs (Diyas) */}
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }} viewport={{ once: true }} transition={{ duration: 4 }}
          className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-radial from-gold-start/10 via-[#FFF3DF]/20 to-transparent filter blur-[120px]" 
        />
        
        {/* Subtle floating petals */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`petal-footer-${i}`}
            className="absolute rounded-[50%_0_50%_0] bg-gold-start/20 blur-[1px]"
            style={{ 
              width: Math.random() * 12 + 8, 
              height: Math.random() * 12 + 8,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              y: [0, -120], 
              opacity: [0, 0.6, 0], 
              rotate: [0, 360] 
            }}
            transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      {/* ── ENTRANCE TO ETERNAL TEMPLE ── */}
      <div className="w-full max-w-4xl mx-auto px-6 mb-24 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
        >
          <div className="flex justify-center mb-6 gap-4">
            <Leaf className="w-6 h-6 text-gold-start/60" />
            <Sparkles className="w-6 h-6 text-gold-start" />
            <Leaf className="w-6 h-6 text-gold-start/60" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#5C1A1A] tracking-widest mb-6 uppercase drop-shadow-sm">
            Welcome To The<br />Eternal Temple Of<br />Vrindavan
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-start/50 to-transparent mx-auto mb-8" />
          <p className="font-medium italic text-lg text-charcoal/80 max-w-xl mx-auto">
            "May Shri Radha Raman Ji's divine blessings forever remain upon you and your family."
          </p>
        </motion.div>
      </div>

      {/* ── FOOTER COMPONENTS ── */}
      <DivineNavigationTemple />
      <FooterTodaysBlessing />
      <FooterDivineCalendar />
      <FooterMessageAkriti />
      <DigitalVrindavanStats />
      <FooterLegacy />
      <FooterDivineFamily />

      {/* ── CONTINUATION WHISPER (Replaces Copyright) ── */}
      <div className="w-full text-center relative z-10 mt-16 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-warm-gray mb-2">
            Continue Your Divine Journey...
          </p>
          <p className="font-display text-xl text-[#5C1A1A] tracking-wider font-bold">
            JAI SHRI RADHE
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
