import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/* ────────────────────────────────────────────────────────────
   LAYANAN

   Satu template [slug].astro melayani 5 halaman. Field wajib
   adalah tulang punggung yang dimiliki semua layanan. Field
   opsional hanya dirender jika datanya ada, sehingga software
   (tanpa galeri) dan maintenance (dengan paket kontrak) tetap
   memakai template yang sama tanpa percabangan di halaman.
   ──────────────────────────────────────────────────────────── */

/* Harga sengaja opsional. Jika kosong, UI menampilkan
   "Minta Penawaran" — bukan placeholder rusak seperti "Rp __".
   Situs bisa tayang penuh tanpa satu angka harga pun. */
const paketSchema = z.object({
  nama: z.string(),
  ringkas: z.string(),
  hargaMulai: z.string().optional(),   // "12" -> dirender "Mulai dari Rp 12 juta"
  satuan: z.string().optional(),       // "/bulan" untuk maintenance
  durasi: z.string().optional(),       // "4-8 minggu"
  unggulan: z.boolean().default(false),
  /** Baris label:nilai (maintenance) atau daftar isi paket (software) */
  isi: z.array(
    z.union([
      z.string(),
      z.object({ label: z.string(), nilai: z.string() }),
    ])
  ),
});

const layanan = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/layanan' }),
  schema: ({ image }) =>
    z.object({
      /* ── Wajib: tulang punggung semua halaman ── */
      judul: z.string(),
      urutan: z.number(),
      ringkas: z.string().max(160),
      subjudul: z.string(),

      /* Grid layanan di homepage khusus infrastruktur fisik — software
         punya SoftwareBanner sendiri. Default true supaya layanan baru
         otomatis muncul di grid tanpa perlu diset manual. */
      tampilDiGrid: z.boolean().default(true),

      /* Software memakai panel navy, bukan foto */
      heroStyle: z.enum(['foto', 'panel']).default('foto'),
      heroImage: image().optional(),
      heroAlt: z.string().min(10).optional(),

      ctaLabel: z.string().default('Minta Survei Gratis'),

      /* Sekuens nyata — penomoran 1..n dibenarkan.
         Di halaman software, ini adalah 6 tahap proses pengerjaan. */
      scope: z
        .array(z.object({ judul: z.string(), detail: z.string() }))
        .min(4)
        .max(8),

      faq: z
        .array(z.object({ tanya: z.string(), jawab: z.string() }))
        .min(4)
        .max(6),

      /* ── Opsional: dirender hanya jika ada ── */
      stats: z
        .array(z.object({ angka: z.string(), label: z.string() }))
        .min(3)
        .max(4)
        .optional(),

      cocokUntuk: z.array(z.string()).min(3).max(6).optional(),

      galeri: z
        .array(
          z.object({
            src: image(),
            alt: z.string().min(10),
            /* Stempel ala gambar teknik: ZSN/FTTH/2025-014 · JAKSEL */
            stempel: z.string().optional(),
            /* Anotasi As-Built. x/y persen relatif terhadap foto. */
            anotasi: z
              .array(
                z.object({
                  label: z.string(),
                  x: z.number().min(0).max(100),
                  y: z.number().min(0).max(100),
                })
              )
              .optional(),
          })
        )
        .optional(),

      alurKerja: z
        .array(z.object({ judul: z.string(), detail: z.string() }))
        .length(4)
        .optional(),

      faktorHarga: z
        .array(z.object({ judul: z.string(), penjelasan: z.string() }))
        .length(4)
        .optional(),

      /* Merek perangkat yang DITANGANI — bukan mitra resmi.
         Heading di UI wajib "Perangkat yang Kami Tangani". */
      merek: z.array(z.string()).optional(),

      /* Tier spesifikasi perangkat (CCTV) */
      tierPerangkat: z
        .array(
          z.object({
            tier: z.string(),
            nama: z.string(),
            ringkas: z.string(),
            unggulan: z.boolean().default(false),
            spek: z.array(z.object({ label: z.string(), nilai: z.string() })),
          })
        )
        .optional(),

      /* Kartu masalah (maintenance) */
      masalah: z
        .array(z.object({ judul: z.string(), detail: z.string() }))
        .optional(),

      paket: z.array(paketSchema).optional(),

      /* Tabel komitmen layanan (software) */
      komitmen: z
        .object({
          kolom: z.array(z.string()),
          baris: z.array(
            z.object({ label: z.string(), nilai: z.array(z.string()) })
          ),
        })
        .optional(),

      /* Eksklusi eksplisit. Sumber sengketa nomor satu di kontrak
         maintenance adalah asumsi yang tidak pernah ditulis. */
      tidakTermasuk: z.array(z.string()).optional(),
    })
    .refine((d) => d.heroStyle === 'panel' || (!!d.heroImage && !!d.heroAlt), {
      message: 'heroStyle "foto" wajib menyertakan heroImage dan heroAlt',
    }),
});

/* ────────────────────────────────────────────────────────────
   PROJECT
   ──────────────────────────────────────────────────────────── */
const project = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/project' }),
  schema: ({ image }) =>
    z
      .object({
        judul: z.string(),
        kategori: z.enum(['fiber', 'cctv', 'network', 'maintenance', 'software']),
        lokasi: z.string(),
        tanggal: z.coerce.date(),
        kodeProject: z
          .string()
          .regex(/^ZSN\/[A-Z]+\/\d{4}-\d{3}$/, 'Format: ZSN/FTTH/2025-014'),
        ringkas: z.string(),
        cover: image(),
        coverAlt: z.string().min(10),

        stats: z.array(z.object({ label: z.string(), nilai: z.string() })).max(4),

        /* Galeri As-Built — sama bentuknya dengan galeri layanan,
           supaya komponen Gallery.astro bisa dipakai ulang tanpa ubah. */
        galeri: z
          .array(
            z.object({
              src: image(),
              alt: z.string().min(10),
              stempel: z.string().optional(),
              anotasi: z
                .array(
                  z.object({
                    label: z.string(),
                    x: z.number().min(0).max(100),
                    y: z.number().min(0).max(100),
                  })
                )
                .optional(),
            })
          )
          .optional(),

        /* GATE IZIN KLIEN — default mati. Nama klien tidak tayang
           sebelum izin tertulis diperoleh dan flag dinyalakan manual. */
        klienTampil: z.boolean().default(false),
        klienNama: z.string().optional(),

        unggulan: z.boolean().default(false),
      })
      .refine((d) => !d.klienTampil || !!d.klienNama, {
        message: 'klienTampil aktif tetapi klienNama kosong',
      }),
});

/* ────────────────────────────────────────────────────────────
   TIM
   ──────────────────────────────────────────────────────────── */
const tim = defineCollection({
  loader: file('./src/content/tim/index.json'),
  schema: ({ image }) =>
    z.object({
      nama: z.string(),
      jabatan: z.string(),
      divisi: z.enum(['instalasi', 'teknis', 'operasional', 'manajemen']),
      foto: image(),
      sertifikasi: z.array(z.string()).optional(),

      /* GATE PERSETUJUAN — anggota tim tanpa persetujuan tertulis
         akan MENGGAGALKAN BUILD. Disengaja, jangan dilemahkan. */
      izinTampil: z.literal(true, {
        errorMap: () => ({
          message:
            'Foto dan nama anggota tim tidak boleh tayang tanpa persetujuan tertulis. Set izinTampil: true hanya setelah persetujuan diperoleh.',
        }),
      }),

      urutan: z.number(),
    }),
});

export const collections = { layanan, project, tim }; 