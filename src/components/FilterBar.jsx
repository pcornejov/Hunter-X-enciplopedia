export default function FilterBar({ category, onCategoryChange, categoryOptions, role, onRoleChange }) {
  return (
    <>
      <select className="filter-select" value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">Todas las categorías</option>
        {categoryOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select className="filter-select" value={role} onChange={(e) => onRoleChange(e.target.value)}>
        <option value="">Cualquier rol</option>
        <option value="Main">Protagonista</option>
        <option value="Supporting">Secundario</option>
      </select>
    </>
  );
}
