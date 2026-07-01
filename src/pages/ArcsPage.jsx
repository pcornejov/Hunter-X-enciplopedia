import { Link } from 'react-router-dom';
import { arcos } from '../data/arcos';

export default function ArcsPage() {
  return (
    <div className="container">
      <h1>Arcos argumentales</h1>
      {arcos.map((arco) => (
        <div className="arc-card" key={arco.slug}>
          <div className="arc-number">Arco {arco.numero}</div>
          <h2>
            <Link to={`/arcos/${arco.slug}`}>{arco.titulo}</Link>
          </h2>
          <p>{arco.sinopsis}</p>
        </div>
      ))}
    </div>
  );
}
