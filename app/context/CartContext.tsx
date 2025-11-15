"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { CartItem } from "@/types";

interface CartContextType {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty"> & { qty: number }) => void;
  remove: (productId: string, fragranceId: string) => void;
  updateQty: (productId: string, fragranceId: string, qty: number) => void;
  total: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const add = (item: Omit<CartItem, "qty"> & { qty: number }) => {
    setItems((prev) => {
      const existing = prev.find(
        (it) =>
          it.productId === item.productId && it.fragranceId === item.fragranceId
      );
      if (existing) {
        return prev.map((it) =>
          it.productId === item.productId && it.fragranceId === item.fragranceId
            ? { ...it, qty: item.qty }
            : it
        );
      }
      return [...prev, item];
    });
  };

  const clearCart = () => {
    setItems([]);
  };
  const remove = (productId: string, fragranceId: string) => {
    setItems((prev) =>
      prev.filter(
        (it) => !(it.productId === productId && it.fragranceId === fragranceId)
      )
    );
  };

  const updateQty = (productId: string, fragranceId: string, qty: number) => {
    if (qty <= 0) {
      remove(productId, fragranceId);
    } else {
      setItems((prev) =>
        prev.map((it) =>
          it.productId === productId && it.fragranceId === fragranceId
            ? { ...it, qty }
            : it
        )
      );
    }
  };

  const total = items.reduce((sum, it) => sum + it.pricePerUnit * it.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, add, remove, updateQty, total, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
