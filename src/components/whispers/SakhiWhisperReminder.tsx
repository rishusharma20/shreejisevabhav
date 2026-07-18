"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SakhiWhisperReminder() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-32 px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-xl border border-rose-200/50 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(225,29,72,0.05)] relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial from-rose-100/40 via-transparent to-transparent blur-[60px] pointer-events-none" />
        
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center mx-auto mb-8 border border-rose-200 shadow-sm relative z-10">
          <MessageCircle className="w-8 h-8 text-rose-400" />
        </div>

        <h4 className="font-display text-2xl font-bold text-[#5C1A1A] tracking-wider mb-2 relative z-10">
          JAI SHRI RADHE RISHU.
        </h4>
        <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose-400 mb-6 relative z-10">
          SHREEJI DIVINE SAKHI
        </h5>
        
        <div className="w-12 h-[1px] bg-rose-200 mx-auto mb-8 relative z-10" />
        
        <div className="font-medium italic text-lg md:text-xl text-charcoal/80 leading-relaxed max-w-xl mx-auto mb-10 relative z-10">
          <p>
            Would you like me to lovingly remind you when the beautiful Janmashtami Collections arrive?
          </p>
        </div>

        <div className="relative z-10">
          <Link href="/">
            <button className="bg-gradient-to-r from-rose-400 to-rose-300 text-white rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2">
              Continue Your Journey <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
