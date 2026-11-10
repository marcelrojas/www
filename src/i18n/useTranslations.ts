import { ui, defaultLang, showDefaultLang } from './ui';

export type Locale = keyof typeof ui;
export type UIKey = keyof (typeof ui)[typeof defaultLang];

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in ui) return lang as Locale;
  return defaultLang;
}

export function useTranslations(locale: string | undefined) {
  const lang: Locale = locale && locale in ui ? (locale as Locale) : defaultLang;
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function useTranslatedPath(locale: string | undefined) {
  const lang: Locale = locale && locale in ui ? (locale as Locale) : defaultLang;
  return function translatePath(path: string, targetLang: Locale = lang): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    if (!showDefaultLang && targetLang === defaultLang) {
      return cleanPath;
    }
    return cleanPath === '/' ? `/${targetLang}` : `/${targetLang}${cleanPath}`;
  };
}