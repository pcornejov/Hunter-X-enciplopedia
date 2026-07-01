import { parseCharacterAbout } from './parseCharacterAbout';

const PREFERRED_VOICE_LANGUAGES = ['Japanese', 'Spanish', 'English'];

function extractImageUrl(images) {
  return images?.webp?.image_url || images?.jpg?.image_url || null;
}

// Combines curated local content with the lightweight entry from Jikan's
// bulk "/anime/{id}/characters" endpoint (image + role only). Used for
// character grids/cards where fetching full detail per card would be
// too many requests against Jikan's rate limit.
export function mergeCharacterListData(curatedCharacter, animeCharacters) {
  const entry = animeCharacters?.find((c) => c.character.mal_id === curatedCharacter.malId);

  return {
    ...curatedCharacter,
    apiEncontrado: Boolean(entry),
    imagen: entry ? extractImageUrl(entry.character.images) : null,
    role: entry?.role || null,
    favoritos: entry?.favorites ?? null,
  };
}

export function mergeAllCharactersList(curatedCharacters, animeCharacters) {
  return curatedCharacters.map((c) => mergeCharacterListData(c, animeCharacters));
}

// Jikan names are formatted "Surname, Given" (or just a single name). Flips
// them to "Given Surname" for display when there's no curated name to use.
function formatJikanName(name) {
  const [last, first] = name.split(', ');
  return first ? `${first} ${last}` : name;
}

// Builds the complete roster shown in the anime (~200 characters), using
// curated content where we have it and falling back to bare Jikan data
// (image, role, link to MyAnimeList) for everyone else. Lets the site be
// browsable in full without requiring a hand-written profile for every
// minor character.
export function buildFullCharacterList(curatedCharacters, animeCharacters) {
  const curatedByMalId = new Map(curatedCharacters.map((c) => [c.malId, c]));

  return (animeCharacters || []).map((entry) => {
    const curated = curatedByMalId.get(entry.character.mal_id);
    if (curated) return mergeCharacterListData(curated, animeCharacters);

    return {
      slug: null,
      malId: entry.character.mal_id,
      nombre: formatJikanName(entry.character.name),
      imagen: extractImageUrl(entry.character.images),
      role: entry.role,
      favoritos: entry.favorites ?? null,
      categoria: null,
      url: entry.character.url,
    };
  });
}

function extractVoices(voices) {
  if (!Array.isArray(voices)) return [];

  const byLanguage = new Map();
  for (const v of voices) {
    if (!byLanguage.has(v.language)) byLanguage.set(v.language, v);
  }

  return PREFERRED_VOICE_LANGUAGES.map((lang) => byLanguage.get(lang)).filter(Boolean);
}

// Combines curated local content with Jikan's full single-character detail
// (image, structured fields parsed out of the free-text "about" bio, voice
// actors, and a picture gallery). Used on the character detail page, where
// a couple of extra requests per visit is cheap.
export function mergeCharacterDetailData(curatedCharacter, detail, pictures) {
  const about = parseCharacterAbout(detail?.about);

  return {
    ...curatedCharacter,
    apiEncontrado: Boolean(detail),
    imagen: detail ? extractImageUrl(detail.images) : null,
    nombreJapones: detail?.name_kanji || null,
    edad: about.age || null,
    cumpleanos: about.birthday || null,
    ocupacion: about.occupation || null,
    tipoNenApi: about.nenType || null,
    voces: extractVoices(detail?.voices),
    galeria: (pictures || []).map((p) => extractImageUrl(p)).filter(Boolean),
  };
}
