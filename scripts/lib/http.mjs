/**
 * Utilidades HTTP compartidas por los scripts de ingesta.
 * Todo pasa por aqui para tener un unico lugar con reintentos, backoff
 * y respeto de los limites de tasa de las APIs publicas.
 */

const DEFAULT_TIMEOUT_MS = 45_000;

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Log con prefijo consistente para poder seguir el pipeline en CI. */
export function log(scope, message, extra) {
  const stamp = new Date().toISOString().slice(11, 19);
  if (extra === undefined) console.log(`[${stamp}] ${scope}: ${message}`);
  else console.log(`[${stamp}] ${scope}: ${message}`, extra);
}

/**
 * fetch con timeout, reintentos exponenciales y manejo explicito de 429.
 * Devuelve el Response ya validado (status 2xx).
 */
export async function fetchWithRetry(url, options = {}, config = {}) {
  const { retries = 5, baseDelayMs = 1000, timeoutMs = DEFAULT_TIMEOUT_MS, label = url } = config;

  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);

      if (response.status === 429) {
        const retryAfter = Number(response.headers.get('retry-after')) || 0;
        const wait = retryAfter > 0 ? retryAfter * 1000 : baseDelayMs * 2 ** attempt;
        log('http', `429 en ${label}, esperando ${wait}ms (intento ${attempt + 1}/${retries + 1})`);
        await sleep(wait);
        continue;
      }

      // 5xx suele ser la API upstream caida: reintentamos.
      if (response.status >= 500) {
        const wait = baseDelayMs * 2 ** attempt;
        log('http', `${response.status} en ${label}, reintento en ${wait}ms`);
        await sleep(wait);
        lastError = new Error(`${label} devolvio ${response.status}`);
        continue;
      }

      if (!response.ok) {
        throw new Error(`${label} devolvio ${response.status} ${response.statusText}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timer);
      lastError = error;
      if (attempt === retries) break;
      const wait = baseDelayMs * 2 ** attempt;
      log('http', `fallo ${label} (${error.message}), reintento en ${wait}ms`);
      await sleep(wait);
    }
  }

  throw lastError ?? new Error(`No se pudo completar la peticion a ${label}`);
}

/** Cliente GraphQL minimo para AniList, con manejo de errores de la API. */
export async function graphql(endpoint, query, variables = {}, label = 'graphql') {
  const response = await fetchWithRetry(
    endpoint,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query, variables }),
    },
    { label },
  );

  const payload = await response.json();
  if (payload.errors?.length) {
    const detail = payload.errors.map((e) => e.message).join('; ');
    throw new Error(`${label}: la API respondio con errores -> ${detail}`);
  }
  if (!payload.data) {
    throw new Error(`${label}: respuesta sin campo data`);
  }
  return payload.data;
}
