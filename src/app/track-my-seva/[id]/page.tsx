"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Package, Truck, Home, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { authFetch } from "@/lib/authFetch";

const statusConfig: Record<string, { icon: any, label: string }> = {
  PAYMENT_APPROVED: { icon: CheckCircle, label: "Payment Approved" },
  ORDER_CONFIRMED: { icon: CheckCircle, label: "Order Confirmed" },
  PREPARING: { icon: Clock, label: "Preparing" },
  PACKAGING: { icon: Package, label: "Packaging" },
  SHIPPED: { icon: Truck, label: "Shipped" },
  DELIVERED: { icon: Home, label: "Delivered" },
};

const fullFlow = [
  "PAYMENT_APPROVED",
  "ORDER_CONFIRMED",
  "PREPARING",
  "PACKAGING",
  "SHIPPED",
  "DELIVERED"
];

import { use } from 'react';

export default function TrackMySevaPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [track, setTrack] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchTrackingDetails = async () => {
    try {
      // Fetch Order Details
      const orderRes = await authFetch(`/api/v1/orders/${id}`);
      
      if (!orderRes.ok) {
        setError("Order not found or not authorized.");
        setLoading(false);
        return;
      }
      const orderData = await orderRes.json();
      setOrder(orderData.data.order);

      // Fetch Tracking Details
      if (orderData.data.order.trackMySevaId) {
        const trackId = typeof orderData.data.order.trackMySevaId === 'object' 
          ? orderData.data.order.trackMySevaId._id 
          : orderData.data.order.trackMySevaId;
          
        const trackRes = await authFetch(`/api/v1/track-my-seva/${trackId}`);
        if (trackRes.ok) {
          const trackData = await trackRes.json();
          setTrack(trackData.data.trackMySeva);
        }
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackingDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBF4]">
        <Loader2 className="w-10 h-10 animate-spin text-gold-start" />
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-warm-gray">Loading Tracking Info...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBF4] p-6 text-center">
        <h2 className="text-2xl font-bold text-[#5C1A1A] mb-4">Tracking Information Unavailable</h2>
        <p className="text-warm-gray mb-8">{error || "This order may still be pending payment verification."}</p>
        <Link href="/my-seva">
          <button className="px-6 py-3 bg-[#5C1A1A] text-white rounded-xl text-sm font-bold uppercase tracking-widest">
            Back to My Orders
          </button>
        </Link>
      </div>
    );
  }

  const currentStatus = track?.currentStatus || order.orderStatus;
  const currentStepIndex = fullFlow.indexOf(currentStatus);

  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative pt-32 pb-24">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div className="absolute w-full h-[50vh] top-0 left-0 bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-70" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Back Link */}
        <Link href="/my-seva" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-warm-gray hover:text-[#5C1A1A] transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to My Seva
        </Link>

        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="font-display text-4xl font-extrabold text-[#5C1A1A] mb-2">Track My Seva</h1>
          <p className="text-sm font-bold uppercase tracking-widest text-charcoal opacity-70">
            Order #{order.orderNumber}
          </p>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-white/60 backdrop-blur-xl border border-gold-start/20 rounded-3xl p-8 shadow-sm mb-8">
          <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-warm-gray mb-8 text-center">
            Tracking Progress
          </h3>
          
          <div className="relative flex justify-between items-center mb-10 max-w-2xl mx-auto px-4 md:px-0">
            {/* Progress Line */}
            <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-1 bg-gray-200 -z-10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#D4A853] to-[#E8850A]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(0, (currentStepIndex / (fullFlow.length - 1)) * 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>

            {/* Nodes */}
            {fullFlow.map((status, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const StepIcon = statusConfig[status]?.icon || CheckCircle;

              return (
                <div key={status} className="flex flex-col items-center relative">
                  <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    isCompleted 
                      ? "bg-[#FFF5E6] border-gold-start text-gold-start shadow-[0_0_15px_rgba(212,168,83,0.3)]" 
                      : "bg-white border-gray-200 text-gray-300"
                  } ${isCurrent ? "scale-110" : ""}`}>
                    <StepIcon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className={`absolute top-full mt-3 text-[8px] md:text-[10px] uppercase tracking-widest font-bold whitespace-nowrap text-center ${
                    isCurrent ? "text-charcoal" : "text-gray-400"
                  }`}>
                    {statusConfig[status]?.label.replace(" ", "\n")}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Timeline Details */}
          <div className="mt-16 pt-8 border-t border-gold-start/10">
            {track?.timeline ? (
              <div className="space-y-6">
                {[...track.timeline].reverse().map((event: any, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 text-right shrink-0">
                      <div className="text-[10px] font-bold text-charcoal">{new Date(event.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                      <div className="text-[8px] uppercase tracking-wider text-warm-gray">{new Date(event.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="relative pb-6 flex-1 border-l-2 border-gold-start/20 pl-6">
                      <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-gold-start shadow-[0_0_5px_rgba(212,168,83,0.8)]" />
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-charcoal mb-1">{event.title}</h4>
                      <p className="text-sm font-medium text-warm-gray">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm font-bold text-charcoal mb-1">{statusConfig[currentStatus]?.label || currentStatus}</p>
                <p className="text-xs text-warm-gray">Your timeline will be updated shortly.</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/60 backdrop-blur-xl border border-gold-start/20 rounded-3xl p-6 shadow-sm">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-warm-gray mb-4">Delivery Details</h3>
            {order.addressId && (
              <div className="space-y-1">
                <p className="text-sm font-bold text-charcoal">{order.addressId.name}</p>
                <p className="text-sm text-warm-gray">{order.addressId.phone}</p>
                <p className="text-sm text-warm-gray mt-2 leading-relaxed">
                  {order.addressId.houseNo}, {order.addressId.street}<br/>
                  {order.addressId.city}, {order.addressId.state} - {order.addressId.pincode}
                </p>
              </div>
            )}
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-gold-start/20 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-warm-gray mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                {order.products.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-sm font-medium">
                    <span className="text-charcoal">{item.quantity}x {item.productName}</span>
                    <span className="text-warm-gray">₹{(item.priceAtPurchase * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-gold-start/10 flex justify-between items-end">
              <div>
                <span className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-1">Payment Status</span>
                <span className="text-xs font-bold px-2 py-1 rounded-md bg-green-50 text-green-600 border border-green-200">
                  {order.paymentId?.paymentStatus}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-1">Total Amount</span>
                <span className="text-lg font-bold text-[#5C1A1A]">₹{order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
