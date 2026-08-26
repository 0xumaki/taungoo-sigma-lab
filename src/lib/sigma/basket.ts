"use client";

import { create } from "zustand";

export interface BasketItem {
  slug: string;
  name: string;
  type: "service" | "addon";
  price: number; // in MMK (0 = custom)
  icon: string;
}

interface BasketState {
  items: BasketItem[];
  isOpen: boolean;
  addItem: (item: BasketItem) => void;
  removeItem: (slug: string) => void;
  clearBasket: () => void;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
  getTotal: () => number;
  getDiscount: () => number;
  getDiscountedTotal: () => number;
  getServiceCount: () => number;
}

// Bulk discount tiers
// 1 service: 0%, 2: 5%, 3-4: 10%, 5+: 15%
function getDiscountRate(serviceCount: number): number {
  if (serviceCount >= 5) return 0.15;
  if (serviceCount >= 3) return 0.10;
  if (serviceCount >= 2) return 0.05;
  return 0;
}

// Parse price string to number (MMK)
// "from 3,020,000 MMK" → 3020000
// "custom" → 0
export function parsePrice(priceStr: string): number {
  if (priceStr === "custom") return 0;
  const match = priceStr.replace(/from\s*/i, "").replace(/[, ]/g, "").match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export function formatMMK(amount: number): string {
  if (amount === 0) return "custom";
  return amount.toLocaleString("en-US") + " MMK";
}

export const useBasketStore = create<BasketState>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (item) =>
    set((state) => {
      // Don't add duplicates
      if (state.items.some((i) => i.slug === item.slug)) return state;
      return { items: [...state.items, item] };
    }),
  removeItem: (slug) =>
    set((state) => ({
      items: state.items.filter((i) => i.slug !== slug),
    })),
  clearBasket: () => set({ items: [] }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
  getTotal: () => {
    const items = get().items;
    return items.reduce((sum, i) => sum + i.price, 0);
  },
  getDiscount: () => {
    const items = get().items;
    const serviceCount = items.filter((i) => i.type === "service").length;
    const rate = getDiscountRate(serviceCount);
    return Math.round(get().getTotal() * rate);
  },
  getDiscountedTotal: () => {
    return get().getTotal() - get().getDiscount();
  },
  getServiceCount: () => {
    return get().items.filter((i) => i.type === "service").length;
  },
}));

export { getDiscountRate };
