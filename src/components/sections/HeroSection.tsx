"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { LotusIcon, FullColorPeacockFeather, FullColorPinkLotus } from "@/components/icons/DevotionalIcons";
import { Shield, Sparkles, Truck, Heart, Gift } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   Floating Petal — slow drift animation behind deity image
   ═══════════════════════════════════════════════════════════════ */
function FloatingPetal({
  delay,
  x,
  y,
  size,
  rotation,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
  rotation: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -22, 6, -15, 0],
        x: [0, 10, -8, 12, 0],
        rotate: [rotation, rotation + 20, rotation - 15, rotation + 10, rotation],
        opacity: [0.15, 0.35, 0.25, 0.4, 0.15],
      }}
      transition={{
        duration: 12 + delay * 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size * 0.7,
          background: "radial-gradient(ellipse, rgba(255,180,140,0.6), rgba(255,200,160,0.2))",
          filter: "blur(0.5px)",
        }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Temple Bell — hanging from top with slow idle sway
   ═══════════════════════════════════════════════════════════════ */
function TempleBell({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`absolute top-0 ${side === "left" ? "left-6 lg:left-12" : "right-6 lg:right-12"} z-10 hidden lg:block`}
      style={{ transformOrigin: "top center" }}
    >
      <motion.div
        animate={{ rotate: [0, 2.5, -2.5, 1.5, -1.5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top center" }}
      >
        {/* Chain */}
        <div className="w-px h-20 mx-auto" style={{ background: "linear-gradient(to bottom, #D4A853, #B8943F)" }} />
        {/* Bell body */}
        <svg width="36" height="48" viewBox="0 0 36 48" fill="none" className="mx-auto -mt-1 filter drop-shadow-[0_4px_6px_rgba(184,148,63,0.25)]">
          <defs>
            <linearGradient id={`bell-grad-${side}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D4A853" />
              <stop offset="50%" stopColor="#F0D78C" />
              <stop offset="100%" stopColor="#B8943F" />
            </linearGradient>
          </defs>
          {/* Bell dome */}
          <path d="M18 4 C10 4 4 14 4 26 L4 32 L32 32 L32 26 C32 14 26 4 18 4Z" fill={`url(#bell-grad-${side})`} />
          {/* Bell rim */}
          <rect x="2" y="30" width="32" height="5" rx="2" fill="#B8943F" />
          {/* Clapper */}
          <circle cx="18" cy="40" r="3.5" fill="#C9A14A" />
          <rect x="17" y="34" width="2" height="6" fill="#B8943F" />
          {/* Top mount */}
          <circle cx="18" cy="4" r="3" fill="#D4A853" stroke="#B8943F" strokeWidth="1" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Hero Section — warm, golden, temple-lit, deity-present
   ═══════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    shouldReduceMotion
      ? {
          initial: { opacity: 1, y: 0 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.01 },
        }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: "easeOut" as const },
        };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden lg:h-[calc(100vh-104px)] min-h-[580px] flex items-center pt-4 pb-10 md:pt-6 md:pb-12 lg:pt-8 lg:pb-14"
        aria-label="Hero banner"
        style={{
          background: "linear-gradient(135deg, #FFF8EE 0%, #FDECD0 30%, #F7E0B5 55%, #FFF3E0 75%, #FFF8EE 100%)",
        }}
      >
        {/* Faint repeating damask/floral pattern overlay */}
        <div className="absolute inset-0 bg-mandala-texture pointer-events-none select-none opacity-[0.07]" />

        {/* Golden temple silhouettes & pillars watermark */}
        <div className="absolute left-0 bottom-0 top-0 w-[35%] opacity-[0.03] pointer-events-none select-none hidden lg:block">
          <svg className="w-full h-full text-gold-start" viewBox="0 0 100 200" fill="currentColor">
            {/* Left Column pillar */}
            <rect x="10" y="40" width="8" height="160" rx="1" />
            <rect x="6" y="36" width="16" height="5" />
            <path d="M 6 36 L 14 10 L 22 36 Z" />
            <rect x="8" y="196" width="12" height="4" />
            {/* Archway curves */}
            <path d="M 18 60 C 35 45 65 45 82 60 L 82 80 C 65 65 35 65 18 80 Z" />
          </svg>
        </div>

        {/* Warm golden radial glow behind deity area */}
        <div
          className="absolute top-0 right-0 w-[70%] h-full hidden lg:block pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 60% 50%, rgba(240,215,140,0.3) 0%, rgba(247,233,184,0.12) 40%, transparent 70%)",
          }}
        />

        {/* Temple bells hanging from top corners */}
        <TempleBell side="left" />
        <TempleBell side="right" />

        {/* Main content — structured in a flex-col layout to guarantee 100vh bounds */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-between py-2">
          {/* Part 1: Row with left and right column */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 flex-grow">
            {/* ── LEFT COLUMN: Copy block (~45% on desktop) ── */}
            <div className="flex-1 lg:max-w-[45%] text-center lg:text-left order-2 lg:order-1 relative z-20">
              {/* Eyebrow - Radhe Radhe */}
              <motion.p
                {...fadeUp(0.08)}
                className="font-display text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 text-gold-start font-semibold flex items-center justify-center lg:justify-start gap-2"
              >
                <span>✦</span> || RADHE RADHE || <span>✦</span>
              </motion.p>

              {/* H1 — rich maroon serif */}
              <motion.h1
                {...fadeUp(0.18)}
                spellCheck="false"
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] font-bold leading-[1.08] mb-3 select-none drop-shadow-sm"
                style={{ color: "#5C1A1A" }}
              >
                Shreeji <br className="hidden lg:block" />
                Seva Bhav
              </motion.h1>

              {/* Decorative divider: gold rule — lotus — gold rule */}
              <motion.div
                {...fadeUp(0.28)}
                className="flex items-center gap-3 mb-4 justify-center lg:justify-start animate-fade-in"
              >
                <span
                  className="h-px w-12 md:w-20"
                  style={{ background: "linear-gradient(to right, transparent, #D4A853)" }}
                />
                <LotusIcon size={20} className="text-gold-start" />
                <span
                  className="h-px w-12 md:w-20"
                  style={{ background: "linear-gradient(to left, transparent, #D4A853)" }}
                />
              </motion.div>

              {/* Tagline */}
              <motion.p
                {...fadeUp(0.38)}
                className="font-display text-lg sm:text-xl italic leading-relaxed mb-3 text-center lg:text-left"
                style={{ color: "#6B4226" }}
              >
                Divine Clothing & Jewellery for Your Beloved Thakurji
              </motion.p>

              {/* Descriptive details */}
              <motion.p
                {...fadeUp(0.48)}
                className="text-xs md:text-sm text-charcoal/80 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-4"
              >
                Every piece is stitched with devotion, arranged with love and offered for the seva of Shri Radha Raman Ji.
              </motion.p>

              {/* Three sacred devotion-focused lines */}
              <motion.div
                {...fadeUp(0.55)}
                className="flex flex-col items-center lg:items-start gap-2 mb-6 border-t border-b border-gold-start/15 py-3 max-w-md mx-auto lg:mx-0"
              >
                <div className="flex items-center gap-2.5 text-[10px] md:text-xs tracking-wider uppercase font-bold text-[#8B6F4E]">
                  <Sparkles size={10} className="text-gold-start shrink-0" />
                  <span>Every Thread is an Offering</span>
                </div>
                <div className="flex items-center gap-2.5 text-[10px] md:text-xs tracking-wider uppercase font-bold text-[#8B6F4E]">
                  <Sparkles size={10} className="text-gold-start shrink-0" />
                  <span>Every Ornament is a Prayer</span>
                </div>
                <div className="flex items-center gap-2.5 text-[10px] md:text-xs tracking-wider uppercase font-bold text-[#8B6F4E]">
                  <Sparkles size={10} className="text-gold-start shrink-0" />
                  <span>Every Creation is a Seva</span>
                </div>
              </motion.div>

              {/* CTA Buttons - side by side */}
              <motion.div
                {...fadeUp(0.65)}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-6"
              >
                {/* Button 1: Explore */}
                <a
                  href="/collections/festive-offers"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-[12px] md:text-[13px] font-semibold text-white rounded-pill transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-md hover:shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #5C1A1A, #7B2D2D)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(212,168,83,0.3), 0 4px 15px rgba(92,26,26,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(92,26,26,0.12)";
                  }}
                >
                  <LotusIcon size={14} className="text-gold-end" />
                  Explore Divine Collections
                </a>

                {/* Button 2: Shop Krishna Vastra */}
                <a
                  href="/collections/thakurjis-summer-collection"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-[12px] md:text-[13px] font-semibold rounded-pill border transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer hover:shadow-md"
                  style={{
                    color: "#5C1A1A",
                    borderColor: "rgba(212, 168, 83, 0.4)",
                    background: "rgba(255, 248, 238, 0.5)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#D4A853";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(212, 168, 83, 0.12)";
                    e.currentTarget.style.background = "rgba(255, 248, 238, 0.95)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(212, 168, 83, 0.4)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "rgba(255, 248, 238, 0.5)";
                  }}
                >
                  <span className="text-[13px]">🪶</span>
                  Shop Krishna Vastra
                </a>
              </motion.div>

              {/* Trust Badges - elegant badges below CTA */}
              <motion.div
                {...fadeUp(0.75)}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-[10px] tracking-wider uppercase font-semibold text-charcoal/70"
              >
                <div className="flex items-center gap-1.5 bg-white/50 backdrop-blur-sm border border-gold-start/10 rounded-full px-2.5 py-0.5 shadow-sm hover:border-gold-start/20 hover:bg-white/70 transition-all duration-300">
                  <LotusIcon size={10} className="text-gold-start" />
                  <span>Handcrafted with Bhakti</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/50 backdrop-blur-sm border border-gold-start/10 rounded-full px-2.5 py-0.5 shadow-sm hover:border-gold-start/20 hover:bg-white/70 transition-all duration-300">
                  <span>🪶</span>
                  <span>Premium Quality Vastra</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/50 backdrop-blur-sm border border-gold-start/10 rounded-full px-2.5 py-0.5 shadow-sm hover:border-gold-start/20 hover:bg-white/70 transition-all duration-300">
                  <span>✦</span>
                  <span>10k+ Happy Devotees</span>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN: Deity image (~55% width, scaled up 12%, moved slightly up & left) ── */}
            <motion.div
              className="flex-1 lg:max-w-[55%] relative order-1 lg:order-2 z-10 w-full flex items-center justify-center lg:translate-x-0 -translate-y-[9%]"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            >
              {/* Radial gold glow behind deity */}
              <div
                className="absolute inset-0 -inset-x-6 -inset-y-6 rounded-full pointer-events-none z-0"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(240,215,140,0.55) 0%, rgba(212,168,83,0.22) 45%, transparent 70%)",
                }}
              />

              {/* Glowing temple arch background silhouette behind deity */}
              <div className="absolute inset-0 -top-6 -bottom-6 flex items-center justify-center pointer-events-none select-none opacity-20 z-0">
                <svg className="w-[80%] h-full text-gold-start" viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="0.75">
                  <path d="M 10 120 L 10 50 C 10 20 90 20 90 50 L 90 120" />
                  <path d="M 15 120 L 15 52 C 15 25 85 25 85 52 L 85 120" strokeDasharray="2 2" />
                  <path d="M 50 15 C 51 15 52 18 50 20 C 48 18 49 15 50 15 Z" fill="currentColor" />
                </svg>
              </div>

              {/* Soft Ghibli/Disney-style animated clouds behind deity */}
              <div className="absolute inset-0 pointer-events-none select-none opacity-70 z-0">
                <motion.div
                  className="absolute w-[80%] h-[60%] -top-[10%] -left-[5%] bg-radial from-[#FFF8EE] via-[#FDECD0]/70 to-transparent filter blur-3xl"
                  animate={{ x: [-12, 12, -12], y: [-6, 6, -6] }}
                  transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-[85%] h-[65%] -bottom-[10%] -right-[5%] bg-radial from-[#FDECD0] via-[#FFF3E0]/60 to-transparent filter blur-3xl"
                  animate={{ x: [12, -12, 12], y: [6, -6, 6] }}
                  transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                />
              </div>

              {/* Floating petals */}
              {!shouldReduceMotion && (
                <>
                  <FloatingPetal delay={0} x="15%" y="15%" size={9} rotation={30} />
                  <FloatingPetal delay={1.5} x="75%" y="25%" size={8} rotation={-20} />
                  <FloatingPetal delay={3} x="18%" y="60%" size={11} rotation={45} />
                  <FloatingPetal delay={2} x="78%" y="65%" size={8} rotation={-15} />
                  <FloatingPetal delay={4} x="40%" y="8%" size={7} rotation={60} />
                  <FloatingPetal delay={0.5} x="55%" y="75%" size={10} rotation={10} />
                </>
              )}

              {/* Deity image - emerging naturally from divine clouds via soft radial gradient masking (Scaled up 12% to max-w-[365px]) */}
              <div 
                className="relative w-full max-w-[270px] sm:max-w-[310px] md:max-w-[340px] lg:max-w-[365px] aspect-[4/5] overflow-visible"
                style={{
                  maskImage: "radial-gradient(circle at 50% 48%, black 30%, rgba(0,0,0,0.8) 50%, transparent 68%)",
                  WebkitMaskImage: "radial-gradient(circle at 50% 48%, black 30%, rgba(0,0,0,0.8) 50%, transparent 68%)",
                }}
              >
                <Image
                  src="/images/radharaman-hero.png"
                  alt="Shri Radha Raman Ji of Vrindavan emerging from golden clouds, beautifully adorned in bright yellow vastra and rich shringar"
                  fill
                  priority
                  className="object-cover scale-[1.18] origin-center -translate-y-[2%] filter contrast-[1.02] brightness-[1.02]"
                  sizes="(max-width: 768px) 75vw, 40vw"
                />
              </div>

              {/* Soft pink lotuses blending into the bottom-left decorations */}
              <div className="absolute -bottom-6 -left-6 z-20 pointer-events-none select-none animate-gentle-float">
                <FullColorPinkLotus size={75} className="filter drop-shadow-[0_4px_8px_rgba(255,180,180,0.3)]" />
              </div>
              <div className="absolute -bottom-10 right-12 z-20 pointer-events-none select-none animate-gentle-float" style={{ animationDelay: "1.5s" }}>
                <FullColorPinkLotus size={90} className="filter drop-shadow-[0_4px_10px_rgba(255,180,180,0.3)]" />
              </div>
              <div className="absolute bottom-12 -left-12 z-20 pointer-events-none select-none animate-gentle-float" style={{ animationDelay: "3s" }}>
                <FullColorPinkLotus size={55} className="filter drop-shadow-[0_2px_6px_rgba(255,180,180,0.2)]" />
              </div>
            </motion.div>
          </div>

          {/* Part 2: Scroll Indicator - Scroll Down -> Lotus -> Arrow with floating animations (Perfect Centering) */}
          <div className="flex flex-col items-center gap-1 pointer-events-none select-none my-1 w-full justify-center">
            <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-[#8B6F4E] opacity-75">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center text-gold-start"
            >
              <LotusIcon size={12} />
              <svg width="8" height="12" viewBox="0 0 10 14" fill="none" className="mt-0.5 opacity-80">
                <path d="M5 1 L5 13 M1 9 L5 13 L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>

          {/* Part 3: Premium Glassmorphic Information Card Banner (Inside 100vh viewport at the bottom) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="bg-[#FFFBF4]/85 backdrop-blur-[25px] border border-[#D4A853]/35 rounded-[30px] py-4 px-6 sm:px-8 shadow-[0_12px_45px_rgba(212,168,83,0.08)] flex flex-wrap md:flex-nowrap items-center justify-between gap-4 md:gap-2 divide-y md:divide-y-0 md:divide-x divide-gold-start/15 w-full mt-2"
          >
            {/* Segment 1: Handmade with Love */}
            <div className="flex-1 min-w-[140px] md:min-w-[180px] flex items-center gap-3.5 py-2 md:py-0 md:px-4 group hover:scale-[1.02] transition-transform duration-300">
              <div className="w-9 h-9 rounded-full bg-saffron/10 flex items-center justify-center shrink-0 group-hover:bg-saffron/15 transition-all">
                <LotusIcon size={18} className="text-gold-start" />
              </div>
              <div>
                <h4 className="text-[10px] md:text-[11px] font-bold tracking-wider text-charcoal uppercase">Handcrafted</h4>
                <p className="hidden sm:block text-[9px] md:text-[10px] text-warm-gray leading-tight mt-0.5">With Love & Bhakti</p>
              </div>
            </div>

            {/* Segment 2: Premium Fabrics */}
            <div className="flex-1 min-w-[140px] md:min-w-[180px] flex items-center gap-3.5 py-2 md:py-0 md:px-6 group hover:scale-[1.02] transition-transform duration-300">
              <div className="w-9 h-9 rounded-full bg-saffron/10 flex items-center justify-center shrink-0 group-hover:bg-saffron/15 transition-all">
                <Shield size={16} className="text-gold-start" />
              </div>
              <div>
                <h4 className="text-[10px] md:text-[11px] font-bold tracking-wider text-charcoal uppercase">Premium Quality</h4>
                <p className="hidden sm:block text-[9px] md:text-[10px] text-warm-gray leading-tight mt-0.5">Finest Fabrics</p>
              </div>
            </div>

            {/* Segment 3: Pure Devotion */}
            <div className="flex-1 min-w-[140px] md:min-w-[180px] flex items-center gap-3.5 py-2 md:py-0 md:px-6 group hover:scale-[1.02] transition-transform duration-300">
              <div className="w-9 h-9 rounded-full bg-saffron/10 flex items-center justify-center shrink-0 group-hover:bg-saffron/15 transition-all">
                <Sparkles size={16} className="text-gold-start" />
              </div>
              <div>
                <h4 className="text-[10px] md:text-[11px] font-bold tracking-wider text-charcoal uppercase">Pure Devotion</h4>
                <p className="hidden sm:block text-[9px] md:text-[10px] text-warm-gray leading-tight mt-0.5">In Every Stitch</p>
              </div>
            </div>

            {/* Segment 4: Pan India Delivery */}
            <div className="flex-1 min-w-[140px] md:min-w-[180px] flex items-center gap-3.5 py-2 md:py-0 md:px-6 group hover:scale-[1.02] transition-transform duration-300">
              <div className="w-9 h-9 rounded-full bg-saffron/10 flex items-center justify-center shrink-0 group-hover:bg-saffron/15 transition-all">
                <Truck size={16} className="text-gold-start" />
              </div>
              <div>
                <h4 className="text-[10px] md:text-[11px] font-bold tracking-wider text-charcoal uppercase">Pan India</h4>
                <p className="hidden sm:block text-[9px] md:text-[10px] text-warm-gray leading-tight mt-0.5">Across Bharat</p>
              </div>
            </div>

            {/* Segment 5: Secure Packaging */}
            <div className="flex-1 min-w-[140px] md:min-w-[180px] flex items-center gap-3.5 py-2 md:py-0 md:pl-6 group hover:scale-[1.02] transition-transform duration-300">
              <div className="w-9 h-9 rounded-full bg-saffron/10 flex items-center justify-center shrink-0 group-hover:bg-saffron/15 transition-all">
                <Gift size={16} className="text-gold-start" />
              </div>
              <div>
                <h4 className="text-[10px] md:text-[11px] font-bold tracking-wider text-charcoal uppercase">Secure Pack</h4>
                <p className="hidden sm:block text-[9px] md:text-[10px] text-warm-gray leading-tight mt-0.5">Packed with Care</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Peacock feather — bottom left (full-color, elegant, angled and pushed out to prevent text overlap) */}
        <div className="absolute bottom-0 left-0 z-0 hidden lg:block translate-y-[35%] -translate-x-[15%] pointer-events-none select-none opacity-45">
          <div style={{ transform: "rotate(30deg)" }}>
            <FullColorPeacockFeather size={260} />
          </div>
        </div>

        {/* Peacock feather — bottom right (full-color, elegant, angled and pushed out to prevent text overlap) */}
        <div className="absolute bottom-0 right-0 z-0 hidden lg:block translate-y-[35%] translate-x-[15%] pointer-events-none select-none opacity-45">
          <div style={{ transform: "rotate(-30deg) scaleX(-1)" }}>
            <FullColorPeacockFeather size={260} />
          </div>
        </div>
        {/* Bottom edge — smooth fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, #FFF8EE, transparent)" }}
        />
      </section>
    </>
  );
}
