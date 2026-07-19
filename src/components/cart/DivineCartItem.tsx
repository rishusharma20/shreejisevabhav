"use client";

import { motion } from "framer-motion";
import { Minus, Plus, X, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

interface DivineCartItemProps {
  id: string;
  title: string;
  price: string;
  quantity: number;
  size?: string;
  category: string;
  imageSrc?: string;
}

export default function DivineCartItem({ id, title, price, quantity: initialQty, size, category, imageSrc }: DivineCartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(initialQty);

  // Sync state if context changes
  useEffect(() => {
    setQuantity(initialQty);
  }, [initialQty]);

  const increase = () => {
    setQuantity(q => q + 1);
    updateQuantity(id, quantity + 1);
  };
  
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
      updateQuantity(id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(id);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl p-4 md:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_30px_rgba(212,168,83,0.05)] flex flex-col md:flex-row gap-6 items-start md:items-center group hover:border-gold-start/40 transition-colors"
    >
      {/* ── HD Thumbnail ── */}
      <Link href={`/divine-offering/${id}`} className="shrink-0 relative w-24 h-32 md:w-32 md:h-40 rounded-2xl overflow-hidden bg-cream/50 border border-gold-start/10 block">
        {imageSrc ? (
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            className="object-cover object-center group-hover:scale-110 transition-transform duration-700" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 bg-gradient-to-br from-[#FFF5E6] to-[#FFEED4]">
            <span className="text-[7px] uppercase tracking-widest text-gold-start font-bold">Divine Offering</span>
          </div>
        )}
      </Link>

      {/* ── Details ── */}
      <div className="flex-1 flex flex-col justify-between h-full w-full">
        <div className="flex justify-between items-start w-full gap-4">
          <div>
            <div className="text-[8px] uppercase tracking-[0.2em] font-bold text-saffron-deep mb-1">
              {category}
            </div>
            <Link href={`/divine-offering/${id}`}>
              <h3 className="font-display text-lg md:text-xl font-bold text-charcoal hover:text-[#5C1A1A] transition-colors leading-tight">
                {title}
              </h3>
            </Link>
            {size && (
              <div className="text-[10px] uppercase tracking-widest font-bold text-warm-gray mt-2">
                Size: <span className="text-charcoal">{size}</span>
              </div>
            )}
          </div>
          
          <button onClick={handleRemove} className="shrink-0 p-2 hover:bg-red-50 rounded-full transition-colors group/remove" title="Remove from Seva">
            <X className="w-4 h-4 text-warm-gray group-hover/remove:text-red-400 transition-colors" />
          </button>
        </div>

        <div className="flex items-end justify-between mt-6 pt-4 border-t border-gold-start/10">
          
          {/* Quantity Controls (Devotional Styling) */}
          <div className="flex items-center bg-white/60 backdrop-blur-md border border-gold-start/20 rounded-full h-10 px-1 shadow-sm">
            <button onClick={decrease} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-warm-gray hover:text-charcoal transition-all">
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-[11px] font-bold text-charcoal">{quantity}</span>
            <button onClick={increase} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-warm-gray hover:text-charcoal transition-all">
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="text-right">
            <div className="text-[8px] uppercase tracking-widest font-bold text-warm-gray mb-0.5">Seva Amount</div>
            <div className="font-display text-xl md:text-2xl font-bold text-gold-start">{price}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
