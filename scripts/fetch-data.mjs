#!/usr/bin/env node
/**
 * Ingesta de datos publicos de Hunter x Hunter.
 *
 * Fuentes:
 *   - AniList (GraphQL, https://graphql.anilist.co): series, personajes, staff.
 *   - Kitsu   (JSON:API, https://kitsu.io/api/edge):  episodios con sinopsis.
 *
 * El resultado se versiona en src/data/generated/*.json para que el build de
 * GitHub Pages sea 100% estatico y reproducible aunque las APIs esten caidas.
 *
 * Uso:  npm run fetch:data
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { fetchWithRetry, graphql, log, sleep } from './lib/http.mjs';
import { cleanMarkdown, extractAttributes, slugify, splitSpoilers, truncate } from './lib/text.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'src', 'data', 'generated');

const ANILIST = 'https://graphql.anilist.co';
const KITSU = 'https://kitsu.io/api/edge';

/** Anime principal: HUNTER×HUNTER (2011). Punto de entrada de la franquicia. */
const ROOT_ANIME_ID = 11061;
/** Manga original de Yoshihiro Togashi. */
const ROOT_MANGA_ID = 30026;

/** Cuantos personajes traer como maximo (AniList tope la lista en 500). */
const MAX_CHARACTERS = 500;
const CHARACTERS_PER_PAGE = 25;

/** Series de Kitsu de las que queremos la lista de episodios. */
const KITSU_EPISODE_SOURCES = [
  { slug: 'hunter-x-hunter-2011', anilistId: 11061, label: 'HUNTER×HUNTER (2011)' },
  { slug: 'hunter-x-hunter', anilistId: 136, label: 'HUNTER×HUNTER (1999)' },
];

/** Pausa entre llamadas para no pegarle al limite de tasa de AniList. */
const THROTTLE_MS = 750;

// ---------------------------------------------------------------------------
// Consultas GraphQL
// ---------------------------------------------------------------------------

const MEDIA_FIELDS = `
  id
  idMal
  type
  format
  status
  description(asHtml: false)
  startDate { year month day }
  endDate { year month day }
  season
  seasonYear
  episodes
  duration
  chapters
  volumes
  source
  countryOfOrigin
  genres
  synonyms
  averageScore
  meanScore
  popularity
  favourites
  siteUrl
  title { romaji english native }
  coverImage { extraLarge large color }
  bannerImage
  trailer { id site thumbnail }
  studios(isMain: true) { nodes { id name siteUrl } }
  tags { name rank isMediaSpoiler category }
  externalLinks { site url type language }
  rankings { rank type context year allTime }
`;

const QUERY_ROOT = `query Root($animeId: Int!, $mangaId: Int!) {
  anime: Media(id: $animeId) {
    ${MEDIA_FIELDS}
    relations { edges { relationType node { id type format title { romaji english } } } }
  }
  manga: Media(id: $mangaId) {
    ${MEDIA_FIELDS}
    relations { edges { relationType node { id type format title { romaji english } } } }
  }
}`;

const QUERY_MEDIA = `query One($id: Int!) {
  Media(id: $id) { ${MEDIA_FIELDS} }
}`;

const QUERY_CHARACTERS = `query Chars($id: Int!, $page: Int!, $perPage: Int!) {
  Media(id: $id) {
    characters(page: $page, perPage: $perPage, sort: [ROLE, FAVOURITES_DESC]) {
      pageInfo { total currentPage lastPage hasNextPage }
      edges {
        role
        voiceActors(language: JAPANESE, sort: [RELEVANCE]) {
          id
          name { full native }
          image { large }
          siteUrl
        }
        node {
          id
          name { full native alternative alternativeSpoiler }
          image { large }
          gender
          age
          bloodType
          dateOfBirth { year month day }
          favourites
          siteUrl
          description(asHtml: false)
        }
      }
    }
  }
}`;

const QUERY_STAFF = `query Staff($id: Int!, $page: Int!) {
  Media(id: $id) {
    staff(page: $page, perPage: 25, sort: [RELEVANCE]) {
      pageInfo { hasNextPage }
      edges {
        role
        node {
          id
          name { full native }
          image { large }
          primaryOccupations
          siteUrl
        }
      }
    }
  }
}`;

// ---------------------------------------------------------------------------
// Normalizadores
// ---------------------------------------------------------------------------

function pickTitle(title) {
  return title?.english || title?.romaji || title?.native || 'Sin titulo';
}

function formatDate(date) {
  if (!date?.year) return null;
  const parts = [String(date.year)];
  if (date.month) parts.push(String(date.month).padStart(2, '0'));
  if (date.day) parts.push(String(date.day).padStart(2, '0'));
  return parts.join('-');
}

