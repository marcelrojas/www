import { describe, it, expect } from 'vitest';
import { useTranslations } from './useTranslations';

describe('useTranslations hook', () => {
  it('returns translation for valid supported locale', () => {
    const tEs = useTranslations('es');
    expect(tEs('nav.about')).toBe('Sobre mí');
    expect(tEs('nav.showcase')).toBe('Portafolio');

    const tJa = useTranslations('ja');
    expect(tJa('nav.about')).toBe('プロフィール');
    expect(tJa('nav.resources')).toBe('リソース');

    const tEn = useTranslations('en');
    expect(tEn('nav.about')).toBe('About');
  });

  it('defaults to defaultLang ("en") when locale is undefined', () => {
    const t = useTranslations(undefined);
    expect(t('nav.about')).toBe('About');
    expect(t('nav.services')).toBe('Services');
  });

  it('defaults to defaultLang ("en") when locale is invalid or unsupported', () => {
    const tFr = useTranslations('fr');
    expect(tFr('nav.about')).toBe('About');

    const tEmpty = useTranslations('');
    expect(tEmpty('nav.about')).toBe('About');

    const tNumeric = useTranslations('123');
    expect(tNumeric('nav.about')).toBe('About');
  });

  it('returns correct value for all available keys in default locale', () => {
    const t = useTranslations('en');
    expect(t('nav.about')).toBe('About');
    expect(t('nav.showcase')).toBe('Showcase');
    expect(t('nav.weblog')).toBe('Weblog');
    expect(t('nav.services')).toBe('Services');
    expect(t('nav.resources')).toBe('Resources');
  });
});
