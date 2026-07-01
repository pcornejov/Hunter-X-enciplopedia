import { Link } from 'react-router-dom';

export default function CharacterCard({ character }) {
  const { slug, nombre, imagen, tipoNen, estado } = character;

  return (
    <Link to={`/personajes/${slug}`} className="card">
      <img
        className="card-image"
        src={imagen || '/placeholder-character.svg'}
        alt={nombre}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = '/placeholder-character.svg';
        }}
      />
      <div className="card-body">
        <h3>{nombre}</h3>
        <div className="badges">
          {tipoNen?.[0] && <span className="badge">{tipoNen[0]}</span>}
          {estado && (
            <span className="badge badge-muted">{estado === 'alive' ? 'Vivo' : 'Fallecido'}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
