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

**Anotasi As-Built dan stempel galeri sengaja dimatikan sementara**
(field `anotasi` dan `stempel` dikosongkan di semua `src/content/layanan/*.mdx`
dan `src/content/project/*.mdx`). Fotonya masih placeholder abu polos,
jadi label callout menempel di ruang kosong dan terlihat buruk. Kode
pendukungnya tetap utuh di `src/components/service/Gallery.astro`,
tidak dihapus. Begitu foto asli terpasang:

1. Isi kembali `stempel` (kode project dan lokasi asli) dan `anotasi`
   (koordinat `x`/`y` menunjuk ke objek nyata di foto baru) di file
   `.mdx` terkait.
2. Lihat hasilnya di atas foto nyata, baru putuskan apakah anotasi
   As-Built dipertahankan. Ini signature element konsep As-Built di
   spec desain, tapi keputusan akhir memakainya atau tidak baru bisa
   diambil setelah terlihat di atas foto sungguhan, bukan placeholder.

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

## Foto tim

Halaman `/tim` sudah dibangun penuh dengan struktur per divisi, tapi
`src/content/tim/index.json` masih kosong (gate `izinTampil: z.literal(true)`
di `content.config.ts` sengaja menggagalkan build kalau ada entri tanpa
persetujuan tertulis — jangan dilemahkan). Sebelum mengisi data tim:

- **Wajib satu sesi, satu latar, satu pencahayaan.** Grid wajah di halaman
  ini berdampingan langsung, paling tidak memaafkan foto yang beda gaya
  antar anggota.
- **Persetujuan tertulis tiap orang wajib diperoleh sebelum tayang.** Foto
  dan nama yang masuk ke `index.json` akan publik dan terindeks Google,
  bukan sekadar tampil di situs.
- **Jangan sertakan foto yang menampilkan wajah klien atau lokasi yang
  mengidentifikasi klien** (nama gedung, plat nomor, dokumen di layar,
  dsb.) — foto tim harus difoto khusus, bukan diambil dari dokumentasi
  project.
- Halaman ini tidak pernah menampilkan jumlah anggota tim di mana pun
  (lihat `CLAUDE.md` bagian "Klaim yang DILARANG muncul di konten").
  Jangan menambahkan angka headcount saat mengisi konten nanti.

## Data legalitas dan data pribadi

- **Nomor legalitas apa pun (akta, NIB, NPWP) tidak boleh dirender di
  halaman publik mana pun** (beranda maupun `/tentang`) — keputusan
  pemilik: data legalitas tidak ditampilkan di website. Nomornya
  hanya untuk dokumen transaksi (penawaran, invoice, kontrak) — lihat
  `CLAUDE.md` bagian "Klaim yang DILARANG muncul di konten".
- **Data pribadi** (KTP direktur, NPWP pribadi, rekening bank, alamat
  rumah) tidak boleh muncul di mana pun di situs ini.
- Field `site.legalitas.akta`, `.nib`, dan `.npwp` di
  `src/config/site.ts` tetap dipertahankan untuk dipakai di dokumen
  internal (penawaran, invoice, kontrak) nanti — jangan
  menghubungkannya ke komponen halaman publik mana pun.

## Durasi garansi per layanan

Durasi garansi berbeda per layanan dan belum ditentukan pemilik.
Beranda dan `/tentang` sengaja hanya menyebut "Bergaransi" tanpa
angka. Di setiap halaman layanan, field stat "Garansi" sengaja
dikosongkan menjadi "Menyesuaikan Lingkup Pekerjaan" (lihat
`src/content/layanan/*.mdx`, key `stats`). Sebelum tayang:

- Isi durasi garansi asli untuk **fiber-optic, cctv, network,
  maintenance, dan software** (kalau layanan software juga
  bergaransi) di `stats` masing-masing file `.mdx`.
- Jangan mengarang angka. Tanyakan ke pemilik durasi per layanan,
  boleh berbeda-beda antar layanan.
- Perbaiki juga kalimat FAQ terkait garansi di `fiber-optic.mdx`
  yang saat ini generik ("sesuai lingkup pekerjaan") begitu durasi
  asli tersedia.

## Narasi project (body cerita)

Catatan kerja "TODO: tulis cerita project ini..." pernah tampil langsung
di halaman `/project/[slug]` (bocor ke pengunjung). Sudah dihapus dari
tampilan. Body tiap file di `src/content/project/*.mdx` untuk sementara
memakai ulang teks `ringkas` dari frontmatter-nya sendiri (sudah
terverifikasi, bukan karangan) supaya halaman tidak kosong.

- **Ganti body tiap project dengan narasi asli** sebelum tayang ke
  publik: konteks kebutuhan klien, tantangan lapangan, dan hasil
  setelah pekerjaan selesai. Jangan mengarang detail teknis atau nama
  klien.
