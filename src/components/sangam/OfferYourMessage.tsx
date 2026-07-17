"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, MessageSquare, Heart } from "lucide-react";

export default function OfferYourMessage() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-32 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-xl border border-gold-start/30 rounded-[40px] p-8 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.1)] relative"
      >
        <div className="text-center mb-12">
          <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
            Offer Your Message With Love
          </h3>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
            We Are Here To Guide You
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-gold-start/50 group-focus-within:text-saffron-deep transition-colors" />
              </div>
              <input
                type="text"
                placeholder="YOUR NAME"
                className="w-full bg-white/50 border border-gold-start/30 rounded-2xl py-4 pl-14 pr-6 text-sm font-medium text-charcoal outline-none focus:border-saffron-deep focus:ring-1 focus:ring-saffron-deep transition-all placeholder:text-[10px] placeholder:tracking-widest placeholder:text-warm-gray"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gold-start/50 group-focus-within:text-saffron-deep transition-colors" />
              </div>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-white/50 border border-gold-start/30 rounded-2xl py-4 pl-14 pr-6 text-sm font-medium text-charcoal outline-none focus:border-saffron-deep focus:ring-1 focus:ring-saffron-deep transition-all placeholder:text-[10px] placeholder:tracking-widest placeholder:text-warm-gray"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Phone className="w-5 h-5 text-gold-start/50 group-focus-within:text-saffron-deep transition-colors" />
              </div>
              <input
                type="tel"
                placeholder="WHATSAPP NUMBER"
                className="w-full bg-white/50 border border-gold-start/30 rounded-2xl py-4 pl-14 pr-6 text-sm font-medium text-charcoal outline-none focus:border-saffron-deep focus:ring-1 focus:ring-saffron-deep transition-all placeholder:text-[10px] placeholder:tracking-widest placeholder:text-warm-gray"
              />
            </div>
            
            <div className="relative group">
              <select className="w-full bg-white/50 border border-gold-start/30 rounded-2xl py-4 px-6 text-[10px] tracking-widest font-bold text-warm-gray outline-none focus:border-saffron-deep focus:ring-1 focus:ring-saffron-deep transition-all appearance-none cursor-pointer">
                <option value="" disabled selected>SELECT YOUR JOURNEY</option>
                <option value="offerings">DIVINE OFFERINGS</option>
                <option value="tracking">TRACK MY SEVA</option>
                <option value="custom">CUSTOM POSHAKS</option>
                <option value="festivals">FESTIVAL COLLECTIONS</option>
                <option value="guidance">DIVINE GUIDANCE</option>
                <option value="parivaar">PREM PARIVAAR</option>
              </select>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute top-5 left-6 flex items-start pointer-events-none">
              <MessageSquare className="w-5 h-5 text-gold-start/50 group-focus-within:text-saffron-deep transition-colors" />
            </div>
            <textarea
              placeholder="DIVINE MESSAGE"
              rows={4}
              className="w-full bg-white/50 border border-gold-start/30 rounded-2xl py-5 pl-14 pr-6 text-sm font-medium text-charcoal outline-none focus:border-saffron-deep focus:ring-1 focus:ring-saffron-deep transition-all placeholder:text-[10px] placeholder:tracking-widest placeholder:text-warm-gray resize-none"
            ></textarea>
          </div>

          <div className="text-center pt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full md:w-auto bg-gradient-to-r from-gold-start to-[#d4af37] text-white rounded-full px-16 py-5 text-[10px] uppercase tracking-[0.2em] font-bold shadow-[0_10px_30px_rgba(212,168,83,0.3)] hover:shadow-[0_15px_40px_rgba(212,168,83,0.4)] transition-all flex items-center justify-center gap-3 mx-auto"
            >
              <Heart className="w-4 h-4 fill-white" /> Offer With Love
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
