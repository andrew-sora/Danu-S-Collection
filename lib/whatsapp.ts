// lib/whatsapp.ts — WA message builder (DC-16)
import type { Product } from "./types";
import { CATEGORY_LABELS } from "./types";

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "";

/**
 * Membangun URL wa.me dengan pesan pre-filled yang sudah di-encode.
 * Contoh output:
 *   https://wa.me/6281234567890?text=Halo%2C%20saya%20mau%20pesan...
 */
export function buildWaLink(product: Product): string {
  const hargaFormatted = product.harga.toLocaleString("id-ID");
  const kategoriLabel = CATEGORY_LABELS[product.kategori] ?? product.kategori;

  const message =
    `Halo Kak, saya tertarik dengan produk ini:\n\n` +
    `🛍️ *${product.nama}*\n` +
    `📦 Kategori: ${kategoriLabel}\n` +
    `💰 Harga: Rp${hargaFormatted}\n\n` +
    `Apakah masih tersedia? Terima kasih 🙏`;

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Format harga ke format IDR yang mudah dibaca.
 * Contoh: 45000 → "Rp45.000"
 */
export function formatHarga(harga: number): string {
  return `Rp${harga.toLocaleString("id-ID")}`;
}
