"use client";

import { motion } from "framer-motion";
import { Flower, PackageSearch, Gift, Leaf, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DivineQuickActions() {
  const pathname = usePathname();

  // Do not show on the offline page to keep it clean, or we can keep it. Let's keep it but simplified.
  if (pathname === '/offline') return null;

  const NAV_ITEMS = [
    { icon: Home, label: "Temple", href: "/" },
    { icon: PackageSearch, label: "Track", href: "/track-seva/active" },
    { icon: Gift, label: "Festivals", href: "/festivals" },
    { icon: Leaf, label: "Blessings", href: "/divine-whispers" },
    { icon: Flower, label: "Darshan", href: "/divine-darshan" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] pb-safe">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-t border-gold-start/20 shadow-[0_-10px_40px_rgba(212,168,83,0.1)] -z-10" />
      
      <div className="flex justify-around items-center px-2 py-3">
        {NAV_ITEMS.map((item, idx) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
          
          return (
            <Link key={idx} href={item.href} className="w-1/5 flex flex-col items-center justify-center gap-1">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`relative p-2 rounded-full transition-colors ${isActive ? 'text-[#5C1A1A]' : 'text-gold-start/60 hover:text-gold-start'}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeNavMobile"
                    className="absolute inset-0 bg-gold-start/10 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className="w-6 h-6 relative z-10" strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              <span className={`text-[8px] uppercase tracking-wider font-bold ${isActive ? 'text-[#5C1A1A]' : 'text-warm-gray'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
