import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  // TODO fase go-live: domain asli belum aktif. Ganti ke domain asli
  // dan set site.isProduction: true di src/config/site.ts saat rilis.
  // TODO: cek ulang URL Vercel sebenarnya (belum dikonfirmasi).
  site: 'https://compro-zsn.vercel.app',
  integrations: [mdx(), sitemap(), icon()],
  vite: { plugins: [tailwindcss()] },
  image: {
    // Foto lapangan besar — batasi lebar yang di-generate agar build cepat
    responsiveStyles: true,
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});
