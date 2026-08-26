"use client";

import { create } from "zustand";

export interface BasketItem {
  slug: string;        // unique item ID (service slug OR add-on ID)
  name: string;
  type: "service" | "addon";
  price: number; // in MMK (0 = custom)
  icon: string;
  // Optional metadata for add-ons
  addonType?: "one-time" | "ongoing";
}

interface BasketState {
  items: BasketItem[];
  isOpen: boolean;
  addItem: (item: BasketItem) => void;
  removeItem: (slug: string) => void;
  clearBasket: () => void;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
  getTotal: () => number;           // all items (services + add-ons)
  getServicesTotal: () => number;    // only main services
  getAddonsTotal: () => number;      // only add-ons
  getDiscount: () => number;          // discount applied to SERVICES ONLY (not add-ons)
  getDiscountedTotal: () => number;   // total - discount
  getServiceCount: () => number;      // count of main services (for tier calc)
  getAddonCount: () => number;         // count of add-ons
}

// Bulk discount tiers
// 1 service: 0%, 2 services: 7%, 3+ services: 10%, 5+ services: 20%
// Discount applies ONLY to main services subtotal. Add-ons are not discounted.
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
      // Don't add duplicates (by slug — each service or add-on can only be in basket once)
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
  getServicesTotal: () => {
    const items = get().items;
    return items.filter((i) => i.type === "service").reduce((sum, i) => sum + i.price, 0);
  },
  getAddonsTotal: () => {
    const items = get().items;
    return items.filter((i) => i.type === "addon").reduce((sum, i) => sum + i.price, 0);
  },
  getDiscount: () => {
    // Discount applies ONLY to main services subtotal, NOT add-ons
    const items = get().items;
    const serviceCount = items.filter((i) => i.type === "service").length;
    const rate = getDiscountRate(serviceCount);
    const servicesTotal = items
      .filter((i) => i.type === "service")
      .reduce((sum, i) => sum + i.price, 0);
    return Math.round(servicesTotal * rate);
  },
  getDiscountedTotal: () => {
    // Total = services (after discount) + add-ons (no discount)
    return get().getServicesTotal() - get().getDiscount() + get().getAddonsTotal();
  },
  getServiceCount: () => {
    return get().items.filter((i) => i.type === "service").length;
  },
  getAddonCount: () => {
    return get().items.filter((i) => i.type === "addon").length;
  },
}));

export { getDiscountRate };
