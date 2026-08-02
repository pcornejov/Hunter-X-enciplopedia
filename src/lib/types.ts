/** Tipos que describen los JSON generados por scripts/fetch-data.mjs. */

export type MediaKind = 'anime' | 'manga';

export interface SeriesTitle {
  display: string;
  romaji: string | null;
  english: string | null;
  native: string | null;
}

export interface Series {
  anilistId: number;
  malId: number | null;
  slug: string;
  kind: MediaKind;
  format: string | null;
  formatLabel: string;
  status: string | null;
  title: SeriesTitle;
  synonyms: string[];
  description: string;
  summary: string;
  startDate: string | null;
  endDate: string | null;
  year: number | null;
  season: string | null;
  episodes: number | null;
  duration: number | null;
  chapters: number | null;
  volumes: number | null;
  source: string | null;
  genres: string[];
  averageScore: number | null;
  meanScore: number | null;
  popularity: number | null;
  favourites: number | null;
  coverImage: string | null;
  coverColor: string | null;
  bannerImage: string | null;
  trailer: { site: string; id: string; thumbnail: string | null } | null;
  studios: Array<{ id: number; name: string; url: string | null }>;
  tags: Array<{ name: string; rank: number; category: string | null }>;
  rankings: Array<{ rank: number; type: string; context: string; year: number | null }>;
  externalLinks: Array<{ site: string; url: string; type: string; language: string | null }>;
  siteUrl: string | null;
  relationLabel?: string;
}

export type CharacterRole = 'MAIN' | 'SUPPORTING' | 'BACKGROUND';

export interface VoiceActor {
  anilistId: number;
  name: string;
  nativeName: string | null;
  image: string | null;
  url: string | null;
}

export interface Character {
  anilistId: number;
  slug: string;
  name: string;
  nativeName: string | null;
  aliases: string[];
  spoilerAliases: string[];
  role: CharacterRole;
  gender: string | null;
  age: string | null;
  bloodType: string | null;
  birthday: { month: number; day: number } | null;
  favourites: number;
  image: string | null;
  attributes: Array<{ label: string; value: string }>;
  description: string;
  summary: string;
  spoilers: string[];
  voiceActors: VoiceActor[];
  siteUrl: string | null;
}

export interface StaffMember {
  anilistId: number;
  name: string;
  nativeName: string | null;
  role: string | null;
  occupations: string[];
  image: string | null;
  url: string | null;
}

export interface Episode {
  number: number;
  season: number | null;
  title: string;
  nativeTitle: string | null;
  synopsis: string;
  airDate: string | null;
  length: number | null;
  thumbnail: string | null;
}

export interface EpisodeSet {
  anilistId: number;
  kitsuId: string;
  label: string;
  slug: string;
  total: number;
  episodes: Episode[];
}

export interface DataMeta {
  fetchedAt: string;
  sources: Array<{ name: string; url: string; api: string; license: string }>;
  counts: Record<string, number>;
}

/** Contenido curado en espanol (no viene de las APIs). */
export interface Arc {
  slug: string;
  name: string;
  order: number;
  mangaChapters: string;
  animeEpisodes2011: string;
  tagline: string;
  summary: string;
  keyPoints: string[];
  characterSlugs: string[];
  color: string;
}

export interface NenType {
  slug: string;
  name: string;
  japanese: string;
  romaji: string;
  affinity: number;
  color: string;
  description: string;
  strengths: string;
  waterDivination: string;
  characterSlugs: string[];
}

export interface NenPrinciple {
  name: string;
  japanese: string;
  level: 'basico' | 'avanzado';
  description: string;
}

export interface Organization {
  slug: string;
  name: string;
  japanese: string | null;
  kind: string;
  description: string;
  facts: string[];
  characterSlugs: string[];
}

export interface GlossaryEntry {
  term: string;
  japanese: string | null;
  category: string;
  definition: string;
}
