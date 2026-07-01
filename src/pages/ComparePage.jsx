import { useState } from 'react';
import { Link } from 'react-router-dom';
import { characters } from '../data/characters';
import { useCharacterDetail } from '../hooks/useCharacterDetail';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const sortedCharacters = [...characters].sort((a, b) => a.nombre.localeCompare(b.nombre));

function CharacterColumn({ slug, onChange, otherSlug }) {
  const { character, loading } = useCharacterDetail(slug);

  return (
    <div className="compare-column">
      <select className="filter-select" value={slug} onChange={(e) => onChange(e.target.value)}>
        {sortedCharacters.map((c) => (
          <option key={c.slug} value={c.slug} disabled={c.slug === otherSlug}>
            {c.nombre}
          </option>
        ))}
      </select>

      {character && (
        <>
          <img
            className="detail-image compare-image"
            src={character.imagen || '/placeholder-character.svg'}
            alt={character.nombre}
            onError={(e) => {
              e.currentTarget.src = '/placeholder-character.svg';
            }}
          />
          <h3>
            <Link to={`/personajes/${character.slug}`}>{character.nombre}</Link>
          </h3>
          <table className="info-table">
            <tbody>
              <tr>
                <td>Categoría</td>
                <td>{character.categoria}</td>
              </tr>
              <tr>
                <td>Tipo de Nen</td>
                <td>{loading ? 'Cargando...' : character.tipoNenApi || 'No disponible'}</td>
              </tr>
              <tr>
                <td>Ocupación</td>
                <td>{loading ? 'Cargando...' : character.ocupacion || 'No disponible'}</td>
              </tr>
              <tr>
                <td>Edad</td>
                <td>{character.edad || 'No disponible'}</td>
              </tr>
              <tr>
                <td>Poderes Nen listados</td>
                <td>{character.poderesNen.length}</td>
              </tr>
              <tr>
                <td>Enfrentamientos destacados</td>
                <td>{character.enfrentamientos.length}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default function ComparePage() {
  useDocumentTitle('Comparar personajes');
  const [slugA, setSlugA] = useState('gon-freecss');
  const [slugB, setSlugB] = useState('killua-zoldyck');

  return (
    <div className="container">
      <h1>Comparar personajes</h1>
      <p>Elige dos personajes para comparar sus datos lado a lado.</p>

      <div className="compare-grid">
        <CharacterColumn slug={slugA} onChange={setSlugA} otherSlug={slugB} />
        <CharacterColumn slug={slugB} onChange={setSlugB} otherSlug={slugA} />
      </div>
    </div>
  );
}
