import type { NenPrinciple, NenType } from '~/lib/types';

/**
 * Las seis categorías de Nen, ordenadas como aparecen en el hexágono de
 * afinidad. `affinity` es la posición en ese hexágono (0–5) y sirve para
 * calcular la eficiencia entre categorías vecinas y opuestas.
 */
export const nenTypes: NenType[] = [
  {
    slug: 'reforzamiento',
    name: 'Reforzamiento',
    japanese: '強化系',
    romaji: 'Kyōka-kei',
    affinity: 0,
    color: '#e74c3c',
    description:
      'Amplifica las propiedades naturales de un objeto o del propio cuerpo. Es la categoría más directa y la que más rendimiento da con menos técnica, por lo que suele producir combatientes de choque.',
    strengths:
      'Ataque y defensa física sin necesidad de una habilidad elaborada. Un reforzador competente gana la mayoría de intercambios cuerpo a cuerpo por pura diferencia de materiales.',
    waterDivination: 'El agua del vaso se desborda.',
    characterSlugs: ['gon-freecss', 'uvogin', 'isaac-netero', 'biscuit-krueger'],
  },
  {
    slug: 'transformacion',
    name: 'Transformación',
    japanese: '変化系',
    romaji: 'Henka-kei',
    affinity: 1,
    color: '#f39c12',
    description:
      'Cambia las propiedades del aura para imitar otra sustancia: electricidad, goma, veneno. El aura no se convierte en la sustancia real, adopta su comportamiento.',
    strengths:
      'Versatilidad ofensiva y engaño. Suele ir de la mano de personalidades caprichosas o difíciles de leer.',
    waterDivination: 'El sabor del agua cambia.',
    characterSlugs: ['killua-zoldyck', 'hisoka-morow', 'machi-komacine'],
  },
  {
    slug: 'materializacion',
    name: 'Materialización',
    japanese: '具現化系',
    romaji: 'Gugenka-kei',
    affinity: 2,
    color: '#9b59b6',
    description:
      'Crea objetos físicos con aura. Lo creado existe de verdad: se puede tocar, pesa y puede ser visto por quien no maneja Nen si el usuario lo permite.',
    strengths:
      'Habilidades con reglas complejas y efectos permanentes. Exige imaginación disciplinada y mucha memoria.',
    waterDivination: 'Aparecen impurezas en el agua.',
    characterSlugs: ['kurapika', 'kortopi', 'shizuku-murasaki'],
  },
  {
    slug: 'especializacion',
    name: 'Especialización',
    japanese: '特質系',
    romaji: 'Tokushitsu-kei',
    affinity: 3,
    color: '#34495e',
    description:
      'Categoría comodín: cualquier cosa que no encaja en las otras cinco. No se puede entrenar para entrar en ella, aunque algunos materializadores y manipuladores derivan hacia aquí con el tiempo.',
    strengths:
      'Efectos únicos e irrepetibles, normalmente con condiciones severas. Es la categoría de los casos límite de la obra.',
    waterDivination: 'Ocurre cualquier otra cosa: la hoja desaparece, se mueve sola, el vaso cambia.',
    characterSlugs: ['chrollo-lucilfer', 'kurapika', 'pakunoda', 'alluka-zoldyck', 'meruem'],
  },
  {
    slug: 'manipulacion',
    name: 'Manipulación',
    japanese: '操作系',
    romaji: 'Sōsa-kei',
    affinity: 4,
    color: '#16a085',
    description:
      'Controla seres vivos u objetos. Casi siempre requiere una condición de activación: tocar al objetivo, cumplir un ritual, hacer una pregunta.',
    strengths:
      'Control del campo de batalla y de terceros. En manos de un estratega convierte a los aliados del rival en un problema para el rival.',
    waterDivination: 'La hoja sobre el agua se mueve.',
    characterSlugs: ['illumi-zoldyck', 'shalnark-ryuseih', 'shaiapouf', 'meruem'],
  },
  {
    slug: 'emision',
    name: 'Emisión',
    japanese: '放出系',
    romaji: 'Hōshutsu-kei',
    affinity: 5,
    color: '#2980b9',
    description:
      'Separa el aura del cuerpo sin que pierda intensidad. Cuanto mayor es la afinidad, más lejos puede proyectarse el aura antes de disiparse.',
    strengths:
      'Ataque a distancia y habilidades que operan lejos del usuario. Se combina bien con manipulación para tener control remoto real.',
    waterDivination: 'El color del agua cambia.',
    characterSlugs: ['leorio-paradinight', 'franklin-bordeaux', 'razor', 'genthru'],
  },
];

