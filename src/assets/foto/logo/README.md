# Logo ZSN

Dua file SVG dibutuhkan di folder ini. Format **wajib SVG**, bukan PNG,
PNG akan buram di layar retina dan ukurannya jauh lebih besar daripada
vektor.

## `zsn-logo.svg`

Logo asli hitam-kuning. Dipakai di navbar (latar putih).

## `zsn-logo-putih.svg`

**Bukan logo putih polos.** Hanya bagian **hitam** pada logo asli yang
dibalik jadi putih. Bagian **kuning `#FFCE00` tetap kuning**, karena itu
identitas brand, dan kuning di atas latar ink punya kontras 13.27:1,
sangat terbaca. Dipakai di footer (latar ink).

## Kalau file belum ada

`Logo.astro` sudah punya fallback wordmark teks "ZSN", jadi build tidak
akan gagal selama kedua file di atas belum tersedia. Begitu file SVG
ditambahkan di folder ini dengan nama persis seperti di atas, Logo.astro
otomatis memakainya menggantikan fallback teks.
