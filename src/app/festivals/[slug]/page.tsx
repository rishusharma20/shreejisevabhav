"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ArrowRight, Sparkles, Moon } from "lucide-react";
import { use } from "react";
import AiDivineRecommendations from "@/components/tracking/AiDivineRecommendations";

// Mock Data for Janmashtami theme implementation (Rule 11)
const FESTIVAL_DATA: Record<string, any> = {
  "janmashtami": {
    name: "Janmashtami",
    theme: {
      bgPrimary: "bg-[#0B132B]", // Midnight Blue
      bgSecondary: "bg-[#1C2541]", // Lighter Midnight Blue
      textPrimary: "text-white",
      textSecondary: "text-white/70",
      accent: "text-[#FCD34D]", // Bright Gold
      gradient: "from-[#FCD34D] to-[#F59E0B]", // Gold Gradient
      glow: "from-[#FCD34D]/20",
    },
    message: "Welcome the birth of Thakurji with the most exquisite Midnight Zardozi offerings, crafted exclusively for Janmashtami.",
    icon: <Moon className="w-12 h-12 text-[#FCD34D] opacity-80" />
  }
};

export default function DynamicFestivalPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const festival = FESTIVAL_DATA[slug] || FESTIVAL_DATA["janmashtami"]; // Fallback for demo
  const t = festival.theme;

  return (
    <main className={`min-h-screen w-full ${t.bgPrimary} relative overflow-hidden pb-24 pt-32 transition-colors duration-1000`}>
      
      {/* ── RULE 11: DYNAMIC ATMOSPHERE ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className={`absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b ${t.bgSecondary} to-transparent opacity-60`} />
        
        {/* Dynamic Glow */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 2 }}
          className={`absolute w-[80%] h-[80%] top-[10%] right-[-10%] bg-radial ${t.glow} via-transparent to-transparent filter blur-[120px]`} 
        />
        
        {/* Divine Midnight Stars / Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{ 
              width: Math.random() * 3 + 1, 
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: "0 0 10px 2px rgba(252,211,77,0.4)"
            }}
            animate={{ 
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      {/* ── DIVINE NAVIGATION ── */}
      <div className="w-full max-w-5xl mx-auto px-6 mb-12 relative z-50">
        <div className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-widest font-bold mb-8">
          <Link href="/" className={`${t.textSecondary} hover:${t.accent} transition-colors`}>Home</Link>
          <ChevronRight className={`w-3 h-3 ${t.textSecondary}`} />
          <Link href="/festivals" className={`${t.textSecondary} hover:${t.accent} transition-colors`}>Festival Collections</Link>
          <ChevronRight className={`w-3 h-3 ${t.textSecondary}`} />
          <span className={t.accent}>{festival.name}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center flex flex-col items-center justify-center"
        >
          <div className="mb-6">{festival.icon}</div>
          <h1 className={`text-[12px] uppercase tracking-[0.3em] font-bold ${t.accent} mb-3`}>
            Preparing For {festival.name}?
          </h1>
          <h2 className={`font-display text-4xl md:text-6xl font-extrabold ${t.textPrimary} tracking-wider mb-6 leading-tight`}>
            The {festival.name} <br/> Collection
          </h2>
          <p className={`text-sm md:text-base ${t.textSecondary} max-w-2xl font-medium italic mb-8`}>
            {festival.message}
          </p>
          
          <div className="flex items-center justify-center gap-6 text-[10px] uppercase tracking-widest font-bold">
            <div className={`px-6 py-2 rounded-full border border-white/20 ${t.textPrimary} backdrop-blur-md`}>
              125+ Divine Offerings
            </div>
            <div className={`px-6 py-2 rounded-full border border-white/20 ${t.textPrimary} backdrop-blur-md hidden md:block`}>
              Midnight Zardozi Series
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── FESTIVAL OFFERING CATEGORIES ── */}
      <div className="w-full max-w-5xl mx-auto px-6 relative z-10 flex flex-col gap-12 mt-16">
        
        <div className="text-center mb-4">
          <h3 className={`font-display text-2xl font-bold ${t.textPrimary} tracking-wide`}>
            Most Loved During {festival.name}
          </h3>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Category Card 1 */}
          <Link href="/krishna-vastra">
            <motion.div whileHover={{ y: -5 }} className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center hover:border-white/30 transition-all h-[280px] flex flex-col items-center justify-center group relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/40 z-0" />
              <div className="relative z-10">
                <Sparkles className={`w-8 h-8 ${t.accent} mx-auto mb-4 opacity-50 group-hover:opacity-100 transition-opacity`} />
                <h4 className={`font-display text-xl font-bold ${t.textPrimary} mb-2`}>Premium Krishna Poshaks</h4>
                <p className={`text-[10px] uppercase tracking-widest font-bold ${t.textSecondary} group-hover:${t.accent} transition-colors flex items-center justify-center gap-2`}>
                  Explore <ArrowRight className="w-3 h-3" />
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Category Card 2 */}
          <Link href="/jewellery">
            <motion.div whileHover={{ y: -5 }} className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center hover:border-white/30 transition-all h-[280px] flex flex-col items-center justify-center group relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/40 z-0" />
              <div className="relative z-10">
                <Sparkles className={`w-8 h-8 ${t.accent} mx-auto mb-4 opacity-50 group-hover:opacity-100 transition-opacity`} />
                <h4 className={`font-display text-xl font-bold ${t.textPrimary} mb-2`}>Mukut & Morpankh</h4>
                <p className={`text-[10px] uppercase tracking-widest font-bold ${t.textSecondary} group-hover:${t.accent} transition-colors flex items-center justify-center gap-2`}>
                  Explore <ArrowRight className="w-3 h-3" />
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Category Card 3 */}
          <Link href="/jewellery">
            <motion.div whileHover={{ y: -5 }} className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center hover:border-white/30 transition-all h-[280px] flex flex-col items-center justify-center group relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/40 z-0" />
              <div className="relative z-10">
                <Sparkles className={`w-8 h-8 ${t.accent} mx-auto mb-4 opacity-50 group-hover:opacity-100 transition-opacity`} />
                <h4 className={`font-display text-xl font-bold ${t.textPrimary} mb-2`}>Festival Packaging</h4>
                <p className={`text-[10px] uppercase tracking-widest font-bold ${t.textSecondary} group-hover:${t.accent} transition-colors flex items-center justify-center gap-2`}>
                  Explore <ArrowRight className="w-3 h-3" />
                </p>
              </div>
            </motion.div>
          </Link>

        </div>

      </div>
    </main>
  );
}
