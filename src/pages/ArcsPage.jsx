import { Link } from 'react-router-dom';
import { arcos } from '../data/arcos';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function ArcsPage() {
  useDocumentTitle('Arcos');
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
