"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryImages } from "@/lib/seed-data";

export default function BhaktiGallery() {
  const spanClasses: Record<string, string> = {
    normal: "row-span-1",
    tall: "row-span-2",
    wide: "col-span-1 md:col-span-2",
  };

  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/gallery`);
        if (res.ok) {
          const data = await res.json();
          if (data.data.gallery && data.data.gallery.length > 0) {
            setImages(data.data.gallery.map((g: any) => ({
              id: g._id,
              src: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${g.url}`,
              alt: g.altText,
              span: g.span
            })));
          } else {
            setImages(galleryImages); // Fallback to seed
          }
        } else {
          setImages(galleryImages);
        }
      } catch (err) {
        setImages(galleryImages);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading) {
    return (
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-cream-dark/30 flex justify-center items-center">
         <div className="w-10 h-10 border-4 border-saffron-deep border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-cream-dark/30 content-below-fold"
      aria-label="Bhakti Gallery"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Bhakti in Every Stitch"
          subtitle="A glimpse into the divine artistry — each piece tells a story of devotion and craft."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[240px] gap-3 md:gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative rounded-card overflow-hidden cursor-pointer ${spanClasses[image.span] || "row-span-1"}`}
            >
              {/* Actual Image rendering with a fallback to placeholder gradient if missing */}
              {image.src ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#3D2415] to-[#2D1B0E]">
                  <div className="absolute inset-0 bg-lotus-watermark opacity-20" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at ${30 + index * 10}% ${40 + index * 5}%, rgba(212,168,83,0.15), transparent 60%)`,
                    }}
                  />
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-500 z-10 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span className="px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-pill text-sm font-medium text-charcoal shadow-lg">
                    View Details
                  </span>
                </motion.div>
              </div>

              {/* Alt text overlay (bottom) */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <p className="text-xs text-cream-dark/90 truncate">
                  {image.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
