"use client";

import { motion } from "framer-motion";
import { User, Calendar, MapPin, Package, CreditCard, Ruler } from "lucide-react";

export default function OfferingDetailsPanel({ order }: { order?: any }) {
  if (!order) return null;

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
            <p className="font-display text-lg font-bold text-[#5C1A1A] mb-1">{order.userId?.name || "Devotee"}</p>
            <p className="text-xs text-charcoal/70">{order.userId?.email}</p>
            <p className="text-xs text-charcoal/70">{order.userId?.mobileNumber || "N/A"}</p>
          </div>
        </div>

        {/* UTR Number Details (Phase 6) */}
        {order.paymentId?.paymentMethod === "ONLINE" && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4 text-[#E8850A]" />
            </div>
            <div>
              <h5 className="text-[10px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-1">
                Payment Verification
              </h5>
              <p className="font-display text-lg font-bold text-[#5C1A1A] mb-1">UTR: {order.paymentId.utrNumber || "N/A"}</p>
              <p className="text-xs text-charcoal/70">Please verify this UTR in your bank statement.</p>
            </div>
          </div>
        )}

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
              Order Value
            </h5>
            <p className="font-display text-lg font-bold text-[#5C1A1A] mb-1">₹{order.totalAmount?.toLocaleString()}</p>
            <p className="text-xs text-charcoal/70">{order.products?.length || 0} Items</p>
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
              {order.addressId ? (
                <>
                  {order.addressId.addressLine1}<br />
                  {order.addressId.addressLine2 && <>{order.addressId.addressLine2}<br /></>}
                  {order.addressId.city}, {order.addressId.state}<br />
                  {order.addressId.pincode}
                </>
              ) : "N/A"}
            </p>
          </div>
        </div>

        {/* Payment & Packaging */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gold-start/20">
          <div>
            <h5 className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-2 flex items-center gap-2">
              <CreditCard className="w-3 h-3" /> Payment Status
            </h5>
            <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${
              order.paymentId?.paymentStatus === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : 
              order.paymentId?.paymentStatus === 'VERIFICATION_PENDING' ? 'bg-orange-100 text-orange-700' :
              'bg-red-100 text-red-700'
            }`}>
              {order.paymentId?.paymentStatus || "PENDING"}
            </span>
          </div>
          <div>
            <h5 className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-2 flex items-center gap-2">
              <Package className="w-3 h-3" /> Packaging
            </h5>
            <span className="bg-gold-start/10 text-gold-start text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-gold-start/30">
              {order.giftDetails?.isGift ? "Gift Wrap" : "Standard Box"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
