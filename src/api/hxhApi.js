const BASE_URL = 'https://hxh-api.onrender.com/api/v1';
const API_KEY = import.meta.env.VITE_HXH_API_KEY;
const TIMEOUT_MS = 15000;

let charactersPromise = null;
let groupsPromise = null;

async function fetchJson(path) {
  if (!API_KEY) {
    throw new Error('Falta configurar VITE_HXH_API_KEY en el archivo .env.local');
  }

  const url = `${BASE_URL}${path}${path.includes('?') ? '&' : '?'}api_key=${API_KEY}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    const body = await response.json().catch(() => null);

    if (!response.ok || !body || body.status === 'failure') {
      const message = body?.message || `Error ${response.status} al consultar la API`;
      throw new Error(message);
    }

    return body.data;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchAllPages(path, limit = 50) {
  let page = 1;
  let all = [];

  while (true) {
    const separator = path.includes('?') ? '&' : '?';
    const pageData = await fetchJson(`${path}${separator}page=${page}&limit=${limit}`);
    if (!Array.isArray(pageData) || pageData.length === 0) break;

    all = all.concat(pageData);
    if (pageData.length < limit) break;
    page += 1;
  }

  return all;
}

// Fetches the full character list once and caches the in-flight/resolved promise
// so multiple pages/components don't trigger duplicate network requests.
export function getAllCharacters() {
  if (!charactersPromise) {
    charactersPromise = fetchAllPages('/characters').catch((err) => {
      charactersPromise = null;
      throw err;
    });
  }
  return charactersPromise;
}

export function getAllGroups() {
  if (!groupsPromise) {
    groupsPromise = fetchAllPages('/groups').catch((err) => {
      groupsPromise = null;
      throw err;
    });
  }
  return groupsPromise;
}

export function isApiKeyConfigured() {
  return Boolean(API_KEY);
}
