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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Payment Verification</h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
            {error}
          </div>
        )}

        {payments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-500">There are no pending payment verification requests at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {payments.map(payment => (
              <div key={payment._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="bg-yellow-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-yellow-700 text-sm font-semibold">
                    <Clock className="w-4 h-4" />
                    Pending Verification
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    {new Date(payment.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="p-5 flex-1">
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Devotee</p>
                    <p className="font-bold text-gray-900">{payment.userId?.fullName || "Unknown User"}</p>
                    <p className="text-sm text-gray-600">{payment.userId?.email}</p>
                    <p className="text-sm text-gray-600">{payment.userId?.phone}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Amount</p>
                    <p className="text-2xl font-bold text-indigo-600">₹{payment.totalAmount?.toLocaleString()}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">UTR Number</p>
                    <div className="bg-gray-50 p-2 rounded-lg font-mono text-sm border border-gray-100 text-gray-800 break-all">
                      {payment.utrNumber}
                    </div>
                  </div>

                  {payment.screenshotUrl && (
                    <div className="mb-4">
                      <a 
                        href={payment.screenshotUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        View Screenshot
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 border-t border-gray-100">
                  <button
                    onClick={() => handleAction(payment._id, "reject")}
                    disabled={actionLoading !== null}
                    className="flex items-center justify-center gap-2 py-3 px-4 hover:bg-red-50 text-red-600 transition-colors font-medium text-sm disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(payment._id, "approve")}
                    disabled={actionLoading !== null}
                    className="flex items-center justify-center gap-2 py-3 px-4 hover:bg-green-50 text-green-600 transition-colors font-medium text-sm border-l border-gray-100 disabled:opacity-50"
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
