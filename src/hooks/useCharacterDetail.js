import { useEffect, useState } from 'react';
import { getCharacterFull, getCharacterPictures } from '../api/jikanApi';
import { findCharacterBySlug } from '../data/characters';
import { mergeCharacterDetailData } from '../utils/mergeCharacterData';

// Fetches full detail and picture gallery for a single character from Jikan
// (two requests) and merges them with the curated local content for the
// character detail page.
export function useCharacterDetail(slug) {
  const curated = findCharacterBySlug(slug);
  const [character, setCharacter] = useState(() =>
    curated ? mergeCharacterDetailData(curated, null, null) : null
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

    // allSettled so a rate-limited/failed picture gallery request doesn't
    // block the (more important) character bio from rendering.
    Promise.allSettled([getCharacterFull(curated.malId), getCharacterPictures(curated.malId)]).then(
      ([detailResult, picturesResult]) => {
        if (cancelled) return;

        const detail = detailResult.status === 'fulfilled' ? detailResult.value : null;
        const pictures = picturesResult.status === 'fulfilled' ? picturesResult.value : null;
        setCharacter(mergeCharacterDetailData(curated, detail, pictures));

        if (detailResult.status === 'rejected') setError(detailResult.reason.message);
        setLoading(false);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [slug, curated]);

  return { character, loading, error };
}
