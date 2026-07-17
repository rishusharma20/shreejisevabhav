"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden z-50"
          style={{ background: "linear-gradient(90deg, #FFF8EE, #F7E9B8, #FFF8EE)" }}
        >
          <div className="relative flex items-center justify-center py-2 px-10">
            {/* Single marquee — no overlap */}
            <div className="overflow-hidden whitespace-nowrap w-full">
              <div className="inline-flex animate-marquee">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className="font-display text-[13px] tracking-[0.15em] px-8 shrink-0"
                    style={{ color: "#6B2A2A" }}
                  >
                    ॥ Hare Krishna Hare Krishna, Krishna Krishna Hare Hare ॥ Hare Rama Hare Rama, Rama Rama Hare Hare ॥
                  </span>
                ))}
              </div>
            </div>

            {/* Dismiss */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-warm-gray hover:text-charcoal transition-colors cursor-pointer"
              aria-label="Dismiss announcement"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
