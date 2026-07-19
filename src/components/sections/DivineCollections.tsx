"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

interface Collection {
  _id: string;
  name: string;
  slug: string;
  description: string;
  thumbnailImage: string;
}

export default function DivineCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const res = await fetch("http://localhost:8000/api/v1/collections");
        const data = await res.json();
        if (data.success && data.data.collections) {
          setCollections(data.data.collections);
        }
      } catch (err) {
        console.error("Failed to fetch collections", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-label="Divine Collections">
      <SectionHeading
        title="Divine Collections"
        subtitle="Explore our curated categories — each piece crafted to adorn your Thakurji with love and reverence."
      />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 text-gold-start animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((category, index) => (
            <motion.a
              key={category._id}
            href={`/${category.slug}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            className="group relative rounded-card overflow-hidden aspect-[3/4] cursor-pointer"
          >
            {/* Background with gradient and image */}
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#3D2415] to-charcoal">
              <div 
                className="absolute inset-0 opacity-40 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${category.thumbnailImage})` }}
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/10 transition-all duration-700 z-10" />

            {/* Golden border glow on hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-start/30 rounded-card transition-all duration-500 z-20" />

            {/* Content */}
            <div className="relative z-20 flex flex-col justify-end h-full p-6 md:p-8">
              {/* Product count badge */}
              <motion.span
                className="self-start mb-auto mt-4 px-3 py-1.5 bg-white/10 backdrop-blur-sm text-cream text-xs font-medium rounded-pill border border-white/10"
              >
                Sacred Collection
              </motion.span>

              {/* Category info */}
              <div className="space-y-3">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-cream group-hover:text-gold-end transition-colors duration-500">
                  {category.name}
                </h3>
                <p className="text-sm text-cream-dark/70 leading-relaxed line-clamp-2">
                  {category.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-end group-hover:gap-3 transition-all duration-300">
                  Shop Now
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}
