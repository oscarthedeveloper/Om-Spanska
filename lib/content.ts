import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import type {
  Doc,
  DocMeta,
  Heading,
  SidebarNode,
  BlogPost,
  BlogPostMeta,
} from './types';

/** Sajten har två läsande sektioner. Grammatik är ren formlära;
 *  Mer grammatik samlar valfrågor och egenheter som annars skulle
 *  svälla sidomenyn. Båda använder samma innehållslager. */
export type SectionKey = 'docs' | 'mer';

export const SECTIONS: Record<SectionKey, {dir: string; base: string; label: string}> = {
  docs: {dir: 'docs', base: '/docs', label: 'Grammatik'},
  mer: {dir: 'mer', base: '/mer', label: 'Mer grammatik'},
};

const sectionDir = (section: SectionKey) =>
  path.join(process.cwd(), 'content', SECTIONS[section].dir);

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/* ── Slugjämförelse ──────────────────────────────────────────────── */

/** URL-segment kan komma procentkodade och med å/ä/ö i olika
 *  unicodeformer (macOS skriver NFD, editorer NFC). Jämför alltid
 *  avkodat och normaliserat. */
function sameSlug(a: string, b: string): boolean {
  const clean = (s: string) => {
    let out = s;
    try {
      out = decodeURIComponent(s);
    } catch {
      /* redan avkodad */
    }
    return out.normalize('NFC').replace(/^\/+|\/+$/g, '');
  };
  return clean(a) === clean(b);
}

/* ── Rubriker ────────────────────────────────────────────────────── */

/** Tar bort JSX/HTML så att rubrik-id:t beräknas på samma text som
 *  rehype-slug ser i den renderade HTML:en. */
function headingText(raw: string): string {
  return raw
    .replace(/<[^<>]*>/g, '')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/\*([^*]*)\*/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .trim();
}

export function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of content.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const m = line.match(/^(#{1,6})\s+(.*)$/);
    if (!m) continue;

    const level = m[1].length;
    const text = headingText(m[2]);
    if (!text) continue;

    // Slugga alla nivåer så att dubbletträkningen stämmer med rehype-slug,
    // men visa bara h2 och h3 i innehållsförteckningen.
    const id = slugger.slug(text);
    if (level === 2 || level === 3) {
      headings.push({id, text, level: level as 2 | 3});
    }
  }
  return headings;
}

/* ── Kategorier ──────────────────────────────────────────────────── */

type CategoryMeta = {label: string; position: number};

function readCategory(dir: string): CategoryMeta {
  const file = path.join(dir, '_category_.json');
  const fallback = {label: path.basename(dir), position: 999};
  if (!fs.existsSync(file)) return fallback;
  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    return {
      label: typeof parsed.label === 'string' ? parsed.label : fallback.label,
      position: typeof parsed.position === 'number' ? parsed.position : 999,
    };
  } catch {
    return fallback;
  }
}

/* ── Dokument ────────────────────────────────────────────────────── */

const docCache = new Map<SectionKey, DocMeta[]>();

function readDocsDir(dir: string, categoryPath: string[], base: string): DocMeta[] {
  const out: DocMeta[] = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...readDocsDir(full, [...categoryPath, readCategory(full).label], base));
      continue;
    }
    if (!entry.name.endsWith('.mdx')) continue;

    const {data} = matter(fs.readFileSync(full, 'utf8'));
    const slug: string = String(data.slug ?? '');
    if (!slug) {
      throw new Error(`Saknar slug i frontmatter: ${full}`);
    }
    const segments = slug.replace(/^\/+/, '').split('/').filter(Boolean);

    out.push({
      title: String(data.title ?? segments[segments.length - 1]),
      description: String(data.description ?? ''),
      slug,
      sidebar_position: Number(data.sidebar_position ?? 999),
      file: path.relative(process.cwd(), full),
      segments,
      href: `${base}/${segments.join('/')}`,
      categoryPath,
    });
  }
  return out;
}

export function getAllDocs(section: SectionKey = 'docs'): DocMeta[] {
  const cached = docCache.get(section);
  if (cached) return cached;
  const dir = sectionDir(section);
  const docs = fs.existsSync(dir) ? readDocsDir(dir, [], SECTIONS[section].base) : [];
  docCache.set(section, docs);
  return docs;
}

