// Each option is tagged with the Nen category (matching the slugs in
// src/data/nenTypes.js) it points toward. The category with the most
// answers wins; ties are broken by whichever appears first.
export const nenQuizQuestions = [
  {
    pregunta: 'Un amigo te pide ayuda con un problema urgente. ¿Qué haces?',
    opciones: [
      { texto: 'Voy directo a resolverlo con lo que tenga a mano.', tipo: 'potenciador' },
      { texto: 'Cambio de estrategia según lo que necesite en el momento.', tipo: 'transmutador' },
      { texto: 'Preparo con cuidado todo lo necesario antes de actuar.', tipo: 'conjurador' },
      { texto: 'Pienso en cómo convencer a otros de que ayuden también.', tipo: 'manipulador' },
      { texto: 'Delego en quien tenga más tiempo, pero me aseguro de que se resuelva.', tipo: 'emisor' },
      { texto: 'Encuentro una solución que nadie más habría considerado.', tipo: 'especializador' },
    ],
  },
  {
    pregunta: '¿Cómo te describirían tus amigos?',
    opciones: [
      { texto: 'Honesto y directo, sin vueltas.', tipo: 'potenciador' },
      { texto: 'Camaleónico, cambio según la situación.', tipo: 'transmutador' },
      { texto: 'Meticuloso y organizado.', tipo: 'conjurador' },
      { texto: 'Persuasivo, siempre consigo lo que quiero.', tipo: 'manipulador' },
      { texto: 'Generoso y desprendido.', tipo: 'emisor' },
      { texto: 'Impredecible, único en mi forma de ser.', tipo: 'especializador' },
    ],
  },
  {
    pregunta: 'En un videojuego cooperativo, ¿qué rol prefieres?',
    opciones: [
      { texto: 'Tanque, al frente de la batalla.', tipo: 'potenciador' },
      { texto: 'El que se adapta a cualquier clase según haga falta.', tipo: 'transmutador' },
      { texto: 'El que prepara con cuidado el equipo del grupo.', tipo: 'conjurador' },
      { texto: 'El estratega que da órdenes desde atrás.', tipo: 'manipulador' },
      { texto: 'El soporte que apoya a distancia.', tipo: 'emisor' },
      { texto: 'El que rompe las reglas del juego con builds raras.', tipo: 'especializador' },
    ],
  },
  {
    pregunta: '¿Qué es más importante para ti al resolver un conflicto?',
    opciones: [
      { texto: 'La fuerza y la determinación.', tipo: 'potenciador' },
      { texto: 'La flexibilidad para adaptarse.', tipo: 'transmutador' },
      { texto: 'Tener reglas claras que todos respeten.', tipo: 'conjurador' },
      { texto: 'Entender qué motiva a la otra persona.', tipo: 'manipulador' },
      { texto: 'Ceder algo propio para llegar a un acuerdo.', tipo: 'emisor' },
      { texto: 'Buscar una salida que nadie más vio.', tipo: 'especializador' },
    ],
  },
  {
    pregunta: 'Elige el lema que más te representa.',
    opciones: [
      { texto: '"Hazlo y ya."', tipo: 'potenciador' },
      { texto: '"Todo cambia, yo también."', tipo: 'transmutador' },
      { texto: '"Con reglas claras, todo es posible."', tipo: 'conjurador' },
      { texto: '"Quien entiende el juego, gana."', tipo: 'manipulador' },
      { texto: '"Lo que doy, vuelve."', tipo: 'emisor' },
      { texto: '"No encajo en ninguna caja."', tipo: 'especializador' },
    ],
  },
  {
    pregunta: '¿Qué buscas en un buen equipo de trabajo?',
    opciones: [
      { texto: 'Gente con energía y garra.', tipo: 'potenciador' },
      { texto: 'Gente que se adapte rápido a los cambios.', tipo: 'transmutador' },
      { texto: 'Procesos claros y bien definidos.', tipo: 'conjurador' },
      { texto: 'Un buen líder que sepa coordinar a todos.', tipo: 'manipulador' },
      { texto: 'Compañerismo y generosidad mutua.', tipo: 'emisor' },
      { texto: 'Alguien que aporte una perspectiva distinta.', tipo: 'especializador' },
    ],
  },
];

export function computeNenQuizResult(answers) {
  const counts = {};
  for (const tipo of answers) {
    counts[tipo] = (counts[tipo] || 0) + 1;
  }

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}
