/**
 * render.mjs — fotograferar varje scen i en scenfil till PNG i 1920×1080.
 *
 *   npm i -D playwright        (en gång)
 *   npx playwright install chromium
 *   node content/video/mall/render.mjs content/video/mall/scen.html ut/V01
 *
 * Varje <section class="scen" data-scen="V01-03"> blir ut/V01/V01-03.png.
 * Bildrutan är 1280 × 720 CSS-px renderad med deviceScaleFactor 1.5, alltså
 * exakt 1920 × 1080 pixlar. Ser texten mjuk ut: höj SCALE till 2 och skala
 * ner i klippet.
 */

import {chromium} from 'playwright';
import {mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

const SCALE = 1.5;

const [, , inFile, outDir = 'ut'] = process.argv;

if (!inFile) {
  console.error('Användning: node render.mjs <scen.html> [utmapp]');
  process.exit(1);
}

await mkdir(outDir, {recursive: true});

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: {width: 1280, height: 720},
  deviceScaleFactor: SCALE,
});

await page.goto(pathToFileURL(resolve(inFile)).href, {waitUntil: 'networkidle'});

// Stäng av all rörelse och visa alla steg — en bildruta ska vara färdig.
await page.addStyleTag({
  content: '.steg{opacity:1!important;transform:none!important;transition:none!important}',
});
await page.evaluate(() => document.documentElement.classList.add('render'));
await page.evaluate(() => document.fonts.ready);

const scener = await page.$$('section.scen');

for (const scen of scener) {
  const namn = await scen.getAttribute('data-scen');
  const langd = await scen.getAttribute('data-langd');
  await scen.screenshot({path: `${outDir}/${namn}.png`});
  console.log(`${namn}.png  ${langd ? langd + ' s' : ''}`);
}

await browser.close();
console.log(`\n${scener.length} bildrutor i ${outDir}/`);
