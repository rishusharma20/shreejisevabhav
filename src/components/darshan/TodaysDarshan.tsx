"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const DARSHANS = [
  { name: "Shri Radha Raman Ji", location: "Vrindavan", festival: "Nitya Darshan" },
  { name: "Shri Ladli Ji Maharaj", location: "Barsana", festival: "Mangala Aarti" },
  { name: "Shri Radha Krishna", location: "Prem Mandir", festival: "Sandhya Aarti" },
  { name: "Shri Banke Bihari Ji", location: "Vrindavan", festival: "Shringar Darshan" },
  { name: "Shrinath Ji", location: "Nathdwara", festival: "Rajbhog Darshan" },
  { name: "Giriraj Maharaj", location: "Govardhan", festival: "Parikrama Blessings" },
  { name: "Radha Kund", location: "Govardhan", festival: "Sacred Snan" },
  { name: "Shyam Kund", location: "Govardhan", festival: "Divine Grace" },
];

export default function TodaysDarshan() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-32 px-6 relative z-10">
      
      <div className="text-center mb-16">
        <h3 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          Today&apos;s Divine Darshan
        </h3>
        <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
          Receive The Blessings Of Thakurji
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DARSHANS.map((darshan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
            className="group relative bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-[30px] p-6 shadow-sm hover:shadow-[0_20px_40px_rgba(212,168,83,0.15)] hover:border-gold-start/40 transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
          >
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 bg-radial from-gold-start/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Image Placeholder */}
            <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#FFFBF4] to-[#FFF5E6] border border-gold-start/20 mb-6 relative overflow-hidden flex items-center justify-center group-hover:border-gold-start/40 transition-colors">
              <Sparkles className="w-8 h-8 text-gold-start/30" />
              {/* Optional glowing orb inside placeholder */}
              <div className="absolute inset-0 bg-radial from-gold-start/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            <h4 className="font-display text-lg font-bold text-[#5C1A1A] mb-1 relative z-10">
              {darshan.name}
            </h4>
            <p className="text-[9px] uppercase tracking-widest font-bold text-warm-gray mb-3 relative z-10">
              {darshan.location}
            </p>

            <div className="w-8 h-[1px] bg-gold-start/30 mb-3 relative z-10" />

            <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-6 relative z-10">
              {darshan.festival}
            </p>
            
            <Link href="/" className="mt-auto relative z-10">
              <div className="text-[9px] uppercase tracking-widest font-bold text-gold-start flex items-center gap-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500">
                Continue Your Journey <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
    </div>
  );
}
