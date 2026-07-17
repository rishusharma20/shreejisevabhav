"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const LOCATIONS = ["VRINDAVAN", "MATHURA", "AGRA", "NEW DELHI"];

export default function LiveDeliveryUpdate() {
  const [locationIndex, setLocationIndex] = useState(0);

  useEffect(() => {
    // Simulate location updating
    const interval = setInterval(() => {
      setLocationIndex((prev) => (prev < LOCATIONS.length - 1 ? prev + 1 : prev));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      
      {/* Live Location Update */}
      <motion.div 
        key={`loc-${locationIndex}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-lotus/20 shadow-sm relative overflow-hidden group"
      >
        <div className="absolute right-0 top-0 w-32 h-32 bg-lotus/10 blur-[30px] rounded-bl-full group-hover:bg-lotus/20 transition-colors duration-700" />
        
        <h4 className="text-[12px] uppercase tracking-widest font-bold text-lotus mb-3 flex items-center gap-2">
          Wonderful News <Sparkles className="w-4 h-4" />
        </h4>
        
        <p className="text-sm md:text-base text-charcoal font-medium mb-4 leading-relaxed">
          Your Divine Offering has reached <br/>
          <span className="font-display font-bold text-[#5C1A1A] text-xl flex items-center gap-2 mt-1">
            <MapPin className="w-5 h-5 text-lotus" /> {LOCATIONS[locationIndex]}
          </span>
        </p>
        
        <div className="inline-flex flex-col">
          <span className="text-[9px] uppercase tracking-widest font-bold text-warm-gray mb-1">
            Estimated Delivery
          </span>
          <span className="inline-block px-4 py-1.5 bg-lotus/10 rounded-full text-[10px] uppercase tracking-widest font-bold text-lotus border border-lotus/20">
            Tomorrow
          </span>
        </div>
      </motion.div>

      {/* Festival Aware Update */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full bg-gradient-to-br from-gold-start/10 to-transparent backdrop-blur-md rounded-2xl p-6 border border-gold-start/20 shadow-sm relative overflow-hidden"
      >
        <div className="absolute right-0 bottom-0 w-24 h-24 bg-gold-start/20 blur-[20px] rounded-tl-full" />
        
        <h4 className="text-[12px] uppercase tracking-widest font-bold text-gold-start mb-3 flex items-center gap-2">
          Festival Update <Sparkles className="w-4 h-4" />
        </h4>
        
        <p className="text-sm md:text-base text-charcoal font-medium mb-4 leading-relaxed">
          Your Divine Offering will reach before <br/>
          <span className="font-display font-bold text-[#5C1A1A] text-xl tracking-wider">JANMASHTAMI</span>.
        </p>
        
        <div className="inline-block px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E] border border-gold-start/20">
          Ready For The Festival
        </div>
      </motion.div>

    </div>
  );
}
