"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

export default function AiDivineGuardian() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Graceful Alert 1 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-md border border-gold-start/50 rounded-3xl p-8 shadow-[0_10px_30px_rgba(212,168,83,0.1)] relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-200/30 to-transparent blur-[30px] pointer-events-none" />
          
          <div className="relative z-10 mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-rose-500">
                WONDERFUL NEWS
              </span>
            </div>
            
            <h4 className="font-display text-2xl font-bold text-[#5C1A1A] tracking-wider mb-4 leading-relaxed uppercase">
              95% of the Janmashtami collections have beautifully found their beloved homes.
            </h4>
            
            <p className="font-bold text-[#8B6F4E] tracking-widest uppercase text-sm mb-6">
              ONLY 125 DIVINE OFFERINGS REMAIN AVAILABLE.
            </p>

            <p className="font-medium italic text-charcoal/80">
              "May we lovingly prepare additional collections?"
            </p>
          </div>
          
          <div className="relative z-10">
            <button className="bg-transparent border border-gold-start/50 text-[#5C1A1A] rounded-full px-6 py-3 text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-gold-start/10 transition-colors inline-flex items-center gap-2">
              <Heart className="w-3 h-3" /> Prepare Collections
            </button>
          </div>
        </motion.div>

        {/* Graceful Alert 2 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-md border border-gold-start/30 rounded-3xl p-8 shadow-[0_10px_30px_rgba(212,168,83,0.05)] relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-gold-start/20 to-transparent blur-[30px] pointer-events-none" />
          
          <div className="relative z-10 mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-gold-start" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
                WONDERFUL NEWS
              </span>
            </div>
            
            <h4 className="font-display text-2xl font-bold text-[#5C1A1A] tracking-wider mb-4 leading-relaxed uppercase">
              Size-4 Krishna Poshaks have received +320% higher demand.
            </h4>
            
            <p className="font-bold text-[#8B6F4E] tracking-widest uppercase text-sm mb-6">
              EXPECTED AVAILABILITY: 2 DAYS.
            </p>

            <p className="font-medium italic text-charcoal/80">
              "Would you like to prepare additional Divine Offerings?"
            </p>
          </div>
          
          <div className="relative z-10">
            <button className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-6 py-3 text-[9px] uppercase tracking-[0.2em] font-bold hover:shadow-lg transition-all inline-flex items-center gap-2">
              <Heart className="w-3 h-3" /> Prepare Offerings
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
