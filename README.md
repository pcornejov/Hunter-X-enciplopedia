# Hunterpedia

Enciclopedia web de fans sobre **Hunter x Hunter**: personajes, historia, poderes Nen, enfrentamientos, arcos
argumentales y facciones. Construida con React + Vite.

## Fuentes de datos

- **Contenido curado** (historia, poderes Nen, enfrentamientos) escrito para este proyecto en `src/data/`.
- **Datos estructurados e imágenes** (tipo de Nen, habilidades, profesión, afiliaciones, estado, foto) obtenidos
  en tiempo real desde la API pública y gratuita [hxh-api](https://hxh-api.onrender.com)
  ([documentación](https://github.com/akocero/hxh_api_docs)).

Ambas fuentes se combinan por nombre de personaje en `src/utils/mergeCharacterData.js`. Si la API no responde,
el sitio sigue mostrando el contenido curado con una imagen de reemplazo y un aviso.

## Configuración

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Obtén una API key gratuita de hxh-api:
   ```bash
   curl -X POST https://hxh-api.onrender.com/api/v1/guest/register \
     -H "Content-Type: application/json" \
     -d '{"email":"tu-email@ejemplo.com","name":"Tu Nombre","usage":"proyecto educativo"}'
   ```
   Revisa tu correo y sigue el enlace de verificación para activar la key.
3. Copia `.env.example` a `.env.local` y pega tu key:
   ```bash
   cp .env.example .env.local
   ```
4. Corre el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` — servidor de desarrollo.
- `npm run build` — build de producción en `dist/`.
- `npm run preview` — sirve el build de producción localmente.
- `npm run lint` — linter (oxlint).

## Estructura

```
src/
├── api/hxhApi.js            # cliente de la API hxh-api (con manejo de errores/timeout)
├── data/                    # contenido curado: personajes, arcos, tipos de Nen
├── utils/mergeCharacterData.js
├── hooks/useCharacters.js   # hook que fusiona API + contenido local
├── components/              # Navbar, Footer, CharacterCard, buscador, filtros, estados de carga/error
└── pages/                   # Home, Personajes, Detalle de personaje, Arcos, Nen, Grupos
```

## Aviso de derechos de autor

Este es un proyecto de fans, sin fines de lucro y con fines educativos. Hunter x Hunter es propiedad de
Yoshihiro Togashi, Shueisha y sus respectivos licenciatarios. Las imágenes de personajes se cargan desde una
API pública de terceros y no se alojan en este repositorio.
