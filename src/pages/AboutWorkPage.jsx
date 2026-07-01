import { useEffect, useState } from 'react';
import { getAnimeInfo, getAnimeRelations, getMangaInfo } from '../api/jikanApi';
import {
  animeSinopsis,
  mangaResumen,
  translateStatus,
  translateRelation,
  translateDateRange,
} from '../data/aboutWork';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBanner from '../components/ErrorBanner';

export default function AboutWorkPage() {
  const [anime, setAnime] = useState(null);
  const [relations, setRelations] = useState([]);
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    // allSettled (not all) so one source failing/rate-limited doesn't block
    // the others from rendering.
    async function load() {
      const results = await Promise.allSettled([getAnimeInfo(), getAnimeRelations(), getMangaInfo()]);
      if (cancelled) return;

      const [animeResult, relationsResult, mangaResult] = results;
      if (animeResult.status === 'fulfilled') setAnime(animeResult.value);
      if (relationsResult.status === 'fulfilled') setRelations(relationsResult.value || []);
      if (mangaResult.status === 'fulfilled') setManga(mangaResult.value);

      const failed = results.find((r) => r.status === 'rejected');
      if (failed) setError(failed.reason.message);

      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const relatedAnime = relations
    .filter((r) => r.relation !== 'Adaptation')
    .map((r) => ({ relation: r.relation, entries: r.entry.filter((e) => e.type === 'anime') }))
    .filter((r) => r.entries.length > 0);

  return (
    <div className="container">
      <h1>La obra</h1>

      {error && <ErrorBanner message={error} />}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {anime && (
            <div className="arc-card">
              <h2>{anime.title}</h2>
              {anime.title_japanese && <p>{anime.title_japanese}</p>}
              {animeSinopsis.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <table className="info-table">
                <tbody>
                  <tr>
                    <td>Estudio</td>
                    <td>{anime.studios?.map((s) => s.name).join(', ') || 'No disponible'}</td>
                  </tr>
                  <tr>
                    <td>Episodios</td>
                    <td>{anime.episodes ?? 'No disponible'}</td>
                  </tr>
                  <tr>
                    <td>Estado</td>
                    <td>{translateStatus(anime.status) || 'No disponible'}</td>
                  </tr>
                  <tr>
                    <td>Emisión</td>
                    <td>{translateDateRange(anime.aired?.string) || 'No disponible'}</td>
                  </tr>
                  <tr>
                    <td>Puntuación (MyAnimeList)</td>
                    <td>{anime.score ? `${anime.score} / 10` : 'No disponible'}</td>
                  </tr>
                </tbody>
              </table>
              {anime.trailer?.embed_url && (
                <div className="trailer-embed">
                  <iframe
                    src={anime.trailer.embed_url}
                    title="Tráiler"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          )}

          {manga && (
            <div className="arc-card">
              <h2>El manga</h2>
              {mangaResumen.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <table className="info-table">
                <tbody>
                  <tr>
                    <td>Autor</td>
                    <td>{manga.authors?.map((a) => a.name).join(', ') || 'No disponible'}</td>
                  </tr>
                  <tr>
                    <td>Estado</td>
                    <td>{translateStatus(manga.status) || 'No disponible'}</td>
                  </tr>
                  <tr>
                    <td>Publicación</td>
                    <td>{translateDateRange(manga.published?.string) || 'No disponible'}</td>
                  </tr>
                  <tr>
                    <td>Puntuación (MyAnimeList)</td>
                    <td>{manga.score ? `${manga.score} / 10` : 'No disponible'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {relatedAnime.length > 0 && (
            <div className="arc-card">
              <h2>Adaptaciones y otras versiones</h2>
              {relatedAnime.map((group) => (
                <p key={group.relation}>
                  <strong>{translateRelation(group.relation)}:</strong>{' '}
                  {group.entries.map((e, i) => (
                    <span key={e.mal_id}>
                      {i > 0 && ', '}
                      <a href={e.url} target="_blank" rel="noreferrer">
                        {e.name}
                      </a>
                    </span>
                  ))}
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
