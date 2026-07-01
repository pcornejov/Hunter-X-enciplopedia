import { useEffect, useState } from 'react';
import { getAllCharacters } from '../api/hxhApi';
import { characters as curatedCharacters } from '../data/characters';
import { mergeAllCharacters } from '../utils/mergeCharacterData';

// Fetches the live API character list once, merges it with the curated local
// content, and exposes loading/error state so pages can render gracefully.
export function useCharacters() {
  const [characters, setCharacters] = useState(() => mergeAllCharacters(curatedCharacters, []));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getAllCharacters()
      .then((apiCharacters) => {
        if (cancelled) return;
        setCharacters(mergeAllCharacters(curatedCharacters, apiCharacters));
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
