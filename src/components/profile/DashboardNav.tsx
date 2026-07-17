"use client";

import { motion } from "framer-motion";
import { Package, Heart, Crown, Settings } from "lucide-react";

export type TabType = "seva-journey" | "beloved-collections" | "prem-seva-membership" | "personal-details";

interface DashboardNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function DashboardNav({ activeTab, setActiveTab }: DashboardNavProps) {
  const tabs = [
    { id: "seva-journey", label: "My Seva Journey", icon: Package },
    { id: "beloved-collections", label: "Beloved Collections", icon: Heart },
    { id: "prem-seva-membership", label: "Prem Seva Membership", icon: Crown },
    { id: "personal-details", label: "Personal Details", icon: Settings },
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
    </nav>
  );
}
