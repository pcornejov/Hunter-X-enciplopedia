// Contenido curado (historia, poderes y enfrentamientos) escrito para este proyecto.
// La imagen y datos adicionales (edad, ocupación, tipo de Nen según el wiki) se obtienen
// en tiempo real desde la API Jikan (MyAnimeList) usando el `malId` de cada personaje
// dentro del anime Hunter x Hunter (2011), combinados mediante utils/mergeCharacterData.js.

export const characters = [
  {
    slug: 'gon-freecss',
    nombre: 'Gon Freecss',
    apiNames: ['gon freecss', 'gon'],
    malId: 30,
    arcoPrincipal: 'examen-hunter',
    categoria: 'Protagonista',
    historia: [
      'Gon Freecss creció en la isla Ballena al cuidado de su tía Mito, convencido de que su padre, Ging, había muerto. Al descubrir que en realidad es un Hunter legendario que lo abandonó de bebé para dedicarse a su propia pasión, Gon decide presentarse al Examen Hunter con la esperanza de algún día encontrarlo y entenderlo.',
      'Durante el examen conoce a Kurapika, Leorio y Killua, con quienes forja una amistad que lo acompañará durante toda su travesía. Su carácter ingenuo, honesto y extremadamente decidido lo convierte en un catalizador que empuja a los demás a superarse, aunque esa misma obstinación lo lleva en más de una ocasión a arriesgar su vida sin medir las consecuencias.',
      'El punto de inflexión de su historia llega durante la crisis de las Hormigas Quimera: al ver el cuerpo destrozado de su amigo y mentor Kite, Gon fuerza su propio Nen más allá de sus límites naturales para enfrentarse a Neferpitou, pagando un precio devastador por ese poder prestado del futuro.',
    ],
    poderesNen: [
      { nombre: 'Jajanken', descripcion: 'Su técnica insignia, inspirada en el juego piedra-papel-tijera: Piedra (puñetazo potenciado), Tijera (corte concentrado en los dedos) y Papel (palma que anula la defensa del rival al redirigir el impacto). Requiere tiempo de carga, lo que Gon suple con velocidad e ingenio táctico.' },
      { nombre: 'Potenciador puro', descripcion: 'Su afinidad natural es el refuerzo físico: fortalece su cuerpo, su caña de pescar (que usa como arma improvisada) y sus golpes con una cantidad de aura descomunal para su edad y experiencia.' },
      { nombre: 'Estado adulto/prestado', descripcion: 'En un acto desesperado, Gon negocia con Rey (una entidad ligada a Nanika/Alluka) intercambiar todo su futuro crecimiento y potencial por un poder inmenso e inmediato, transformándose temporalmente en una versión adulta de sí mismo con un aura devastadora.' },
    ],
    enfrentamientos: [
      { rival: 'Hisoka Morow', arco: 'Heavens Arena', contexto: 'Combate de exhibición en la Torre del Cielo donde Hisoka pone a prueba el potencial de Gon.', resultado: 'Gon pierde, pero impresiona tanto a Hisoka que este pospone "cosecharlo" hasta que madure más.' },
      { rival: 'Genthru (Bara)', arco: 'Greed Island', contexto: 'Enfrentamiento contra el líder de los Zorros de Hierro, que usaba una habilidad de bombas invisibles para cazar jugadores.', resultado: 'Gon y Killua logran vencerlo combinando estrategia y la ayuda de Bisky, tras sufrir heridas graves.' },
      { rival: 'Neferpitou', arco: 'Hormiga Quimera', contexto: 'Tras la muerte de Kite a manos de Pitou, Gon exige que lo revivan y, cegado por la rabia, sacrifica todo su futuro Nen para obtener poder instantáneo.', resultado: 'Gon derrota y mata a Pitou, pero su cuerpo queda destruido por el precio del pacto, dejándolo al borde de la muerte.' },
    ],
  },
  {
    slug: 'killua-zoldyck',
    nombre: 'Killua Zoldyck',
    apiNames: ['killua zoldyck', 'killua'],
    malId: 27,
    arcoPrincipal: 'zoldyck',
    categoria: 'Protagonista',
    historia: [
      'Killua es el tercer hijo de la familia Zoldyck, una estirpe de asesinos profesionales de renombre mundial. Entrenado desde la infancia con métodos extremos de tortura y condicionamiento, desarrolló reflejos, velocidad y frialdad sobrehumanas, además de una desconexión emocional que le costará años desmontar.',
      'Se presenta al Examen Hunter más por aburrimiento que por vocación, y allí traba amistad con Gon, la primera persona que lo trata como a un igual y no como a un arma. Esa amistad se convierte en la motivación que lo empuja a desafiar a su propia familia y a redefinir quién quiere ser más allá del asesino que fue criado para ser.',
      'Su relación con su hermana menor Alluka, portadora de la entidad Nanika, se vuelve central en la última parte de la historia: Killua rompe definitivamente con las expectativas de los Zoldyck al elegir proteger a Alluka por encima de cualquier misión o mandato familiar.',
    ],
    poderesNen: [
      { nombre: 'Transmutador (electricidad)', descripcion: 'Convierte su aura en corriente eléctrica, envolviendo su cuerpo o sus extremidades en electricidad para aumentar drásticamente su velocidad de reacción y la potencia de sus golpes.' },
      { nombre: 'Uñas y garras de asesino', descripcion: 'Técnicas de combate cuerpo a cuerpo heredadas de su entrenamiento familiar: golpes quirúrgicos a puntos vitales, extracción de corazones a mano limpia y un dominio absoluto del sigilo.' },
      { nombre: 'Godspeed', descripcion: 'Evolución de su control eléctrico que le permite alcanzar velocidades extremas mientras mantiene precisión y control total, apagando el "limitador" que normalmente refrena su verdadero potencial.' },
    ],
    enfrentamientos: [
      { rival: 'Illumi Zoldyck', arco: 'Zoldyck / Elección Presidencial', contexto: 'Su hermano mayor había implantado una aguja psicológica en su cabeza para controlarlo mediante el miedo.', resultado: 'Killua logra romper el condicionamiento con ayuda de Gon primero, y finalmente se enfrenta y mata a Illumi en un duelo directo durante la contienda por la presidencia.' },
      { rival: 'Rammot', arco: 'Hormiga Quimera', contexto: 'Un escuadrón líder de las Hormigas Quimera ataca a Killua y Gon en la aldea NGL.', resultado: 'Killua lo derrota con relativa facilidad usando su velocidad y técnicas de asesino, demostrando la brecha de poder entre él y las hormigas comunes.' },
      { rival: 'Zeno y Silva Zoldyck (entrenamiento)', arco: 'Elección Presidencial', contexto: 'Duelo simulado dentro de su propia familia para medir cuánto ha crecido tras separarse de ellos.', resultado: 'Aunque no logra vencerlos, sorprende a su padre y abuelo con el nivel alcanzado por cuenta propia.' },
    ],
  },
  {
    slug: 'kurapika',
    nombre: 'Kurapika',
    apiNames: ['kurapika'],
    malId: 28,
    arcoPrincipal: 'yorknew-city',
    categoria: 'Protagonista',
    historia: [
      'Kurapika es el único superviviente conocido del clan Kurta, un pueblo pacífico exterminado por la Brigada Fantasma para robar y vender sus legendarios ojos escarlata, que se vuelven de ese color cuando sus portadores sienten furia intensa. Presenció la masacre de su gente y desde entonces vive consumido por la promesa de vengarlos.',
      'Se convierte en Hunter con el objetivo específico de recuperar todos los ojos de su clan y eliminar a los responsables, uniendo fuerzas temporalmente con Leorio, Gon y Killua. Su inteligencia analítica y su disciplina lo convierten en un estratega formidable, aunque su sed de venganza lo empuja constantemente al límite entre la justicia y la autodestrucción.',
      'Tras la caída de la Brigada Fantasma, pasa a trabajar como guardaespaldas Hunter de los herederos de la familia Nostrade y, más adelante, se ve envuelto en la protección de los herederos Zoldyck durante la elección presidencial, siempre cargando con las cadenas —literales y simbólicas— de su pasado.',
    ],
    poderesNen: [
      { nombre: 'Ojos escarlata / Emperador Fantasma', descripcion: 'Cuando sus ojos se tiñen de escarlata por la ira, su capacidad de Nen se multiplica enormemente, pero a costa de quedar restringido únicamente al uso de sus cadenas contra miembros de la Brigada Fantasma.' },
      { nombre: 'Cadena de Juicio', descripcion: 'Una cadena que se clava en el corazón de un usuario de Nen y le impone una regla mortal si la rompe; puede detener por completo la habilidad Nen de la víctima.' },
      { nombre: 'Cadena Ladrona / Cadena de Fórmula de Curación', descripcion: 'Otras cadenas de su mano derecha: una roba temporalmente la habilidad de un enemigo, otra cura heridas graves en aliados, evidenciando el dominio de la categoría Conjurador.' },
    ],
    enfrentamientos: [
      { rival: 'Uvogin', arco: 'Yorknew City', contexto: 'Kurapika captura al miembro más fuerte físicamente de la Brigada usando su Cadena de Juicio y una emboscada meticulosamente planeada.', resultado: 'Tras interrogarlo, Kurapika lo ejecuta, cumpliendo su primera gran venganza contra la Brigada.' },
      { rival: 'Chrollo Lucilfer', arco: 'Yorknew City', contexto: 'Kurapika logra colocarle a Chrollo la Cadena de Juicio que le prohíbe usar Nen bajo pena de muerte.', resultado: 'Chrollo queda neutralizado como usuario de Nen por el resto del arco, un golpe devastador para la Brigada.' },
      { rival: 'Familia Nostrade / Jefes mafiosos de Yorknew', arco: 'Yorknew City', contexto: 'Kurapika actúa como guardaespaldas durante la subasta clandestina de ojos escarlata.', resultado: 'Protege a su cliente y recupera parte de los ojos de su clan, aunque el precio en desgaste personal es alto.' },
    ],
  },
  {
    slug: 'leorio-paradinight',
    nombre: 'Leorio Paradinight',
    apiNames: ['leorio paradinight', 'leorio paladiknight', 'leorio'],
    malId: 29,
    arcoPrincipal: 'examen-hunter',
    categoria: 'Protagonista',
    historia: [
      'Leorio creció en la pobreza y vio morir a un amigo cercano por no poder pagar tratamiento médico, lo que marcó su determinación de convertirse en médico. Se presenta al Examen Hunter porque la licencia de Hunter permite acceder a estudios de medicina sin costo, una motivación que muchos personajes juzgan como "poco noble" al inicio.',
      'De carácter explosivo y bocazas, Leorio esconde bajo esa fachada una enorme calidez humana y un sentido de la justicia muy fuerte, siendo con frecuencia la voz de la conciencia del grupo. Su amistad con Kurapika es particularmente cercana, actuando como contrapeso emocional a la obsesión vengativa de este último.',
      'Con el tiempo se convierte en Hunter médico y en un adulto responsable dentro del grupo, tomando un rol activo en la política de la Asociación Hunter durante la elección presidencial, donde demuestra que su idealismo inicial se ha convertido en una genuina vocación de servicio.',
    ],
    poderesNen: [
      { nombre: 'Emisor en desarrollo', descripcion: 'Su categoría de Nen es Emisor, aunque durante gran parte de la historia su entrenamiento formal es limitado en comparación con sus compañeros, compensando con un manejo básico pero efectivo del Ken y el Ten.' },
      { nombre: 'Palm (Punho de Metal)', descripcion: 'Utiliza un par de nudilleras metálicas conjuradas/reforzadas para golpes contundentes en combate cuerpo a cuerpo cuando la situación lo exige.' },
    ],
    enfrentamientos: [
      { rival: 'Hanzo', arco: 'Examen Hunter (Torneo de las Tarjetas Numéricas)', contexto: 'Enfrentamiento directo durante la fase final del examen contra un ninja profesional mucho más experimentado.', resultado: 'Leorio pierde el combate pero se gana el respeto de Hanzo por no rendirse.' },
      { rival: 'Miembros hostiles durante Yorknew City', arco: 'Yorknew City', contexto: 'Participa en tareas de apoyo e investigación mientras Kurapika se enfrenta a la Brigada Fantasma.', resultado: 'Contribuye a la logística del grupo sin entrar en combates directos de alto riesgo.' },
    ],
  },
  {
    slug: 'hisoka-morow',
    nombre: 'Hisoka Morow',
    apiNames: ['hisoka morow', 'hisoka'],
    malId: 31,
    arcoPrincipal: 'heavens-arena',
    categoria: 'Antagonista recurrente',
    historia: [
      'Hisoka es un exmiembro de la Brigada Fantasma (Miembro #4) que fue expulsado —y debería haber sido ejecutado— por priorizar sus propios intereses sobre los del grupo, algo que solo se le perdonó por su utilidad. Su verdadera pasión no es el dinero ni el poder, sino encontrar oponentes cuyo potencial de combate le resulte "delicioso".',
      'Su relación con Gon y Killua es la de un depredador paciente: los identifica tempranamente como "frutas" que aún no están maduras para ser devoradas en combate, y se dedica a observarlos, ponerlos a prueba y empujarlos a crecer, siempre con una mezcla perturbadora de generosidad calculada y amenaza latente.',
      'Su ambición máxima es enfrentarse a Chrollo Lucilfer en igualdad de condiciones, lo que lo convierte en un actor impredecible que oscila entre aliado ocasional y enemigo mortal según le convenga a sus propios objetivos.',
    ],
    poderesNen: [
      { nombre: 'Goma Bungee (Bungee Gum)', descripcion: 'Su habilidad principal: aura con propiedades de goma de mascar y elasticidad de una liga, que le permite pegar, atrapar o repeler objetos y personas con enorme versatilidad ofensiva y defensiva.' },
      { nombre: 'Cambio Textural (Texture Surprise)', descripcion: 'Le permite imprimir una imagen sobre una superficie con textura similar a una carta, ideal para camuflar objetos o crear trampas visuales.' },
      { nombre: 'Dominio del Ren y control de presencia', descripcion: 'Es capaz de ocultar o proyectar su aura a voluntad para intimidar u ocultar su verdadero nivel de poder frente a rivales.' },
    ],
    enfrentamientos: [
      { rival: 'Gon Freecss', arco: 'Heavens Arena', contexto: 'Combate de exhibición donde Hisoka evalúa el potencial real del niño.', resultado: 'Hisoka gana con claridad pero decide "esperar" a que Gon madure antes de enfrentarlo en serio.' },
      { rival: 'Kastro', arco: 'Yorknew City', contexto: 'Duelo dentro de la Brigada Fantasma usando un doble creado con Copia (Doppelgänger) para probar los límites del Bungee Gum.', resultado: 'Hisoka lo derrota revelando en el proceso la verdadera naturaleza de su habilidad.' },
      { rival: 'Chrollo Lucilfer', arco: 'Elección Presidencial', contexto: 'Tras años de espera, Hisoka finalmente logra el combate que ansiaba contra el líder de la Brigada Fantasma.', resultado: 'Un enfrentamiento parejo y brutal que termina con la muerte de Hisoka, satisfecho de haber peleado contra un rival a su altura.' },
    ],
  },
  {
    slug: 'chrollo-lucilfer',
    nombre: 'Chrollo Lucilfer',
    apiNames: ['chrollo lucilfer', 'chrollo'],
    malId: 58,
    arcoPrincipal: 'yorknew-city',
    categoria: 'Antagonista principal',
    historia: [
      'Chrollo es el fundador y líder de la Brigada Fantasma (Genei Ryodan), un grupo de trece criminales de rango S provenientes en su mayoría de un barrio marginal condenado a la miseria. Bajo su liderazgo carismático y frío, la Brigada se convierte en una de las organizaciones criminales más temidas del mundo.',
      'Su filosofía personal considera la vida y la muerte con una distancia casi filosófica: mata sin remordimiento cuando lo considera necesario, pero también demuestra una lealtad genuina y protectora hacia los miembros de su "familia" elegida. Es un lector voraz y un estratega excepcional, siempre varios pasos por delante de sus enemigos.',
      'Su encuentro con Kurapika en Yorknew City lo marca de forma permanente: quedar neutralizado como usuario de Nen por la Cadena de Juicio lo obliga a replantear su relación con el poder y con su propio grupo, cuestión que arrastra durante el resto de la historia.',
    ],
    poderesNen: [
      { nombre: 'Libro Fantasma (Skill Hunter)', descripcion: 'Su habilidad de Especialista le permite robar las habilidades Nen de cualquier persona a la que mate o casi mate, almacenándolas en un libro que puede usar más tarde como si fueran propias.' },
      { nombre: 'Manos convertidas (Convert Hands)', descripcion: 'Le permite disfrazar sus manos como las de otra persona para usar habilidades robadas que requieren un "sello" o parte del cuerpo específico del usuario original.' },
      { nombre: 'Voz Negra (Black Voice)', descripcion: 'Habilidad robada que le permite dar una única orden absoluta a la mente de su víctima, sumamente peligrosa en manipulación psicológica.' },
    ],
    enfrentamientos: [
      { rival: 'Uvogin (defensa fallida)', arco: 'Yorknew City', contexto: 'Chrollo prioriza la seguridad del grupo sobre intentar un rescate imposible de Uvogin, capturado por Kurapika.', resultado: 'Uvogin es ejecutado; Chrollo asume la pérdida como parte del riesgo del oficio.' },
      { rival: 'Kurapika', arco: 'Yorknew City', contexto: 'Kurapika logra colocarle la Cadena de Juicio que bloquea su capacidad de usar Nen.', resultado: 'Chrollo queda sin poderes durante un largo periodo, una humillación estratégica sin precedentes para él.' },
      { rival: 'Hisoka Morow', arco: 'Elección Presidencial', contexto: 'El duelo que Hisoka esperó durante toda la serie, ahora con Chrollo habiendo recuperado y ampliado su arsenal de habilidades robadas.', resultado: 'Combate mortal y equilibrado que termina con la muerte de Hisoka a manos de Chrollo.' },
    ],
  },
  {
    slug: 'illumi-zoldyck',
    nombre: 'Illumi Zoldyck',
    apiNames: ['illumi zoldyck', 'illumi'],
    malId: 57,
    arcoPrincipal: 'zoldyck',
    categoria: 'Antagonista recurrente',
    historia: [
      'Illumi es el hijo mayor de la familia Zoldyck y el asesino más frío y metódico de sus hermanos. Fue criado para eliminar por completo la empatía y la duda, convirtiéndose en el ejecutor perfecto del código familiar y en el principal responsable del entrenamiento traumático de Killua durante la infancia.',
      'Su vínculo con Killua es profundamente controlador: le implanta una aguja psicológica destinada a suprimir su voluntad y devolverlo al redil familiar cada vez que se aleja demasiado, disfrazando la manipulación como "amor fraternal". Su capacidad para cambiar de rostro y personalidad (llegando a hacerse pasar por Kalluto o por otros personajes) refleja su naturaleza camaleónica y calculadora.',
      'Durante la elección presidencial de la Asociación Hunter, actúa como guardaespaldas y asesor cercano de Killua, hasta que el conflicto entre ambos por el futuro de Alluka llega a un punto de no retorno.',
    ],
    poderesNen: [
      { nombre: 'Manipulador (agujas psicológicas)', descripcion: 'Clava agujas de manera imperceptible en el cerebro de sus víctimas para manipular sus recuerdos, emociones y comportamiento sin que ellas lo perciban.' },
      { nombre: 'Marioneta de Cera (Wax Doll)', descripcion: 'Aplica cera sobre el rostro de un cadáver o persona para crear una máscara realista que le permite suplantar identidades con precisión extrema.' },
      { nombre: 'Necesidad de sueño alterada', descripcion: 'Como parte de su disciplina de asesino, ha entrenado su cuerpo para funcionar con niveles de descanso mínimos sin perder precisión de combate.' },
    ],
    enfrentamientos: [
      { rival: 'Gon Freecss (amenaza velada)', arco: 'Zoldyck', contexto: 'Illumi advierte a Gon que se aleje de Killua, amenazándolo directamente si insiste en interferir con el destino de su hermano.', resultado: 'Gon se mantiene firme y la relación entre ambos queda marcada por una tensión latente.' },
      { rival: 'Killua Zoldyck', arco: 'Elección Presidencial', contexto: 'El enfrentamiento definitivo entre hermanos, tras años de manipulación psicológica y control encubierto.', resultado: 'Killua rompe por completo el condicionamiento y mata a Illumi, liberándose de su influencia para siempre.' },
    ],
  },
  {
    slug: 'silva-zoldyck',
    nombre: 'Silva Zoldyck',
    apiNames: ['silva zoldyck', 'silva'],
    malId: 60,
    arcoPrincipal: 'zoldyck',
    categoria: 'Secundario',
    historia: [
      'Silva es el actual cabeza de familia en activo de los Zoldyck y padre de Killua, Illumi, Milluki, Kalluto y Alluka. Considerado uno de los asesinos más poderosos y caros del mundo, encarna a la perfección la filosofía familiar de disciplina absoluta y desapego emocional aplicado a la crianza de sus hijos.',
      'A pesar de su frialdad aparente, muestra destellos de un respeto genuino hacia la voluntad de Killua de forjar su propio camino, siempre y cuando demuestre la fuerza suficiente para sostenerlo. Su relación con Alluka es más compleja, marcada por el miedo familiar hacia el poder de Nanika.',
    ],
    poderesNen: [
      { nombre: 'Potenciador de clase mundial', descripcion: 'Un dominio de refuerzo físico que lo sitúa entre los combatientes más temidos del planeta, capaz de igualar a Hunters de máximo nivel como Netero.' },
      { nombre: 'Técnicas de asesino tradicionales', descripcion: 'Domina el combate silencioso, la eliminación instantánea de objetivos y el manejo experto de venenos y armas ocultas propios del oficio familiar.' },
    ],
    enfrentamientos: [
      { rival: 'Isaac Netero', arco: 'Referencia histórica (mencionado)', contexto: 'Ambos son citados en la obra como rivales de nivel comparable entre los combatientes más fuertes de su generación.', resultado: 'No se muestra un combate directo en pantalla, pero se establece como uno de los pocos capaces de plantarle cara.' },
      { rival: 'Zeno y Killua (entrenamiento familiar)', arco: 'Elección Presidencial', contexto: 'Pone a prueba el crecimiento de Killua tras su tiempo lejos de la familia.', resultado: 'Reconoce con orgullo contenido cuánto ha mejorado su hijo por cuenta propia.' },
    ],
  },
  {
    slug: 'alluka-zoldyck',
    nombre: 'Alluka Zoldyck',
    apiNames: ['alluka zoldyck', 'alluka'],
    malId: 52425,
    arcoPrincipal: 'eleccion-presidencial',
    categoria: 'Secundario',
    historia: [
      'Alluka es la hermana menor de Killua, apartada y temida por el resto de la familia Zoldyck debido a que su cuerpo alberga a Nanika, una entidad sobrenatural capaz de conceder cualquier deseo a cambio de un precio equivalente y potencialmente catastrófico. Fue mantenida encerrada durante años por miedo a un incidente que la familia nunca explica del todo.',
      'Killua es la única persona que la trata con cariño incondicional y sin miedo, y es precisamente esa relación la que rompe el aislamiento de Alluka: al escapar juntos de la mansión familiar, Killua desafía abiertamente el mandato de los Zoldyck para protegerla.',
      'El poder de Nanika termina siendo decisivo para salvar la vida de Gon tras su sacrificio contra Neferpitou, sellando el vínculo entre los hermanos y consolidando a Alluka como una pieza clave, no solo una "amenaza" a esconder.',
    ],
    poderesNen: [
      { nombre: 'Nanika (deseos con precio)', descripcion: 'La entidad que comparte su cuerpo puede conceder cualquier deseo, pero exige una condición y un castigo desproporcionado si esta no se cumple, incluyendo la muerte del solicitante o de personas cercanas.' },
      { nombre: 'Reglas de invocación', descripcion: 'Nanika solo se manifiesta si a Alluka se le pregunta con una fórmula específica ("¿Qué deseas?") tras cumplir ciertos rituales, y el control sobre cuándo aparece Nanika o Alluka responde a reglas estrictas establecidas por la propia entidad.' },
    ],
    enfrentamientos: [
      { rival: 'Sistema de seguridad de la mansión Zoldyck', arco: 'Elección Presidencial', contexto: 'Escapar de la vigilancia familiar diseñada específicamente para contener a Nanika.', resultado: 'Con la ayuda de Killua, Alluka logra huir de la mansión y experimentar libertad por primera vez.' },
      { rival: 'La condición de Nanika (salvar a Gon)', arco: 'Hormiga Quimera / Elección Presidencial', contexto: 'Killua le pide a Nanika curar a Gon del daño autoinfligido contra Pitou.', resultado: 'El deseo se cumple, aunque a un costo personal altísimo para Killua, que debe pagar el precio impuesto por la entidad.' },
    ],
  },
  {
    slug: 'isaac-netero',
    nombre: 'Isaac Netero',
    apiNames: ['isaac netero', 'netero'],
    malId: 14489,
    arcoPrincipal: 'hormiga-quimera',
    categoria: 'Secundario',
    historia: [
      'Netero es el decimosegundo presidente de la Asociación Hunter y, durante décadas, uno de los combatientes más poderosos del mundo. Su papel como examinador principal durante el Examen Hunter revela a un anciano excéntrico, bromista y aparentemente débil que oculta un dominio absoluto del Nen tras décadas de entrenamiento budista y marcial.',
      'Cuando surge la amenaza de las Hormigas Quimera, Netero asume personalmente el liderazgo de la operación de exterminio, consciente de que podría tratarse del mayor desafío —y el último— de su vida. Su sentido del deber hacia la humanidad lo lleva a un sacrificio final calculado con precisión estratégica.',
    ],
    poderesNen: [
      { nombre: 'Palma Budista de las Cien Tipos (100-Type Guanyin Bodhisattva)', descripcion: 'Su técnica definitiva: materializa una estatua gigante con múltiples brazos armados que ejecuta ataques físicos de potencia devastadora.' },
      { nombre: 'Maestría del Zetsu y el cuerpo físico', descripcion: 'Décadas de entrenamiento marcial le permitieron alcanzar niveles de fuerza, velocidad y resistencia sobrehumanos incluso sin depender completamente de técnicas ofensivas de Nen.' },
      { nombre: 'Bomba humana (sacrificio final)', descripcion: 'Al saberse derrotado en combate directo, activa una bomba oculta en su propio cuerpo como última medida contra el Rey Hormiga.' },
    ],
    enfrentamientos: [
      { rival: 'Gon, Killua, Kurapika y Leorio (evaluación)', arco: 'Examen Hunter', contexto: 'Como examinador final, Netero reta a los candidatos a golpearlo una sola vez dentro de un tiempo límite.', resultado: 'Ninguno logra tocarlo con facilidad, pero su desempeño influye en la decisión de aprobarlos como Hunters.' },
      { rival: 'Meruem', arco: 'Hormiga Quimera', contexto: 'El combate cumbre del arco: Netero utiliza toda su experiencia y su técnica definitiva contra el Rey Hormiga recién nacido, aún sin experiencia de batalla real.', resultado: 'Netero es derrotado físicamente, pero detona una bomba de gas venenoso experimental (Cero de la Miseria Humana) que envenena gravemente a Meruem, sacrificando su vida en el proceso.' },
    ],
  },
  {
    slug: 'meruem',
    nombre: 'Meruem',
    apiNames: ['meruem'],
    malId: 23277,
    arcoPrincipal: 'hormiga-quimera',
    categoria: 'Antagonista principal',
    historia: [
      'Meruem es el Rey de las Hormigas Quimera, nacido con un potencial de poder e inteligencia sin precedentes en cualquier forma de vida conocida. Desde su nacimiento desprecia a la humanidad, a la que considera inferior en todos los sentidos, y se propone conquistar el mundo casi como un juego menor para alguien de su capacidad.',
      'Tras su combate contra Netero, queda gravemente envenenado y es trasladado a una instalación secreta donde, contra todo pronóstico, entabla una relación de aprendizaje y cercanía con Komugi, una niña ciega campeona de Gungi (un juego de estrategia). Esa relación humaniza profundamente a un personaje concebido inicialmente como un monstruo absoluto.',
      'Su arco concluye con una revalorización completa de su desprecio inicial hacia los humanos, reconociendo en Komugi una forma de grandeza que no había contemplado, justo antes de sucumbir al veneno de Netero.',
    ],
    poderesNen: [
      { nombre: 'Especialista de fuerza y velocidad supremas', descripcion: 'Su fuerza física, velocidad y capacidad de aprendizaje instantáneo de técnicas ajenas superan a cualquier otro personaje mostrado en la serie hasta ese punto.' },
      { nombre: 'Aprendizaje instantáneo', descripcion: 'Puede analizar y replicar técnicas de combate observadas una sola vez, integrándolas de inmediato a su propio repertorio con una perfección sobrehumana.' },
      { nombre: 'Aguijón venenoso', descripcion: 'Posee una cola con aguijón capaz de inyectar toxinas letales, heredada de su naturaleza como hormiga, aunque rara vez necesita recurrir a ella en combate.' },
    ],
    enfrentamientos: [
      { rival: 'Isaac Netero', arco: 'Hormiga Quimera', contexto: 'Su primer combate real, contra un anciano que representa siglos acumulados de experiencia marcial humana.', resultado: 'Meruem gana el combate físico, pero es envenenado fatalmente por la bomba final de Netero, un golpe que no había previsto.' },
      { rival: 'Ejército de la Asociación Hunter', arco: 'Hormiga Quimera', contexto: 'Enfrenta en distintos momentos a escuadrones completos de Hunters de élite enviados a contenerlo.', resultado: 'Los derrota o los ignora con facilidad, subrayando la magnitud de la amenaza que representaba antes de ser envenenado.' },
    ],
  },
  {
    slug: 'neferpitou',
    nombre: 'Neferpitou',
    apiNames: ['neferpitou', 'pitou'],
    malId: 12300,
    arcoPrincipal: 'hormiga-quimera',
    categoria: 'Antagonista',
    historia: [
      'Neferpitou es uno de los tres miembros de la Guardia Real de Meruem, con forma felina humanoide y una devoción absoluta y casi religiosa hacia su rey, a quien considera literalmente perfecto. Es responsable directo de la muerte de Kite, el mentor de Gon, un hecho que desencadena una de las tramas más oscuras de la serie.',
      'A diferencia de la crueldad de otros miembros de la Guardia, Pitou muestra una faceta médica y curativa notable, motivada casi siempre por el deseo de complacer a Meruem en lugar de por compasión genuina hacia los humanos.',
    ],
    poderesNen: [
      { nombre: 'Doctor Blythe (curación)', descripcion: 'Habilidad de Especialista que le permite realizar cirugías y curaciones milagrosas, incluyendo intentos de resucitación, aunque con reglas y limitaciones estrictas.' },
      { nombre: 'Velocidad y fuerza de Guardia Real', descripcion: 'Como miembro de la Guardia Real, posee una fuerza y velocidad muy superiores a la de cualquier humano promedio, incluso entre Hunters experimentados.' },
    ],
    enfrentamientos: [
      { rival: 'Kite', arco: 'Hormiga Quimera', contexto: 'Encuentro casual en el que Pitou mata y desmiembra al mentor de Gon casi sin esfuerzo.', resultado: 'Kite muere, desencadenando la búsqueda de venganza de Gon.' },
      { rival: 'Gon Freecss', arco: 'Hormiga Quimera', contexto: 'Gon exige que Pitou revida a Kite; al fallar el intento, sacrifica su propio futuro Nen para obtener poder desmedido.', resultado: 'Gon derrota y mata a Pitou, aunque el costo del pacto lo deja al borde de la muerte.' },
    ],
  },
  {
    slug: 'shaiapouf',
    nombre: 'Shaiapouf',
    apiNames: ['shaiapouf', 'pouf'],
    malId: 41135,
    arcoPrincipal: 'hormiga-quimera',
    categoria: 'Antagonista',
    historia: [
      'Shaiapouf, apodado Pouf, es el miembro más analítico e intelectualmente retorcido de la Guardia Real de Meruem, con apariencia de polilla humanoide. Se autoproclama el "cerebro" del grupo y su devoción hacia el Rey roza el fanatismo, llegando a manipular activamente los sentimientos y decisiones de Meruem cuando lo cree necesario para protegerlo.',
      'Su naturaleza engañosa y su capacidad de duplicarse lo convierten en uno de los personajes más difíciles de anticipar del arco, dispuesto a sacrificar peones —incluidos clones de sí mismo— con tal de asegurar la supervivencia y el dominio de su rey.',
    ],
    poderesNen: [
      { nombre: 'Clones parásitos (Reproducción/Emisión)', descripcion: 'Puede generar copias de sí mismo con personalidades e información compartida, usadas como espías, señuelos o unidades de combate adicionales.' },
      { nombre: 'Manipulación psicológica sutil', descripcion: 'Utiliza su inteligencia para sembrar dudas o reforzar convicciones en Meruem y otros aliados, moviendo los hilos del conflicto desde las sombras.' },
    ],
    enfrentamientos: [
      { rival: 'Escuadrones de la Asociación Hunter', arco: 'Hormiga Quimera', contexto: 'Coordina la defensa del palacio de Meruem contra las fuerzas de asalto enviadas por Netero.', resultado: 'Logra repeler o retrasar significativamente varios intentos de infiltración mediante sus clones y trampas.' },
      { rival: 'Knuckle Bine y Shoot McMahon', arco: 'Hormiga Quimera', contexto: 'Enfrentamiento prolongado contra dos Hunters especializados en habilidades de préstamo de poder.', resultado: 'Un combate desgastante que termina con la muerte de Shaiapouf tras exponer su forma real.' },
    ],
  },
  {
    slug: 'youpi',
    nombre: 'Youpi',
    apiNames: ['youpi', 'menthuthuyoupi'],
    malId: 43953,
    arcoPrincipal: 'hormiga-quimera',
    categoria: 'Antagonista',
    historia: [
      'Youpi es el miembro de fuerza bruta de la Guardia Real de Meruem, con una apariencia masiva e infantil que contrasta con su capacidad destructiva casi ilimitada. Su lealtad hacia el Rey es absoluta y visceral, actuando muchas veces por impulso antes que por estrategia.',
      'Es el responsable directo de infligir a Knuckle Bine el daño más grave del arco al robarle por accidente una habilidad prestada de intercambio de HP, generando una de las subtramas de tensión más crueles de la saga.',
    ],
    poderesNen: [
      { nombre: 'Fuerza bruta descomunal', descripcion: 'Su poder físico es tan devastador que puede destruir edificaciones y derrotar a múltiples oponentes con golpes directos, siendo comparado en potencia con Neferpitou y Shaiapouf.' },
      { nombre: 'Regeneración y resistencia extrema', descripcion: 'Su cuerpo quimérico le permite resistir daños que serían letales para cualquier humano y continuar peleando con normalidad.' },
    ],
    enfrentamientos: [
      { rival: 'Knuckle Bine y Meleoron', arco: 'Hormiga Quimera', contexto: 'Combate prolongado en el que Knuckle intenta usar su habilidad de intercambio de vida contra Youpi sin que este lo note.', resultado: 'Youpi absorbe accidentalmente la habilidad de Knuckle, condenándolo a perder toda su fuerza vital progresivamente; el conflicto se resuelve más adelante gracias a la intervención de Meruem.' },
    ],
  },
  {
    slug: 'biscuit-krueger',
    nombre: 'Biscuit Krueger',
    apiNames: ['biscuit krueger', 'biscuit', 'bisky'],
    malId: 13898,
    arcoPrincipal: 'greed-island',
    categoria: 'Secundaria / Mentora',
    historia: [
      'Biscuit es una Hunter veterana con una habilidad Nen que le permite mantener una apariencia infantil, ocultando que en realidad es una combatiente de décadas de experiencia y una de las mejores instructoras de Nen del mundo. Conoce a Gon y Killua dentro de Greed Island y decide entrenarlos personalmente al reconocer un potencial excepcional en ambos.',
      'Su método de enseñanza es exigente hasta el extremo, pero profundamente efectivo: en pocas semanas logra que los dos jóvenes den un salto de nivel que normalmente tomaría años, sentando las bases técnicas que usarán durante el arco de las Hormigas Quimera.',
    ],
    poderesNen: [
      { nombre: 'Transmutador / Conjurador de doble apariencia', descripcion: 'Usa una habilidad de transformación que le permite alternar entre su verdadera forma adulta, musculosa y de gran poder físico, y una apariencia de niña que emplea para pasar desapercibida.' },
      { nombre: 'Maestría pedagógica del Nen', descripcion: 'Su verdadero superpoder es la enseñanza: es capaz de diagnosticar con precisión el potencial y las carencias de un alumno y diseñar un entrenamiento a medida en tiempo récord.' },
    ],
    enfrentamientos: [
      { rival: 'Jugadores hostiles de Greed Island', arco: 'Greed Island', contexto: 'Se enfrenta a cazadores de tarjetas que intentan robar los objetos y el progreso de Gon y Killua.', resultado: 'Su fuerza real, oculta tras su apariencia infantil, sorprende y disuade a la mayoría de agresores.' },
    ],
  },
  {
    slug: 'ging-freecss',
    nombre: 'Ging Freecss',
    apiNames: ['ging freecss', 'ging'],
    malId: 26,
    arcoPrincipal: 'greed-island',
    categoria: 'Secundario',
    historia: [
      'Ging es el padre de Gon y uno de los Hunters más talentosos y excéntricos jamás registrados por la Asociación. Abandonó a su hijo de bebé para dedicarse por completo a su pasión por la exploración y el descubrimiento, un comportamiento que muchos considerarían egoísta pero que él nunca disfraza ni justifica ante Gon.',
      'Su filosofía de vida —vivir intensamente según los propios deseos, sin sacrificar la pasión por obligaciones convencionales— influye profundamente en cómo Gon entiende la libertad y la responsabilidad, incluso cuando ambos finalmente se encuentran cara a cara tras años de búsqueda.',
    ],
    poderesNen: [
      { nombre: 'Maestría multidisciplinaria', descripcion: 'Se le atribuye un dominio excepcional de múltiples categorías de Nen, aunque la mayor parte de su verdadero poder se mantiene deliberadamente oculto a lo largo de la serie.' },
      { nombre: 'Diseño de Greed Island', descripcion: 'Es coautor del videojuego Greed Island, una prueba de su ingenio técnico y su capacidad para combinar Nen con tecnología y diseño de juegos a gran escala.' },
    ],
    enfrentamientos: [
      { rival: 'No mostrados en combate directo', arco: '—', contexto: 'Ging evita deliberadamente exhibir su poder de combate a lo largo de la serie.', resultado: 'Su verdadero nivel permanece como uno de los grandes misterios de la obra.' },
    ],
  },
  {
    slug: 'feitan-portor',
    nombre: 'Feitan Portor',
    apiNames: ['feitan portor', 'feitan'],
    malId: 3195,
    arcoPrincipal: 'yorknew-city',
    categoria: 'Antagonista',
    historia: [
      'Feitan es uno de los miembros más brutales y sádicos de la Brigada Fantasma, reconocido por su bajo perfil verbal y su capacidad de tortura psicológica y física extrema. Su lealtad hacia Chrollo y el resto del grupo es incondicional, y se convierte en uno de los ejecutores de castigo interno cuando algún miembro traiciona a la Brigada.',
      'A pesar de su apariencia pequeña y su comportamiento reservado, es considerado uno de los combatientes más peligrosos de la organización, especialmente en espacios cerrados donde su habilidad de tortura resulta devastadora.',
    ],
    poderesNen: [
      { nombre: 'Habitación de Tortura (Rising Sun)', descripcion: 'Crea un espacio cerrado alternativo donde intensifica el dolor físico de quien esté atrapado dentro, ideal para interrogatorios extremos.' },
      { nombre: 'Combate cuerpo a cuerpo especializado', descripcion: 'Domina técnicas de combate cercano brutales, apoyadas en un control del Nen orientado a maximizar el sufrimiento del oponente.' },
    ],
    enfrentamientos: [
      { rival: 'Miembros que intentan traicionar a la Brigada', arco: 'Yorknew City', contexto: 'Actúa como interrogador/ejecutor cuando el grupo sospecha filtraciones internas.', resultado: 'Su reputación de brutalidad disuade la mayoría de intentos de traición dentro de la organización.' },
    ],
  },
  {
    slug: 'machi-komacine',
    nombre: 'Machi Komacine',
    apiNames: ['machi komacine', 'machi komachine', 'machi'],
    malId: 5830,
    arcoPrincipal: 'yorknew-city',
    categoria: 'Antagonista',
    historia: [
      'Machi es una de las miembros más veteranas y capaces de la Brigada Fantasma, con un rol clave tanto en combate como en la logística del grupo. Su relación con Hisoka es de desconfianza mutua constante, ya que ella es de las pocas que sospecha abiertamente de sus verdaderas intenciones dentro de la organización.',
      'Es descrita como profundamente leal a sus compañeros más cercanos, especialmente a Nobunaga y al resto de la vieja guardia, mostrando una calidez inusual comparada con la frialdad general de la Brigada.',
    ],
    poderesNen: [
      { nombre: 'Ejecución de Costura (Threadspool / Body Threads)', descripcion: 'Manipula hilos generados con su propio Nen para coser heridas, reforzar articulaciones, atar oponentes o incluso reforzar el cuerpo de aliados heridos en pleno combate.' },
      { nombre: 'Precisión quirúrgica', descripcion: 'Su control del hilo es tan fino que puede usarlo tanto para tareas médicas de emergencia como para ataques letales de precisión milimétrica.' },
    ],
    enfrentamientos: [
      { rival: 'Fuerzas de seguridad de Yorknew City', arco: 'Yorknew City', contexto: 'Participa activamente en los enfrentamientos generados por la persecución de la Brigada tras la masacre en la subasta.', resultado: 'Logra salir con vida junto al resto del núcleo duro del grupo.' },
    ],
  },
  {
    slug: 'shizuku-murasaki',
    nombre: 'Shizuku Murasaki',
    apiNames: ['shizuku murasaki', 'shizuku'],
    malId: 5833,
    arcoPrincipal: 'yorknew-city',
    categoria: 'Antagonista',
    historia: [
      'Shizuku es miembro de la Brigada Fantasma, conocida por su personalidad distraída y despistada fuera de combate, en marcado contraste con la letalidad de su habilidad de Nen. Su torpeza cotidiana ha hecho que varios enemigos la subestimen fatalmente.',
      'Es una de las combatientes más consistentes del grupo en situaciones de largo alcance, usada estratégicamente por Chrollo para tareas que requieren un poder de aspiración casi absoluto sin importar el tipo de amenaza.',
    ],
    poderesNen: [
      { nombre: 'Aspiradora de Ranura (Vacuum Slot)', descripcion: 'Una aspiradora conjurada capaz de absorber literalmente cualquier cosa —objetos, personas o incluso habilidades enemigas dentro de ciertos límites— y almacenarla en un espacio dimensional aparte.' },
      { nombre: 'Percepción de combate inconsciente', descripcion: 'A pesar de su distracción habitual, reacciona con precisión sorprendente ante amenazas reales, revelando una intuición de combate muy entrenada.' },
    ],
    enfrentamientos: [
      { rival: 'Amenazas variadas en Yorknew City', arco: 'Yorknew City', contexto: 'Utiliza su aspiradora para neutralizar objetos y enemigos peligrosos durante los enfrentamientos de la Brigada.', resultado: 'Su habilidad demuestra ser una de las más versátiles del grupo para resolver situaciones inesperadas.' },
    ],
  },
  {
    slug: 'uvogin',
    nombre: 'Uvogin',
    apiNames: ['uvogin'],
    malId: 5836,
    arcoPrincipal: 'yorknew-city',
    categoria: 'Antagonista',
    historia: [
      'Uvogin es el miembro más fuerte físicamente de la Brigada Fantasma (Miembro #12), un gigante de fuerza descomunal y lealtad ciega hacia Chrollo y el resto del grupo. Su personalidad es ruidosa, brutal y directa, todo lo opuesto a la frialdad calculadora de sus compañeros.',
      'Su captura por parte de Kurapika en Yorknew City, usando una emboscada que aprovecha su exceso de confianza, desencadena la guerra abierta entre la Brigada y el clan Kurta, marcando uno de los puntos de inflexión más violentos del arco.',
    ],
    poderesNen: [
      { nombre: 'Fuerza bruta de Potenciador', descripcion: 'Su categoría de Nen es Potenciador puro, con una fuerza física que le permite destruir edificios y aplastar vehículos a mano limpia, sin necesidad de técnicas complejas.' },
      { nombre: 'Bala de Cañón Humano (Rage Roar)', descripcion: 'Reúne aura en su boca y la dispara como un proyectil de energía concentrada capaz de perforar concreto reforzado a distancia.' },
    ],
    enfrentamientos: [
      { rival: 'Kurapika', arco: 'Yorknew City', contexto: 'Kurapika lo aísla con una emboscada meticulosa y le implanta la Cadena de Juicio tras interrogarlo sobre la masacre del clan Kurta.', resultado: 'Uvogin es ejecutado, siendo el primer miembro de la Brigada en caer ante la venganza de Kurapika.' },
    ],
  },
  {
    slug: 'nobunaga-hazama',
    nombre: 'Nobunaga Hazama',
    apiNames: ['nobunaga hazama', 'nobunaga'],
    malId: 5831,
    arcoPrincipal: 'yorknew-city',
    categoria: 'Antagonista',
    historia: [
      'Nobunaga es el espadachín de la Brigada Fantasma (Miembro #10), un hombre de honor peculiar dentro de un grupo de criminales: valora los duelos justos y respeta a los oponentes fuertes, incluso cuando son enemigos declarados del grupo.',
      'Es uno de los miembros más veteranos y cercanos a Chrollo, y mantiene una relación de camaradería genuina con Machi y el resto del núcleo original de la Brigada, mostrando una lealtad que trasciende la mera conveniencia.',
    ],
    poderesNen: [
      { nombre: 'Transmutador de espada', descripcion: 'Refuerza su katana con aura, aumentando drásticamente su filo y potencia de corte hasta el punto de partir objetos que normalmente serían indestructibles para una hoja convencional.' },
      { nombre: 'Maestría en kenjutsu', descripcion: 'Décadas de práctica con la espada le dan una técnica de combate depurada, priorizando la velocidad y precisión del corte por sobre la fuerza bruta.' },
    ],
    enfrentamientos: [
      { rival: 'Enemigos de la Brigada en Yorknew City', arco: 'Yorknew City', contexto: 'Participa activamente en los enfrentamientos callejeros durante la cacería de Kurapika contra el grupo.', resultado: 'Sobrevive al arco gracias a su habilidad y a la cobertura del resto de la Brigada.' },
    ],
  },
  {
    slug: 'franklin-bordeau',
    nombre: 'Franklin Bordeau',
    apiNames: ['franklin bordeau', 'franklin bordeaux', 'franklin'],
    malId: 5828,
    arcoPrincipal: 'yorknew-city',
    categoria: 'Antagonista',
    historia: [
      'Franklin es el miembro de mayor tamaño físico de la Brigada Fantasma (Miembro #8), reconocible por sus manos descomunales. De pocas palabras y actitud reservada, es uno de los combatientes más confiables del grupo en enfrentamientos directos.',
      'Su lealtad hacia Chrollo y sus compañeros es absoluta, y suele encargarse de tareas de apoyo pesado durante los golpes y robos que ejecuta la Brigada.',
    ],
    poderesNen: [
      { nombre: 'Ametralladora de dedos (Double Fire Fingerguns)', descripcion: 'Convierte los dedos de sus manos en cañones capaces de disparar ráfagas de balas de aura, funcionando como un arma de fuego automática integrada a su propio cuerpo.' },
      { nombre: 'Fuerza de gran calibre', descripcion: 'Su tamaño y fuerza física lo convierten también en un combatiente formidable cuerpo a cuerpo, complementando su habilidad a distancia.' },
    ],
    enfrentamientos: [
      { rival: 'Enemigos de la Brigada en Yorknew City', arco: 'Yorknew City', contexto: 'Usa su habilidad de disparo para cubrir las retiradas y ataques del grupo durante la guerra contra Kurapika y la mafia local.', resultado: 'Se mantiene como uno de los pilares defensivos de la Brigada durante todo el arco.' },
    ],
  },
  {
    slug: 'phinks-magcub',
    nombre: 'Phinks Magcub',
    apiNames: ['phinks magcub', 'phinks magkav', 'phinks'],
    malId: 5834,
    arcoPrincipal: 'yorknew-city',
    categoria: 'Antagonista',
    historia: [
      'Phinks es un miembro veterano de la Brigada Fantasma (Miembro #7), de temperamento irritable y directo. Forma parte del núcleo original del grupo junto a Nobunaga, Machi y Feitan, con quienes comparte una relación de confianza forjada durante años de crímenes compartidos.',
      'Es uno de los combatientes más pragmáticos de la Brigada: prioriza la eficiencia sobre el espectáculo, y no duda en recurrir a la fuerza bruta cuando la situación lo exige.',
    ],
    poderesNen: [
      { nombre: 'Puño de Hierro (Percussion of Iron Fist)', descripcion: 'Habilidad de Potenciador que endurece su puño hasta una dureza comparable al metal, dándole golpes capaces de romper huesos y estructuras con facilidad.' },
      { nombre: 'Resistencia física superior', descripcion: 'Complementa su fuerza con una notable capacidad de aguante en combates prolongados, algo poco común incluso dentro de la Brigada.' },
    ],
    enfrentamientos: [
      { rival: 'Enemigos de la Brigada en Yorknew City', arco: 'Yorknew City', contexto: 'Participa en los enfrentamientos violentos contra la mafia y los cazadores enviados a detener a la Brigada.', resultado: 'Su fuerza bruta resulta decisiva en varios choques directos durante el arco.' },
    ],
  },
  {
    slug: 'shalnark',
    nombre: 'Shalnark',
    apiNames: ['shalnark ryuseih', 'shalnark'],
    malId: 5832,
    arcoPrincipal: 'yorknew-city',
    categoria: 'Antagonista',
    historia: [
      'Shalnark es un miembro de la Brigada Fantasma (Miembro #5) de apariencia amigable y sonriente, lo que contrasta con su naturaleza fría y calculadora. Es uno de los más leales a Chrollo, hasta el punto de portar consigo un teléfono con la habilidad de este.',
      'Su carácter sociable le permite infiltrarse y ganarse la confianza de otros con facilidad, una herramienta que usa tanto para reunir información como para tender trampas a nombre de la Brigada.',
    ],
    poderesNen: [
      { nombre: 'Antena de Control (Black Voice)', descripcion: 'Clava una antena en la cabeza de su víctima que le permite controlar sus acciones mediante un teléfono, convirtiéndola en un títere obediente por tiempo limitado.' },
      { nombre: 'Manipulador estratégico', descripcion: 'Su categoría Manipuladora lo convierte en uno de los miembros más útiles para tareas de infiltración y control indirecto dentro de los planes del grupo.' },
    ],
    enfrentamientos: [
      { rival: 'Objetivos infiltrados en Yorknew City', arco: 'Yorknew City', contexto: 'Usa su habilidad de control para obtener información y neutralizar amenazas sin necesidad de enfrentamientos directos.', resultado: 'Su aporte discreto resulta clave en varias jugadas estratégicas de la Brigada durante el arco.' },
    ],
  },
  {
    slug: 'pakunoda',
    nombre: 'Pakunoda',
    apiNames: ['pakunoda'],
    malId: 5835,
    arcoPrincipal: 'yorknew-city',
    categoria: 'Antagonista',
    historia: [
      'Pakunoda es miembro de la Brigada Fantasma (Miembro #9) y una de las combatientes más peligrosas del grupo por su habilidad para extraer información directamente de la mente de otras personas. Su lealtad hacia Chrollo es total y sincera.',
      'Tras la captura de Chrollo por Kurapika, Pakunoda toma decisiones drásticas para proteger al líder del grupo, incluyendo compartir información vital sobre la Brigada con los propios enemigos a cambio de garantías, un acto que la marca como una de las figuras más trágicas del arco.',
    ],
    poderesNen: [
      { nombre: 'Lectura de Memoria (Psychometry)', descripcion: 'Al tocar la cabeza de una persona, puede extraer y visualizar sus recuerdos, convirtiéndola en la interrogadora ideal de la Brigada.' },
      { nombre: 'Píldoras de memoria', descripcion: 'Puede materializar los recuerdos extraídos en forma de píldoras que, al ser ingeridas, transmiten esa información a otra persona.' },
    ],
    enfrentamientos: [
      { rival: 'Kurapika (negociación)', arco: 'Yorknew City', contexto: 'Tras la captura de Chrollo, Pakunoda negocia directamente con Kurapika entregando información crucial sobre la Brigada.', resultado: 'Muere poco después por las reglas de una de sus propias cadenas de Nen, en un sacrificio que altera el curso del conflicto.' },
    ],
  },
  {
    slug: 'kortopi',
    nombre: 'Kortopi',
    apiNames: ['kortopi', 'koltopi', 'tounofmaill koltopi'],
    malId: 5829,
    arcoPrincipal: 'yorknew-city',
    categoria: 'Antagonista',
    historia: [
      'Kortopi es uno de los miembros más silenciosos y misteriosos de la Brigada Fantasma (Miembro #6), rara vez visto en combate directo. Su función dentro del grupo suele ser de apoyo logístico y falsificación.',
      'A pesar de su bajo perfil, es considerado un usuario de Nen valioso por la Brigada gracias a la utilidad práctica de su habilidad para las operaciones del grupo.',
    ],
    poderesNen: [
      { nombre: 'Réplica Falsa (Fake Doll Effect)', descripcion: 'Puede crear réplicas exactas e inertes de objetos que haya tocado, útiles para falsificar pertenencias, señuelos o pruebas durante los golpes de la Brigada.' },
    ],
    enfrentamientos: [
      { rival: 'Sin enfrentamientos directos destacados', arco: '—', contexto: 'Su rol dentro de la Brigada es mayormente de soporte, evitando el combate abierto siempre que es posible.', resultado: 'Se mantiene al margen de los choques más violentos del arco de Yorknew City.' },
    ],
  },
  {
    slug: 'bonolenov-ndongo',
    nombre: 'Bonolenov Ndongo',
    apiNames: ['bonolenov ndongo', 'bonolenov'],
    malId: 5827,
    arcoPrincipal: 'yorknew-city',
    categoria: 'Antagonista',
    historia: [
      'Bonolenov es un miembro de la Brigada Fantasma (Miembro #11), un excombatiente cubierto de vendajes que oculta cicatrices de guerras pasadas. De pocas palabras, participa en las operaciones del grupo con una disciplina casi militar.',
      'Su historia previa a unirse a la Brigada permanece en gran parte sin explorar, pero su presencia dentro del grupo refuerza la idea de que Chrollo recluta a personas marcadas por la violencia y el abandono social.',
    ],
    poderesNen: [
      { nombre: 'Combate con lanza', descripcion: 'Utiliza una lanza como arma principal, reforzada con su aura de Potenciador para aumentar el alcance y la potencia de sus estocadas.' },
    ],
    enfrentamientos: [
      { rival: 'Enemigos de la Brigada en Yorknew City', arco: 'Yorknew City', contexto: 'Participa en los enfrentamientos generales del grupo durante la crisis desatada por la cacería de Kurapika.', resultado: 'Sobrevive al arco manteniendo un perfil de combate discreto.' },
    ],
  },
  {
    slug: 'zeno-zoldyck',
    nombre: 'Zeno Zoldyck',
    apiNames: ['zeno zoldyck', 'zeno'],
    malId: 59,
    arcoPrincipal: 'zoldyck',
    categoria: 'Secundario',
    historia: [
      'Zeno es el abuelo de Killua y el patriarca retirado de la familia Zoldyck, aunque sigue siendo uno de los asesinos más poderosos y solicitados del mundo pese a su avanzada edad. Su experiencia y sabiduría lo convierten en una referencia de combate incluso para su propio hijo Silva.',
      'Mantiene una relación cercana y algo más permisiva con Killua que la de sus padres, mostrando un cariño particular por el nieto que decide alejarse del oficio familiar.',
    ],
    poderesNen: [
      { nombre: 'Potenciador de clase mundial', descripcion: 'Décadas de refinamiento le dan un control del Nen extremadamente eficiente, compensando cualquier declive físico propio de la edad.' },
      { nombre: 'Dragón de Fuego Ardiente (Dragon Dive)', descripcion: 'Conjura un dragón de fuego gigante capaz de causar destrucción masiva, una de las demostraciones de poder más contundentes vistas en la familia Zoldyck.' },
    ],
    enfrentamientos: [
      { rival: 'Amenazas contra la familia Zoldyck', arco: 'Elección Presidencial', contexto: 'Actúa como fuerza de seguridad de máximo nivel para proteger los intereses familiares durante los eventos políticos de la Asociación Hunter.', resultado: 'Su sola reputación basta para disuadir a la mayoría de posibles agresores.' },
    ],
  },
  {
    slug: 'kalluto-zoldyck',
    nombre: 'Kalluto Zoldyck',
    apiNames: ['kalluto zoldyck', 'kalluto'],
    malId: 6089,
    arcoPrincipal: 'eleccion-presidencial',
    categoria: 'Secundario',
    historia: [
      'Kalluto es el menor de los hermanos Zoldyck, criado con una ambigüedad de género deliberada por la familia y entrenado desde pequeño en las artes del asesinato, especialmente en el uso de armas tradicionales japonesas.',
      'Tras los eventos de Yorknew City, Kalluto se une a la Brigada Fantasma como reemplazo de un miembro caído, una decisión que sorprende incluso a su propia familia y que lo posiciona como un puente entre ambos grupos criminales.',
    ],
    poderesNen: [
      { nombre: 'Transmutador con abanicos', descripcion: 'Utiliza abanicos de papel como arma, capaces de generar cuchillas de viento cortantes al combinarlos con su control de Nen.' },
      { nombre: 'Disciplina de asesino Zoldyck', descripcion: 'Como el resto de sus hermanos, recibió un entrenamiento extremo en sigilo y eliminación de objetivos desde la infancia.' },
    ],
    enfrentamientos: [
      { rival: 'Sin enfrentamientos directos destacados', arco: 'Elección Presidencial', contexto: 'Su rol dentro de la Brigada Fantasma tras Yorknew City se mantiene mayormente en segundo plano.', resultado: 'Su verdadero potencial en combate aún no se muestra a fondo en la historia.' },
    ],
  },
  {
    slug: 'milluki-zoldyck',
    nombre: 'Milluki Zoldyck',
    apiNames: ['milluki zoldyck', 'milluki'],
    malId: 33375,
    arcoPrincipal: 'zoldyck',
    categoria: 'Secundario',
    historia: [
      'Milluki es el segundo hijo de la familia Zoldyck, de complexión distinta a la del resto de sus hermanos atléticos y con una personalidad más volcada hacia la tecnología que hacia el combate directo. Es el hacker de la familia, encargado de tareas de vigilancia e inteligencia.',
      'Su relación con Killua es tensa, marcada por cierta envidia hacia el talento natural de su hermano menor, a quien considera injustamente favorecido por el resto de la familia.',
    ],
    poderesNen: [
      { nombre: 'Habilidades informáticas', descripcion: 'Aunque su Nen en combate es limitado comparado con el resto de su familia, compensa con un dominio experto de sistemas informáticos y vigilancia electrónica.' },
    ],
    enfrentamientos: [
      { rival: 'Sin enfrentamientos directos destacados', arco: 'Zoldyck', contexto: 'Su función dentro de la familia es principalmente de soporte técnico y vigilancia, no de combate.', resultado: 'Rara vez se involucra en confrontaciones directas a lo largo de la historia.' },
    ],
  },
  {
    slug: 'kikyo-zoldyck',
    nombre: 'Kikyo Zoldyck',
    apiNames: ['kikyo zoldyck', 'kikyo'],
    malId: 59457,
    arcoPrincipal: 'zoldyck',
    categoria: 'Secundario',
    historia: [
      'Kikyo es la madre de Killua y el resto de los hermanos Zoldyck, una mujer que oculta su rostro tras un dispositivo de aumento y que muestra un fanatismo particular por mantener las tradiciones y el legado de asesinos de la familia.',
      'Su forma de amor hacia sus hijos está profundamente entrelazada con las expectativas y la disciplina familiar, lo que la lleva a chocar directamente con la decisión de Killua de abandonar el oficio familiar.',
    ],
    poderesNen: [
      { nombre: 'Entrenamiento familiar Zoldyck', descripcion: 'Como el resto de la familia, posee habilidades de combate y sigilo propias de la disciplina de asesinos Zoldyck, aunque rara vez las despliega en pantalla.' },
    ],
    enfrentamientos: [
      { rival: 'Killua Zoldyck (conflicto familiar)', arco: 'Zoldyck', contexto: 'Se opone firmemente a la decisión de Killua de alejarse del camino de asesino trazado por la familia.', resultado: 'La tensión entre ambos queda como una herida familiar abierta durante gran parte de la historia.' },
    ],
  },
  {
    slug: 'komugi',
    nombre: 'Komugi',
    apiNames: ['komugi'],
    malId: 14313,
    arcoPrincipal: 'hormiga-quimera',
    categoria: 'Secundario',
    historia: [
      'Komugi es una joven ciega y campeona indiscutida del Gungi, un complejo juego de estrategia de mesa. Su encuentro con Meruem, buscando un rival digno tras su combate contra Netero, se convierte en una de las relaciones más humanizantes e inesperadas de toda la obra.',
      'A pesar de no tener ninguna habilidad de combate, su determinación y maestría en el Gungi despiertan en Meruem un respeto genuino hacia la humanidad, contradiciendo por completo el desprecio con el que este había empezado su historia.',
    ],
    poderesNen: [
      { nombre: 'Sin habilidades de Nen', descripcion: 'Komugi no es usuaria de Nen; su "poder" es puramente intelectual: una capacidad de concentración y análisis estratégico en el Gungi que ni siquiera Meruem logra igualar de inmediato.' },
    ],
    enfrentamientos: [
      { rival: 'Meruem (partidas de Gungi)', arco: 'Hormiga Quimera', contexto: 'Juega innumerables partidas de Gungi contra Meruem mientras este se recupera del veneno de Netero.', resultado: 'Aunque pierde la mayoría de las partidas, su nivel de juego termina ganándose el respeto absoluto del Rey Hormiga.' },
    ],
  },
  {
    slug: 'knuckle-bine',
    nombre: 'Knuckle Bine',
    apiNames: ['knuckle bine', 'knuckle'],
    malId: 29809,
    arcoPrincipal: 'hormiga-quimera',
    categoria: 'Secundario',
    historia: [
      'Knuckle es un Hunter joven y de carácter explosivo, reclutado por Netero como parte del comando de asalto contra las Hormigas Quimera. Su relación de rivalidad y amistad con Shoot McMahon es central en su desarrollo durante el arco.',
      'Su determinación lo lleva a enfrentar a Youpi en un combate desesperado usando una habilidad de altísimo riesgo, del cual sale gravemente perjudicado pero con el objetivo cumplido a largo plazo.',
    ],
    poderesNen: [
      { nombre: 'Puño Cazafortunas (Hakoware)', descripcion: 'Al golpear a un oponente, le "presta" una cantidad de su propia fuerza vital que deberá devolver con intereses divinos si no lo derrota en 24 horas, drenándolo progresivamente.' },
    ],
    enfrentamientos: [
      { rival: 'Youpi', arco: 'Hormiga Quimera', contexto: 'Usa su habilidad de préstamo de fuerza contra Youpi sin que este se dé cuenta al principio del golpe.', resultado: 'Youpi absorbe accidentalmente su habilidad, dejando a Knuckle debilitado por un largo periodo, aunque el plan a largo plazo termina beneficiando al bando Hunter.' },
    ],
  },
  {
    slug: 'morel-mackernasey',
    nombre: 'Morel Mackernasey',
    apiNames: ['morel mackernasey', 'morel'],
    malId: 29806,
    arcoPrincipal: 'hormiga-quimera',
    categoria: 'Secundario',
    historia: [
      'Morel es un Hunter veterano y fumador empedernido que lidera el escuadrón de jóvenes Hunters (incluyendo a Knuckle y Shoot) durante la operación de exterminio de las Hormigas Quimera. Su experiencia y liderazgo son clave para mantener con vida a su equipo en un enemigo muy superior en poder individual.',
      'Su relación mentor-alumno con los Hunters más jóvenes a su cargo aporta una calidez poco común en medio de uno de los arcos más oscuros de la serie.',
    ],
    poderesNen: [
      { nombre: 'Manipulador de humo', descripcion: 'Crea y controla figuras de humo con su pipa, capaces de tomar formas sólidas de animales u objetos que usa tanto para combate como para vigilancia a distancia.' },
    ],
    enfrentamientos: [
      { rival: 'Shaiapouf (indirectamente)', arco: 'Hormiga Quimera', contexto: 'Coordina la estrategia de su escuadrón contra las fuerzas de la Guardia Real durante el asalto al palacio de Meruem.', resultado: 'Logra mantener a su equipo funcional pese a la enorme diferencia de poder frente a las Hormigas de élite.' },
    ],
  },
  {
    slug: 'pariston-hill',
    nombre: 'Pariston Hill',
    apiNames: ['pariston hill', 'pariston'],
    malId: 55071,
    arcoPrincipal: 'eleccion-presidencial',
    categoria: 'Secundario',
    historia: [
      'Pariston es el vicepresidente de la Asociación Hunter bajo Netero y uno de los candidatos más carismáticos y manipuladores en la elección del decimotercer presidente. Su personalidad extravagante y su sonrisa permanente esconden una mente política extremadamente calculadora.',
      'A diferencia de otros candidatos, Pariston no busca necesariamente ganar la presidencia por poder o ideología, sino que parece disfrutar genuinamente del caos y la manipulación del proceso electoral como un juego personal.',
    ],
    poderesNen: [
      { nombre: 'Manipulación política', descripcion: 'Su verdadera arma no es el Nen de combate sino su habilidad para manipular información, alianzas y percepciones dentro de la Asociación Hunter durante la contienda electoral.' },
    ],
    enfrentamientos: [
      { rival: 'Candidatos rivales en la elección', arco: 'Elección Presidencial', contexto: 'Compite y maniobra políticamente contra el resto de los doce candidatos a la presidencia de la Asociación Hunter.', resultado: 'Sus jugadas alteran repetidamente el curso de la elección, consolidándolo como uno de los actores más impredecibles del arco.' },
    ],
  },
];

export const findCharacterBySlug = (slug) => characters.find((c) => c.slug === slug);
