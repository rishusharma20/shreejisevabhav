"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OfferingDetailsPanel from "@/components/admin/offerings/OfferingDetailsPanel";
import DivineJourneyTimelineAdmin from "@/components/admin/offerings/DivineJourneyTimelineAdmin";
import CustomDivineOfferingCard from "@/components/admin/offerings/CustomDivineOfferingCard";

export default function DivineOfferingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const offeringId = params?.id;
  
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!offeringId) return;
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/v1/orders/admin/${offeringId}`, {
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
          setOrder(data.data.order);
          setStatus(data.data.order.orderStatus);
        }
      } catch (err) {
        console.error("Failed to fetch order", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [offeringId]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await fetch(`http://localhost:8000/api/v1/orders/admin/${offeringId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        alert("Divine Updates Saved Successfully!");
        router.refresh();
      } else {
        alert("Failed to save updates.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving updates.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-20 text-gold-start tracking-widest font-bold uppercase">Loading...</div>;
  }
  
  if (!order) {
    return <div className="text-center py-20 text-charcoal tracking-widest font-bold uppercase">Order Not Found</div>;
  }

  return (
    <main className="w-full pb-20">
      {/* ── ATMOSPHERIC HEADER ── */}
      <div className="w-full text-center mb-16 px-6">
        <Link href="/admin/offerings" className="inline-block mb-6">
          <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors inline-flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Return to Offerings
          </button>
        </Link>
        
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-4 bg-white/40 backdrop-blur-md border border-gold-start/30 rounded-full px-8 py-3 shadow-sm"
          >
            <Sparkles className="w-5 h-5 text-gold-start" />
            <span className="font-display text-lg md:text-xl font-bold text-[#5C1A1A] tracking-widest uppercase">
              Divine Offering #{order.orderNumber}
            </span>
            <Sparkles className="w-5 h-5 text-gold-start" />
          </motion.div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Timeline & Custom Options */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <DivineJourneyTimelineAdmin />
            <CustomDivineOfferingCard />
          </motion.div>

          {/* Right Column: Offering Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <OfferingDetailsPanel order={order} />
          </motion.div>
        </div>
        
        {/* Status Selection (Phase 6) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 bg-white/70 backdrop-blur-md border border-gold-start/30 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h4 className="font-display text-xl font-bold text-[#5C1A1A] tracking-wider uppercase mb-1">Update Status</h4>
            <p className="text-xs text-charcoal/70">Change the order status to trigger timeline updates.</p>
          </div>
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-white border border-gold-start/30 rounded-full px-6 py-3 text-sm font-bold text-[#5C1A1A] focus:outline-none focus:ring-1 focus:ring-gold-start"
          >
            <option value="PENDING">Pending Payment</option>
            <option value="VERIFICATION_PENDING">Verification Pending (UTR)</option>
            <option value="ACCEPTED">Seva Accepted (Approve)</option>
            <option value="PROCESSING">Processing</option>
            <option value="PACKAGING">Packaging</option>
            <option value="SHIPPED">Shipped</option>
            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
            <option value="DELIVERED">Delivered</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </motion.div>

        {/* Divine Blessing Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-12 py-5 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-3 disabled:opacity-50"
          >
            <HeartHandshake className="w-5 h-5" /> {isSaving ? "Saving..." : "Save Divine Updates"}
          </button>
        </motion.div>
      </div>
    </main>
  );
}
