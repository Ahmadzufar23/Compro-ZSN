/**
 * services.ts — SATU sumber kebenaran untuk daftar layanan.
 *
 * Nama, urutan, dan href di sini dipakai oleh ServiceGrid (homepage),
 * Footer, dan halaman /services, supaya ketiganya tidak pernah
 * menampilkan daftar yang berbeda. Deskripsi (ringkas) tetap diambil
 * dari content collection masing-masing (layanan/produk), bukan
 * disalin ke sini, supaya tidak melenceng dari konten sebenarnya.
 *
 * `featured` menandai 3 layanan utama yang tampil di homepage.
 * Footer dan halaman /services selalu merender kelima item ini
 * tanpa filter.
 */
export const services = [
  { label: 'Fiber Optic & FTTH', slug: 'fiber-optic', href: '/services/fiber-optic', icon: 'konektor', featured: true },
  { label: 'CCTV & Security', slug: 'cctv', href: '/services/cctv', icon: 'kamera', featured: true },
  { label: 'Network Infrastructure', slug: 'network', href: '/services/network', icon: 'patch-panel', featured: true },
  { label: 'Maintenance & IT Support', slug: 'maintenance', href: '/services/maintenance', icon: 'wrench', featured: false },
  { label: 'System Development', slug: 'software', href: '/products/software', icon: 'terminal', featured: false },
] as const;
