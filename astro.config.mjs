// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// El sitio se publica en GitHub Pages bajo la ruta del repositorio.
// Cambiar SITE/BASE aqui es lo unico necesario para mover el despliegue.
const SITE = 'https://pcornejov.github.io';
const BASE = '/Hunter-X-enciplopedia';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
});
