import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBanner from '../components/ErrorBanner';
import { useCharacters } from '../hooks/useCharacters';
import { findArcoBySlug } from '../data/arcos';

export default function CharacterDetailPage() {
  const { slug } = useParams();
  const { characters, loading, error } = useCharacters();
  const character = characters.find((c) => c.slug === slug);

  if (loading) {
    return (
      <div className="container">
        <LoadingSpinner />
      </div>
    );
  }

  if (!character) {
    return (
      <div className="container not-found">
        <h1>Personaje no encontrado</h1>
        <Link to="/personajes">Volver al listado de personajes</Link>
      </div>
    );
  }

  const arco = findArcoBySlug(character.arcoPrincipal);

  return (
    <div className="container">
      {error && <ErrorBanner message={error} />}

      <div className="detail-header">
        <img
          className="detail-image"
          src={character.imagen || '/placeholder-character.svg'}
          alt={character.nombre}
          onError={(e) => {
            e.currentTarget.src = '/placeholder-character.svg';
          }}
        />
        <div className="detail-info">
          <h1>{character.nombre}</h1>
          {character.nombreJapones && <p>{character.nombreJapones}</p>}

          <table className="info-table">
            <tbody>
              {character.aliases.length > 0 && (
                <tr>
                  <td>Alias</td>
                  <td>{character.aliases.join(', ')}</td>
                </tr>
              )}
              <tr>
                <td>Tipo de Nen</td>
                <td>{character.tipoNen.length > 0 ? character.tipoNen.join(', ') : 'No disponible'}</td>
              </tr>
              <tr>
                <td>Profesión</td>
                <td>{character.profesiones.length > 0 ? character.profesiones.join(', ') : 'No disponible'}</td>
              </tr>
              {character.grupos.length > 0 && (
                <tr>
                  <td>Afiliación</td>
                  <td>{character.grupos.map((g) => g.name).join(', ')}</td>
                </tr>
              )}
              <tr>
                <td>Estado</td>
                <td>
                  {character.estado ? (
                    <span className={character.estado === 'alive' ? 'status-alive' : 'status-dead'}>
                      {character.estado === 'alive' ? 'Vivo' : 'Fallecido'}
                    </span>
                  ) : (
                    'No disponible'
                  )}
                </td>
              </tr>
              {arco && (
                <tr>
                  <td>Arco principal</td>
                  <td>
                    <Link to={`/arcos/${arco.slug}`}>{arco.titulo}</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <section className="block">
        <h2>Historia</h2>
        {character.historia.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </section>

      <section className="block">
        <h2>Poderes Nen</h2>
        {character.habilidades.length > 0 && (
          <p>
            <strong>Habilidades registradas:</strong> {character.habilidades.join(', ')}
          </p>
        )}
        {character.poderesNen.map((poder) => (
          <div className="ability-item" key={poder.nombre}>
            <h4>{poder.nombre}</h4>
            <p>{poder.descripcion}</p>
          </div>
        ))}
      </section>

      <section className="block">
        <h2>Enfrentamientos destacados</h2>
        {character.enfrentamientos.map((fight, i) => (
          <div className="fight-item" key={i}>
            <div className="fight-meta">
              {fight.rival} · {fight.arco}
            </div>
            <p>{fight.contexto}</p>
            <p className="fight-result">{fight.resultado}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
