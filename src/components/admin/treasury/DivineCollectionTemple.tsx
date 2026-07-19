"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Package, Plus } from "lucide-react";

export default function DivineCollectionTemple() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data.data?.products || []);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-6 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
            The Divine Collection Temple
          </h3>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
            Live Inventory Management
          </p>
        </div>
        
        <Link href="/admin/treasury/prepare">
          <button className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold shadow-sm hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 w-full md:w-auto">
            <Plus className="w-4 h-4" /> Prepare New Offering
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 text-center text-charcoal/50 uppercase tracking-widest font-bold text-xs">Loading Divine Treasury...</div>
        ) : products.length === 0 ? (
          <div className="col-span-full py-20 text-center text-charcoal/50 uppercase tracking-widest font-bold text-xs">No Offerings In Treasury.</div>
        ) : (
          products.map((prod) => (
            <motion.div
              key={prod._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white/80 backdrop-blur-md border border-gold-start/30 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-cream-dark">
                {prod.images && prod.images[0] ? (
                  <Image 
                    src={`http://localhost:8000${prod.images[0]}`} 
                    alt={prod.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-charcoal/20">
                    <Package className="w-12 h-12" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col">
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#8B6F4E] mb-1">
                  {prod.category?.replace('-', ' ')}
                </span>
                <h4 className="font-display text-lg font-bold text-[#5C1A1A] mb-2 line-clamp-1">
                  {prod.name}
                </h4>
                
                <div className="mt-auto pt-4 border-t border-gold-start/20 flex justify-between items-center">
                  <span className="text-sm font-bold text-charcoal">₹{prod.price?.toLocaleString()}</span>
                  {/* For variants, we would typically map or show total stock. For now, show active status */}
                  <span className={`text-[9px] uppercase font-bold tracking-widest px-2 py-1 rounded-full ${prod.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {prod.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
