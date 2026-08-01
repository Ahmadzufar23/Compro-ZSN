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
  tagline: 'Infrastruktur Jaringan & Pengembangan Sistem', // TODO: konfirmasi tagline final

  /** Format internasional tanpa tanda "+". TODO: ganti dengan nomor asli. */
  whatsapp: '628xxxxxxxxxx',

  email: 'zufarsolusinawasena@gmail.com',

  alamat: {
    jalan: '', // TODO: isi nama jalan dan nomor
    kota: '', // TODO: isi kota/kabupaten
    kodePos: '', // TODO: isi kode pos
  },

  jamOperasional: 'Senin sampai Sabtu, 08.00 sampai 17.00 WIB',

  legalitas: {
    akta: '', // TODO: nomor akta pendirian
    nib: '', // TODO: Nomor Induk Berusaha
    /** JANGAN tampilkan di halaman publik. Hanya untuk dokumen
     *  penawaran, invoice, dan kontrak. */
    npwp: '', // TODO: NPWP perusahaan
  },

  coverage: [
    'Jakarta',
    'Bogor',
    'Depok',
    'Tangerang',
    'Bekasi',
  ], // TODO: konfirmasi cakupan area layanan aktual

  maps: {
    lat: 0, // TODO: koordinat lokasi kantor
    lng: 0, // TODO: koordinat lokasi kantor
    embedUrl: '', // TODO: URL embed Google Maps kantor
  },
} as const;

/**
 * waLink — menyusun deeplink WhatsApp dari pesan teks.
 * Situs static tanpa backend: semua "form" berujung ke sini.
 */
export function waLink(pesan: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(pesan)}`;
}
