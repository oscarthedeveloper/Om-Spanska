import type {Metadata} from 'next';
import ProgressDashboard from '@/components/progress/ProgressDashboard';

export const metadata: Metadata = {
  title: 'Mina framsteg',
  description: 'Se din lokalt sparade progression i lärstigen, verbdrillen och glosdrillen.',
  alternates: {canonical: '/framsteg'},
};

export default function ProgressPage() {
  return <ProgressDashboard />;
}
