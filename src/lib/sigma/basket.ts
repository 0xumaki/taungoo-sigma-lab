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
// 1 service: 0%, 2 services: 7%, 3+ services: 10%, 5+ services: 20%
function getDiscountRate(serviceCount: number): number {
  if (serviceCount >= 5) return 0.20;
  if (serviceCount >= 3) return 0.10;
  if (serviceCount >= 2) return 0.07;
  return 0;
}

// Discount tier metadata for UI display
export const DISCOUNT_TIERS = [
  { count: 1, rate: 0, label: "1 SERVICE" },
  { count: 2, rate: 0.07, label: "2 SERVICES" },
  { count: 3, rate: 0.10, label: "3+ SERVICES" },
  { count: 5, rate: 0.20, label: "5+ SERVICES" },
] as const;

export function getNextTier(serviceCount: number): { count: number; rate: number; label: string } | null {
  for (const tier of DISCOUNT_TIERS) {
    if (serviceCount < tier.count) return tier;
  }
  return null;
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
