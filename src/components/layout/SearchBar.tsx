"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { products } from "@/lib/seed-data";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length >= 2
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="py-3 border-t border-cream-dark">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray"
              />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for divine vastra, jewellery, poshak..."
                className="w-full pl-10 pr-10 py-3 bg-cream-dark rounded-card text-sm text-charcoal placeholder-warm-gray-light focus:outline-none focus:ring-2 focus:ring-saffron/30"
                aria-label="Search products"
              />
              <button
                onClick={onClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray hover:text-charcoal transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results dropdown */}
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 bg-white rounded-card shadow-card-hover border border-cream-dark overflow-hidden max-h-64 overflow-y-auto"
              >
                {results.slice(0, 5).map((product) => (
                  <a
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-cream transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cream-dark shrink-0 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-saffron-muted to-cream-dark" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-warm-gray">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </a>
                ))}
              </motion.div>
            )}

            {query.length >= 2 && results.length === 0 && (
              <p className="mt-2 text-sm text-warm-gray text-center py-4">
                No products found for &ldquo;{query}&rdquo;
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
