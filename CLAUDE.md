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

## Arah visual: "Power Grid" (per 2026-10)

Gelap seperti ruang panel, kuning volt seperti arus yang berjalan di jalur.
Motif utama: petir Z dari logo bundar ZSN.

- Palet: `void` `ink` `carbon` `steel` `line` (gelap berlapis), `snow` `mist` `fog`
  (teks), `paper` `bone` `graphite` (section terang), `volt` `volt-hot` `volt-deep` (kuning logo).
- Kuning bebas dipakai sebagai aksen, blok sorotan (`.volt-mark`), dan satu
  section CTA penuh (`CtaFinal`). Teks kuning hanya di atas latar gelap.
- Heading memakai Archivo lebar (`font-stretch` 110 sampai 125%), sentence case.
- Utility khas: `.cut-z` (sudut terpotong diagonal), `.bg-grid`, `.crop-marks`,
  `.flow-line` (arus di jalur SVG), `.label-tech`, `.panel`, `[data-reveal]`.
- Signature: `GlobeMark.astro`, logo ZSN sebagai globe 3D yang berputar,
  dirender per piksel di canvas 2D tanpa library. Geometri logo di
  `src/config/mark.ts` (dipakai juga oleh `ZMark.astro` dan favicon).
- Semua animasi wajib menghormati `prefers-reduced-motion`.

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
