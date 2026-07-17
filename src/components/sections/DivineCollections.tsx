"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { categories } from "@/lib/seed-data";

export default function DivineCollections() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-label="Divine Collections">
      <SectionHeading
        title="Divine Collections"
        subtitle="Explore our curated categories — each piece crafted to adorn your Thakurji with love and reverence."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {categories.map((category, index) => (
          <motion.a
            key={category.id}
            href={`/${category.slug}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            className="group relative rounded-card overflow-hidden aspect-[3/4] cursor-pointer"
          >
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#3D2415] to-charcoal">
              <div className="absolute inset-0 bg-lotus-watermark opacity-20" />
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
                {category.productCount} Products
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
    </section>
  );
}
