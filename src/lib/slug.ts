/** Slug para anclas de pagina (glosario, secciones). Espejo del helper de scripts/. */
export function slugifyTerm(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
