import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';

import Mdx from '@/components/mdx/Mdx';
import TableOfContents from '@/components/TableOfContents';
import LearningStepProgress from '@/components/learning/LearningStepProgress';
import MiniQuiz from '@/components/mdx/MiniQuiz';
import RigorosBanner from '@/components/RigorosBanner';
import DocPager from '@/components/DocPager';
import {LEARNING_QUIZZES} from '@/data/learning-quizzes';
import {getAllDocs, getDocBySegments, getDocNeighbours} from '@/lib/content';
import styles from './doc.module.css';

type Params = {slug: string[]};

export function generateStaticParams(): Params[] {
  return getAllDocs('docs').map(doc => ({slug: doc.segments}));
}

export async function generateMetadata(
  {params}: {params: Promise<Params>},
): Promise<Metadata> {
  const {slug} = await params;
  const doc = getDocBySegments('docs', slug);
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

export default async function DocPage({params}: {params: Promise<Params>}) {
  const {slug} = await params;
  const doc = getDocBySegments('docs', slug);
  if (!doc) notFound();

  const neighbours = getDocNeighbours('docs', doc.href);
  const learningQuiz = LEARNING_QUIZZES[doc.href];

  return (
    <div className={styles.layout}>
      <article className={styles.article}>
        <nav className={styles.breadcrumbs} aria-label="Brödsmulor">
          <Link href="/grammatik">Grammatik</Link>
          {doc.categoryPath.map(part => (
            <span key={part}>
              <span aria-hidden="true"> / </span>
              {part}
            </span>
          ))}
        </nav>

        {doc.titleLattsam && doc.titleLattsam !== doc.title ? (
          <>
            <h1 className="lattsam-only">{doc.titleLattsam}</h1>
            <h1 className="rigoros-only">{doc.title}</h1>
          </>
        ) : (
          <h1>{doc.title}</h1>
        )}

        {doc.rigoros && <RigorosBanner />}

        {doc.descriptionLattsam ? (
          <>
            <p className={`${styles.lead} lattsam-only`}>{doc.descriptionLattsam}</p>
            {doc.description && <p className={`${styles.lead} rigoros-only`}>{doc.description}</p>}
          </>
        ) : (
          doc.description && <p className={styles.lead}>{doc.description}</p>
        )}

        {doc.contentLattsam ? (
          <>
            <div className={`${styles.content} mdxContent lattsam-only`}>
              <Mdx key={`${doc.href}-lattsam`} source={doc.contentLattsam} hideDrill={Boolean(learningQuiz)} />
            </div>
            <div className={`${styles.content} mdxContent rigoros-only`}>
              <Mdx key={`${doc.href}-rigoros`} source={doc.content} hideDrill={Boolean(learningQuiz)} />
            </div>
          </>
        ) : (
          <div className={`${styles.content} mdxContent`}>
            <Mdx key={doc.href} source={doc.content} hideDrill={Boolean(learningQuiz)} />
          </div>
        )}

        {learningQuiz && (
          <MiniQuiz key={doc.href} title={learningQuiz.title} questions={learningQuiz.questions} />
        )}

        <LearningStepProgress href={doc.href} />

        <DocPager lattsam={neighbours.lattsam} rigoros={neighbours.rigoros} />
      </article>

      <TableOfContents headings={doc.headings} headingsLattsam={doc.headingsLattsam} />
    </div>
  );
}
