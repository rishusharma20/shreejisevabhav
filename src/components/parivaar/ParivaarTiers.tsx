"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Crown } from "lucide-react";
import Link from "next/link";

const TIERS = [
  {
    name: "Prem Parivaar",
    subtitle: "For every devotee beginning their Divine Journey.",
    icon: Heart,
    color: "text-rose-500",
    glow: "from-rose-500/10",
    privileges: [
      "Festival Recommendations",
      "Wishlist Collections",
      "Today's Blessings",
      "My Divine Journey",
      "Latest Divine Arrivals"
    ]
  },
  {
    name: "Bhakti Parivaar",
    subtitle: "Continue Your Seva.",
    icon: Sparkles,
    color: "text-gold-start",
    glow: "from-gold-start/15",
    scale: true, // Emphasized middle tier
    privileges: [
      "Festival Notifications",
      "Premium Collections",
      "Early Festival Collections",
      "My Divine Offerings",
      "Track My Seva"
    ]
  },
  {
    name: "Seva Parivaar",
    subtitle: "A beautiful offering for our most beloved devotees.",
    icon: Crown,
    color: "text-[#5C1A1A]",
    glow: "from-[#5C1A1A]/10",
    privileges: [
      "Premium Festival Access",
      "Special Divine Collections",
      "Early Collection Access",
      "Exclusive Recommendations",
      "Temple Inspired Packaging",
      "Special Blessings"
    ]
  }
];

export default function ParivaarTiers() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-32 px-6 relative z-10">
      
      <div className="text-center mb-16">
        <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Divine Privileges
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {TIERS.map((tier, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className={`relative group bg-white/60 backdrop-blur-xl border border-gold-start/20 rounded-[40px] p-8 shadow-[0_20px_40px_rgba(212,168,83,0.1)] flex flex-col items-center text-center overflow-hidden hover:shadow-[0_30px_60px_rgba(92,26,26,0.15)] hover:border-gold-start/50 transition-all duration-700 ${tier.scale ? 'lg:scale-105 lg:z-20 bg-white/80 border-gold-start/40' : 'z-10'}`}
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-b ${tier.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            
            <div className="w-16 h-16 rounded-full bg-[#FFFBF4] border border-gold-start/30 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500">
              <tier.icon className={`w-7 h-7 ${tier.color}`} />
            </div>

            <h4 className="font-display text-2xl font-bold text-[#5C1A1A] mb-2 relative z-10">
              {tier.name}
            </h4>
            <p className="text-[10px] md:text-xs text-charcoal/70 font-medium italic mb-8 relative z-10 h-10 flex items-center justify-center">
              {tier.subtitle}
            </p>

            <div className="w-12 h-[1px] bg-gold-start/40 mb-8 relative z-10" />

            <ul className="space-y-4 mb-10 w-full relative z-10">
              {tier.privileges.map((privilege, pIdx) => (
                <li key={pIdx} className="text-sm font-medium text-charcoal/80 flex items-center justify-center gap-2">
                  <Sparkles className="w-3 h-3 text-gold-start/50" /> {privilege}
                </li>
              ))}
            </ul>

            <Link href="/" className="mt-auto w-full relative z-10">
              <button className="w-full py-4 rounded-full border border-gold-start/40 text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] hover:bg-gold-start hover:text-white hover:border-gold-start transition-colors">
                Continue Your Journey
              </button>
            </Link>

          </motion.div>
        ))}
      </div>
      
    </div>
  );
}
