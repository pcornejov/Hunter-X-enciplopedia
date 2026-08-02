#!/usr/bin/env node
/**
 * Valida los JSON generados por la ingesta ANTES de construir el sitio.
 * Si algo aqui falla, el build no deberia salir: preferimos romper en CI
 * a publicar una enciclopedia con fichas vacias o rutas duplicadas.
 *
 * Uso:  npm run validate:data
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'src', 'data', 'generated');

const errors = [];
const warnings = [];

function check(condition, message) {
  if (!condition) errors.push(message);
}

function warn(condition, message) {
  if (!condition) warnings.push(message);
}

async function loadJson(name) {
  const raw = await readFile(path.join(DATA_DIR, name), 'utf8');
  return JSON.parse(raw);
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const IMAGE_HOSTS = ['s4.anilist.co', 'media.kitsu.app', 'media.kitsu.io', 'img1.ak.crunchyroll.com'];

function isValidImage(url) {
  if (typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && IMAGE_HOSTS.includes(parsed.hostname);
  } catch {
    return false;
  }
}

function assertUniqueSlugs(items, label) {
  const seen = new Map();
  for (const item of items) {
    check(SLUG_PATTERN.test(item.slug ?? ''), `${label}: slug invalido "${item.slug}"`);
    if (seen.has(item.slug)) {
      errors.push(`${label}: slug duplicado "${item.slug}" (ids ${seen.get(item.slug)} y ${item.anilistId})`);
    }
    seen.set(item.slug, item.anilistId);
  }
}

async function main() {
  const [series, characters, staff, episodeSets, meta] = await Promise.all([
    loadJson('series.json'),
    loadJson('characters.json'),
    loadJson('staff.json'),
    loadJson('episodes.json'),
    loadJson('meta.json'),
  ]);

  // --- Series -------------------------------------------------------------
  check(Array.isArray(series) && series.length >= 8, `series.json: se esperaban >=8 obras, hay ${series.length}`);
  assertUniqueSlugs(series, 'series');
  for (const item of series) {
    const id = item.slug ?? item.anilistId;
    check(Number.isInteger(item.anilistId), `series ${id}: anilistId invalido`);
    check(Boolean(item.title?.display), `series ${id}: sin titulo`);
    check(['anime', 'manga'].includes(item.kind), `series ${id}: kind invalido "${item.kind}"`);
    check(isValidImage(item.coverImage), `series ${id}: portada invalida (${item.coverImage})`);
    warn(item.description.length > 80, `series ${id}: descripcion muy corta`);
  }
  check(
    series.some((s) => s.anilistId === 11061),
    'series.json: falta el anime principal de 2011 (id 11061)',
  );
  check(
    series.some((s) => s.kind === 'manga'),
    'series.json: falta el manga original',
  );

  // --- Personajes ---------------------------------------------------------
  check(characters.length >= 100, `characters.json: se esperaban >=100 personajes, hay ${characters.length}`);
  assertUniqueSlugs(characters, 'characters');
  const mainCast = characters.filter((c) => c.role === 'MAIN');
  check(mainCast.length >= 4, `characters.json: se esperaban >=4 protagonistas, hay ${mainCast.length}`);

  const essentials = ['Gon Freecss', 'Killua Zoldyck', 'Kurapika', 'Leorio Paladiknight', 'Hisoka', 'Chrollo Lucilfer'];
  for (const name of essentials) {
    check(
      characters.some((c) => c.name.toLowerCase().startsWith(name.split(' ')[0].toLowerCase())),
      `characters.json: falta un personaje clave (${name})`,
    );
  }

  for (const character of characters) {
    const id = character.slug ?? character.anilistId;
    check(Boolean(character.name), `personaje ${id}: sin nombre`);
    check(
      ['MAIN', 'SUPPORTING', 'BACKGROUND'].includes(character.role),
      `personaje ${id}: rol invalido "${character.role}"`,
    );
    check(Array.isArray(character.aliases), `personaje ${id}: aliases no es lista`);
    check(Array.isArray(character.spoilers), `personaje ${id}: spoilers no es lista`);
    if (character.image !== null) {
      check(isValidImage(character.image), `personaje ${id}: imagen en host no permitido (${character.image})`);
    }
    // El texto no debe conservar marcadores de spoiler sin procesar.
    check(!character.description.includes('~!'), `personaje ${id}: quedan marcadores de spoiler sin limpiar`);
    check(!/<[a-z]+>/i.test(character.description), `personaje ${id}: quedo HTML sin limpiar`);
  }

  const withImage = characters.filter((c) => c.image).length;
  warn(withImage / characters.length > 0.9, `solo ${withImage}/${characters.length} personajes tienen imagen`);

  const withDescription = characters.filter((c) => c.description.length > 60).length;
  warn(withDescription >= 100, `solo ${withDescription} personajes tienen ficha con texto util`);

  // --- Staff --------------------------------------------------------------
  check(staff.length >= 10, `staff.json: se esperaban >=10 entradas, hay ${staff.length}`);
  check(
    staff.some((s) => /director/i.test(s.role ?? '')),
    'staff.json: no se encontro ningun rol de direccion',
  );

  // --- Episodios ----------------------------------------------------------
  check(episodeSets.length >= 1, 'episodes.json: no hay ninguna serie con episodios');
  const main2011 = episodeSets.find((set) => set.anilistId === 11061);
  check(Boolean(main2011), 'episodes.json: faltan los episodios del anime de 2011');
  if (main2011) {
    check(main2011.total >= 148, `episodes.json: el anime de 2011 deberia tener 148 episodios, tiene ${main2011.total}`);
    const numbers = main2011.episodes.map((e) => e.number);
    check(new Set(numbers).size === numbers.length, 'episodes.json: hay numeros de episodio duplicados en 2011');
    for (let i = 1; i <= main2011.total; i += 1) {
      if (!numbers.includes(i)) {
        errors.push(`episodes.json: falta el episodio ${i} del anime de 2011`);
        break;
      }
    }
    const withSynopsis = main2011.episodes.filter((e) => e.synopsis.length > 40).length;
    warn(withSynopsis > main2011.total * 0.8, `solo ${withSynopsis}/${main2011.total} episodios traen sinopsis`);
  }

  // --- Metadatos ----------------------------------------------------------
  check(Boolean(meta.fetchedAt) && !Number.isNaN(Date.parse(meta.fetchedAt)), 'meta.json: fetchedAt invalido');
  check(Array.isArray(meta.sources) && meta.sources.length >= 1, 'meta.json: faltan las fuentes citadas');
  check(meta.counts?.characters === characters.length, 'meta.json: el conteo de personajes no coincide');
  check(meta.counts?.series === series.length, 'meta.json: el conteo de obras no coincide');

  // --- Reporte ------------------------------------------------------------
  console.log('Validacion de datos');
  console.log(`  obras:      ${series.length}`);
  console.log(`  personajes: ${characters.length} (${withImage} con imagen, ${mainCast.length} protagonistas)`);
  console.log(`  staff:      ${staff.length}`);
  console.log(`  episodios:  ${episodeSets.reduce((sum, s) => sum + s.total, 0)} en ${episodeSets.length} series`);
  console.log(`  ingesta:    ${meta.fetchedAt}`);

  for (const message of warnings) console.log(`  AVISO  ${message}`);
  for (const message of errors) console.error(`  ERROR  ${message}`);

  if (errors.length) {
    console.error(`\nValidacion fallida: ${errors.length} error(es).`);
    process.exit(1);
  }
  console.log(`\nDatos validos${warnings.length ? ` (${warnings.length} aviso(s))` : ''}.`);
}

main().catch((error) => {
  console.error('La validacion no pudo ejecutarse:', error);
  process.exit(1);
});
