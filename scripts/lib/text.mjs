/**
 * Normalizacion de texto: slugs, limpieza del markdown propietario de AniList
 * y extraccion de datos sueltos que vienen embebidos en las descripciones.
 */

/** Slug estable y seguro para URLs (sin acentos, sin simbolos). */
export function slugify(input) {
  return String(input)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // "HUNTER×HUNTER" debe leerse como "hunter x hunter", no "hunterxhunter".
    .replace(/[×✕✖]/g, ' x ')
    .toLowerCase()
    .replace(/['".,!?:;()[\]{}]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/**
 * AniList marca spoilers con la sintaxis ~!texto!~.
 * Devolvemos el texto limpio y los spoilers por separado para que la UI
 * decida si mostrarlos detras de un toggle.
 */
export function splitSpoilers(markdown) {
  if (!markdown) return { text: '', spoilers: [] };
  const spoilers = [];
  const text = markdown.replace(/~!([\s\S]*?)!~/g, (_match, inner) => {
    const clean = cleanMarkdown(inner);
    if (clean) spoilers.push(clean);
    return '';
  });
  return { text: cleanMarkdown(text), spoilers };
}

/** Convierte el markdown de AniList a texto plano legible. */
export function cleanMarkdown(input) {
  if (!input) return '';
  return String(input)
    // HTML suelto que a veces aparece en las fichas.
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?[^>]+>/g, '')
    // Enlaces markdown -> solo el texto.
    .replace(/\[([^\]]+)\]\((?:[^)]+)\)/g, '$1')
    // Enfasis de AniList (__negrita__, **negrita**, _cursiva_).
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|\s)_([^_\n]+)_(?=\s|$)/g, '$1$2')
    .replace(/\r/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trim();
}

/**
 * Muchas fichas de AniList empiezan con pares "Clave: valor" (Height, Weight,
 * Affiliation...). Los extraemos como atributos estructurados para la ficha.
 * Se ejecuta sobre texto ya limpio, por eso no busca marcas de markdown.
 */
const ATTRIBUTE_LABELS = new Map([
  ['height', 'Altura'],
  ['weight', 'Peso'],
  ['age', 'Edad'],
  ['birthday', 'Cumpleanos'],
  ['birth', 'Cumpleanos'],
  ['blood type', 'Grupo sanguineo'],
  ['bloodtype', 'Grupo sanguineo'],
  ['affiliation', 'Afiliacion'],
  ['affiliations', 'Afiliacion'],
  ['occupation', 'Ocupacion'],
  ['occupations', 'Ocupacion'],
  ['nen type', 'Tipo de Nen'],
  ['nen', 'Nen'],
  ['type', 'Tipo de Nen'],
  ['japanese', 'Nombre japones'],
  ['romaji', 'Romaji'],
  ['status', 'Estado'],
]);

export function extractAttributes(text) {
  const attributes = [];
  if (!text) return { attributes, rest: '' };

  const lines = text.split('\n');
  const restLines = [];
  const seen = new Set();
  // Solo miramos la cabecera: pasado ese bloque, un "algo:" es prosa normal.
  let stillInHeader = true;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (!stillInHeader) restLines.push('');
      continue;
    }

    if (stillInHeader) {
      const match = trimmed.match(/^([A-Za-z][A-Za-z ]{1,18}?)\s*:\s*(.+)$/);
      const label = match ? ATTRIBUTE_LABELS.get(match[1].trim().toLowerCase()) : null;
      if (label && !seen.has(label)) {
        const value = cleanMarkdown(match[2]);
        if (value && value.length <= 120) {
          seen.add(label);
          attributes.push({ label, value });
          continue;
        }
      }
      // La cabecera termina en cuanto aparece una linea que no es "clave: valor".
      if (!label) stillInHeader = false;
    }

    restLines.push(line);
  }

  return { attributes, rest: restLines.join('\n').trim() };
}

/** Recorta un texto a `max` caracteres sin cortar palabras por la mitad. */
export function truncate(input, max = 220) {
  const text = String(input ?? '').replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 60 ? lastSpace : max).trim()}…`;
}
