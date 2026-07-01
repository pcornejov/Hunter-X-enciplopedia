import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBanner from '../components/ErrorBanner';
import { useCharacterDetail } from '../hooks/useCharacterDetail';
import { findArcoBySlug } from '../data/arcos';
import { grupos } from '../data/grupos';

export default function CharacterDetailPage() {
  const { slug } = useParams();
  const { character, loading, error } = useCharacterDetail(slug);

  if (!character) {
    return (
      <div className="container not-found">
        <h1>Personaje no encontrado</h1>
        <Link to="/personajes">Volver al listado de personajes</Link>
      </div>
    );
  }

  const arco = findArcoBySlug(character.arcoPrincipal);
  const grupoDePersonaje = grupos.filter((g) => g.miembrosSlugs.includes(slug));

  return (
    <div className="container">
      {error && <ErrorBanner message={error} />}

      <div className="detail-header">
        {loading ? (
          <div className="detail-image" />
        ) : (
          <img
            className="detail-image"
            src={character.imagen || '/placeholder-character.svg'}
            alt={character.nombre}
            onError={(e) => {
              e.currentTarget.src = '/placeholder-character.svg';
            }}
          />
        )}
        <div className="detail-info">
          <h1>{character.nombre}</h1>
          {character.nombreJapones && <p>{character.nombreJapones}</p>}

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
              {character.edad && (
                <tr>
                  <td>Edad</td>
                  <td>{character.edad}</td>
                </tr>
              )}
              {arco && (
                <tr>
                  <td>Arco principal</td>
                  <td>
                    <Link to={`/arcos/${arco.slug}`}>{arco.titulo}</Link>
                  </td>
                </tr>
              )}
              {grupoDePersonaje.length > 0 && (
                <tr>
                  <td>Afiliación</td>
                  <td>
                    {grupoDePersonaje.map((g, i) => (
                      <span key={g.slug}>
                        {i > 0 && ', '}
                        <Link to="/grupos">{g.nombre}</Link>
                      </span>
                    ))}
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
