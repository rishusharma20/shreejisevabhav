"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LiveWhatsAppSeva() {
  return (
    <div id="whatsapp" className="w-full max-w-3xl mx-auto mb-32 px-6 relative z-10 text-center pt-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="bg-white/60 backdrop-blur-xl border border-gold-start/30 rounded-[40px] p-10 md:p-14 shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-radial from-[#25D366]/10 to-transparent blur-[30px]" />
        
        <div className="w-16 h-16 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="w-8 h-8 text-[#25D366]" />
        </div>

        <h4 className="font-display text-2xl font-bold text-[#5C1A1A] tracking-wider mb-6">
          WhatsApp Seva Available
        </h4>
        
        <div className="w-12 h-[1px] bg-gold-start/50 mx-auto mb-6" />
        
        <p className="font-medium text-charcoal/80 text-lg italic leading-relaxed mb-10">
          May we lovingly assist you in choosing <br/> your Divine Offering?
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="bg-[#25D366] text-white rounded-full px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:bg-[#1DA851] transition-colors w-full sm:w-auto">
            Message Us
          </button>
          
          <Link href="/" className="w-full sm:w-auto">
            <button className="text-[10px] uppercase tracking-widest font-bold text-gold-start hover:text-[#5C1A1A] transition-colors flex items-center justify-center gap-2 w-full px-8 py-4">
              Continue Your Journey <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
