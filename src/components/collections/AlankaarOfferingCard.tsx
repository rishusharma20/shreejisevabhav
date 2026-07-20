"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, ShoppingBag, Eye, Star, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AlankaarOfferingCardProps {
  id: string | number;
  title: string;
  price: string;
  imageSrc?: string;
  category: string;
  isPremium?: boolean;
  festival?: string;
  deity?: string;
  slug?: string;
}

export default function AlankaarOfferingCard({ 
  id,
  title, 
  price, 
  imageSrc, 
  category, 
  isPremium,
  festival,
  deity = "Shri Radha Rani & Thakurji",
  slug
}: AlankaarOfferingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(255,183,178,0.2)" }}
      className="group relative bg-white/40 backdrop-blur-2xl border border-gold-start/20 hover:border-lotus/40 rounded-3xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-500 flex flex-col h-full"
    >
      {/* ── Badges ── */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 items-start">
        {isPremium && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D4A853] to-[#E8850A] shadow-md border border-white/20">
            <Star className="w-3 h-3 text-white fill-white" />
            <span className="text-[8px] uppercase tracking-widest text-white font-bold">Premium Ratna</span>
          </div>
        )}
        {festival && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-lotus/30">
            <Sparkles className="w-3 h-3 text-lotus" />
            <span className="text-[8px] uppercase tracking-widest text-[#5C1A1A] font-bold">{festival} Special</span>
          </div>
        )}
      </div>

      {/* ── Image Container ── */}
      <div className="relative w-full aspect-[4/5] bg-cream/50 overflow-hidden">
        <div className="absolute inset-0 bg-lotus/5 blur-[20px] pointer-events-none z-0" />
        
        {imageSrc && !imgError ? (
          <img 
            src={imageSrc} 
            alt={title} 
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-center transition-transform duration-1000 ease-out z-10 ${isHovered ? 'scale-110' : 'scale-100'}`} 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-10 transition-transform duration-1000 ease-out group-hover:scale-110">
            <div className="w-full h-full bg-gradient-to-b from-[#FFF5F7] to-[#FFE8E8]/50 flex flex-col items-center justify-center p-4 text-center">
              <span className="text-[10px] uppercase tracking-widest text-lotus font-bold opacity-80 mb-1">Divine Alankaar</span>
              <span className="text-[9px] text-[#8B6F4E] font-medium italic">{title}</span>
            </div>
          </div>
        )}
        
        {/* Hover Sparkles for Ratna Theme */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`ap-${i}`}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: -40, rotate: 180 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 + Math.random(), delay: i * 0.2 }}
                  className="absolute z-10 pointer-events-none"
                  style={{ left: `${20 + Math.random() * 60}%`, bottom: `${10 + Math.random() * 30}%` }}
                >
                  <Sparkles className="w-4 h-4 text-gold-start/80" />
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
                <Link href={`/product/${slug || id}`} className="flex-1">
                  <motion.button 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                    className="w-full py-3 bg-[#1A1815]/95 backdrop-blur-md rounded-xl text-[9px] uppercase tracking-widest font-bold text-gold-start hover:text-gold-end hover:bg-[#2D2A26] shadow-[0_0_15px_rgba(212,168,83,0.1)] hover:shadow-[0_0_20px_rgba(212,168,83,0.3)] flex items-center justify-center gap-2 transition-all border border-gold-start/20 hover:border-gold-start/40"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Details
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Content Section ── */}
      <div className="p-6 flex flex-col flex-1 relative z-20 bg-white/40">
        <div className="flex justify-between items-start mb-2">
          <div className="text-[8px] uppercase tracking-[0.2em] font-bold text-warm-gray">
            For {deity}
          </div>
          <div className="text-[8px] uppercase tracking-[0.2em] font-bold text-lotus">
            {category}
          </div>
        </div>
        
        <h3 className="font-display text-lg text-charcoal font-bold leading-tight mb-2 group-hover:text-[#5C1A1A] transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-[10px] text-warm-gray italic font-medium mb-4 line-clamp-1 group-hover:text-[#5C1A1A]/70 transition-colors">
          Sacred ornament handcrafted with pure devotion.
        </p>
        
        <div className="mt-auto pt-4 border-t border-lotus/15 group-hover:border-lotus/40 transition-colors flex items-center justify-between">
          <div>
            <div className="text-[8px] uppercase tracking-widest text-warm-gray font-bold mb-0.5 group-hover:text-charcoal transition-colors">Divine Offering</div>
            <div className="font-display text-xl font-bold text-gold-start group-hover:text-[#5C1A1A] transition-colors">{price}</div>
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
              whileHover={{ scale: 1.1, boxShadow: "0 4px 15px rgba(255,183,178,0.4)" }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A853] to-[#FFB7B2] text-white flex items-center justify-center shadow-md border border-white/20"
              title="Add To Divine Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
