"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, Heart, MapPin, Sparkles, Ruler, Gift, Crown, Home } from "lucide-react";

const ASSISTANCE_OPTIONS = [
  { title: "WhatsApp Seva", icon: MessageCircle, href: "#" },
  { title: "Divine Collections Guidance", icon: Heart, href: "#" },
  { title: "Track My Seva", icon: MapPin, href: "/track-seva/active" },
  { title: "Festival Collections", icon: Sparkles, href: "/festivals" },
  { title: "Size Assistance", icon: Ruler, href: "#" },
  { title: "Custom Divine Offerings", icon: Gift, href: "#" },
  { title: "Prem Parivaar", icon: Crown, href: "/parivaar" },
  { title: "Return To Temple", icon: Home, href: "/" },
];

export default function HowMayWeAssist() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-32 px-6 relative z-10">
      <div className="text-center mb-16">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          How May We Lovingly Assist You Today?
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Select Your Journey
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {ASSISTANCE_OPTIONS.map((option, idx) => {
          const Icon = option.icon;
          return (
            <Link key={idx} href={option.href}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative h-40 md:h-48 rounded-[30px] overflow-hidden cursor-pointer flex flex-col items-center justify-center p-6 text-center"
              >
                {/* Background Glass/Color */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-md border border-gold-start/20 transition-all group-hover:bg-[#FFFBF4] group-hover:border-gold-start/60 group-hover:shadow-[0_15px_30px_rgba(212,168,83,0.15)]" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#FFFBF4] border border-gold-start/30 flex items-center justify-center mb-4 group-hover:bg-gold-start/10 transition-colors">
                    <Icon className="w-5 h-5 text-[#8B6F4E] group-hover:text-[#5C1A1A] transition-colors" />
                  </div>
                  <h4 className="font-display text-sm md:text-base font-bold text-[#5C1A1A] leading-tight">
                    {option.title}
                  </h4>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
