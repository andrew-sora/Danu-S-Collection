// components/ProductCard.tsx — Kartu produk (DC-13)
import Image from "next/image";
import type { Product } from "@/lib/types";
import { STATUS_LABELS, CATEGORY_LABELS } from "@/lib/types";
import { formatHarga } from "@/lib/whatsapp";
import WhatsAppCTA from "./WhatsAppCTA";

interface Props {
  product: Product;
}

const statusClass: Record<string, string> = {
  ready: "badge-ready",
  pre_order: "badge-pre_order",
  sold_out: "badge-sold_out",
};

export default function ProductCard({ product }: Props) {
  const isSoldOut = product.status === "sold_out";

  return (
    <article
      className={`
        group flex flex-col rounded-2xl overflow-hidden
        bg-white border border-[var(--color-cream-200)]
        shadow-sm hover:shadow-xl
        transition-all duration-300 hover:-translate-y-1
        animate-fadeinup
        ${isSoldOut ? "opacity-70" : ""}
      `}
    >
      {/* Foto Produk */}
      <div className="relative aspect-square overflow-hidden bg-[var(--color-cream-100)]">
        {product.fotoUrl ? (
          <Image
            src={product.fotoUrl}
            alt={product.nama}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`
              object-cover transition-transform duration-500
              group-hover:scale-105
              ${isSoldOut ? "grayscale" : ""}
            `}
            onError={(e) => {
              // Fallback: sembunyikan gambar jika error, tampil placeholder
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          /* DC-6: Placeholder saat foto kosong */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="text-4xl">🛍️</span>
            <span className="text-xs text-[var(--color-warm-400)]">Foto segera hadir</span>
          </div>
        )}

        {/* Status Badge — overlay di pojok kiri atas */}
        <span
          className={`
            absolute top-2 left-2 px-2 py-0.5 rounded-full
            text-[10px] font-semibold uppercase tracking-wide
            ${statusClass[product.status]}
          `}
        >
          {STATUS_LABELS[product.status]}
        </span>
      </div>

      {/* Info Produk */}
      <div className="flex flex-col flex-1 gap-3 p-4">
        {/* Kategori */}
        <span className="text-[11px] font-medium text-[var(--color-terra-500)] uppercase tracking-widest">
          {CATEGORY_LABELS[product.kategori]}
        </span>

        {/* Nama */}
        <h3 className="font-display text-[var(--color-warm-800)] text-base font-semibold leading-snug line-clamp-2">
          {product.nama}
        </h3>

        {/* Deskripsi singkat */}
        {product.deskripsi && (
          <p className="text-xs text-[var(--color-warm-500)] line-clamp-2 leading-relaxed">
            {product.deskripsi}
          </p>
        )}

        {/* Spacer + Harga + CTA */}
        <div className="mt-auto flex flex-col gap-3 pt-2 border-t border-[var(--color-cream-200)]">
          <span className="text-lg font-bold text-[var(--color-terra-600)] font-display">
            {formatHarga(product.harga)}
          </span>

          <WhatsAppCTA product={product} size="sm" />
        </div>
      </div>
    </article>
  );
}
