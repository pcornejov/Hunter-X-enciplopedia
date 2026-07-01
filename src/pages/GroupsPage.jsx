import { Link } from 'react-router-dom';
import { grupos } from '../data/grupos';
import { findCharacterBySlug } from '../data/characters';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function GroupsPage() {
  useDocumentTitle('Grupos');
  return (
    <div className="container">
      <h1>Grupos y facciones</h1>
      <p>Organizaciones, familias y facciones del universo de Hunter x Hunter.</p>

      {grupos.map((grupo) => (
        <div className="group-card" key={grupo.slug}>
          <h2>{grupo.nombre}</h2>
          {grupo.tambienConocidoComo && (
            <p>
              <strong>También conocido como:</strong> {grupo.tambienConocidoComo}
            </p>
          )}
          <p>{grupo.descripcion}</p>
          <div className="chip-list">
            {grupo.miembrosSlugs.map((s) => {
              const character = findCharacterBySlug(s);
              if (!character) return null;
              return (
                <Link key={s} to={`/personajes/${s}`} className="chip">
                  {character.nombre}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
