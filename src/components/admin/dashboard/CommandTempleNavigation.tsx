"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Package, Gift, Calendar, Box, Bell, BarChart2, Sparkles, ArrowLeft } from "lucide-react";

const NAV_ITEMS = [
  { label: "PRODUCT MANAGEMENT", href: "/admin/products", icon: Package },
  { label: "DIVINE OFFERINGS", href: "/admin/offerings", icon: Gift },
  { label: "FESTIVAL MANAGEMENT", href: "/admin/festivals", icon: Calendar },
  { label: "INVENTORY MANAGEMENT", href: "/admin/inventory", icon: Box },
  { label: "DIVINE WHISPERS", href: "/admin/whispers", icon: Bell },
  { label: "LIVE ANALYTICS", href: "/admin/analytics", icon: BarChart2 },
  { label: "AI INSIGHTS", href: "/admin/insights", icon: Sparkles }
];

export default function CommandTempleNavigation() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10 text-center">
      <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
        Quick Divine Actions
      </h3>
      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E] mb-12">
        One Click Away
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        {NAV_ITEMS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <Link href={item.href}>
              <div className="bg-white/80 backdrop-blur-md border border-gold-start/30 rounded-full px-6 py-3 flex items-center gap-3 shadow-sm hover:bg-gold-start/10 hover:border-gold-start/50 transition-colors group cursor-pointer">
                <item.icon className="w-4 h-4 text-gold-start" />
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-charcoal group-hover:text-[#5C1A1A] transition-colors">
                  {item.label}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/">
          <button className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Return To Temple
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