export function getDocBySegments(section: SectionKey, segments: string[]): Doc | null {
  const target = segments.join('/');
  const meta = getAllDocs(section).find(d => sameSlug(d.segments.join('/'), target));
  if (!meta) return null;

  const {content} = matter(fs.readFileSync(path.join(process.cwd(), meta.file), 'utf8'));
  return {...meta, content, headings: extractHeadings(content)};
}

/* ── Sidomeny ────────────────────────────────────────────────────── */

function buildSidebarFor(dir: string, base: string): SidebarNode[] {
  const nodes: SidebarNode[] = [];

  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const meta = readCategory(full);
      nodes.push({
        kind: 'category',
        label: meta.label,
        position: meta.position,
        items: buildSidebarFor(full, base),
      });
      continue;
    }
    if (!entry.name.endsWith('.mdx')) continue;

    const {data} = matter(fs.readFileSync(full, 'utf8'));
    const segments = String(data.slug ?? '').replace(/^\/+/, '').split('/').filter(Boolean);
    nodes.push({
      kind: 'link',
      label: String(data.title ?? entry.name.replace(/\.mdx$/, '')),
      href: `${base}/${segments.join('/')}`,
      position: Number(data.sidebar_position ?? 999),
    });
  }

  return nodes.sort((a, b) => a.position - b.position || a.label.localeCompare(b.label, 'sv'));
}

const sidebarCache = new Map<SectionKey, SidebarNode[]>();

export function getSidebar(section: SectionKey = 'docs'): SidebarNode[] {
  const cached = sidebarCache.get(section);
  if (cached) return cached;
  const dir = sectionDir(section);
  const nodes = fs.existsSync(dir)
    ? buildSidebarFor(dir, SECTIONS[section].base)
    : [];
  sidebarCache.set(section, nodes);
  return nodes;
}

/** Sidorna i sidomenyns ordning — grunden för föregående/nästa. */
export function getOrderedDocs(section: SectionKey = 'docs'): {label: string; href: string}[] {
  const flat: {label: string; href: string}[] = [];
  const walk = (nodes: SidebarNode[]) => {
    for (const n of nodes) {
      if (n.kind === 'link') flat.push({label: n.label, href: n.href});
      else walk(n.items);
    }
  };
  walk(getSidebar(section));
  return flat;
}

export function getDocNeighbours(section: SectionKey, href: string) {
  const flat = getOrderedDocs(section);
  const i = flat.findIndex(d => d.href === href);
  return {
    previous: i > 0 ? flat[i - 1] : null,
    next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : null,
  };
}

/* ── Blogg ───────────────────────────────────────────────────────── */

let blogCache: BlogPostMeta[] | null = null;

export function getAllPosts(): BlogPostMeta[] {
  if (blogCache) return blogCache;
  const posts: BlogPostMeta[] = [];

  for (const name of fs.readdirSync(BLOG_DIR)) {
    if (!name.endsWith('.mdx')) continue;
    const full = path.join(BLOG_DIR, name);
    const {data} = matter(fs.readFileSync(full, 'utf8'));
    const dateMatch = name.match(/^(\d{4}-\d{2}-\d{2})-/);
    const slug = String(data.slug ?? name.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx$/, ''));

    posts.push({
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ''),
      date: dateMatch ? dateMatch[1] : '',
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      href: `/blog/${slug}`,
      file: path.relative(process.cwd(), full),
    });
  }

  blogCache = posts.sort((a, b) => b.date.localeCompare(a.date));
  return blogCache;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const meta = getAllPosts().find(p => sameSlug(p.slug, slug));
  if (!meta) return null;
  const {content} = matter(fs.readFileSync(path.join(process.cwd(), meta.file), 'utf8'));
  return {...meta, content, headings: extractHeadings(content)};
}

/* ── Formatering ─────────────────────────────────────────────────── */

export function formatDate(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const months = [
    'januari', 'februari', 'mars', 'april', 'maj', 'juni',
    'juli', 'augusti', 'september', 'oktober', 'november', 'december',
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
