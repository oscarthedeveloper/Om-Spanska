import type {Metadata} from 'next';
import Glosdrillen from '@/components/drills/Glosdrillen';

export const metadata: Metadata = {
  title: 'Glosdrillen',
  description:
    'Öva spanska glosor i 15 kortlekar från nybörjare till avancerad nivå. 750 ord, sparad progress, gratis och utan konto.',
  alternates: {canonical: '/glosdrillen'},
};

export default function GlosdrillenPage() {
  return (
    <main>
      <Glosdrillen />
    </main>
  );
}
