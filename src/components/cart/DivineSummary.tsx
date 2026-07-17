"use client";

import { motion } from "framer-motion";
import { Gift, Heart, ShieldCheck, CreditCard } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface DivineSummaryProps {
  subtotal: number;
}

export default function DivineSummary({ subtotal }: DivineSummaryProps) {
  const [useDivinePackaging, setUseDivinePackaging] = useState(false);
  const packagingCost = 250;
  const shippingCost = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shippingCost + (useDivinePackaging ? packagingCost : 0);

  return (
    <div className="w-full bg-white/50 backdrop-blur-2xl border border-gold-start/30 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(212,168,83,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] sticky top-32">
      
      <h2 className="font-display text-2xl font-bold text-charcoal mb-8 pb-4 border-b border-gold-start/15">
        Complete Your Seva
      </h2>

      {/* ── Divine Packaging Toggle ── */}
      <label className="flex items-start gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer mb-8 bg-gradient-to-br from-[#FFF5E6]/50 to-transparent hover:border-gold-start/40 focus-within:border-gold-start ${useDivinePackaging ? 'border-gold-start bg-gold-start/5' : 'border-gold-start/10'}">
        <div className="pt-1">
          <input 
            type="checkbox"
            checked={useDivinePackaging}
            onChange={(e) => setUseDivinePackaging(e.target.checked)}
            className="w-5 h-5 accent-gold-start border-gold-start/30 rounded cursor-pointer"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-[12px] uppercase tracking-widest font-bold text-[#5C1A1A] flex items-center gap-2">
              <Gift className="w-4 h-4 text-gold-start" /> Divine Festival Packaging
            </h4>
            <span className="text-[10px] font-bold text-gold-start">₹{packagingCost}</span>
          </div>
          <p className="text-[10px] text-warm-gray leading-relaxed">
            Present your offering in a premium Vrindavan-themed handcrafted box adorned with lotus motifs and a divine blessing card.
          </p>
        </div>
      </label>

      {/* ── Totals ── */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-sm">
          <span className="text-warm-gray font-medium">Seva Amount</span>
          <span className="font-bold text-charcoal">₹{subtotal.toLocaleString()}</span>
        </div>
        
        {useDivinePackaging && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-warm-gray font-medium">Divine Packaging</span>
            <span className="font-bold text-charcoal">₹{packagingCost.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-sm">
          <span className="text-warm-gray font-medium">Temple Delivery</span>
          <span className="font-bold text-charcoal">
            {shippingCost === 0 ? <span className="text-[#25D366]">Complimentary</span> : `₹${shippingCost}`}
          </span>
        </div>
      </div>

      <div className="pt-6 border-t border-gold-start/20 mb-8 flex justify-between items-end">
        <div>
          <div className="text-[10px] uppercase tracking-widest font-bold text-warm-gray mb-1">Total Divine Offering</div>
          <div className="text-[10px] text-warm-gray">Inclusive of all taxes</div>
        </div>
        <div className="font-display text-3xl font-bold text-[#5C1A1A]">₹{total.toLocaleString()}</div>
      </div>

      {/* ── Action: Offer With Love (Checkout) ── */}
      <Link href="/checkout" className="block w-full">
        <motion.button 
          whileHover={{ scale: 1.02, boxShadow: "0 15px 35px rgba(212,168,83,0.3)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] bg-[length:200%_auto] text-white flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(212,168,83,0.25)] hover:bg-[position:right_center] transition-all duration-500 mb-4"
        >
          <Heart className="w-5 h-5 fill-current" />
          <span className="text-[11px] uppercase tracking-[0.15em] font-bold">Offer With Love</span>
        </motion.button>
      </Link>

      <Link href="/collections" className="block w-full text-center group">
        <span className="text-[10px] uppercase tracking-widest font-bold text-warm-gray group-hover:text-gold-start transition-colors underline decoration-transparent group-hover:decoration-gold-start/50 underline-offset-4">
          Continue Your Divine Journey
        </span>
      </Link>

      {/* ── Security / Trust Badges ── */}
      <div className="mt-8 pt-6 border-t border-gold-start/15 flex items-center justify-center gap-6 opacity-60">
        <div className="flex items-center gap-1.5" title="Secure Payment">
          <ShieldCheck className="w-4 h-4 text-charcoal" />
          <span className="text-[8px] uppercase tracking-widest font-bold text-charcoal">Secure</span>
        </div>
        <div className="w-[1px] h-4 bg-gold-start/30" />
        <div className="flex items-center gap-1.5" title="All Cards Accepted">
          <CreditCard className="w-4 h-4 text-charcoal" />
          <span className="text-[8px] uppercase tracking-widest font-bold text-charcoal">Verified</span>
        </div>
      </div>

    </div>
  );
}
