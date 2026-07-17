"use client";

import { motion } from "framer-motion";

export default function CreatorSangamMessage() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-32 px-6 relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
      
      {/* The Portrait of Devotion (Phase-15 styling) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 max-w-md relative"
      >
        <div className="absolute inset-0 bg-gold-start/20 rounded-[40px] rotate-3 blur-md scale-105" />
        <div className="absolute inset-0 bg-[#FFFBF4] rounded-[40px] border border-gold-start/40 -rotate-3" />
        
        <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden border border-white/40 shadow-xl bg-charcoal/5">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#5C1A1A]/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-0 right-0 text-center text-white px-4">
            <h4 className="font-display text-2xl font-bold tracking-wider drop-shadow-md">
              Akriti Sharma
            </h4>
            <p className="text-[9px] uppercase tracking-widest font-bold mt-1 text-gold-start drop-shadow-md">
              A Humble Servant Of Shri Radha Raman Ji
            </p>
          </div>
        </div>
      </motion.div>

      {/* The Message */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-1/2 text-center md:text-left"
      >
        <h4 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-8">
          JAI SHRI RADHE.
        </h4>
        
        <div className="space-y-6 text-charcoal/80 font-medium italic text-lg md:text-xl leading-relaxed mb-10">
          <p>
            Every Divine Message that reaches us is received with immense gratitude and love.
          </p>
          <p>
            May Shri Radha Raman Ji always guide your Divine Journey.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold text-[#8B6F4E] mb-8">
          <span>Bhakti.</span>
          <div className="hidden md:block w-4 h-[1px] bg-gold-start/40" />
          <span>Prem.</span>
          <div className="hidden md:block w-4 h-[1px] bg-gold-start/40" />
          <span>Seva.</span>
        </div>

        <div className="font-signature text-3xl text-[#5C1A1A]/80">
          ~ Akriti Sharma
        </div>
      </motion.div>
    </div>
  );
}
