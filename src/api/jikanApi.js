// Jikan (https://jikan.moe) is an unofficial free MyAnimeList API. It requires no
// API key or registration, unlike the previous hxh-api provider, and has a long
// track record of uptime. Rate limit: ~60 requests/minute, no auth.
const BASE_URL = 'https://api.jikan.moe/v4';
const HXH_ANIME_ID = 11061; // Hunter x Hunter (2011)
const HXH_MANGA_ID = 26; // Hunter x Hunter (manga)
const TIMEOUT_MS = 15000;

async function fetchJson(path) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${BASE_URL}${path}`, { signal: controller.signal });
    const body = await response.json().catch(() => null);

    if (!response.ok || !body) {
      throw new Error(body?.message || `Error ${response.status} al consultar la API`);
    }

    return body.data;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Wraps fetchJson so repeated calls for the same key share one in-flight/resolved
// request instead of firing duplicate network calls (e.g. multiple components
// mounting the same page).
function memoizedFetcher() {
  const cache = new Map();
  return (key, path) => {
    if (!cache.has(key)) {
      const promise = fetchJson(path).catch((err) => {
        cache.delete(key);
        throw err;
      });
      cache.set(key, promise);
    }
    return cache.get(key);
  };
}

const getCached = memoizedFetcher();

// Single request that returns every character in the HxH (2011) anime, including
// image and role (Main/Supporting). Used to populate character cards/grids.
export function getAnimeCharacters() {
  return getCached('anime-characters', `/anime/${HXH_ANIME_ID}/characters`);
}

// Full detail for a single character: free-text "about" bio, voice actors
// across languages, and anime/manga appearances. One request per character,
// only called on the character detail page to stay within the rate limit.
export function getCharacterFull(malId) {
  return getCached(`character-full-${malId}`, `/characters/${malId}/full`);
}

// Extra gallery images for a single character, shown on the detail page.
export function getCharacterPictures(malId) {
  return getCached(`character-pictures-${malId}`, `/characters/${malId}/pictures`);
}

// General info about the HxH (2011) anime: synopsis, score, studio, trailer, etc.
export function getAnimeInfo() {
  return getCached('anime-info', `/anime/${HXH_ANIME_ID}`);
}

// Related entries (movies, OVAs, alternative versions, manga adaptation).
export function getAnimeRelations() {
  return getCached('anime-relations', `/anime/${HXH_ANIME_ID}/relations`);
}

// General info about the HxH manga: author, publication status, dates.
export function getMangaInfo() {
  return getCached('manga-info', `/manga/${HXH_MANGA_ID}`);
}
