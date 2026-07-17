"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import RatingStars from "@/components/ui/RatingStars";
import { testimonials } from "@/lib/seed-data";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const testimonial = testimonials[currentIndex];

  return (
    <section
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 content-below-fold"
      aria-label="Devotee Testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Blessings From Our Devotees"
          subtitle="Hear from the bhakts who've adorned their Thakurji with our divine creations."
        />

        <div className="max-w-3xl mx-auto relative">
          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 md:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-card rounded-full flex items-center justify-center text-charcoal hover:shadow-card-hover hover:text-saffron transition-all z-10 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 md:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-card rounded-full flex items-center justify-center text-charcoal hover:shadow-card-hover hover:text-saffron transition-all z-10 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          {/* Testimonial card */}
          <div className="bg-white rounded-card p-8 md:p-12 shadow-card border border-cream-dark mx-10 md:mx-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Quote icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-saffron/10 flex items-center justify-center">
                    <Quote size={24} className="text-saffron" />
                  </div>
                </div>

                {/* Quote text */}
                <p className="text-base md:text-lg text-charcoal leading-relaxed mb-6 font-body italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  <RatingStars rating={testimonial.rating} size={18} />
                </div>

                {/* Author */}
                <div>
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron-light to-peacock-light mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <p className="font-display text-base font-semibold text-charcoal">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-warm-gray">
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? "bg-saffron w-6"
                    : "bg-warm-gray-lighter hover:bg-warm-gray-light"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
