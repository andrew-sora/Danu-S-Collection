// app/layout.tsx — Root layout + metadata (DC-21)
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Danu's Collection — Kerajinan Tangan dari Batam",
    template: "%s | Danu's Collection",
  },
  description:
    "Toko kerajinan tangan premium dari Batam. Sarung bantal, bandana, taplak meja, dan bunga hidup dibuat dengan tangan penuh cinta. Pesan langsung via WhatsApp.",
  keywords: [
    "kerajinan tangan",
    "sarung bantal",
    "bandana",
    "taplak meja",
    "bunga hidup",
    "Batam",
    "handmade",
    "UMKM",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Danu's Collection",
    title: "Danu's Collection — Kerajinan Tangan dari Batam",
    description:
      "Sarung bantal, bandana, taplak meja, dan kerajinan cantik buatan tangan. Pesan via WhatsApp, dikirim dari Batam.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Danu's Collection — Kerajinan Tangan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Danu's Collection",
    description: "Kerajinan tangan premium dari Batam 🛍️",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
