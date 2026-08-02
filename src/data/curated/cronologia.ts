/**
 * Cronología interna de la obra y cronología de publicación.
 * Los años internos usan el calendario de la serie, donde el examen de Cazador
 * al que se presenta Gon ocurre en el año 287.
 */

export interface TimelineEvent {
  /** Etiqueta temporal tal como se muestra (año interno o fecha real). */
  when: string;
  title: string;
  detail: string;
  /** Arco al que pertenece, si aplica. */
  arcSlug?: string;
  kind: 'historia' | 'publicacion';
}

export const cronologia: TimelineEvent[] = [
  {
    when: 'Año 267',
    title: 'Nace Ging Freecss',
    detail:
      'El futuro Cazador Doble Estrella y padre de Gon. Su carrera define buena parte de lo que el resto de personajes persigue.',
    kind: 'historia',
  },
  {
    when: 'Año 283',
    title: 'Masacre del clan Kurta',
    detail:
      'La Brigada Fantasma extermina a los Kurta y se lleva sus Ojos Escarlata. Kurapika, ausente ese día, es el único superviviente conocido.',
    arcSlug: 'yorknew-city',
    kind: 'historia',
  },
  {
    when: 'Año 287 · enero',
    title: 'Gon deja la Isla Ballena',
    detail:
      'Tras pescar al Señor del Lago y ganarse el permiso de Mito, Gon parte a presentarse al examen de Cazador.',
    arcSlug: 'examen-del-cazador',
    kind: 'historia',
  },
  {
    when: 'Año 287 · enero–marzo',
    title: 'Examen de Cazador',
    detail:
      'Gon, Killua, Kurapika y Leorio superan las fases del examen. Killua es descalificado tras matar a Bodoro.',
    arcSlug: 'examen-del-cazador',
    kind: 'historia',
  },
  {
    when: 'Año 287 · marzo',
    title: 'Asalto a la montaña Kukuroo',
    detail: 'El grupo entra en la finca Zoldyck para sacar a Killua. Silva acepta dejarlo marchar.',
    arcSlug: 'familia-zoldyck',
    kind: 'historia',
  },
  {
    when: 'Año 287 · abril–agosto',
    title: 'Torre Celestial y despertar del Nen',
    detail:
      'Wing instruye a Gon y Killua en los Cuatro Principios. Gon pierde ante Hisoka en el piso 200.',
    arcSlug: 'torre-celestial',
    kind: 'historia',
  },
  {
    when: 'Año 287 · septiembre',
    title: 'Subasta de Yorknew City',
    detail:
      'La Brigada Fantasma asalta la subasta. Kurapika mata a Uvogin y sella el Nen de Chrollo. Pakunoda muere cumpliendo su contrato.',
    arcSlug: 'yorknew-city',
    kind: 'historia',
  },
  {
    when: 'Año 287 · octubre–diciembre',
    title: 'Greed Island',
    detail:
      'Gon y Killua entran en el juego, entrenan con Biscuit y derrotan a Genthru. Gon desarrolla el Jajanken.',
    arcSlug: 'isla-codiciada',
    kind: 'historia',
  },
  {
    when: 'Año 288',
    title: 'Crisis de las Hormigas Quimera',
    detail:
      'Nace Meruem. Kite muere ante Neferpitou. Netero se inmola con la Rosa Pobre. Gon quema su potencial para vengar a Kite.',
    arcSlug: 'hormigas-quimera',
    kind: 'historia',
  },
  {
    when: 'Año 288 · finales',
    title: 'Elección del 13.º Presidente',
    detail:
      'Pariston gana y dimite. Killua usa a Nanika para curar a Gon, que pierde su Nen. Gon habla por fin con Ging.',
    arcSlug: 'eleccion-del-presidente',
    kind: 'historia',
  },
  {
    when: 'Año 289',
    title: 'Expedición al Continente Oscuro',
    detail:
      'Beyond Netero parte en el Black Whale. A bordo estalla la guerra de sucesión entre los catorce príncipes de Kakin.',
    arcSlug: 'continente-oscuro',
    kind: 'historia',
  },

  // --- Publicación -------------------------------------------------------
  {
    when: 'Marzo de 1998',
    title: 'Primer capítulo en Weekly Shōnen Jump',
    detail: 'Yoshihiro Togashi inicia la serialización del manga en la revista de Shueisha.',
    kind: 'publicacion',
  },
  {
    when: 'Octubre de 1999',
    title: 'Primera adaptación al anime',
    detail: 'Nippon Animation estrena la serie de 62 episodios, que llega hasta el arco de Yorknew.',
    kind: 'publicacion',
  },
  {
    when: '2002–2004',
    title: 'OVAs de Yorknew y Greed Island',
    detail: 'Tres tandas de OVAs continúan la historia donde la serie de 1999 la dejó.',
    kind: 'publicacion',
  },
  {
    when: 'Octubre de 2011',
    title: 'Nueva adaptación de Madhouse',
    detail:
      'Se reinicia el anime desde el principio con 148 episodios, que cubren hasta la elección del presidente.',
    kind: 'publicacion',
  },
  {
    when: '2013',
    title: 'Dos películas',
    detail: 'Phantom Rouge y The Last Mission se estrenan en cines con historias originales.',
    kind: 'publicacion',
  },
  {
    when: '2018 en adelante',
    title: 'Publicación intermitente',
    detail:
      'El manga entra en pausas prolongadas por la salud del autor y avanza en tandas irregulares de capítulos.',
    kind: 'publicacion',
  },
];
