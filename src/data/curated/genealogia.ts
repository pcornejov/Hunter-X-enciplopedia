/**
 * Relaciones familiares y de tutela entre personajes.
 * Se usan para dibujar el árbol Zoldyck y para mostrar vínculos en las fichas.
 */

export type RelationKind = 'padre' | 'madre' | 'hermano' | 'abuelo' | 'bisabuelo' | 'tia' | 'maestro' | 'tutor';

export interface FamilyLink {
  /** Slug del personaje al que pertenece la relación. */
  from: string;
  /** Slug del familiar. Puede no estar en la base si la API no lo trae. */
  to: string;
  kind: RelationKind;
  /** Etiqueta legible desde el punto de vista de `from`. */
  label: string;
}

export const genealogia: FamilyLink[] = [
  // --- Zoldyck ------------------------------------------------------------
  { from: 'killua-zoldyck', to: 'silva-zoldyck', kind: 'padre', label: 'Padre' },
  { from: 'killua-zoldyck', to: 'zeno-zoldyck', kind: 'abuelo', label: 'Abuelo' },
  { from: 'killua-zoldyck', to: 'illumi-zoldyck', kind: 'hermano', label: 'Hermano mayor' },
  { from: 'killua-zoldyck', to: 'milluki-zoldyck', kind: 'hermano', label: 'Hermano mayor' },
  { from: 'killua-zoldyck', to: 'alluka-zoldyck', kind: 'hermano', label: 'Hermana menor' },
  { from: 'killua-zoldyck', to: 'kalluto-zoldyck', kind: 'hermano', label: 'Hermano menor' },

  { from: 'illumi-zoldyck', to: 'silva-zoldyck', kind: 'padre', label: 'Padre' },
  { from: 'illumi-zoldyck', to: 'killua-zoldyck', kind: 'hermano', label: 'Hermano menor' },
  { from: 'milluki-zoldyck', to: 'silva-zoldyck', kind: 'padre', label: 'Padre' },
  { from: 'alluka-zoldyck', to: 'silva-zoldyck', kind: 'padre', label: 'Padre' },
  { from: 'alluka-zoldyck', to: 'killua-zoldyck', kind: 'hermano', label: 'Hermano mayor' },
  { from: 'kalluto-zoldyck', to: 'silva-zoldyck', kind: 'padre', label: 'Padre' },
  { from: 'silva-zoldyck', to: 'zeno-zoldyck', kind: 'padre', label: 'Padre' },

  // --- Freecss ------------------------------------------------------------
  { from: 'gon-freecss', to: 'ging-freecss', kind: 'padre', label: 'Padre' },
  { from: 'gon-freecss', to: 'mito-freecss', kind: 'tia', label: 'Tía y tutora legal' },
  { from: 'mito-freecss', to: 'gon-freecss', kind: 'tutor', label: 'Sobrino a su cargo' },
  { from: 'ging-freecss', to: 'gon-freecss', kind: 'tutor', label: 'Hijo' },
  { from: 'ging-freecss', to: 'kite', kind: 'maestro', label: 'Discípulo' },
  { from: 'kite', to: 'ging-freecss', kind: 'maestro', label: 'Maestro' },

  // --- Maestros -----------------------------------------------------------
  { from: 'gon-freecss', to: 'biscuit-krueger', kind: 'maestro', label: 'Maestra' },
  { from: 'killua-zoldyck', to: 'biscuit-krueger', kind: 'maestro', label: 'Maestra' },
  { from: 'gon-freecss', to: 'wing', kind: 'maestro', label: 'Maestro' },
  { from: 'killua-zoldyck', to: 'wing', kind: 'maestro', label: 'Maestro' },
  { from: 'zushi', to: 'wing', kind: 'maestro', label: 'Maestro' },
  { from: 'wing', to: 'biscuit-krueger', kind: 'maestro', label: 'Maestra' },
  { from: 'knuckle-bine', to: 'morel-mackernasey', kind: 'maestro', label: 'Maestro' },
  { from: 'shoot-mcmahon', to: 'morel-mackernasey', kind: 'maestro', label: 'Maestro' },
];

/** Estructura del árbol Zoldyck para dibujarlo por generaciones. */
export const arbolZoldyck = {
  generaciones: [
    {
      titulo: 'Segunda generación',
      miembros: [{ slug: 'zeno-zoldyck', rol: 'Abuelo, asesino en activo' }],
    },
    {
      titulo: 'Tercera generación',
      miembros: [{ slug: 'silva-zoldyck', rol: 'Cabeza de familia' }],
    },
    {
      titulo: 'Cuarta generación',
      miembros: [
        { slug: 'illumi-zoldyck', rol: 'Primogénito' },
        { slug: 'milluki-zoldyck', rol: 'Segundo hijo' },
        { slug: 'killua-zoldyck', rol: 'Heredero designado' },
        { slug: 'alluka-zoldyck', rol: 'Cuarta hija' },
        { slug: 'kalluto-zoldyck', rol: 'Quinto hijo' },
      ],
    },
    {
      titulo: 'Servicio de la casa',
      miembros: [{ slug: 'canary', rol: 'Guardiana del portón' }],
    },
  ],
};

/** Relaciones familiares de un personaje, para pintarlas en su ficha. */
export function relacionesDe(slug: string): FamilyLink[] {
  return genealogia.filter((link) => link.from === slug);
}
