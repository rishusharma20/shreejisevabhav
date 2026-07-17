"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Heart, Crown, Ruler, MapPin, Feather } from "lucide-react";

const SEVA_MODULES = [
  { title: "How To Adorn Laddu Gopal Ji", icon: Crown },
  { title: "How To Select Divine Offerings", icon: Heart },
  { title: "The Divine Festivals Of Vrindavan", icon: Sparkles },
  { title: "Divine Size Guide", icon: Ruler },
  { title: "The Beauty Of Temple Traditions", icon: MapPin },
  { title: "The Art Of Divine Alankaar", icon: Feather },
];

export default function LearnDivineSeva() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-32 px-6 relative z-10">
      <div className="text-center mb-16">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Learn The Art Of Divine Seva
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Explore Our Sacred Learnings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SEVA_MODULES.map((module, idx) => {
          const Icon = module.icon;
          return (
            <Link key={idx} href="#">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                className="group relative h-48 rounded-[30px] overflow-hidden cursor-pointer"
              >
                {/* Background Glass/Color */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFFBF4] to-[#FFF5E6] border border-gold-start/20 rounded-[30px] transition-colors group-hover:border-gold-start/50 group-hover:bg-[#FFFBF4]" />
                
                <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-white/60 border border-gold-start/30 flex items-center justify-center mb-4 group-hover:bg-gold-start/10 transition-colors shadow-sm">
                    <Icon className="w-5 h-5 text-[#8B6F4E] group-hover:text-[#5C1A1A] transition-colors" />
                  </div>
                  <h4 className="font-display text-lg md:text-xl font-bold text-[#5C1A1A] leading-tight">
                    {module.title}
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
