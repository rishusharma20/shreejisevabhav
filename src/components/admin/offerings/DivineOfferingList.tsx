"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function DivineOfferingList() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/orders/admin/all", {
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data.data?.orders || []);
        }
      } catch (error) {
        console.error("Failed to fetch admin orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ');
  };
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="flex justify-between items-end mb-8 border-b border-gold-start/20 pb-4">
        <h4 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider">
          Active Offerings
        </h4>
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
          Sort By: Newest First
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gold-start">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p className="text-xs uppercase tracking-widest font-bold">Loading Divine Offerings...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-sm text-warm-gray">No active offerings found.</p>
          </div>
        ) : (
          orders.map((order, idx) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.1, 1) }}
              className="bg-white/80 backdrop-blur-md border border-gold-start/30 rounded-3xl p-8 shadow-[0_10px_30px_rgba(212,168,83,0.05)] hover:shadow-[0_10px_30px_rgba(212,168,83,0.1)] transition-all flex flex-col"
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-3 h-3 text-gold-start" />
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E]">
                  DIVINE OFFERING #{order.orderNumber}
                </span>
              </div>

              <div className="flex-1 mb-8">
                <h5 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider mb-2 uppercase">
                  {order.userId?.name || "Devotee"}
                </h5>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-charcoal/70 uppercase tracking-widest">
                    {order.products?.length || 0} ITEMS
                  </span>
                  <span className="text-xs font-bold text-charcoal/70 uppercase tracking-widest">
                    ₹{order.totalAmount?.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="w-12 h-[1px] bg-gold-start/30 mb-6" />

              <p className={`text-[9px] uppercase tracking-[0.2em] font-bold mb-6 ${
                order.orderStatus === "VERIFICATION_PENDING" ? "text-[#E8850A]" : "text-gold-start"
              }`}>
                {formatStatus(order.orderStatus)}
              </p>

              <Link href={`/admin/offerings/${order._id}`}>
                <button className="w-full bg-transparent border border-gold-start/50 text-[#5C1A1A] rounded-full px-6 py-3 text-[9px] uppercase tracking-widest font-bold hover:bg-gold-start/10 transition-colors inline-flex items-center justify-center gap-2">
                  Continue Journey <ArrowRight className="w-3 h-3" />
                </button>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
