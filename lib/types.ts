// lib/types.ts — Data contract untuk seluruh aplikasi

export type ProductStatus = "ready" | "pre_order" | "sold_out";

export type ProductCategory =
  | "sarung_bantal"
  | "bandana"
  | "taplak_meja"
  | "kerajinan_lain"
  | "bunga_hidup";

export interface Product {
  id: string;
  nama: string;
  kategori: ProductCategory;
  harga: number;
  deskripsi: string;
  fotoUrl: string;
  status: ProductStatus;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  sarung_bantal: "Sarung Bantal",
  bandana: "Bandana",
  taplak_meja: "Taplak Meja",
  kerajinan_lain: "Kerajinan Lain",
  bunga_hidup: "Bunga Hidup",
};

export const CATEGORY_ICONS: Record<ProductCategory, string> = {
  sarung_bantal: "🛏️",
  bandana: "🎀",
  taplak_meja: "🍽️",
  kerajinan_lain: "🧶",
  bunga_hidup: "🌸",
};

export const ALL_CATEGORIES: ProductCategory[] = [
  "sarung_bantal",
  "bandana",
  "taplak_meja",
  "kerajinan_lain",
  "bunga_hidup",
];

export const STATUS_LABELS: Record<ProductStatus, string> = {
  ready: "Tersedia",
  pre_order: "Pre-Order",
  sold_out: "Habis",
};
