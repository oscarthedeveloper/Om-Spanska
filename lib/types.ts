export type DocFrontmatter = {
  title: string;
  description: string;
  slug: string;
  sidebar_position: number;
};

export type DocMeta = DocFrontmatter & {
  /** Sökväg på disk, relativt projektroten. */
  file: string;
  /** URL-segment efter /docs, t.ex. ['verb', 'tempus', 'presens']. */
  segments: string[];
  /** Full URL, t.ex. /docs/verb/tempus/presens. */
  href: string;
  /** Kategorierna ovanför sidan, ytterst först. */
  categoryPath: string[];
};

export type Doc = DocMeta & {
  content: string;
  headings: Heading[];
};

export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type SidebarCategory = {
  label: string;
  position: number;
  items: SidebarNode[];
};

export type SidebarLink = {
  label: string;
  href: string;
  position: number;
};

export type SidebarNode =
  | ({kind: 'category'} & SidebarCategory)
  | ({kind: 'link'} & SidebarLink);

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  href: string;
  file: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
  headings: Heading[];
};
