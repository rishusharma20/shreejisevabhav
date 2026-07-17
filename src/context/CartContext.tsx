"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import type { CartState, CartAction, CartItem, Product } from "@/lib/types";

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

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const items: CartItem[] = JSON.parse(stored);
        dispatch({ type: "LOAD_CART", items });
      }
    } catch {
      // Silently fail on invalid JSON
    }
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
    (product: Product) => dispatch({ type: "ADD_TO_CART", product }),
    []
  );

  const removeFromCart = useCallback(
    (productId: string) => dispatch({ type: "REMOVE_FROM_CART", productId }),
    []
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", productId, quantity }),
    []
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

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
