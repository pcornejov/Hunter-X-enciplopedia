import { useMemo, useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBanner from '../components/ErrorBanner';
import { useCharacters } from '../hooks/useCharacters';

export default function CharactersPage() {
  const { characters, loading, error } = useCharacters();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [role, setRole] = useState('');

  const categoryOptions = useMemo(() => {
    const set = new Set();
    characters.forEach((c) => c.categoria && set.add(c.categoria));
    return Array.from(set).sort();
  }, [characters]);

  const filtered = characters.filter((c) => {
    const matchesQuery = c.nombre.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !category || c.categoria === category;
    const matchesRole = !role || c.role === role;
    return matchesQuery && matchesCategory && matchesRole;
  });

  return (
    <div className="container">
      <div className="section-title">
        <h1>Personajes</h1>
        <span className="count">{characters.length} en total</span>
      </div>

      {error && <ErrorBanner message={error} />}

      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <FilterBar
          category={category}
          onCategoryChange={setCategory}
          categoryOptions={categoryOptions}
          role={role}
          onRoleChange={setRole}
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <p>No se encontraron personajes con esos filtros.</p>
      ) : (
        <div className="grid">
          {filtered.map((character) => (
            <CharacterCard key={character.slug} character={character} />
          ))}
        </div>
      )}
    </div>
  );
}
