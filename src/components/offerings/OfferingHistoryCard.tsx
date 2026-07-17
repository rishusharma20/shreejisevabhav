"use client";

import { motion } from "framer-motion";
import { Package, Sparkles, CheckCircle2, ChevronRight, Compass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface OfferingHistoryCardProps {
  id: string;
  orderNumber: string;
  date: string;
  items: string[];
  total: number;
  status: "prepared" | "journey" | "received";
  hasFestivalPackaging?: boolean;
}

export default function OfferingHistoryCard({
  id,
  orderNumber,
  date,
  items,
  total,
  status,
  hasFestivalPackaging
}: OfferingHistoryCardProps) {
  
  // Rule No. 8 Timeline States
  const timeline = [
    { key: "prepared", label: "Being Lovingly Prepared" },
    { key: "journey", label: "On Its Divine Journey" },
    { key: "received", label: "Received With Divine Blessings" }
  ];

  const currentStatusIndex = timeline.findIndex(t => t.key === status);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-3xl p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_30px_rgba(212,168,83,0.05)] transition-all hover:border-gold-start/40 flex flex-col gap-8 relative overflow-hidden group"
    >
      {/* ── HEADER: OFFERING NO. & DATE ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10 border-b border-gold-start/15 pb-6">
        <div>
          <div className="text-[10px] uppercase tracking-widest font-bold text-warm-gray mb-1">
            Divine Offering No.
          </div>
          <div className="font-display text-xl font-bold text-charcoal flex items-center gap-2">
            {orderNumber}
            {hasFestivalPackaging && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-lotus/10 text-[8px] uppercase tracking-widest text-lotus ml-2">
                <Sparkles className="w-3 h-3" /> Festival Packaging
              </span>
            )}
          </div>
          <div className="text-[10px] text-warm-gray mt-1">Offered on {date}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest font-bold text-warm-gray mb-1">Seva Amount</div>
          <div className="font-display text-xl font-bold text-gold-start">₹{total.toLocaleString()}</div>
        </div>
      </div>

      {/* ── DIVINE JOURNEY TIMELINE (Rule No. 8) ── */}
      <div className="relative z-10 pt-4 pb-8">
        <h4 className="text-[9px] uppercase tracking-widest font-bold text-[#5C1A1A] mb-8 flex items-center gap-2">
          <Compass className="w-4 h-4 text-gold-start" /> The Divine Journey
        </h4>
        
        <div className="relative flex items-center justify-between">
          {/* Background Line */}
          <div className="absolute left-[5%] right-[5%] top-4 h-[2px] bg-gold-start/15 -z-10" />
          
          {/* Active Line Progress */}
          <motion.div 
            className="absolute left-[5%] top-4 h-[2px] bg-gradient-to-r from-gold-start to-lotus -z-10"
            initial={{ width: 0 }}
            whileInView={{ width: `${(currentStatusIndex / (timeline.length - 1)) * 90}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          />

          {timeline.map((step, index) => {
            const isCompleted = index <= currentStatusIndex;
            const isActive = index === currentStatusIndex;
            
            return (
              <div key={step.key} className="flex flex-col items-center gap-3 w-1/3 text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 shadow-sm ${
                  isCompleted ? 'bg-white border-2 border-gold-start text-gold-start' : 'bg-white/50 border border-warm-gray/30 text-warm-gray/50'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-warm-gray/30" />}
                </div>
                <div className={`text-[10px] md:text-[11px] uppercase tracking-widest font-bold max-w-[120px] transition-colors duration-500 ${
                  isActive ? 'text-[#5C1A1A]' : isCompleted ? 'text-charcoal' : 'text-warm-gray/50'
                }`}>
                  {step.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── ITEMS & ACTIONS ── */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 relative z-10 border-t border-gold-start/15 pt-6">
        <div className="flex-1 w-full">
          <div className="text-[10px] uppercase tracking-widest font-bold text-warm-gray mb-3">
            Sacred Offerings
          </div>
          <ul className="space-y-2">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-gold-start text-xs mt-0.5">✦</span>
                <span className="text-sm font-medium text-charcoal">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="shrink-0 w-full md:w-auto">
          <Link href="/my-seva">
            <button className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-charcoal text-white text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:bg-[#5C1A1A] transition-colors flex items-center justify-center gap-2">
              Track My Seva <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-gold-start/5 to-transparent blur-[40px] pointer-events-none group-hover:from-gold-start/10 transition-colors duration-700" />
    </motion.div>
  );
}
