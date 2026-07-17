"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, ShoppingBag, Star, Crown, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface OfferingDetailsProps {
  title: string;
  price: string;
  category: string;
  deity: string;
  sizes: string[];
  isPremium?: boolean;
}

export default function OfferingDetails({ title, price, category, deity, sizes, isPremium }: OfferingDetailsProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="flex flex-col gap-8 h-full">
      
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8B6F4E]">
            {deity}
          </span>
          <span className="w-1 h-1 rounded-full bg-gold-start/50" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-saffron-deep">
            {category}
          </span>
        </div>
        
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#5C1A1A] leading-[1.1] mb-6">
          {title}
        </h1>

        <div className="flex items-end gap-4 border-b border-gold-start/15 pb-6">
          <div>
            <div className="text-[9px] uppercase tracking-widest font-bold text-warm-gray mb-1">Divine Offering</div>
            <div className="font-display text-3xl font-bold text-gold-start">{price}</div>
          </div>
          {isPremium && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-gold-start to-saffron mb-1.5 shadow-sm">
              <Crown className="w-3.5 h-3.5 text-white" />
              <span className="text-[9px] uppercase tracking-widest text-white font-bold">Premium Seva</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Craftsmanship / The Seva ── */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-5 border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal mb-4 flex items-center gap-2">
          <Star className="w-3.5 h-3.5 text-gold-start" />
          Craftsmanship & Seva
        </h3>
        <p className="text-xs md:text-sm text-warm-gray leading-relaxed mb-4">
          This divine offering has been painstakingly crafted by the skilled artisans of Vrindavan. Every stitch of zardozi, every placement of pearls, and every fold of silk is an expression of pure devotion (Bhakti), intended exclusively to adorn your beloved Thakurji.
        </p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-xs text-charcoal font-medium">
            <ShieldCheck className="w-4 h-4 text-[#25D366]" /> Handcrafted in Sri Vrindavan Dham
          </li>
          <li className="flex items-center gap-2 text-xs text-charcoal font-medium">
            <ShieldCheck className="w-4 h-4 text-[#25D366]" /> Premium Silk & Golden Zari
          </li>
        </ul>
      </div>

      {/* ── Size Selector ── */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal">Select Divine Size</h3>
          <button className="text-[9px] uppercase tracking-widest font-bold text-gold-start hover:text-saffron transition-colors underline decoration-gold-start/30 underline-offset-4">
            Size Guide
          </button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-5 py-3 rounded-xl border-2 text-[11px] uppercase tracking-widest font-bold transition-all duration-300 ${
                selectedSize === size
                  ? "border-gold-start bg-gold-start/10 text-[#5C1A1A] shadow-[0_4px_15px_rgba(212,168,83,0.15)]"
                  : "border-white/60 bg-white/40 text-warm-gray hover:border-gold-start/40 hover:text-charcoal"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-4">
        
        <motion.button 
          whileHover={{ scale: 1.02, boxShadow: "0 15px 35px rgba(212,168,83,0.3)" }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] bg-[length:200%_auto] text-white flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(212,168,83,0.25)] hover:bg-[position:right_center] transition-all duration-500"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[11px] uppercase tracking-[0.15em] font-bold">Add To Divine Cart</span>
        </motion.button>
        
        <div className="flex gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="w-14 h-14 rounded-2xl bg-white/60 backdrop-blur-md border border-lotus/20 flex items-center justify-center hover:bg-white transition-all shadow-sm"
            title="Add to Beloved Collections"
          >
            <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? "text-lotus fill-lotus" : "text-warm-gray"}`} />
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center hover:bg-[#25D366] group transition-all shadow-sm"
            title="Inquire via WhatsApp"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors" />
          </motion.button>
        </div>
      </div>
      
      {/* ── Trust Badges ── */}
      <div className="flex items-center justify-between pt-6 border-t border-gold-start/15">
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-widest font-bold text-warm-gray">Shipping</div>
          <div className="text-[9px] font-bold text-charcoal mt-1">Pan India Delivery</div>
        </div>
        <div className="w-[1px] h-6 bg-gold-start/20" />
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-widest font-bold text-warm-gray">Returns</div>
          <div className="text-[9px] font-bold text-charcoal mt-1">7 Day Temple Return</div>
        </div>
        <div className="w-[1px] h-6 bg-gold-start/20" />
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-widest font-bold text-warm-gray">Support</div>
          <div className="text-[9px] font-bold text-charcoal mt-1">24/7 Devotee Care</div>
        </div>
      </div>

    </div>
  );
}
