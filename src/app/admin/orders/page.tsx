"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Package, Truck, Loader2, Save, MapPin } from "lucide-react";
import { authFetch } from "@/lib/authFetch";

export default function AdminOrdersPage() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [statusUpdates, setStatusUpdates] = useState<Record<string, string>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const statuses = [
    "PAYMENT_PENDING",
    "UNDER_VERIFICATION",
    "PAYMENT_APPROVED",
    "PAYMENT_REJECTED",
    "ORDER_CONFIRMED",
    "PREPARING",
    "PACKAGING",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED"
  ];

  const fetchOrders = async () => {
    try {
      const res = await authFetch("/api/v1/orders/admin/all");
      if (res.status === 401 || res.status === 403) {
        router.push("/login");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setOrders(data.data.orders);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [router]);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setStatusUpdates(prev => ({ ...prev, [orderId]: newStatus }));
  };

  const saveStatus = async (orderId: string) => {
    const newStatus = statusUpdates[orderId];
    if (!newStatus) return;
    
    setActionLoading(orderId);
    try {
      const res = await authFetch(`/api/v1/admin/orders/${orderId}`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
        
        // Remove from updates
        const updated = { ...statusUpdates };
        delete updated[orderId];
        setStatusUpdates(updated);
        
        alert("Status updated successfully.");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to update status.");
      }
    } catch (err) {
      alert("An error occurred while updating status.");
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
          <Truck className="w-8 h-8 text-saffron-deep" />
          <h1 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider">Order Management</h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(212,168,83,0.05)] border border-gold-start/20 p-12 text-center">
            <Package className="w-12 h-12 text-saffron-deep/40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#5C1A1A] mb-2">No Orders Yet</h3>
            <p className="text-[#8B6F4E] font-medium text-sm">There are no orders in the system.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(212,168,83,0.05)] border border-gold-start/20 p-6 flex flex-col md:flex-row gap-6 justify-between items-center hover:bg-gold-start/5 transition-colors">
                
                <div className="flex-1 space-y-3">
                  <div className="flex gap-3 items-center">
                    <span className="font-mono font-bold text-[#5C1A1A] text-lg tracking-wider">{order.orderNumber}</span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      order.paymentId?.paymentStatus === "PAYMENT_APPROVED" ? "bg-green-100 text-green-700 border border-green-200" : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    }`}>
                      {order.paymentId?.paymentStatus || "UNKNOWN"}
                    </span>
                  </div>
                  
                  <div className="text-xs font-bold uppercase tracking-wider text-charcoal/70">
                    <span className="text-saffron-deep">{order.userId?.name || order.userId?.fullName || "User"}</span> 
                    <span className="mx-2 text-gold-start/30">•</span> 
                    {order.userId?.email}
                  </div>
                  
                  <div className="text-sm font-bold text-[#5C1A1A]">
                    ₹{order.totalAmount?.toLocaleString()} <span className="text-[#8B6F4E] font-medium text-xs ml-1">({order.products?.length || 0} items)</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="flex flex-col gap-1.5 w-full md:w-48">
                    <label className="text-[10px] font-bold uppercase text-[#8B6F4E] tracking-wider">Update Status</label>
                    <select 
                      value={statusUpdates[order._id] || order.orderStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="w-full bg-white/50 border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all"
                    >
                      {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  
                  <button
                    onClick={() => saveStatus(order._id)}
                    disabled={!statusUpdates[order._id] || actionLoading === order._id}
                    className="mt-6 px-5 py-2.5 bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] bg-[length:200%_auto] text-white rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_15px_rgba(212,168,83,0.2)] hover:bg-[position:right_center] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === order._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save
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
