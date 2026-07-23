"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Users, Package, IndianRupee, TrendingUp, AlertTriangle } from "lucide-react";
import { authFetch } from "@/lib/authFetch";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await authFetch("/api/v1/admin/dashboard");
        if (res.status === 401 || res.status === 403) {
          router.push("/login");
          return;
        }
        if (res.ok) {
          const json = await res.json();
          setData(json.data.dashboardData);
        } else {
          setError("Failed to fetch dashboard data");
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-saffron-deep" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider">Dashboard Overview</h1>
        <p className="text-sm font-bold uppercase tracking-wider text-[#8B6F4E]">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gold-start/20 flex items-center gap-4 transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-gold-start/10 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-saffron-deep" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60">Total Users</p>
            <p className="text-2xl font-bold text-[#5C1A1A]">{data?.totalUsers || 0}</p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gold-start/20 flex items-center gap-4 transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6 text-saffron-deep" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60">Total Orders</p>
            <p className="text-2xl font-bold text-[#5C1A1A]">{data?.totalOrders || 0}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gold-start/20 flex items-center gap-4 transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center border border-green-100">
            <IndianRupee className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60">Total Revenue</p>
            <p className="text-2xl font-bold text-[#5C1A1A]">₹{data?.totalRevenue?.toLocaleString() || 0}</p>
          </div>
        </div>

        {/* Pending Verification */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gold-start/20 flex items-center gap-4 transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60">Pending Payments</p>
            <p className="text-2xl font-bold text-[#5C1A1A]">{data?.pendingPayments || 0}</p>
          </div>
        </div>
      </div>
      
      {/* Additional Stats Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(212,168,83,0.05)] border border-gold-start/20 p-6 mt-8">
         <h2 className="font-display text-xl font-bold text-[#5C1A1A] mb-6">Quick Links</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <button onClick={() => router.push('/admin/products')} className="p-4 border border-gold-start/20 rounded-xl hover:bg-gold-start/5 hover:border-gold-start/40 transition-all text-center text-[11px] font-bold uppercase tracking-wider text-charcoal shadow-sm">
             Manage Products
           </button>
           <button onClick={() => router.push('/admin/collections')} className="p-4 border border-gold-start/20 rounded-xl hover:bg-gold-start/5 hover:border-gold-start/40 transition-all text-center text-[11px] font-bold uppercase tracking-wider text-charcoal shadow-sm">
             Manage Collections
           </button>
           <button onClick={() => router.push('/admin/orders')} className="p-4 border border-gold-start/20 rounded-xl hover:bg-gold-start/5 hover:border-gold-start/40 transition-all text-center text-[11px] font-bold uppercase tracking-wider text-charcoal shadow-sm">
             Process Orders
           </button>
           <button onClick={() => router.push('/admin/payments')} className="p-4 border border-gold-start/20 rounded-xl hover:bg-gold-start/5 hover:border-gold-start/40 transition-all text-center text-[11px] font-bold uppercase tracking-wider text-charcoal shadow-sm">
             Verify Payments
           </button>
         </div>
      </div>
    </div>
  );
}
