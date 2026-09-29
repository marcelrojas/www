import { ui, defaultLang } from './ui';

export function useTranslations(locale: string | undefined) {
  const lang = (locale && locale in ui ? locale : defaultLang) as keyof typeof ui;
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}