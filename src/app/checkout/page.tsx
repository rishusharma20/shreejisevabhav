"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft, MapPin, Check, ShieldCheck, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [addrRes, sumRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/address`, { credentials: "include" }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/checkout/summary`, { credentials: "include" })
        ]);

        if (addrRes.status === 401 || sumRes.status === 401) {
          router.push("/login");
          return;
        }

        if (addrRes.ok) {
          const data = await addrRes.json();
          setAddresses(data.data.addresses || []);
          const defaultAddr = data.data.addresses?.find((a: any) => a.isDefault);
          if (defaultAddr) setSelectedAddressId(defaultAddr._id);
          else if (data.data.addresses?.length > 0) setSelectedAddressId(data.data.addresses[0]._id);
        }

        if (sumRes.ok) {
          const data = await sumRes.json();
          setSummary(data.data.cart);
        } else {
          setError("Your cart is empty or unable to fetch checkout summary.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  const handleCheckout = async () => {
    if (!selectedAddressId) {
      setError("Please select a delivery address.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ addressId: selectedAddressId })
      });

      const data = await res.json();
      if (res.ok) {
        clearCart();
        // Route to Phase 5 Payment Page
        router.push(`/payment/${data.data.orderId}`);
      } else {
        setError(data.message || "Failed to create order. Please try again.");
        setSubmitting(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF4]">
        <div className="w-12 h-12 border-4 border-gold-start/20 border-t-gold-start rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBF4] p-6 text-center">
        <h2 className="text-2xl font-display font-bold text-[#5C1A1A] mb-4">Cannot Proceed</h2>
        <p className="text-warm-gray mb-8">{error || "Your cart is empty."}</p>
        <Link href="/cart">
          <button className="px-6 py-3 bg-gold-start text-white font-bold rounded-full text-xs uppercase tracking-widest">
            Return to Cart
          </button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-24 pt-32">
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-60" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 mb-8 relative z-50 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-widest font-bold">
          <Link href="/cart" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Cart</Link>
          <ChevronRight className="w-3 h-3 text-gold-start/50" />
          <span className="text-[#5C1A1A]">Checkout</span>
        </div>
        <Link href="/cart" className="hidden md:flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-warm-gray hover:text-gold-start transition-colors group">
          <ChevronRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </Link>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[#5C1A1A] leading-[1.1] mb-4">
            Complete Your Seva
          </h1>
          <p className="text-sm md:text-base text-warm-gray max-w-2xl">
            Select your delivery address and confirm your offerings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
          {/* LEFT: Address Selection */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="font-display text-2xl font-bold text-charcoal border-b border-gold-start/20 pb-4">
              Select Delivery Address
            </h2>

            {addresses.length === 0 ? (
              <div className="bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-2xl p-6 text-center">
                <p className="text-warm-gray mb-4">No saved addresses found.</p>
                <Link href="/my-seva">
                  <button className="px-4 py-2 border border-gold-start text-gold-start font-bold rounded-full text-xs uppercase tracking-widest hover:bg-gold-start hover:text-white transition-colors">
                    Add Address in Profile
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div
                    key={address._id}
                    onClick={() => setSelectedAddressId(address._id)}
                    className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer bg-white/60 backdrop-blur-sm ${selectedAddressId === address._id
                        ? "border-gold-start shadow-md bg-gold-start/5"
                        : "border-transparent hover:border-gold-start/40"
                      }`}
                  >
                    {selectedAddressId === address._id && (
                      <div className="absolute top-4 right-4 text-gold-start">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-warm-gray" />
                      <span className="font-bold text-charcoal">{address.type}</span>
                    </div>
                    <p className="text-sm text-charcoal font-medium">{address.fullName}</p>
                    <p className="text-xs text-warm-gray mt-1 line-clamp-2">
                      {address.addressLine1}, {address.city}, {address.state} - {address.pinCode}
                    </p>
                    <p className="text-xs text-warm-gray mt-1">Phone: {address.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <div className="w-full bg-white/50 backdrop-blur-2xl border border-gold-start/30 rounded-[2rem] p-6 shadow-sm sticky top-32">
              <h2 className="font-display text-xl font-bold text-charcoal mb-6 pb-4 border-b border-gold-start/15">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {summary.products.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-start gap-4 text-sm">
                    <div className="flex-1">
                      <p className="font-bold text-charcoal line-clamp-1">{item.productId.name}</p>
                      <p className="text-xs text-warm-gray">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-charcoal">₹{(item.variantId.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6 pt-4 border-t border-gold-start/15 text-sm">
                <div className="flex justify-between items-center text-warm-gray font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-charcoal">₹{summary.totalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-warm-gray font-medium">
                  <span>Delivery</span>
                  <span className="font-bold text-[#25D366]">Complimentary</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gold-start/20 mb-8 flex justify-between items-end">
                <div className="text-[10px] uppercase tracking-widest font-bold text-warm-gray mb-1">Total Amount</div>
                <div className="font-display text-2xl font-bold text-[#5C1A1A]">₹{summary.totalAmount?.toLocaleString()}</div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={submitting || !selectedAddressId}
                className={`w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-md transition-all duration-300 ${submitting || !selectedAddressId
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] text-white hover:scale-[1.02]"
                  }`}
              >
                <Heart className="w-5 h-5 fill-current" />
                <span className="text-[11px] uppercase tracking-[0.15em] font-bold">
                  {submitting ? "Processing..." : "Proceed to Payment"}
                </span>
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 opacity-60">
                <ShieldCheck className="w-4 h-4 text-charcoal" />
                <span className="text-[8px] uppercase tracking-widest font-bold text-charcoal">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
