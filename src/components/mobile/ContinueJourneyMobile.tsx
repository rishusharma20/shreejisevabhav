"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const JOURNEY_LINKS = [
  { label: "Offline Divine Darshan", href: "/offline" },
  { label: "Divine Whispers", href: "/divine-whispers" },
  { label: "Festival Collections", href: "/festivals" }
];

export default function ContinueJourneyMobile() {
  return (
    <div className="w-full max-w-5xl mx-auto mb-16 px-6 relative z-10 text-center border-t border-gold-start/20 pt-16">
      <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8B6F4E] mb-8">
        Continue Your Divine Journey
      </h3>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-y-4 gap-x-6 mb-12 flex-wrap">
        {JOURNEY_LINKS.map((link, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <Link href={link.href}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-charcoal/80 hover:text-[#5C1A1A] transition-colors"
              >
                {link.label}
              </motion.span>
            </Link>
            {idx < JOURNEY_LINKS.length - 1 && (
              <div className="hidden md:block w-3 h-[1px] bg-gold-start/30" />
            )}
          </div>
        ))}
      </div>

      <Link href="/">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center gap-3 bg-white/60 backdrop-blur-md border border-gold-start/30 rounded-full px-10 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#5C1A1A] shadow-sm hover:bg-gold-start/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return To Temple
        </motion.div>
      </Link>
    </div>
  );
}
