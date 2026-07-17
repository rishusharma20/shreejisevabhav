"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play } from "lucide-react";

const SERIES = [
  { 
    tag: "JANMASHTAMI SPECIAL", 
    title: "How To Prepare Your Divine Offering",
    duration: "15 MINUTE DIVINE GUIDE"
  },
  { 
    tag: "RADHASHTAMI SPECIAL", 
    title: "The Art of Offering Lotus Collections",
    duration: "10 MINUTE DIVINE GUIDE"
  },
  { 
    tag: "DIVINE ALANKAAR", 
    title: "Selecting The Perfect Mukut & Morpankh",
    duration: "12 MINUTE DIVINE GUIDE"
  }
];

export default function DivineKnowledgeSeries() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-32 px-6 relative z-10">
      <div className="text-center mb-16">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-4">
          The Divine Knowledge Series
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Experience Divine Learnings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERIES.map((item, idx) => (
          <div key={idx} className="flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative bg-[#5C1A1A] rounded-[30px] overflow-hidden aspect-[4/3] flex items-center justify-center cursor-pointer shadow-[0_15px_40px_rgba(92,26,26,0.2)]"
            >
              <div className="absolute inset-0 bg-radial from-gold-start/20 to-transparent blur-[30px]" />
              
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500 z-10">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </motion.div>
            
            <div className="mt-6 text-center px-4 flex-grow flex flex-col justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-gold-start mb-3">
                  {item.tag}
                </p>
                <h4 className="font-display text-xl font-bold text-charcoal/90 mb-4 leading-snug">
                  {item.title}
                </h4>
              </div>
              <div>
                <div className="w-10 h-[1px] bg-gold-start/30 mx-auto mb-4" />
                <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-warm-gray mb-6">
                  {item.duration}
                </p>
                <Link href="#">
                  <button className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">
                    Continue Your Journey
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
