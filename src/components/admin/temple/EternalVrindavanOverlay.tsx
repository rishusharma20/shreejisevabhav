"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Flower2, Bell } from "lucide-react";

export default function EternalVrindavanOverlay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Eternal Golden Glow */}
      <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-gold-start/10 to-transparent mix-blend-overlay" />
      
      {/* Floating Clouds - Always Dancing */}
      <motion.div
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 w-96 h-32 bg-white/10 blur-[40px] rounded-full"
      />
      <motion.div
        animate={{ x: [0, -100, 0] }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-20 w-[400px] h-40 bg-white/10 blur-[50px] rounded-full"
      />

      {/* Gentle Floating Petals */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            initial={{ y: -50, x: Math.random() * window.innerWidth, rotate: 0, opacity: 0 }}
            animate={{ 
              y: window.innerHeight + 50, 
              x: (Math.random() * window.innerWidth),
              rotate: 360,
              opacity: [0, 0.4, 0]
            }}
            transition={{ 
              duration: 15 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute text-rose-300/30"
          >
            <Flower2 className="w-4 h-4" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
