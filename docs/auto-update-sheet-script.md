# Panduan: Auto-update Website Setiap Kali Google Sheet Diedit

Dengan cara ini, setiap kali Anda **simpan perubahan di Google Sheet**,
website otomatis refresh dalam hitungan detik. Tanpa perlu tap bookmark apapun.

---

## Cara Setup (sekali saja, ~5 menit)

### Langkah 1 — Buka Script Editor di Google Sheet

1. Buka Google Sheet produk Danu's Collection
2. Klik menu **Extensions** (atau **Add-ons** di versi lama) → **Apps Script**
3. Tab baru terbuka dengan editor kode

### Langkah 2 — Hapus Kode yang Ada, Paste Kode Ini

Hapus semua isi editor, lalu paste kode berikut:

```javascript
// Otomatis trigger revalidasi website setiap kali Sheet diedit
// Tidak perlu diubah kecuali REVALIDATE_URL
const REVALIDATE_URL =
  "https://danu-s-collection.vercel.app/api/revalidate?secret=NzG1ims9XUBOIbrjfM85hRSqxAw24dK3";

function onEdit(e) {
  // Hanya trigger jika yang diedit adalah sheet "Sheet1" (sheet produk)
  if (e && e.source.getActiveSheet().getName() !== "Sheet1") return;

  try {
    UrlFetchApp.fetch(REVALIDATE_URL, { method: "get", muteHttpExceptions: true });
    Logger.log("Revalidasi berhasil: " + new Date().toISOString());
  } catch (err) {
    Logger.log("Revalidasi gagal: " + err.toString());
  }
}
```

### Langkah 3 — Simpan Script

Klik ikon **💾 Save** (atau Ctrl+S). Beri nama project: *"Auto Revalidate"*

### Langkah 4 — Izinkan Akses (sekali saja)

1. Klik tombol **▶ Run** (pilih fungsi `onEdit`)
2. Akan muncul popup "Authorization required" → klik **Review permissions**
3. Pilih akun Google Anda → klik **Advanced** → **Go to Auto Revalidate (unsafe)**
4. Klik **Allow**

> ⚠️ "Unsafe" bukan berarti berbahaya — Google hanya memperingatkan karena script
> buatan sendiri, bukan dari Google Marketplace. Script ini hanya memanggil URL eksternal.

### Langkah 5 — Test

1. Kembali ke Google Sheet
2. Edit salah satu sel (misal: ubah harga produk)
3. Tekan Enter
4. Tunggu 3–5 detik
5. Buka `danu-s-collection.vercel.app/produk` → perubahan sudah tampil ✅

---

## Cara Kerja Teknisnya

```
Anda edit sel di Sheet
        ↓
Google Apps Script (onEdit) otomatis terpanggil
        ↓
Script kirim request ke /api/revalidate?secret=...
        ↓
Next.js invalidate cache untuk / dan /produk
        ↓
Request berikutnya ke website fetch data baru dari Sheet
        ↓
Perubahan tampil ✅ (biasanya < 5 detik)
```

---

## Troubleshooting

| Masalah | Solusi |
|---|---|
| Script tidak jalan setelah edit | Pastikan nama sheet tepat — default "Sheet1", cek di tab bawah |
| "Authorization required" muncul terus | Coba Langkah 4 ulang, kali ini sampai klik Allow |
| Perubahan masih tidak tampil | Mungkin browser cache — hard refresh (Ctrl+Shift+R) |
| Cek log script | Di Apps Script editor → menu **View → Logs** |
