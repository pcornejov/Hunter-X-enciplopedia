import type { GlossaryEntry } from '~/lib/types';

/** Términos recurrentes de la obra, ordenados alfabéticamente en la página. */
export const glosario: GlossaryEntry[] = [
  {
    term: 'Nen',
    japanese: '念',
    category: 'Sistema de poder',
    definition:
      'Técnica que permite controlar la energía vital del propio cuerpo, el aura. Se puede despertar mediante entrenamiento o por la vía rápida: recibir un golpe de aura que abre los poros a la fuerza, con riesgo de muerte.',
  },
  {
    term: 'Aura',
    japanese: 'オーラ',
    category: 'Sistema de poder',
    definition:
      'Energía vital que emana de todos los seres vivos por los poros de aura. Quien no la controla la pierde constantemente sin notarlo.',
  },
  {
    term: 'Hatsu',
    japanese: '発',
    category: 'Sistema de poder',
    definition:
      'La habilidad personal de cada usuario de Nen. Es la proyección de su carácter, y por eso resulta casi imposible copiar la habilidad de otro sin pagar un precio.',
  },
  {
    term: 'Adivinación del agua',
    japanese: '水見式',
    category: 'Sistema de poder',
    definition:
      'Prueba que revela la categoría de Nen de una persona: se aplica Ren sobre un vaso con agua y una hoja, y se observa qué cambia.',
  },
  {
    term: 'Condición y voto',
    japanese: '制約と誓約',
    category: 'Sistema de poder',
    definition:
      'Mecanismo central del Nen: imponerse restricciones severas multiplica el poder de una habilidad. Cuanto más grave el castigo por incumplir, mayor el refuerzo.',
  },
  {
    term: 'Licencia de Cazador',
    japanese: 'ハンターライセンス',
    category: 'Mundo',
    definition:
      'Credencial que acredita a un Cazador. Da acceso a zonas restringidas, archivos secretos y crédito prácticamente ilimitado. Es el objeto más valioso y más falsificado del mundo.',
  },
  {
    term: 'Ojos Escarlata',
    japanese: '緋の目',
    category: 'Mundo',
    definition:
      'Ojos del clan Kurta que se tiñen de rojo con la emoción intensa. Están catalogados entre los Siete Colores Humanos y motivaron el exterminio del clan.',
  },
  {
    term: 'Meteor City',
    japanese: '流星街',
    category: 'Mundo',
    definition:
      'Vertedero habitado por millones de personas sin registro oficial. No existen para ningún censo, lo que las vuelve imposibles de rastrear. Cuna de la Brigada Fantasma.',
  },
  {
    term: 'Greed Island',
    japanese: 'グリードアイランド',
    category: 'Mundo',
    definition:
      'Juego creado con Nen por Ging Freecss y otros diez colaboradores. Existe como isla física; los cartuchos solo sirven para entrar y salir de ella.',
  },
  {
    term: 'Continente Oscuro',
    japanese: '暗黒大陸',
    category: 'Mundo',
    definition:
      'Masa de tierra que rodea al mundo conocido y que lo supera muchas veces en tamaño. La Asociación prohibió su exploración tras las calamidades traídas por expediciones anteriores.',
  },
  {
    term: 'Gungi',
    japanese: '軍儀',
    category: 'Mundo',
    definition:
      'Juego de mesa originario de la República de Mitene, de complejidad enorme. Meruem lo usa como medida de inteligencia y termina aprendiendo de él algo que no esperaba.',
  },
  {
    term: 'Bestia Guardiana',
    japanese: '守護霊獣',
    category: 'Mundo',
    definition:
      'Criatura de Nen que protege a cada príncipe de Kakin durante la guerra de sucesión. Ninguna es visible para quien no maneja Nen, y todas actúan según reglas propias.',
  },
  {
    term: 'Nen post mortem',
    japanese: '死後の念',
    category: 'Sistema de poder',
    definition:
      'Aura que sigue actuando después de la muerte del usuario, normalmente alimentada por rencor. Es la forma más incontrolable y peligrosa del Nen.',
  },
  {
    term: 'Cadenas del Juicio',
    japanese: '審判の鎖',
    category: 'Habilidades',
    definition:
      'Habilidad de Kurapika que clava un corazón de aura en el pecho del objetivo y lo mata si incumple la condición impuesta. Solo funciona contra miembros de la Brigada Fantasma.',
  },
  {
    term: 'Jajanken',
    japanese: 'ジャジャン拳',
    category: 'Habilidades',
    definition:
      'Hatsu de Gon basado en piedra, papel o tijera: puño de Reforzamiento, proyectil de Emisión y corte de Transformación, anunciados siempre en voz alta.',
  },
  {
    term: 'Bandit\'s Secret',
    japanese: '盗賊の極意',
    category: 'Habilidades',
    definition:
      'Libro de Chrollo que roba la habilidad de otro usuario de Nen si se cumplen cuatro condiciones estrictas, entre ellas ver el Hatsu y preguntar por él en menos de una hora.',
  },
  {
    term: 'Rosa Pobre',
    japanese: '薔薇',
    category: 'Habilidades',
    definition:
      'Bomba miniaturizada que Netero lleva en el pecho como último recurso. No es Nen: es tecnología humana, y por eso el Rey no la ve venir.',
  },
];

/** Categorías presentes, en el orden en que queremos mostrarlas. */
export const glosarioCategorias = ['Sistema de poder', 'Habilidades', 'Mundo'] as const;
