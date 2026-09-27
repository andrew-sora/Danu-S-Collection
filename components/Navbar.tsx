"use client";
// components/Navbar.tsx — Navigasi atas sticky
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 w-full transition-all duration-300
        ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-[var(--color-cream-200)]"
            : "bg-transparent"
        }
      `}
    >
      <nav
        className="max-w-5xl mx-auto flex items-center justify-between px-5 h-14"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          id="nav-logo"
          className="font-display text-lg font-bold text-[var(--color-warm-800)] hover:text-[var(--color-terra-500)] transition-colors"
        >
          Danu&apos;s{" "}
          <span className="italic text-[var(--color-terra-500)]">Collection</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {[
            { href: "/produk", label: "Katalog" },
          ].map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                id={`nav-${label.toLowerCase()}`}
                className={`
                  px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-[var(--color-terra-500)] text-white"
                      : "text-[var(--color-warm-600)] hover:text-[var(--color-terra-500)] hover:bg-[var(--color-cream-100)]"
                  }
                `}
              >
                {label}
              </Link>
            );
          })}

          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-wa"
            className="
              ml-2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg
              bg-[#25D366] hover:bg-[#1ebe5d]
              text-white text-sm font-semibold
              transition-colors duration-200
            "
          >
            <span className="text-xs">💬</span>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
