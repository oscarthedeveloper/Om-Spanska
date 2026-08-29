import type {Metadata} from 'next';
import {Suspense} from 'react';
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
      {/* useSearchParams kräver en Suspense-gräns för att sidan ska
          kunna renderas statiskt. */}
      <Suspense fallback={null}>
        <Verbdrillen />
      </Suspense>
    </main>
  );
}
