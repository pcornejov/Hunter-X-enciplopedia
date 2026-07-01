import { Link } from 'react-router-dom';

export default function CharacterCard({ character }) {
  const { slug, nombre, imagen, categoria, role } = character;

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
          {categoria && <span className="badge">{categoria}</span>}
          {role && <span className="badge badge-muted">{role === 'Main' ? 'Protagonista' : 'Secundario'}</span>}
        </div>
      </div>
    </Link>
  );
}
