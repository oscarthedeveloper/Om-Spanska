export type DocFrontmatter = {
  title: string;
  description: string;
  slug: string;
  sidebar_position: number;
  rigoros?: boolean;
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
  titleLattsam?: string;
  descriptionLattsam?: string;
};

export type Doc = DocMeta & {
  content: string;
  headings: Heading[];
  contentLattsam?: string;
  headingsLattsam?: Heading[];
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
  rigoros?: boolean;
};

export type SidebarLink = {
  label: string;
  labelLattsam?: string;
  href: string;
  position: number;
  rigoros?: boolean;
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
