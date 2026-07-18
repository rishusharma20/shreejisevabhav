"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BrainCircuit } from "lucide-react";
import Link from "next/link";

const RECOMMENDATIONS = [
  { action: "IMPROVE", detail: "The Janmashtami Divine Darshan experience.", reason: "Received unprecedented engagement this year." },
  { action: "PRESERVE", detail: "The Premium Poshak crafting traditions.", reason: "Becoming lifelong memories for devotees." },
  { action: "CREATE", detail: "New Radhashtami Alankaar Collections.", reason: "Anticipating 25,000+ celebrations next year." }
];

export default function LivingVrindavanEngine() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
            The Living Vrindavan Engine
          </h3>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
            The Heart & Soul of Digital Vrindavan
          </p>
        </div>
        <div className="bg-white/60 backdrop-blur-md border border-gold-start/30 rounded-full px-6 py-2 shadow-sm flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="text-[9px] uppercase tracking-widest font-bold text-[#5C1A1A]">
            AI EXPERIENCE ENGINE ACTIVE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RECOMMENDATIONS.map((rec, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white/70 backdrop-blur-md border border-gold-start/30 rounded-3xl p-8 shadow-sm hover:border-gold-start/60 hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-gold-start/10 to-transparent blur-[20px]" />
            
            <div className="relative z-10 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-gold-start" />
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E]">
                  AI RECOMMENDATION
                </span>
              </div>
              <h5 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider mb-2 uppercase group-hover:text-gold-start transition-colors leading-relaxed">
                {rec.action}: {rec.detail}
              </h5>
              <p className="text-sm italic text-charcoal/70">
                "{rec.reason}"
              </p>
            </div>
            
            <Link href="/admin">
              <button className="w-full bg-transparent border border-gold-start/50 text-[#5C1A1A] rounded-full px-6 py-3 text-[9px] uppercase tracking-widest font-bold hover:bg-gold-start/10 transition-colors inline-flex items-center justify-center gap-2">
                Continue <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
