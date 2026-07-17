"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import type { Product } from "@/lib/types";
import Badge from "./Badge";
import RatingStars from "./RatingStars";
import WishlistToggle from "./WishlistToggle";
import WhatsAppButton from "./WhatsAppButton";

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
  index?: number;
}

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  index = 0,
}: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group relative bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-transparent hover:border-gold-start/30"
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={product.badge} />
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-3 right-14 z-10 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-badge">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <div className="absolute top-3 right-3 z-10">
          <WishlistToggle isActive={isWishlisted} onToggle={onToggleWishlist} />
        </div>

        {/* Quick view button */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            className="flex items-center gap-1.5 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-pill text-xs font-medium text-charcoal hover:bg-white shadow-md cursor-pointer"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye size={14} />
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2.5">
        {/* Category */}
        <p className="text-[11px] font-medium uppercase tracking-wider text-peacock">
          {product.category.replace("-", " ")}
        </p>

        {/* Name */}
        <h3 className="font-display text-base font-semibold text-charcoal leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-charcoal">₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice && (
            <span className="text-sm text-warm-gray line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-saffron-gradient text-white text-xs font-semibold rounded-pill hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>
          <WhatsAppButton productName={product.name} size="sm" />
        </div>
      </div>
    </motion.article>
  );
}
