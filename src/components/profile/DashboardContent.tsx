"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TabType } from "./DashboardNav";
import { MapPin, User, Mail, Phone, Loader2, Edit2, Plus, Trash2, KeyRound, ShieldAlert, Star, Check, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DashboardContentProps {
  activeTab: TabType;
}

export default function DashboardContent({ activeTab }: DashboardContentProps) {
  return (
    <div className="flex-1 min-h-[400px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15, scale: 0.98, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -15, scale: 0.98, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/40 backdrop-blur-[32px] border border-gold-start/20 rounded-3xl p-6 md:p-10 shadow-[0_20px_60px_rgba(212,168,83,0.1),inset_0_1px_0_rgba(255,255,255,0.7)] overflow-hidden relative"
        >
          {/* Subtle inner mandala glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-start/10 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="relative z-10">
            {activeTab === "my-orders" && <MyOrders />}
            {activeTab === "personal-details" && <PersonalDetails />}
            {activeTab === "my-addresses" && <MyAddresses />}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Tab 1: Personal Details ──
function PersonalDetails() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"view" | "edit" | "password">("view");

  // Edit Form State
  const [editForm, setEditForm] = useState({ name: "", phone: "" });
  const [pwdForm, setPwdForm] = useState({ oldPassword: "", newPassword: "" });
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/auth/profile`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setProfile(data.data.user);
        setEditForm({ name: data.data.user.name, phone: data.data.user.phone || "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/auth/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data.data.user);
        setMode("view");
        setMessage({ text: "Profile updated successfully.", type: "success" });
      } else {
        setMessage({ text: data.message || "Failed to update profile.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Network error occurred.", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/auth/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(pwdForm),
      });
      const data = await res.json();
      if (res.ok) {
        setMode("view");
        setPwdForm({ oldPassword: "", newPassword: "" });
        setMessage({ text: "Password changed successfully.", type: "success" });
      } else {
        setMessage({ text: data.message || "Failed to change password.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Network error occurred.", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/auth/delete-account`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        router.push("/login");
      } else {
        setMessage({ text: "Failed to delete account.", type: "error" });
        setActionLoading(false);
      }
    } catch (err) {
      setMessage({ text: "Network error occurred.", type: "error" });
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gold-start">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="text-xs uppercase tracking-widest font-bold mt-4 text-warm-gray">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
        <div className="space-y-1">
          <h2 className="font-display text-2xl text-[#5C1A1A] font-extrabold tracking-wide drop-shadow-sm">Personal Details</h2>
          <p className="text-xs text-warm-gray tracking-wide font-medium">Manage your profile and account settings.</p>
        </div>
        
        {mode === "view" && (
          <div className="flex gap-2">
            <button onClick={() => setMode("password")} className="text-[10px] font-bold text-warm-gray uppercase tracking-[0.2em] hover:text-[#5C1A1A] transition-colors px-4 py-2 rounded-full border border-warm-gray/30 hover:border-[#5C1A1A] bg-white/50 hover:bg-white shadow-sm flex items-center gap-1.5">
              <KeyRound className="w-3 h-3" /> Password
            </button>
            <button onClick={() => setMode("edit")} className="text-[10px] font-bold text-saffron uppercase tracking-[0.2em] hover:text-gold-start transition-colors px-4 py-2 rounded-full border border-saffron/30 hover:border-gold-start bg-white/50 hover:bg-white shadow-sm flex items-center gap-1.5">
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
        )}
        {mode !== "view" && (
          <button onClick={() => { setMode("view"); setMessage({ text: "", type: "" }); }} className="text-[10px] font-bold text-warm-gray uppercase tracking-[0.2em] hover:text-charcoal transition-colors px-4 py-2 rounded-full border border-warm-gray/30 hover:border-charcoal bg-white/50 hover:bg-white shadow-sm">
            Cancel
          </button>
        )}
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl text-sm font-semibold mb-6 ${message.type === "error" ? "bg-red-50 text-red-600 border border-red-200" : "bg-green-50 text-green-600 border border-green-200"}`}>
          {message.text}
        </div>
      )}

      {mode === "view" && profile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-md rounded-2xl border border-transparent hover:border-gold-start/20 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center shadow-sm">
                <User className="w-4 h-4 text-warm-gray" />
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-widest text-warm-gray font-bold mb-0.5">Full Name</div>
                <div className="text-sm font-bold text-charcoal">{profile.name}</div>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-md rounded-2xl border border-transparent hover:border-gold-start/20 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center shadow-sm">
                <Mail className="w-4 h-4 text-warm-gray" />
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-widest text-warm-gray font-bold mb-0.5">Email Address</div>
                <div className="text-sm font-bold text-charcoal">{profile.email}</div>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-md rounded-2xl border border-transparent hover:border-gold-start/20 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center shadow-sm">
                <Phone className="w-4 h-4 text-warm-gray" />
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-widest text-warm-gray font-bold mb-0.5">Phone Number</div>
                <div className="text-sm font-bold text-charcoal">{profile.phone || "Not provided"}</div>
              </div>
            </motion.div>
          </div>
          
          <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-red-50/50 backdrop-blur-xl rounded-2xl border border-red-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] h-full transition-all flex flex-col justify-center items-start">
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-700">Danger Zone</h4>
            </div>
            <p className="text-sm text-red-600/80 leading-relaxed font-medium mb-6">
              Permanently remove your account and all associated data. This action is irreversible.
            </p>
            <button 
              onClick={handleDeleteAccount}
              disabled={actionLoading}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors disabled:opacity-50"
            >
              {actionLoading ? "Processing..." : "Delete Account"}
            </button>
          </motion.div>
        </div>
      )}

      {mode === "edit" && (
        <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-md">
          <div className="space-y-4">
            <div>
              <label className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-2">Full Name</label>
              <input 
                type="text" 
                required 
                value={editForm.name} 
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                className="w-full bg-white/70 border border-gold-start/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-start transition-colors" 
              />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-2">Phone Number</label>
              <input 
                type="text" 
                value={editForm.phone} 
                onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                className="w-full bg-white/70 border border-gold-start/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-start transition-colors" 
                placeholder="+91..."
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={actionLoading}
            className="w-full py-3 bg-[#5C1A1A] hover:bg-[#8B6F4E] text-white rounded-xl text-sm font-bold tracking-widest uppercase transition-colors disabled:opacity-50"
          >
            {actionLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}

      {mode === "password" && (
        <form onSubmit={handleChangePassword} className="space-y-6 max-w-md">
          <div className="space-y-4">
            <div>
              <label className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-2">Current Password</label>
              <input 
                type="password" 
                required 
                value={pwdForm.oldPassword} 
                onChange={(e) => setPwdForm({...pwdForm, oldPassword: e.target.value})}
                className="w-full bg-white/70 border border-gold-start/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-start transition-colors" 
              />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-2">New Password</label>
              <input 
                type="password" 
                required 
                value={pwdForm.newPassword} 
                onChange={(e) => setPwdForm({...pwdForm, newPassword: e.target.value})}
                className="w-full bg-white/70 border border-gold-start/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-start transition-colors" 
                minLength={8}
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={actionLoading}
            className="w-full py-3 bg-[#5C1A1A] hover:bg-[#8B6F4E] text-white rounded-xl text-sm font-bold tracking-widest uppercase transition-colors disabled:opacity-50"
          >
            {actionLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </div>
  );
}

// ── Tab 2: My Addresses ──
function MyAddresses() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [mode, setMode] = useState<"list" | "form">("list");
  const [message, setMessage] = useState({ text: "", type: "" });
  
  const [form, setForm] = useState({
    _id: "", name: "", phone: "", houseNo: "", street: "", city: "", state: "", country: "India", pincode: ""
  });

  const fetchAddresses = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/address`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setAddresses(data.data.addresses);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const url = form._id 
        ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/address/update/${form._id}`
        : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/address/add`;
      const method = form._id ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form)
      });
      
      const data = await res.json();
      if (res.ok) {
        await fetchAddresses();
        setMode("list");
        setMessage({ text: form._id ? "Address updated successfully." : "Address added successfully.", type: "success" });
      } else {
        setMessage({ text: data.message || "Failed to save address.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Network error occurred.", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/address/default/${id}`, {
        method: "PUT",
        credentials: "include"
      });
      if (res.ok) fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/address/delete/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (res.ok) fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  const openForm = (addr?: any) => {
    if (addr) {
      setForm({
        _id: addr._id, name: addr.name, phone: addr.phone, houseNo: addr.houseNo, street: addr.street,
        city: addr.city, state: addr.state, country: addr.country, pincode: addr.pincode
      });
    } else {
      setForm({
        _id: "", name: "", phone: "", houseNo: "", street: "", city: "", state: "", country: "India", pincode: ""
      });
    }
    setMode("form");
    setMessage({ text: "", type: "" });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gold-start">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="text-xs uppercase tracking-widest font-bold mt-4 text-warm-gray">Loading Addresses...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8 flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="font-display text-2xl text-[#5C1A1A] font-extrabold tracking-wide drop-shadow-sm">My Addresses</h2>
          <p className="text-xs text-warm-gray tracking-wide font-medium">Manage your shipping destinations.</p>
        </div>
        {mode === "list" && (
          <button onClick={() => openForm()} className="text-[10px] font-bold text-saffron uppercase tracking-[0.2em] hover:text-gold-start transition-colors px-4 py-2 rounded-full border border-saffron/30 hover:border-gold-start bg-white/50 hover:bg-white shadow-sm flex items-center gap-1.5">
            <Plus className="w-3 h-3" /> Add New
          </button>
        )}
        {mode === "form" && (
          <button onClick={() => setMode("list")} className="text-[10px] font-bold text-warm-gray uppercase tracking-[0.2em] hover:text-charcoal transition-colors px-4 py-2 rounded-full border border-warm-gray/30 hover:border-charcoal bg-white/50 hover:bg-white shadow-sm">
            Cancel
          </button>
        )}
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl text-sm font-semibold mb-6 ${message.type === "error" ? "bg-red-50 text-red-600 border border-red-200" : "bg-green-50 text-green-600 border border-green-200"}`}>
          {message.text}
        </div>
      )}

      {mode === "list" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.length === 0 ? (
            <div className="col-span-full py-12 text-center text-warm-gray bg-white/30 rounded-2xl border border-gold-start/20">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gold-start/40" />
              <p className="font-semibold mb-2">No Addresses Found</p>
              <p className="text-sm">Please add a shipping address for your Seva.</p>
            </div>
          ) : (
            addresses.map(addr => (
              <motion.div key={addr._id} whileHover={{ scale: 1.02 }} className={`p-6 bg-white/50 backdrop-blur-xl rounded-2xl border ${addr.isDefault ? 'border-saffron' : 'border-gold-start/15'} shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-5 h-5 ${addr.isDefault ? 'text-saffron' : 'text-warm-gray'}`} />
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal">
                        {addr.isDefault ? "Default Shipping" : "Shipping Address"}
                      </h4>
                    </div>
                    {addr.isDefault && <Star className="w-4 h-4 text-saffron fill-saffron" />}
                  </div>
                  
                  <p className="text-sm font-bold text-charcoal mb-1">{addr.name}</p>
                  <p className="text-sm text-warm-gray mb-1">{addr.phone}</p>
                  <p className="text-sm text-warm-gray leading-relaxed font-medium">
                    {addr.houseNo}, {addr.street}<br/>
                    {addr.city}, {addr.state} - {addr.pincode}<br/>
                    {addr.country}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gold-start/10 flex justify-between items-center">
                  {!addr.isDefault && (
                    <button onClick={() => handleSetDefault(addr._id)} className="text-[10px] uppercase tracking-widest font-bold text-saffron hover:text-[#5C1A1A] flex items-center gap-1 transition-colors">
                      <Check className="w-3 h-3" /> Set Default
                    </button>
                  )}
                  {addr.isDefault && <span className="text-[10px] uppercase tracking-widest font-bold text-warm-gray">Default</span>}
                  
                  <div className="flex gap-4">
                    <button onClick={() => openForm(addr)} className="text-warm-gray hover:text-charcoal transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(addr._id)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {mode === "form" && (
        <form onSubmit={handleSave} className="bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-gold-start/20 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-2">Name</label>
              <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-white/70 border border-gold-start/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-start" />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-2">Phone</label>
              <input type="text" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-white/70 border border-gold-start/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-start" />
            </div>
            <div className="md:col-span-2">
              <label className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-2">House/Flat No</label>
              <input type="text" required value={form.houseNo} onChange={e => setForm({...form, houseNo: e.target.value})} className="w-full bg-white/70 border border-gold-start/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-start" />
            </div>
            <div className="md:col-span-2">
              <label className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-2">Street/Locality</label>
              <input type="text" required value={form.street} onChange={e => setForm({...form, street: e.target.value})} className="w-full bg-white/70 border border-gold-start/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-start" />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-2">City</label>
              <input type="text" required value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full bg-white/70 border border-gold-start/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-start" />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-2">State</label>
              <input type="text" required value={form.state} onChange={e => setForm({...form, state: e.target.value})} className="w-full bg-white/70 border border-gold-start/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-start" />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-2">Country</label>
              <input type="text" required value={form.country} onChange={e => setForm({...form, country: e.target.value})} className="w-full bg-white/70 border border-gold-start/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-start" />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-2">Pincode</label>
              <input type="text" required value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} className="w-full bg-white/70 border border-gold-start/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-start" />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={actionLoading}
            className="w-full py-3 bg-[#5C1A1A] hover:bg-[#8B6F4E] text-white rounded-xl text-sm font-bold tracking-widest uppercase transition-colors disabled:opacity-50"
          >
            {actionLoading ? "Saving..." : "Save Address"}
          </button>
        </form>
      )}
    </div>
  );
}

// ── Tab 3: My Orders ──
function MyOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/orders`, {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gold-start">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="text-xs uppercase tracking-widest font-bold mt-4 text-warm-gray">Loading Your Seva...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="font-display text-2xl text-[#5C1A1A] font-extrabold tracking-wide drop-shadow-sm mb-1">My Seva (Orders)</h2>
        <p className="text-xs text-warm-gray tracking-wide font-medium">Track and manage your divine offerings.</p>
      </div>

      {orders.length === 0 ? (
        <div className="py-12 text-center text-warm-gray bg-white/30 rounded-2xl border border-gold-start/20">
          <Package className="w-12 h-12 mx-auto mb-4 text-gold-start/40" />
          <p className="font-semibold mb-2">No Seva Found</p>
          <p className="text-sm">You haven't made any offerings yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div 
              key={order._id}
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-white/50 backdrop-blur-xl rounded-2xl border border-gold-start/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold-start/10 pb-4 mb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-warm-gray mb-1">Order ID</div>
                  <div className="font-mono text-sm font-bold text-charcoal">{order.orderNumber}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-warm-gray mb-1">Date</div>
                  <div className="text-sm font-bold text-charcoal">{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex-1 min-w-[200px]">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-warm-gray mb-2">Items</div>
                  <div className="space-y-2">
                    {order.products.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center text-sm font-medium text-charcoal">
                        <span>{item.quantity}x {item.productName}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="w-32 shrink-0">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-warm-gray mb-2">Total Amount</div>
                  <div className="text-lg font-bold text-[#5C1A1A]">₹{order.totalAmount.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gold-start/10">
                <div className="flex gap-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-1">Payment</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#FFF5E6] text-[#E8850A]">
                      {order.paymentId?.paymentStatus || order.orderStatus}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-warm-gray block mb-1">Status</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-600">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => router.push(`/track-my-seva/${order._id}`)}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] text-white rounded-xl text-[11px] uppercase tracking-widest font-bold hover:scale-[1.02] transition-all shadow-md"
                >
                  Track My Seva
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
