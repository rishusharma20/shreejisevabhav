"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import { useCart } from "@/context/CartContext";

import type { Product } from "@/lib/types";

export default function FeaturedProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/products/type/featured`);
        const data = await res.json();
        if (data.success && data.data.products) {
          // Map backend products to the frontend Product type interface
          const mappedProducts = data.data.products.map((p: any) => ({
            id: p._id,
            variantId: p.variantId,
            name: p.name,
            category: p.category,
            price: p.price,
            originalPrice: p.originalPrice,
            image: p.images[0],
            hoverImage: p.images[1] || p.images[0],
            isNew: p.isTrending || false, // Mapping trending to 'new' badge
            slug: p.slug
          }));
          setFeaturedProducts(mappedProducts);
        }
      } catch (err) {
        console.error("Failed to fetch featured products", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFeaturedProducts();
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
                onAddToCart={() => addToCart(product)}
              />
            ))}
      </div>
    </section>
  );
}
