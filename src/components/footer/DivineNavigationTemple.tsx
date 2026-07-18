"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const NAV_COLUMNS = [
  {
    title: "THE DIVINE JOURNEY",
    links: [
      { label: "Home", href: "/" },
      { label: "Divine Collections", href: "/divine-wardrobe" },
      { label: "Festival Collections", href: "/festivals" },
      { label: "Experience Vrindavan", href: "/vrindavan" }
    ]
  },
  {
    title: "YOUR OFFERINGS",
    links: [
      { label: "My Seva", href: "/my-seva" },
      { label: "Track My Seva", href: "/track-seva/active" },
      { label: "Divine Darshan", href: "/divine-darshan" },
      { label: "Prem • Bhakti • Seva", href: "/parivaar" }
    ]
  },
  {
    title: "DIVINE GUIDANCE",
    links: [
      { label: "The Divine Sangam", href: "/sangam" },
      { label: "Divine Whispers", href: "/divine-whispers" },
      { label: "Return To Temple", href: "/" }
    ]
  }
];

export default function DivineNavigationTemple() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16 border-t border-gold-start/20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {NAV_COLUMNS.map((col, idx) => (
          <div key={idx} className="flex flex-col items-center md:items-start">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8B6F4E] mb-8 relative">
              {col.title}
              <div className="absolute -bottom-3 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-8 h-[1px] bg-gold-start/50" />
            </h4>
            
            <ul className="space-y-4">
              {col.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <Link href={link.href}>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="group flex items-center justify-center md:justify-start gap-2 text-charcoal/70 hover:text-[#5C1A1A] transition-colors"
                    >
                      <ArrowRight className="w-3 h-3 text-gold-start/0 group-hover:text-gold-start transition-all" />
                      <span className="text-xs uppercase tracking-widest font-bold">
                        {link.label}
                      </span>
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
