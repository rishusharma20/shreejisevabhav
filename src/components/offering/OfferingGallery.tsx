"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Maximize2, RotateCcw } from "lucide-react";
import Image from "next/image";

interface OfferingGalleryProps {
  images: string[]; // Although we use placeholders, we'll map this for the 360 feature.
  title: string;
}

export default function OfferingGallery({ title }: OfferingGalleryProps) {
  const [viewMode, setViewMode] = useState<"standard" | "360">("standard");
  const [activeAngle, setActiveAngle] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* ── Main Display Container (Glassmorphic) ── */}
      <div className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-white/40 backdrop-blur-2xl border border-gold-start/20 rounded-3xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_20px_60px_rgba(212,168,83,0.1)] group">
        
        {/* Animated Inner Glow */}
        <div className="absolute inset-0 bg-gold-start/5 blur-[30px] pointer-events-none z-0" />

        {/* View Mode Toggle */}
        <div className="absolute top-6 left-6 right-6 z-30 flex justify-between items-center pointer-events-none">
          <div className="flex gap-2 pointer-events-auto">
            <button 
              onClick={() => setViewMode("standard")}
              className={`px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${
                viewMode === "standard" 
                  ? "bg-white/80 shadow-md text-gold-start border border-gold-start/30" 
                  : "bg-white/30 text-warm-gray hover:bg-white/50"
              }`}
            >
              HD View
            </button>
            <button 
              onClick={() => setViewMode("360")}
              className={`px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 ${
                viewMode === "360" 
                  ? "bg-gradient-to-r from-gold-start to-saffron text-white shadow-md border border-white/20" 
                  : "bg-white/30 text-warm-gray hover:bg-white/50"
              }`}
            >
              <RotateCcw className="w-3 h-3" />
              360°
            </button>
          </div>
          
          <button 
            onClick={() => setIsZoomed(!isZoomed)}
            className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center pointer-events-auto border border-gold-start/20 text-charcoal hover:bg-white transition-all shadow-sm"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Image Presentation */}
        <div 
          className="absolute inset-0 z-10 flex items-center justify-center cursor-crosshair"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence mode="wait">
            {viewMode === "standard" ? (
              <motion.div
                key="standard-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full bg-gradient-to-br from-[#FFF5E6] to-[#FFEED4] flex items-center justify-center overflow-hidden"
              >
                {/* Simulated Image Content */}
                <div 
                  className="w-full h-full relative"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='none'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23D4A853' letter-spacing='4' font-weight='bold' opacity='0.6'%3EDIVINE OFFERING%3C/text%3E%3C/svg%3E")`,
                    backgroundPosition: isZoomed ? `${mousePos.x}% ${mousePos.y}%` : "center",
                    backgroundSize: isZoomed ? "200%" : "cover",
                    transition: "background-size 0.4s ease-out",
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="360-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F5F8FF] to-[#E6EEFF]"
              >
                <div className="text-center">
                  <RotateCcw className="w-12 h-12 text-[#1E3A8A]/20 mx-auto mb-4 animate-spin-slow" />
                  <span className="text-[10px] uppercase tracking-widest text-[#1E3A8A]/50 font-bold">Angle {activeAngle + 1}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Petals/Sparkles */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute z-20 pointer-events-none"
            initial={{ opacity: 0, y: 0, rotate: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0], 
              y: [-20, Math.random() * -100 - 50], 
              x: Math.random() * 40 - 20,
              rotate: Math.random() * 360 
            }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
            style={{ left: `${20 + i * 20}%`, bottom: "10%" }}
          >
            <Sparkles className="w-4 h-4 text-gold-start/50" />
          </motion.div>
        ))}
      </div>

      {/* ── Simulated 360 Scrubber / Thumbnails ── */}
      {viewMode === "360" && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-3 px-4"
        >
          {[0, 1, 2, 3].map((angle) => (
            <button
              key={angle}
              onClick={() => setActiveAngle(angle)}
              className={`w-16 h-16 rounded-xl border-2 transition-all ${
                activeAngle === angle 
                  ? "border-gold-start bg-gold-start/10 shadow-[0_4px_15px_rgba(212,168,83,0.2)]" 
                  : "border-white/50 bg-white/30 hover:border-gold-start/40"
              }`}
            >
              <div className="w-full h-full bg-cream/50 rounded-lg flex items-center justify-center">
                <span className="text-[8px] uppercase font-bold text-warm-gray">{angle * 90}°</span>
              </div>
            </button>
          ))}
        </motion.div>
      )}

      {/* ── Standard Thumbnails ── */}
      {viewMode === "standard" && (
        <div className="flex justify-start gap-4 overflow-x-auto hide-scrollbar pb-2 px-1">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              className={`w-20 h-24 shrink-0 rounded-2xl border-2 transition-all ${
                idx === 0 
                  ? "border-gold-start bg-gold-start/5 shadow-md" 
                  : "border-white/60 bg-white/40 hover:border-gold-start/40"
              }`}
            >
              <div className="w-full h-full bg-cream/40 rounded-xl" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
