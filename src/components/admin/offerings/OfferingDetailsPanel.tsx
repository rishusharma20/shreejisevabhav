"use client";

import { motion } from "framer-motion";
import { User, Calendar, MapPin, Package, CreditCard, Ruler } from "lucide-react";

export default function OfferingDetailsPanel() {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-gold-start/30 rounded-3xl p-8 shadow-sm h-full">
      <h4 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase mb-8 border-b border-gold-start/20 pb-4">
        Offering Details
      </h4>

      <div className="space-y-8">
        {/* Devotee Details */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gold-start/10 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-gold-start" />
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-1">
              Devotee Details
            </h5>
            <p className="font-display text-lg font-bold text-[#5C1A1A] mb-1">Priya Sharma</p>
            <p className="text-xs text-charcoal/70">priya.sharma@example.com</p>
            <p className="text-xs text-charcoal/70">+91 98765 43210</p>
          </div>
        </div>

        {/* Festival Details */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 text-rose-500" />
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-1">
              Festival Context
            </h5>
            <p className="font-display text-lg font-bold text-[#5C1A1A] mb-1">Janmashtami</p>
            <p className="text-xs text-charcoal/70">Special Collection 2026</p>
          </div>
        </div>

        {/* Size Details */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gold-start/10 flex items-center justify-center shrink-0">
            <Ruler className="w-4 h-4 text-gold-start" />
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-1">
              Size Preferences
            </h5>
            <p className="font-display text-lg font-bold text-[#5C1A1A] mb-1">Size-4</p>
            <p className="text-xs text-charcoal/70">Standard Thakurji Poshak Size</p>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gold-start/10 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-gold-start" />
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-1">
              Destination Home
            </h5>
            <p className="text-sm font-bold text-[#5C1A1A] mb-1 leading-relaxed">
              14/B, Lotus Enclave,<br />
              Vasant Vihar, New Delhi,<br />
              110057
            </p>
          </div>
        </div>

        {/* Payment & Packaging */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gold-start/20">
          <div>
            <h5 className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-2 flex items-center gap-2">
              <CreditCard className="w-3 h-3" /> Seva Accepted
            </h5>
            <span className="bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
              Completed
            </span>
          </div>
          <div>
            <h5 className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-2 flex items-center gap-2">
              <Package className="w-3 h-3" /> Packaging
            </h5>
            <span className="bg-gold-start/10 text-gold-start text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-gold-start/30">
              Premium Box
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
