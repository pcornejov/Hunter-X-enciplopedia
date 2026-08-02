#!/usr/bin/env node
/**
 * Valida el sitio ya construido en dist/.
 *
 * Comprueba lo que un build "verde" todavia puede tener roto: enlaces internos
 * que no apuntan a ningun fichero, paginas sin titulo o sin descripcion,
 * imagenes servidas desde hosts inesperados y ficheros de despliegue ausentes.
 *
 * Uso:  npm run validate:build
 */

import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const BASE = '/Hunter-X-enciplopedia';

const ALLOWED_IMAGE_HOSTS = new Set(['s4.anilist.co', 'media.kitsu.app', 'media.kitsu.io']);

const errors = [];
const warnings = [];

/** Recorre dist/ y devuelve todos los .html encontrados. */
async function collectHtmlFiles(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await collectHtmlFiles(full, acc);
    else if (entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

/** Traduce una URL interna a la ruta del fichero que deberia servirla. */
function resolveInternal(href) {
  const withoutHash = href.split('#')[0].split('?')[0];
  if (!withoutHash) return null;
  const relative = withoutHash.startsWith(BASE) ? withoutHash.slice(BASE.length) : withoutHash;
  const clean = relative.replace(/^\/+/, '');
  if (clean === '') return path.join(DIST, 'index.html');
  if (path.extname(clean)) return path.join(DIST, clean);
  return path.join(DIST, clean, 'index.html');
}

function attr(html, regex) {
  const match = html.match(regex);
  return match ? match[1] : null;
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('No existe dist/. Ejecuta `npm run build` antes de validar.');
    process.exit(1);
  }

  const files = await collectHtmlFiles(DIST);
  if (files.length < 10) errors.push(`dist/ solo tiene ${files.length} paginas; se esperaban muchas mas`);

  const linkTargets = new Map();
  let totalLinks = 0;
  let totalImages = 0;

  for (const file of files) {
    const rel = path.relative(DIST, file);
    const html = await readFile(file, 'utf8');

    // --- Metadatos minimos ------------------------------------------------
    const title = attr(html, /<title>([^<]*)<\/title>/);
    if (!title || title.trim().length < 5) errors.push(`${rel}: sin <title> util`);

    const description = attr(html, /<meta name="description" content="([^"]*)"/);
    if (!description || description.trim().length < 20) {
      errors.push(`${rel}: sin meta description util`);
    }

    if (!/<h1[\s>]/.test(html)) errors.push(`${rel}: no tiene ningun <h1>`);
    if (!/lang="es"/.test(html)) errors.push(`${rel}: falta lang="es" en <html>`);

    const bodySize = (await stat(file)).size;
    if (bodySize < 1500) warnings.push(`${rel}: pagina sospechosamente pequena (${bodySize} bytes)`);

    // --- Enlaces ----------------------------------------------------------
    for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      const href = match[1];
      totalLinks += 1;
      if (/^(https?:|mailto:|tel:|#|javascript:)/.test(href)) continue;
      const target = resolveInternal(href);
      if (!target) continue;
      if (!linkTargets.has(target)) linkTargets.set(target, new Set());
      linkTargets.get(target).add(rel);

      if (!href.startsWith(BASE)) {
        errors.push(`${rel}: enlace interno sin el base path -> "${href}"`);
      }
    }

    // --- Imagenes ---------------------------------------------------------
    for (const match of html.matchAll(/<img\b[^>]*>/g)) {
      const tag = match[0];
      totalImages += 1;
      const src = attr(tag, /src="([^"]+)"/);
      if (!src) {
        errors.push(`${rel}: <img> sin src`);
        continue;
      }
      if (src.startsWith('http')) {
        const host = new URL(src).hostname;
        if (!ALLOWED_IMAGE_HOSTS.has(host)) {
          errors.push(`${rel}: imagen desde host no permitido "${host}"`);
        }
        if (!src.startsWith('https://')) errors.push(`${rel}: imagen servida por http -> ${src}`);
      }
      if (!/\balt="/.test(tag)) errors.push(`${rel}: <img> sin atributo alt -> ${src}`);
    }
  }

  // --- Destinos de enlaces internos --------------------------------------
  for (const [target, sources] of linkTargets) {
    if (!existsSync(target)) {
      const from = [...sources].slice(0, 3).join(', ');
      errors.push(`enlace roto -> ${path.relative(DIST, target)} (desde ${from})`);
    }
  }

  // --- Ficheros de despliegue --------------------------------------------
  for (const required of ['index.html', '404.html', 'sitemap-index.xml', 'robots.txt', '.nojekyll']) {
    if (!existsSync(path.join(DIST, required))) errors.push(`falta dist/${required}`);
  }

  // --- Reporte ------------------------------------------------------------
  console.log('Validacion del build');
  console.log(`  paginas:  ${files.length}`);
  console.log(`  enlaces:  ${totalLinks} (${linkTargets.size} destinos internos distintos)`);
  console.log(`  imagenes: ${totalImages}`);

  const uniqueWarnings = [...new Set(warnings)];
  const uniqueErrors = [...new Set(errors)];

  for (const message of uniqueWarnings.slice(0, 15)) console.log(`  AVISO  ${message}`);
  if (uniqueWarnings.length > 15) console.log(`  AVISO  ...y ${uniqueWarnings.length - 15} aviso(s) mas`);
  for (const message of uniqueErrors.slice(0, 30)) console.error(`  ERROR  ${message}`);
  if (uniqueErrors.length > 30) console.error(`  ERROR  ...y ${uniqueErrors.length - 30} error(es) mas`);

  if (uniqueErrors.length) {
    console.error(`\nBuild invalido: ${uniqueErrors.length} error(es).`);
    process.exit(1);
  }
  console.log(`\nBuild valido${uniqueWarnings.length ? ` (${uniqueWarnings.length} aviso(s))` : ''}.`);
}

main().catch((error) => {
  console.error('La validacion del build no pudo ejecutarse:', error);
  process.exit(1);
});
