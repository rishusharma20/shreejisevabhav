"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin, Ruler, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SevaSakhi() {
  const [activeTab, setActiveTab] = useState(0);

  const OPTIONS = [
    { title: "Track My Seva", icon: MapPin, href: "/track-seva/active" },
    { title: "Festival Collections", icon: Sparkles, href: "/festivals" },
    { title: "Divine Size Guide", icon: Ruler, href: "#size-guide" },
    { title: "Divine Offerings", icon: Heart, href: "/krishna-vastra" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-32 px-6 relative z-10 text-center">
      
      <div className="inline-flex flex-col items-center justify-center mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFFBF4] to-gold-start/20 border border-gold-start/30 flex items-center justify-center shadow-md mb-4 relative overflow-hidden">
          <Sparkles className="w-6 h-6 text-[#5C1A1A]" />
          <div className="absolute inset-0 bg-radial from-rose-400/20 to-transparent animate-pulse" />
        </div>
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8B6F4E]">
          Shreeji Seva Sakhi
        </h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="bg-white/60 backdrop-blur-xl border border-gold-start/30 rounded-[40px] p-8 md:p-14 shadow-lg relative overflow-hidden max-w-2xl mx-auto"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-400/10 to-transparent blur-[30px]" />
        
        <h4 className="font-display text-3xl font-bold text-[#5C1A1A] tracking-wider mb-6">
          RADHE RADHE.
        </h4>
        
        <p className="font-medium text-charcoal/80 text-lg italic leading-relaxed mb-8">
          I AM YOUR<br/>
          <span className="font-bold text-[#8B6F4E] not-italic text-xl block my-2 uppercase tracking-widest">Divine Seva Sakhi</span>
        </p>
        
        <div className="w-12 h-[1px] bg-gold-start/50 mx-auto mb-8" />
        
        <p className="font-medium text-charcoal/80 text-lg italic leading-relaxed mb-10">
          How may I lovingly guide your <br/> Divine Journey today?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {OPTIONS.map((opt, idx) => {
            const Icon = opt.icon;
            return (
              <Link key={idx} href={opt.href}>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/80 border border-gold-start/20 rounded-2xl p-4 flex items-center gap-4 hover:border-gold-start hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FFFBF4] flex items-center justify-center group-hover:bg-gold-start/10 transition-colors">
                    <Icon className="w-4 h-4 text-[#8B6F4E] group-hover:text-[#5C1A1A]" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-charcoal/80 group-hover:text-[#5C1A1A]">
                    {opt.title}
                  </span>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </motion.div>
    </div>
  );
}
