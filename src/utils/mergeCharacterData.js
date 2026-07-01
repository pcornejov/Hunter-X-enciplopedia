function normalize(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

// Finds the API record whose name/also_known_as/japanese_name matches one of
// the curated `apiNames` aliases for a local character entry.
export function findApiMatch(apiCharacters, curatedCharacter) {
  if (!Array.isArray(apiCharacters) || apiCharacters.length === 0) return null;

  const aliases = curatedCharacter.apiNames.map(normalize);

  return (
    apiCharacters.find((apiChar) => {
      const candidates = [apiChar.name, ...(apiChar.also_known_as || [])].map(normalize);
      return candidates.some((candidate) => aliases.includes(candidate));
    }) || null
  );
}

function extractImageUrl(apiChar) {
  const fromImage = apiChar?.image?.[0]?.secure_url;
  const fromImages = apiChar?.images?.[0]?.secure_url;
  return fromImage || fromImages || null;
}

// Combines curated local content (historia, poderesNen, enfrentamientos) with
// live structured data from the API (image, nen type, abilities, profession,
// affiliations, state). Falls back gracefully when the API record is missing.
export function mergeCharacterData(curatedCharacter, apiCharacters) {
  const apiChar = findApiMatch(apiCharacters, curatedCharacter);

  return {
    ...curatedCharacter,
    apiEncontrado: Boolean(apiChar),
    imagen: extractImageUrl(apiChar) || null,
    nombreJapones: apiChar?.japanese_name || null,
    aliases: apiChar?.also_known_as || [],
    tipoNen: apiChar?.nen_type || [],
    habilidades: apiChar?.abilities || [],
    profesiones: apiChar?.professions || [],
    estado: apiChar?.state || null,
    grupos: apiChar?.groups || [],
    hunterStar: apiChar?.hunter_star ?? null,
  };
}

export function mergeAllCharacters(curatedCharacters, apiCharacters) {
  return curatedCharacters.map((c) => mergeCharacterData(c, apiCharacters));
}
