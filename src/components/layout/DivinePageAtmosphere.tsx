"use client";

import { motion } from "framer-motion";

export default function DivinePageAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden mix-blend-soft-light">
      {/* Global persistent glowing elements that smoothly drift */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
          x: ["0%", "5%", "0%"]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[80%] h-[80%] -top-[10%] -left-[10%] bg-radial from-gold-start/5 via-transparent to-transparent filter blur-[150px]" 
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1],
          x: ["0%", "-5%", "0%"]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute w-[80%] h-[80%] -bottom-[10%] -right-[10%] bg-radial from-[#FFF3DF]/20 via-transparent to-transparent filter blur-[150px]" 
      />
    </div>
  );
}
