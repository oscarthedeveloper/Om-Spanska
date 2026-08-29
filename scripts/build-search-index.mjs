// Bygger public/search-index.json inför varje next build.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'public', 'search-index.json');

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.mdx')) out.push(p);
  }
  return out;
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return {data: {}, body: raw};
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if ((v.startsWith("'") && v.endsWith("'")) || (v.startsWith('"') && v.endsWith('"'))) {
      v = v.slice(1, -1).replace(/''/g, "'");
    }
    data[kv[1]] = v;
  }
  return {data, body: raw.slice(m[0].length)};
}

/** Gör MDX till ren, sökbar text. */
function toPlainText(body) {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^<>]*>/g, ' ')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
    .replace(/\{[^{}]*\}/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>|]/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function headingsOf(body) {
  const out = [];
  let inFence = false;
  for (const line of body.split('\n')) {
    if (/^\s*```/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = line.match(/^(#{2,3})\s+(.*)$/);
    if (m) {
      const text = m[2].replace(/<[^<>]*>/g, '').replace(/[*_`]/g, '').trim();
      if (text) out.push(text);
    }
  }
  return out;
}

const records = [];

for (const file of walk(path.join(ROOT, 'content', 'docs'))) {
  const raw = fs.readFileSync(file, 'utf8');
  const {data, body} = parseFrontmatter(raw);
  if (!data.slug) continue;
  const segments = data.slug.replace(/^\/+/, '');
  const category = path.relative(path.join(ROOT, 'content', 'docs'), path.dirname(file))
    .split(path.sep)[0] || 'Grammatik';
  records.push({
    t: data.title || segments,
    d: data.description || '',
    h: `/docs/${segments}`,
    c: category,
    k: 'grammatik',
    s: headingsOf(body),
    b: toPlainText(body).slice(0, 4000),
  });
}

for (const file of walk(path.join(ROOT, 'content', 'blog'))) {
  const raw = fs.readFileSync(file, 'utf8');
  const {data, body} = parseFrontmatter(raw);
  const slug = data.slug || path.basename(file).replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx$/, '');
  records.push({
    t: data.title || slug,
    d: data.description || '',
    h: `/blog/${slug}`,
    c: 'Bloggen',
    k: 'blogg',
    s: headingsOf(body),
    b: toPlainText(body).slice(0, 4000),
  });
}

for (const page of [
  {t: 'Verbdrillen', d: 'Öva på att böja spanska verb i alla tidsformer, modus och verbtyper.', h: '/verbdrillen', c: 'Öva', k: 'övning'},
  {t: 'Glosdrillen', d: 'Öva spanska glosor i 15 kortlekar från nybörjare till avancerad nivå.', h: '/glosdrillen', c: 'Öva', k: 'övning'},
  {t: 'Kontakt', d: 'Hör av dig med frågor, förslag eller rättelser.', h: '/kontakt', c: 'Sajten', k: 'sida'},
]) {
  records.push({...page, s: [], b: page.d});
}

fs.mkdirSync(path.dirname(OUT), {recursive: true});
fs.writeFileSync(OUT, JSON.stringify(records), 'utf8');
console.log(`sökindex: ${records.length} poster → ${path.relative(ROOT, OUT)}`);
