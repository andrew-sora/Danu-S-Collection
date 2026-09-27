// app/produk/page.tsx — Halaman katalog produk (DC-11, DC-12, DC-21, ISR)
import type { Metadata } from "next";
import { getProducts } from "@/lib/products";
import CategoryTabs from "@/components/CategoryTabs";

export const revalidate = 3600; // ISR: revalidasi per jam

export const metadata: Metadata = {
  title: "Katalog Produk",
  description:
    "Jelajahi katalog lengkap sarung bantal, bandana, taplak meja, kerajinan, dan bunga hidup dari Danu's Collection Batam. Pesan langsung via WhatsApp.",
  openGraph: {
    title: "Katalog Produk — Danu's Collection",
    description: "Temukan kerajinan tangan cantik dari Batam. Pesan via WhatsApp!",
  },
};

export default async function ProdukPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[var(--color-cream-50)]">
      {/* Page header */}
      <div className="bg-gradient-to-br from-[var(--color-cream-100)] to-[var(--color-terra-100)] px-5 py-12 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-terra-500)]">
          Koleksi Lengkap
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-warm-800)] mt-2">
          Katalog Produk
        </h1>
        <p className="text-sm text-[var(--color-warm-500)] mt-2 max-w-sm mx-auto">
          {products.length > 0
            ? `${products.length} produk tersedia — filter berdasarkan kategori`
            : "Sedang memuat produk..."}
        </p>
      </div>

      {/* Filter + Grid */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <CategoryTabs products={products} />
      </div>
    </div>
  );
}
