import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'hunterpedia:favorites';

function readStoredFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return []; // localStorage unavailable (private browsing, SSR, etc.)
  }
}

function writeStoredFavorites(slugs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // Storage full/unavailable — favorites just won't persist this session.
  }
}

// Pure reducer extracted for testability (no React/localStorage needed).
export function toggleFavoriteSlug(current, slug) {
  return current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
}

const FavoritesContext = createContext(null);

// Single shared source of truth for favorited character slugs, backed by
// localStorage. A context (rather than a plain hook reading localStorage
// independently per component) so toggling a favorite on one card is
// reflected immediately everywhere else it's shown (other cards, the
// /favoritos list) without a full page reload.
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readStoredFavorites);

  useEffect(() => {
    writeStoredFavorites(favorites);
  }, [favorites]);

  function toggleFavorite(slug) {
    setFavorites((current) => toggleFavoriteSlug(current, slug));
  }

  function isFavorite(slug) {
    return favorites.includes(slug);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
