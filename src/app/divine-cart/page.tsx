"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import DivineCartItem from "@/components/cart/DivineCartItem";
import DivineSummary from "@/components/cart/DivineSummary";
import CartRecommendations from "@/components/cart/CartRecommendations";
import { useCart } from "@/context/CartContext";
export default function DivineCartPage() {
  const { items, totalAmount } = useCart();


  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-24 pt-32">
      
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-60" />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 2 }}
          className="absolute w-[80%] h-[80%] top-[10%] right-[10%] bg-radial from-gold-start/20 via-[#FFF3DF]/50 to-transparent filter blur-[100px]" 
        />
        {/* Subtle floating petals */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`petal-cart-${i}`}
            className="absolute rounded-[40%_0_40%_0] bg-lotus/20 blur-[1px]"
            style={{ 
              width: Math.random() * 15 + 10, 
              height: Math.random() * 15 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              y: [0, -100], 
              opacity: [0, 0.8, 0], 
              rotate: [0, 180] 
            }}
            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      {/* ── DIVINE BREADCRUMBS ── */}
      <div className="w-full max-w-7xl mx-auto px-6 mb-8 relative z-50 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-widest font-bold">
          <Link href="/" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Temple</Link>
          <ChevronRight className="w-3 h-3 text-gold-start/50" />
          <span className="text-[#5C1A1A]">Complete Your Divine Seva</span>
        </div>
        
        <Link href="/collections" className="hidden md:flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-warm-gray hover:text-gold-start transition-colors group">
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Return to Collections
        </Link>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ── HEADER ── */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[#5C1A1A] leading-[1.1] mb-4">
            Your Divine Offerings
          </h1>
          <p className="text-sm md:text-base text-warm-gray max-w-2xl">
            Review the sacred offerings you have lovingly selected. Every item is handcrafted with pure devotion to adorn Thakurji.
          </p>
        </div>

        {/* ── LAYOUT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
          
          {/* LEFT: Offering Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <AnimatePresence>
              {items.length > 0 ? (
                items.map((item) => (
                  <DivineCartItem 
                    key={item.product.id} 
                    id={item.product.id}
                    title={item.product.name}
                    price={`₹${item.product.price.toLocaleString()}`}
                    quantity={item.quantity}
                    category={item.product.category || "Divine Offering"}
                    imageSrc={item.product.image}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl">
                  <p className="text-warm-gray mb-4">Your divine cart is empty.</p>
                  <Link href="/collections" className="text-gold-start font-bold underline">
                    Explore Offerings
                  </Link>
                </div>
              )}
            </AnimatePresence>
          </div>
          
          {/* RIGHT: Divine Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <DivineSummary subtotal={totalAmount} />
            </motion.div>
          </div>
        </div>

        {/* ── CROSS-RECOMMENDATIONS ── */}
        <CartRecommendations />

      </div>
    </main>
  );
}
