/**
 * Fichas en español escritas para esta enciclopedia.
 *
 * Las APIs públicas solo devuelven texto en inglés, así que para el reparto
 * principal mantenemos una biografía propia. Los personajes que no están aquí
 * caen de vuelta a la descripción de AniList, señalizada como tal en la ficha.
 */

export interface CharacterProfile {
  /** Slug del personaje en src/data/generated/characters.json. */
  slug: string;
  /** Frase corta para tarjetas y listados. */
  tagline: string;
  /** Biografía en español, en párrafos separados por línea en blanco. */
  bio: string;
  /** Slug de la categoría de Nen en curated/nen.ts, si se conoce. */
  nenType?: string;
  /** Habilidad principal, tal como se nombra en la obra. */
  hatsu?: string;
  /** Slugs de organizaciones en curated/organizaciones.ts. */
  organizationSlugs?: string[];
  /** Arcos donde el personaje tiene peso real. */
  arcSlugs?: string[];
}

export const perfiles: CharacterProfile[] = [
  {
    slug: 'gon-freecss',
    tagline: 'El protagonista al que la determinación le sale más cara que a nadie.',
    bio: `Criado por su tía Mito en la Isla Ballena, Gon se hace Cazador para encontrar a Ging, el padre que lo abandonó. Su talento es desmedido —olfato, oído y fuerza muy por encima de lo humano— pero lo que lo define es una honestidad literal: dice exactamente lo que piensa y cumple exactamente lo que promete.

Esa misma rectitud es su problema. Gon no distingue entre "hacer lo correcto" y "hacer lo que él necesita", y cuando Kite muere convierte el duelo en una deuda que solo puede pagarse con violencia. En el arco de las Hormigas Quimera acepta un pacto consigo mismo: gastar todo su potencial futuro a cambio del poder necesario para vencer a Neferpitou. Gana, y el precio es su Nen.`,
    nenType: 'reforzamiento',
    hatsu: 'Jajanken (piedra, papel o tijera)',
    arcSlugs: ['examen-del-cazador', 'torre-celestial', 'isla-codiciada', 'hormigas-quimera'],
  },
  {
    slug: 'killua-zoldyck',
    tagline: 'Un asesino de doce años aprendiendo a tener amigos.',
    bio: `Tercer hijo de los Zoldyck y heredero designado, Killua fue entrenado desde antes de saber hablar: resistencia a venenos, a la electricidad y al dolor, además de una técnica de asesinato que ejecuta sin pensar. Se presenta al examen de Cazador por aburrimiento y sale de él con algo que no tenía previsto: un amigo.

Su arco es el de alguien que desmonta su propio condicionamiento. Illumi le implantó la orden de huir de cualquier enemigo más fuerte, y Killua tarda años en identificarla y arrancársela. En la elección presidencial abandona a Gon para acompañar a Alluka, su hermana, en la primera decisión que toma pensando en alguien distinto de Gon o de sí mismo.`,
    nenType: 'transformacion',
    hatsu: 'Aura eléctrica: Narukami, Kanmuru',
    organizationSlugs: ['familia-zoldyck'],
    arcSlugs: ['examen-del-cazador', 'familia-zoldyck', 'torre-celestial', 'isla-codiciada', 'hormigas-quimera', 'eleccion-del-presidente'],
  },
  {
    slug: 'kurapika',
    tagline: 'El último Kurta, con una fecha de caducidad autoimpuesta.',
    bio: `Único superviviente de la masacre de su clan, Kurapika se hace Cazador para recuperar los Ojos Escarlata de los suyos y acabar con la Brigada Fantasma. Es el personaje más disciplinado de la obra y el que peor gestiona su propia ira: sus ojos se vuelven escarlata cuando pierde el control, y en ese estado su Nen se dispara.

Su habilidad es un ejemplo de manual del principio de condición y voto. Restringe sus cadenas a los miembros de la Brigada y acepta morir si las usa contra cualquier otra persona; a cambio obtiene acceso a las seis categorías de Nen mientras tiene los ojos rojos. En el arco del Continente Oscuro añade una segunda condición todavía peor: cada minuto de uso le cuesta una hora de vida.`,
    nenType: 'materializacion',
    hatsu: 'Cadenas del Juicio, Cadena Sanadora, Dedo Robot',
    organizationSlugs: ['clan-kurta', 'zodiacos'],
    arcSlugs: ['examen-del-cazador', 'yorknew-city', 'continente-oscuro'],
  },
  {
    slug: 'leorio-paradinight',
    tagline: 'Quiere ser médico y necesita el dinero para conseguirlo.',
    bio: `Leorio se presenta como un mercenario que solo persigue dinero, y tarda poco en admitir la verdad: quiere estudiar medicina porque un amigo suyo murió de una enfermedad tratable que su familia no podía pagar. Es el único del grupo sin talento sobrenatural y el único adulto funcional entre los protagonistas.

Su papel crece en la elección presidencial: entra en los Zodiacos, se enfrenta públicamente a Ging y demuestra un Hatsu de Emisión tan sencillo como eficaz —golpear a distancia a través de un portal—. Es también el nexo emocional del grupo, el que llama cuando nadie más llama.`,
    nenType: 'emision',
    hatsu: 'Puño de Emisión a distancia',
    organizationSlugs: ['zodiacos'],
    arcSlugs: ['examen-del-cazador', 'eleccion-del-presidente', 'continente-oscuro'],
  },
  {
    slug: 'hisoka-morow',
    tagline: 'Cultiva rivales como quien cultiva fruta: para comerlos maduros.',
    bio: `Hisoka es un combatiente sin bando que mide a la gente por el potencial que podrá tener dentro de unos años. Perdona la vida de Gon y Killua en el examen porque son "fruta verde", y se une a la Brigada Fantasma únicamente para acercarse a Chrollo.

Su Nen es engañosamente simple: Bungee Gum le da al aura las propiedades de la goma y el chicle, y Texture Surprise le permite falsificar texturas planas. Lo peligroso no es la habilidad, sino la disciplina con la que la usa: casi todas sus victorias se explican por información oculta y no por fuerza.`,
    nenType: 'transformacion',
    hatsu: 'Bungee Gum, Texture Surprise',
    organizationSlugs: ['brigada-fantasma'],
    arcSlugs: ['examen-del-cazador', 'torre-celestial', 'yorknew-city', 'continente-oscuro'],
  },
  {
    slug: 'chrollo-lucilfer',
    tagline: 'El líder que sostiene que la araña sobrevive sin cabeza.',
    bio: `Nacido en Meteor City, Chrollo fundó la Brigada Fantasma y la dirige con una mezcla de carisma y frialdad absoluta. Roba obras de arte y mata sin alterarse, pero pone a sus compañeros por encima de sí mismo hasta el punto de ordenar que lo abandonen si estorba.

Su Hatsu, Bandit's Secret, roba habilidades ajenas y las guarda en un libro, siempre bajo cuatro condiciones estrictas. Kurapika lo neutraliza en Yorknew sellándole el Nen, y buena parte de su trama posterior consiste en recuperar esa capacidad.`,
    nenType: 'especializacion',
    hatsu: "Bandit's Secret (Skill Hunter)",
    organizationSlugs: ['brigada-fantasma'],
    arcSlugs: ['yorknew-city', 'continente-oscuro'],
  },
  {
    slug: 'illumi-zoldyck',
    tagline: 'El hermano mayor que confunde control con cariño.',
    bio: `Illumi es el hijo mayor de los Zoldyck y el asesino más metódico de la familia. Manipula a las personas clavándoles agujas que reescriben su conducta, y usó ese método sobre su propio hermano: la orden de huir ante cualquier rival superior que Killua arrastra durante años era suya.

Su relación con Killua no es odio, y eso es lo inquietante. Illumi cree sinceramente que está protegiéndolo, y su definición de protección consiste en eliminar toda posibilidad de que elija por su cuenta.`,
    nenType: 'manipulacion',
    hatsu: 'Agujas de manipulación, Aguja Perro Guardián',
    organizationSlugs: ['familia-zoldyck', 'brigada-fantasma'],
    arcSlugs: ['examen-del-cazador', 'familia-zoldyck', 'eleccion-del-presidente'],
  },
  {
    slug: 'isaac-netero',
    tagline: 'Presidente de la Asociación durante más de un siglo.',
    bio: `Netero alcanzó su nivel encerrándose en una montaña a repetir un mismo movimiento diez mil veces al día durante cuatro años, hasta que la gratitud se volvió reflejo. De ahí nace la Plegaria de los Cien Tipos: una estatua de aura que golpea a la velocidad de su agradecimiento.

Frente a Meruem descubre por primera vez que su límite existe. Agota los cien tipos, pierde, y activa la Rosa Pobre que lleva implantada en el pecho: una bomba humana contra el ser más fuerte del mundo. Es la escena que resume su tesis, que la humanidad gana por su capacidad de destruirse.`,
    nenType: 'reforzamiento',
    hatsu: 'Plegaria de los Cien Tipos a la Diosa de la Misericordia',
    organizationSlugs: ['asociacion-de-cazadores', 'zodiacos'],
    arcSlugs: ['examen-del-cazador', 'hormigas-quimera'],
  },
  {
    slug: 'meruem',
    tagline: 'El Rey que nació perfecto y aprendió a dudar.',
    bio: `Meruem se abre paso a través del vientre de su madre y mata en su primer minuto de vida. Es más fuerte, más rápido y más inteligente que cualquier humano, y trata a su especie como material. Su plan es someter al mundo y criar humanos como ganado.

Entonces conoce a Komugi, una niña ciega, enferma y campeona invicta de Gungi, y pierde contra ella una y otra vez. En esas partidas encuentra lo único que no puede tomar por la fuerza: alguien que le da algo sin que él lo exija. Muere envenenado por la Rosa Pobre, y elige pasar sus últimas horas jugando con ella.`,
    nenType: 'especializacion',
    hatsu: 'Absorción de aura por contacto (Metamorfosis)',
    organizationSlugs: ['hormigas-quimera'],
    arcSlugs: ['hormigas-quimera'],
  },
  {
    slug: 'komugi',
    tagline: 'La campeona de Gungi que derrota al ser más fuerte del mundo.',
    bio: `Komugi es ciega, torpe fuera del tablero y campeona nacional de Gungi sin una sola derrota. Se disculpa constantemente y dice que si pierde se quitará la vida, porque el juego es lo único que la justifica ante sí misma.

Su función en la obra no es la de víctima. Es la persona que trata a Meruem como un igual sin saber quién es, y la única que le enseña algo que no puede conquistar. La escena final de ambos, jugando mientras el veneno hace efecto, es el cierre emocional del arco.`,
    organizationSlugs: ['hormigas-quimera'],
    arcSlugs: ['hormigas-quimera'],
  },
  {
    slug: 'neferpitou',
    tagline: 'Guardia Real que aprende Nen leyendo un cadáver.',
    bio: `Pitou es el primero de los tres Guardias Reales y el más versátil: manipula cuerpos muertos y vivos, cura heridas imposibles y percibe con un En de radio enorme. Su curiosidad es infantil y su crueldad, absoluta; mata a Kite y usa su cuerpo como marioneta de entrenamiento.

Su muerte a manos de Gon es una de las secuencias más brutales de la serie, y llega después de que Pitou haya suplicado —sinceramente— tiempo para salvar a Komugi.`,
    nenType: 'especializacion',
    hatsu: 'Doctor Blythe, Terpsichora',
    organizationSlugs: ['hormigas-quimera'],
    arcSlugs: ['hormigas-quimera'],
  },
  {
    slug: 'biscuit-krueger',
    tagline: 'Cincuenta y siete años y aspecto de niña, por elección.',
    bio: `Biscuit Krueger es Cazadora de Tesoros, maestra de artes marciales y una de las profesoras más eficaces de la obra. Mantiene una apariencia infantil para que nadie la tome en serio, y bajo ella esconde un físico de Reforzamiento capaz de partir el suelo.

Entrena a Gon y Killua en Greed Island a base de disciplina y de una honestidad incómoda: les dice exactamente en qué son mediocres. Es quien introduce el Ryu y quien diagnostica, mucho antes que nadie, que la relación entre ambos protagonistas es desigual.`,
    nenType: 'reforzamiento',
    hatsu: 'Magical Esthetician',
    arcSlugs: ['isla-codiciada', 'hormigas-quimera'],
  },
  {
    slug: 'kite',
    tagline: 'Alumno de Ging y detonante del arco más oscuro.',
    bio: `Kite fue recogido de la calle por Ging y entrenado como Cazador. Trabaja en la investigación de especies y es él quien encuentra a Gon en el bosque, quien le cuenta la verdad sobre su padre y quien le da la primera lección real sobre lo que significa este oficio.

Muere ante Neferpitou en la primera incursión contra las Hormigas. Su cadáver, reanimado como marioneta, es lo que empuja a Gon al extremo. Más tarde reaparece reencarnado en una hormiga, con memoria intacta.`,
    nenType: 'materializacion',
    hatsu: 'Crazy Slots (Clown Fiesta)',
    arcSlugs: ['hormigas-quimera'],
  },
  {
    slug: 'ging-freecss',
    tagline: 'Cazador Doble Estrella y padre ausente por decisión.',
    bio: `Ging es uno de los Cazadores más capaces vivos y uno de los peores padres imaginables. Dejó a Gon con su hermana y desapareció, no por descuido, sino porque su trabajo le interesa más. Cocreó Greed Island y ocupó un puesto entre los Zodiacos antes de renunciar.

Su reencuentro con Gon en el Árbol del Mundo es deliberadamente anticlimático: no hay disculpa ni abrazo, solo una conversación entre dos personas que ya no se deben nada, y una frase que resume la obra: lo que buscas está en el camino, no al final.`,
    nenType: 'especializacion',
    organizationSlugs: ['asociacion-de-cazadores', 'zodiacos'],
    arcSlugs: ['isla-codiciada', 'eleccion-del-presidente'],
  },
  {
    slug: 'uvogin',
    tagline: 'El número 11 de la Brigada: fuerza bruta sin trucos.',
    bio: `Uvogin es capaz de aguantar una descarga de misiles y de matar a un escuadrón entero con las manos. No cree en la estrategia y no la necesita casi nunca. Su derrota ante Kurapika es la primera vez que la Brigada entiende que hay alguien cazándolos.

Se niega a delatar a sus compañeros aunque eso le cueste la vida, y muere enterrado por Kurapika. Sus compañeros lo desentierran y lo entierran otra vez, con honores.`,
    nenType: 'reforzamiento',
    hatsu: 'Big Bang Impact',
    organizationSlugs: ['brigada-fantasma'],
    arcSlugs: ['yorknew-city'],
  },
  {
    slug: 'pakunoda',
    tagline: 'Lee memorias y las dispara como balas.',
    bio: `Pakunoda extrae recuerdos con solo tocar a alguien y puede transmitirlos disparándolos con una pistola de Nen. Es la fuente de inteligencia de la Brigada y, en Yorknew, la pieza que decide la partida.

Firma un contrato de Nen que la mata si transmite cierta información, y luego encuentra la forma de darles a sus compañeros lo que necesitan sin romperlo formalmente. Muere en pie, y su muerte es lo que convence a Kurapika de que la Brigada no es un monolito.`,
    nenType: 'especializacion',
    hatsu: 'Memory Bomb, Psychometry',
    organizationSlugs: ['brigada-fantasma'],
    arcSlugs: ['yorknew-city'],
  },
  {
    slug: 'machi-komacine',
    tagline: 'Hilos de Nen finos como un cabello y firmes como cable de acero.',
    bio: `Machi es la número 3 de la Brigada y la costurera del grupo: cose miembros amputados, ata a distancia y detecta mentiras por la tensión del hilo. Es de las pocas que mantiene la cabeza fría cuando Chrollo cae.

Su relación con Hisoka es ambigua y explícitamente no romántica de su parte; ella lo tolera, él insiste. Tras la muerte de Hisoka a manos de Chrollo, Machi queda entre las que juran cazarlo.`,
    nenType: 'transformacion',
    hatsu: 'Nen Thread',
    organizationSlugs: ['brigada-fantasma'],
    arcSlugs: ['yorknew-city', 'continente-oscuro'],
  },
  {
    slug: 'silva-zoldyck',
    tagline: 'Cabeza actual de la familia y padre pragmático.',
    bio: `Silva dirige el negocio familiar y acepta contratos que su propio padre rechaza. Trata a sus hijos como activos, pero es el único Zoldyck que reconoce en Killua algo distinto de una herramienta: le permite marcharse con la condición de que vuelva si se le llama.

En Yorknew acepta, junto a Zeno, un contrato para eliminar a la Brigada Fantasma, y ambos se retiran en cuanto el cliente muere: el trabajo terminó.`,
    nenType: 'transformacion',
    organizationSlugs: ['familia-zoldyck'],
    arcSlugs: ['familia-zoldyck', 'yorknew-city'],
  },
  {
    slug: 'zeno-zoldyck',
    tagline: 'El abuelo que convierte el aura en un dragón.',
    bio: `Zeno es el asesino más experimentado de la familia y el que mejor lee una situación. Su Dragon Dive lanza una lluvia de proyectiles de aura sobre un edificio entero; su Dragon Head funciona como misil guiado.

Su breve intercambio con Chrollo en Yorknew es un manual de combate: dos profesionales midiéndose y decidiendo, cada uno por su cuenta, que no vale la pena morir hoy.`,
    nenType: 'transformacion',
    hatsu: 'Dragon Dive, Dragon Head',
    organizationSlugs: ['familia-zoldyck'],
    arcSlugs: ['familia-zoldyck', 'yorknew-city'],
  },
  {
    slug: 'alluka-zoldyck',
    tagline: 'Concede cualquier deseo, y cobra por cada uno.',
    bio: `Alluka es hermana de Killua y alberga a Nanika, una entidad venida de fuera. Nanika concede cualquier petición sin límite aparente, pero después exige a la persona que la formuló tres favores de dificultad creciente; negarse mata a esa persona y a alguien cercano.

La familia la mantiene encerrada. Killua es el único que la trata como una hermana y no como un arma, y su vínculo le permite pedir el deseo que devuelve a Gon a la vida.`,
    nenType: 'especializacion',
    organizationSlugs: ['familia-zoldyck'],
    arcSlugs: ['eleccion-del-presidente'],
  },
  {
    slug: 'knuckle-bine',
    tagline: 'Un matón que llora por sus enemigos.',
    bio: `Knuckle es discípulo de Morel y probablemente el personaje más blando del arco de las Hormigas, cosa que le avergüenza. Su Hatsu es una idea genial: convierte el daño que inflige en una deuda con intereses, y cuando la deuda supera el aura del rival, este queda sin Nen durante treinta días.

Es un método para ganar sin matar, y encaja exactamente con quién es.`,
    nenType: 'emision',
    hatsu: 'Hakoware (A.P.R.)',
    arcSlugs: ['hormigas-quimera'],
  },
  {
    slug: 'morel-mackernasey',
    tagline: 'Humo con forma de todo lo que haga falta.',
    bio: `Cazador veterano y maestro de Knuckle y Shoot, Morel combate con una pipa que convierte el humo en marionetas, muros y prisiones. Su Smoky Jail sella un área entera; su Deep Purple crea combatientes autónomos.

Es el adulto competente del arco: el que planifica, el que asume que va a morir gente y el que sostiene la operación cuando los demás se rompen.`,
    nenType: 'manipulacion',
    hatsu: 'Deep Purple, Smoky Jail',
    arcSlugs: ['hormigas-quimera'],
  },
  {
    slug: 'palm-siberia',
    tagline: 'Vigilancia total a través de un espejo.',
    bio: `Palm empieza como una figura inquietante y desequilibrada, con una obsesión hacia Gon que la propia serie trata como problemática. Su Wink Blue le permite observar a cualquier persona a la que haya visto en persona, lo que la convierte en el radar del equipo.

Capturada y transformada en hormiga, conserva la conciencia y termina siendo decisiva desde dentro del palacio. Su arco es, sobre todo, el de alguien que deja de definirse por otra persona.`,
    nenType: 'materializacion',
    hatsu: 'Wink Blue, Black Widow',
    arcSlugs: ['hormigas-quimera'],
  },
  {
    slug: 'wing',
    tagline: 'El maestro que enseña Nen para evitar muertes, no para causarlas.',
    bio: `Wing es instructor en la Torre Celestial y discípulo de Biscuit. Miente a Gon y a Killua al principio, llamando "Ten" a un ejercicio de meditación, precisamente porque enseñar Nen a dos niños sin supervisión es peligroso.

Cuando Hisoka fuerza la situación, Wing les abre los poros él mismo y les impone una restricción estricta: nada de Ren sin permiso. Es el personaje que introduce formalmente el sistema de poder de la obra.`,
    nenType: 'reforzamiento',
    arcSlugs: ['torre-celestial'],
  },
  {
    slug: 'genthru',
    tagline: 'El Bombardero: gana el juego destruyendo a los jugadores.',
    bio: `Genthru descubre que es más rápido robar cartas que conseguirlas, y monta con dos socios una operación de extorsión dentro de Greed Island. Su Hatsu se apoya por completo en el principio de condición y voto: explicar la habilidad al objetivo multiplica su potencia.

Little Flower detona por contacto; Countdown planta una bomba con cuenta atrás que solo él puede desactivar. Es el primer rival al que Gon y Killua ganan por planificación y no por talento.`,
    nenType: 'emision',
    hatsu: 'Little Flower, Countdown',
    arcSlugs: ['isla-codiciada'],
  },
  {
    slug: 'razor',
    tagline: 'Guardián de Greed Island y viejo compañero de Ging.',
    bio: `Razor es uno de los catorce Devil's Guardians de la isla y uno de sus creadores. Su Nen Ball lanza proyectiles capaces de arrancar brazos, y el partido de balón prisionero contra él es la prueba definitiva del entrenamiento de Gon y Killua.

Su papel también es informativo: confirma que la isla fue construida por Ging y su equipo, y que el juego entero es un mensaje para su hijo.`,
    nenType: 'emision',
    hatsu: 'Nen Ball, Devil\'s Guardians',
    arcSlugs: ['isla-codiciada'],
  },
  {
    slug: 'pariston-hill',
    tagline: 'Gana la presidencia para poder renunciar a ella.',
    bio: `Vicepresidente bajo Netero y Rata de los Zodiacos, Pariston es el antagonista político de la obra: no quiere poder, quiere entretenerse. Sabotea desde dentro, se hace odiar deliberadamente y disfruta especialmente de quienes lo detestan.

Gana la elección en la última vuelta y dimite acto seguido, dejando el cargo a Cheadle. Después se marcha con Beyond Netero, que era su verdadero objetivo desde el principio.`,
    organizationSlugs: ['asociacion-de-cazadores', 'zodiacos'],
    arcSlugs: ['eleccion-del-presidente', 'continente-oscuro'],
  },
  {
    slug: 'cheadle-yorkshire',
    tagline: 'La Perra de los Zodiacos y presidenta por defecto.',
    bio: `Cheadle es Cazadora de Virus y la voz institucional durante la crisis de las Hormigas y la elección. Se opone frontalmente a Pariston y organiza la votación intentando que el proceso sea legítimo, aunque él la desmonte una y otra vez.

Termina como 14.ª presidenta de la Asociación, cargo que no buscaba, y le toca gestionar la expedición al Continente Oscuro.`,
    organizationSlugs: ['asociacion-de-cazadores', 'zodiacos'],
    arcSlugs: ['eleccion-del-presidente', 'continente-oscuro'],
  },
  {
    slug: 'mito-freecss',
    tagline: 'Quien realmente crió a Gon.',
    bio: `Mito es prima de Ging y tía adoptiva de Gon. Peleó por su custodia legal y ganó, y crió al niño sola en la Isla Ballena. Se opone a que se haga Cazador no por miedo al examen, sino porque sabe exactamente a qué se parece la vida de Ging.

Cuando cede, lo hace con una condición: que Gon vuelva. Es el ancla doméstica de una serie que casi no tiene ninguna.`,
    arcSlugs: ['examen-del-cazador'],
  },
  {
    slug: 'hanzou',
    tagline: 'Ninja de la Aldea de la Hoja Oscura, y sorprendentemente razonable.',
    bio: `Hanzo entrena desde los cuatro años y llega al examen como uno de los aspirantes más competentes. Domina a Gon con facilidad en la fase final y, al no conseguir que se rinda, le rompe un brazo; después se rinde él, porque matar a un niño obstinado no le sirve de nada.

Reaparece en la elección presidencial como candidato, y en la expedición al Continente Oscuro como escolta de un príncipe de Kakin.`,
    arcSlugs: ['examen-del-cazador', 'eleccion-del-presidente'],
  },
  {
    slug: 'satotz',
    tagline: 'Examinador de la primera fase y Cazador de Ruinas.',
    bio: `Satotz dirige la carrera inicial del examen: un recorrido de ochenta kilómetros por túnel y pantano en el que no anuncia la meta, porque la prueba es exactamente esa. Habla con una cortesía impecable y responde a todas las preguntas que le hacen.

Es también quien explica el Pantano Numere y sus criaturas miméticas, y quien reaparece como examinador en convocatorias posteriores.`,
    organizationSlugs: ['asociacion-de-cazadores'],
    arcSlugs: ['examen-del-cazador'],
  },
  {
    slug: 'menchi',
    tagline: 'Cazadora Gourmet que suspende a setenta aspirantes de golpe.',
    bio: `Menchi convierte la segunda fase en una prueba de cocina y suspende a todo el mundo, provocando una crisis que obliga al presidente Netero a intervenir en persona. Su argumento es sólido: un Cazador que no respeta la especialidad ajena no es un Cazador.

La prueba de repuesto —huevos de araña recogidos en un barranco— resume su tesis: el ingrediente vale lo que cuesta conseguirlo.`,
    organizationSlugs: ['asociacion-de-cazadores'],
    arcSlugs: ['examen-del-cazador'],
  },
];

export const perfilesBySlug = new Map(perfiles.map((perfil) => [perfil.slug, perfil]));
