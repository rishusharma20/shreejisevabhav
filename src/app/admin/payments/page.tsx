"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, X, ShieldCheck, Clock, ExternalLink } from "lucide-react";

export default function AdminPaymentsPage() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchPayments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/admin/payments`, {
        credentials: "include"
      });
      if (res.status === 401 || res.status === 403) {
        router.push("/login");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPayments(data.data.payments);
      } else {
        setError("Failed to fetch pending payments");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [router]);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setActionLoading(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/admin/payments/${action}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      
      if (res.ok) {
        // Remove from list
        setPayments(prev => prev.filter(p => p._id !== id));
      } else {
        const data = await res.json();
        alert(data.message || `Failed to ${action} payment`);
      }
    } catch (err) {
      alert(`An error occurred while trying to ${action}`);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <Loader2 className="w-10 h-10 text-saffron-deep animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="w-8 h-8 text-saffron-deep" />
          <h1 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider">Payment Verification</h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
            {error}
          </div>
        )}

        {payments.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(212,168,83,0.05)] border border-gold-start/20 p-12 text-center">
            <Check className="w-12 h-12 text-saffron-deep/40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#5C1A1A] mb-2">All Caught Up!</h3>
            <p className="text-[#8B6F4E] font-medium text-sm">There are no pending payment verification requests at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {payments.map(payment => (
              <div key={payment._id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(212,168,83,0.05)] border border-gold-start/20 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-gold-start/10 px-4 py-3 border-b border-gold-start/20 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-saffron-deep text-[11px] font-bold uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    Pending Verification
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B6F4E]/70">
                    {new Date(payment.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="p-5 flex-1">
                  <div className="mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1">Devotee</p>
                    <p className="font-bold text-[#5C1A1A]">{payment.userId?.fullName || "Unknown User"}</p>
                    <p className="text-xs font-medium text-charcoal/70">{payment.userId?.email}</p>
                    <p className="text-xs font-medium text-charcoal/70">{payment.userId?.phone}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1">Amount</p>
                    <p className="text-2xl font-bold text-saffron-deep">₹{payment.totalAmount?.toLocaleString()}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1">UTR Number</p>
                    <div className="bg-white/50 p-2.5 rounded-xl font-mono text-xs border border-gold-start/20 text-[#5C1A1A] font-bold break-all">
                      {payment.utrNumber}
                    </div>
                  </div>

                  {payment.screenshotUrl && (
                    <div className="mb-4">
                      <a 
                        href={payment.screenshotUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-saffron hover:text-saffron-deep transition-colors"
                      >
                        View Screenshot
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 border-t border-gold-start/20">
                  <button
                    onClick={() => handleAction(payment._id, "reject")}
                    disabled={actionLoading !== null}
                    className="flex items-center justify-center gap-2 py-4 px-4 hover:bg-red-50 text-red-600 transition-colors text-[11px] font-bold uppercase tracking-wider disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(payment._id, "approve")}
                    disabled={actionLoading !== null}
                    className="flex items-center justify-center gap-2 py-4 px-4 hover:bg-green-50 text-green-700 transition-colors text-[11px] font-bold uppercase tracking-wider border-l border-gold-start/20 disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
