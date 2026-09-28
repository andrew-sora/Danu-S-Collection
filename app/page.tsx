// app/page.tsx — Landing page (DC-8, DC-9, ISR)
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CategoryTeaser from "@/components/CategoryTeaser";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";
import { formatHarga } from "@/lib/whatsapp";
import Link from "next/link";

export const revalidate = 300; // ISR: 5 menit

export const metadata: Metadata = {
  title: "Danu's Collection — Kerajinan Tangan Batam",
  description:
    "Temukan sarung bantal, bandana, taplak meja, dan kerajinan cantik buatan tangan dari Batam. Pesan mudah via WhatsApp, tanpa ribet.",
  openGraph: {
    title: "Danu's Collection — Kerajinan Tangan Batam",
    description:
      "Kerajinan tangan premium dari Batam. Pesan langsung via WhatsApp!",
  },
};

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.filter((p) => p.status === "ready").slice(0, 4);

  return (
    <>
      {/* DC-8: Hero */}
      <Hero />

      {/* DC-9: Category teaser */}
      <CategoryTeaser />

      {/* Produk Unggulan */}
      {featuredProducts.length > 0 && (
        <section className="px-5 py-12 bg-white" id="produk-unggulan">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-terra-500)]">
                  Pilihan Terbaik
                </span>
                <h2 className="font-display text-2xl font-bold text-[var(--color-warm-800)] mt-1">
                  Produk Unggulan
                </h2>
              </div>
              <Link
                href="/produk"
                className="text-sm text-[var(--color-terra-500)] font-medium hover:underline"
              >
                Lihat semua →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/produk"
                id="landing-see-all-products"
                className="
                  inline-flex items-center gap-2 px-6 py-3 rounded-xl
                  bg-[var(--color-terra-500)] hover:bg-[var(--color-terra-600)]
                  text-white font-semibold text-sm
                  transition-all duration-200 hover:shadow-lg
                "
              >
                Lihat Semua Produk →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Brand story section dengan gambar Workshop Mama */}
      <section className="px-5 py-16 bg-[var(--color-cream-100)] border-t border-[var(--color-cream-200)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Foto Workshop Mama */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="/images/story-mama.jpg"
                alt="Proses Pembuatan Kerajinan Danu's Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-xs font-semibold px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md">
                📍 Workshop Rumahan di Batam
              </div>
            </div>
          </div>

          {/* Cerita Mama */}
          <div className="lg:col-span-6 flex flex-col gap-4 text-center lg:text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-terra-500)]">
              🧵 Cerita Danu&apos;s Collection
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-warm-800)] leading-tight">
              Dibuat dengan Tangan, Dikirim dengan Hati
            </h2>
            <p className="text-[var(--color-warm-600)] text-sm leading-relaxed">
              Setiap produk Danu&apos;s Collection dikerjakan sendiri oleh Mama di Batam dengan
              kain & bahan-bahan pilihan. Tanpa mesin pabrik massal —
              hanya keahlian tangan, ketelitian, dan kasih sayang dalam setiap jahitan.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-3 pt-4 border-t border-[var(--color-cream-300)]">
              {[
                { icon: "🏠", label: "Home-based", desc: "Usaha rumahan" },
                { icon: "✂️", label: "Handmade", desc: "100% buatan tangan" },
                { icon: "📦", label: "Kirim se-Indo", desc: "Dari Batam" },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="flex flex-col items-center lg:items-start gap-0.5">
                  <span className="text-2xl">{icon}</span>
                  <p className="font-semibold text-xs text-[var(--color-warm-800)]">{label}</p>
                  <p className="text-[11px] text-[var(--color-warm-500)]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
