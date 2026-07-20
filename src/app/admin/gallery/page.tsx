"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, Plus, Loader2, Edit2, Trash2, X } from "lucide-react";

export default function AdminGalleryPage() {
  const router = useRouter();
  
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // Form state
  const [form, setForm] = useState({
    altText: "",
    span: "normal",
    order: 0,
    isActive: true,
  });
  const [image, setImage] = useState<File | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/gallery`, {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setGalleryItems(data.data.gallery || []);
      }
    } catch (err) {
      setError("Failed to fetch gallery items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item);
      setForm({
        altText: item.altText || "",
        span: item.span || "normal",
        order: item.order || 0,
        isActive: item.isActive ?? true,
      });
      setImage(null);
    } else {
      setEditingItem(null);
      setForm({
        altText: "",
        span: "normal",
        order: 0,
        isActive: true,
      });
      setImage(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    const url = editingItem 
      ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/gallery/${editingItem._id}`
      : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/gallery`;
    
    const method = editingItem ? "PUT" : "POST";

    if (!editingItem && !image) {
        alert("Please select an image");
        setActionLoading(false);
        return;
    }

    try {
      const formData = new FormData();
      formData.append("altText", form.altText);
      formData.append("span", form.span);
      formData.append("order", form.order.toString());
      formData.append("isActive", form.isActive.toString());
      
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(url, {
        method,
        body: formData,
        credentials: "include",
      });
      
      const data = await res.json();
      if (res.ok) {
        await fetchData();
        setIsModalOpen(false);
      } else {
        alert(data.message || "Failed to save gallery image");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/gallery/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (res.ok) {
        await fetchData();
      } else {
        alert("Failed to delete gallery image");
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
          <ImageIcon className="w-8 h-8 text-saffron-deep" />
          <h1 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider">Bhakti Gallery</h1>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] text-white px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[11px] shadow-[0_4px_15px_rgba(212,168,83,0.2)] hover:opacity-90 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Image
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
                <th className="px-6 py-4">Image & Caption</th>
                <th className="px-6 py-4">Span</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-start/10">
              {galleryItems.map(item => (
                <tr key={item._id} className="hover:bg-gold-start/5 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${item.url}`} alt={item.altText} className="w-16 h-16 object-cover rounded-lg border border-gold-start/20" />
                    <div>
                      <div className="font-bold text-[#5C1A1A] max-w-[200px] truncate" title={item.altText}>{item.altText}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-charcoal/70">{item.span}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-charcoal/70">{item.order}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                      item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleOpenModal(item)}
                      className="text-saffron-deep hover:text-saffron p-2"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700 p-2 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {galleryItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-charcoal/50 text-sm font-bold uppercase tracking-wider">
                    No gallery images found.
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
          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] w-full max-w-lg shadow-[0_20px_60px_rgba(212,168,83,0.15)] border border-gold-start/30 overflow-hidden relative flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gold-start/10 flex justify-between items-center bg-cream/50 shrink-0">
              <h2 className="font-display text-2xl font-extrabold text-[#5C1A1A] tracking-wider">
                {editingItem ? "Edit Image" : "Add Image"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Caption (Alt Text)</label>
                  <input 
                    required
                    type="text" 
                    value={form.altText}
                    onChange={e => setForm({...form, altText: e.target.value})}
                    placeholder="e.g. Radha Krishna dressed in royal zari poshak"
                    className="w-full border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 bg-white/50"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Grid Span</label>
                    <select 
                      value={form.span}
                      onChange={e => setForm({...form, span: e.target.value})}
                      className="w-full border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 bg-white/50"
                    >
                      <option value="normal">Normal</option>
                      <option value="tall">Tall</option>
                      <option value="wide">Wide</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Display Order</label>
                    <input 
                      type="number" 
                      value={form.order}
                      onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})}
                      className="w-full border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 bg-white/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Image File</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => {
                      if (e.target.files && e.target.files.length > 0) {
                        setImage(e.target.files[0]);
                      }
                    }}
                    className="w-full border border-gold-start/30 rounded-xl px-4 py-2 text-sm bg-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-wider file:bg-gold-start/10 file:text-saffron-deep hover:file:bg-gold-start/20 transition-all cursor-pointer"
                  />
                  {!image && editingItem && (
                    <p className="text-[10px] text-charcoal/50 mt-1 uppercase tracking-wider">Leave empty to keep current image</p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="isActive"
                    checked={form.isActive}
                    onChange={e => setForm({...form, isActive: e.target.checked})}
                    className="w-5 h-5 rounded border-gold-start/30 text-saffron-deep focus:ring-saffron/40"
                  />
                  <label htmlFor="isActive" className="text-[11px] font-bold uppercase tracking-wider text-charcoal">Active (Visible on site)</label>
                </div>

                <div className="pt-6 mt-4 border-t border-gold-start/10 flex justify-end gap-3 sticky bottom-0 bg-white/95 backdrop-blur-xl pb-2">
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
                    {actionLoading ? "Saving..." : "Save Image"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
