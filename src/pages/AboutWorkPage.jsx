import { useEffect, useState } from 'react';
import {
  getAnimeInfo,
  getAnimeRelations,
  getMangaInfo,
  getAnimeThemes,
  getAnimeStaff,
  getAnimePictures,
  getAnimeStatistics,
  getAnimeEpisodes,
} from '../api/jikanApi';
import {
  animeSinopsis,
  mangaResumen,
  translateStatus,
  translateRelation,
  translateDateRange,
  filterKeyStaff,
  translateStaffRole,
  translateThemeString,
} from '../data/aboutWork';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBanner from '../components/ErrorBanner';
import ImageLightbox from '../components/ImageLightbox';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const STAT_LABELS = {
  watching: 'Viendo',
  completed: 'Completado',
  on_hold: 'En pausa',
  dropped: 'Abandonado',
  plan_to_watch: 'Planea verlo',
};

export default function AboutWorkPage() {
  useDocumentTitle('La Obra');
  const [anime, setAnime] = useState(null);
  const [relations, setRelations] = useState([]);
  const [manga, setManga] = useState(null);
  const [themes, setThemes] = useState(null);
  const [staff, setStaff] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const [episodes, setEpisodes] = useState(null);
  const [episodesOpen, setEpisodesOpen] = useState(false);
  const [episodesLoading, setEpisodesLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // allSettled (not all) so one source failing/rate-limited doesn't block
    // the others from rendering.
    async function load() {
      const results = await Promise.allSettled([
        getAnimeInfo(),
        getAnimeRelations(),
        getMangaInfo(),
        getAnimeThemes(),
        getAnimeStaff(),
        getAnimePictures(),
        getAnimeStatistics(),
      ]);
      if (cancelled) return;

      const [animeResult, relationsResult, mangaResult, themesResult, staffResult, picturesResult, statsResult] =
        results;
      if (animeResult.status === 'fulfilled') setAnime(animeResult.value);
      if (relationsResult.status === 'fulfilled') setRelations(relationsResult.value || []);
      if (mangaResult.status === 'fulfilled') setManga(mangaResult.value);
      if (themesResult.status === 'fulfilled') setThemes(themesResult.value);
      if (staffResult.status === 'fulfilled') setStaff(filterKeyStaff(staffResult.value));
      if (picturesResult.status === 'fulfilled') setPictures(picturesResult.value || []);
      if (statsResult.status === 'fulfilled') setStatistics(statsResult.value);

      const failed = results.find((r) => r.status === 'rejected');
      if (failed) setError(failed.reason.message);

      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleToggleEpisodes() {
    const opening = !episodesOpen;
    setEpisodesOpen(opening);

    if (opening && !episodes) {
      setEpisodesLoading(true);
      getAnimeEpisodes()
        .then(setEpisodes)
        .catch((err) => setError(err.message))
        .finally(() => setEpisodesLoading(false));
    }
  }

  const relatedAnime = relations
    .filter((r) => r.relation !== 'Adaptation')
    .map((r) => ({ relation: r.relation, entries: r.entry.filter((e) => e.type === 'anime') }))
    .filter((r) => r.entries.length > 0);

  return (
    <div className="container">
      <h1>La obra</h1>

      {lightboxImage && <ImageLightbox src={lightboxImage} alt="Imagen clave" onClose={() => setLightboxImage(null)} />}

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

          {pictures.length > 0 && (
            <div className="arc-card">
              <h2>Imágenes clave</h2>
              <div className="gallery-thumbs gallery-thumbs-large">
                {pictures.map((p) => {
                  const url = p.webp?.image_url || p.jpg?.image_url;
                  if (!url) return null;
                  return (
                    <img
                      key={url}
                      src={url}
                      alt=""
                      className="gallery-thumb gallery-thumb-large"
                      onClick={() => setLightboxImage(p.jpg?.large_image_url || url)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          <div className="arc-card">
            <h2>Episodios</h2>
            <button type="button" className="btn" onClick={handleToggleEpisodes}>
              {episodesOpen ? 'Ocultar episodios' : 'Ver los 148 episodios'}
            </button>
            {episodesOpen && (
              <div className="episode-list">
                {episodesLoading ? (
                  <LoadingSpinner label="Cargando episodios..." />
                ) : (
                  episodes?.map((ep) => (
                    <div className="episode-item" key={ep.mal_id}>
                      <span className="episode-number">#{ep.mal_id}</span>
                      <span className="episode-title">{ep.title}</span>
                      <span className="episode-date">{ep.aired ? new Date(ep.aired).toLocaleDateString('es') : ''}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {statistics && (
            <div className="arc-card">
              <h2>Estadísticas de audiencia (MyAnimeList)</h2>
              {Object.entries(STAT_LABELS).map(([key, label]) => {
                const value = statistics[key] ?? 0;
                const percentage = statistics.total ? Math.round((value / statistics.total) * 100) : 0;
                return (
                  <div className="stat-row" key={key}>
                    <span className="stat-label">{label}</span>
                    <div className="stat-bar-track">
                      <div className="stat-bar-fill" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="stat-value">{value.toLocaleString('es')}</span>
                  </div>
                );
              })}

              <h4>Distribución de puntajes</h4>
              {statistics.scores
                ?.slice()
                .reverse()
                .map((s) => (
                  <div className="stat-row" key={s.score}>
                    <span className="stat-label">{s.score}</span>
                    <div className="stat-bar-track">
                      <div className="stat-bar-fill" style={{ width: `${s.percentage}%` }} />
                    </div>
                    <span className="stat-value">{s.percentage}%</span>
                  </div>
                ))}
            </div>
          )}

          {staff.length > 0 && (
            <div className="arc-card">
              <h2>Equipo</h2>
              <table className="info-table">
                <tbody>
                  {staff.map((s) => (
                    <tr key={s.person.mal_id}>
                      <td>{translateStaffRole(s.positions[0])}</td>
                      <td>{s.person.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {themes && (themes.openings?.length > 0 || themes.endings?.length > 0) && (
            <div className="arc-card">
              <h2>Bandas sonoras</h2>
              {themes.openings?.length > 0 && (
                <>
                  <h4>Openings</h4>
                  {themes.openings.map((t) => (
                    <p key={t}>{translateThemeString(t)}</p>
                  ))}
                </>
              )}
              {themes.endings?.length > 0 && (
                <>
                  <h4>Endings</h4>
                  {themes.endings.map((t) => (
                    <p key={t}>{translateThemeString(t)}</p>
                  ))}
                </>
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
