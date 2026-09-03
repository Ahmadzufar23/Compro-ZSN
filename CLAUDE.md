# ZSN Website — Project Rules

Company profile untuk **PT Zufar Solusi Nawasena** (ZSN Technology Solution), vendor infrastruktur jaringan & software di Jabodetabek.

Baca file ini sebelum menulis kode apa pun. Aturan di sini mengalahkan preferensi default.

---
### Sintaks Tailwind 4 (bukan v3)

- Token `--text-*`, `--color-*`, `--radius-*` di `@theme` OTOMATIS jadi utility.
  Tulis `text-hero`, bukan `text-[length:--text-hero]`.
  Tulis `rounded-md`, bukan `rounded-[--radius]`.
- Nilai arbitrer tetap pakai bracket: `z-[100]`.
- Tidak ada `tailwind.config.js`. Semua token di `src/styles/global.css`.

## Stack (terkunci — jangan diganti)

| Layer | Pilihan |
|---|---|
| Framework | Astro 5, output static |
| Bahasa | TypeScript, strict |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite` |
| Konten | Content Collections + MDX, Content Layer API (`glob` loader) |
| Interaktif | React 19 islands — **hanya** untuk FAQ, marquee, dan form |
| Animasi | `motion/react` |
| Ikon | `astro-icon` (inline SVG) |
| Gambar | `astro:assets` |
| Deploy | Vercel static |

### Dilarang keras

- Menambah React ke halaman yang tidak butuh interaktivitas
- `localStorage` / `sessionStorage`
- Library animasi selain `motion` (tidak boleh Framer Motion, GSAP, AOS)
- Google Fonts via CDN — semua font self-host lewat `@fontsource/*`
- Google Tag Manager
- CSS-in-JS
- Radius apa pun. Tidak ada token `--radius-*` di tema, jadi
  `rounded-*` tidak menghasilkan apa-apa di mana pun kecuali
  `rounded-full` (utility inti Tailwind, bukan token), yang tetap
  dipakai khusus avatar bulat.

---

## Warna

Arah baru (per 2026-09): **enterprise terang, presisi, tertahan** — bukan
lagi industrial gelap dengan aksen kuning mencolok. Alasan: arah lama
terbaca sebagai template startup, bukan perusahaan teknik. Referensi
tone: Schneider Electric, Vertiv, Legrand. Jangan mengubah nilai hex.

```
--color-canvas      #FFFFFF   latar dasar
--color-surface     #FAFAF9   off-white hangat, latar section berselang-seling
--color-ink         #18181B   teks utama, heading
--color-muted       #52525B   teks sekunder, body copy
--color-subtle      #A1A1AA   teks tersier, label pendukung
--color-hairline    #E4E4E7   garis pemisah 1px, pengganti border kartu
--color-yellow      #FFCE00   aksen brand, tetap
--color-yellow-hover #E6B900  turunan hover tombol primer
--color-deep        #0C0C0D   hanya untuk SATU section gelap (CTA penutup)
```

`graphite`, `steel`, `mist`, `slate`, `slate-muted`, `amber-text` **sudah
dihapus** dari tema. Jangan pakai nama-nama itu di kode baru — kelasnya
tidak menghasilkan CSS apa pun (no-op), bukan error build, tapi elemennya
kehilangan warna diam-diam. Migrasi seluruh situs ke token baru sudah
selesai per batch 2, lihat "Status migrasi visual" di bawah.

### Aturan kuning — tanpa pengecualian

Kuning `#FFCE00` di atas putih hanya mencapai kontras **1.49:1**. Itu gagal WCAG total.

**Kuning maksimal 3% permukaan halaman.** Boleh dipakai sebagai: isian
tombol primer (dengan teks ink di atasnya) · penanda kotak kecil 8x8px
di samping label · garis bawah nav aktif 2px · satu titik cahaya di
diagram topologi.

**Kuning dilarang sebagai:** teks di atas latar terang · latar section ·
border kartu · ikon berukuran besar · link dalam paragraf · warna
semantik peringatan.

`--color-amber-text` (kuning legal sebagai teks, 5.27:1) sudah dihapus
dari tema bersama palet lama. Kalau butuh teks bernuansa kuning di latar
terang, jangan — pakai `--color-ink` atau `--color-muted` dan sisakan
kuning untuk isian/penanda kecil saja.

**Tidak ada biru di mana pun.**

---

## Tipografi

```
Display  Archivo          700, 800   — heading, SENTENCE CASE, tracking -0.02em
Body     IBM Plex Sans    400, 500, 600
Utility  IBM Plex Mono    400, 500   — label teknis (.label-tech), uppercase, tracking 0.12em
```

Chakra Petch dan Archivo Variable (body lama) sudah dihapus sepenuhnya
dari `package.json` dan `global.css`. Jangan mengganti dengan Inter,
Geist, atau system font stack.

Skala tipe (turun dari versi sebelumnya, supaya tidak terbaca seperti
landing page konsumer):

```
--text-hero   clamp(2.25rem, 1.6rem + 2.8vw, 4rem)
--text-h1     clamp(1.875rem, 1.5rem + 1.6vw, 2.75rem)
--text-h2     clamp(1.5rem, 1.3rem + 0.9vw, 2rem)
--text-h3     clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)
--text-body   1rem
--text-label  0.6875rem
```

### Heading sentence case

`h1`–`h4` TIDAK lagi `text-transform: uppercase`. Tulis heading di
source persis seperti tampilannya: `"One stop solution"`, bukan
`"ONE STOP SOLUTION"`. Uppercase disisakan khusus untuk `.label-tech`
(label mono kecil: eyebrow, stat, nav aktif).

---

## Bentuk

Tidak ada radius di mana pun. Tema tidak lagi punya token
`--radius-sm/md/lg`, jadi `rounded-sm`/`rounded-md`/`rounded-lg` tidak
menghasilkan CSS apa pun (elemen tetap bersudut tegas secara default).
Kecualinya cuma `rounded-full` untuk avatar bulat, karena itu utility
inti Tailwind, bukan turunan token tema.

---

## Arah Visual: Enterprise Terang

Website ini meniru bahasa dokumen teknis yang benar-benar diproduksi
ZSN (as-built drawing, laporan uji OTDR), tapi digambar ulang untuk
kanvas terang: informasi padat, warna sangat tertahan, tanpa dekorasi
gelap yang dulu mendominasi.

**Signature element:** diagram topologi isometrik beranimasi di hero
(ODP → gedung → rack → dashboard) digambar dengan garis ink tipis dan
node bergaris rambut (hairline) di atas latar terang — satu-satunya
elemen kuning di diagram adalah titik cahaya yang berjalan menyusuri
jalur. Implementasi `stroke-dashoffset`, tanpa library.

**Perangkat pendukung:**
- Anotasi teknis SVG di atas foto: garis callout kuning tipis + label mono
- Stempel spesifikasi di pojok foto: `ZSN/FTTH/2025-014 · JAKSEL · 12 LANTAI`
- Simbol teknis kustom (konektor, ODP, patch panel) menggantikan ikon generik
- Garis rambut horizontal 1px (`border-hairline`) sebagai pemisah antar
  item, BUKAN kartu berbingkai, sebagai pola utama. Konten duduk
  langsung di atas canvas/surface tanpa pembungkus bila memungkinkan.

**Grid dekoratif (linear-gradient tipis di latar gelap) sudah dihapus
sepenuhnya** — dianggap terlalu dekoratif untuk arah baru. `Section.astro`
tidak lagi punya prop untuk itu.

### Aturan animasi

**Hanya ada satu momen beranimasi di seluruh situs**: diagram hero. Selebihnya statis, kecuali hover state dan marquee logo.

Semua animasi wajib menghormati `prefers-reduced-motion`.

### Larangan visual

- Ikon generik: gembok, awan, roda gigi, grafik naik
- Foto stok — semua foto harus dari arsip ZSN
- Penomoran `01/02/03` pada daftar yang bukan urutan. Layanan bukan sekuens; Scope Pekerjaan dan Alur Kerja adalah sekuens (penomoran benar di sana)
- Grid yang seluruhnya seragam — patahkan ritme secara sengaja di Project
- Kartu berbingkai sebagai pola default (lihat "Perangkat pendukung" di atas)

---

## Ritme Halaman

**Hanya SATU section gelap per halaman**, yaitu CTA penutup (atau,
di halaman tanpa CTA penutup seperti `/kontak` dan `404`, satu section
hero/utuh yang sengaja dibuat gelap) — memakai `bg="deep"` di
`Section.astro`. Semua section lain berselang-seling halus antara
`canvas` (putih) dan `surface` (off-white hangat).

`Section.astro` hanya menerima `canvas` | `surface` | `deep`. Alias
lama (`white`, `mist`, `ink`, `graphite`) sudah dihapus dari
propnya — migrasi ke token baru sudah selesai di seluruh situs per
batch 2, lihat "Status migrasi visual".

---

## Konvensi

- Slug dan copy dalam **Bahasa Indonesia**: `/layanan/fiber-optic`, bukan `/services/fiber`
- Nama komponen PascalCase, file konten kebab-case
- `Navbar.astro` dan `Footer.astro` masing-masing hanya **satu file**, dipakai semua halaman
- Halaman layanan memakai **satu** template `[slug].astro` — jangan buat file per layanan
- Copy tombol memakai kata kerja aktif: "Minta Survei", bukan "Submit". Jangan pakai "Pilih Paket" (bahasa e-commerce, tidak ada checkout)

### Larangan tanda baca

JANGAN pernah memakai em dash (—) atau en dash (–) di copy
website mana pun: heading, paragraf, deskripsi kartu, alt text,
maupun konten MDX.

Alasan: tanda hubung panjang bukan kebiasaan penulisan Bahasa
Indonesia dan merupakan penanda teks hasil AI yang paling
mudah dikenali.

Ganti dengan: koma, titik, titik dua, atau kurung.
Contoh:
  SALAH  "Kami membangun sistem — dashboard monitoring, sampai
          portal pelaporan."
  BENAR  "Kami membangun sistem: dashboard monitoring, sistem
          inventaris, sampai portal pelaporan."

---

## Quality Gate

| Metrik | Target |
|---|---|
| LCP (p75, mobile 4G) | < 1.800 ms |
| INP | < 200 ms |
| CLS | < 0,1 |
| JS per halaman | < 30 KB gzip |
| Hero island | < 45 KB gzip |
| Lighthouse Perf / A11y / SEO | ≥ 90 / 95 / 95 |

### A11y wajib

- Semantic HTML — `<nav>`, `<main>`, `<article>`
- Focus visible: ring kuning di section `deep`, ring ink di section terang
- Touch target ≥ 44×44 px
- Alt text deskriptif, bukan "foto instalasi"
- Skip-to-content link

---

## Klaim yang DILARANG muncul di konten

Ini pernah masuk ke draf desain dan harus dicegah:

- **`99% Uptime`** — ZSN memasang jaringan, tidak mengoperasikannya. Uptime ditentukan ISP dan listrik. Klaim ini memberi dasar tuntutan hukum. Ganti dengan `Bergaransi` (tanpa angka durasi umum, lihat butir berikutnya).
- **Durasi garansi karangan di konten umum** — durasi garansi berbeda per layanan dan belum ditentukan pemilik. Beranda, `/tentang`, footer, dan meta tidak boleh menyebut angka durasi (mis. "30 Hari"), cukup kata "Bergaransi". Halaman layanan boleh menyebut garansi secara spesifik per layanan, tetapi durasinya dikosongkan ("Menyesuaikan Lingkup Pekerjaan") sampai pemilik memberi angka asli, jangan mengarang.
- **`8 Teknisi Lapangan`** — jumlah headcount tidak ditampilkan di mana pun.
- **Harga hasil karangan** — jangan mengisi placeholder harga dengan angka apa pun. Biarkan `Rp __` sampai pemilik mengisi.
- **Nama klien tanpa izin** — dikunci oleh flag `klienTampil` di schema.
- **Klaim kemitraan perangkat** — ZSN menangani perangkat Hikvision/MikroTik/dll, tetapi **bukan** partner resmi mereka. Heading harus "Perangkat yang Kami Tangani", jangan pernah menulis "Mitra".
- **Nomor legalitas apa pun (akta, NIB, NPWP)** — dilarang muncul di halaman publik mana pun (keputusan pemilik: data legalitas tidak ditampilkan di website). Field-fieldnya tetap disimpan di `site.ts` karena dipakai untuk dokumen transaksi (penawaran, invoice, kontrak), tapi tidak boleh dihubungkan ke komponen halaman publik mana pun.
- **Data pribadi** — KTP direktur, NPWP pribadi, rekening bank, alamat rumah tidak boleh muncul di mana pun.

---

## Gate di schema (jangan dilemahkan)

- `tim.izinTampil: z.literal(true)` — anggota tim tanpa persetujuan tertulis akan **menggagalkan build**. Ini disengaja.
- `project.klienTampil: z.boolean().default(false)` — nama klien tidak tayang sebelum dinyalakan manual.

---

## Fase

| Fase | Isi | Status |
|---|---|---|
| 0 | Scaffold, token, font, Navbar, Footer, Base layout | ← mulai di sini |
| 1 | Homepage: hero + diagram topologi, stats, grid layanan, banner software, project, marquee, tim |  |
| 2 | Template `[slug].astro` + semua komponen section + 5 konten layanan |  |
| 3 | Project index & detail, Tim, Tentang (legalitas), Kontak |  |
| 4 | Responsive audit, a11y, SEO, JSON-LD, OG image, sitemap |  |
| 5 | Ganti placeholder dengan konten asli |  |

Fase 0–4 dikerjakan penuh dengan placeholder. Fase 5 tidak memblokir apa pun.

### Status migrasi visual (arah "enterprise terang", per 2026-09)

**Selesai.** Batch 1 mengerjakan token (`global.css`), `Section.astro`,
`Button.astro`, `Navbar.astro`, `Footer.astro`, `Base.astro`,
`Hero.astro`, `StatBand.astro`, `TopologyDiagram.astro`. Batch 2
menuntaskan sisanya: seluruh section beranda (`ServiceGrid`,
`SoftwareBanner`, `ProjectHighlight`, `BrandMarquee`, `TentangPreview`,
`TeamPreview`, `CtaBanner`), seluruh `components/service/*`, dan
halaman `tentang`, `tim`, `kontak`, `layanan/index`, `project/*`,
`404`. Alias lama di `Section.astro` (`white`/`mist`/`ink`/`graphite`)
dan prop `blueprint` sudah dicabut sepenuhnya — `bg` sekarang hanya
menerima `canvas` | `surface` | `deep`.

Pola kartu berbingkai (bg-ink/border-2/rounded) diganti garis rambut
di hampir semua tempat. Dua pengecualian sengaja dipertahankan sebagai
"kartu" tipis tanpa isian warna dan tanpa radius (border-hairline
saja), karena kontennya butuh pemisahan visual yang jelas: foto
anggota tim di `tim.astro` dan galeri foto di `Gallery.astro`.
`PaketCards.astro` sengaja TIDAK dikonversi jadi `<table>` literal
meski instruksi awal memintanya — isi tiap paket (`isi[]`) punya
panjang berbeda-beda antar paket (lihat komentar di file), jadi
dipaksakan jadi baris tabel akan salah sejajar. Tetap berupa kolom
dipisah garis rambut vertikal (`md:divide-x`), bukan `<table>`.

Dua halaman tanpa CTA penutup alami (`/kontak`, `404`) sengaja diberi
satu section `deep` di posisi hero, supaya tetap ada satu jangkar
gelap per halaman tanpa memaksakan CTA baru yang tidak diminta.
`layanan/index.astro` dan `project/index.astro` sengaja TIDAK diberi
section deep — keduanya halaman direktori murni tanpa CTA di desain
aslinya, menambahkannya akan jadi scope creep.

### FAQ dan form — coba tanpa React dulu

- FAQ accordion: pakai <details>/<summary> native, bukan React.
  Pola ini sudah dipakai di Navbar untuk menu mobile.
- Form kontak: situs static, tidak ada backend. Pakai deeplink
  WhatsApp (https://wa.me/<nomor>?text=<pesan>) yang menyusun pesan
  dari input, bukan form submit.

Kalau kedua ini terpenuhi tanpa React, cabut @astrojs/react dan react
dari package.json di akhir Fase 2. Situs jadi 0 KB JS.