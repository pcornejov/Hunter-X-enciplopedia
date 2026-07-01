import { useEffect, useState } from 'react';
import { getAllGroups } from '../api/hxhApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBanner from '../components/ErrorBanner';

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getAllGroups()
      .then((data) => {
        if (!cancelled) setGroups(data || []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="container">
      <h1>Grupos y facciones</h1>
      <p>Organizaciones, familias y facciones del universo de Hunter x Hunter, según datos de la API.</p>

      {error && <ErrorBanner message={error} />}

      {loading ? (
        <LoadingSpinner />
      ) : groups.length === 0 ? (
        <p>No hay datos de grupos disponibles en este momento.</p>
      ) : (
        groups.map((group) => (
          <div className="group-card" key={group._id}>
            <h2>{group.name}</h2>
            {group.also_known_as?.length > 0 && (
              <p>
                <strong>También conocido como:</strong> {group.also_known_as.join(', ')}
              </p>
            )}
            {group.classification && (
              <p>
                <strong>Clasificación:</strong> {group.classification}
              </p>
            )}
            {group.status && (
              <p>
                <strong>Estado:</strong> {group.status}
              </p>
            )}
            {group.leaders?.length > 0 && (
              <p>
                <strong>Líder(es):</strong> {group.leaders.map((l) => l.name).join(', ')}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
