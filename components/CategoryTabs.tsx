"use client";
// components/CategoryTabs.tsx — Client-side category filter (DC-12)
import { useState } from "react";
import type { Product, ProductCategory } from "@/lib/types";
import { ALL_CATEGORIES, CATEGORY_LABELS, CATEGORY_ICONS } from "@/lib/types";
import ProductGrid from "./ProductGrid";

interface Props {
  products: Product[];
}

type FilterCategory = ProductCategory | "semua";

export default function CategoryTabs({ products }: Props) {
  const [active, setActive] = useState<FilterCategory>("semua");

  const filtered =
    active === "semua"
      ? products
      : products.filter((p) => p.kategori === active);

  const tabs: { value: FilterCategory; label: string; icon: string }[] = [
    { value: "semua", label: "Semua", icon: "✨" },
    ...ALL_CATEGORIES.map((cat) => ({
      value: cat,
      label: CATEGORY_LABELS[cat],
      icon: CATEGORY_ICONS[cat],
    })),
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Tab Bar */}
      <div
        role="tablist"
        aria-label="Filter kategori produk"
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      >
        {tabs.map(({ value, label, icon }) => {
          const isActive = active === value;
          return (
            <button
              key={value}
              role="tab"
              id={`tab-${value}`}
              aria-selected={isActive}
              aria-controls={`panel-${value}`}
              onClick={() => setActive(value)}
              className={`
                flex items-center gap-1.5 px-4 py-2 rounded-full
                text-sm font-medium whitespace-nowrap
                transition-all duration-200 border
                ${
                  isActive
                    ? "bg-[var(--color-terra-500)] text-white border-[var(--color-terra-500)] shadow-md shadow-[var(--color-terra-300)]"
                    : "bg-white text-[var(--color-warm-600)] border-[var(--color-cream-200)] hover:border-[var(--color-terra-300)] hover:text-[var(--color-terra-500)]"
                }
              `}
            >
              <span aria-hidden="true">{icon}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
      >
        <ProductGrid products={filtered} activeCategory={active} />
      </div>
    </div>
  );
}
