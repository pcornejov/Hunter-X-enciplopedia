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
  const [nenType, setNenType] = useState('');
  const [status, setStatus] = useState('');

  const nenTypeOptions = useMemo(() => {
    const set = new Set();
    characters.forEach((c) => c.tipoNen?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [characters]);

  const filtered = characters.filter((c) => {
    const matchesQuery = c.nombre.toLowerCase().includes(query.toLowerCase());
    const matchesNen = !nenType || c.tipoNen?.includes(nenType);
    const matchesStatus = !status || c.estado === status;
    return matchesQuery && matchesNen && matchesStatus;
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
          nenType={nenType}
          onNenTypeChange={setNenType}
          nenTypeOptions={nenTypeOptions}
          status={status}
          onStatusChange={setStatus}
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
