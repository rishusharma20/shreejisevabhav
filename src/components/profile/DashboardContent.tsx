"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TabType } from "./DashboardNav";
import { PackageOpen, Heart, Crown, MapPin, User, Mail, Phone, ChevronRight } from "lucide-react";

interface DashboardContentProps {
  activeTab: TabType;
}

export default function DashboardContent({ activeTab }: DashboardContentProps) {
  return (
    <div className="flex-1 min-h-[400px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15, scale: 0.98, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -15, scale: 0.98, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/40 backdrop-blur-[32px] border border-gold-start/20 rounded-3xl p-6 md:p-10 shadow-[0_20px_60px_rgba(212,168,83,0.1),inset_0_1px_0_rgba(255,255,255,0.7)] overflow-hidden relative"
        >
          {/* Subtle inner mandala glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-start/10 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="relative z-10">
            {activeTab === "seva-journey" && <SevaJourney />}
            {activeTab === "beloved-collections" && <BelovedCollections />}
            {activeTab === "prem-seva-membership" && <PremSevaMembership />}
            {activeTab === "personal-details" && <PersonalDetails />}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Tab 1: My Seva Journey (Orders) ──
function SevaJourney() {
  const orders = [
    { id: "#SSB-1004", date: "Aug 12, 2026", status: "On Its Divine Journey", items: 2, total: "₹4,500" },
    { id: "#SSB-0982", date: "Jul 24, 2026", status: "Your Divine Offering Has Arrived", items: 1, total: "₹2,100" },
    { id: "#SSB-1020", date: "Aug 15, 2026", status: "Being Lovingly Prepared", items: 3, total: "₹7,200" },
  ];

  const getStatusColor = (status: string) => {
    if (status.includes("Arrived")) return "text-peacock";
    if (status.includes("Journey")) return "text-saffron-deep";
    return "text-gold-start";
  };

  return (
    <div className="space-y-6">
      <div className="mb-8 space-y-1">
        <h2 className="font-display text-2xl text-[#5C1A1A] font-extrabold tracking-wide drop-shadow-sm">My Seva Journey</h2>
        <p className="text-xs text-warm-gray tracking-wide font-medium">Track the divine offerings en route to your home.</p>
      </div>

      <div className="space-y-4">
        {orders.map((order, idx) => (
          <motion.div
            whileHover={{ scale: 1.01, boxShadow: "0 10px 25px rgba(212,168,83,0.15)" }}
            key={idx}
            className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-white/50 backdrop-blur-xl rounded-2xl border border-gold-start/15 hover:border-gold-start/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-cream/80 backdrop-blur-md flex items-center justify-center border border-gold-start/20 group-hover:scale-110 group-hover:bg-cream transition-all duration-300 shadow-sm">
                <PackageOpen className="w-5 h-5 text-saffron group-hover:text-gold-start transition-colors" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-charcoal">{order.id}</h4>
                <p className="text-[11px] text-warm-gray font-medium mt-0.5">{order.date} • {order.items} Items</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between w-full md:w-auto md:gap-8">
              <div className="text-left md:text-right">
                <div className="text-sm font-bold text-charcoal">{order.total}</div>
                <div className={`text-[9px] font-bold uppercase tracking-[0.15em] mt-0.5 ${getStatusColor(order.status)}`}>
                  {order.status}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-gold-start/10 transition-colors">
                <ChevronRight className="w-4 h-4 text-warm-gray/60 group-hover:text-gold-start transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Tab 2: Beloved Collections (Wishlist) ──
function BelovedCollections() {
  const wishlist = [
    { name: "Golden Peacok Flute (Murli)", price: "₹1,200", inStock: true },
    { name: "Lotus Silk Vastra Set", price: "₹3,400", inStock: true },
    { name: "Emerald & Pearl Mukut", price: "₹2,800", inStock: false },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8 space-y-1">
        <h2 className="font-display text-2xl text-[#5C1A1A] font-extrabold tracking-wide drop-shadow-sm">Beloved Collections</h2>
        <p className="text-xs text-warm-gray tracking-wide font-medium">Your curated selections of divine ornaments and attire.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wishlist.map((item, idx) => (
          <motion.div 
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(255,183,178,0.2)" }}
            key={idx} 
            className="p-4 bg-white/50 backdrop-blur-xl rounded-2xl border border-gold-start/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] flex items-center gap-4 group hover:border-lotus/40 transition-all cursor-pointer"
          >
            <div className="w-16 h-16 rounded-xl bg-cream/80 backdrop-blur-md border border-gold-start/10 shrink-0 flex items-center justify-center relative overflow-hidden group-hover:border-lotus/30 transition-all">
              <Heart className="w-6 h-6 text-lotus fill-lotus/20 group-hover:fill-lotus/60 group-hover:scale-110 transition-all duration-300" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-charcoal line-clamp-1">{item.name}</h4>
              <p className="text-xs font-semibold text-gold-start mt-0.5">{item.price}</p>
              <p className={`text-[9px] uppercase tracking-widest mt-1.5 font-bold ${item.inStock ? 'text-peacock' : 'text-saffron-deep'}`}>
                {item.inStock ? "Ready for Seva" : "Currently Unavailable"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Tab 3: Prem Seva Membership ──
function PremSevaMembership() {
  return (
    <div className="space-y-6">
      <div className="mb-6 space-y-1">
        <h2 className="font-display text-2xl text-[#5C1A1A] font-extrabold tracking-wide drop-shadow-sm">Prem Seva Membership</h2>
        <p className="text-xs text-warm-gray tracking-wide font-medium">Your digital VIP access to exclusive devotional collections.</p>
      </div>

      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="relative p-8 rounded-3xl bg-gradient-to-br from-[#1A1815] to-[#2D2A26] border border-gold-start/30 overflow-hidden shadow-2xl transition-transform"
      >
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-gold-start/30 to-saffron/20 rounded-full blur-[40px] pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tr from-peacock/10 to-lotus/10 rounded-full blur-[40px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A853] via-[#E8850A] to-[#A38120] p-[2px] shadow-[0_0_20px_rgba(212,168,83,0.3)]">
              <div className="w-full h-full bg-[#1A1815] rounded-full flex items-center justify-center">
                <Crown className="w-7 h-7 text-gold-start" />
              </div>
            </div>
            <div>
              <div className="text-[10px] text-gold-start uppercase tracking-[0.25em] font-bold mb-1">Current Tier</div>
              <h3 className="text-2xl font-display text-white font-bold tracking-wider">Golden Lotus</h3>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <div className="text-[10px] text-warm-gray-lighter uppercase tracking-[0.2em] font-bold mb-1">Seva Points</div>
            <div className="text-4xl font-display text-gold-start font-extrabold drop-shadow-[0_0_15px_rgba(212,168,83,0.3)]">
              4,250
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 relative">
          <p className="text-xs text-white/80 italic text-center tracking-wide font-medium">
            "By performing Seva, we purify our hearts and invite the Divine."
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ── Tab 4: Personal Details ──
function PersonalDetails() {
  return (
    <div className="space-y-6">
      <div className="mb-8 flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="font-display text-2xl text-[#5C1A1A] font-extrabold tracking-wide drop-shadow-sm">Personal Details</h2>
          <p className="text-xs text-warm-gray tracking-wide font-medium">Manage your contact and delivery information.</p>
        </div>
        <button className="text-[10px] font-bold text-saffron uppercase tracking-[0.2em] hover:text-gold-start transition-colors px-4 py-2 rounded-full border border-saffron/30 hover:border-gold-start bg-white/50 hover:bg-white shadow-sm">
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-md rounded-2xl border border-transparent hover:border-gold-start/20 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center shadow-sm">
              <User className="w-4 h-4 text-warm-gray" />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-warm-gray font-bold mb-0.5">Full Name</div>
              <div className="text-sm font-bold text-charcoal">Shreeji Devotee</div>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-md rounded-2xl border border-transparent hover:border-gold-start/20 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center shadow-sm">
              <Mail className="w-4 h-4 text-warm-gray" />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-warm-gray font-bold mb-0.5">Email Address</div>
              <div className="text-sm font-bold text-charcoal">devotee@example.com</div>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-md rounded-2xl border border-transparent hover:border-gold-start/20 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center shadow-sm">
              <Phone className="w-4 h-4 text-warm-gray" />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-warm-gray font-bold mb-0.5">Phone Number</div>
              <div className="text-sm font-bold text-charcoal">+91 98765 43210</div>
            </div>
          </motion.div>
        </div>
        
        <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-white/50 backdrop-blur-xl rounded-2xl border border-gold-start/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] h-full transition-all flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-saffron" />
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal">Default Shipping</h4>
          </div>
          <p className="text-sm text-warm-gray leading-relaxed font-medium">
            Shreeji Seva Bhav<br/>
            Opposite Bankey Bihari Temple<br/>
            Vrindavan, Uttar Pradesh 281121<br/>
            India
          </p>
        </motion.div>
      </div>
    </div>
  );
}
