import type { Arc } from '~/lib/types';

/**
 * Arcos narrativos de Hunter x Hunter.
 * Los rangos de capitulo/episodio son aproximados y estan pensados como guia
 * de lectura, no como indice oficial.
 */
export const arcos: Arc[] = [
  {
    slug: 'examen-del-cazador',
    name: 'Examen del Cazador',
    order: 1,
    mangaChapters: 'Capítulos 1–66',
    animeEpisodes2011: 'Episodios 1–21',
    tagline: 'Cuatro desconocidos, una prueba que casi nadie sobrevive.',
    summary:
      'Gon Freecss abandona la Isla Ballena para encontrar a su padre, un Cazador legendario que lo dejó al cuidado de su tía Mito. En el camino conoce a Kurapika, Leorio y Killua, y los cuatro se presentan a un examen anual con una tasa de aprobación cercana a cero. La prueba no mide solo fuerza: mide resistencia, criterio y la disposición a decidir qué se está dispuesto a perder.',
    keyPoints: [
      'La carrera interminable de Satotz y la prueba culinaria de Menchi filtran a los aspirantes antes de cualquier combate.',
      'Killua abandona el examen tras matar a Bodoro bajo la presión de su hermano Illumi.',
      'Hisoka perdona la vida de Gon y le pone una fecha: volverá a buscarlo cuando merezca la pena.',
      'Kurapika revela su motivo real para hacerse Cazador: los Ojos Escarlata robados a su clan.',
    ],
    characterSlugs: ['gon-freecss', 'killua-zoldyck', 'kurapika', 'leorio-paradinight', 'hisoka-morow', 'satotz', 'menchi', 'tonpa', 'hanzou', 'illumi-zoldyck'],
    color: '#3fa34d',
  },
  {
    slug: 'familia-zoldyck',
    name: 'Familia Zoldyck',
    order: 2,
    mangaChapters: 'Capítulos 67–71',
    animeEpisodes2011: 'Episodios 22–26',
    tagline: 'Rescatar a un amigo de su propia casa.',
    summary:
      'Gon, Kurapika y Leorio viajan a la montaña Kukuroo para sacar a Killua de la mansión donde se le entrenó como asesino desde que nació. El arco funciona como retrato de la familia Zoldyck: un linaje que trata el asesinato como oficio hereditario y el afecto como una forma de propiedad.',
    keyPoints: [
      'La Puerta del Ensayo pesa varias toneladas: cuánto abres mide tu fuerza real.',
      'Canary, guardiana del portón, deja pasar a Gon tras comprobar que no se rendirá.',
      'Silva y Zeno negocian con Illumi la salida de Killua: la única condición es que vuelva si se le llama.',
      'Killua elige por primera vez algo que no le fue asignado: irse con sus amigos.',
    ],
    characterSlugs: ['killua-zoldyck', 'silva-zoldyck', 'zeno-zoldyck', 'illumi-zoldyck', 'milluki-zoldyck', 'kalluto-zoldyck', 'canary', 'gon-freecss'],
    color: '#6c5ce7',
  },
  {
    slug: 'torre-celestial',
    name: 'Torre Celestial',
    order: 3,
    mangaChapters: 'Capítulos 72–84',
    animeEpisodes2011: 'Episodios 27–36',
    tagline: 'El arco donde la serie explica sus propias reglas.',
    summary:
      'En una torre de 251 pisos donde se combate por dinero y prestigio, Gon y Killua descubren que todos los luchadores del piso 200 comparten un secreto: el Nen. Wing los instruye a la fuerza para evitar que mueran, y la serie cambia de género: de aventura juvenil a sistema de poder con reglas estrictas y costes reales.',
    keyPoints: [
      'Wing enseña los Cuatro Principios: Ten, Zetsu, Ren y Hatsu.',
      'La adivinación del agua determina la categoría de Nen de cada persona.',
      'Gon pierde contra Hisoka pero le devuelve la placa: la deuda queda saldada.',
      'Killua abandona su combate contra Gido al reconocer el condicionamiento que Illumi le implantó.',
    ],
    characterSlugs: ['gon-freecss', 'killua-zoldyck', 'wing', 'zushi', 'hisoka-morow', 'gido', 'sadaso', 'riehlvelt'],
    color: '#0984e3',
  },
  {
    slug: 'yorknew-city',
    name: 'Yorknew City',
    order: 4,
    mangaChapters: 'Capítulos 85–120',
    animeEpisodes2011: 'Episodios 37–58',
    tagline: 'La subasta, la mafia y la Brigada Fantasma.',
    summary:
      'Kurapika entra como guardaespaldas de la familia Nostrade para acercarse a los Ojos Escarlata que se subastan cada septiembre. En la misma ciudad, la Brigada Fantasma —la banda que masacró a su clan— asalta la subasta. El arco entrelaza venganza, economía criminal y un duelo de información donde ganar depende de qué sabe cada bando y de qué está dispuesto a sacrificar.',
    keyPoints: [
      'Kurapika materializa las Cadenas del Juicio: solo funcionan contra la Brigada, y le cuestan la vida si rompe la condición.',
      'Uvogin cae ante Kurapika, la primera baja real de la Brigada.',
      'Pakunoda se suicida cumpliendo un contrato de Nen para proteger a sus compañeros.',
      'Chrollo queda sellado y sin Nen; la Brigada se disuelve temporalmente.',
    ],
    characterSlugs: ['kurapika', 'chrollo-lucilfer', 'uvogin', 'pakunoda', 'machi-komacine', 'nobunaga-hazama', 'feitan-portor', 'phinks-magcub', 'shizuku-murasaki', 'shalnark-ryuseih', 'senritsu', 'basho', 'squala', 'light-nostrade'],
    color: '#d63031',
  },
  {
    slug: 'isla-codiciada',
    name: 'Isla Codiciada (Greed Island)',
    order: 5,
    mangaChapters: 'Capítulos 121–185',
    animeEpisodes2011: 'Episodios 59–75',
    tagline: 'Un videojuego hecho con Nen, con muertes que no tienen "continuar".',
    summary:
      'Gon y Killua entran en Greed Island, un juego creado por Ging y sus compañeros donde el objetivo es reunir 100 cartas de hechizo. Dentro conocen a Biscuit Krueger, que los somete a un entrenamiento brutal, y se enfrentan a Genthru, un jugador que gana eliminando a los demás. Es el arco donde ambos protagonistas pasan de talento bruto a competencia técnica.',
    keyPoints: [
      'Biscuit enseña Ryu y la administración de aura entre ataque y defensa.',
      'Gon desarrolla Jajanken (piedra, papel o tijera) a partir de su Reforzamiento.',
      'Killua perfecciona Kanmuru y su velocidad eléctrica.',
      'La isla resulta ser un lugar físico real, no un servidor: todo se sostiene con Nen.',
    ],
    characterSlugs: ['gon-freecss', 'killua-zoldyck', 'biscuit-krueger', 'genthru', 'razor', 'hisoka-morow', 'ging-freecss'],
    color: '#e17055',
  },
  {
    slug: 'hormigas-quimera',
    name: 'Hormigas Quimera',
    order: 6,
    mangaChapters: 'Capítulos 186–318',
    animeEpisodes2011: 'Episodios 76–136',
    tagline: 'El arco más largo y el más oscuro de la obra.',
    summary:
      'Una reina Hormiga Quimera llega a la costa de la República de Mitene y empieza a devorar humanos para engendrar una casta de soldados con memoria y Nen. De ahí nace Meruem, el Rey. La Asociación de Cazadores envía un equipo reducido y la historia deja de tratar sobre quién gana: trata sobre qué queda de una persona después de ganar.',
    keyPoints: [
      'Kite muere ante Neferpitou; Gon convierte esa muerte en una obsesión que lo destruye.',
      'Meruem aprende humanidad jugando al Gungi con Komugi, una niña ciega campeona del juego.',
      'Netero se inmola con la Rosa Pobre tras agotar la Plegaria de los Cien Tipos.',
      'Gon sacrifica todo su potencial futuro para matar a Pitou; Killua recurre a Alluka para salvarlo.',
    ],
    characterSlugs: ['meruem', 'komugi', 'neferpitou', 'shaiapouf', 'menthuthuyoupi', 'isaac-netero', 'kite', 'knuckle-bine', 'shoot-mcmahon', 'morel-mackernasey', 'palm-siberia', 'knov', 'ikalgo', 'meleoron', 'welfin', 'cheetu', 'zazan', 'colt', 'gon-freecss', 'killua-zoldyck', 'alluka-zoldyck'],
    color: '#8e44ad',
  },
  {
    slug: 'eleccion-del-presidente',
    name: 'Elección del 13.º Presidente',
    order: 7,
    mangaChapters: 'Capítulos 319–339',
    animeEpisodes2011: 'Episodios 137–148',
    tagline: 'Política interna de la Asociación y el reencuentro con Ging.',
    summary:
      'Muerto Netero, los Zodiacos convocan una elección para sustituirlo mientras Killua corre contrarreloj para sacar a Alluka de la mansión Zoldyck y curar a Gon. La trama política de Pariston y la trama íntima de los dos protagonistas se cierran a la vez, y el anime de 2011 termina con la conversación entre Gon y Ging en el Árbol del Mundo.',
    keyPoints: [
      'Los Zodiacos, doce Cazadores nombrados por signos, dirigen la Asociación bajo Netero.',
      'Pariston gana la elección y dimite de inmediato: solo le interesaba el juego.',
      'Nanika concede el deseo de Killua y restaura a Gon, que pierde su Nen.',
      'Ging habla a Gon del Continente Oscuro y le da la lección final: disfruta del camino, no del destino.',
    ],
    characterSlugs: ['killua-zoldyck', 'alluka-zoldyck', 'gon-freecss', 'ging-freecss', 'pariston-hill', 'cheadle-yorkshire', 'leorio-paradinight', 'kurapika'],
    color: '#00b894',
  },
  {
    slug: 'continente-oscuro',
    name: 'Continente Oscuro y Guerra de Sucesión',
    order: 8,
    mangaChapters: 'Capítulos 340 en adelante',
    animeEpisodes2011: 'Sin adaptar',
    tagline: 'El arco que solo existe en el manga.',
    summary:
      'Beyond Netero organiza una expedición al Continente Oscuro, la masa de tierra real de la que el mundo conocido es apenas un apéndice. A bordo del navío Black Whale se libra a la vez una guerra de sucesión entre los catorce príncipes de Kakin, cada uno protegido por una Bestia Guardiana de Nen. Kurapika, Leorio y los Zodiacos quedan atrapados en medio.',
    keyPoints: [
      'Cinco calamidades del Continente Oscuro fueron traídas al mundo conocido en expediciones previas.',
      'La sucesión de Kakin es un ritual de Nen: solo puede quedar un príncipe vivo.',
      'Kurapika enseña Nen a contrarreloj mientras se le agota el tiempo de vida.',
      'El manga avanza en tandas irregulares debido a la salud del autor.',
    ],
    characterSlugs: ['kurapika', 'leorio-paradinight', 'hisoka-morow', 'chrollo-lucilfer', 'pariston-hill', 'cheadle-yorkshire'],
    color: '#2d3436',
  },
];

export const arcosBySlug = new Map(arcos.map((arc) => [arc.slug, arc]));
