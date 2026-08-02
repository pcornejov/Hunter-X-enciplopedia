#!/usr/bin/env node
/**
 * Prueba de humo en navegador sobre el sitio ya construido.
 *
 * Es la ultima capa de validacion: comprueba lo que ni el type-check ni el
 * analisis estatico de dist/ pueden ver, porque solo aparece al ejecutar la
 * pagina de verdad -- que el buscador filtre, que el tema cambie, que no
 * salten errores de JavaScript y que nada desborde en movil.
 *
 * Requiere Playwright y un servidor sirviendo dist/. Uso:
 *   npx astro preview --port 4321 &
 *   node scripts/smoke-test.mjs
 *
 * Variables de entorno:
 *   SMOKE_BASE_URL   base a probar (por defecto http://localhost:4321/Hunter-X-enciplopedia)
 *   CHROMIUM_PATH    ruta al binario de Chromium, si no esta en la ubicacion por defecto
 */

import { chromium } from 'playwright';

const BASE = (process.env.SMOKE_BASE_URL ?? 'http://localhost:4321/Hunter-X-enciplopedia').replace(/\/$/, '');
const CHROMIUM_PATH = process.env.CHROMIUM_PATH ?? undefined;

const failures = [];
const warnings = [];
const notes = [];

/** Hosts de imagenes cuyos fallos de red tratamos como ruido del entorno. */
const CDN_HOSTS = ['s4.anilist.co', 'media.kitsu.app', 'media.kitsu.io'];

function isCdn(url) {
  try {
    return CDN_HOSTS.includes(new URL(url).hostname);
  } catch {
    return false;
  }
}

const ROUTES = [
  ['/', 'Inicio'],
  ['/buscar/', 'Buscar'],
  ['/personajes/', 'Personajes'],
  ['/personajes/killua-zoldyck/', 'Ficha Killua'],
  ['/personajes/gon-freecss/', 'Ficha Gon'],
  ['/arcos/', 'Arcos'],
  ['/arcos/hormigas-quimera/', 'Arco Hormigas'],
  ['/nen/', 'Nen'],
  ['/habilidades/', 'Habilidades'],
  ['/cronologia/', 'Cronologia'],
  ['/series/', 'Obras'],
  ['/series/hunter-x-hunter-2011/', 'Ficha 2011'],
  ['/episodios/', 'Episodios'],
  ['/episodios/hunter-x-hunter-2011/', 'Guia 2011'],
  ['/organizaciones/', 'Facciones'],
  ['/glosario/', 'Glosario'],
  ['/creditos/', 'Creditos'],
];

const MOBILE_ROUTES = ['/', '/buscar/', '/personajes/', '/nen/', '/habilidades/', '/cronologia/', '/episodios/hunter-x-hunter-2011/', '/series/hunter-x-hunter-2011/'];