const FORMAT_LABELS = {
  TV: 'Serie de TV',
  TV_SHORT: 'Serie corta',
  MOVIE: 'Pelicula',
  SPECIAL: 'Especial',
  OVA: 'OVA',
  ONA: 'ONA',
  MUSIC: 'Video musical',
  MANGA: 'Manga',
  NOVEL: 'Novela ligera',
  ONE_SHOT: 'One-shot',
};

const RELATION_LABELS = {
  ADAPTATION: 'Adaptacion',
  PREQUEL: 'Precuela',
  SEQUEL: 'Secuela',
  PARENT: 'Obra principal',
  SIDE_STORY: 'Historia paralela',
  ALTERNATIVE: 'Version alternativa',
  SPIN_OFF: 'Spin-off',
  SUMMARY: 'Resumen',
  CHARACTER: 'Comparte personajes',
  OTHER: 'Relacionado',
  SOURCE: 'Obra original',
};

/**
 * Asigna slugs legibles y unicos: primero el titulo a secas y, solo si choca
 * con otro (el anime del 99 y el del 2011 comparten titulo), se desambigua.
 */
function assignSeriesSlugs(seriesList) {
  const taken = new Map();
  for (const series of seriesList) {
    const base = slugify(series.title.display) || `obra-${series.anilistId}`;
    let slug = base;
    if (taken.has(slug)) slug = slugify(`${base}-${series.year ?? series.kind}`);
    if (taken.has(slug)) slug = slugify(`${base}-${series.format ?? ''}-${series.year ?? ''}`);
    if (taken.has(slug)) slug = `${base}-${series.anilistId}`;
    taken.set(slug, series.anilistId);
    series.slug = slug;
  }
  return seriesList;
}

function normalizeMedia(media) {
  const title = pickTitle(media.title);
  const startYear = media.startDate?.year ?? null;
  return {
    anilistId: media.id,
    malId: media.idMal ?? null,
    // Se sobrescribe en assignSeriesSlugs una vez conocemos toda la franquicia.
    slug: slugify(title),
    kind: media.type === 'MANGA' ? 'manga' : 'anime',
    format: media.format ?? null,
    formatLabel: FORMAT_LABELS[media.format] ?? media.format ?? 'Obra',
    status: media.status ?? null,
    title: {
      display: title,
      romaji: media.title?.romaji ?? null,
      english: media.title?.english ?? null,
      native: media.title?.native ?? null,
    },
    synonyms: (media.synonyms ?? []).slice(0, 6),
    description: cleanMarkdown(media.description),
    summary: truncate(cleanMarkdown(media.description), 260),
    startDate: formatDate(media.startDate),
    endDate: formatDate(media.endDate),
    year: startYear,
    season: media.season ?? null,
    episodes: media.episodes ?? null,
    duration: media.duration ?? null,
    chapters: media.chapters ?? null,
    volumes: media.volumes ?? null,
    source: media.source ?? null,
    genres: media.genres ?? [],
    averageScore: media.averageScore ?? null,
    meanScore: media.meanScore ?? null,
    popularity: media.popularity ?? null,
    favourites: media.favourites ?? null,
    coverImage: media.coverImage?.extraLarge ?? media.coverImage?.large ?? null,
    coverColor: media.coverImage?.color ?? null,
    bannerImage: media.bannerImage ?? null,
    trailer:
      media.trailer?.site === 'youtube' && media.trailer?.id
        ? { site: 'youtube', id: media.trailer.id, thumbnail: media.trailer.thumbnail ?? null }
        : null,
    studios: (media.studios?.nodes ?? []).map((s) => ({ id: s.id, name: s.name, url: s.siteUrl })),
    tags: (media.tags ?? [])
      .filter((t) => !t.isMediaSpoiler && t.rank >= 40)
      .slice(0, 12)
      .map((t) => ({ name: t.name, rank: t.rank, category: t.category ?? null })),
    rankings: (media.rankings ?? [])
      .filter((r) => r.allTime)
      .slice(0, 6)
      .map((r) => ({ rank: r.rank, type: r.type, context: r.context, year: r.year ?? null })),
    externalLinks: (media.externalLinks ?? [])
      .filter((l) => l.type === 'INFO' || l.type === 'STREAMING')
      .slice(0, 10)
      .map((l) => ({ site: l.site, url: l.url, type: l.type, language: l.language ?? null })),
    siteUrl: media.siteUrl ?? null,
  };
}

