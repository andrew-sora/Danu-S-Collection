# Runbook: Update Produk Danu's Collection (DC-20)

**Untuk:** Andrew (maintainer)
**Versi:** 1.0 · 26 September 2026

---

## Workflow: Tambah / Edit / Hapus Produk

### Langkah 1 — Edit Google Sheet

1. Buka [Google Sheet Danu's Collection](https://docs.google.com/spreadsheets/)
2. Pilih sheet **products**
3. Lakukan perubahan:

| Operasi | Cara |
|---|---|
| **Tambah produk baru** | Tambah baris baru di bawah, isi semua kolom |
| **Edit produk** | Langsung edit sel yang ingin diubah |
| **Tandai habis** | Ubah kolom `status` menjadi `sold_out` |
| **Hapus produk** | Hapus barisnya (atau ubah status ke `sold_out`) |

**Nilai kolom yang valid:**

- `kategori`: `sarung_bantal`, `bandana`, `taplak_meja`, `kerajinan_lain`, `bunga_hidup`
- `status`: `ready`, `pre_order`, `sold_out`
- `harga`: angka saja, tanpa Rp atau titik (contoh: `45000`)
- `foto_url`: link Google Drive format `https://drive.google.com/file/d/XXXX/view`

### Langkah 2 — Trigger Revalidasi Cache

Setelah simpan di Sheet, buka URL ini di browser HP atau laptop:

```
https://danus-collection.vercel.app/api/revalidate?secret=NzG1ims9XUBOIbrjfM85hRSqxAw24dK3
```

> 💡 **Bookmark URL ini di HP** — cukup tap bookmark setiap kali selesai edit Sheet.

**Response yang diharapkan (di browser):**
```json
{
  "revalidated": true,
  "paths": ["/", "/produk"],
  "timestamp": "2026-09-27T..."
}
```

Jika muncul `"error": "unauthorized"` → cek secret di URL, harus sama persis.

### Langkah 3 — Verifikasi

1. Buka `https://danus-collection.vercel.app/produk`
2. Hard refresh (Ctrl+Shift+R di desktop, atau tutup-buka tab di HP)
3. Produk baru/perubahan harus sudah tampil

**Estimasi waktu:** Edit Sheet → Tap bookmark → Produk live = **< 1 menit**

---

## Tambah Foto Produk ke Google Drive

1. Buka Google Drive → upload foto produk
2. Klik kanan foto → **Share** → **Anyone with the link** → **Viewer**
3. Copy link (format: `https://drive.google.com/file/d/XXXX/view`)
4. Paste di kolom `foto_url` di Sheet
5. Trigger revalidasi (Langkah 2)

---

## Troubleshooting

| Masalah | Solusi |
|---|---|
| Produk tidak muncul setelah revalidasi | Pastikan Sheet sudah di-save, tunggu 5 detik, coba revalidasi lagi |
| Foto tidak tampil | Pastikan sharing Google Drive di-set ke "Anyone with link can view" |
| Revalidasi URL error 401 | Secret salah — cek di Vercel Environment Variables |
| Site down / error 500 | Buka Vercel dashboard → cek Deployment logs |

---

## Kontak Darurat

- **Maintainer:** Andrew (Soradev)
- **Rollback:** Vercel dashboard → Deployments → pilih versi sebelumnya → Promote to Production

---

*Runbook ini harus bisa diikuti tanpa Andrew. Jika ada langkah yang membingungkan, hubungi Andrew via WhatsApp.*
