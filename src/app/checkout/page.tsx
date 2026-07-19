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
  
  // Phase 3: Manual UPI Payment State
  const [showQRModal, setShowQRModal] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");
  const [isSubmittingUTR, setIsSubmittingUTR] = useState(false);

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

      // 4. Set Payment Method (Manual UPI)
      await fetch("http://localhost:8000/api/v1/checkout/payment-method", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ paymentMethod: "ONLINE" })
      });

      // Instead of alert, show QR modal
      setShowQRModal(true);

    } catch (err) {
      console.error(err);
      alert("Something went wrong during checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitUTR = async () => {
    if (!utrNumber || utrNumber.length < 6) {
      alert("Please enter a valid UTR number.");
      return;
    }

    try {
      setIsSubmittingUTR(true);
      const res = await fetch("http://localhost:8000/api/v1/orders/create-manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ utrNumber })
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setShowQRModal(false);
        // Dispatch to clear cart context not strictly needed since backend clears it and next load will be empty
        // But forcing a reload or redirecting is good
        router.push("/my-seva"); // Redirect to dashboard to track seva
      } else {
        alert(data.message || "Failed to submit UTR. Please try again.");
      }
    } catch (err) {
      console.error("UTR submission error:", err);
      alert("An error occurred while submitting UTR.");
    } finally {
      setIsSubmittingUTR(false);
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

      {/* ── QR CODE MODAL (Phase 3) ── */}
      {showQRModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <div className="text-center mb-6">
              <h2 className="font-display text-2xl font-bold text-[#5C1A1A] mb-2">Divine Offering Payment</h2>
              <p className="text-sm text-warm-gray">Please scan the QR code below using any UPI app to complete your payment.</p>
            </div>
            
            <div className="flex justify-center mb-6">
              <img 
                src="/images/payment-qr.png" 
                alt="UPI QR Code" 
                className="w-64 h-64 object-contain border-2 border-gold-start/20 p-2 rounded-2xl shadow-sm"
              />
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-widest font-bold text-warm-gray">UPI ID</span>
                <p className="font-bold text-charcoal">sharmaakriti232000-1@okhdfcbank</p>
              </div>

              <div className="relative group mt-4">
                <input 
                  type="text" 
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  placeholder="Enter 12-digit UTR Number" 
                  className="w-full bg-white border border-gold-start/30 rounded-xl py-3.5 px-4 text-center text-sm font-bold tracking-widest text-charcoal focus:outline-none focus:border-gold-start focus:ring-1 focus:ring-gold-start/50 transition-all placeholder:text-warm-gray/60 placeholder:font-normal"
                />
              </div>

              <motion.button 
                onClick={handleSubmitUTR}
                disabled={isSubmittingUTR || utrNumber.length < 6}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] bg-[length:200%_auto] text-white flex items-center justify-center font-bold text-sm tracking-widest uppercase hover:bg-[position:right_center] transition-all disabled:opacity-50"
              >
                {isSubmittingUTR ? "Verifying..." : "Submit Payment"}
              </motion.button>
              
              <button 
                onClick={() => setShowQRModal(false)}
                className="w-full py-3 text-[10px] font-bold text-warm-gray uppercase tracking-widest hover:text-[#5C1A1A] transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
