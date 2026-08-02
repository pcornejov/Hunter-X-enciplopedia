/**
 * Helpers de rutas. El sitio vive bajo un subdirectorio en GitHub Pages
 * (`/Hunter-X-enciplopedia/`), asi que ningun enlace puede escribirse a mano
 * con una barra inicial: todo pasa por `url()`.
 */

const BASE = import.meta.env.BASE_URL;

/** Construye una URL interna respetando el base path y el trailing slash. */
export function url(pathname = ''): string {
  const clean = String(pathname).replace(/^\/+/, '').replace(/\/+$/, '');
  const base = BASE.endsWith('/') ? BASE : `${BASE}/`;
  return clean ? `${base}${clean}/` : base;
}

/** Igual que `url()` pero para ficheros (sin barra final): imagenes, feeds... */
export function asset(pathname: string): string {
  const clean = String(pathname).replace(/^\/+/, '');
  const base = BASE.endsWith('/') ? BASE : `${BASE}/`;
  return `${base}${clean}`;
}

/** Marca el enlace activo en la navegacion comparando el primer segmento. */
export function isActive(currentPath: string, target: string): boolean {
  const normalize = (value: string) =>
    value.replace(BASE, '/').replace(/^\/+/, '').replace(/\/+$/, '').split('/')[0] ?? '';
  const current = normalize(currentPath);
  const candidate = normalize(target);
  if (candidate === '') return current === '';
  return current === candidate;
}
