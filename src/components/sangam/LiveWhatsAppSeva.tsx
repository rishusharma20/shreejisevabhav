"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

const SEVA_TOPICS = [
  "Festival Collections",
  "Divine Guidance",
  "Track My Seva",
  "Size Assistance",
  "Custom Collections"
];

export default function LiveWhatsAppSeva() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-32 px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-[#25D366]/10 to-[#128C7E]/20 backdrop-blur-xl border border-[#25D366]/30 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(37,211,102,0.15)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#25D366]/20 to-transparent blur-[50px] pointer-events-none" />
        
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-md">
          <MessageCircle className="w-8 h-8 text-[#25D366]" />
        </div>

        <h4 className="font-display text-3xl font-extrabold text-[#128C7E] tracking-wider mb-6">
          LIVE WHATSAPP SEVA
        </h4>
        
        <div className="w-12 h-[1px] bg-[#25D366]/50 mx-auto mb-8" />
        
        <div className="font-medium italic text-lg md:text-xl text-[#075E54] leading-relaxed max-w-xl mx-auto mb-10">
          <p>Available Daily</p>
          <p>for lovingly assisting your Divine Journey.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mb-12 flex-wrap">
          {SEVA_TOPICS.map((topic, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#128C7E]">
                {topic}
              </span>
              {idx < SEVA_TOPICS.length - 1 && (
                <div className="hidden md:block w-3 h-[1px] bg-[#25D366]/50" />
              )}
            </div>
          ))}
        </div>

        <Link href="#">
          <button className="bg-[#25D366] text-white rounded-full px-12 py-5 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg hover:bg-[#128C7E] transition-colors">
            Continue Your Journey
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
