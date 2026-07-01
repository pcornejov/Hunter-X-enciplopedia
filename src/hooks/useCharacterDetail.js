import { useEffect, useState } from 'react';
import { getCharacterDetail } from '../api/jikanApi';
import { findCharacterBySlug } from '../data/characters';
import { mergeCharacterDetailData } from '../utils/mergeCharacterData';

// Fetches full detail for a single character from Jikan (one request) and
// merges it with the curated local content for the character detail page.
export function useCharacterDetail(slug) {
  const curated = findCharacterBySlug(slug);
  const [character, setCharacter] = useState(() =>
    curated ? mergeCharacterDetailData(curated, null) : null
  );
  const [loading, setLoading] = useState(Boolean(curated));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!curated) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    getCharacterDetail(curated.malId)
      .then((detail) => {
        if (cancelled) return;
        setCharacter(mergeCharacterDetailData(curated, detail));
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { character, loading, error };
}
