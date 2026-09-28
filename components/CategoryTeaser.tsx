// components/CategoryTeaser.tsx — Teaser 5 kategori di landing page (DC-9)
import Link from "next/link";
import type { ProductCategory } from "@/lib/types";
import { ALL_CATEGORIES, CATEGORY_LABELS, CATEGORY_ICONS } from "@/lib/types";

const CATEGORY_DESCS: Record<ProductCategory, string> = {
  sarung_bantal: "Motif cantik, bahan lembut",
  bandana: "Aksesori serbaguna",
  taplak_meja: "Percantik ruang makan",
  kerajinan_lain: "Unik & penuh kreasi",
  bunga_hidup: "Segar langsung dari kebun",
};

const CATEGORY_COLORS: Record<ProductCategory, string> = {
  sarung_bantal: "from-[var(--color-terra-100)] to-[var(--color-cream-200)]",
  bandana: "from-[var(--color-sage-100)] to-[var(--color-cream-100)]",
  taplak_meja: "from-[var(--color-cream-200)] to-[var(--color-terra-100)]",
  kerajinan_lain: "from-[var(--color-warm-100)] to-[var(--color-cream-200)]",
  bunga_hidup: "from-[var(--color-sage-100)] to-[var(--color-terra-100)]",
};

export default function CategoryTeaser() {
  return (
    <section id="kategori" className="px-5 py-14 max-w-5xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-terra-500)]">
          Koleksi Kami
        </span>
        <h2 className="font-display text-3xl font-bold text-[var(--color-warm-800)] mt-2">
          Temukan Produk Favorit Anda
        </h2>
        <p className="text-sm text-[var(--color-warm-500)] mt-2 max-w-xs mx-auto">
          Lima kategori kerajinan tangan yang dibuat dengan penuh cinta dan dedikasi
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { cat: "sarung_bantal", img: "/images/category-bantal.jpg" },
          { cat: "bandana", img: "/images/category-bandana.jpg" },
          { cat: "taplak_meja", img: "/images/category-taplak.jpg" },
          { cat: "bunga_hidup", img: "/images/category-bunga.jpg" },
          { cat: "kerajinan_lain", img: "/images/hero-craft.jpg" },
        ].map(({ cat, img }, i) => {
          const catKey = cat as ProductCategory;
          return (
            <Link
              key={catKey}
              href={`/produk`}
              id={`category-teaser-${catKey}`}
              aria-label={`Lihat produk kategori ${CATEGORY_LABELS[catKey]}`}
              className={`
                group relative flex flex-col justify-end
                h-48 sm:h-56 p-4 rounded-2xl overflow-hidden
                shadow-md hover:shadow-xl transition-all duration-300
                hover:-translate-y-1 border border-[var(--color-cream-300)]
                ${i === 4 ? "col-span-2 sm:col-span-1" : ""}
              `}
            >
              {/* Image Background */}
              <img
                src={img}
                alt={CATEGORY_LABELS[catKey]}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Content */}
              <div className="relative z-10 text-white flex flex-col gap-1">
                <span className="text-2xl mb-1">{CATEGORY_ICONS[catKey]}</span>
                <p className="font-display font-bold text-base leading-tight">
                  {CATEGORY_LABELS[catKey]}
                </p>
                <p className="text-xs text-white/80 line-clamp-1">
                  {CATEGORY_DESCS[catKey]}
                </p>
                <span className="mt-1 text-[11px] font-semibold text-emerald-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Lihat Produk →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* CTA ke halaman katalog */}
      <div className="text-center mt-8">
        <Link
          href="/produk"
          id="category-teaser-see-all"
          className="
            inline-flex items-center gap-2 px-6 py-3 rounded-xl
            border-2 border-[var(--color-terra-400)] text-[var(--color-terra-600)]
            font-semibold text-sm hover:bg-[var(--color-terra-500)] hover:text-white
            transition-all duration-200
          "
        >
          Lihat Semua Produk →
        </Link>
      </div>
    </section>
  );
}
