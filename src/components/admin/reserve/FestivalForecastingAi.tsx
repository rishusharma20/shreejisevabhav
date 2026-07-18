"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FestivalForecastingAi() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-xl border border-gold-start/40 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.1)] relative overflow-hidden flex flex-col md:flex-row gap-12 items-center"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-rose-200/30 to-transparent blur-[50px] pointer-events-none" />
        
        <div className="flex-1 relative z-10 w-full">
          <div className="inline-flex items-center gap-3 bg-white border border-gold-start/30 rounded-full px-6 py-2 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-gold-start" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#5C1A1A]">
              THE DIVINE FESTIVAL FORECASTING AI
            </span>
          </div>
          
          <h4 className="font-display text-2xl md:text-3xl font-bold text-[#5C1A1A] tracking-wider mb-6">
            JANMASHTAMI IS AFTER 12 DAYS. WONDERFUL NEWS.
          </h4>
          
          <div className="w-12 h-[1px] bg-gold-start/50 mb-8" />
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-rose-500" />
              <span className="font-bold text-[#5C1A1A] text-xl tracking-wider">EXPECTED DIVINE JOURNEYS: 15,200</span>
            </div>
          </div>

          <div className="mb-10">
             <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-4">EXPECTED DEMAND:</p>
             <div className="flex flex-wrap gap-3">
               {["Krishna Poshaks", "Premium Mukuts", "Morpankh", "Divine Jewellery", "Premium Packaging"].map((item, idx) => (
                 <span key={idx} className="bg-gold-start/5 border border-gold-start/20 text-[#5C1A1A] text-[9px] uppercase tracking-widest font-bold px-4 py-2 rounded-full shadow-sm">
                   {item}
                 </span>
               ))}
             </div>
          </div>
          
          <p className="font-medium italic text-lg text-charcoal/80 leading-relaxed mb-8">
            "Would You Like To Lovingly Prepare Additional Collections?"
          </p>
          
          <Link href="/admin/treasury/prepare">
            <button className="bg-transparent border border-gold-start/50 text-[#5C1A1A] rounded-full px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold-start/10 transition-colors inline-flex items-center gap-2">
              Prepare Collections <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="flex-1 w-full bg-gradient-to-br from-[#FFFBF4] to-white border border-gold-start/30 rounded-3xl p-8 relative z-10">
          <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8B6F4E] mb-8 border-b border-gold-start/20 pb-4 text-center">
            AI Intelligence Factors
          </h5>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              "Last 5 Years of Data",
              "User Behaviour",
              "Festival Trends",
              "Seasonal Patterns",
              "Regional Demands",
              "Previous Journeys"
            ].map((factor, idx) => (
              <div key={idx} className="p-4 bg-white rounded-2xl border border-gold-start/20 shadow-sm text-center flex items-center justify-center h-20">
                <span className="text-[9px] font-bold text-[#5C1A1A] uppercase tracking-widest leading-relaxed">
                  {factor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
