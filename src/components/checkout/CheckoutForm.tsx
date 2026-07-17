"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gift, MapPin, User, Phone, Mail, Box, Sparkles, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function CheckoutForm() {
  const [isGift, setIsGift] = useState(false);
  const [selectedPackaging, setSelectedPackaging] = useState("standard");

  return (
    <div className="flex flex-col gap-10">
      
      {/* ── DELIVERY DETAILS ── */}
      <section className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-gold-start/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
        <h3 className="font-display text-2xl font-bold text-[#5C1A1A] mb-6 flex items-center gap-3 border-b border-gold-start/15 pb-4">
          <MapPin className="w-5 h-5 text-gold-start" /> Delivery Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray group-focus-within:text-gold-start transition-colors" />
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full bg-white/60 border border-gold-start/20 rounded-xl py-3.5 pl-11 pr-4 text-sm text-charcoal focus:outline-none focus:border-gold-start focus:ring-1 focus:ring-gold-start/50 transition-all placeholder:text-warm-gray/60"
            />
          </div>
          
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray group-focus-within:text-gold-start transition-colors" />
            <input 
              type="tel" 
              placeholder="Mobile Number" 
              className="w-full bg-white/60 border border-gold-start/20 rounded-xl py-3.5 pl-11 pr-4 text-sm text-charcoal focus:outline-none focus:border-gold-start focus:ring-1 focus:ring-gold-start/50 transition-all placeholder:text-warm-gray/60"
            />
          </div>

          <div className="relative group md:col-span-2">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray group-focus-within:text-gold-start transition-colors" />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-white/60 border border-gold-start/20 rounded-xl py-3.5 pl-11 pr-4 text-sm text-charcoal focus:outline-none focus:border-gold-start focus:ring-1 focus:ring-gold-start/50 transition-all placeholder:text-warm-gray/60"
            />
          </div>

          <div className="relative group md:col-span-2">
            <MapPin className="absolute left-4 top-4 w-4 h-4 text-warm-gray group-focus-within:text-gold-start transition-colors" />
            <textarea 
              placeholder="Delivery Address" 
              rows={3}
              className="w-full bg-white/60 border border-gold-start/20 rounded-xl py-3.5 pl-11 pr-4 text-sm text-charcoal focus:outline-none focus:border-gold-start focus:ring-1 focus:ring-gold-start/50 transition-all placeholder:text-warm-gray/60 resize-none"
            />
          </div>

          <div className="relative group">
            <input 
              type="text" 
              placeholder="Pincode" 
              className="w-full bg-white/60 border border-gold-start/20 rounded-xl py-3.5 px-4 text-sm text-charcoal focus:outline-none focus:border-gold-start focus:ring-1 focus:ring-gold-start/50 transition-all placeholder:text-warm-gray/60"
            />
          </div>
        </div>
      </section>

      {/* ── DIVINE PACKAGING ── */}
      <section className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-gold-start/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
        <h3 className="font-display text-2xl font-bold text-[#5C1A1A] mb-6 flex items-center gap-3 border-b border-gold-start/15 pb-4">
          <Box className="w-5 h-5 text-gold-start" /> Premium Divine Packaging
        </h3>

        <div className="grid grid-cols-1 gap-4">
          
          <label className={`relative flex items-start gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer group ${selectedPackaging === 'standard' ? 'border-gold-start bg-gold-start/5 shadow-sm' : 'border-gold-start/15 bg-white/30 hover:border-gold-start/40'}`}>
            <input type="radio" name="packaging" checked={selectedPackaging === 'standard'} onChange={() => setSelectedPackaging('standard')} className="mt-1 w-4 h-4 accent-gold-start border-gold-start/30" />
            <div className="flex-1">
              <h4 className="text-[12px] uppercase tracking-widest font-bold text-charcoal mb-1">Standard Divine Packaging</h4>
              <p className="text-[10px] text-warm-gray">Premium protection ensuring your offering reaches safely.</p>
            </div>
            <span className="text-[10px] font-bold text-[#25D366]">Free</span>
          </label>

          <label className={`relative flex items-start gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer group ${selectedPackaging === 'festival' ? 'border-lotus bg-lotus/5 shadow-sm' : 'border-lotus/15 bg-white/30 hover:border-lotus/40'}`}>
            <input type="radio" name="packaging" checked={selectedPackaging === 'festival'} onChange={() => setSelectedPackaging('festival')} className="mt-1 w-4 h-4 accent-lotus border-lotus/30" />
            <div className="flex-1">
              <h4 className="text-[12px] uppercase tracking-widest font-bold text-[#5C1A1A] mb-1 flex items-center gap-2">
                Festival Packaging <Sparkles className="w-3 h-3 text-lotus" />
              </h4>
              <p className="text-[10px] text-warm-gray">Exquisite Janmashtami themed temple-inspired wrapping.</p>
            </div>
            <span className="text-[10px] font-bold text-lotus">+ ₹150</span>
          </label>

          <label className={`relative flex items-start gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer group ${selectedPackaging === 'gift' ? 'border-[#D4A853] bg-gradient-to-r from-[#D4A853]/10 to-[#E8850A]/10 shadow-sm' : 'border-gold-start/15 bg-white/30 hover:border-gold-start/40'}`}>
            <input type="radio" name="packaging" checked={selectedPackaging === 'gift'} onChange={() => setSelectedPackaging('gift')} className="mt-1 w-4 h-4 accent-[#D4A853] border-gold-start/30" />
            <div className="flex-1">
              <h4 className="text-[12px] uppercase tracking-widest font-bold text-saffron-deep mb-1">Premium Gift Packaging</h4>
              <p className="text-[10px] text-warm-gray">Luxury unboxing experience with a personalized message card.</p>
            </div>
            <span className="text-[10px] font-bold text-saffron-deep">+ ₹250</span>
          </label>

        </div>
      </section>

      {/* ── OFFER THIS AS A GIFT ── */}
      <section className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-gold-start/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-lotus/10 blur-[40px] rounded-full pointer-events-none" />

        <div className="flex items-center justify-between mb-2 relative z-10">
          <div>
            <h3 className="font-display text-xl font-bold text-[#5C1A1A] flex items-center gap-2">
              <Gift className="w-5 h-5 text-lotus" /> Offer This With Love
            </h3>
            <p className="text-[10px] uppercase tracking-widest font-bold text-warm-gray mt-1">
              Would you like to offer this divine collection to your loved ones?
            </p>
          </div>
          
          <button 
            onClick={() => setIsGift(!isGift)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isGift ? 'bg-lotus' : 'bg-warm-gray/30'}`}
          >
            <motion.div 
              className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm"
              animate={{ x: isGift ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        <AnimatePresence>
          {isGift && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-gold-start/15 space-y-5 relative z-10">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray group-focus-within:text-lotus transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Recipient's Name" 
                    className="w-full bg-white/60 border border-gold-start/20 rounded-xl py-3.5 pl-11 pr-4 text-sm text-charcoal focus:outline-none focus:border-lotus focus:ring-1 focus:ring-lotus/50 transition-all placeholder:text-warm-gray/60"
                  />
                </div>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-warm-gray group-focus-within:text-lotus transition-colors" />
                  <textarea 
                    placeholder="Your Personal Message..." 
                    rows={3}
                    className="w-full bg-white/60 border border-gold-start/20 rounded-xl py-3.5 pl-11 pr-4 text-sm text-charcoal focus:outline-none focus:border-lotus focus:ring-1 focus:ring-lotus/50 transition-all placeholder:text-warm-gray/60 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

    </div>
  );
}
