export const arcos = [
  {
    slug: 'examen-hunter',
    numero: 1,
    titulo: 'Examen Hunter',
    sinopsis:
      'Gon Freecss abandona la isla Ballena para presentarse al Examen Hunter, una prueba anual brutal que reduce a cientos de aspirantes a un puñado de nuevos Hunters. En el camino conoce a Kurapika, Leorio e Hisoka, y se enfrenta a pruebas de supervivencia, combate y astucia diseñadas por el examinador Netero y su comité.',
    personajesDestacadosSlugs: ['gon-freecss', 'killua-zoldyck', 'kurapika', 'leorio-paradinight', 'hisoka-morow', 'isaac-netero'],
  },
  {
    slug: 'zoldyck',
    numero: 2,
    titulo: 'Familia Zoldyck',
    sinopsis:
      'Tras el examen, Gon y sus amigos viajan a la mansión Zoldyck para recuperar a Killua, hijo de la legendaria familia de asesinos. Allí conocen las estrictas pruebas de seguridad de la mansión y a miembros de la familia como Silva e Illumi, que ponen a prueba la determinación de Killua para elegir su propio camino.',
    personajesDestacadosSlugs: [
      'killua-zoldyck',
      'gon-freecss',
      'silva-zoldyck',
      'illumi-zoldyck',
      'alluka-zoldyck',
      'zeno-zoldyck',
      'milluki-zoldyck',
      'kikyo-zoldyck',
    ],
  },
  {
    slug: 'heavens-arena',
    numero: 3,
    titulo: 'Heavens Arena',
    sinopsis:
      'Gon y Killua entrenan y ganan dinero escalando los pisos de la Torre del Cielo, una arena de combate de 251 niveles. Descubren el Nen de la mano de Wing y Zushi, y Gon se enfrenta en un combate decisivo contra Hisoka, quien despierta un interés obsesivo en el potencial del joven.',
    personajesDestacadosSlugs: ['gon-freecss', 'killua-zoldyck', 'hisoka-morow'],
  },
  {
    slug: 'yorknew-city',
    numero: 4,
    titulo: 'Yorknew City',
    sinopsis:
      'La Brigada Fantasma, un grupo de trece ladrones de rango S liderado por Chrollo Lucilfer, llega a Yorknew City para una subasta clandestina de ojos Escarlata, la reliquia sagrada del clan Kurta. Kurapika, único superviviente de su clan, jura vengarse usando su Nen de Cadenas para cazar y eliminar a los miembros de la Brigada uno por uno.',
    personajesDestacadosSlugs: [
      'kurapika',
      'chrollo-lucilfer',
      'hisoka-morow',
      'machi-komacine',
      'feitan-portor',
      'shizuku-murasaki',
      'uvogin',
      'nobunaga-hazama',
      'franklin-bordeau',
      'phinks-magcub',
      'shalnark',
      'pakunoda',
      'kortopi',
      'bonolenov-ndongo',
    ],
  },
  {
    slug: 'greed-island',
    numero: 5,
    titulo: 'Greed Island',
    sinopsis:
      'Gon y Killua entran en Greed Island, un videojuego de rol convertido en un mundo real y peligroso creado por Ging Freecss, para completarlo y obtener información sobre el paradero de Ging. Allí entrenan intensamente con Biscuit Krueger y se enfrentan a los Zorros de Hierro y otros cazadores de tarjetas hostiles como Genthru.',
    personajesDestacadosSlugs: ['gon-freecss', 'killua-zoldyck', 'biscuit-krueger', 'ging-freecss'],
  },
  {
    slug: 'hormiga-quimera',
    numero: 6,
    titulo: 'Hormiga Quimera',
    sinopsis:
      'Una especie de hormigas capaces de devorar humanos y heredar sus habilidades da origen a un Rey, Meruem, y a su Guardia Real: Neferpitou, Shaiapouf y Youpi. La Asociación Hunter, liderada por el presidente Netero, se moviliza para exterminar la amenaza antes de que la colonia arrase la humanidad, desatando algunas de las batallas más devastadoras de la serie.',
    personajesDestacadosSlugs: [
      'isaac-netero',
      'meruem',
      'neferpitou',
      'shaiapouf',
      'youpi',
      'gon-freecss',
      'killua-zoldyck',
      'komugi',
      'knuckle-bine',
      'morel-mackernasey',
    ],
  },
  {
    slug: 'eleccion-presidencial',
    numero: 7,
    titulo: 'Elección del 13º Presidente Hunter',
    sinopsis:
      'Tras la muerte de Netero, la Asociación Hunter debe elegir a su decimotercer presidente. Doce candidatos, cada uno con motivaciones y capacidades muy distintas, compiten en un proceso electoral cargado de política, manipulación de Nen y traiciones, mientras antiguos personajes reaparecen con nuevos objetivos.',
    personajesDestacadosSlugs: ['killua-zoldyck', 'illumi-zoldyck', 'pariston-hill', 'kalluto-zoldyck', 'zeno-zoldyck'],
  },
];

export const findArcoBySlug = (slug) => arcos.find((a) => a.slug === slug);
