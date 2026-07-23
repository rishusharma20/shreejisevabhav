"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { CartState, CartAction, CartItem, Product } from "@/lib/types";
import { authFetch } from "@/lib/authFetch";

const CART_STORAGE_KEY = "shreeji-seva-bhav-cart";

function calculateTotals(items: CartItem[]): { totalAmount: number; totalItems: number } {
  return {
    totalAmount: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  let newItems: CartItem[];

  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.items.find((item) => item.product.id === action.product.id);
      if (existing) {
        newItems = state.items.map((item) =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { product: action.product, quantity: 1 }];
      }
      return { ...state, items: newItems, ...calculateTotals(newItems) };
    }

    case "REMOVE_FROM_CART":
      newItems = state.items.filter((item) => item.product.id !== action.productId);
      return { ...state, items: newItems, ...calculateTotals(newItems) };

    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        newItems = state.items.filter((item) => item.product.id !== action.productId);
      } else {
        newItems = state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        );
      }
      return { ...state, items: newItems, ...calculateTotals(newItems) };

    case "CLEAR_CART":
      return { items: [], totalAmount: 0, totalItems: 0 };

    case "LOAD_CART":
      return { items: action.items, ...calculateTotals(action.items) };

    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

interface CartContextValue extends CartState {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const router = useRouter();

  // Load cart from Backend on mount
  useEffect(() => {
    async function loadBackendCart() {
      try {
        const res = await authFetch("/api/v1/cart");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data.cart && data.data.cart.products) {
            // Map backend cart structure to frontend CartItem[]
            const backendItems = data.data.cart.products.map((item: any) => ({
              product: {
                id: item.productId._id,
                variantId: item.variantId._id,
                name: item.productId.name,
                category: item.productId.category,
                price: item.variantId.price,
                image: item.variantId.images[0] || "/images/products/placeholder.jpg",
                slug: item.productId.slug
              } as Product,
              quantity: item.quantity
            }));
            dispatch({ type: "LOAD_CART", items: backendItems });
          }
        } else if (res.status === 401) {
          // If unauthenticated, we can fallback to localStorage or just leave empty
          const stored = localStorage.getItem(CART_STORAGE_KEY);
          if (stored) {
            dispatch({ type: "LOAD_CART", items: JSON.parse(stored) });
          }
        }
      } catch (err) {
        console.error("Failed to load cart", err);
      }
    }
    loadBackendCart();
  }, []);

  // Persist cart to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Silently fail if localStorage is full
    }
  }, [state.items]);

  const addToCart = useCallback(
    async (product: Product) => {
      try {
        const res = await authFetch("/api/v1/cart/add", {
          method: "POST",
          body: JSON.stringify({
            productId: product.id,
            variantId: product.variantId || product.id,
            quantity: 1
          })
        });
        
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        
        if (res.ok) {
          dispatch({ type: "ADD_TO_CART", product });
        }
      } catch (err) {
        console.error("Add to cart failed", err);
      }
    },
    [router]
  );

  const removeFromCart = useCallback(
    async (productId: string) => {
      // We need variantId to remove from backend. Frontend currently passes productId.
      // For V1, we'll try to find the variantId in the current state.
      const item = state.items.find(i => i.product.id === productId);
      if (!item) return;

      try {
        const res = await authFetch(`/api/v1/cart/remove/${item.product.variantId || productId}`, {
          method: "DELETE"
        });
        if (res.ok) {
          dispatch({ type: "REMOVE_FROM_CART", productId });
        }
      } catch (err) {
        console.error(err);
      }
    },
    [state.items]
  );

  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      const item = state.items.find(i => i.product.id === productId);
      if (!item) return;

      try {
        const res = await authFetch(`/api/v1/cart/update/${item.product.variantId || productId}`, {
          method: "PUT",
          body: JSON.stringify({ quantity })
        });
        if (res.ok) {
          dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
        }
      } catch (err) {
        console.error(err);
      }
    },
    [state.items]
  );

  const clearCart = useCallback(async () => {
    try {
      const res = await authFetch("/api/v1/cart/clear", {
        method: "DELETE"
      });
      if (res.ok) {
        dispatch({ type: "CLEAR_CART" });
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
