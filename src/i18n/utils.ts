import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getLocalizedPathname(url: URL, targetLang: string) {
  const currentLang = getLangFromUrl(url);
  const segments = url.pathname.split('/');
  
  if (currentLang === defaultLang && targetLang !== defaultLang) {
    segments.splice(1, 0, targetLang);
  } else if (currentLang !== defaultLang && targetLang === defaultLang) {
    segments.splice(1, 1);
  } else if (currentLang !== defaultLang && targetLang !== defaultLang) {
    segments[1] = targetLang;
  }
  
  return segments.join('/') || '/';
}
