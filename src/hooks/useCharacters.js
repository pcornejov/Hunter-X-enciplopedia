import { useEffect, useState } from 'react';
import { getAnimeCharacters } from '../api/jikanApi';
import { characters as curatedCharacters } from '../data/characters';
import { mergeAllCharactersList } from '../utils/mergeCharacterData';

// Fetches the full HxH character list from Jikan once (single request) and
// merges it with the curated local content, exposing loading/error state so
// pages can render gracefully while the request is in flight or if it fails.
export function useCharacters() {
  const [characters, setCharacters] = useState(() => mergeAllCharactersList(curatedCharacters, []));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getAnimeCharacters()
      .then((animeCharacters) => {
        if (cancelled) return;
        setCharacters(mergeAllCharactersList(curatedCharacters, animeCharacters));
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
  }, []);

  return { characters, loading, error };
}
