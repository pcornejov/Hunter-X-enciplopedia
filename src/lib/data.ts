/**
 * Punto unico de acceso a los datos del sitio.
 *
 * Ademas de exponer los JSON tipados, aqui se valida la integridad referencial
 * entre el contenido curado en espanol y los datos descargados de las APIs.
 * Si un arco apunta a un personaje que ya no existe, el build falla en vez de
 * publicar una pagina con enlaces rotos.
 */

import seriesJson from '~/data/generated/series.json';
import charactersJson from '~/data/generated/characters.json';
import staffJson from '~/data/generated/staff.json';
import episodesJson from '~/data/generated/episodes.json';
import metaJson from '~/data/generated/meta.json';

import { arcos } from '~/data/curated/arcos';
import { nenTypes } from '~/data/curated/nen';
import { organizaciones } from '~/data/curated/organizaciones';
import { perfiles, perfilesBySlug, type CharacterProfile } from '~/data/curated/personajes-es';

import type { Character, DataMeta, EpisodeSet, Series, StaffMember } from './types';

export const allSeries = seriesJson as Series[];
export const allCharacters = charactersJson as Character[];
export const allStaff = staffJson as StaffMember[];
export const allEpisodeSets = episodesJson as EpisodeSet[];
export const dataMeta = metaJson as DataMeta;

export const seriesBySlug = new Map(allSeries.map((item) => [item.slug, item]));
export const charactersBySlug = new Map(allCharacters.map((item) => [item.slug, item]));

/** El anime de 2011 es la obra de referencia en todo el sitio. */
export const mainAnime = allSeries.find((item) => item.anilistId === 11061) ?? allSeries[0]!;
export const mainManga = allSeries.find((item) => item.kind === 'manga') ?? null;

export const animeSeries = allSeries.filter((item) => item.kind === 'anime');
export const mangaSeries = allSeries.filter((item) => item.kind === 'manga');

/** Reparto principal, ordenado por popularidad en AniList. */
export const mainCast = allCharacters
  .filter((character) => character.role === 'MAIN')
  .sort((a, b) => b.favourites - a.favourites);

/** Personajes con ficha util, que son los que merecen pagina propia. */
export const notableCharacters = allCharacters
  .filter((character) => character.image !== null)
  .sort((a, b) => b.favourites - a.favourites);

// ---------------------------------------------------------------------------
// Integridad referencial
// ---------------------------------------------------------------------------

interface BrokenReference {
  source: string;
  field: string;
  slug: string;
}

function collectBrokenReferences(): BrokenReference[] {
  const broken: BrokenReference[] = [];
  const characterSlugs = new Set(allCharacters.map((c) => c.slug));
  const nenSlugs = new Set(nenTypes.map((n) => n.slug));
  const orgSlugs = new Set(organizaciones.map((o) => o.slug));
  const arcSlugs = new Set(arcos.map((a) => a.slug));

  const checkAll = (source: string, field: string, slugs: string[] | undefined, valid: Set<string>) => {
    for (const slug of slugs ?? []) {
      if (!valid.has(slug)) broken.push({ source, field, slug });
    }
  };

  for (const arc of arcos) checkAll(`arco:${arc.slug}`, 'characterSlugs', arc.characterSlugs, characterSlugs);
  for (const type of nenTypes) checkAll(`nen:${type.slug}`, 'characterSlugs', type.characterSlugs, characterSlugs);
  for (const org of organizaciones) checkAll(`org:${org.slug}`, 'characterSlugs', org.characterSlugs, characterSlugs);

  for (const perfil of perfiles) {
    if (!characterSlugs.has(perfil.slug)) {
      broken.push({ source: `perfil:${perfil.slug}`, field: 'slug', slug: perfil.slug });
    }
    if (perfil.nenType && !nenSlugs.has(perfil.nenType)) {
      broken.push({ source: `perfil:${perfil.slug}`, field: 'nenType', slug: perfil.nenType });
    }
    checkAll(`perfil:${perfil.slug}`, 'organizationSlugs', perfil.organizationSlugs, orgSlugs);
    checkAll(`perfil:${perfil.slug}`, 'arcSlugs', perfil.arcSlugs, arcSlugs);
  }

  return broken;
}

const brokenReferences = collectBrokenReferences();
if (brokenReferences.length > 0) {
  const detail = brokenReferences
    .map((ref) => `  - ${ref.source} -> ${ref.field}: "${ref.slug}" no existe`)
    .join('\n');
  throw new Error(
    `Integridad referencial rota (${brokenReferences.length} referencia(s)).\n${detail}\n` +
      'Corrige los slugs en src/data/curated/ o vuelve a ejecutar `npm run fetch:data`.',
  );
}

// ---------------------------------------------------------------------------
// Consultas
// ---------------------------------------------------------------------------

/** Resuelve una lista de slugs a personajes, descartando los desconocidos. */
export function getCharacters(slugs: string[]): Character[] {
  return slugs.map((slug) => charactersBySlug.get(slug)).filter((c): c is Character => Boolean(c));
}

/** Ficha en espanol de un personaje, si la hemos escrito. */
export function getProfile(slug: string): CharacterProfile | null {
  return perfilesBySlug.get(slug) ?? null;
}

/** Arcos en los que aparece un personaje, segun el contenido curado. */
export function getArcsForCharacter(slug: string) {
  return arcos.filter((arc) => arc.characterSlugs.includes(slug));
}

/** Organizaciones a las que pertenece un personaje. */
export function getOrganizationsForCharacter(slug: string) {
  return organizaciones.filter((org) => org.characterSlugs.includes(slug));
}

/** Categoria de Nen atribuida a un personaje (perfil curado o tablas de Nen). */
export function getNenTypeForCharacter(slug: string) {
  const profile = perfilesBySlug.get(slug);
  if (profile?.nenType) return nenTypes.find((type) => type.slug === profile.nenType) ?? null;
  return nenTypes.find((type) => type.characterSlugs.includes(slug)) ?? null;
}

/** Episodios de una obra concreta, si Kitsu los tiene. */
export function getEpisodeSet(anilistId: number): EpisodeSet | null {
  return allEpisodeSets.find((set) => set.anilistId === anilistId) ?? null;
}

/** Reparto asociado a una obra: usamos el del anime de 2011 como canon. */
export function getSeriesRelations(series: Series): Series[] {
  return allSeries.filter((item) => item.anilistId !== series.anilistId).slice(0, 6);
}

/** Formatea la fecha de ingesta para mostrarla en el pie de pagina. */
export function formatFetchedAt(): string {
  const date = new Date(dataMeta.fetchedAt);
  return new Intl.DateTimeFormat('es', { dateStyle: 'long', timeStyle: 'short', timeZone: 'UTC' }).format(date);
}
