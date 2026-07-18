"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DivineSearchSakhi404() {
  const [path, setPath] = useState("");
  const [recommendation, setRecommendation] = useState("FESTIVAL COLLECTIONS");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname.toLowerCase();
      setPath(window.location.pathname);
      
      if (currentPath.includes("poshak") || currentPath.includes("dress")) {
        setRecommendation("PREMIUM KRISHNA POSHAKS");
      } else if (currentPath.includes("janmashtami") || currentPath.includes("festival")) {
        setRecommendation("LATEST FESTIVAL COLLECTIONS");
      } else if (currentPath.includes("jewellery") || currentPath.includes("mukut")) {
        setRecommendation("PREMIUM MUKUTS & JEWELLERY");
      }
    }
  }, []);

  if (!path) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-24 px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-xl border border-rose-200/50 rounded-[40px] p-10 md:p-16 shadow-[0_20px_50px_rgba(225,29,72,0.05)] relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial from-rose-100/40 via-transparent to-transparent blur-[60px] pointer-events-none" />
        
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center mx-auto mb-8 border border-rose-200 shadow-sm relative z-10">
          <MessageCircle className="w-8 h-8 text-rose-400" />
        </div>

        <h4 className="font-display text-2xl font-bold text-[#5C1A1A] tracking-wider mb-2 relative z-10">
          WONDERFUL NEWS.
        </h4>
        <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose-400 mb-6 relative z-10">
          SHREEJI DIVINE SAKHI
        </h5>
        
        <div className="w-12 h-[1px] bg-rose-200 mx-auto mb-8 relative z-10" />
        
        <div className="font-medium italic text-lg md:text-xl text-charcoal/80 leading-relaxed max-w-xl mx-auto mb-10 relative z-10">
          <p>
            The beautiful offering you were seeking has lovingly found its way to our <span className="font-bold text-[#5C1A1A] not-italic">{recommendation}</span>.
          </p>
        </div>

        <div className="relative z-10">
          <Link href="/divine-discovery">
            <button className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2">
              Discover Offerings <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
