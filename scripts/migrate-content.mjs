// Engångstransformation: Docusaurus-MDX → ren MDX för next-mdx-remote.
// Körs en gång, resultatet checkas in. Skriptet behålls som dokumentation.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIRS = ['content/docs', 'content/blog'];

const HREF_MAP = {
  '/docs/Verb/Tempus/Presens': '/docs/verb/tempus/presens',
  '/docs/Verb/Tempus/Preteritum': '/docs/verb/tempus/preteritum',
  '/docs/Verb/Tempus/Imperfekt': '/docs/verb/tempus/imperfekt',
  '/docs/Verb/Tempus/Perfekt': '/docs/verb/tempus/perfekt',
  '/docs/Verb/Tempus/Futurum II': '/docs/verb/tempus/futurum-ii',
  '/docs/Verb/Tempus/Futurum': '/docs/verb/tempus/futurum',
  '/docs/Verb/Tempus/Konditionalis': '/docs/verb/tempus/konditionalis',
  '/docs/Verb/Tempus/Gerundium': '/docs/verb/tempus/gerundium',
};

const COLOR_CLASS = {
  "var(--highlight)": 'g-subjekt',
  'red': 'g-verb',
  'lightseagreen': 'g-objekt',
  'magenta': 'g-bindeord',
  'green': 'g-konjunktiv',
};

const BLOCK_TAGS = new Set([
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th', 'div', 'figure',
  'small', 'span', 'audio', 'a', 'p', 'ul', 'ol', 'li', 'br', 'strong', 'em',
  'Tabs', 'TabItem', 'Admonition', 'Highlight', 'BrowserWindow',
  'KonjunktivAR', 'KonjunktivERIR', 'KonjunktivIMPAR', 'KonjunktivIMPERIR',
]);

/* ── 1. Docusaurus-specifik boilerplate bort ─────────────────────── */
function stripBoilerplate(src) {
  let s = src;
  s = s.replace(/^import\s+[^\n]*from\s+'(@site|@theme)\/[^\n]*';?\s*\n/gm, '');
  s = s.replace(/export const Highlight[\s\S]*?\n\);\s*\n/g, '');
  return s;
}

/* ── 2. :::type Titel … ::: → <Admonition> ───────────────────────── */
function convertAdmonitions(src) {
  const lines = src.split('\n');
  const out = [];
  const stack = [];
  for (const line of lines) {
    const open = line.match(/^:::(note|tip|info|caution|danger|warning)(?:\s+(.*))?\s*$/);
    if (open) {
      const type = open[1] === 'warning' ? 'caution' : open[1];
      const title = (open[2] || '').trim().replace(/"/g, '&quot;');
      stack.push(true);
      out.push(title
        ? `<Admonition type="${type}" title="${title}">`
        : `<Admonition type="${type}">`);
      out.push('');
      continue;
    }
    if (/^:::\s*$/.test(line) && stack.length) {
      stack.pop();
      out.push('');
      out.push('</Admonition>');
      continue;
    }
    out.push(line);
  }
  return out.join('\n');
}

/* ── 3. Emfas inuti JSX-block → riktiga taggar ───────────────────── */
// MDX tolkar inte **fet** som markdown när texten står i samma stycke
// som en JSX-tagg. Sådana stycken skrivs om till <strong>/<em>.
function emphasisToTags(text) {
  return text
    .replace(/\*\*\*(?!\s)([^*\n]+?)(?<!\s)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(?!\s)([^*\n]+?)(?<!\s)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<![*\w])\*(?!\s)([^*\n]+?)(?<!\s)\*(?![*\w])/g, '<em>$1</em>');
}

function fixEmphasisInJsx(src) {
  const lines = src.split('\n');
  // Markera vilka rader som ligger inuti ett JSX-block.
  const inJsx = new Array(lines.length).fill(false);
  let depth = 0;
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*```/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;

    const startsWithTag = /^\s*<\/?[A-Za-z]/.test(line);
    if (depth === 0 && !startsWithTag) continue;

    const before = depth;
    for (const m of line.matchAll(/<(\/?)([A-Za-z][A-Za-z0-9]*)\b[^<>]*?(\/?)>/g)) {
      const [, closing, name, selfClose] = m;
      if (!BLOCK_TAGS.has(name)) continue;
      if (name === 'br' || selfClose === '/') continue;
      depth += closing ? -1 : 1;
    }
    if (depth < 0) depth = 0;
    if (before > 0 || depth > 0 || startsWithTag) inJsx[i] = true;
  }

  // Dela in i stycken; skriv bara om stycken som både ligger i JSX
  // och själva innehåller en tagg.
  const out = [...lines];
  let i = 0;
  while (i < lines.length) {
    if (lines[i].trim() === '') { i++; continue; }
    let j = i;
    while (j < lines.length && lines[j].trim() !== '') j++;
    const chunk = lines.slice(i, j);
    const touchesJsx = chunk.some((_, k) => inJsx[i + k]);
    const hasTag = chunk.some(l => /<\/?[A-Za-z][A-Za-z0-9]*[\s/>]/.test(l));
    if (touchesJsx && hasTag) {
      for (let k = 0; k < chunk.length; k++) out[i + k] = emphasisToTags(chunk[k]);
    }
    i = j;
  }
  return out.join('\n');
}

/* ── 4. Attribut och färger ──────────────────────────────────────── */
function fixAttributes(src) {
  let s = src;
  s = s.replace(/\sclass=/g, ' className=');
  s = s.replace(/\srowspan=/g, ' rowSpan=');
  s = s.replace(/\scolspan=/g, ' colSpan=');
  s = s.replace(/\swidth="(\d+)(?:px)?"/g, ' style={{width: \'$1px\'}}');
  s = s.replace(/\scellpadding=/g, ' cellPadding=');
  s = s.replace(/\scellspacing=/g, ' cellSpacing=');
  s = s.replace(/<br>\s*<\/br>/g, '<br />');
  s = s.replace(/<br>/g, '<br />');

  for (const [color, cls] of Object.entries(COLOR_CLASS)) {
    const re = new RegExp(
      "style=\\{\\{\\s*color:\\s*'" + color.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'\\s*\\}\\}",
      'g',
    );
    s = s.replace(re, `className="${cls}"`);
  }
  // Den inramade regelrutan (34 förekomster)
  s = s.replace(
    /style=\{\{\s*border:\s*'4px solid var\(--highlight\)'[^}]*\}\}/g,
    'className="regelruta"',
  );
  return s;
}

function fixHrefs(src) {
  let s = src;
  for (const [from, to] of Object.entries(HREF_MAP)) {
    s = s.split(`href="${from}"`).join(`href="${to}"`);
  }
  return s;
}

/* ── Kör ─────────────────────────────────────────────────────────── */
function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

let n = 0;
for (const dir of DIRS) {
  for (const file of walk(path.join(ROOT, dir))) {
    const raw = fs.readFileSync(file, 'utf8');
    const fmEnd = raw.indexOf('\n---\n', 4);
    const front = raw.slice(0, fmEnd + 5);
    let body = raw.slice(fmEnd + 5);

    body = stripBoilerplate(body);
    body = convertAdmonitions(body);
    body = fixEmphasisInJsx(body);
    body = fixAttributes(body);
    body = fixHrefs(body);
    body = body.replace(/\n{4,}/g, '\n\n\n').replace(/^\n+/, '\n');

    fs.writeFileSync(file.replace(/\.md$/, '.mdx'), front + body, 'utf8');
    fs.unlinkSync(file);
    n++;
  }
}
console.log('migrerade filer:', n);
