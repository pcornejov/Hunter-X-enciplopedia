import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container not-found">
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}
