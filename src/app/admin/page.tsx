"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Users, Package, IndianRupee, TrendingUp, AlertTriangle } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/admin/dashboard`, {
          credentials: "include",
        });
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
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
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
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{data?.totalUsers || 0}</p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{data?.totalOrders || 0}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
            <IndianRupee className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">₹{data?.totalRevenue?.toLocaleString() || 0}</p>
          </div>
        </div>

        {/* Pending Verification */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Payments</p>
            <p className="text-2xl font-bold text-gray-900">{data?.pendingPayments || 0}</p>
          </div>
        </div>
      </div>
      
      {/* Additional Stats Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
         <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <button onClick={() => router.push('/admin/products')} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center text-sm font-medium text-gray-700">
             Manage Products
           </button>
           <button onClick={() => router.push('/admin/collections')} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center text-sm font-medium text-gray-700">
             Manage Collections
           </button>
           <button onClick={() => router.push('/admin/orders')} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center text-sm font-medium text-gray-700">
             Process Orders
           </button>
           <button onClick={() => router.push('/admin/payments')} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center text-sm font-medium text-gray-700">
             Verify Payments
           </button>
         </div>
      </div>
    </div>
  );
}
