import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';

import Mdx from '@/components/mdx/Mdx';
import {formatDate, getAllPosts, getPostBySlug} from '@/lib/content';
import styles from './post.module.css';

type Params = {slug: string};

export function generateStaticParams(): Params[] {
  return getAllPosts().map(p => ({slug: p.slug}));
}

export async function generateMetadata(
  {params}: {params: Promise<Params>},
): Promise<Metadata> {
  const {slug} = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {canonical: post.href},
    openGraph: {
      title: `${post.title} · Om Spanska`,
      description: post.description,
      url: post.href,
      type: 'article',
      publishedTime: post.date || undefined,
    },
  };
}

export default async function BlogPost({params}: {params: Promise<Params>}) {
  const {slug} = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <Link href="/blog" className={styles.back}>← Bloggen</Link>
        <p className={styles.date}>{formatDate(post.date)}</p>
        <h1 className={styles.title}>{post.title}</h1>
        {post.description && <p className={styles.lead}>{post.description}</p>}
        <div className={`${styles.content} mdxContent`}>
          <Mdx key={post.href} source={post.content} />
        </div>
      </article>
    </main>
  );
}
