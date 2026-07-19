"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Truck, RefreshCcw, ShieldCheck, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import RatingStars from "@/components/ui/RatingStars";
import Badge from "@/components/ui/Badge";
import type { Product } from "@/lib/types";

interface ProductDetailsProps {
  product: any;
  variants: any[];
}

export default function ProductDetails({ product, variants }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || {});
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const images = selectedVariant.images && selectedVariant.images.length > 0
    ? selectedVariant.images
    : ["/images/products/placeholder.jpg"];

  const handleAddToCart = () => {
    const cartProduct: Product = {
      id: product._id,
      variantId: selectedVariant._id,
      name: product.name,
      price: selectedVariant.price,
      image: `http://localhost:8000${images[0]}`,
      slug: product.slug,
      category: product.category,
      badge: product.isFeatured ? "bestseller" : undefined,
      rating: 5,
      reviewCount: 0,
      description: product.description,
      inStock: true
    };
    
    addToCart(cartProduct);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 pt-32 mb-20 relative z-10">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* LEFT: Image Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[600px] hide-scrollbar py-1">
            {images.map((img: string, idx: number) => (
              <div 
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  activeImageIndex === idx ? 'border-gold-start' : 'border-transparent hover:border-gold-start/50'
                }`}
              >
                <Image src={img.startsWith('http') ? img : `http://localhost:8000${img}`} alt="Thumbnail" fill className="object-cover" />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative flex-1 aspect-[3/4] md:aspect-auto md:h-[600px] bg-cream-dark rounded-3xl overflow-hidden shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image 
                  src={images[activeImageIndex].startsWith('http') ? images[activeImageIndex] : `http://localhost:8000${images[activeImageIndex]}`} 
                  alt={product.name} 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                />
              </motion.div>
            </AnimatePresence>
            {product.isFeatured && (
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="bestseller" />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-6 border-b border-gold-start/20 pb-6">
            <span className="text-[10px] uppercase tracking-widest font-bold text-peacock mb-2 block">
              {product.category?.replace('-', ' ')}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-charcoal mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <RatingStars rating={5} reviewCount={42} />
              <span className="text-xs font-medium text-charcoal/50 uppercase tracking-widest">Divine Reviews</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#5C1A1A]">₹{selectedVariant.price?.toLocaleString()}</span>
              {selectedVariant.discount > 0 && (
                <span className="text-lg text-charcoal/40 line-through">
                  ₹{(selectedVariant.price + selectedVariant.discount).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8 prose prose-sm prose-p:text-charcoal/80">
            <p className="font-medium text-charcoal mb-2">{product.shortDescription}</p>
            <p>{product.description}</p>
          </div>

          {/* Variants / Sizes */}
          {variants.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-widest font-bold text-charcoal">Select Size</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-gold-start underline cursor-pointer hover:text-gold-end">Size Guide</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {variants.map((v) => (
                  <button
                    key={v._id}
                    onClick={() => {
                      setSelectedVariant(v);
                      setActiveImageIndex(0);
                    }}
                    disabled={!v.isAvailable}
                    className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                      selectedVariant._id === v._id 
                        ? 'bg-[#5C1A1A] text-white shadow-md' 
                        : v.isAvailable 
                          ? 'bg-white border border-charcoal/20 text-charcoal hover:border-gold-start hover:text-gold-start'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                    }`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
              {!selectedVariant.isAvailable && (
                <p className="text-xs text-rose-500 mt-2 font-medium">This size is currently out of stock.</p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 mb-10">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant.isAvailable}
              className={`flex-1 h-14 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-bold transition-all ${
                !selectedVariant.isAvailable 
                  ? 'bg-charcoal/10 text-charcoal/40 cursor-not-allowed'
                  : isAdded
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'bg-gradient-to-r from-gold-start to-gold-end text-white hover:shadow-xl hover:shadow-gold-start/20 hover:scale-[1.02]'
              }`}
            >
              {isAdded ? (
                <><Check size={18} /> Added to Cart</>
              ) : (
                <><ShoppingCart size={18} /> Add to Cart</>
              )}
            </button>
            <button className="w-14 h-14 rounded-full bg-white border border-charcoal/10 flex items-center justify-center text-charcoal hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-colors shadow-sm">
              <Heart size={20} />
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gold-start/20 pt-8">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gold-start/10 text-gold-start flex items-center justify-center">
                <Truck size={18} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-charcoal">Free Secure Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gold-start/10 text-gold-start flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-charcoal">Authentic Vrindavan Craft</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gold-start/10 text-gold-start flex items-center justify-center">
                <RefreshCcw size={18} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-charcoal">7-Day Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
