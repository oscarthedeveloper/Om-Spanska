import type {Metadata} from 'next';
import LearningPath from '@/components/learning/LearningPath';

export const metadata: Metadata = {
  title: 'Spanska från början – lärstig',
  description:
    'En tydlig lärstig i spansk grammatik för nybörjare. Femton genomgångar i rätt ordning, från alfabet och uttal till presens och dåtid.',
  alternates: {canonical: '/larstig'},
  openGraph: {
    title: 'Spanska från början – lärstig · Om Spanska',
    description: 'Femton genomgångar i rätt ordning, med progression som sparas utan konto.',
    url: '/larstig',
    type: 'website',
  },
};

export default function LearningPathPage() {
  return <LearningPath />;
}

