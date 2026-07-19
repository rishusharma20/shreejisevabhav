"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProfileHeader from "@/components/profile/ProfileHeader";
import DashboardNav, { TabType } from "@/components/profile/DashboardNav";
import DashboardContent from "@/components/profile/DashboardContent";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const floatingPetals = [
  { id: 1, left: "10%", delay: 0, size: 24, duration: 12 },
  { id: 2, left: "85%", delay: 2.5, size: 20, duration: 15 },
  { id: 3, left: "45%", delay: 5.5, size: 16, duration: 10 },
  { id: 4, left: "75%", delay: 8, size: 28, duration: 14 },
];

export default function MySevaPage() {
  const [activeTab, setActiveTab] = useState<TabType>("my-orders");

  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pt-24 pb-12">
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Soft clouds */}
        <div className="absolute w-[100%] h-[60%] top-[-10%] left-0 bg-radial from-[#FFF3DF] via-[#FFEED4]/40 to-transparent filter blur-3xl opacity-70" />
        <div className="absolute w-[80%] h-[60%] bottom-[-20%] right-[-10%] bg-radial from-[#FFF5E6] via-[#FFF3DF]/50 to-transparent filter blur-3xl opacity-60" />
        
        {/* Floating golden particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-gold-start/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}

        {/* Floating lotus petals */}
        {floatingPetals.map((petal) => (
          <motion.div
            key={`petal-${petal.id}`}
            className="absolute"
            style={{ left: petal.left, top: "-10%" }}
            animate={{
              y: ["0vh", "120vh"],
              x: [0, 50, -50, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              ease: "linear",
              delay: petal.delay,
            }}
          >
            <svg width={petal.size} height={petal.size} viewBox="0 0 40 40" fill="none">
              <path d="M20 5 C10 18 10 32 20 35 C30 32 30 18 20 5 Z" fill="#FFB7B2" opacity="0.4" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* ── CONTENT CONTAINER ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Return to Temple
          </Link>
        </motion.div>

        {/* Profile Header (Stats & Greetings) */}
        <div className="mb-8">
          <ProfileHeader />
        </div>

        {/* Dashboard Layout (Nav & Content) */}
        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
          <DashboardContent activeTab={activeTab} />
        </div>
      </div>
    </main>
  );
}
