import { useEffect, useState } from 'react';
import { getAnimeCharacters } from '../api/jikanApi';
import { characters as curatedCharacters } from '../data/characters';
import { mergeAllCharactersList, buildFullCharacterList } from '../utils/mergeCharacterData';

// Fetches the full HxH character list from Jikan once (single request) and
// merges it with the curated local content, exposing loading/error state so
// pages can render gracefully while the request is in flight or if it fails.
// Also exposes the complete ~200-character roster (curated + bare Jikan data)
// for the "todos los personajes" view, at no extra network cost since it
// reuses the same fetched list.
export function useCharacters() {
  const [characters, setCharacters] = useState(() => mergeAllCharactersList(curatedCharacters, []));
  const [allCharacters, setAllCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getAnimeCharacters()
      .then((animeCharacters) => {
        if (cancelled) return;
        setCharacters(mergeAllCharactersList(curatedCharacters, animeCharacters));
        setAllCharacters(buildFullCharacterList(curatedCharacters, animeCharacters));
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

  return { characters, allCharacters, loading, error };
}
