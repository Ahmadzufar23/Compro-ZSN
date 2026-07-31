# GO-LIVE — Checklist Sebelum Tayang

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
