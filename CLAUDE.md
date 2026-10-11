# ZSN Website, Project Rules

Company profile untuk **PT Zufar Solusi Nawasena** (ZSN Technology Solution),
kontraktor infrastruktur jaringan & pengembang software, berbasis di
Jakarta Selatan, melayani Jabodetabek.

## Stack

| Layer | Pilihan |
|---|---|
| Framework | Astro 5, output static, `ClientRouter` (view transitions) |
| Bahasa | TypeScript strict |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite`, token di `src/styles/global.css` (`@theme`) |
| Konten | Content Collections + MDX (`src/content.config.ts`) |
| Ikon | `astro-icon` + `@iconify-json/lucide` |
| Font | self-host: `@fontsource-variable/archivo` (display, sumbu wdth), IBM Plex Sans (body), IBM Plex Mono (label) |
| JS | vanilla di `<script>` komponen. Tidak ada React di halaman. |

Semua script klien harus aman untuk `ClientRouter`: inisialisasi di
`astro:page-load`, bersihkan di `astro:before-swap`, dan beri guard supaya
tidak terpasang dua kali.

## Arah visual: "Power Grid" hibrida (per 2026-10)

Badan halaman TERANG seperti kertas gambar teknik. Gelap HANYA di hero
(semua halaman), menu mobile, dan footer. CTA penutup kuning penuh.
Motif utama: petir Z dari logo bundar ZSN.

- **Token semantik** (pakai ini di komponen): `canvas` `raised` `sunken` (latar),
  `strong` `body` `soft` (teks), `rule` `rule-strong` (garis). Nilainya
  ditukar otomatis di dalam elemen ber-kelas `.theme-dark` (lihat global.css).
- **Warna absolut** (tidak ikut tema): `ink` `snow` `void` `volt` `volt-hot` `volt-deep`.
  Pakai untuk teks di atas tombol kuning dan overlay di atas foto.
- Kuning di atas putih = 1.49:1. Di latar terang, kuning HANYA isian (tombol,
  `.volt-mark`, `.volt-under`, `.icon-tile`, penanda kotak). Teks/ikon kuning
  hanya di dalam `.theme-dark` atau di atas foto.
- Navbar transparan di atas hero gelap, berubah putih saat digulir
  (`html.nav-scrolled`). Karena itu setiap halaman WAJIB diawali hero gelap.
- Heading Archivo lebar (`font-stretch` 110 sampai 125%), sentence case.
- Signature: `GlobeMark.astro`, logo ZSN sebagai globe 3D (canvas 2D, tanpa
  library), prop `tone="light"` untuk latar terang, kualitas turun otomatis di
  perangkat lambat. Geometri logo di `src/config/mark.ts`.
- OG image: `public/og-default.jpg` dirender dari `/og-card` (lihat komentar di file itu).
- Semua animasi wajib menghormati `prefers-reduced-motion`.

### Anti AI-slop (copy & visual)

- Hindari pola "X, bukan Y", slogan tiga kata berirama, dan kalimat dramatis pendek.
- Tulis fakta yang bisa dicek. Klaim baru harus bersumber dari konten pemilik.
- Jangan menampilkan gambar buatan AI sebagai pekerjaan ZSN.
  `src/assets/project/proj-6.jpg` (sama dengan `src/assets/layanan/network-hero.jpg`) adalah gambar AI
  (TODO pemilik: ganti dengan foto asli). Section dokumen di beranda sengaja tidak memakainya.
- Ilustrasi dokumen (OTDR, as-built, berita acara) diberi keterangan "ilustrasi format".

## Konvensi

- Copy dalam **Bahasa Indonesia**. Rute tetap: `/services`, `/portfolio`,
  `/products/software`, `/about`, `/contact`, `/team`.
- Satu template layanan: `components/service/ServicePage.astro`, dipakai
  `services/[slug]` dan `products/[slug]`. Blok dirender hanya bila datanya ada.
- Daftar layanan: satu sumber di `src/config/services.ts`. Navigasi di `src/config/nav.ts`.
- Foto galeri di frontmatter layanan masih placeholder. Section "Dokumentasi
  lapangan" memakai foto proyek asli dari koleksi `project` dengan kategori sama.
- Jangan pakai em dash (—) atau en dash (–) di copy. Pakai koma, titik, titik dua, atau kurung.
- Tombol memakai kata kerja aktif ("Minta Survei", "Jadwalkan Survei").

## Klaim yang DILARANG di konten

- `99% Uptime` atau janji uptime apa pun. ZSN memasang, tidak mengoperasikan jaringan.
- Durasi garansi karangan. Cukup "Bergaransi" sampai pemilik memberi angka.
- Jumlah headcount/teknisi.
- Harga karangan. Paket tanpa `hargaMulai` tampil "Harga sesuai survei".
- Angka hasil/metrik karangan (mis. "+95%", "2x lebih cepat"). Data `portofolio`
  software berisi metrik seperti itu dan sengaja TIDAK dirender.
- Nama klien tanpa izin (flag `klienTampil`).
- Klaim kemitraan resmi merek perangkat. Selalu "Perangkat yang kami tangani".
- Nomor legalitas (akta, NIB, NPWP) dan data pribadi apa pun.

## Gate di schema (jangan dilemahkan)

- `tim.izinTampil: z.literal(true)`: anggota tim tanpa persetujuan tertulis menggagalkan build.
- `project.klienTampil: z.boolean().default(false)`.
- `site.isProduction: false` membuat semua halaman noindex dan robots.txt Disallow.

## Mematikan proses

JANGAN menjalankan `taskkill /F /IM node.exe` atau perintah sejenis yang
menargetkan semua proses berdasarkan nama. Hentikan hanya PID yang kamu
jalankan sendiri.
