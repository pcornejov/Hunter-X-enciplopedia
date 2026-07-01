export default function SearchBar({ value, onChange, placeholder = 'Buscar personaje...' }) {
  return (
    <input
      type="search"
      className="search-input"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
