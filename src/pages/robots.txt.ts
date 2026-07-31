import type { APIRoute } from 'astro';
import { site as siteConfig } from '@/config/site';

/**
 * robots.txt dinamis — isinya bergantung pada site.isProduction.
 * Selama domain asli belum aktif, situs WAJIB Disallow total supaya
 * Google tidak mengindeks URL Vercel sementara.
 */
export const GET: APIRoute = ({ site }) => {
  const body = siteConfig.isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).toString()}\n`
    : `User-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
