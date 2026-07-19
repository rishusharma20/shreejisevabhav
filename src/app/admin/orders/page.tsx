"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Package, Truck, Loader2, Save, MapPin } from "lucide-react";

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
    "DELIVERED",
    "CANCELLED"
  ];

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/orders/admin/all`, {
        credentials: "include"
      });
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center gap-3 mb-8">
          <Truck className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-500">There are no orders in the system.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6 justify-between items-center">
                
                <div className="flex-1 space-y-2">
                  <div className="flex gap-3 items-center">
                    <span className="font-mono font-bold text-gray-900">{order.orderNumber}</span>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                      order.paymentId?.paymentStatus === "PAYMENT_APPROVED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.paymentId?.paymentStatus || "UNKNOWN"}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">{order.userId?.name || order.userId?.fullName || "User"}</span> 
                    <span className="mx-2">•</span> 
                    {order.userId?.email}
                  </div>
                  
                  <div className="text-sm font-medium text-gray-800">
                    ₹{order.totalAmount?.toLocaleString()} <span className="text-gray-400 font-normal">({order.products?.length || 0} items)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="flex flex-col gap-1 w-full md:w-48">
                    <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Update Status</label>
                    <select 
                      value={statusUpdates[order._id] || order.orderStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  
                  <button
                    onClick={() => saveStatus(order._id)}
                    disabled={!statusUpdates[order._id] || actionLoading === order._id}
                    className="mt-5 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
