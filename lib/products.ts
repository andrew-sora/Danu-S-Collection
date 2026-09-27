// lib/products.ts — Google Sheets CSV fetch + parse layer (DC-5, DC-6, DC-7)
import Papa from "papaparse";
import type { Product, ProductCategory, ProductStatus } from "./types";
import { ALL_CATEGORIES } from "./types";

const SHEET_CSV_URL = process.env.SHEET_CSV_URL;

// DC-7: Stale-cache fallback — jika fetch gagal, kembalikan data terakhir yang berhasil
let lastKnownGood: Product[] = [];

export async function getProducts(): Promise<Product[]> {
  if (!SHEET_CSV_URL) {
    console.warn("SHEET_CSV_URL tidak diset. Mengembalikan data kosong.");
    return lastKnownGood;
  }

  try {
    const res = await fetch(SHEET_CSV_URL, {
      next: { revalidate: 3600 }, // ISR: revalidasi setiap 1 jam
    });

    if (!res.ok) {
      throw new Error(`Sheet fetch gagal: HTTP ${res.status}`);
    }

    const csv = await res.text();

    const { data, errors } = Papa.parse<Record<string, string>>(csv, {
      header: true,
      skipEmptyLines: true,
    });

    if (errors.length > 0) {
      console.warn("Papaparse warnings:", errors);
    }

    const products = data
      .map(normalizeRow)
      .filter((p): p is Product => p !== null);

    lastKnownGood = products; // update fallback cache
    return products;
  } catch (err) {
    // DC-7: Graceful degradation — jangan pernah throw ke halaman
    console.error("getProducts fallback triggered:", err);
    return lastKnownGood;
  }
}

// DC-6: Normalisasi row dari CSV ke tipe Product
function normalizeRow(row: Record<string, string>): Product | null {
  // Skip baris yang tidak punya id atau nama
  if (!row.id?.trim() || !row.nama?.trim()) return null;

  const kategori = row.kategori?.trim() as ProductCategory;
  const status = row.status?.trim() as ProductStatus;

  return {
    id: row.id.trim(),
    nama: row.nama.trim(),
    kategori: ALL_CATEGORIES.includes(kategori) ? kategori : "kerajinan_lain",
    harga: Number(row.harga?.replace(/\D/g, "")) || 0, // toleran terhadap "45.000" atau "45000"
    deskripsi: row.deskripsi?.trim() ?? "",
    fotoUrl: normalizeDriveUrl(row.foto_url?.trim() ?? ""),
    status: ["ready", "pre_order", "sold_out"].includes(status)
      ? status
      : "ready",
  };
}

// DC-6: Ubah Google Drive share link → direct view URL
// Input:  https://drive.google.com/file/d/FILE_ID/view?usp=sharing
// Output: https://drive.google.com/uc?export=view&id=FILE_ID
function normalizeDriveUrl(url: string): string {
  if (!url) return "";

  // Format /file/d/ID/view
  const fileMatch = url.match(/\/file\/d\/([^/?\s]+)/);
  if (fileMatch) {
    return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
  }

  // Format /open?id=ID
  const openMatch = url.match(/[?&]id=([^&\s]+)/);
  if (openMatch) {
    return `https://drive.google.com/uc?export=view&id=${openMatch[1]}`;
  }

  // URL lain (bukan Drive) dikembalikan apa adanya
  return url;
}
