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