function normalizeCharacter(edge) {
  const node = edge.node;
  const rawDescription = node.description ?? '';
  const { text, spoilers } = splitSpoilers(rawDescription);
  const { attributes, rest } = extractAttributes(text);

  const fullName = node.name?.full?.trim() || `Personaje ${node.id}`;
  const image = node.image?.large ?? null;
  const isPlaceholderImage = !image || image.includes('default.jpg');

  return {
    anilistId: node.id,
    slug: slugify(fullName) || `personaje-${node.id}`,
    name: fullName,
    nativeName: node.name?.native ?? null,
    aliases: (node.name?.alternative ?? []).map((a) => a.trim()).filter(Boolean).slice(0, 8),
    spoilerAliases: (node.name?.alternativeSpoiler ?? []).map((a) => a.trim()).filter(Boolean).slice(0, 6),
    role: edge.role ?? 'BACKGROUND',
    gender: node.gender ?? null,
    age: node.age ?? null,
    bloodType: node.bloodType ?? null,
    birthday:
      node.dateOfBirth?.month && node.dateOfBirth?.day
        ? { month: node.dateOfBirth.month, day: node.dateOfBirth.day }
        : null,
    favourites: node.favourites ?? 0,
    image: isPlaceholderImage ? null : image,
    attributes,
    description: rest,
    summary: truncate(rest, 200),
    spoilers,
    voiceActors: (edge.voiceActors ?? []).slice(0, 2).map((va) => ({
      anilistId: va.id,
      name: va.name?.full ?? 'Desconocido',
      nativeName: va.name?.native ?? null,
      image: va.image?.large ?? null,
      url: va.siteUrl ?? null,
    })),
    siteUrl: node.siteUrl ?? null,
  };
}

function normalizeStaff(edge) {
  return {
    anilistId: edge.node.id,
    name: edge.node.name?.full ?? 'Desconocido',
    nativeName: edge.node.name?.native ?? null,
    role: edge.role ?? null,
    occupations: (edge.node.primaryOccupations ?? []).slice(0, 3),
    image: edge.node.image?.large ?? null,
    url: edge.node.siteUrl ?? null,
  };
}

// ---------------------------------------------------------------------------
// Pipeline
// ---------------------------------------------------------------------------

async function fetchFranchise() {
  log('anilist', 'consultando obra raiz (anime 2011 + manga)');
  const data = await graphql(ANILIST, QUERY_ROOT, { animeId: ROOT_ANIME_ID, mangaId: ROOT_MANGA_ID }, 'anilist:root');

  const anime = data.anime;
  const manga = data.manga;
  const collected = new Map([
    [anime.id, normalizeMedia(anime)],
    [manga.id, normalizeMedia(manga)],
  ]);

  // Descubrimos el resto de la franquicia siguiendo las relaciones y filtrando
  // por titulo, para no arrastrar obras que solo comparten un autor.
  const relationEdges = [...(anime.relations?.edges ?? []), ...(manga.relations?.edges ?? [])];
  const relatedIds = new Map();
  for (const edge of relationEdges) {
    const node = edge.node;
    const title = `${node.title?.romaji ?? ''} ${node.title?.english ?? ''}`.toLowerCase();
    const belongs = title.includes('hunter×hunter') || title.includes('hunter x hunter');
    if (!belongs || collected.has(node.id)) continue;
    relatedIds.set(node.id, RELATION_LABELS[edge.relationType] ?? 'Relacionado');
  }

  log('anilist', `franquicia detectada: ${relatedIds.size} obras relacionadas`);
  for (const [id, relationLabel] of relatedIds) {
    await sleep(THROTTLE_MS);
    const one = await graphql(ANILIST, QUERY_MEDIA, { id }, `anilist:media:${id}`);
    const normalized = normalizeMedia(one.Media);
    normalized.relationLabel = relationLabel;
    collected.set(id, normalized);
    log('anilist', `  + ${normalized.title.display} (${normalized.formatLabel})`);
  }

  const series = [...collected.values()].sort((a, b) => {
    if (a.anilistId === ROOT_ANIME_ID) return -1;
    if (b.anilistId === ROOT_ANIME_ID) return 1;
    return (b.popularity ?? 0) - (a.popularity ?? 0);
  });

  return assignSeriesSlugs(series);
}

async function fetchCharacters() {
  const results = [];
  const seen = new Set();
  const totalPages = Math.ceil(MAX_CHARACTERS / CHARACTERS_PER_PAGE);

  for (let page = 1; page <= totalPages; page += 1) {
    const data = await graphql(
      ANILIST,
      QUERY_CHARACTERS,
      { id: ROOT_ANIME_ID, page, perPage: CHARACTERS_PER_PAGE },
      `anilist:characters:p${page}`,
    );
    const block = data.Media?.characters;
    if (!block) break;

    for (const edge of block.edges ?? []) {
      if (seen.has(edge.node.id)) continue;
      seen.add(edge.node.id);
      results.push(normalizeCharacter(edge));
    }

    log('anilist', `personajes pagina ${page}/${block.pageInfo?.lastPage ?? '?'} -> ${results.length} acumulados`);
    if (!block.pageInfo?.hasNextPage) break;
    await sleep(THROTTLE_MS);
  }

  // Deduplicamos slugs (hay homonimos entre personajes menores).
  const slugCount = new Map();
  for (const character of results) {
    const count = slugCount.get(character.slug) ?? 0;
    slugCount.set(character.slug, count + 1);
    if (count > 0) character.slug = `${character.slug}-${character.anilistId}`;
  }

  return results;
}

