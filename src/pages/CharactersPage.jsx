import { useMemo, useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import CharacterCardSkeleton from '../components/CharacterCardSkeleton';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ErrorBanner from '../components/ErrorBanner';
import { useCharacters } from '../hooks/useCharacters';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function CharactersPage() {
  useDocumentTitle('Personajes');
  const { characters, allCharacters, loading, error } = useCharacters();
  const [view, setView] = useState('principales');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [role, setRole] = useState('');
  const [sort, setSort] = useState('alfabetico');

  const source = view === 'principales' ? characters : allCharacters;

  const categoryOptions = useMemo(() => {
    const set = new Set();
    characters.forEach((c) => c.categoria && set.add(c.categoria));
    return Array.from(set).sort();
  }, [characters]);

  const filtered = source
    .filter((c) => {
      const normalizedQuery = query.toLowerCase();
      const matchesQuery =
        c.nombre.toLowerCase().includes(normalizedQuery) ||
        c.apiNames?.some((alias) => alias.includes(normalizedQuery));
      const matchesCategory = !category || c.categoria === category;
      const matchesRole = !role || c.role === role;
      return matchesQuery && matchesCategory && matchesRole;
    })
    .sort((a, b) => {
      if (sort === 'popularidad') return (b.favoritos ?? 0) - (a.favoritos ?? 0);
      return a.nombre.localeCompare(b.nombre);
    });

  function switchView(nextView) {
    setView(nextView);
    setCategory('');
  }

  return (
    <div className="container">
      <div className="section-title">
        <h1>Personajes</h1>
        <span className="count">
          {view === 'principales' ? characters.length : allCharacters.length || '…'} en total
        </span>
      </div>

      {error && <ErrorBanner message={error} />}

      <div className="toolbar">
        <button
          type="button"
          className={`btn ${view === 'principales' ? 'btn-primary' : ''}`}
          onClick={() => switchView('principales')}
        >
          Personajes principales
        </button>
        <button
          type="button"
          className={`btn ${view === 'todos' ? 'btn-primary' : ''}`}
          onClick={() => switchView('todos')}
        >
          Todos los personajes de la serie
        </button>
      </div>

      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} />
        {view === 'principales' && (
          <FilterBar
            category={category}
            onCategoryChange={setCategory}
            categoryOptions={categoryOptions}
            role={role}
            onRoleChange={setRole}
          />
        )}
        <select className="filter-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="alfabetico">Orden alfabético</option>
          <option value="popularidad">Más populares</option>
        </select>
      </div>

      {view === 'todos' && (
        <p className="banner banner-info">
          Estos personajes se muestran con datos básicos de MyAnimeList (imagen, rol). Los que aún no tienen
          ficha completa en Hunterpedia enlazan directo a su página en MyAnimeList.
        </p>
      )}

      {loading ? (
        <div className="grid">
          {Array.from({ length: 10 }).map((_, i) => (
            <CharacterCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p>No se encontraron personajes con esos filtros.</p>
      ) : (
        <div className="grid">
          {filtered.map((character) => (
            <CharacterCard key={character.malId} character={character} />
          ))}
        </div>
      )}
    </div>
  );
}
