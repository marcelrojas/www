// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import vesper from './src/data/vesper.json';

// https://astro.build/config
export default defineConfig({
  site: 'https://marcelrojas.net',

  trailingSlash: 'never',

  output: 'hybrid',

  build: {
    format: 'file'
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      fallbackType: 'rewrite',
      prefixDefaultLocale: false
    },
    fallback: {
      es: "en"
    },
  },

  security: {
    checkOrigin: true
  },

  // Rendimiento: Configuración de Prefetch unificada
  prefetch: {
    defaultStrategy: 'viewport', // Carga enlaces cuando entran en pantalla
    prefetchAll: false, // Evita cargar todos los enlaces de la página de golpe
  },

  // Optimizaciones de compilación (Vite)
  vite: {
    build: {
      sourcemap: false, // Menor peso en build final
      cssCodeSplit: true, // Asegura que el CSS se divida por chunks
    },
  },

  devToolbar: {
    enabled: false
  },

  integrations: [
    mdx(),
    sitemap({
    // Opcional: Configurar el sitemap para respetar el 'trailingSlash: never'
    // Aunque el plugin suele leer la config de Astro automáticamente.
    }),
    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag'],
      },
    }),
  ],

  markdown: {
    shikiConfig: {
      theme: vesper,
    },
  },
});
