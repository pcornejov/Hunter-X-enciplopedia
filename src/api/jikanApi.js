// Jikan (https://jikan.moe) is an unofficial free MyAnimeList API. It requires no
// API key or registration, unlike the previous hxh-api provider, and has a long
// track record of uptime. Rate limit: ~60 requests/minute, no auth.
const BASE_URL = 'https://api.jikan.moe/v4';
const HXH_ANIME_ID = 11061; // Hunter x Hunter (2011)
const HXH_MANGA_ID = 26; // Hunter x Hunter (manga)
const TIMEOUT_MS = 15000;

const LOCAL_STORAGE_PREFIX = 'hunterpedia:jikan:';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // HxH (2011) data barely changes day to day

// Returns the full response body ({ data, pagination? }) so callers that need
// pagination metadata (like episodes) can see it; fetchJson below is the
// common case that only wants `data`.
async function fetchJsonBody(path) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${BASE_URL}${path}`, { signal: controller.signal });
    const body = await response.json().catch(() => null);

    if (!response.ok || !body) {
      throw new Error(body?.message || `Error ${response.status} al consultar la API`);
    }

    return body;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchJson(path) {
  const body = await fetchJsonBody(path);
  return body.data;
}

function readLocalCache(key) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null; // localStorage unavailable (private browsing, SSR, etc.)
  }
}

function writeLocalCache(key, data) {
  try {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // Storage full/unavailable — the in-memory cache still works for this session.
  }
}

// Wraps an async fetcher with two cache layers keyed by `key`:
// - An in-memory cache so repeated calls in the same session share one
//   in-flight/resolved request instead of firing duplicate network calls.
// - A localStorage cache (24h TTL) so a fresh page load doesn't have to
//   re-fetch data that barely changes, and so a Jikan outage falls back to
//   the last known-good response instead of an empty page.
function memoizedFetcher() {
  const cache = new Map();

  return (key, fetcher) => {
    if (cache.has(key)) return cache.get(key);

    const stored = readLocalCache(key);
    if (stored && Date.now() - stored.ts < CACHE_TTL_MS) {
      cache.set(key, Promise.resolve(stored.data));
      return cache.get(key);
    }

    const promise = fetcher()
      .then((data) => {
        writeLocalCache(key, data);
        return data;
      })
      .catch((err) => {
        cache.delete(key);
        if (stored) return stored.data; // serve stale data rather than fail outright
        throw err;
      });

    cache.set(key, promise);
    return promise;
  };
}

const getCached = memoizedFetcher();

// Single request that returns every character in the HxH (2011) anime, including
// image and role (Main/Supporting). Used to populate character cards/grids.
export function getAnimeCharacters() {
  return getCached('anime-characters', () => fetchJson(`/anime/${HXH_ANIME_ID}/characters`));
}

// Full detail for a single character: free-text "about" bio, voice actors
// across languages, and anime/manga appearances. One request per character,
// only called on the character detail page to stay within the rate limit.
export function getCharacterFull(malId) {
  return getCached(`character-full-${malId}`, () => fetchJson(`/characters/${malId}/full`));
}

// Extra gallery images for a single character, shown on the detail page.
export function getCharacterPictures(malId) {
  return getCached(`character-pictures-${malId}`, () => fetchJson(`/characters/${malId}/pictures`));
}

// General info about the HxH (2011) anime: synopsis, score, studio, trailer, etc.
export function getAnimeInfo() {
  return getCached('anime-info', () => fetchJson(`/anime/${HXH_ANIME_ID}`));
}

// Related entries (movies, OVAs, alternative versions, manga adaptation).
export function getAnimeRelations() {
  return getCached('anime-relations', () => fetchJson(`/anime/${HXH_ANIME_ID}/relations`));
}

// General info about the HxH manga: author, publication status, dates.
export function getMangaInfo() {
  return getCached('manga-info', () => fetchJson(`/manga/${HXH_MANGA_ID}`));
}

// Opening/ending theme songs.
export function getAnimeThemes() {
  return getCached('anime-themes', () => fetchJson(`/anime/${HXH_ANIME_ID}/themes`));
}

// Production staff (director, character design, music, etc.).
export function getAnimeStaff() {
  return getCached('anime-staff', () => fetchJson(`/anime/${HXH_ANIME_ID}/staff`));
}

// Key visual images for the anime (not character-specific).
export function getAnimePictures() {
  return getCached('anime-pictures', () => fetchJson(`/anime/${HXH_ANIME_ID}/pictures`));
}

// Audience stats: watching/completed/on_hold/dropped/plan_to_watch counts
// plus the 1-10 score distribution.
export function getAnimeStatistics() {
  return getCached('anime-statistics', () => fetchJson(`/anime/${HXH_ANIME_ID}/statistics`));
}

// All 148 episode titles/air dates, paginated 100-per-page by Jikan. Fetched
// once and cached like everything else above.
export function getAnimeEpisodes() {
  return getCached('anime-episodes', async () => {
    let page = 1;
    let all = [];

    while (true) {
      const body = await fetchJsonBody(`/anime/${HXH_ANIME_ID}/episodes?page=${page}`);
      all = all.concat(body.data);
      if (!body.pagination?.has_next_page) break;
      page += 1;
    }

    return all;
  });
}
