import { Link, useParams } from 'react-router-dom';
import { findArcoBySlug } from '../data/arcos';
import { findCharacterBySlug } from '../data/characters';

export default function ArcDetailPage() {
  const { slug } = useParams();
  const arco = findArcoBySlug(slug);

  if (!arco) {
    return (
      <div className="container not-found">
        <h1>Arco no encontrado</h1>
        <Link to="/arcos">Volver al listado de arcos</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="arc-number">Arco {arco.numero}</div>
      <h1>{arco.titulo}</h1>
      <p>{arco.sinopsis}</p>

      <section className="block">
        <h2>Personajes destacados</h2>
        <div className="chip-list">
          {arco.personajesDestacadosSlugs.map((s) => {
            const character = findCharacterBySlug(s);
            if (!character) return null;
            return (
              <Link key={s} to={`/personajes/${s}`} className="chip">
                {character.nombre}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
