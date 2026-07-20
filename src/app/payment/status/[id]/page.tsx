"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Clock, XCircle, ChevronRight, RefreshCw } from "lucide-react";

import { use } from 'react';

export default function PaymentStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id; // orderId
  
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/payments/status/${id}`, {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        const currentStatus = data.data.paymentStatus;
        setStatus(currentStatus);
        
        // If rejected, let them resubmit
        if (currentStatus === "PAYMENT_REJECTED") {
          setTimeout(() => {
            router.push(`/payment/${id}`);
          }, 3000);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    
    // Simple polling every 5 seconds if under verification
    const interval = setInterval(() => {
      if (status === "UNDER_VERIFICATION") {
        fetchStatus();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [id, status]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF4]">
        <div className="w-12 h-12 border-4 border-gold-start/20 border-t-gold-start rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-24 pt-32 flex flex-col items-center justify-center">
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-60" />
      </div>

      <div className="w-full max-w-lg mx-auto px-6 relative z-10 text-center">
        <div className="bg-white/60 backdrop-blur-xl border border-gold-start/20 rounded-[2rem] shadow-sm p-10 flex flex-col items-center">
          
          {status === "PAYMENT_APPROVED" || status === "ORDER_CONFIRMED" ? (
            <>
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="font-display text-3xl font-extrabold text-[#5C1A1A] mb-2">Payment Successful</h1>
              <p className="text-warm-gray mb-8">
                Your payment has been verified by the admin and your order is confirmed. Thank you for your seva!
              </p>
              <Link href="/my-seva">
                <button className="px-8 py-4 bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] text-white rounded-xl shadow-md text-[11px] uppercase tracking-[0.15em] font-bold hover:scale-[1.02] transition-all">
                  Track My Seva
                </button>
              </Link>
            </>
          ) : status === "PAYMENT_REJECTED" ? (
            <>
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="font-display text-3xl font-extrabold text-[#5C1A1A] mb-2">Payment Rejected</h1>
              <p className="text-warm-gray mb-4">
                The admin could not verify your payment. You will be redirected to submit the details again.
              </p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 border-4 border-blue-100 relative">
                <Clock className="w-10 h-10 text-blue-500 animate-pulse" />
              </div>
              <h1 className="font-display text-3xl font-extrabold text-[#5C1A1A] mb-2">Under Verification</h1>
              <p className="text-warm-gray mb-8">
                We have received your payment request. An admin is currently verifying your UTR number. Please wait.
              </p>
              
              <button 
                onClick={fetchStatus}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gold-start hover:text-[#5C1A1A] transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Refresh Status
              </button>
            </>
          )}

        </div>
      </div>
    </main>
  );
}