export const nenTypesBySlug = new Map(nenTypes.map((type) => [type.slug, type]));

/**
 * Eficiencia entre categorías según la distancia en el hexágono:
 * propia 100 %, adyacente 80 %, siguiente 60 %, opuesta 40 %.
 * Especialización es un caso aparte y no sigue la regla de forma simétrica.
 */
export function nenEfficiency(from: NenType, to: NenType): number {
  const distance = Math.min(
    Math.abs(from.affinity - to.affinity),
    6 - Math.abs(from.affinity - to.affinity),
  );
  return [100, 80, 60, 40][distance] ?? 40;
}

export const nenPrinciples: NenPrinciple[] = [
  {
    name: 'Ten',
    japanese: '纏',
    level: 'basico',
    description:
      'Mantener el aura pegada al cuerpo en lugar de dejar que se escape por los poros. Es la base de todo: sin Ten el aura se agota sola y el cuerpo envejece más rápido.',
  },
  {
    name: 'Zetsu',
    japanese: '絶',
    level: 'basico',
    description:
      'Cerrar por completo los poros de aura. Anula la presencia del usuario y acelera la recuperación, pero deja el cuerpo indefenso ante un ataque de Nen.',
  },
  {
    name: 'Ren',
    japanese: '練',
    level: 'basico',
    description:
      'Producir y acumular aura muy por encima del nivel de reposo. Es el estado de combate: cuanto más tiempo se sostiene el Ren, mayor la capacidad del usuario.',
  },
  {
    name: 'Hatsu',
    japanese: '発',
    level: 'basico',
    description:
      'La expresión personal del aura: la habilidad propia de cada usuario. Nace del carácter de la persona, y forzarla en contra de la propia naturaleza casi siempre sale mal.',
  },
  {
    name: 'Gyo',
    japanese: '凝',
    level: 'avanzado',
    description:
      'Concentrar aura en una parte del cuerpo. Aplicado a los ojos permite ver aura oculta, a costa de dejar el resto del cuerpo desprotegido.',
  },
  {
    name: 'In',
    japanese: '隠',
    level: 'avanzado',
    description:
      'Ocultar el aura para que no sea visible ni siquiera con Gyo. Es la técnica que convierte una habilidad conocida en una trampa.',
  },
  {
    name: 'En',
    japanese: '円',
    level: 'avanzado',
    description:
      'Extender el aura en una esfera alrededor del usuario y percibir todo lo que entra en ella. Un radio de 50 metros ya se considera excepcional.',
  },
  {
    name: 'Ken',
    japanese: '堅',
    level: 'avanzado',
    description:
      'Sostener el Ren de forma prolongada y uniforme sobre todo el cuerpo. Es la postura defensiva por defecto de un combatiente experimentado.',
  },
  {
    name: 'Kō',
    japanese: '硬',
    level: 'avanzado',
    description:
      'Volcar todo el aura disponible en un único punto combinando Ten, Zetsu, Ren, Hatsu y Gyo. Máximo poder ofensivo y máxima vulnerabilidad.',
  },
  {
    name: 'Ryu',
    japanese: '流',
    level: 'avanzado',
    description:
      'Redistribuir el aura en tiempo real entre las partes del cuerpo según haga falta atacar o defender. Es la habilidad que separa a un aficionado de un profesional.',
  },
  {
    name: 'Shu',
    japanese: '周',
    level: 'avanzado',
    description:
      'Extender las propiedades del aura a un objeto externo, como una espada o una caña de pescar, para que resista y golpee como si fuera parte del usuario.',
  },
];
