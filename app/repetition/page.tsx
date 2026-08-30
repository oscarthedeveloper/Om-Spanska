import type {Metadata} from 'next';
import RepetitionSession from '@/components/repetition/RepetitionSession';

export const metadata: Metadata = {
  title: 'Dagens repetition',
  description: 'Ett kort personligt repetitionspass med sådant du tidigare svarat fel på.',
  alternates: {canonical: '/repetition'},
};

export default function RepetitionPage() {
  return <RepetitionSession />;
}
