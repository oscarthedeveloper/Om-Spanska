import type {Metadata} from 'next';
import Link from 'next/link';
import {formatDate, getAllPosts} from '@/lib/content';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Bloggen',
  description:
    'Korta genomgångar av spanska ord och uttryck som inte har någon direkt svensk motsvarighet.',
  alternates: {canonical: '/blog'},
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className="eyebrow">Bloggen</p>
        <h1 className={styles.title}>När ett svenskt ord blir fem spanska</h1>
        <p className={styles.lead}>
          Korta genomgångar av ord och uttryck där spanskan inte gör som svenskan.
        </p>
      </header>

      <ol className={styles.list}>
        {posts.map(post => (
          <li key={post.href}>
            <Link href={post.href} className={styles.row}>
              <span className={styles.date}>{formatDate(post.date)}</span>
              <span className={styles.rowTitle}>{post.title}</span>
              <span className={styles.rowBlurb}>{post.description}</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
