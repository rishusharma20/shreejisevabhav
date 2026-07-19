"use client";

import { motion } from "framer-motion";
import { Package, Heart, Crown, Settings, MapPin, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { removeAuthCookie } from "@/app/actions/auth";

export type TabType = "personal-details" | "my-addresses" | "my-orders";

interface DashboardNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function DashboardNav({ activeTab, setActiveTab }: DashboardNavProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      await removeAuthCookie();
      router.push("/login");
    }
  };

  const tabs = [
    { id: "my-orders", label: "My Seva (Orders)", icon: Package },
    { id: "personal-details", label: "Personal Details", icon: Settings },
    { id: "my-addresses", label: "My Addresses", icon: MapPin },
  ];

  return (
    <nav className="flex flex-col gap-3 relative z-10 w-full lg:w-72 shrink-0">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
              isActive
                ? "text-[#5C1A1A] font-bold shadow-[0_10px_30px_rgba(212,168,83,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] bg-white/70 backdrop-blur-xl border border-gold-start/30"
                : "text-warm-gray font-medium hover:bg-white/50 hover:text-charcoal border border-transparent shadow-none"
            }`}
          >
            {/* Active Indicator Line */}
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-gradient-to-b from-[#D4A853] via-[#E8850A] to-[#D4A853] rounded-r-full shadow-[0_0_10px_rgba(212,168,83,0.5)]"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            <Icon
              className={`w-5 h-5 transition-colors duration-300 ${
                isActive ? "text-[#D4A853]" : "text-warm-gray group-hover:text-gold-start/70"
              }`}
            />
            
            <span className="text-sm tracking-wide">{tab.label}</span>
          </motion.button>
        );
      })}
      
      {/* Logout Button */}
      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group mt-4 border border-red-200/50 hover:bg-red-50 hover:border-red-300 text-red-600/80 hover:text-red-700"
      >
        <LogOut className="w-5 h-5 transition-colors duration-300 text-red-500/70 group-hover:text-red-600" />
        <span className="text-sm tracking-wide font-bold">Logout</span>
      </motion.button>
    </nav>
  );
}
