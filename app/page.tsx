// app/page.tsx — Landing page (DC-8, DC-9, ISR)
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CategoryTeaser from "@/components/CategoryTeaser";
import { getProducts } from "@/lib/products";
import { formatHarga } from "@/lib/whatsapp";
import Link from "next/link";

export const revalidate = 3600; // ISR: revalidasi per jam

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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {featuredProducts.map((product) => (
                <article
                  key={product.id}
                  className="
                    flex flex-col rounded-2xl overflow-hidden
                    bg-[var(--color-cream-50)] border border-[var(--color-cream-200)]
                    hover:shadow-lg transition-all duration-300 hover:-translate-y-1
                  "
                >
                  <div className="aspect-square bg-[var(--color-cream-100)] flex items-center justify-center">
                    <span className="text-4xl">🛍️</span>
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <p className="text-xs font-semibold text-[var(--color-warm-800)] line-clamp-2 leading-snug">
                      {product.nama}
                    </p>
                    <p className="text-sm font-bold text-[var(--color-terra-600)]">
                      {formatHarga(product.harga)}
                    </p>
                  </div>
                </article>
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

      {/* Brand story section */}
      <section className="px-5 py-14 bg-[var(--color-cream-100)]">
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <span className="text-5xl">🧵</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-warm-800)]">
            Dibuat dengan Tangan, Dikirim dengan Hati
          </h2>
          <p className="text-[var(--color-warm-600)] leading-relaxed">
            Setiap produk Danu&apos;s Collection dikerjakan sendiri di Batam dengan
            bahan-bahan pilihan. Tidak ada mesin, tidak ada produksi massal —
            hanya keahlian tangan dan dedikasi untuk setiap detail kecil.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-2">
            {[
              { icon: "🏠", label: "Home-based", desc: "Dikerjakan di rumah" },
              { icon: "✂️", label: "Handmade", desc: "100% buatan tangan" },
              { icon: "📦", label: "Made to order", desc: "Bisa request khusus" },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="text-3xl">{icon}</span>
                <p className="font-semibold text-sm text-[var(--color-warm-700)]">{label}</p>
                <p className="text-xs text-[var(--color-warm-400)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
