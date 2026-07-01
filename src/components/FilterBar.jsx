export default function FilterBar({ nenType, onNenTypeChange, nenTypeOptions, status, onStatusChange }) {
  return (
    <>
      <select className="filter-select" value={nenType} onChange={(e) => onNenTypeChange(e.target.value)}>
        <option value="">Todos los tipos de Nen</option>
        {nenTypeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select className="filter-select" value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="">Cualquier estado</option>
        <option value="alive">Vivo</option>
        <option value="deceased">Fallecido</option>
      </select>
    </>
  );
}
