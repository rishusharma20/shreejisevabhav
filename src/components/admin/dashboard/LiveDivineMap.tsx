"use client";

import { motion } from "framer-motion";
import { Map } from "lucide-react";

const CITIES = ["DELHI", "MUMBAI", "LUCKNOW", "JAIPUR", "HYDERABAD", "BANGALORE", "CHENNAI"];

export default function LiveDivineMap() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white/50 backdrop-blur-xl border border-gold-start/40 rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(212,168,83,0.1)] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
              Live Divine Map
            </h3>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E] mb-8">
              From Vrindavan To Their Home
            </p>
            
            <div className="bg-white border border-gold-start/30 rounded-3xl p-6 shadow-sm inline-block">
              <span className="font-display text-4xl font-bold text-[#5C1A1A] block mb-2">125</span>
              <p className="text-[10px] uppercase tracking-widest font-bold text-charcoal/70 leading-relaxed">
                DIVINE OFFERINGS<br />ARE BEAUTIFULLY<br />CONTINUING THEIR<br />DIVINE JOURNEY
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 relative h-64 md:h-80 flex items-center justify-center border border-gold-start/20 rounded-3xl bg-gradient-to-b from-[#FFFBF4] to-[#FFF5E6] overflow-hidden">
            {/* Simulated Map Visual */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <Map className="w-full h-full text-gold-start p-10" />
            </div>
            
            <div className="relative z-10 w-full h-full p-8 flex flex-wrap items-center justify-center gap-4">
              {CITIES.map((city, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: idx * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 5
                  }}
                  className="bg-white/80 backdrop-blur-sm border border-gold-start/40 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm"
                  style={{
                    position: 'absolute',
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 70}%`
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-gold-start animate-ping" />
                  <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-[#5C1A1A]">
                    {city}
                  </span>
                </motion.div>
              ))}
              
              {/* Origin Point */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#5C1A1A] text-white rounded-full px-6 py-3 shadow-lg z-20 flex flex-col items-center border-2 border-gold-start/50">
                <span className="text-xs uppercase tracking-widest font-bold mb-1">VRINDAVAN</span>
                <span className="text-[8px] uppercase tracking-widest text-white/80">Origin</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
