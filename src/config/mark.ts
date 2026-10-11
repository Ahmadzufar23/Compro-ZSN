/**
 * Geometri mark bundar ZSN di kanvas 680x680, lingkaran r=340 di tengah.
 * Diukur dari logo-bundar.png. Dipakai oleh ZMark.astro (SVG) dan
 * GlobeMark.astro (tekstur globe 3D di canvas).
 */
export const ZSN_MARK = {
  body: '0,0 680,0 680,298 250,598 465,170 0,268',
  voltLeft: '0,350 272,290 100,620 0,620',
  voltRight: '700,350 240,686 700,700',
} as const;
