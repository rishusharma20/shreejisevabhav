"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FolderTree, Plus, Loader2, Edit2, Trash2, X } from "lucide-react";

export default function AdminCollectionsPage() {
  const router = useRouter();
  
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<any>(null);
  
  // Form state
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    isActive: true,
  });
  const [actionLoading, setActionLoading] = useState(false);

  const fetchCollections = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/collections`, {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setCollections(data.data.collections || []);
      }
    } catch (err) {
      setError("Failed to fetch collections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleOpenModal = (collection?: any) => {
    if (collection) {
      setEditingCollection(collection);
      setForm({
        name: collection.name,
        slug: collection.slug,
        description: collection.description || "",
        isActive: collection.isActive,
      });
    } else {
      setEditingCollection(null);
      setForm({
        name: "",
        slug: "",
        description: "",
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    
    // Convert to FormData as required by backend (multer)
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("slug", form.slug);
    formData.append("description", form.description);
    formData.append("isActive", String(form.isActive));

    const url = editingCollection 
      ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/admin/collections/${editingCollection._id}`
      : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/admin/collections`;
    
    const method = editingCollection ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: formData,
        credentials: "include",
      });
      
      const data = await res.json();
      if (res.ok) {
        await fetchCollections();
        setIsModalOpen(false);
      } else {
        alert(data.message || "Failed to save collection");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/admin/collections/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (res.ok) {
        await fetchCollections();
      } else {
        alert("Failed to delete collection");
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
          <FolderTree className="w-8 h-8 text-saffron-deep" />
          <h1 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider">Collections</h1>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] text-white px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[11px] shadow-[0_4px_15px_rgba(212,168,83,0.2)] hover:opacity-90 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Collection
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
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-start/10">
              {collections.map(col => (
                <tr key={col._id} className="hover:bg-gold-start/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#5C1A1A]">{col.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[11px] uppercase tracking-wider text-[#8B6F4E]">{col.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                      col.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {col.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleOpenModal(col)}
                      className="text-saffron-deep hover:text-saffron p-2"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(col._id)}
                      className="text-red-500 hover:text-red-700 p-2 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {collections.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-charcoal/50 text-sm font-bold uppercase tracking-wider">
                    No collections found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] w-full max-w-lg shadow-[0_20px_60px_rgba(212,168,83,0.15)] border border-gold-start/30 overflow-hidden relative">
            <div className="p-6 border-b border-gold-start/10 flex justify-between items-center bg-cream/50">
              <h2 className="font-display text-2xl font-extrabold text-[#5C1A1A] tracking-wider">
                {editingCollection ? "Edit Collection" : "Add Collection"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
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

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Description</label>
                <textarea 
                  rows={3}
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
                  {actionLoading ? "Saving..." : "Save Collection"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
