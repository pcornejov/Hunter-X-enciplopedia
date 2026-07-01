export const nenTypes = [
  {
    slug: 'potenciador',
    nombre: 'Potenciador (Enhancer)',
    lema: 'Simple, directo y devastador.',
    descripcion:
      'Refuerzan y fortalecen objetos o su propio cuerpo con su aura, aumentando su durabilidad y potencia sin alterar su naturaleza. Suelen ser luchadores directos, honestos y de gran fuerza bruta, aunque no siempre los más brillantes en estrategia.',
    ejemplosSlugs: ['gon-freecss', 'silva-zoldyck', 'isaac-netero'],
  },
  {
    slug: 'transmutador',
    nombre: 'Transmutador (Transmuter)',
    lema: 'Cambia la naturaleza del aura para imitar otra propiedad.',
    descripcion:
      'Cambian las propiedades de su aura para que se comporte como otra cosa: electricidad, goma, veneno, etc. Suelen ser personas de temperamento cambiante o con doble cara, reflejando la naturaleza dual de su Nen.',
    ejemplosSlugs: ['killua-zoldyck', 'hisoka-morow'],
  },
  {
    slug: 'conjurador',
    nombre: 'Conjurador (Conjurer)',
    lema: 'Materializa objetos y armas a partir del aura.',
    descripcion:
      'Crean objetos tangibles con su aura, desde armas hasta criaturas complejas, siempre que sigan reglas y restricciones claras (Nen Kizoku). Son metódicos y disciplinados, ya que su poder depende de la precisión de sus condiciones autoimpuestas.',
    ejemplosSlugs: ['kurapika', 'shizuku-murasaki'],
  },
  {
    slug: 'manipulador',
    nombre: 'Manipulador (Manipulator)',
    lema: 'Controla personas, animales u objetos mediante condiciones.',
    descripcion:
      'Controlan seres vivos u objetos imponiendo condiciones específicas para el control (por ejemplo, clavar una aguja o ganar una apuesta). Suelen ser calculadores, pacientes y meticulosos al diseñar las reglas de su dominio.',
    ejemplosSlugs: ['illumi-zoldyck', 'machi-komacine'],
  },
  {
    slug: 'emisor',
    nombre: 'Emisor (Emitter)',
    lema: 'Separa el aura del cuerpo y la proyecta a distancia.',
    descripcion:
      'Separan su aura del cuerpo y la lanzan o proyectan a distancia, permitiendo ataques a rango o la creación de entidades independientes. Suelen ser generosos y despreocupados, coherente con la idea de "soltar" su propia energía.',
    ejemplosSlugs: ['leorio-paradinight', 'shaiapouf'],
  },
  {
    slug: 'especializador',
    nombre: 'Especialista (Specialist)',
    lema: 'La categoría que no encaja en ninguna otra: habilidades únicas.',
    descripcion:
      'Poseen habilidades tan particulares que no encajan en ninguna de las otras cinco categorías: robo de habilidades ajenas, manipulación del espacio-tiempo, control de la suerte, etc. Es la categoría más rara y a menudo la más poderosa.',
    ejemplosSlugs: ['chrollo-lucilfer', 'meruem'],
  },
];

export const findNenTypeBySlug = (slug) => nenTypes.find((n) => n.slug === slug);
