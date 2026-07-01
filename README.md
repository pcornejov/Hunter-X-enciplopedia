# Hunterpedia

Enciclopedia web de fans sobre **Hunter x Hunter**: personajes, historia, poderes Nen, enfrentamientos, arcos
argumentales y facciones. Construida con React + Vite.

## Fuentes de datos

- **Contenido curado** (historia, poderes Nen, enfrentamientos, arcos, grupos) escrito para este proyecto en
  `src/data/`.
- **Imágenes y datos complementarios** (edad, ocupación, tipo de Nen según el wiki) obtenidos en tiempo real
  desde [Jikan](https://jikan.moe), una API no oficial y gratuita de MyAnimeList que **no requiere registro
  ni API key**.

Ambas fuentes se combinan por `malId` de cada personaje en `src/utils/mergeCharacterData.js`. Si la API no
responde, el sitio sigue mostrando el contenido curado con una imagen de reemplazo y un aviso.

## Configuración

```bash
npm install
npm run dev
```

No se necesita ninguna variable de entorno ni API key: Jikan es de acceso público y directo.

## Scripts

- `npm run dev` — servidor de desarrollo.
- `npm run build` — build de producción en `dist/`.
- `npm run preview` — sirve el build de producción localmente.
- `npm run lint` — linter (oxlint).

## Estructura

```
src/
├── api/jikanApi.js          # cliente de la API Jikan (con manejo de errores/timeout)
├── data/                    # contenido curado: personajes, arcos, tipos de Nen, grupos
├── utils/
│   ├── mergeCharacterData.js
│   └── parseCharacterAbout.js  # extrae campos estructurados del bio de Jikan
├── hooks/                   # useCharacters (listado) y useCharacterDetail (ficha)
├── components/              # Navbar, Footer, CharacterCard, buscador, filtros, estados de carga/error
└── pages/                   # Home, Personajes, Detalle de personaje, Arcos, Nen, Grupos
```

## Aviso de derechos de autor

Este es un proyecto de fans, sin fines de lucro y con fines educativos. Hunter x Hunter es propiedad de
Yoshihiro Togashi, Shueisha y sus respectivos licenciatarios. Las imágenes de personajes se cargan desde una
API pública de terceros (Jikan / MyAnimeList) y no se alojan en este repositorio.
