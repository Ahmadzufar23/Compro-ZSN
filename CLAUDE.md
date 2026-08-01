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
- Google Fonts via CDN — semua font self-host lewat `@fontsource-variable/*`
- Google Tag Manager
- CSS-in-JS
- Radius pill (`rounded-full`) di elemen apa pun kecuali avatar bulat

---

## Warna

Diambil langsung dari logo ZSN. Jangan mengubah nilai hex.

```
--color-yellow        #FFCE00
--color-yellow-hover  #E6B900
--color-amber-text    #8A6600
--color-ink           #0A0A0A
--color-graphite      #1C1C1E
--color-steel         #2E3033
--color-slate         #4A5259
--color-slate-muted   #9AA0A6
--color-mist          #F4F4F5
```

### Aturan kuning — tanpa pengecualian

Kuning `#FFCE00` di atas putih hanya mencapai kontras **1.49:1**. Itu gagal WCAG total.

**Kuning boleh dipakai sebagai:** isian tombol (dengan teks ink di atasnya) · tag kecil · angka statistik di latar gelap · garis bawah nav aktif · garis anotasi teknis · garis aksen diagonal

**Kuning dilarang sebagai:** teks di atas latar terang · latar besar (> 10% viewport) · link dalam paragraf · warna semantik peringatan

Jika butuh teks warna kuning di latar terang, gunakan `--color-amber-text` (5.27:1).

**Tidak ada biru di mana pun.**

---

## Tipografi

```
Display  Chakra Petch    600, 700   — heading, uppercase, tracking rapat
Body     Archivo         400, 500, 600
Utility  IBM Plex Mono   400, 500   — label teknis, uppercase, tracking 0.12em
```

Jangan mengganti dengan Inter, Geist, atau system font stack.

---

## Arah Visual: "As-Built"

Website ini meniru bahasa dokumen teknis yang benar-benar diproduksi ZSN: as-built drawing dan laporan uji OTDR.

**Signature element:** diagram topologi isometrik beranimasi di hero (ODP → gedung → rack → dashboard), dengan satu titik cahaya kuning berjalan menyusuri jalur. Implementasi `stroke-dashoffset`, tanpa library.

**Perangkat pendukung:**
- Anotasi teknis SVG di atas foto: garis callout kuning tipis + label mono
- Grid blueprint di section gelap: linear-gradient, opacity 4%
- Stempel spesifikasi di pojok foto: `ZSN/FTTH/2025-014 · JAKSEL · 12 LANTAI`
- Simbol teknis kustom (konektor, ODP, patch panel) menggantikan ikon generik

### Aturan animasi

**Hanya ada satu momen beranimasi di seluruh situs**: diagram hero. Selebihnya statis, kecuali hover state dan marquee logo.

Semua animasi wajib menghormati `prefers-reduced-motion`.

### Larangan visual

- Ikon generik: gembok, awan, roda gigi, grafik naik
- Foto stok — semua foto harus dari arsip ZSN
- Penomoran `01/02/03` pada daftar yang bukan urutan. Layanan bukan sekuens; Scope Pekerjaan dan Alur Kerja adalah sekuens (penomoran benar di sana)
- Grid yang seluruhnya seragam — patahkan ritme secara sengaja di Project

---

## Ritme Halaman

Latar gelap (`bg="ink"` atau `bg="graphite"` di `Section.astro`) dan
latar terang (`white`, `mist`) wajib berselang-seling menuruni halaman.

**JANGAN pernah ada tiga seksi gelap berturut-turut**, termasuk footer
(footer selalu `bg-ink`). Kalau urutan konten alami menghasilkan dua
seksi gelap yang saling menempel lalu disusul footer, sisipkan satu
seksi terang di antaranya, atau kecilkan salah satu jadi `size="sm"`
supaya tidak terasa satu blok hitam raksasa.

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
- Focus visible: ring kuning di latar gelap, ring ink di latar terang
- Touch target ≥ 44×44 px
- Alt text deskriptif, bukan "foto instalasi"
- Skip-to-content link

---

## Klaim yang DILARANG muncul di konten

Ini pernah masuk ke draf desain dan harus dicegah:

- **`99% Uptime`** — ZSN memasang jaringan, tidak mengoperasikannya. Uptime ditentukan ISP dan listrik. Klaim ini memberi dasar tuntutan hukum. Ganti dengan `Garansi 30 Hari`.
- **Durasi garansi selain 30 hari** — kebijakan garansi ZSN adalah 30 hari, seragam di semua layanan. Jangan menulis 60 atau 90 hari di mana pun.
- **`8 Teknisi Lapangan`** — jumlah headcount tidak ditampilkan di mana pun.
- **Harga hasil karangan** — jangan mengisi placeholder harga dengan angka apa pun. Biarkan `Rp __` sampai pemilik mengisi.
- **Nama klien tanpa izin** — dikunci oleh flag `klienTampil` di schema.
- **Klaim kemitraan perangkat** — ZSN menangani perangkat Hikvision/MikroTik/dll, tetapi **bukan** partner resmi mereka. Heading harus "Perangkat yang Kami Tangani", jangan pernah menulis "Mitra".
- **NPWP** — tidak boleh dirender di halaman publik mana pun. Nomor itu hanya untuk dokumen transaksi (penawaran, invoice, kontrak). Akta dan NIB aman ditampilkan (terdaftar publik lewat AHU dan OSS).
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

### FAQ dan form — coba tanpa React dulu

- FAQ accordion: pakai <details>/<summary> native, bukan React.
  Pola ini sudah dipakai di Navbar untuk menu mobile.
- Form kontak: situs static, tidak ada backend. Pakai deeplink
  WhatsApp (https://wa.me/<nomor>?text=<pesan>) yang menyusun pesan
  dari input, bukan form submit.

Kalau kedua ini terpenuhi tanpa React, cabut @astrojs/react dan react
dari package.json di akhir Fase 2. Situs jadi 0 KB JS.