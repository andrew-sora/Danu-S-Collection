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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {ALL_CATEGORIES.map((cat, i) => (
          <Link
            key={cat}
            href={`/produk`}
            id={`category-teaser-${cat}`}
            aria-label={`Lihat produk kategori ${CATEGORY_LABELS[cat]}`}
            className={`
              group relative flex flex-col items-center justify-center
              gap-2 p-5 rounded-2xl text-center
              bg-gradient-to-br ${CATEGORY_COLORS[cat]}
              border border-[var(--color-cream-200)]
              hover:border-[var(--color-terra-300)]
              hover:shadow-lg transition-all duration-300
              hover:-translate-y-1
              ${i === 4 ? "col-span-2 sm:col-span-1" : ""}
            `}
          >
            <span
              className="text-4xl transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            >
              {CATEGORY_ICONS[cat]}
            </span>
            <div>
              <p className="font-display font-semibold text-sm text-[var(--color-warm-800)]">
                {CATEGORY_LABELS[cat]}
              </p>
              <p className="text-[11px] text-[var(--color-warm-500)] mt-0.5">
                {CATEGORY_DESCS[cat]}
              </p>
            </div>
            <span className="
              mt-1 text-[10px] font-semibold text-[var(--color-terra-500)]
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
            ">
              Lihat produk →
            </span>
          </Link>
        ))}
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
