"use client";

import { motion } from "framer-motion";
import WardrobeHero from "@/components/collections/WardrobeHero";
import DivineFilters from "@/components/collections/DivineFilters";
import OfferingCard from "@/components/collections/OfferingCard";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Crown, Sparkles } from "lucide-react";

// Premium floating lotus petals
const floatingPetals = [
  { id: 1, left: "10%", delay: 0, size: 28, duration: 12 },
  { id: 2, left: "85%", delay: 2.5, size: 24, duration: 15 },
  { id: 3, left: "45%", delay: 5.5, size: 20, duration: 10 },
  { id: 4, left: "75%", delay: 8, size: 32, duration: 14 },
  { id: 5, left: "20%", delay: 4, size: 22, duration: 13 },
];



import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function DivineWardrobePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const colRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/collections/divine-wardrobe`);
        const colData = await colRes.json();
        if (colData.success && colData.data.collection) {
          const prodRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/products/collection/${colData.data.collection._id}`);
          const prodData = await prodRes.json();
          if (prodData.success) {
            setProducts(prodData.data.products);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-24">
      
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 2 }}
          className="absolute w-[120%] h-[60%] top-[-10%] left-[-10%] bg-radial from-[#FFF3DF] via-[#FFEED4]/40 to-transparent filter blur-3xl" 
        />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 2, delay: 0.5 }}
          className="absolute w-[100%] h-[60%] bottom-[-20%] right-[-10%] bg-radial from-[#FFF5E6] via-[#FFF3DF]/50 to-transparent filter blur-3xl" 
        />
        
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-gold-start/30"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -60, 0], opacity: [0.1, 0.6, 0.1], scale: [1, 1.5, 1] }}
            transition={{ duration: 6 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 4 }}
          />
        ))}

        {floatingPetals.map((petal) => (
          <motion.div
            key={`petal-${petal.id}`}
            className="absolute"
            style={{ left: petal.left, top: "-10%" }}
            animate={{ y: ["0vh", "120vh"], x: [0, 50, -50, 0], rotate: [0, 180, 360] }}
            transition={{ duration: petal.duration, repeat: Infinity, ease: "linear", delay: petal.delay }}
          >
            <svg width={petal.size} height={petal.size} viewBox="0 0 40 40" fill="none">
              <path d="M20 5 C10 18 10 32 20 35 C30 32 30 18 20 5 Z" fill="#FFB7B2" opacity="0.4" />
            </svg>
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
        <Link href="/" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Collections</Link>
        <ChevronRight className="w-3 h-3 text-gold-start/50" />
        <span className="text-saffron-deep">Radha Dresses</span>
      </motion.div>

      {/* ── HERO SECTION ── */}
      <WardrobeHero />

      {/* ── DIVINE FILTERS ── */}
      <DivineFilters />

      {/* ── ALL OFFERINGS GRID ── */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 mb-24">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-gold-start animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-warm-gray">No divine offerings available at this moment.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-10">
            {products.map((offering, idx) => (
              <motion.div
                key={offering._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <OfferingCard 
                  id={offering._id}
                  title={offering.name}
                  price={`₹${offering.price || 0}`}
                  imageSrc={offering.images?.[0] ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${offering.images[0]}` : undefined}
                  category={offering.category || "Divine Offering"}
                  sizes={[]}
                  isPremium={offering.isFeatured}
                  festival={offering.festivalId}
                  slug={offering.slug}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── MOST LOVED BY DEVOTEES ── */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 mb-24 pt-10 border-t border-gold-start/15">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">Most Loved By Devotees</h2>
            <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E]">Cherished selections from Radha Rani's Wardrobe</p>
          </div>
          <Link href="/divine-wardrobe">
            <button className="px-6 py-2.5 bg-white/50 backdrop-blur-md border border-gold-start/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-charcoal hover:bg-white hover:shadow-[0_10px_20px_rgba(212,168,83,0.15)] transition-all">
              View All Offerings
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-10">
          {!loading && products.slice(0, 3).map((offering, idx) => (
            <motion.div key={`loved-${offering._id}`} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
              <OfferingCard 
                id={offering._id}
                title={offering.name}
                price={`₹${offering.price || 0}`}
                imageSrc={offering.images?.[0] ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${offering.images[0]}` : undefined}
                category={offering.category || "Divine Offering"}
                sizes={[]}
                isPremium={offering.isFeatured}
                festival={offering.festivalId}
                slug={offering.slug}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CONTINUE YOUR DIVINE JOURNEY ── */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 pt-16 border-t border-gold-start/15">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">Continue Your Divine Journey</h2>
          <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E]">Explore other sacred offerings for Thakurji</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Krishna Vastra */}
          <Link href="/krishna-vastra">
            <motion.div whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(212,168,83,0.15)" }} className="relative h-48 rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1815] to-[#2D2A26] z-0" />
              <div className="absolute inset-0 bg-gold-start/10 blur-[20px] group-hover:bg-gold-start/20 transition-colors z-0" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-6 border border-gold-start/20 rounded-3xl group-hover:border-gold-start/40 transition-colors">
                <Crown className="w-8 h-8 text-gold-start mb-3" />
                <h3 className="font-display text-xl font-bold text-white tracking-widest uppercase mb-1">Krishna Vastra</h3>
                <p className="text-[10px] text-warm-gray uppercase tracking-widest">Divine Attire for Thakurji</p>
              </div>
            </motion.div>
          </Link>
          
          {/* Jewellery Recommendations */}
          <Link href="/jewellery">
            <motion.div whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(255,183,178,0.15)" }} className="relative h-48 rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl z-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] group-hover:border-lotus/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-6">
                <Sparkles className="w-8 h-8 text-lotus mb-3" />
                <h3 className="font-display text-xl font-bold text-charcoal tracking-widest uppercase mb-1">Sacred Jewellery</h3>
                <p className="text-[10px] text-warm-gray uppercase tracking-widest">Handcrafted Temple Ornaments</p>
              </div>
            </motion.div>
          </Link>

          {/* My Seva / Track Orders */}
          <Link href="/my-seva">
            <motion.div whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(212,168,83,0.15)" }} className="relative h-48 rounded-3xl overflow-hidden group lg:col-span-1 md:col-span-2">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] bg-[length:200%_auto] opacity-90 group-hover:bg-[position:right_center] transition-all duration-700 z-0" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-6 border border-white/20 rounded-3xl">
                <ArrowLeft className="w-6 h-6 text-white mb-2 transform rotate-135 opacity-0 group-hover:opacity-100 transition-opacity absolute top-6 right-6" />
                <h3 className="font-display text-2xl font-bold text-white tracking-widest uppercase mb-2">My Seva</h3>
                <p className="text-[11px] text-white/90 uppercase tracking-widest font-bold">Track Your Offerings & Journey</p>
              </div>
            </motion.div>
          </Link>

        </div>
      </div>

      {/* ── BOTTOM DECORATIVE MANDALA ── */}
      <div className="mt-24 flex justify-center opacity-40 relative z-10">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" stroke="#D4A853" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="40" stroke="#D4A853" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="32" stroke="#E8850A" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" stroke="#D4A853" strokeWidth="0.5" />
        </svg>
      </div>

    </main>
  );
}
