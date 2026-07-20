"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { QrCode, Upload, ShieldCheck, ChevronRight, Copy, Check } from "lucide-react";

import { use } from 'react';

export default function PaymentPage({ params }: { params: Promise<{ orderId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const orderId = resolvedParams.orderId;
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [utr, setUtr] = useState("");
  const [screenshotUrl, setScreenshotUrl] = useState(""); // Optional MVP
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/payments/status/${orderId}`, {
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
          setStatus(data.data.paymentStatus);
          if (data.data.paymentStatus === "UNDER_VERIFICATION" || data.data.paymentStatus === "PAYMENT_APPROVED") {
            router.push(`/payment/status/${orderId}`);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    checkStatus();
  }, [orderId, router]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("sharmaakriti232000-1@okhdfcbank");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utr.trim()) {
      setError("Please enter the UTR / Reference number.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/payments/submit-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          orderId,
          utrNumber: utr.trim(),
          screenshotUrl
        })
      });

      const data = await res.json();
      if (res.ok) {
        router.push(`/payment/status/${orderId}`);
      } else {
        setError(data.message || "Failed to submit payment details.");
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

  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-24 pt-32">
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-60" />
      </div>

      <div className="w-full max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[#5C1A1A] leading-[1.1] mb-4">
            Offer Your Seva
          </h1>
          <p className="text-sm md:text-base text-warm-gray">
            Please scan the QR code to make your offering, then provide the UTR number below.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-gold-start/20 rounded-[2rem] shadow-sm p-6 md:p-10">
          
          {status === "PAYMENT_REJECTED" && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-center text-red-600">
              <h3 className="font-bold mb-1">Payment Rejected</h3>
              <p className="text-sm">Please verify your payment details and submit the correct UTR number.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            
            {/* LEFT: QR Code Section */}
            <div className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-sm border border-gold-start/10">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-6 bg-white p-2 sm:p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gold-start/10">
                <div className="w-full h-full relative rounded-xl overflow-hidden bg-[#FFFBF4] border border-gold-start/20 flex flex-col items-center justify-center">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi%3A%2F%2Fpay%3Fpa%3Dsharmaakriti232000-1%40okhdfcbank%26pn%3DShreeji%2520Seva%2520Bhav" 
                    alt="Payment QR Code" 
                    className="w-full h-full object-contain mix-blend-multiply p-2" 
                  />
                </div>
              </div>
              <div className="w-full text-center space-y-3">
                <p className="text-[10px] uppercase tracking-widest font-bold text-warm-gray">Scan to Pay using UPI</p>
                <div className="flex items-center justify-between mt-2 p-3 bg-white border border-gold-start/20 rounded-xl">
                  <span className="text-sm font-bold text-charcoal">sharmaakriti232000-1@okhdfcbank</span>
                  <button onClick={handleCopyUpi} className="p-1.5 hover:bg-gold-start/10 rounded-lg transition-colors">
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-warm-gray" />}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Form Section */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-warm-gray mb-2">
                  UTR / Reference Number *
                </label>
                <input 
                  type="text"
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  placeholder="e.g. 123456789012"
                  className="w-full px-4 py-3 bg-white border border-gold-start/20 rounded-xl focus:outline-none focus:border-gold-start focus:ring-1 focus:ring-gold-start transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-warm-gray mb-2">
                  Payment Screenshot URL (Optional)
                </label>
                <input 
                  type="text"
                  value={screenshotUrl}
                  onChange={(e) => setScreenshotUrl(e.target.value)}
                  placeholder="Paste URL (mocking file upload for MVP)"
                  className="w-full px-4 py-3 bg-white border border-gold-start/20 rounded-xl focus:outline-none focus:border-gold-start focus:ring-1 focus:ring-gold-start transition-all text-sm font-medium"
                />
              </div>

              {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

              <button 
                type="submit"
                disabled={submitting}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all duration-300 ${
                  submitting 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] text-white hover:scale-[1.02]"
                }`}
              >
                <span className="text-[11px] uppercase tracking-[0.15em] font-bold">
                  {submitting ? "Submitting..." : "Submit Payment Request"}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 opacity-60">
                <ShieldCheck className="w-4 h-4 text-charcoal" />
                <span className="text-[8px] uppercase tracking-widest font-bold text-charcoal">Admin verification required</span>
              </div>
            </form>

          </div>
        </div>
      </div>
    </main>
  );
}
