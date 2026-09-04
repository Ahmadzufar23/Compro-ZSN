/**
 * site.ts — satu sumber kebenaran untuk data perusahaan.
 *
 * Semua field bertanda TODO adalah placeholder dan BELUM diverifikasi.
 * Jangan mengarang nomor, alamat, atau nomor legalitas — isi field ini
 * hanya dengan data asli dari pemilik bisnis di Fase 5.
 */

export const site = {
  /** Set true HANYA saat domain asli sudah aktif dan astro.config.mjs
   * sudah menunjuk ke domain tersebut. */
  isProduction: false as boolean,

  nama: 'ZSN',
  namaLegal: 'PT Zufar Solusi Nawasena',
  tagline: 'Network Infrastructure & System Development', // TODO: konfirmasi tagline final

  /** Format internasional tanpa tanda "+". */
  whatsapp: '6282210323080',

  email: 'zufarsolusinawasena@gmail.com',

  alamat: {
    jalan: 'Jl. Delman Utama No. 23, RT.12/RW.9',
    kelurahan: 'Kebayoran Lama Utara',
    kecamatan: 'Kebayoran Lama',
    kota: 'Jakarta Selatan',
    provinsi: 'DKI Jakarta',
    kodePos: '12240',
  },

  jamOperasional: 'Monday to Saturday, 08:00 to 17:00 WIB',

  /** JANGAN tampilkan di halaman publik mana pun (keputusan pemilik).
   *  Field ini hanya dipakai untuk dokumen transaksi: penawaran,
   *  invoice, dan kontrak. */
  legalitas: {
    akta: '', // TODO: nomor akta pendirian
    nib: '', // TODO: Nomor Induk Berusaha
    npwp: '', // TODO: NPWP perusahaan
  },

  /** Halaman yang belum punya foto asli / persetujuan tertulis.
   * Aktifkan setelah foto asli dan persetujuan tertulis tersedia. */
  halamanAktif: {
    tim: false,
    project: false,
  },

  maps: {
    url: 'https://maps.app.goo.gl/f7bCnxDp139qH7qL9',
  },
} as const;

/**
 * waLink — menyusun deeplink WhatsApp dari pesan teks.
 * Situs static tanpa backend: semua "form" berujung ke sini.
 */
export function waLink(pesan: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(pesan)}`;
}
