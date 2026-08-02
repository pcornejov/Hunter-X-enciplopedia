# Enciclopedia Hunter × Hunter

Enciclopedia web en español sobre **Hunter x Hunter**, construida con [Astro](https://astro.build) y
desplegada de forma estática en GitHub Pages.

**En vivo:** https://pcornejov.github.io/Hunter-X-enciplopedia/

---

## Qué incluye

| Sección | Contenido |
| --- | --- |
| **Personajes** | 159 fichas con retrato, alias, seiyuu, categoría de Nen, facciones y arcos. Buscador y filtros que funcionan sin recargar la página. |
| **Arcos** | Los 8 arcos narrativos con resumen, momentos clave, reparto y equivalencias entre capítulos del manga y episodios del anime de 2011. |
| **Nen** | Las 6 categorías con hexágono de afinidad en SVG, tabla de eficiencia, adivinación del agua, los 4 principios básicos y las 7 aplicaciones avanzadas. |
| **Obras** | Las 10 obras de la franquicia (manga, dos series de TV, OVAs y películas) con datos, puntuaciones, staff y enlaces oficiales. |
| **Episodios** | 210 episodios de las dos adaptaciones, con título japonés, fecha de emisión, miniatura y sinopsis, agrupados por arco. |
| **Facciones** | Asociación de Cazadores, Zodiacos, Brigada Fantasma, familia Zoldyck, Hormigas Quimera y clan Kurta. |
| **Glosario** | Términos clave de la obra con su original en japonés. |

## De dónde salen los datos

| Fuente | API | Qué aporta |
| --- | --- | --- |
| [AniList](https://anilist.co) | GraphQL (`graphql.anilist.co`) | Obras, personajes, retratos, seiyuu, staff, puntuaciones y rankings. |
| [Kitsu](https://kitsu.app) | JSON:API (`kitsu.io/api/edge`) | Lista de episodios con título, fecha de emisión, duración, miniatura y sinopsis. |

Todo lo narrativo en español —arcos, Nen, facciones, glosario y las biografías del reparto
principal— está escrito para este sitio y vive en `src/data/curated/`. Cuando una ficha muestra
texto traído de AniList se señala explícitamente y se deja en su idioma original.

Las imágenes **no** se copian al repositorio: se enlazan desde los CDN públicos de AniList y Kitsu.

## Arquitectura

```
scripts/
  fetch-data.mjs        Ingesta contra AniList y Kitsu (reintentos, backoff, rate limit)
  validate-data.mjs     Valida los JSON generados antes de construir
  validate-build.mjs    Valida dist/: enlaces rotos, metadatos, imágenes, ficheros de Pages
  lib/                  Cliente HTTP y normalización de texto compartidos

src/
  data/generated/       JSON versionado que produce la ingesta (fuente de verdad del build)
  data/curated/         Contenido en español escrito a mano
  lib/                  Tipos, acceso a datos y helpers de rutas
  components/           Piezas de UI (.astro, sin framework de cliente)
  layouts/ pages/       Layout base y rutas estáticas
```

El build es **100 % estático y reproducible**: los JSON están versionados, así que el sitio se
reconstruye igual aunque las APIs estén caídas. La ingesta solo se ejecuta a mano o desde el
workflow semanal.

## Validación

Cuatro controles encadenados, todos ejecutados en CI antes de publicar:

1. **`npm run validate:data`** — comprueba que no falten obras ni personajes clave, que los slugs sean
   únicos y válidos, que las imágenes vengan de hosts esperados y que la numeración de episodios no
   tenga huecos.
2. **Integridad referencial** (`src/lib/data.ts`) — si el contenido curado cita un personaje, un arco,
   una categoría de Nen o una facción que no existe, el build falla antes de generar una sola página.
3. **`npm run check`** — comprobación de tipos de TypeScript sobre todos los `.astro` y `.ts`.
4. **`npm run validate:build`** — recorre `dist/` y verifica enlaces internos rotos, páginas sin
   `<title>`/`meta description`/`<h1>`, imágenes sin `alt` o en hosts no permitidos, y la presencia de
   `404.html`, `sitemap-index.xml`, `robots.txt` y `.nojekyll`.

```bash
npm run verify   # ejecuta los cuatro en orden
```

## Desarrollo

```bash
npm install
npm run dev          # servidor de desarrollo en localhost:4321
npm run fetch:data   # vuelve a descargar los datos de las APIs
npm run verify       # valida datos, tipos, build y sitio construido
```

Node 20.3 o superior.

## Despliegue

`.github/workflows/deploy.yml` construye, valida y publica en GitHub Pages en cada push a `main`.
Requiere que **Settings → Pages → Source** esté puesto en **GitHub Actions**.

`.github/workflows/refrescar-datos.yml` vuelve a ejecutar la ingesta cada lunes; si los datos cambian
y el sitio sigue construyendo y validando, commitea los JSON nuevos en `main`, lo que dispara un
despliegue.

Para publicar bajo otro dominio o repositorio basta con cambiar `SITE` y `BASE` en `astro.config.mjs`
(y el `BASE` de `scripts/validate-build.mjs`).

## Créditos

Proyecto de fans sin ánimo de lucro. **Hunter x Hunter** es obra de Yoshihiro Togashi, publicada por
Shueisha y adaptada por Nippon Animation (1999) y Madhouse (2011). Los datos pertenecen a las
comunidades de AniList y Kitsu.
