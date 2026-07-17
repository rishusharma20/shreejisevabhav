"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FESTIVALS = [
  {
    id: "janmashtami",
    title: "Janmashtami",
    month: "August",
    theme: "from-[#1E3A8A] to-[#0F172A]",
    accent: "text-[#1E3A8A]",
    tag: "Next Festival"
  },
  {
    id: "radhashtami",
    title: "Radhashtami",
    month: "September",
    theme: "from-[#FDF2F8] to-[#FCE7F3]", // Lotus Pink
    accent: "text-[#DB2777]",
    tag: "Upcoming"
  },
  {
    id: "jhulan-yatra",
    title: "Jhulan Yatra",
    month: "August",
    theme: "from-[#FFFBEB] to-[#FEF3C7]", // Gold/Yellow
    accent: "text-[#D97706]",
    tag: "Upcoming"
  },
  {
    id: "kartik-maas",
    title: "Kartik Maas",
    month: "October - November",
    theme: "from-[#FFF7ED] to-[#FFEDD5]", // Warm Diya Orange
    accent: "text-[#EA580C]",
    tag: "Upcoming"
  },
  {
    id: "diwali",
    title: "Deepavali",
    month: "November",
    theme: "from-[#FEF2F2] to-[#FEE2E2]", // Deep Red
    accent: "text-[#DC2626]",
    tag: "Upcoming"
  },
  {
    id: "holi",
    title: "Vrindavan Holi",
    month: "March",
    theme: "from-[#F0FDF4] to-[#DCFCE7]", // Fresh Spring Green
    accent: "text-[#16A34A]",
    tag: "Past"
  }
];

export default function FestivalCalendar() {
  return (
    <div className="w-full mt-24">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
          Vrindavan Festival Calendar
        </h2>
        <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
          Explore and Prepare Offerings For Every Sacred Occasion
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FESTIVALS.map((fest, index) => (
          <Link href={`/festivals/${fest.id}`} key={fest.id}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white/60 backdrop-blur-xl border border-gold-start/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all h-[240px] flex flex-col"
            >
              {/* Dynamic Theme Banner */}
              <div className={`h-[100px] w-full bg-gradient-to-r ${fest.theme} relative overflow-hidden flex items-end p-6 border-b border-gold-start/10`}>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-0" />
                <span className={`absolute top-4 right-4 text-[8px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-white/80 backdrop-blur-md shadow-sm ${fest.accent} z-10`}>
                  {fest.tag}
                </span>
                <h3 className={`font-display text-2xl font-bold z-10 ${fest.id === 'janmashtami' ? 'text-white' : 'text-charcoal'}`}>
                  {fest.title}
                </h3>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-warm-gray mb-4 flex items-center gap-2">
                  {fest.month}
                </p>
                
                <div className={`text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform ${fest.accent}`}>
                  Explore Collections <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
