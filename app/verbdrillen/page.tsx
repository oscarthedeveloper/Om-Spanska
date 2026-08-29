import type {Metadata} from 'next';
import Verbdrillen from '@/components/drills/Verbdrillen';

export const metadata: Metadata = {
  title: 'Verbdrillen',
  description:
    'Öva på att böja spanska verb i alla tidsformer, modus och verbtyper. 265 verb, sparad progress, gratis och utan konto.',
  alternates: {canonical: '/verbdrillen'},
};

export default function VerbdrillenPage() {
  return (
    <main>
      <Verbdrillen />
    </main>
  );
}
