"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CheckoutWelcome from "@/components/checkout/CheckoutWelcome";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import DivineSummary from "@/components/checkout/DivineSummary";
import CheckoutRecommendations from "@/components/checkout/CheckoutRecommendations";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OfferWithLovePage() {
  const router = useRouter();
  const [addressData, setAddressData] = useState({
    name: "",
    mobile: "",
    email: "",
    addressLine1: "",
    pincode: "",
  });
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      // 1. Create Address
      const addressRes = await fetch("http://localhost:8000/api/v1/address/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName: addressData.name,
          mobileNumber: addressData.mobile,
          addressLine1: addressData.addressLine1,
          pincode: addressData.pincode,
          city: "Vrindavan", // Default for demo
          state: "Uttar Pradesh",
          country: "India",
          addressType: "HOME"
        })
      });
      
      if (addressRes.status === 401) {
        router.push("/login");
        return;
      }
      
      const addressDataResponse = await addressRes.json();
      const addressId = addressDataResponse?.data?.address?._id;

      if (!addressId) {
         throw new Error("Failed to create address");
      }

      // 2. Create Checkout Session
      const sessionRes = await fetch("http://localhost:8000/api/v1/checkout/create", {
        method: "POST",
        credentials: "include"
      });
      
      const sessionData = await sessionRes.json();
      
      // 3. Attach Address to Session
      await fetch("http://localhost:8000/api/v1/checkout/address", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ addressId })
      });

      // 4. Set Payment Method
      await fetch("http://localhost:8000/api/v1/checkout/payment-method", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ paymentMethod: "RAZORPAY" })
      });

      alert("Divine Checkout Session Prepared Successfully! Proceeding to Payment (Phase 3)...");

    } catch (err) {
      console.error(err);
      alert("Something went wrong during checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-24 pt-32">
      
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-60" />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 2 }}
          className="absolute w-[80%] h-[80%] top-[10%] left-[-10%] bg-radial from-gold-start/20 via-[#FFF3DF]/50 to-transparent filter blur-[100px]" 
        />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 2, delay: 0.5 }}
          className="absolute w-[60%] h-[60%] top-[30%] right-[-10%] bg-radial from-lotus/10 to-transparent filter blur-[100px]" 
        />
        {/* Subtle floating petals */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`petal-checkout-${i}`}
            className="absolute rounded-[40%_0_40%_0] bg-gold-start/20 blur-[1.5px]"
            style={{ 
              width: Math.random() * 15 + 10, 
              height: Math.random() * 15 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              y: [0, -100], 
              opacity: [0, 0.6, 0], 
              rotate: [0, 180] 
            }}
            transition={{ duration: 12 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      {/* ── DIVINE NAVIGATION ── */}
      <div className="w-full max-w-7xl mx-auto px-6 mb-8 relative z-50">
        <div className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-widest font-bold">
          <Link href="/" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-gold-start/50" />
          <Link href="/collections" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Divine Offering</Link>
          <ChevronRight className="w-3 h-3 text-gold-start/50" />
          <Link href="/divine-cart" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Complete Your Divine Seva</Link>
          <ChevronRight className="w-3 h-3 text-gold-start/50" />
          <span className="text-[#5C1A1A]">Offer With Love</span>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ── HEADER / WELCOME ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CheckoutWelcome />
        </motion.div>

        {/* ── LAYOUT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
          
          {/* LEFT: Checkout Form (Delivery, Packaging, Gift) */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CheckoutForm addressData={addressData} setAddressData={setAddressData} />
            </motion.div>
          </div>
          
          {/* RIGHT: Divine Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <DivineSummary handleCheckout={handleCheckout} isProcessing={isProcessing} />
            </motion.div>
          </div>
        </div>

        {/* ── RECOMMENDATIONS ── */}
        <CheckoutRecommendations />

      </div>
    </main>
  );
}
