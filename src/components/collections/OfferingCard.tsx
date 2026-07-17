"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, ShoppingBag, Eye, Star, Sparkles } from "lucide-react";
import Image from "next/image";

interface OfferingCardProps {
  id: string | number;
  title: string;
  price: string;
  imageSrc?: string;
  category: string;
  sizes: string[];
  isPremium?: boolean;
  festival?: string;
}

export default function OfferingCard({ 
  title, 
  price, 
  imageSrc, 
  category, 
  sizes,
  isPremium,
  festival
}: OfferingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(212,168,83,0.15)" }}
      className="group relative bg-white/40 backdrop-blur-2xl border border-gold-start/20 hover:border-gold-start/50 rounded-3xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-500 flex flex-col h-full"
    >
      {/* ── Badges ── */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 items-start">
        {isPremium && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D4A853] to-[#E8850A] shadow-md border border-white/20">
            <Star className="w-3 h-3 text-white fill-white" />
            <span className="text-[8px] uppercase tracking-widest text-white font-bold">Premium Devotion</span>
          </div>
        )}
        {festival && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-[#5C1A1A]/20">
            <Sparkles className="w-3 h-3 text-[#5C1A1A]" />
            <span className="text-[8px] uppercase tracking-widest text-[#5C1A1A] font-bold">{festival} Special</span>
          </div>
        )}
      </div>

      {/* ── Wishlist Button ── */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center border border-gold-start/30 shadow-sm"
      >
        <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? "text-lotus fill-lotus" : "text-warm-gray"}`} />
      </motion.button>

      {/* ── Image Container ── */}
      <div className="relative w-full aspect-[4/5] bg-cream/50 overflow-hidden">
        <div className="absolute inset-0 bg-gold-start/5 blur-[20px] pointer-events-none z-0" />
        
        {imageSrc ? (
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            className={`object-cover object-center transition-transform duration-1000 ease-out z-10 ${isHovered ? 'scale-110' : 'scale-100'}`} 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-10 transition-transform duration-1000 ease-out group-hover:scale-110">
            <div className="w-full h-full bg-gradient-to-b from-[#FFF5E6] to-[#FFEED4] flex items-center justify-center">
              <span className="text-[10px] uppercase tracking-widest text-gold-start font-bold opacity-70">Divine Offering</span>
            </div>
          </div>
        )}
        
        {/* Floating petals purely on hover for visual delight */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`hp-${i}`}
                  initial={{ opacity: 0, y: 10, rotate: 0 }}
                  animate={{ opacity: [0, 0.8, 0], y: -80, rotate: 180 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, delay: i * 0.2 }}
                  className="absolute z-10 pointer-events-none"
                  style={{ left: `${30 + i * 20}%`, bottom: "10%" }}
                >
                  <svg width="12" height="12" viewBox="0 0 40 40" fill="none">
                    <path d="M20 5 C10 18 10 32 20 35 C30 32 30 18 20 5 Z" fill="#FFB7B2" opacity="0.8" />
                  </svg>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Hover Quick Actions Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-[#5C1A1A]/80 via-[#5C1A1A]/10 to-transparent z-10 flex flex-col justify-end p-6"
            >
              <div className="flex gap-3">
                <motion.button 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                  className="flex-1 py-3 bg-white/95 backdrop-blur-md rounded-xl text-[9px] uppercase tracking-widest font-bold text-[#5C1A1A] hover:bg-white hover:shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Divine Details
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Content Section ── */}
      <div className="p-6 flex flex-col flex-1 relative z-20 bg-white/40">
        <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-saffron-deep mb-2">
          {category}
        </div>
        
        <h3 className="font-display text-lg text-charcoal font-bold leading-tight mb-2 group-hover:text-[#5C1A1A] transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-[10px] text-warm-gray italic font-medium mb-4 line-clamp-1 group-hover:text-gold-start transition-colors">
          Lovingly handcrafted with fine silk & golden zardozi.
        </p>

        {/* Available Sizes */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[9px] uppercase tracking-widest text-warm-gray font-bold">Sizes:</span>
          <div className="flex gap-1.5 flex-wrap">
            {sizes.map((size) => (
              <span key={size} className="px-2 py-1 rounded-md border border-gold-start/20 text-[9px] font-bold text-charcoal bg-white/50 group-hover:border-gold-start/40 transition-colors">
                {size}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gold-start/15 group-hover:border-gold-start/30 transition-colors flex items-center justify-between">
          <div>
            <div className="text-[8px] uppercase tracking-widest text-warm-gray font-bold mb-0.5 group-hover:text-charcoal transition-colors">Divine Offering</div>
            <div className="font-display text-xl font-bold text-gold-start">{price}</div>
          </div>
          
          <div className="flex gap-2 relative z-30">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
              title="Inquire via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1, boxShadow: "0 4px 15px rgba(212,168,83,0.3)" }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A853] to-[#E8850A] text-white flex items-center justify-center shadow-md border border-white/20"
              title="Add To My Seva"
            >
              <ShoppingBag className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
