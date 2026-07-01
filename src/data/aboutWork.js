// Curated Spanish text for the "La Obra" page, since Jikan's synopsis and
// labels come in English. Structured facts (studio, episode count, dates)
// still come live from the API; only the prose and labels are curated/translated.

export const animeSinopsis = [
  'Los Hunters son profesionales licenciados que se dedican a tareas peligrosas y especializadas: desde explorar territorios inexplorados hasta cazar criminales de máxima peligrosidad o localizar tesoros y especies desconocidas. Para convertirse en uno, primero hay que sobrevivir al brutal Examen Hunter.',
  'Gon Freecss, un niño criado en la isla Ballena, decide presentarse al examen al enterarse de que su padre Ging, a quien creía muerto, es en realidad un Hunter legendario. En el camino se cruza con Kurapika, Leorio y Killua, y juntos atraviesan pruebas, conspiraciones y enemigos que pondrán a prueba tanto su fuerza como su idea de qué significa ser un Hunter.',
];

export const mangaResumen = [
  'El manga de Yoshihiro Togashi se serializa desde 1998 en la revista Weekly Shōnen Jump y es conocido por sus largas pausas: el autor ha entrado en hiato en múltiples ocasiones por motivos de salud, lo que ha dejado la obra sin terminar durante años a la vez.',
];

const STATUS_TRANSLATIONS = {
  'Finished Airing': 'Finalizado',
  'Currently Airing': 'En emisión',
  'Not yet aired': 'Sin emitir',
  Publishing: 'En publicación',
  Finished: 'Finalizado',
  'On Hiatus': 'En pausa',
  Discontinued: 'Descontinuado',
};

const RELATION_TRANSLATIONS = {
  Adaptation: 'Adaptación',
  'Side Story': 'Historia paralela',
  'Alternative Version': 'Versión alternativa',
  Summary: 'Resumen',
  'Full Story': 'Historia completa',
  'Parent Story': 'Historia principal',
  Sequel: 'Secuela',
  Prequel: 'Precuela',
  'Spin-off': 'Spin-off',
  Character: 'Personaje compartido',
  Other: 'Otro',
};

export const translateStatus = (status) => STATUS_TRANSLATIONS[status] || status;
export const translateRelation = (relation) => RELATION_TRANSLATIONS[relation] || relation;

// Jikan date ranges look like "Oct 2, 2011 to Sep 24, 2014" or "Mar 3, 1998 to ?".
// This only swaps the English connector/placeholder, keeping the (already
// language-neutral) month abbreviations and numbers as-is.
export const translateDateRange = (dateString) =>
  dateString ? dateString.replace(' to ?', ' a la actualidad').replace(' to ', ' a ') : null;
