// components/Hero.tsx — Brand hero section (DC-8)
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="
        relative min-h-[90svh] flex flex-col items-center justify-center
        bg-gradient-to-br from-[var(--color-cream-100)] via-[var(--color-cream-200)] to-[var(--color-terra-100)]
        px-5 py-16 text-center overflow-hidden
      "
    >
      {/* Dekorasi background — lingkaran blur */}
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[var(--color-terra-200)] opacity-30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[var(--color-cream-400)] opacity-40 blur-2xl"
      />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-lg mx-auto">

        {/* Tag label */}
        <span className="
          inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
          bg-[var(--color-terra-100)] text-[var(--color-terra-600)]
          text-xs font-semibold uppercase tracking-widest
          border border-[var(--color-terra-200)]
        ">
          🏷️ Kerajinan Tangan Batam
        </span>

        {/* Heading utama */}
        <h1 className="
          font-display text-4xl sm:text-5xl font-bold
          text-[var(--color-warm-800)] leading-tight
        ">
          Danu&apos;s{" "}
          <span className="italic text-[var(--color-terra-500)]">Collection</span>
        </h1>

        {/* Hang-tag visual — dekorasi teks */}
        <div className="
          flex items-center gap-3 px-5 py-3 rounded-2xl
          bg-white/70 backdrop-blur-sm border border-[var(--color-cream-300)]
          shadow-sm
        ">
          <span className="text-2xl">🧵</span>
          <p className="text-sm text-[var(--color-warm-600)] font-medium leading-snug text-left">
            Dibuat dengan tangan penuh kasih<br />
            dari Batam untuk seluruh Indonesia
          </p>
        </div>

        {/* Brand story singkat */}
        <p className="text-base text-[var(--color-warm-600)] leading-relaxed max-w-sm">
          Sarung bantal, bandana, taplak meja, dan kerajinan cantik lainnya —
          semua dikerjakan sendiri dengan detail dan cinta.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2">
          <Link
            href="/produk"
            id="hero-cta-catalog"
            className="
              flex items-center justify-center gap-2
              px-6 py-3.5 rounded-xl
              bg-[var(--color-terra-500)] hover:bg-[var(--color-terra-600)]
              text-white font-semibold text-sm
              transition-all duration-200
              hover:shadow-lg hover:shadow-[var(--color-terra-300)]
              hover:-translate-y-0.5
            "
          >
            🛍️ Lihat Katalog
          </Link>

          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-wa"
            className="
              flex items-center justify-center gap-2
              px-6 py-3.5 rounded-xl
              bg-white hover:bg-[var(--color-cream-100)]
              text-[var(--color-warm-700)] font-semibold text-sm
              border border-[var(--color-cream-300)]
              transition-all duration-200 hover:-translate-y-0.5
            "
          >
            💬 Tanya via WhatsApp
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50"
      >
        <div className="w-px h-8 bg-[var(--color-warm-400)] animate-pulse" />
        <span className="text-[10px] text-[var(--color-warm-400)] uppercase tracking-widest">Scroll</span>
      </div>
    </section>
  );
}
