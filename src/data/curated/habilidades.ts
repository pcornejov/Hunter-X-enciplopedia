/**
 * Catálogo de habilidades de Nen (Hatsu).
 *
 * Cada entrada recoge el nombre con el que se conoce la habilidad, quién la
 * usa, a qué categoría pertenece y —cuando la obra lo explicita— la condición
 * y el voto que la refuerzan. Ese último campo es lo que distingue una lista
 * de poderes de una explicación del sistema.
 */

export interface Ability {
  slug: string;
  name: string;
  japanese?: string;
  /** Traducción o nombre alternativo habitual. */
  alias?: string;
  /** Slug del personaje en characters.json. */
  userSlug: string;
  /** Slug de la categoría en curated/nen.ts. */
  nenType: string;
  description: string;
  /** Restricción autoimpuesta y su castigo, si la obra la detalla. */
  condition?: string;
  /** Arco donde se muestra por primera vez. */
  arcSlug: string;
  /** true si conocer la habilidad estropea una revelación importante. */
  spoiler?: boolean;
}

export const habilidades: Ability[] = [
  {
    slug: 'jajanken',
    name: 'Jajanken',
    japanese: 'ジャジャン拳',
    alias: 'Piedra, papel o tijera',
    userSlug: 'gon-freecss',
    nenType: 'reforzamiento',
    description:
      'Gon concentra aura durante el cántico y la libera en una de tres formas: Piedra, un puñetazo de Reforzamiento puro; Tijera, una hoja de Transformación; y Papel, un proyectil de Emisión.',
    condition:
      'Debe anunciar el movimiento en voz alta y completar el cántico. Avisar al rival de lo que va a hacer es exactamente lo que multiplica la potencia.',
    arcSlug: 'isla-codiciada',
  },
  {
    slug: 'cadenas-del-juicio',
    name: 'Cadenas del Juicio',
    japanese: '審判の鎖',
    alias: 'Judgment Chain',
    userSlug: 'kurapika',
    nenType: 'materializacion',
    description:
      'Clava un corazón de aura en el pecho del objetivo junto a una regla impuesta por Kurapika. Si el objetivo la incumple, la cadena le atraviesa el corazón.',
    condition:
      'Solo funciona contra miembros de la Brigada Fantasma. Usarla contra cualquier otra persona mata a Kurapika en el acto. A cambio, con los ojos escarlata accede a las seis categorías al 100 %.',
    arcSlug: 'yorknew-city',
  },
  {
    slug: 'cadena-sanadora',
    name: 'Cadena Sanadora',
    japanese: '癒しの親指',
    alias: 'Holy Chain',
    userSlug: 'kurapika',
    nenType: 'materializacion',
    description:
      'Una cruz de aura en el pulgar que cura heridas graves en cuestión de minutos. Es la única de sus cadenas pensada para no hacer daño.',
    arcSlug: 'yorknew-city',
  },
  {
    slug: 'bungee-gum',
    name: 'Bungee Gum',
    japanese: 'バンジーガム',
    userSlug: 'hisoka-morow',
    nenType: 'transformacion',
    description:
      'Convierte el aura en una sustancia que tiene a la vez las propiedades del chicle y de la goma: se pega, se estira y tira de vuelta. Hisoka la usa para atraer, atrapar y redirigir.',
    arcSlug: 'torre-celestial',
  },
  {
    slug: 'texture-surprise',
    name: 'Texture Surprise',
    japanese: 'ドッキリテクスチャー',
    userSlug: 'hisoka-morow',
    nenType: 'materializacion',
    description:
      'Falsifica la textura de superficies planas: piel, papel, tela. Permite ocultar heridas, falsificar mensajes y hacer creer que un miembro amputado sigue en su sitio.',
    arcSlug: 'yorknew-city',
  },
  {
    slug: 'bandits-secret',
    name: "Bandit's Secret",
    japanese: '盗賊の極意',
    alias: 'Skill Hunter',
    userSlug: 'chrollo-lucilfer',
    nenType: 'especializacion',
    description:
      'Un libro que roba la habilidad de otro usuario de Nen y la deja disponible para Chrollo mientras conserve el volumen.',
    condition:
      'Cuatro requisitos simultáneos: ver el Hatsu en acción, preguntar por él y recibir respuesta, tocar la palma del objetivo y completar todo en menos de una hora. Si el dueño muere, la habilidad se pierde.',
    arcSlug: 'yorknew-city',
  },
  {
    slug: 'narukami',
    name: 'Narukami',
    japanese: '雷神',
    alias: 'Dios del trueno',
    userSlug: 'killua-zoldyck',
    nenType: 'transformacion',
    description:
      'Killua transforma su aura en electricidad y la descarga sobre el objetivo. Años de tortura eléctrica en casa lo hicieron inmune a su propia habilidad.',
    arcSlug: 'isla-codiciada',
  },
  {
    slug: 'kanmuru',
    name: 'Kanmuru',
    japanese: '神速',
    alias: 'Velocidad divina',
    userSlug: 'killua-zoldyck',
    nenType: 'transformacion',
    description:
      'Recubre el cuerpo de electricidad y deja que los impulsos muevan los músculos antes que el propio pensamiento. Multiplica la velocidad de reacción a costa de un desgaste enorme.',
    arcSlug: 'hormigas-quimera',
  },
  {
    slug: 'agujas-illumi',
    name: 'Agujas de manipulación',
    userSlug: 'illumi-zoldyck',
    nenType: 'manipulacion',
    description:
      'Illumi clava agujas cargadas de aura que reescriben la conducta de la persona: la vuelven obediente, cambian su rostro o le implantan una orden permanente.',
    condition:
      'La aguja debe permanecer clavada. Retirarla devuelve el control, motivo por el que Killua tarda años en librarse de la suya.',
    arcSlug: 'examen-del-cazador',
  },
  {
    slug: 'plegaria-cien-tipos',
    name: 'Plegaria de los Cien Tipos a la Diosa de la Misericordia',
    japanese: '百式観音',
    userSlug: 'isaac-netero',
    nenType: 'reforzamiento',
    description:
      'Una estatua gigante de aura que golpea a la velocidad a la que Netero junta las manos en gesto de gratitud. Cuenta con cien formas distintas y una final, la Novena Puerta.',
    condition:
      'Nace de repetir un mismo movimiento diez mil veces al día durante cuatro años, hasta que la gratitud se volvió reflejo. El coste está pagado por adelantado.',
    arcSlug: 'hormigas-quimera',
  },
  {
    slug: 'big-bang-impact',
    name: 'Big Bang Impact',
    japanese: 'ビッグバンインパクト',
    userSlug: 'uvogin',
    nenType: 'reforzamiento',
    description:
      'Un puñetazo de Reforzamiento llevado al extremo, capaz de arrasar un terreno entero. Uvogin no necesita más habilidad que esta.',
    arcSlug: 'yorknew-city',
  },
  {
    slug: 'memory-bomb',
    name: 'Memory Bomb',
    japanese: '記憶弾',
    userSlug: 'pakunoda',
    nenType: 'especializacion',
    description:
      'Extrae recuerdos al tocar a alguien y puede transmitirlos disparándolos con una pistola de aura. Quien recibe la bala vive el recuerdo como propio.',
    arcSlug: 'yorknew-city',
  },
  {
    slug: 'nen-thread',
    name: 'Hilos de Nen',
    userSlug: 'machi-komacine',
    nenType: 'transformacion',
    description:
      'Hilos finísimos y casi indestructibles con los que Machi cose miembros amputados, ata a distancia y detecta mentiras por la tensión del hilo.',
    arcSlug: 'yorknew-city',
  },
  {
    slug: 'deep-purple',
    name: 'Deep Purple',
    japanese: 'ディープパープル',
    userSlug: 'morel-mackernasey',
    nenType: 'manipulacion',
    description:
      'Morel convierte el humo de su pipa en marionetas autónomas, muros y prisiones. Su versión Smoky Jail sella un área entera para que nadie entre ni salga.',
    arcSlug: 'hormigas-quimera',
  },
  {
    slug: 'hakoware',
    name: 'Hakoware',
    japanese: '天上不知唯我独損',
    alias: 'A.P.R. (Amortizing Power Redirector)',
    userSlug: 'knuckle-bine',
    nenType: 'emision',
    description:
      'Cada golpe de Knuckle se convierte en una deuda de aura con intereses que corren en tiempo real. Cuando la deuda supera el aura total del rival, este queda en Zetsu forzado durante treinta días.',
    condition:
      'Knuckle tiene que anunciar la habilidad y explicar cómo funciona. Es un método para ganar sin matar, deliberadamente.',
    arcSlug: 'hormigas-quimera',
  },
  {
    slug: 'wink-blue',
    name: 'Wink Blue',
    japanese: '憂いの真珠',
    alias: 'Perla de la melancolía',
    userSlug: 'palm-siberia',
    nenType: 'materializacion',
    description:
      'Un espejo que muestra en tiempo real a cualquier persona a la que Palm haya visto en persona. Convierte al equipo en el bando mejor informado del arco.',
    condition: 'Solo puede vigilar a alguien a quien haya mirado a los ojos previamente.',
    arcSlug: 'hormigas-quimera',
  },
  {
    slug: 'doctor-blythe',
    name: 'Doctor Blythe',
    japanese: 'お医者さんごっこ',
    userSlug: 'neferpitou',
    nenType: 'especializacion',
    description:
      'Una enfermera gigante de aura capaz de reconstruir cuerpos destrozados. Pitou la usa para reparar a Komugi y no puede moverse mientras la mantiene activa.',
    condition: 'Exige inmovilidad total del usuario mientras dura la operación.',
    arcSlug: 'hormigas-quimera',
  },
  {
    slug: 'terpsichora',
    name: 'Terpsichora',
    japanese: '黒魔の踊り子',
    alias: 'Bailarina de la magia negra',
    userSlug: 'neferpitou',
    nenType: 'manipulacion',
    description:
      'Manipula cuerpos —vivos o muertos— con hilos de aura, y también el suyo propio: Pitou puede seguir combatiendo después de morir.',
    arcSlug: 'hormigas-quimera',
    spoiler: true,
  },
  {
    slug: 'spiritual-message',
    name: 'Spiritual Message',
    japanese: '借りの意識',
    userSlug: 'shaiapouf',
    nenType: 'manipulacion',
    description:
      'Pouf divide su cuerpo en clones diminutos y esparce escamas que alteran el estado emocional de quien las inhala. Fragmentarse le cuesta capacidad de razonamiento.',
    arcSlug: 'hormigas-quimera',
  },
  {
    slug: 'rage-blast',
    name: 'Rage Blast',
    japanese: '怒りの爆発',
    userSlug: 'menthuthuyoupi',
    nenType: 'especializacion',
    description:
      'Youpi transforma su cuerpo en función de la ira que acumula: alas, brazos extensibles o una explosión de aura que arrasa el entorno.',
    arcSlug: 'hormigas-quimera',
  },
  {
    slug: 'metamorfosis-meruem',
    name: 'Metamorfosis',
    userSlug: 'meruem',
    nenType: 'especializacion',
    description:
      'El Rey absorbe el aura y las capacidades de otros usuarios de Nen al consumirlos, y su cuerpo se reconfigura para incorporarlas.',
    arcSlug: 'hormigas-quimera',
    spoiler: true,
  },
  {
    slug: 'countdown',
    name: 'Countdown',
    japanese: 'カウントダウン',
    userSlug: 'genthru',
    nenType: 'emision',
    description:
      'Planta una bomba de aura en el objetivo con una cuenta atrás visible. Solo Genthru puede desactivarla, y solo tocando a la víctima.',
    condition:
      'Debe explicar al objetivo cómo funciona la habilidad antes de activarla. La transparencia es justamente lo que la hace letal.',
    arcSlug: 'isla-codiciada',
  },
  {
    slug: 'little-flower',
    name: 'Little Flower',
    japanese: 'リトルフラワー',
    userSlug: 'genthru',
    nenType: 'emision',
    description: 'Una explosión concentrada que Genthru libera desde la palma al tocar al rival.',
    arcSlug: 'isla-codiciada',
  },
  {
    slug: 'nen-ball',
    name: 'Nen Ball',
    userSlug: 'razor',
    nenType: 'emision',
    description:
      'Razor lanza balones cargados de aura con fuerza suficiente para arrancar brazos. En Greed Island los usa en un partido de balón prisionero contra Gon y Killua.',
    arcSlug: 'isla-codiciada',
  },
  {
    slug: 'dragon-dive',
    name: 'Dragon Dive',
    japanese: '龍星群',
    userSlug: 'zeno-zoldyck',
    nenType: 'transformacion',
    description:
      'Una lluvia de dragones de aura que cae sobre un área amplia. Zeno la usa para arrasar un edificio entero durante la cacería de la Brigada.',
    arcSlug: 'yorknew-city',
  },
  {
    slug: 'magical-esthetician',
    name: 'Magical Esthetician',
    japanese: '魔法美容師',
    userSlug: 'biscuit-krueger',
    nenType: 'transformacion',
    description:
      'Un masaje de aura que repara músculos y tejidos durante la noche. Es lo que permite a Gon y Killua sobrevivir a su propio entrenamiento.',
    arcSlug: 'isla-codiciada',
  },
  {
    slug: 'crazy-slots',
    name: 'Crazy Slots',
    japanese: '気狂いピエロ',
    alias: 'Clown Fiesta',
    userSlug: 'kite',
    nenType: 'materializacion',
    description:
      'Una ruleta que entrega a Kite un arma al azar entre nueve posibles. No puede elegir cuál, y no puede volver a tirar hasta usarla.',
    condition: 'El arma la decide el azar. Renunciar al control es lo que dispara la potencia de cada resultado.',
    arcSlug: 'hormigas-quimera',
  },
  {
    slug: 'black-voice',
    name: 'Black Voice',
    japanese: '黒い声',
    alias: 'Autopilot',
    userSlug: 'shalnark-ryuseih',
    nenType: 'manipulacion',
    description:
      'Una antena que, clavada en el objetivo, permite a Shalnark controlarlo desde el móvil. Puede usarla sobre sí mismo para multiplicar sus capacidades.',
    condition: 'Autoaplicarse la antena le borra los recuerdos de lo que hizo mientras estuvo bajo su efecto.',
    arcSlug: 'yorknew-city',
  },
  {
    slug: 'blinky',
    name: 'Blinky',
    japanese: 'デメちゃん',
    alias: 'Deme-chan',
    userSlug: 'shizuku-murasaki',
    nenType: 'materializacion',
    description:
      'Una aspiradora viviente que engulle cualquier cosa que no esté viva ni sea Nen. Shizuku la usa para hacer desaparecer cadáveres y pruebas.',
    condition: 'No puede tragar seres vivos ni objetos creados con Nen, incluida ella misma.',
    arcSlug: 'yorknew-city',
  },
  {
    slug: 'gallery-fake',
    name: 'Gallery Fake',
    japanese: 'ギャラリーフェイク',
    userSlug: 'kortopi',
    nenType: 'materializacion',
    description:
      'Copia cualquier objeto que toque. La réplica dura veinticuatro horas y Kortopi puede sentir dónde está en todo momento.',
    condition: 'La copia se desvanece a las 24 horas y es indistinguible del original salvo por el aura.',
    arcSlug: 'yorknew-city',
  },
  {
    slug: 'god-accomplice',
    name: 'God\'s Accomplice',
    japanese: '神の共犯者',
    alias: 'Perfect Plan',
    userSlug: 'meleoron',
    nenType: 'especializacion',
    description:
      'Meleoron desaparece por completo —presencia, aura, olor— mientras contiene la respiración, y puede llevar consigo a quien esté tocando.',
    condition: 'Solo dura lo que aguante sin respirar, y el tiempo de recarga equivale al tiempo usado.',
    arcSlug: 'hormigas-quimera',
  },
  {
    slug: 'nanika',
    name: 'Nanika',
    japanese: 'ナニカ',
    userSlug: 'alluka-zoldyck',
    nenType: 'especializacion',
    description:
      'La entidad que habita en Alluka concede cualquier petición sin límite aparente. Después exige a quien pidió tres favores de dificultad creciente.',
    condition:
      'Negarse a un favor mata a quien lo rechazó y a la persona más cercana. Cuanto mayor el deseo, más graves los favores. Killua es la única excepción conocida.',
    arcSlug: 'eleccion-del-presidente',
    spoiler: true,
  },
];

export const habilidadesBySlug = new Map(habilidades.map((ability) => [ability.slug, ability]));

/** Habilidades atribuidas a un personaje concreto. */
export function habilidadesDe(slug: string): Ability[] {
  return habilidades.filter((ability) => ability.userSlug === slug);
}
