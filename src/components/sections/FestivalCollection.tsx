"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { festivals } from "@/lib/seed-data";

export default function FestivalCollection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="py-20 md:py-28 overflow-hidden content-below-fold"
      aria-label="Festival Collections"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Festival Collections"
          subtitle="Sacred occasions deserve special shringar — explore our curated festival collections."
        />
      </div>

      {/* Scrollable strip */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm shadow-card rounded-full flex items-center justify-center text-charcoal hover:bg-white hover:shadow-card-hover transition-all cursor-pointer hidden md:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm shadow-card rounded-full flex items-center justify-center text-charcoal hover:bg-white hover:shadow-card-hover transition-all cursor-pointer hidden md:flex"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-snap-x scrollbar-hide pb-4 px-1"
        >
          {festivals.map((festival, index) => (
            <motion.a
              key={festival.id}
              href={`/festival/${festival.slug}`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group shrink-0 w-[280px] md:w-[300px] rounded-card overflow-hidden relative cursor-pointer"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Background */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${festival.color}22, ${festival.color}44)`,
                  }}
                />
                <div className="absolute inset-0 bg-lotus-watermark opacity-20" />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className="font-display text-xl font-bold text-cream mb-1.5 group-hover:text-gold-end transition-colors duration-500">
                    {festival.name}
                  </h3>
                  <p className="text-xs text-cream-dark/70 leading-relaxed line-clamp-2 mb-3">
                    {festival.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-end group-hover:gap-2.5 transition-all duration-300">
                    Explore Collection
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
