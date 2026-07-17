"use client";

import { useState, useEffect, useCallback } from "react";

const WISHLIST_STORAGE_KEY = "shreeji-seva-bhav-wishlist";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        setWishlist(new Set(JSON.parse(stored)));
      }
    } catch {
      // Silently fail
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify([...wishlist]));
    } catch {
      // Silently fail
    }
  }, [wishlist]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.has(productId),
    [wishlist]
  );

  return { wishlist, toggleWishlist, isInWishlist, wishlistCount: wishlist.size };
}
