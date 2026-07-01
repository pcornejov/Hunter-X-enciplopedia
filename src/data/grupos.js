export const grupos = [
  {
    slug: 'brigada-fantasma',
    nombre: 'Brigada Fantasma (Genei Ryodan)',
    tambienConocidoComo: 'Los Arácnidos (Spiders)',
    descripcion:
      'Organización de trece ladrones de rango S, fundada por Chrollo Lucilfer, responsable de la masacre del clan Kurta. Cada miembro lleva tatuada una araña que representa su número dentro del grupo.',
    miembrosSlugs: [
      'chrollo-lucilfer',
      'feitan-portor',
      'machi-komacine',
      'shizuku-murasaki',
      'uvogin',
      'nobunaga-hazama',
      'franklin-bordeau',
      'phinks-magcub',
      'shalnark',
      'pakunoda',
      'kortopi',
      'bonolenov-ndongo',
      'kalluto-zoldyck',
    ],
  },
  {
    slug: 'familia-zoldyck',
    nombre: 'Familia Zoldyck',
    tambienConocidoComo: 'La familia de asesinos más famosa del mundo',
    descripcion:
      'Estirpe de asesinos profesionales que ha entrenado a sus miembros durante generaciones para convertirlos en armas humanas. Habitan una mansión fortificada llena de trampas y pruebas de seguridad extremas.',
    miembrosSlugs: [
      'killua-zoldyck',
      'illumi-zoldyck',
      'silva-zoldyck',
      'alluka-zoldyck',
      'zeno-zoldyck',
      'kalluto-zoldyck',
      'milluki-zoldyck',
      'kikyo-zoldyck',
    ],
  },
  {
    slug: 'guardia-real',
    nombre: 'Guardia Real de las Hormigas Quimera',
    tambienConocidoComo: 'Los tres oficiales de Meruem',
    descripcion:
      'Los tres primeros súbditos nacidos de la Reina Hormiga junto con Meruem, dotados de un poder e inteligencia muy superiores al resto de la colonia. Sirven al Rey con una devoción absoluta.',
    miembrosSlugs: ['meruem', 'neferpitou', 'shaiapouf', 'youpi'],
  },
  {
    slug: 'asociacion-hunter',
    nombre: 'Asociación Hunter',
    tambienConocidoComo: 'Hunter Association',
    descripcion:
      'Organización global que certifica a los Hunters profesionales, otorgándoles privilegios y recursos únicos a cambio de tareas de gran responsabilidad, desde la conservación de especies hasta la caza de criminales de rango S.',
    miembrosSlugs: ['isaac-netero', 'ging-freecss', 'biscuit-krueger', 'kurapika', 'leorio-paradinight'],
  },
];

export const findGrupoBySlug = (slug) => grupos.find((g) => g.slug === slug);
