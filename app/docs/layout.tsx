import Sidebar from '@/components/Sidebar';
import {getSidebar} from '@/lib/content';
import styles from './docs.module.css';

export default function DocsLayout({children}: {children: React.ReactNode}) {
  return (
    <div className={styles.shell}>
      <Sidebar nodes={getSidebar('docs')} />
      {children}
    </div>
  );
}
