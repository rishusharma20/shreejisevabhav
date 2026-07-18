"use client";

import { motion } from "framer-motion";
import { HeartHandshake, Sparkles, Navigation } from "lucide-react";

export default function LiveReserveAnalytics() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="mb-10 text-center md:text-left">
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
          Live Divine Reserve Analytics
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Beautifully Preserved For Their Journeys
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-sm flex flex-col relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-gold-start/10 to-transparent blur-[20px]" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold-start/10 flex items-center justify-center text-gold-start">
              <Sparkles className="w-4 h-4" />
            </div>
            <h5 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase">
              Krishna Poshaks
            </h5>
          </div>
          <span className="font-display text-4xl font-bold text-[#5C1A1A] mb-2">1250</span>
          <p className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed">
            DIVINE OFFERINGS BEAUTIFULLY PREPARED
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-sm flex flex-col relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-gold-start/10 to-transparent blur-[20px]" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold-start/10 flex items-center justify-center text-gold-start">
              <Navigation className="w-4 h-4" />
            </div>
            <h5 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase">
              Premium Mukuts
            </h5>
          </div>
          <span className="font-display text-4xl font-bold text-[#5C1A1A] mb-2">820</span>
          <p className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed">
            DIVINE OFFERINGS READY TO CONTINUE THEIR JOURNEY
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-md border border-gold-start/50 rounded-3xl p-8 shadow-md flex flex-col relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-200/30 to-transparent blur-[30px]" />
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <h5 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase">
              Janmashtami Collections
            </h5>
          </div>
          <span className="font-display text-4xl font-bold text-[#5C1A1A] mb-2 relative z-10">2500</span>
          <p className="text-[9px] uppercase tracking-widest font-bold text-rose-500 leading-relaxed relative z-10">
            DIVINE OFFERINGS AWAITING THEIR BELOVED DEVOTEES
          </p>
        </motion.div>
      </div>
    </div>
  );
}
