export const languages = { en: 'English', es: 'Español', ja: '日本語' } as const;
export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.about': 'About',
    'nav.showcase': 'Showcase',
    'nav.weblog': 'Weblog',
    'nav.services': 'Services',
    'nav.resources': 'Resources',
  },
  es: {
    'nav.about': 'Sobre mí',
    'nav.showcase': 'Portafolio',
    'nav.weblog': 'Bitácora',
    'nav.services': 'Servicios',
    'nav.resources': 'Recursos',
  },
  ja: {
    'nav.about': 'プロフィール',
    'nav.showcase': 'ショーケース',
    'nav.weblog': 'ブログ',
    'nav.services': 'サービス',
    'nav.resources': 'リソース',
  },
} as const;