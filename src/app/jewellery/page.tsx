"use client";

import { motion } from "framer-motion";
import AlankaarHero from "@/components/collections/AlankaarHero";
import AlankaarFilters from "@/components/collections/AlankaarFilters";
import AlankaarOfferingCard from "@/components/collections/AlankaarOfferingCard";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Crown, Heart, Sparkles } from "lucide-react";

const MOCK_OFFERINGS = [
  {
    id: "al-1",
    title: "Pure Gold Plated Peacock Mukut",
    price: "₹8,500",
    category: "Mukut Collections",
    deity: "Shri Radha Raman Ji",
    isPremium: true,
  },
  {
    id: "al-2",
    title: "Lotus Pink Pearl Necklace Set",
    price: "₹4,200",
    category: "Necklace Collections",
    deity: "Shri Radha Rani",
  },
  {
    id: "al-3",
    title: "Janmashtami Special Diamond Bansuri",
    price: "₹6,100",
    category: "Bansuri Collections",
    deity: "Shri Radha Raman Ji",
    festival: "Janmashtami",
    isPremium: true,
  },
  {
    id: "al-4",
    title: "Golden Morpankh with Emeralds",
    price: "₹2,800",
    category: "Morpankh Collections",
    deity: "Shri Radha Raman Ji",
  },
  {
    id: "al-5",
    title: "Radhashtami Royal Pearl Choker",
    price: "₹5,400",
    category: "Pearl Collections",
    deity: "Shri Radha Rani",
    festival: "Radhashtami",
  },
  {
    id: "al-6",
    title: "Divine Alankaar Complete Shringar Set",
    price: "₹15,000",
    category: "Divine Alankaar",
    deity: "Shri Radha Rani & Thakurji",
    isPremium: true,
  },
];

export default function JewelleryPage() {
  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-24">
      
      {/* ── ATMOSPHERIC BACKGROUND (RATNA MANDIR STYLE) ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 2 }}
          className="absolute w-[120%] h-[60%] top-[-10%] left-[-10%] bg-radial from-[#FFF5F7] via-[#FFE8E8]/40 to-transparent filter blur-3xl" 
        />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 2, delay: 0.5 }}
          className="absolute w-[100%] h-[60%] bottom-[-20%] right-[-10%] bg-radial from-[#FFF5E6] via-[#FFF3DF]/50 to-transparent filter blur-3xl" 
        />
        
        {/* Floating sparkling gems */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`gem-${i}`}
            className="absolute"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ 
              y: [0, -40, 0], 
              opacity: [0.1, 0.8, 0.1], 
              scale: [0.5, 1.2, 0.5],
              rotate: [0, 90, 180]
            }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
          >
            <Sparkles className="w-2 h-2 text-lotus/40" />
          </motion.div>
        ))}
      </div>

      {/* ── DIVINE BREADCRUMBS ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 left-6 md:left-12 z-50 flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold"
      >
        <Link href="/" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Temple</Link>
        <ChevronRight className="w-3 h-3 text-gold-start/50" />
        <Link href="/collections" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Collections</Link>
        <ChevronRight className="w-3 h-3 text-gold-start/50" />
        <span className="text-lotus">Ratna Alankaar</span>
      </motion.div>

      {/* ── HERO SECTION ── */}
      <AlankaarHero />

      {/* ── DIVINE FILTERS ── */}
      <AlankaarFilters />

      {/* ── ALL OFFERINGS GRID ── */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-10">
          {MOCK_OFFERINGS.map((offering, idx) => (
            <motion.div
              key={offering.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <AlankaarOfferingCard {...offering} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── MOST LOVED BY DEVOTEES ── */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 mb-24 pt-10 border-t border-lotus/15">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">Most Loved By Devotees</h2>
            <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E]">Cherished jewels for the divine</p>
          </div>
          <Link href="/jewellery">
            <button className="px-6 py-2.5 bg-white/50 backdrop-blur-md border border-lotus/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-charcoal hover:bg-white hover:text-lotus hover:shadow-[0_10px_20px_rgba(255,183,178,0.2)] transition-all">
              View All Ornaments
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-10">
          {MOCK_OFFERINGS.slice(0, 3).map((offering, idx) => (
            <motion.div key={`loved-${offering.id}`} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
              <AlankaarOfferingCard {...offering} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CONTINUE YOUR DIVINE JOURNEY (CROSS-RECOMMENDATIONS) ── */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 pt-16 border-t border-lotus/15">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">Complete Your Divine Offering</h2>
          <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E]">Find the perfect Vastra to complement these ornaments</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Radha Dresses */}
          <Link href="/divine-wardrobe">
            <motion.div whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(255,183,178,0.15)" }} className="relative h-48 rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl z-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] group-hover:border-lotus/40 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFF5E6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-6">
                <Heart className="w-8 h-8 text-lotus mb-3" />
                <h3 className="font-display text-xl font-bold text-[#5C1A1A] tracking-widest uppercase mb-1">Radha Rani's Wardrobe</h3>
                <p className="text-[10px] text-warm-gray uppercase tracking-widest">Match with Divine Attire</p>
              </div>
            </motion.div>
          </Link>
          
          {/* Krishna Vastra */}
          <Link href="/krishna-vastra">
            <motion.div whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(30,58,138,0.15)" }} className="relative h-48 rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F5F8FF] to-[#E6EEFF] z-0" />
              <div className="absolute inset-0 bg-[#1E3A8A]/5 blur-[20px] group-hover:bg-[#1E3A8A]/10 transition-colors z-0" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-6 border border-[#1E3A8A]/10 rounded-3xl group-hover:border-[#1E3A8A]/30 transition-colors">
                <Crown className="w-8 h-8 text-[#1E3A8A] mb-3" />
                <h3 className="font-display text-xl font-bold text-[#1E3A8A] tracking-widest uppercase mb-1">Krishna Vastra</h3>
                <p className="text-[10px] text-warm-gray uppercase tracking-widest">Adorn Thakurji with Silk</p>
              </div>
            </motion.div>
          </Link>

          {/* My Seva / Track Orders */}
          <Link href="/my-seva">
            <motion.div whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(255,183,178,0.3)" }} className="relative h-48 rounded-3xl overflow-hidden group lg:col-span-1 md:col-span-2">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4A853] via-[#FFB7B2] to-[#D4A853] bg-[length:200%_auto] opacity-90 group-hover:bg-[position:right_center] transition-all duration-700 z-0" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-6 border border-white/20 rounded-3xl">
                <ArrowLeft className="w-6 h-6 text-white mb-2 transform rotate-135 opacity-0 group-hover:opacity-100 transition-opacity absolute top-6 right-6" />
                <h3 className="font-display text-2xl font-bold text-white tracking-widest uppercase mb-2">Track My Seva</h3>
                <p className="text-[11px] text-white/90 uppercase tracking-widest font-bold">Follow your offerings journey</p>
              </div>
            </motion.div>
          </Link>

        </div>
      </div>

      {/* ── BOTTOM DECORATIVE MANDALA ── */}
      <div className="mt-24 flex justify-center opacity-40 relative z-10">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" stroke="#FFB7B2" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="40" stroke="#FFB7B2" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="32" stroke="#D4A853" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" stroke="#FFB7B2" strokeWidth="0.5" />
        </svg>
      </div>

    </main>
  );
}
