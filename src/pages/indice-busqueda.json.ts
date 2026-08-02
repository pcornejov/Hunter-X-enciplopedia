import type { APIRoute } from 'astro';

import { arcos } from '~/data/curated/arcos';
import { glosario } from '~/data/curated/glosario';
import { habilidades } from '~/data/curated/habilidades';
import { nenTypes } from '~/data/curated/nen';
import { organizaciones } from '~/data/curated/organizaciones';
import { allCharacters, allEpisodeSets, allSeries, charactersBySlug, getNenTypeForCharacter, getProfile } from '~/lib/data';
import { url } from '~/lib/paths';
import { slugifyTerm } from '~/lib/slug';

/**
 * Indice de busqueda global, generado en tiempo de build.
 *
 * Se sirve como JSON estatico y lo consume /buscar/. Mantenemos los campos al
 * minimo porque el fichero se descarga entero: titulo, subtitulo, tipo, texto
 * indexable y URL. Nada de descripciones completas.
 */

interface IndexEntry {
  /** Categoria, para agrupar y filtrar en la UI. */
  t: string;
  /** Titulo. */
  n: string;
  /** Subtitulo o contexto. */
  s: string;
  /** Texto indexable, ya en minusculas y sin acentos. */
  q: string;
  /** URL destino. */
  u: string;
}

/** Normaliza igual que el buscador del cliente, para que las comparaciones casen. */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function entry(t: string, n: string, s: string, extra: string, u: string): IndexEntry {
  return { t, n, s, q: normalize(`${n} ${s} ${extra}`), u };
}

export const GET: APIRoute = () => {
  const entries: IndexEntry[] = [];

  for (const character of allCharacters) {
    const profile = getProfile(character.slug);
    const nenType = getNenTypeForCharacter(character.slug);
    entries.push(
      entry(
        'Personaje',
        character.name,
        profile?.tagline ?? nenType?.name ?? character.summary.slice(0, 90),
        [character.nativeName ?? '', ...character.aliases, nenType?.name ?? '', profile?.hatsu ?? ''].join(' '),
        url(`personajes/${character.slug}`),
      ),
    );
  }

  for (const ability of habilidades) {
    const user = charactersBySlug.get(ability.userSlug);
    entries.push(
      entry(
        'Habilidad',
        ability.name,
        user ? `Hatsu de ${user.name}` : 'Habilidad de Nen',
        [ability.alias ?? '', ability.japanese ?? '', ability.description].join(' '),
        url('habilidades'),
      ),
    );
  }

  for (const arc of arcos) {
    entries.push(
      entry('Arco', arc.name, arc.tagline, [arc.summary, arc.mangaChapters, arc.animeEpisodes2011].join(' '), url(`arcos/${arc.slug}`)),
    );
  }

  for (const type of nenTypes) {
    entries.push(
      entry('Nen', type.name, `${type.romaji} · ${type.japanese}`, [type.description, type.waterDivination].join(' '), url(`nen#${type.slug}`)),
    );
  }

  for (const org of organizaciones) {
    entries.push(entry('Facción', org.name, org.kind, [org.japanese ?? '', org.description].join(' '), url(`organizaciones#${org.slug}`)));
  }

  for (const term of glosario) {
    entries.push(
      entry('Glosario', term.term, term.category, [term.japanese ?? '', term.definition].join(' '), url(`glosario#${slugifyTerm(term.term)}`)),
    );
  }

  for (const series of allSeries) {
    entries.push(
      entry(
        'Obra',
        series.title.display,
        `${series.formatLabel}${series.year ? ` · ${series.year}` : ''}`,
        [series.title.romaji ?? '', series.title.native ?? '', ...series.synonyms].join(' '),
        url(`series/${series.slug}`),
      ),
    );
  }

  for (const set of allEpisodeSets) {
    const series = allSeries.find((item) => item.anilistId === set.anilistId);
    if (!series) continue;
    for (const episode of set.episodes) {
      entries.push(
        entry(
          'Episodio',
          `${episode.number}. ${episode.title}`,
          series.title.display,
          [episode.nativeTitle ?? '', episode.synopsis.slice(0, 160)].join(' '),
          url(`episodios/${series.slug}#ep-${episode.number}`),
        ),
      );
    }
  }

  return new Response(JSON.stringify(entries), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
