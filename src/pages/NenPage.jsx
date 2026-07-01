import { Link } from 'react-router-dom';
import { nenTypes } from '../data/nenTypes';
import { findCharacterBySlug } from '../data/characters';

export default function NenPage() {
  return (
    <div className="container">
      <h1>El sistema Nen</h1>
      <p>
        El Nen es la capacidad de manipular la propia energía vital (aura) para potenciar el cuerpo y
        crear efectos sobrenaturales. Todo usuario de Nen tiene una afinidad natural dominante hacia una
        de seis categorías, aunque puede desarrollar habilidades secundarias de las categorías cercanas.
      </p>

      {nenTypes.map((tipo) => (
        <div className="arc-card" key={tipo.slug}>
          <h2>{tipo.nombre}</h2>
          <p>
            <em>{tipo.lema}</em>
          </p>
          <p>{tipo.descripcion}</p>
          <div className="chip-list">
            {tipo.ejemplosSlugs.map((s) => {
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
