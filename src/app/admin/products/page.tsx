"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Package, Plus, Loader2, Edit2, Trash2, X } from "lucide-react";

export default function AdminProductsPage() {
  const router = useRouter();
  
  const [products, setProducts] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  // Form state
  const [form, setForm] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    collectionId: "",
    isActive: true,
  });
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = async () => {
    try {
      // Fetch Products
      const pRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/products`, {
        credentials: "include"
      });
      if (pRes.ok) {
        const pData = await pRes.json();
        setProducts(pData.data.products || []);
      }

      // Fetch Collections for Dropdown
      const cRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/collections`, {
        credentials: "include"
      });
      if (cRes.ok) {
        const cData = await cRes.json();
        setCollections(cData.data.collections || []);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      setForm({
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription || "",
        description: product.description || "",
        collectionId: product.collectionId?._id || "",
        isActive: product.isActive,
      });
    } else {
      setEditingProduct(null);
      setForm({
        name: "",
        slug: "",
        shortDescription: "",
        description: "",
        collectionId: collections[0]?._id || "",
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    const url = editingProduct 
      ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/admin/products/${editingProduct._id}`
      : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/admin/products`;
    
    const method = editingProduct ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form),
        credentials: "include",
      });
      
      const data = await res.json();
      if (res.ok) {
        await fetchData();
        setIsModalOpen(false);
      } else {
        alert(data.message || "Failed to save product");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/admin/products/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (res.ok) {
        await fetchData();
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      alert("Network error");
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
    <div className="bg-transparent min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Package className="w-8 h-8 text-saffron-deep" />
          <h1 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider">Products</h1>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] text-white px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[11px] shadow-[0_4px_15px_rgba(212,168,83,0.2)] hover:opacity-90 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
          {error}
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(212,168,83,0.05)] border border-gold-start/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gold-start/5 text-[#8B6F4E] text-[10px] font-bold uppercase tracking-wider border-b border-gold-start/10">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Collection</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-start/10">
              {products.map(prod => (
                <tr key={prod._id} className="hover:bg-gold-start/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#5C1A1A]">{prod.name}</div>
                    <div className="text-[11px] uppercase tracking-wider text-[#8B6F4E] mt-1">{prod.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-charcoal/70">{prod.collectionId?.name || "None"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                      prod.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {prod.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleOpenModal(prod)}
                      className="text-saffron-deep hover:text-saffron p-2"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(prod._id)}
                      className="text-red-500 hover:text-red-700 p-2 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-charcoal/50 text-sm font-bold uppercase tracking-wider">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] w-full max-w-2xl shadow-[0_20px_60px_rgba(212,168,83,0.15)] border border-gold-start/30 overflow-hidden my-8 relative">
            <div className="p-6 border-b border-gold-start/10 flex justify-between items-center bg-cream/50">
              <h2 className="font-display text-2xl font-extrabold text-[#5C1A1A] tracking-wider">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Name</label>
                  <input 
                    required
                    type="text" 
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 bg-white/50"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Slug</label>
                  <input 
                    required
                    type="text" 
                    value={form.slug}
                    onChange={e => setForm({...form, slug: e.target.value})}
                    className="w-full border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 bg-white/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Collection</label>
                <select 
                  required
                  value={form.collectionId}
                  onChange={e => setForm({...form, collectionId: e.target.value})}
                  className="w-full border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 bg-white/50"
                >
                  <option value="" disabled>Select Collection</option>
                  {collections.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Short Description</label>
                <textarea 
                  rows={2}
                  value={form.shortDescription}
                  onChange={e => setForm({...form, shortDescription: e.target.value})}
                  className="w-full border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 bg-white/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Full Description</label>
                <textarea 
                  rows={4}
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 bg-white/50"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={form.isActive}
                  onChange={e => setForm({...form, isActive: e.target.checked})}
                  className="w-5 h-5 rounded border-gold-start/30 text-saffron-deep focus:ring-saffron/40"
                />
                <label htmlFor="isActive" className="text-[11px] font-bold uppercase tracking-wider text-charcoal">Active</label>
              </div>

              <div className="pt-6 border-t border-gold-start/10 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-gold-start/30 rounded-xl text-[11px] font-bold uppercase tracking-wider text-charcoal hover:bg-gold-start/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={actionLoading}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] bg-[length:200%_auto] hover:bg-[position:right_center] transition-all text-white rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-[0_4px_15px_rgba(212,168,83,0.2)] disabled:opacity-50"
                >
                  {actionLoading ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
