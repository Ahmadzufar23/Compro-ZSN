# GO-LIVE — Checklist Sebelum Tayang

## Langkah wajib pertama — lepas proteksi noindex

Situs ini dideploy sementara ke URL Vercel sebelum domain asli aktif,
dan sengaja diblokir total dari indexing Google (lihat `Base.astro`,
`robots.txt.ts`, `site.isProduction`). Sebelum tayang ke publik:

1. Ganti `site` di `astro.config.mjs` dari URL Vercel sementara ke
   domain asli.
2. Set `isProduction: true` di `src/config/site.ts`.
3. `npm run build`, lalu verifikasi `dist/index.html` **TIDAK** lagi
   mengandung `<meta name="robots" content="noindex, nofollow">`.
4. Verifikasi `dist/robots.txt` sudah `Allow: /` dan baris `Sitemap:`
   menunjuk ke domain asli (bukan URL Vercel).

Tanpa langkah ini, situs tetap tersembunyi dari Google walau sudah
tayang di domain asli.

## Saat foto asli masuk

Placeholder foto (Fase 2–4) dipakai ulang dari beberapa file generik yang
sama di banyak tempat — alt text, stempel, dan anotasi As-Built ditulis
mengikuti pola visual placeholder tersebut, **bukan** foto lokasi
sebenarnya. Begitu foto asli menggantikan placeholder, ketiga hal ini
wajib diperiksa ulang satu per satu, bukan asumsi otomatis masih benar:

- **Alt text wajib ditulis ulang menyesuaikan foto barunya.** Alt yang
  ada sekarang (terutama di `src/content/project/*.mdx`) mendeskripsikan
  isi foto placeholder lama (mis. "Kamera CCTV dome terpasang pada
  plafon area lobi gedung"), bukan foto project yang akan tayang. Alt
  yang tidak diganti akan mendeskripsikan sesuatu yang salah — lebih
  buruk daripada alt kosong.
- **Verifikasi stempel `kodeProject`** (`ZSN/FTTH/2025-014 · JAKSEL`,
  dst.) di setiap `stempel` galeri sesuai kode project dan lokasi
  sebenarnya — bukan disalin begitu saja dari placeholder.
- **Cek ulang anotasi As-Built** (koordinat `x`/`y` pada `anotasi`):
  posisi callout dihitung berdasarkan komposisi foto placeholder lama.
  Foto asli hampir pasti punya komposisi berbeda, sehingga garis callout
  bisa menunjuk ke objek yang salah atau ke area kosong kalau
  koordinatnya tidak disesuaikan ulang.

## Data legalitas dan data pribadi

- **NPWP tidak boleh dirender di halaman publik mana pun** (beranda
  maupun `/tentang`). Nomor itu hanya untuk dokumen transaksi
  (penawaran, invoice, kontrak). Akta dan NIB aman ditampilkan karena
  terdaftar publik lewat AHU dan OSS — lihat `CLAUDE.md` bagian
  "Klaim yang DILARANG muncul di konten".
- **Data pribadi** (KTP direktur, NPWP pribadi, rekening bank, alamat
  rumah) tidak boleh muncul di mana pun di situs ini.
- Field `site.legalitas.npwp` di `src/config/site.ts` tetap
  dipertahankan untuk dipakai di dokumen internal nanti — jangan
  menghubungkannya ke komponen halaman publik mana pun.
