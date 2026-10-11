export const kategoriLabel: Record<string, string> = {
  fiber: 'Fiber Optic',
  cctv: 'CCTV',
  network: 'Jaringan',
  maintenance: 'Pemeliharaan',
  software: 'Software',
};

export const kategoriLayanan: Record<string, { label: string; href: string }> = {
  fiber: { label: 'Fiber Optic & FTTH', href: '/services/fiber-optic' },
  cctv: { label: 'CCTV & Keamanan', href: '/services/cctv' },
  network: { label: 'Infrastruktur Jaringan', href: '/services/network' },
  maintenance: { label: 'Pemeliharaan & IT Support', href: '/services/maintenance' },
  software: { label: 'Pengembangan Perangkat Lunak', href: '/products/software' },
};

/** id koleksi berbentuk "en/proj-1-ftth" → slug "proj-1-ftth" */
export const projectSlug = (id: string) => id.replace(/^en\//, '');

/** "JAKARTA" → "Jakarta" */
export const lokasiLabel = (l: string) =>
  l.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
