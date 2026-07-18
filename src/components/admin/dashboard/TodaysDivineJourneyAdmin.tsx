"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Sparkles } from "lucide-react";

export default function TodaysDivineJourneyAdmin() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="mb-10 text-center md:text-left">
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
          Today's Divine Journey
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Guiding Offerings To Their Destinations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Shipped */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center mb-6 text-gold-start">
            <Send className="w-5 h-5" />
          </div>
          <span className="font-display text-4xl font-bold text-[#5C1A1A] mb-4">125</span>
          <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed">
            DIVINE OFFERINGS<br />ARE CURRENTLY<br />BEGINNING THEIR<br />DIVINE JOURNEY
          </p>
        </motion.div>

        {/* Delivered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-md border border-gold-start/50 rounded-3xl p-8 shadow-md flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-gold-start/20 to-transparent blur-[30px] pointer-events-none" />
          <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center mb-6 text-gold-start relative z-10">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="font-display text-4xl font-bold text-[#5C1A1A] mb-4 relative z-10">80</span>
          <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed relative z-10">
            DIVINE OFFERINGS<br />HAVE BEAUTIFULLY<br />ARRIVED
          </p>
        </motion.div>

        {/* Processing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center mb-6 text-gold-start">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-display text-4xl font-bold text-[#5C1A1A] mb-4">52</span>
          <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed">
            DIVINE OFFERINGS<br />ARE LOVINGLY BEING<br />PREPARED
          </p>
        </motion.div>
      </div>
    </div>
  );
}
