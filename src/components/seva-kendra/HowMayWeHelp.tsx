"use client";

import { motion } from "framer-motion";
import { 
  MapPin, 
  Heart, 
  Sparkles, 
  Ruler, 
  Package, 
  CreditCard, 
  RefreshCcw, 
  MessageCircle, 
  Mail 
} from "lucide-react";
import Link from "next/link";

const ASSISTANCE_LINKS = [
  { title: "Track My Seva", icon: MapPin, href: "/track-my-seva" },
  { title: "Divine Size Guide", icon: Ruler, href: "#size-guide" },
  { title: "Premium Packaging", icon: Package, href: "/checkout" },
  { title: "Payment Support", icon: CreditCard, href: "#" },
  { title: "Our Divine Promise", icon: RefreshCcw, href: "#promise" },
  { title: "WhatsApp Support", icon: MessageCircle, href: "#whatsapp" },
  { title: "Contact Us", icon: Mail, href: "#" },
];

export default function HowMayWeHelp() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-32 px-6 relative z-10">
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
        {ASSISTANCE_LINKS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link key={idx} href={item.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                className="group bg-white/40 backdrop-blur-md border border-gold-start/20 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-[0_15px_30px_rgba(212,168,83,0.1)] hover:border-gold-start/40 transition-all duration-300 h-full"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFFBF4] border border-gold-start/20 flex items-center justify-center mb-4 group-hover:bg-gold-start/10 transition-colors">
                  <Icon className="w-5 h-5 text-[#8B6F4E] group-hover:text-[#5C1A1A] transition-colors" />
                </div>
                <h4 className="text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-charcoal/80 group-hover:text-[#5C1A1A] transition-colors">
                  {item.title}
                </h4>
              </motion.div>
            </Link>
          );
        })}
      </div>
      
    </div>
  );
}
