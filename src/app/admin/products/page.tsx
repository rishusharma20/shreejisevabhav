"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Package, Plus, Loader2, Edit2, Trash2, X, AlertTriangle } from "lucide-react";
import { authFetch } from "@/lib/authFetch";
import { resolveImageUrl } from "@/lib/imageUrl";

// Supported sizes per category
const CATEGORY_SIZES: Record<string, string[]> = {
  Poshak: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  Accessories: ["Standard", "Small", "Medium", "Large"],
  Idols: ["3 Inch", "4 Inch", "5 Inch", "6 Inch", "7 Inch", "8 Inch", "9 Inch", "12 Inch"],
  Offerings: ["Standard", "100g", "250g", "500g", "1kg", "Pack of 1", "Pack of 2", "Pack of 5"],
};

function formatSizeLabel(size: string, category: string): string {
  if (category === "Poshak" && /^\d+$/.test(size)) {
    return `Size ${size}`;
  }
  return size;
}

export default function AdminProductsPage() {
  const router = useRouter();
  
  const [products, setProducts] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [modalError, setModalError] = useState("");
  
  // Form state
  const [form, setForm] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    collectionId: "",
    category: "Poshak",
    price: "",
    isActive: true,
    isFeatured: false,
    isTrending: false,
  });

  // Size variants state: size -> { selected: boolean, quantity: string, customPrice?: string }
  const [sizeVariants, setSizeVariants] = useState<Record<string, { selected: boolean; quantity: string; customPrice?: string }>>({});
  
  // Custom size addition state
  const [customSizeInput, setCustomSizeInput] = useState("");
  const [showAddCustomSize, setShowAddCustomSize] = useState(false);

  const [images, setImages] = useState<File[]>([]);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = async () => {
    try {
      // Fetch Products
      const pRes = await authFetch("/api/v1/products");
      if (pRes.ok) {
        const pData = await pRes.json();
        setProducts(pData.data.products || []);
      }

      // Fetch Collections for Dropdown
      const cRes = await authFetch("/api/v1/collections");
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

  const handleOpenModal = async (product?: any) => {
    setModalError("");
    setCustomSizeInput("");
    setShowAddCustomSize(false);

    if (product) {
      setEditingProduct(product);
      setForm({
        name: product.name || "",
        slug: product.slug || "",
        shortDescription: product.shortDescription || "",
        description: product.description || "",
        collectionId: product.collectionId?._id || product.collectionId || "",
        category: product.category || "Poshak",
        price: product.price !== undefined ? String(product.price) : "",
        isActive: product.isActive ?? true,
        isFeatured: product.isFeatured ?? false,
        isTrending: product.isTrending ?? false,
      });
      setImages([]);

      // Fetch latest variants from backend for precision
      let loadedVariants: any[] = product.variants || [];
      try {
        const res = await authFetch(`/api/v1/products/${product._id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.data?.variants) {
            loadedVariants = data.data.variants;
          }
        }
      } catch (e) {
        console.error("Could not fetch product variants", e);
      }

      const initialMap: Record<string, { selected: boolean; quantity: string; customPrice?: string }> = {};
      if (loadedVariants && loadedVariants.length > 0) {
        loadedVariants.forEach(v => {
          let cpStr = "";
          if (v.customPrice !== undefined && v.customPrice !== null) {
            cpStr = String(v.customPrice);
          } else if (
            v.price !== undefined &&
            v.price !== null &&
            product.price !== undefined &&
            product.price !== "" &&
            Number(v.price) !== Number(product.price)
          ) {
            cpStr = String(v.price);
          }

          initialMap[v.size] = {
            selected: true,
            quantity: String(v.quantity !== undefined ? v.quantity : (v.stock ?? 0)),
            customPrice: cpStr
          };
        });
      } else if (product.size) {
        initialMap[product.size] = {
          selected: true,
          quantity: String(product.quantity ?? 0),
          customPrice: ""
        };
      }

      setSizeVariants(initialMap);
    } else {
      setEditingProduct(null);
      setForm({
        name: "",
        slug: "",
        shortDescription: "",
        description: "",
        collectionId: collections[0]?._id || "",
        category: "Poshak",
        price: "",
        isActive: true,
        isFeatured: false,
        isTrending: false,
      });
      setImages([]);
      setSizeVariants({});
    }
    setIsModalOpen(true);
  };

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === form.category) return;
    
    const selectedCount = Object.values(sizeVariants).filter(v => v.selected).length;
    if (selectedCount > 0) {
      const proceed = window.confirm(
        `Changing the category to "${newCategory}" will update the available size options. Configured sizes and quantities will be retained in memory. Do you wish to continue?`
      );
      if (!proceed) return;
    }
    
    setForm(prev => ({ ...prev, category: newCategory }));
  };

  const handleToggleSize = (size: string, isChecked: boolean) => {
    setSizeVariants(prev => {
      const existing = prev[size];
      if (isChecked) {
        return {
          ...prev,
          [size]: {
            selected: true,
            // Preserve existing quantity if previously set, else sensible default "1"
            quantity: existing?.quantity !== undefined && existing?.quantity !== "" ? existing.quantity : "1",
            // Preserve existing customPrice if previously set
            customPrice: existing?.customPrice !== undefined ? existing.customPrice : ""
          }
        };
      } else {
        return {
          ...prev,
          [size]: {
            selected: false,
            // Keep the quantity and customPrice in memory so re-checking restores it
            quantity: existing ? existing.quantity : "1",
            customPrice: existing?.customPrice !== undefined ? existing.customPrice : ""
          }
        };
      }
    });
  };

  const handleQuantityChange = (size: string, val: string) => {
    setSizeVariants(prev => ({
      ...prev,
      [size]: {
        selected: true,
        quantity: val,
        customPrice: prev[size]?.customPrice !== undefined ? prev[size].customPrice : ""
      }
    }));
  };

  const handleCustomPriceChange = (size: string, val: string) => {
    setSizeVariants(prev => ({
      ...prev,
      [size]: {
        selected: true,
        quantity: prev[size]?.quantity !== undefined && prev[size]?.quantity !== "" ? prev[size].quantity : "1",
        customPrice: val
      }
    }));
  };

  // Compute available sizes for the current category, plus any custom sizes currently configured
  const categoryStandardSizes = CATEGORY_SIZES[form.category] || CATEGORY_SIZES["Poshak"];
  const customOrExistingSizes = Object.keys(sizeVariants).filter(
    s => !categoryStandardSizes.includes(s)
  );
  const displaySizes = [...categoryStandardSizes, ...customOrExistingSizes];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError("");

    // 1. Validate default price
    const defaultPriceNum = Number(form.price);
    if (form.price === "" || isNaN(defaultPriceNum) || defaultPriceNum < 0) {
      setModalError("Please enter a valid non-negative Price (₹).");
      return;
    }

    // 2. Validate variants
    const activeSizes = Object.entries(sizeVariants).filter(([_, data]) => data.selected);
    if (activeSizes.length === 0) {
      setModalError("Please select at least one available size.");
      return;
    }

    const formattedVariants = [];
    for (const [size, data] of activeSizes) {
      const trimmedSize = size.trim();
      const trimmedQty = data.quantity.trim();
      
      if (trimmedQty === "") {
        setModalError(`Please enter a quantity for ${formatSizeLabel(trimmedSize, form.category)}.`);
        return;
      }

      const num = Number(trimmedQty);
      if (isNaN(num) || !Number.isInteger(num) || num < 0) {
        setModalError(`Invalid stock quantity for ${formatSizeLabel(trimmedSize, form.category)}. Must be a non-negative whole number (0 or greater).`);
        return;
      }

      let customPriceVal: number | null = null;
      let effectivePrice = defaultPriceNum;

      if (data.customPrice !== undefined && data.customPrice.trim() !== "") {
        const cp = Number(data.customPrice.trim());
        if (isNaN(cp) || cp < 0) {
          setModalError(`Invalid custom price for ${formatSizeLabel(trimmedSize, form.category)}. Must be a non-negative number.`);
          return;
        }
        customPriceVal = cp;
        effectivePrice = cp;
      }

      formattedVariants.push({
        size: trimmedSize,
        stock: num,
        quantity: num,
        price: effectivePrice,
        customPrice: customPriceVal
      });
    }

    // 2. Prevent duplicate sizes
    const sizeSet = new Set(formattedVariants.map(v => v.size.toLowerCase()));
    if (sizeSet.size !== formattedVariants.length) {
      setModalError("Duplicate sizes detected. Each size must be unique.");
      return;
    }

    setActionLoading(true);

    const url = editingProduct 
      ? `/api/v1/admin/products/${editingProduct._id}`
      : `/api/v1/admin/products`;
    
    const method = editingProduct ? "PUT" : "POST";

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      // Pass variants array as JSON string
      formData.append("variants", JSON.stringify(formattedVariants));
      
      // Backward compatibility fields
      formData.append("size", formattedVariants[0].size);
      formData.append("quantity", formattedVariants[0].quantity.toString());

      images.forEach(img => {
        formData.append("images", img);
      });

      const res = await authFetch(url, {
        method,
        body: formData,
      });
      
      const data = await res.json();
      if (res.ok) {
        await fetchData();
        setIsModalOpen(false);
      } else {
        setModalError(data.message || "Failed to save product");
      }
    } catch (err) {
      setModalError("Network error occurred while saving product.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const res = await authFetch(`/api/v1/admin/products/${id}`, {
        method: "DELETE",
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
                <th className="px-6 py-4">Configured Sizes & Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-start/10">
              {products.map(prod => (
                <tr key={prod._id} className="hover:bg-gold-start/5 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    {prod.images && prod.images.length > 0 ? (
                      <img src={resolveImageUrl(prod.images[0])} alt={prod.name} className="w-10 h-10 object-cover rounded-lg border border-gold-start/20" />
                    ) : (
                      <div className="w-10 h-10 bg-gold-start/10 rounded-lg border border-gold-start/20 flex items-center justify-center">
                        <Package className="w-5 h-5 text-saffron/50" />
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-[#5C1A1A]">{prod.name}</div>
                      <div className="text-[11px] uppercase tracking-wider text-[#8B6F4E] mt-0.5">{prod.slug}</div>
                      <div className="text-[11px] font-bold text-saffron-deep mt-0.5">Base: ₹{prod.price ?? 0}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-charcoal/70">{prod.collectionId?.name || "None"}</div>
                  </td>
                  <td className="px-6 py-4">
                    {prod.variants && prod.variants.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {prod.variants.map((v: any, vIdx: number) => (
                          <span 
                            key={vIdx} 
                            className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border ${
                              v.quantity > 0 
                                ? 'bg-gold-start/10 text-charcoal border-gold-start/20' 
                                : 'bg-rose-50 text-rose-600 border-rose-200'
                            }`}
                          >
                            {formatSizeLabel(v.size, prod.category)}: <span className="font-bold">{v.quantity}</span>
                            <span className="text-saffron-deep font-bold ml-1">
                              • ₹{v.price !== undefined ? v.price : (prod.price ?? 0)}
                            </span>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-warm-gray">
                        {prod.size ? `${prod.size}: ${prod.quantity || 0} (₹${prod.price || 0})` : "None"}
                      </span>
                    )}
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
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(prod._id)}
                      className="text-red-500 hover:text-red-700 p-2 ml-2"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-charcoal/50 text-sm font-bold uppercase tracking-wider">
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] w-full max-w-2xl shadow-[0_20px_60px_rgba(212,168,83,0.15)] border border-gold-start/30 overflow-hidden relative flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gold-start/10 flex justify-between items-center bg-cream/50 shrink-0">
              <h2 className="font-display text-2xl font-extrabold text-[#5C1A1A] tracking-wider">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {modalError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{modalError}</span>
                    </div>
                    <button type="button" onClick={() => setModalError("")}>
                      <X className="w-4 h-4 text-red-400 hover:text-red-700" />
                    </button>
                  </div>
                )}

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Category</label>
                    <select 
                      required
                      value={form.category}
                      onChange={e => handleCategoryChange(e.target.value)}
                      className="w-full border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 bg-white/50"
                    >
                      <option value="Poshak">Poshak</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Idols">Idols</option>
                      <option value="Offerings">Offerings</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Price (₹)</label>
                    <input 
                      required
                      type="number" 
                      min="0"
                      value={form.price}
                      onChange={e => setForm({...form, price: e.target.value})}
                      className="w-full border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 bg-white/50"
                    />
                  </div>
                </div>

                {/* ── AVAILABLE SIZES & STOCK (DYNAMIC QUANTITY SECTION) ── */}
                <div className="bg-[#FFFDF9] border border-gold-start/30 rounded-2xl p-4 md:p-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6F4E]">
                      Available Sizes &amp; Stock
                    </label>
                    <span className="text-[10px] text-warm-gray font-medium">
                      Select all available sizes and specify stock for each
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {displaySizes.map(size => {
                      const variantData = sizeVariants[size] || { selected: false, quantity: "1", customPrice: "" };
                      const isSelected = Boolean(variantData.selected);

                      return (
                        <div 
                          key={size}
                          className={`p-3 rounded-xl border transition-all ${
                            isSelected 
                              ? 'bg-white border-gold-start/60 shadow-[0_2px_8px_rgba(212,168,83,0.1)]' 
                              : 'bg-white/40 border-gold-start/15 hover:border-gold-start/30'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <label className="flex items-center gap-2.5 cursor-pointer select-none py-0.5">
                              <input 
                                type="checkbox"
                                checked={isSelected}
                                onChange={e => handleToggleSize(size, e.target.checked)}
                                className="w-4 h-4 rounded border-gold-start/40 text-saffron-deep focus:ring-saffron/30 cursor-pointer accent-[#E8850A]"
                              />
                              <span className={`text-xs font-bold ${isSelected ? 'text-[#5C1A1A]' : 'text-charcoal/80'}`}>
                                {formatSizeLabel(size, form.category)}
                              </span>
                            </label>

                            {isSelected && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-saffron-deep bg-amber-50 px-1.5 py-0.5 rounded border border-gold-start/30">
                                Selected
                              </span>
                            )}
                          </div>

                          {isSelected && (
                            <div className="mt-2.5 pt-2.5 border-t border-gold-start/15 grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1">
                                  Custom Price (₹)
                                </label>
                                <input 
                                  type="number"
                                  min="0"
                                  step="any"
                                  value={variantData.customPrice ?? ""}
                                  onChange={e => handleCustomPriceChange(size, e.target.value)}
                                  placeholder={form.price !== "" ? `Default: ₹${form.price}` : "Optional"}
                                  className="w-full px-2.5 py-1.5 text-xs font-bold text-charcoal bg-white border border-gold-start/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1">
                                  Quantity in Stock
                                </label>
                                <input 
                                  type="number"
                                  min="0"
                                  step="1"
                                  required
                                  value={variantData.quantity}
                                  onChange={e => handleQuantityChange(size, e.target.value)}
                                  placeholder="0"
                                  className="w-full px-2.5 py-1.5 text-xs font-bold text-charcoal bg-white border border-gold-start/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Custom Size Option */}
                  <div className="mt-3 pt-3 border-t border-gold-start/15 flex items-center justify-between">
                    {!showAddCustomSize ? (
                      <button
                        type="button"
                        onClick={() => setShowAddCustomSize(true)}
                        className="text-[11px] font-bold uppercase tracking-wider text-saffron-deep hover:text-gold-end flex items-center gap-1 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Custom Size
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 w-full max-w-sm">
                        <input 
                          type="text"
                          placeholder="e.g. 11 or Special Size"
                          value={customSizeInput}
                          onChange={e => setCustomSizeInput(e.target.value)}
                          className="flex-1 px-3 py-1.5 text-xs border border-gold-start/40 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-saffron/40"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const trimmed = customSizeInput.trim();
                            if (trimmed) {
                              handleToggleSize(trimmed, true);
                              setCustomSizeInput("");
                              setShowAddCustomSize(false);
                            }
                          }}
                          className="px-3 py-1.5 bg-[#5C1A1A] text-white text-xs font-bold rounded-lg hover:bg-[#431212] transition-colors"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCustomSizeInput("");
                            setShowAddCustomSize(false);
                          }}
                          className="p-1.5 text-warm-gray hover:text-charcoal"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Product Images</label>
                  
                  {/* Current saved images when editing */}
                  {editingProduct?.images && editingProduct.images.length > 0 && (
                    <div className="mb-3">
                      <p className="text-[10px] text-charcoal/60 uppercase tracking-wider mb-1.5 font-semibold">Current Saved Images</p>
                      <div className="flex flex-wrap gap-2">
                        {editingProduct.images.map((img: string, idx: number) => (
                          <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gold-start/30">
                            <img src={resolveImageUrl(img)} alt={`Current ${idx + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <input 
                    type="file" 
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    onChange={e => {
                      if (e.target.files) {
                        setImages(prev => [...prev, ...Array.from(e.target.files!)]);
                      }
                    }}
                    className="w-full border border-gold-start/30 rounded-xl px-4 py-2 text-sm bg-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-wider file:bg-gold-start/10 file:text-saffron-deep hover:file:bg-gold-start/20 transition-all cursor-pointer"
                  />

                  {/* Previews of newly selected files before uploading */}
                  {images.length > 0 && (
                    <div className="mt-3">
                      <p className="text-[10px] text-charcoal/60 uppercase tracking-wider mb-1.5 font-semibold">Images to Upload ({images.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {images.map((file, idx) => (
                          <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gold-start/40 bg-sand-light/50 group">
                            <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setImages(images.filter((_, i) => i !== idx))}
                              className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-charcoal/80 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                              title="Remove image"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-[10px] text-charcoal/50 mt-1 uppercase tracking-wider">Supports JPG, PNG, WEBP (Max 5MB each)</p>
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

                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="isActive"
                      checked={form.isActive}
                      onChange={e => setForm({...form, isActive: e.target.checked})}
                      className="w-5 h-5 rounded border-gold-start/30 text-saffron-deep focus:ring-saffron/40"
                    />
                    <label htmlFor="isActive" className="text-[11px] font-bold uppercase tracking-wider text-charcoal">Active</label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="isFeatured"
                      checked={form.isFeatured}
                      onChange={e => setForm({...form, isFeatured: e.target.checked})}
                      className="w-5 h-5 rounded border-gold-start/30 text-saffron-deep focus:ring-saffron/40"
                    />
                    <label htmlFor="isFeatured" className="text-[11px] font-bold uppercase tracking-wider text-charcoal">Featured</label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="isTrending"
                      checked={form.isTrending}
                      onChange={e => setForm({...form, isTrending: e.target.checked})}
                      className="w-5 h-5 rounded border-gold-start/30 text-saffron-deep focus:ring-saffron/40"
                    />
                    <label htmlFor="isTrending" className="text-[11px] font-bold uppercase tracking-wider text-charcoal">Trending / New</label>
                  </div>
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
                    {actionLoading ? "Saving..." : "Save Product"}
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
