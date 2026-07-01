export default function LoadingSpinner({ label = 'Cargando datos desde la API...' }) {
  return (
    <div className="loading">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}
