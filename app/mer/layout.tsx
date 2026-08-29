import Sidebar from '@/components/Sidebar';
import {getSidebar} from '@/lib/content';
import styles from '../docs/docs.module.css';

export default function MerLayout({children}: {children: React.ReactNode}) {
  return (
    <div className={styles.shell}>
      <Sidebar nodes={getSidebar('mer')} heading="Mer grammatik" />
      {children}
    </div>
  );
}
