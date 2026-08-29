import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';

import Mdx from '@/components/mdx/Mdx';
import TableOfContents from '@/components/TableOfContents';
import {getAllDocs, getDocBySegments, getDocNeighbours} from '@/lib/content';
import styles from '../../docs/[...slug]/doc.module.css';

type Params = {slug: string[]};

export function generateStaticParams(): Params[] {
  return getAllDocs('mer').map(doc => ({slug: doc.segments}));
}

export async function generateMetadata(
  {params}: {params: Promise<Params>},
): Promise<Metadata> {
  const {slug} = await params;
  const doc = getDocBySegments('mer', slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    alternates: {canonical: doc.href},
    openGraph: {
      title: `${doc.title} · Om Spanska`,
      description: doc.description,
      url: doc.href,
      type: 'article',
    },
  };
}

export default async function MerPage({params}: {params: Promise<Params>}) {
  const {slug} = await params;
  const doc = getDocBySegments('mer', slug);
  if (!doc) notFound();

  const {previous, next} = getDocNeighbours('mer', doc.href);

  return (
    <div className={styles.layout}>
      <article className={styles.article}>
        <nav className={styles.breadcrumbs} aria-label="Brödsmulor">
          <Link href="/mer/ser-och-estar">Mer grammatik</Link>
          {doc.categoryPath.map(part => (
            <span key={part}>
              <span aria-hidden="true"> / </span>
              {part}
            </span>
          ))}
        </nav>

        <h1>{doc.title}</h1>
        {doc.description && <p className={styles.lead}>{doc.description}</p>}

        <div className={`${styles.content} mdxContent`}>
          <Mdx source={doc.content} />
        </div>

        {(previous || next) && (
          <nav className={styles.pager} aria-label="Föregående och nästa avsnitt">
            {previous ? (
              <Link href={previous.href} className={styles.pagerLink}>
                <span className={styles.pagerLabel}>Föregående</span>
                <span className={styles.pagerTitle}>{previous.label}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={next.href} className={`${styles.pagerLink} ${styles.pagerNext}`}>
                <span className={styles.pagerLabel}>Nästa</span>
                <span className={styles.pagerTitle}>{next.label}</span>
              </Link>
            ) : <span />}
          </nav>
        )}
      </article>

      <TableOfContents headings={doc.headings} />
    </div>
  );
}
