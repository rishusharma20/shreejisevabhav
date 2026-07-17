"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/hooks/useWishlist";
import { products } from "@/lib/seed-data";
import type { Product } from "@/lib/types";

export default function FeaturedProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Simulate loading state for skeleton demo
  useEffect(() => {
    const timer = setTimeout(() => {
      setFeaturedProducts(products);
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto content-below-fold"
      aria-label="Featured Divine Products"
    >
      <SectionHeading
        title="Featured Divine Products"
        subtitle="Handpicked poshak, vastra, and jewellery — each blessed with artisan craftsmanship and sacred intention."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={`skeleton-${i}`} />
            ))
          : featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isWishlisted={isInWishlist(product.id)}
                onToggleWishlist={() => toggleWishlist(product.id)}
                onAddToCart={() => addToCart(product)}
              />
            ))}
      </div>
    </section>
  );
}
