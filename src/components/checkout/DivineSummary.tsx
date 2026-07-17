"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Tag, ShieldCheck, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MOCK_SUMMARY_ITEMS = [
  { id: 1, title: "Midnight Blue Zardozi Vastra", category: "Premium Krishna Poshak", price: 4100 },
  { id: 2, title: "Pure Gold Plated Peacock Mukut", category: "Premium Mukut", price: 8500 }
];

export default function DivineSummary() {
  const [blessingCode, setBlessingCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  const subtotal = 12600;
  const discount = isApplied ? 108 : 0;
  const total = subtotal - discount;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (blessingCode.toUpperCase() === "RADHE108") {
      setIsApplied(true);
    }
  };

  return (
    <div className="w-full bg-white/50 backdrop-blur-2xl border border-gold-start/30 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(212,168,83,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] sticky top-32 flex flex-col gap-8">
      
      {/* ── ESTIMATED DELIVERY (FESTIVAL AWARE) ── */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-lotus/10 via-lotus/5 to-transparent rounded-2xl p-5 border border-lotus/20 relative overflow-hidden"
      >
        <div className="absolute -right-4 -top-4 opacity-10">
          <Sparkles className="w-24 h-24 text-lotus" />
        </div>
        <div className="relative z-10">
          <h4 className="text-[12px] uppercase tracking-widest font-bold text-lotus mb-2 flex items-center gap-2">
            Wonderful News <Sparkles className="w-3.5 h-3.5" />
          </h4>
          <p className="text-sm text-charcoal font-medium mb-2 leading-relaxed">
            Your Divine Offering can reach before <span className="font-bold text-[#5C1A1A]">JANMASHTAMI</span>.
          </p>
          <div className="text-[10px] uppercase tracking-widest font-bold text-warm-gray">
            Estimated Delivery within 3 Days
          </div>
        </div>
      </motion.div>

      {/* ── YOUR DIVINE OFFERINGS ── */}
      <div>
        <h3 className="font-display text-xl font-bold text-charcoal mb-4 border-b border-gold-start/15 pb-4">
          Your Divine Offerings
        </h3>
        
        <div className="space-y-4">
          {MOCK_SUMMARY_ITEMS.map((item) => (
            <div key={item.id} className="flex justify-between items-start gap-4 group">
              <div>
                <div className="text-[8px] uppercase tracking-widest font-bold text-saffron-deep mb-0.5">
                  {item.category}
                </div>
                <div className="text-sm text-charcoal font-medium group-hover:text-gold-start transition-colors">
                  {item.title}
                </div>
              </div>
              <div className="text-sm font-bold text-charcoal shrink-0">
                ₹{item.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVINE BLESSINGS (COUPONS) ── */}
      <div className="pt-6 border-t border-gold-start/15">
        <h3 className="text-[10px] uppercase tracking-widest font-bold text-charcoal mb-3 flex items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-gold-start" /> Divine Blessings
        </h3>
        
        <form onSubmit={handleApply} className="relative flex items-center">
          <input 
            type="text" 
            value={blessingCode}
            onChange={(e) => setBlessingCode(e.target.value)}
            disabled={isApplied}
            placeholder="Enter Blessing Code" 
            className="w-full bg-white/60 border border-gold-start/20 rounded-xl py-3 pl-4 pr-24 text-sm uppercase text-charcoal focus:outline-none focus:border-gold-start transition-all disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={isApplied || !blessingCode}
            className="absolute right-2 px-4 py-1.5 rounded-lg bg-gold-start/10 text-[9px] uppercase tracking-widest font-bold text-gold-start hover:bg-gold-start hover:text-white transition-all disabled:opacity-50"
          >
            {isApplied ? "Applied" : "Apply"}
          </button>
        </form>
        
        {isApplied && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-[10px] uppercase tracking-widest font-bold text-[#25D366] flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> Radhe108 Blessing Applied (-₹108)
          </motion.div>
        )}
      </div>

      {/* ── TOTALS ── */}
      <div className="pt-6 border-t border-gold-start/15 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-warm-gray font-medium">Seva Amount</span>
          <span className="font-bold text-charcoal">₹{subtotal.toLocaleString()}</span>
        </div>
        
        {isApplied && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#25D366] font-medium">Divine Blessing</span>
            <span className="font-bold text-[#25D366]">-₹{discount}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-sm">
          <span className="text-warm-gray font-medium">Temple Delivery</span>
          <span className="font-bold text-[#25D366]">Complimentary</span>
        </div>
      </div>

      <div className="pt-6 border-t border-gold-start/20 flex justify-between items-end">
        <div>
          <div className="text-[10px] uppercase tracking-widest font-bold text-warm-gray mb-1">Total Divine Offering</div>
        </div>
        <div className="font-display text-3xl font-bold text-[#5C1A1A]">₹{total.toLocaleString()}</div>
      </div>

      {/* ── ACTION: OFFER WITH LOVE ── */}
      <div>
        <motion.button 
          whileHover={{ scale: 1.02, boxShadow: "0 15px 35px rgba(212,168,83,0.3)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4.5 px-6 rounded-2xl bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] bg-[length:200%_auto] text-white flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(212,168,83,0.25)] hover:bg-[position:right_center] transition-all duration-500 mb-4"
        >
          <Heart className="w-5 h-5 fill-current" />
          <span className="text-[12px] uppercase tracking-[0.2em] font-bold">Offer With Love</span>
        </motion.button>

        <div className="flex items-center justify-center gap-2 opacity-60">
          <ShieldCheck className="w-3.5 h-3.5 text-charcoal" />
          <span className="text-[9px] uppercase tracking-widest font-bold text-charcoal">Encrypted & Secure Seva</span>
        </div>
      </div>

    </div>
  );
}
