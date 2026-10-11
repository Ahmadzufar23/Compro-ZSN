/**
 * services.ts: satu sumber kebenaran untuk daftar layanan.
 * Dipakai beranda, footer, dan halaman /services. Deskripsi panjang
 * tetap diambil dari content collection masing-masing.
 */
export const services = [
  {
    label: 'Fiber Optic & FTTH',
    slug: 'fiber-optic',
    href: '/services/fiber-optic',
    kode: 'FO',
    lapisan: 'Lapisan fisik',
    tagline: 'Tarik kabel, sambung, uji OTDR.',
  },
  {
    label: 'Infrastruktur Jaringan',
    slug: 'network',
    href: '/services/network',
    kode: 'NW',
    lapisan: 'Lapisan jaringan',
    tagline: 'Rack, switch, routing, WiFi.',
  },
  {
    label: 'CCTV & Keamanan',
    slug: 'cctv',
    href: '/services/cctv',
    kode: 'CV',
    lapisan: 'Lapisan keamanan',
    tagline: 'Kamera tanpa titik buta, rekaman andal.',
  },
  {
    label: 'Pemeliharaan & IT Support',
    slug: 'maintenance',
    href: '/services/maintenance',
    kode: 'MT',
    lapisan: 'Lapisan operasional',
    tagline: 'Cegah gangguan sebelum terjadi.',
  },
  {
    label: 'Pengembangan Perangkat Lunak',
    slug: 'software',
    href: '/products/software',
    kode: 'SW',
    lapisan: 'Lapisan aplikasi',
    tagline: 'Dashboard dan sistem di atas infrastruktur.',
  },
] as const;

export type Service = (typeof services)[number];
