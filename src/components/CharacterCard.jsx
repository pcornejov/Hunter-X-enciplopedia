import { Link } from 'react-router-dom';

// Renders as an internal link when the character has curated content (a local
// slug), or as an external link to its MyAnimeList page otherwise — used by
// the "todos los personajes de la serie" view, which includes characters we
// haven't written a curated profile for yet.
export default function CharacterCard({ character }) {
  const { slug, nombre, imagen, categoria, role, url } = character;

  const image = (
    <img
      className="card-image"
      src={imagen || '/placeholder-character.svg'}
      alt={nombre}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = '/placeholder-character.svg';
      }}
    />
  );

  const body = (
    <div className="card-body">
      <h3>{nombre}</h3>
      <div className="badges">
        {categoria && <span className="badge">{categoria}</span>}
        {role && <span className="badge badge-muted">{role === 'Main' ? 'Protagonista' : 'Secundario'}</span>}
      </div>
    </div>
  );

  if (!slug) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="card">
        {image}
        {body}
      </a>
    );
  }

  return (
    <Link to={`/personajes/${slug}`} className="card">
      {image}
      {body}
    </Link>
  );
}