async function main() {
  const browser = await chromium.launch(CHROMIUM_PATH ? { executablePath: CHROMIUM_PATH } : {});
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`));

  // --- Escritorio: cada ruta carga, tiene h1 y no desborda ---------------
  for (const [route, label] of ROUTES) {
    const response = await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 45_000 });
    if (!response || response.status() !== 200) {
      failures.push(`${label}: HTTP ${response?.status() ?? 'sin respuesta'}`);
      continue;
    }
    // Margen para que resuelvan las imagenes visibles en el viewport.
    await page.waitForTimeout(1200);

    const heading = (await page.locator('h1').first().textContent().catch(() => null))?.trim();
    if (!heading) failures.push(`${label}: sin <h1> visible`);

    const broken = await page.evaluate(() =>
      Array.from(document.images)
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.src),
    );
    // Un fallo de red contra el CDN no es un defecto del sitio: las URLs ya
    // se validan estaticamente en validate-build.mjs.
    const brokenLocal = broken.filter((src) => !isCdn(src));
    if (brokenLocal.length) failures.push(`${label}: imagen propia rota -> ${brokenLocal[0]}`);
    if (broken.length > brokenLocal.length) {
      warnings.push(`${label}: ${broken.length - brokenLocal.length} imagen(es) del CDN no cargaron (red)`);
    }

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 2) failures.push(`${label}: desbordamiento horizontal de ${overflow}px`);

    notes.push(`  OK  ${label.padEnd(15)} h1="${heading?.slice(0, 44) ?? ''}"`);
  }

  // --- Buscador y filtros -------------------------------------------------
  await page.goto(`${BASE}/personajes/`, { waitUntil: 'domcontentloaded' });
  const total = await page.locator('.cell').count();

  await page.fill('[data-search]', 'zoldyck');
  await page.waitForTimeout(250);
  const byName = await page.locator('.cell:not([hidden])').count();
  if (byName < 3 || byName >= total) failures.push(`buscador: "zoldyck" devolvio ${byName} de ${total}`);
  else notes.push(`  OK  buscador        "zoldyck" -> ${byName}/${total}`);

  await page.fill('[data-search]', 'cadenas del juicio');
  await page.waitForTimeout(250);
  const byHatsu = await page.locator('.cell:not([hidden])').count();
  if (byHatsu < 1) failures.push('buscador: no encuentra por nombre de habilidad');
  else notes.push(`  OK  buscador        por Hatsu -> ${byHatsu}`);

  await page.fill('[data-search]', '');
  await page.selectOption('[data-filter="nen"]', 'materializacion');
  await page.waitForTimeout(250);
  const byNen = await page.locator('.cell:not([hidden])').count();
  if (byNen < 2) failures.push(`filtro de Nen: materializacion devolvio ${byNen}`);
  else notes.push(`  OK  filtro Nen      materializacion -> ${byNen}`);

  await page.selectOption('[data-filter="nen"]', '');
  await page.selectOption('[data-filter="org"]', 'brigada-fantasma');
  await page.waitForTimeout(250);
  const byOrg = await page.locator('.cell:not([hidden])').count();
  if (byOrg < 5) failures.push(`filtro de faccion: Brigada Fantasma devolvio ${byOrg}`);
  else notes.push(`  OK  filtro faccion  Brigada Fantasma -> ${byOrg}`);

  await page.selectOption('[data-filter="org"]', '');
  await page.fill('[data-search]', 'zzzzqqq');
  await page.waitForTimeout(250);
  if (!(await page.locator('[data-empty]').isVisible())) {
    failures.push('buscador: no se muestra el mensaje de "sin resultados"');
  } else {
    notes.push('  OK  estado vacio    mensaje visible');
  }

  // --- Catalogo de habilidades --------------------------------------------
  await page.goto(`${BASE}/habilidades/`, { waitUntil: 'domcontentloaded' });
  const abilitiesTotal = await page.locator('.ability').count();
  await page.check('[data-filter-condition]');
  await page.waitForTimeout(200);
  const withVow = await page.locator('.ability:not([hidden])').count();
  if (withVow < 5 || withVow >= abilitiesTotal) {
    failures.push(`habilidades: el filtro de condicion devolvio ${withVow} de ${abilitiesTotal}`);
  } else {
    notes.push(`  OK  habilidades    con condicion -> ${withVow}/${abilitiesTotal}`);
  }
  await page.uncheck('[data-filter-condition]');
  await page.fill('[data-search]', 'bungee');
  await page.waitForTimeout(200);
  if ((await page.locator('.ability:not([hidden])').count()) !== 1) {
    failures.push('habilidades: la busqueda "bungee" no devuelve exactamente una habilidad');
  } else {
    notes.push('  OK  habilidades    busqueda "bungee" -> 1');
  }

  // --- Busqueda global ----------------------------------------------------
  await page.goto(`${BASE}/buscar/`, { waitUntil: 'domcontentloaded' });
  await page.fill('[data-global-search]', 'bungee');
  // El indice se descarga la primera vez que se escribe.
  await page.waitForSelector('.result', { timeout: 15_000 }).catch(() => null);
  const bungeeHits = await page.locator('.result').count();
  if (bungeeHits < 1) {
    failures.push('busqueda global: "bungee" no devuelve resultados');
  } else {
    const firstType = await page.locator('.result .result-type').first().textContent();
    notes.push(`  OK  busqueda global "bungee" -> ${bungeeHits} (1.o: ${firstType?.trim()})`);
  }

  // La entrada exacta debe salir la primera: es lo que valida la puntuacion.
  await page.fill('[data-global-search]', 'kurapika');
  await page.waitForTimeout(400);
  const firstTitle = (await page.locator('.result strong').first().textContent())?.trim();
  if (firstTitle !== 'Kurapika') {
    failures.push(`busqueda global: "kurapika" devuelve "${firstTitle}" en primer lugar`);
  } else {
    notes.push('  OK  busqueda global orden por relevancia correcto');
  }

  // Filtro por tipo.
  await page.fill('[data-global-search]', 'gon');
  await page.waitForTimeout(400);
  const episodeChip = page.locator('.type-chip', { hasText: 'Episodio' }).first();
  if (await episodeChip.count()) {
    await episodeChip.click();
    await page.waitForTimeout(300);
    const types = await page.locator('.result .result-type').allTextContents();
    const allEpisodes = types.length > 0 && types.every((t) => t.trim() === 'Episodio');
    if (!allEpisodes) failures.push('busqueda global: el filtro por tipo no acota los resultados');
    else notes.push(`  OK  busqueda global filtro Episodio -> ${types.length}`);
  }

  // Sin resultados.
  await page.locator('.type-chip').first().click();
  await page.fill('[data-global-search]', 'qqzzxx');
  await page.waitForTimeout(400);
  const statusText = (await page.locator('[data-status]').textContent())?.trim() ?? '';
  if (!statusText.toLowerCase().includes('sin resultados')) {
    failures.push(`busqueda global: no informa de busqueda vacia (dice "${statusText}")`);
  } else {
    notes.push('  OK  busqueda global mensaje de "sin resultados"');
  }

  // --- Interruptor de tema ------------------------------------------------
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  const before = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  await page.click('[data-theme-toggle]');
  await page.waitForTimeout(200);
  const after = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  if (before === after) failures.push('tema: el interruptor no cambia el fondo');
  else notes.push(`  OK  tema           ${before} -> ${after}`);

  // El tema elegido debe sobrevivir a una recarga.
  await page.reload({ waitUntil: 'domcontentloaded' });
  const persisted = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  if (persisted !== after) failures.push('tema: la eleccion no persiste al recargar');
  else notes.push('  OK  tema           persiste tras recargar');

  // --- Spoilers plegables -------------------------------------------------
  await page.goto(`${BASE}/personajes/kurapika/`, { waitUntil: 'domcontentloaded' });
  const spoiler = page.locator('details.spoiler').first();
  if (await spoiler.count()) {
    const openBefore = await spoiler.evaluate((el) => el.hasAttribute('open'));
    await spoiler.locator('summary').click();
    const openAfter = await spoiler.evaluate((el) => el.hasAttribute('open'));
    if (openBefore || !openAfter) failures.push('spoiler: no empieza cerrado o no se abre al pulsar');
    else notes.push('  OK  spoiler        cerrado por defecto y desplegable');
  }

  // --- Movil ---------------------------------------------------------------
  const mobile = await browser.newContext({ viewport: { width: 375, height: 780 } });
  const mobilePage = await mobile.newPage();
  for (const route of MOBILE_ROUTES) {
    await mobilePage.goto(BASE + route, { waitUntil: 'domcontentloaded' });
    await mobilePage.waitForTimeout(300);
    const overflow = await mobilePage.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 2) failures.push(`movil ${route}: desbordamiento de ${overflow}px`);
  }
  if (!failures.some((f) => f.startsWith('movil'))) {
    notes.push(`  OK  movil 375px    ${MOBILE_ROUTES.length} rutas sin desbordamiento`);
  }

  await browser.close();

  // --- Errores de consola --------------------------------------------------
  const realErrors = [...new Set(consoleErrors)].filter(
    (message) => !/ERR_CONNECTION_RESET|ERR_NETWORK_CHANGED|Failed to load resource/.test(message),
  );
  const networkNoise = consoleErrors.length - realErrors.length;
  if (networkNoise > 0) warnings.push(`${networkNoise} error(es) de red contra el CDN de imagenes`);
  for (const message of realErrors) failures.push(`consola: ${message}`);

  // --- Reporte --------------------------------------------------------------
  console.log(`Prueba de humo en navegador (${BASE})\n`);
  console.log(notes.join('\n'));
  if (warnings.length) {
    console.log('');
    for (const message of warnings) console.log(`  AVISO  ${message}`);
  }
  if (failures.length) {
    console.error('\nFALLOS:');
    for (const message of failures) console.error(`  - ${message}`);
    process.exit(1);
  }
  console.log('\nTodo correcto.');
}

main().catch((error) => {
  console.error('La prueba de humo no pudo ejecutarse:', error.message);
  process.exit(1);
});
