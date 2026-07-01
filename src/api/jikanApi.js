// Jikan (https://jikan.moe) is an unofficial free MyAnimeList API. It requires no
// API key or registration, unlike the previous hxh-api provider, and has a long
// track record of uptime. Rate limit: ~60 requests/minute, no auth.
const BASE_URL = 'https://api.jikan.moe/v4';
const HXH_ANIME_ID = 11061; // Hunter x Hunter (2011)
const TIMEOUT_MS = 15000;

let animeCharactersPromise = null;
const characterDetailPromises = new Map();

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

// Single request that returns every character in the HxH (2011) anime, including
// image and role (Main/Supporting). Used to populate character cards/grids.
export function getAnimeCharacters() {
  if (!animeCharactersPromise) {
    animeCharactersPromise = fetchJson(`/anime/${HXH_ANIME_ID}/characters`).catch((err) => {
      animeCharactersPromise = null;
      throw err;
    });
  }
  return animeCharactersPromise;
}

// Fetches full detail (including the free-text "about" bio) for a single
// character by MyAnimeList id. Only called on the character detail page to
// stay within Jikan's rate limit.
export function getCharacterDetail(malId) {
  if (!characterDetailPromises.has(malId)) {
    const promise = fetchJson(`/characters/${malId}`).catch((err) => {
      characterDetailPromises.delete(malId);
      throw err;
    });
    characterDetailPromises.set(malId, promise);
  }
  return characterDetailPromises.get(malId);
}
