"use client";

import { motion } from "framer-motion";
import { Moon, Sun, Star } from "lucide-react";

export default function DivineCalendar() {
  return (
    <div className="w-full max-w-5xl mx-auto mb-32 px-6 relative z-10">
      
      <div className="text-center mb-16">
        <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          The Divine Calendar
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Today's Tithi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/60 backdrop-blur-md border border-gold-start/30 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm"
        >
          <Sun className="w-8 h-8 text-amber-500 mb-6" />
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-warm-gray mb-2">Today&apos;s Tithi</h4>
          <p className="font-display text-2xl font-bold text-[#5C1A1A]">Shukla Paksha Ekadashi</p>
        </motion.div>

        {/* Kartik Maas Highlight (Active) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-[#5C1A1A] to-[#8B2B2B] rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_15px_30px_rgba(92,26,26,0.3)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-radial from-gold-start/20 to-transparent blur-[20px]" />
          <Star className="w-8 h-8 text-gold-start mb-6 relative z-10" />
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/70 mb-2 relative z-10">Ongoing Month</h4>
          <p className="font-display text-3xl font-bold text-white relative z-10">Kartik Maas</p>
        </motion.div>

        {/* Upcoming */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/60 backdrop-blur-md border border-gold-start/30 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm"
        >
          <Moon className="w-8 h-8 text-slate-500 mb-6" />
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-warm-gray mb-2">Upcoming</h4>
          <p className="font-display text-2xl font-bold text-[#5C1A1A]">Sharad Poornima</p>
        </motion.div>

      </div>
    </div>
  );
}
