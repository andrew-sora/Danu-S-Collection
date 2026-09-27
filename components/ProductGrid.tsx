// components/ProductGrid.tsx — Grid produk + empty state (DC-11, DC-14)
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  activeCategory?: string;
}

export default function ProductGrid({ products, activeCategory }: Props) {
  // DC-9 / Error state: jika SHEET_CSV_URL tidak ada atau gagal total
  if (products.length === 0 && !activeCategory) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <span className="text-5xl">📦</span>
        <div>
          <p className="font-display text-lg text-[var(--color-warm-700)] font-semibold">
            Katalog sedang dimuat
          </p>
          <p className="text-sm text-[var(--color-warm-500)] mt-1">
            Hubungi kami langsung via WhatsApp untuk info produk terkini.
          </p>
        </div>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2 px-5 py-3 rounded-xl
            bg-[#25D366] text-white font-semibold text-sm
            hover:bg-[#1ebe5d] transition-colors
          "
        >
          Hubungi Kami
        </a>
      </div>
    );
  }

  // DC-14: Empty state per kategori
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <span className="text-5xl">🔍</span>
        <p className="font-display text-lg text-[var(--color-warm-600)] font-semibold">
          Belum ada produk di kategori ini
        </p>
        <p className="text-sm text-[var(--color-warm-400)]">
          Silakan pilih kategori lain atau hubungi kami untuk request produk.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid grid-cols-2 gap-3
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
      "
    >
      {products.map((product, i) => (
        <div
          key={product.id}
          style={{ animationDelay: `${Math.min(i * 50, 300)}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
