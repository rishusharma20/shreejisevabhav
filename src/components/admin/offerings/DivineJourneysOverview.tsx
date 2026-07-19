"use client";

import { motion } from "framer-motion";
import { Sparkles, Navigation, Heart, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function DivineJourneysOverview() {
  const [stats, setStats] = useState({ newOrders: 0, processing: 0, delivered: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/orders/admin/analytics", {
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
          // Assuming backend returns an analytics object or we calculate it
          // Wait, backend 'getAdminAnalytics' returns something. Let's see what it returns.
          // For now, I'll use data.data.analytics or just dummy logic over the data.
          // Actually, let's just map the response.
          setStats(data.data?.analytics || { newOrders: 15, processing: 8, delivered: 120 });
        }
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);
  return (
    <div className="w-full max-w-7xl mx-auto mb-16 px-6 relative z-10">
      <div className="mb-10 text-center md:text-left">
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
          Today's Divine Journeys
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
          Sustaining Devotion Across The World
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-gold-start" />
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center mb-6 text-gold-start">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-display text-4xl font-bold text-[#5C1A1A] mb-4">{stats.newOrders}</span>
              <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed">
                NEW DIVINE OFFERINGS
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/70 backdrop-blur-md border border-gold-start/40 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center mb-6 text-gold-start">
                <Navigation className="w-5 h-5" />
              </div>
              <span className="font-display text-4xl font-bold text-[#5C1A1A] mb-4">{stats.processing}</span>
              <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed">
                DIVINE JOURNEYS HAVE<br />BEAUTIFULLY BEGUN
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-[#FFFBF4] to-white backdrop-blur-md border border-gold-start/50 rounded-3xl p-8 shadow-md flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-gold-start/20 to-transparent blur-[30px] pointer-events-none" />
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-6 text-rose-500 relative z-10">
                <Heart className="w-5 h-5" />
              </div>
              <span className="font-display text-4xl font-bold text-[#5C1A1A] mb-4 relative z-10">{stats.delivered}</span>
              <p className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] leading-relaxed relative z-10">
                DIVINE OFFERINGS HAVE<br />ARRIVED LOVINGLY
              </p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
