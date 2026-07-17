"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface WishlistToggleProps {
  isActive: boolean;
  onToggle: () => void;
  className?: string;
}

export default function WishlistToggle({
  isActive,
  onToggle,
  className = "",
}: WishlistToggleProps) {
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow cursor-pointer ${className}`}
      whileTap={{ scale: 0.85 }}
      aria-label={isActive ? "Remove from wishlist" : "Add to wishlist"}
    >
      <motion.div
        animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          size={18}
          className={
            isActive
              ? "fill-red-500 text-red-500"
              : "text-warm-gray hover:text-red-400 transition-colors"
          }
        />
      </motion.div>
    </motion.button>
  );
}
