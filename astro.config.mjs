import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://zsn.co.id',
  integrations: [mdx(), sitemap(), icon()],
  vite: { plugins: [tailwindcss()] },
  image: {
    // Foto lapangan besar — batasi lebar yang di-generate agar build cepat
    responsiveStyles: true,
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});
