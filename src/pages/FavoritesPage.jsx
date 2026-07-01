import { Link } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import { useFavorites } from '../hooks/useFavorites';
import { useCharacters } from '../hooks/useCharacters';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function FavoritesPage() {
  useDocumentTitle('Favoritos');
  const { favorites } = useFavorites();
  const { characters, loading } = useCharacters();

  const favoriteCharacters = characters.filter((c) => favorites.includes(c.slug));

  return (
    <div className="container">
      <h1>Mis favoritos</h1>

      {!loading && favorites.length === 0 ? (
        <p>
          Todavía no marcaste ningún personaje como favorito. Hazlo desde el ícono ☆ en cualquier tarjeta o
          ficha de <Link to="/personajes">Personajes</Link>.
        </p>
      ) : (
        <div className="grid">
          {favoriteCharacters.map((character) => (
            <CharacterCard key={character.slug} character={character} />
          ))}
        </div>
      )}
    </div>
  );
}
