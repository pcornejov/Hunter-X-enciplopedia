import { Link } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import CharacterCardSkeleton from '../components/CharacterCardSkeleton';
import ErrorBanner from '../components/ErrorBanner';
import { useCharacters } from '../hooks/useCharacters';

const FEATURED_SLUGS = ['gon-freecss', 'killua-zoldyck', 'kurapika', 'hisoka-morow', 'chrollo-lucilfer', 'meruem'];

export default function HomePage() {
  const { characters, loading, error } = useCharacters();
  const featured = FEATURED_SLUGS.map((slug) => characters.find((c) => c.slug === slug)).filter(Boolean);

  return (
    <div className="container">
      <section className="hero">
        <h1>Hunterpedia</h1>
        <p>
          La enciclopedia de fans sobre Hunter x Hunter: personajes, historia, poderes Nen y los
          enfrentamientos que marcaron el manga y el anime.
        </p>
        <div className="hero-actions">
          <Link to="/personajes" className="btn btn-primary">
            Explorar personajes
          </Link>
          <Link to="/nen" className="btn">
            Descubrir el sistema Nen
          </Link>
        </div>
      </section>

      {error && <ErrorBanner message={error} />}

      <section className="section">
        <div className="section-title">
          <h2>Personajes destacados</h2>
        </div>
        {loading ? (
          <div className="grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <CharacterCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid">
            {featured.map((character) => (
              <CharacterCard key={character.slug} character={character} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
