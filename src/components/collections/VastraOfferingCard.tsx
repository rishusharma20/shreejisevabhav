"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, ShoppingBag, Eye, Star, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface VastraOfferingCardProps {
  id: string | number;
  title: string;
  price: string;
  imageSrc?: string;
  category: string;
  sizes: string[];
  isPremium?: boolean;
  festival?: string;
  deity?: string;
  slug?: string;
}

export default function VastraOfferingCard({ 
  id,
  title, 
  price, 
  imageSrc, 
  category, 
  sizes,
  isPremium,
  festival,
  deity = "Shri Radha Raman Ji",
  slug
}: VastraOfferingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(30,58,138,0.15)" }}
      className="group relative bg-white/40 backdrop-blur-2xl border border-gold-start/20 hover:border-[#1E3A8A]/40 rounded-3xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-500 flex flex-col h-full"
    >
      {/* ── Badges ── */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 items-start">
        {isPremium && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#2A3A6A] shadow-md border border-white/20">
            <Star className="w-3 h-3 text-gold-start fill-gold-start" />
            <span className="text-[8px] uppercase tracking-widest text-white font-bold">Premium Devotion</span>
          </div>
        )}
        {festival && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-[#E8850A]/30">
            <Sparkles className="w-3 h-3 text-[#E8850A]" />
            <span className="text-[8px] uppercase tracking-widest text-[#E8850A] font-bold">{festival} Special</span>
          </div>
        )}
      </div>



      {/* ── Image Container ── */}
      <div className="relative w-full aspect-[4/5] bg-cream/50 overflow-hidden">
        <div className="absolute inset-0 bg-[#1E3A8A]/5 blur-[20px] pointer-events-none z-0" />
        
        {imageSrc ? (
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            className={`object-cover object-center transition-transform duration-1000 ease-out z-10 ${isHovered ? 'scale-110' : 'scale-100'}`} 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-10 transition-transform duration-1000 ease-out group-hover:scale-110">
            <div className="w-full h-full bg-gradient-to-b from-[#F5F8FF] to-[#E6EEFF] flex items-center justify-center">
              <span className="text-[10px] uppercase tracking-widest text-[#1E3A8A]/50 font-bold">Divine Vastra</span>
            </div>
          </div>
        )}
        
        {/* Hover Particles for Mandir Theme */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`vp-${i}`}
                  initial={{ opacity: 0, y: 10, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0], y: -100, scale: [0.5, 1, 0.5] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 + Math.random(), delay: i * 0.15 }}
                  className="absolute z-10 pointer-events-none rounded-full bg-gold-start shadow-[0_0_8px_#D4A853]"
                  style={{ left: `${20 + Math.random() * 60}%`, bottom: "10%", width: "4px", height: "4px" }}
                />
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
              className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/80 via-[#1E3A8A]/10 to-transparent z-10 flex flex-col justify-end p-6"
            >
              <div className="flex gap-3">
                <Link href={`/product/${slug || id}`} className="flex-1">
                  <motion.button 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                    className="w-full py-3 bg-white/95 backdrop-blur-md rounded-xl text-[9px] uppercase tracking-widest font-bold text-[#1E3A8A] hover:bg-white hover:shadow-lg flex items-center justify-center gap-2 transition-all"
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
          <div className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#E8850A]">
            {category}
          </div>
        </div>
        
        <h3 className="font-display text-lg text-charcoal font-bold leading-tight mb-2 group-hover:text-[#1E3A8A] transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-[10px] text-warm-gray italic font-medium mb-4 line-clamp-1 group-hover:text-[#1E3A8A]/80 transition-colors">
          Lovingly handcrafted with finest silks & pure devotion.
        </p>

        {/* Available Sizes */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[9px] uppercase tracking-widest text-warm-gray font-bold">Sizes:</span>
          <div className="flex gap-1.5 flex-wrap">
            {sizes.map((size) => (
              <span key={size} className="px-2 py-1 rounded-md border border-[#1E3A8A]/10 text-[9px] font-bold text-charcoal bg-white/50 group-hover:border-[#1E3A8A]/30 transition-colors">
                {size}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-[#1E3A8A]/10 group-hover:border-[#1E3A8A]/30 transition-colors flex items-center justify-between">
          <div>
            <div className="text-[8px] uppercase tracking-widest text-warm-gray font-bold mb-0.5 group-hover:text-[#1E3A8A]/80 transition-colors">Divine Offering</div>
            <div className="font-display text-xl font-bold text-gold-start group-hover:text-[#1E3A8A] transition-colors">{price}</div>
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
              whileHover={{ scale: 1.1, boxShadow: "0 4px 15px rgba(30,58,138,0.3)" }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#2A3A6A] text-white flex items-center justify-center shadow-md border border-white/20"
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
