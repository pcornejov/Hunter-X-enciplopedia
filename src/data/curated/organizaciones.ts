import type { Organization } from '~/lib/types';

/** Facciones y grupos que estructuran el mundo de la obra. */
export const organizaciones: Organization[] = [
  {
    slug: 'asociacion-de-cazadores',
    name: 'Asociación de Cazadores',
    japanese: 'ハンター協会',
    kind: 'Institución',
    description:
      'Organismo independiente que examina, licencia y protege a los Cazadores. Su licencia abre fronteras, archivos clasificados y crédito ilimitado, y por eso mismo es uno de los objetos más falsificados del mundo. Fue dirigida durante más de un siglo por Isaac Netero.',
    facts: [
      'El examen se convoca una vez al año y su tasa de aprobación ronda el cero.',
      'La licencia se puede vender, pero solo funciona una vez con el escáner biométrico.',
      'Existen especialidades: Cazador de Ruinas, de Bestias, de Virus, Gourmet, de Cabezas.',
      'Tras la muerte de Netero, la sucesión se decide por votación entre los Zodiacos.',
    ],
    characterSlugs: ['isaac-netero', 'pariston-hill', 'cheadle-yorkshire', 'ging-freecss', 'satotz', 'menchi'],
  },
  {
    slug: 'zodiacos',
    name: 'Los Zodiacos',
    japanese: '十二支ん',
    kind: 'Cúpula',
    description:
      'Doce Cazadores de élite elegidos personalmente por Netero, cada uno asociado a un signo del zodiaco chino y con un rol operativo dentro de la Asociación. Funcionan como consejo de dirección y, tras la muerte del presidente, como comité electoral.',
    facts: [
      'Cada miembro adopta un apodo y una estética ligada a su signo.',
      'Ging ocupaba el puesto de Cerdo antes de dimitir.',
      'Leorio entra en la organización durante la elección presidencial.',
      'Pariston, el Ratón, gana la presidencia solo para renunciar acto seguido.',
    ],
    characterSlugs: ['pariston-hill', 'cheadle-yorkshire', 'ging-freecss', 'leorio-paradinight'],
  },
  {
    slug: 'brigada-fantasma',
    name: 'Brigada Fantasma (Genei Ryodan)',
    japanese: '幻影旅団',
    kind: 'Banda criminal',
    description:
      'Trece ladrones nacidos en Meteor City, la ciudad-vertedero donde no existen registros civiles. Roban, matan y se mueven como una sola unidad bajo Chrollo Lucilfer. Su marca es una araña de doce patas con un número asignado a cada miembro.',
    facts: [
      'Su regla fundacional: la araña sobrevive aunque muera cualquiera de sus patas, incluida la cabeza.',
      'Masacraron al clan Kurta por sus Ojos Escarlata, lo que convierte a Kurapika en su enemigo declarado.',
      'Chrollo puede robar la habilidad de Nen de otra persona con su libro Bandit\'s Secret.',
      'Hisoka se infiltró en la banda con el único objetivo de pelear contra Chrollo.',
    ],
    characterSlugs: ['chrollo-lucilfer', 'hisoka-morow', 'machi-komacine', 'uvogin', 'pakunoda', 'feitan-portor', 'phinks-magcub', 'shizuku-murasaki', 'shalnark-ryuseih', 'nobunaga-hazama', 'franklin-bordeaux', 'kortopi', 'bonolenov-ndongo', 'kalluto-zoldyck'],
  },
  {
    slug: 'familia-zoldyck',
    name: 'Familia Zoldyck',
    japanese: 'ゾルディック家',
    kind: 'Linaje de asesinos',
    description:
      'La familia de asesinos más cara y respetada del mundo, instalada en la montaña Kukuroo con una finca del tamaño de una ciudad. Entrenan a sus hijos desde el nacimiento con tolerancia a venenos, electricidad y dolor, y tratan la sucesión como un asunto de negocio.',
    facts: [
      'La Puerta del Ensayo pesa desde 2 hasta 128 toneladas según cuántas hojas se abran.',
      'Killua fue designado heredero antes de escapar de casa.',
      'Alluka alberga a Nanika, una entidad capaz de conceder cualquier deseo a cambio de peticiones crecientes.',
      'Zeno y Silva aceptan contratos por separado y compiten por tarifa.',
    ],
    characterSlugs: ['killua-zoldyck', 'silva-zoldyck', 'zeno-zoldyck', 'illumi-zoldyck', 'milluki-zoldyck', 'kalluto-zoldyck', 'alluka-zoldyck', 'canary'],
  },
  {
    slug: 'hormigas-quimera',
    name: 'Hormigas Quimera',
    japanese: 'キメラ＝アント',
    kind: 'Especie',
    description:
      'Insectos que reproducen los rasgos de todo lo que la reina devora. Cuando la reina empieza a comer humanos, la colonia nace con inteligencia, lenguaje, memorias de vidas anteriores y capacidad de usar Nen. El resultado es Meruem, el Rey, y una crisis que la Asociación clasifica como amenaza de nivel A.',
    facts: [
      'La jerarquía va de obreras y soldados a Guardias Reales y Rey.',
      'Muchas hormigas conservan recuerdos fragmentarios de la persona que fueron.',
      'Los tres Guardias Reales —Neferpitou, Shaiapouf y Menthuthuyoupi— nacen ya con un poder desmedido.',
      'El Rey aprende de un juego de mesa y de una niña ciega más que de toda su corte.',
    ],
    characterSlugs: ['meruem', 'neferpitou', 'shaiapouf', 'menthuthuyoupi', 'komugi', 'colt', 'ikalgo', 'meleoron', 'welfin', 'cheetu', 'zazan'],
  },
  {
    slug: 'clan-kurta',
    name: 'Clan Kurta',
    japanese: 'クルタ族',
    kind: 'Pueblo',
    description:
      'Comunidad aislada cuyos ojos se vuelven de un rojo intenso cuando sus miembros sienten emociones fuertes. Esos Ojos Escarlata figuran entre los Siete Colores Humanos y alcanzan precios astronómicos en el mercado negro, lo que convirtió al clan en objetivo hasta su exterminio.',
    facts: [
      'La masacre ocurrió cuatro años antes del examen de Cazador.',
      'Kurapika es el único superviviente conocido.',
      'Los ojos conservan el color escarlata después de la muerte, algo excepcional.',
      'Recuperar cada par robado es el objetivo declarado de Kurapika.',
    ],
    characterSlugs: ['kurapika'],
  },
];

export const organizacionesBySlug = new Map(organizaciones.map((org) => [org.slug, org]));