async function fetchStaff() {
  const results = [];
  for (let page = 1; page <= 2; page += 1) {
    await sleep(THROTTLE_MS);
    const data = await graphql(ANILIST, QUERY_STAFF, { id: ROOT_ANIME_ID, page }, `anilist:staff:p${page}`);
    const block = data.Media?.staff;
    if (!block) break;
    for (const edge of block.edges ?? []) results.push(normalizeStaff(edge));
    if (!block.pageInfo?.hasNextPage) break;
  }
  log('anilist', `staff: ${results.length} entradas`);
  return results;
}

async function fetchKitsuEpisodes(source) {
  const lookup = await fetchWithRetry(
    `${KITSU}/anime?filter%5Bslug%5D=${encodeURIComponent(source.slug)}`,
    { headers: { Accept: 'application/vnd.api+json' } },
    { label: `kitsu:lookup:${source.slug}` },
  );
  const lookupJson = await lookup.json();
  const kitsuId = lookupJson.data?.[0]?.id;
  if (!kitsuId) {
    log('kitsu', `sin resultados para ${source.slug}, se omite`);
    return null;
  }

  const episodes = [];
  const limit = 20;
  for (let offset = 0; offset < 400; offset += limit) {
    const url = `${KITSU}/anime/${kitsuId}/episodes?page%5Blimit%5D=${limit}&page%5Boffset%5D=${offset}&sort=number`;
    const response = await fetchWithRetry(url, { headers: { Accept: 'application/vnd.api+json' } }, {
      label: `kitsu:episodes:${source.slug}:${offset}`,
    });
    const json = await response.json();
    const batch = json.data ?? [];
    for (const item of batch) {
      const a = item.attributes ?? {};
      const number = a.number ?? a.relativeNumber;
      if (!number) continue;
      episodes.push({
        number,
        season: a.seasonNumber ?? null,
        title:
          a.canonicalTitle ||
          a.titles?.en ||
          a.titles?.en_jp ||
          a.titles?.en_us ||
          `Episodio ${number}`,
        nativeTitle: a.titles?.ja_jp ?? null,
        synopsis: cleanMarkdown(a.synopsis ?? a.description ?? ''),
        airDate: a.airdate ?? null,
        length: a.length ?? null,
        thumbnail: a.thumbnail?.original ?? null,
      });
    }
    if (batch.length < limit) break;
    await sleep(300);
  }

  episodes.sort((a, b) => a.number - b.number);
  log('kitsu', `${source.label}: ${episodes.length} episodios`);
  return {
    anilistId: source.anilistId,
    kitsuId,
    label: source.label,
    slug: source.slug,
    total: episodes.length,
    episodes,
  };
}

async function writeJson(filename, data) {
  const target = path.join(OUT_DIR, filename);
  await writeFile(target, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  const bytes = Buffer.byteLength(JSON.stringify(data));
  log('write', `${filename} (${(bytes / 1024).toFixed(1)} kB)`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const series = await fetchFranchise();
  await writeJson('series.json', series);

  await sleep(THROTTLE_MS);
  const characters = await fetchCharacters();
  await writeJson('characters.json', characters);

  const staff = await fetchStaff();
  await writeJson('staff.json', staff);

  const episodeSets = [];
  for (const source of KITSU_EPISODE_SOURCES) {
    try {
      const set = await fetchKitsuEpisodes(source);
      if (set) episodeSets.push(set);
    } catch (error) {
      // Kitsu es una fuente secundaria: si falla, seguimos sin episodios.
      log('kitsu', `error con ${source.slug}: ${error.message}`);
    }
  }
  await writeJson('episodes.json', episodeSets);

  const meta = {
    fetchedAt: new Date().toISOString(),
    sources: [
      { name: 'AniList', url: 'https://anilist.co', api: ANILIST, license: 'Datos comunitarios de AniList' },
      { name: 'Kitsu', url: 'https://kitsu.app', api: KITSU, license: 'Datos comunitarios de Kitsu' },
    ],
    counts: {
      series: series.length,
      characters: characters.length,
      charactersWithImage: characters.filter((c) => c.image).length,
      staff: staff.length,
      episodeSets: episodeSets.length,
      episodes: episodeSets.reduce((sum, set) => sum + set.total, 0),
    },
  };
  await writeJson('meta.json', meta);

  log('done', `ingesta completa: ${JSON.stringify(meta.counts)}`);
}

main().catch((error) => {
  console.error('\nLa ingesta fallo:', error);
  process.exitCode = 1;
});
