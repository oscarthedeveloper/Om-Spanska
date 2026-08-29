'use client';

import {
  Children,
  isValidElement,
  useId,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import styles from './Tabs.module.css';

export type TabItemProps = {
  value: string;
  label: string;
  default?: boolean;
  children: ReactNode;
};

/** Bär bara data — innehållet renderas av <Tabs>. */
export function TabItem({children}: TabItemProps) {
  return <>{children}</>;
}

function isTabItem(node: ReactNode): node is ReactElement<TabItemProps> {
  return isValidElement(node) && typeof (node.props as TabItemProps)?.value === 'string';
}

export function Tabs({children}: {children: ReactNode}) {
  const items = Children.toArray(children).filter(isTabItem);
  const initial = items.find(i => i.props.default)?.props.value ?? items[0]?.props.value ?? '';
  const [active, setActive] = useState(initial);
  const groupId = useId();

  if (items.length === 0) return null;

  return (
    <div className={styles.tabs}>
      <div className={styles.tablist} role="tablist">
        {items.map(item => {
          const selected = item.props.value === active;
          return (
            <button
              key={item.props.value}
              type="button"
              role="tab"
              id={`${groupId}-tab-${item.props.value}`}
              aria-selected={selected}
              aria-controls={`${groupId}-panel-${item.props.value}`}
              className={`${styles.tab} ${selected ? styles.tabActive : ''}`}
              onClick={() => setActive(item.props.value)}>
              {item.props.label}
            </button>
          );
        })}
      </div>

      {items.map(item => {
        const selected = item.props.value === active;
        return (
          <div
            key={item.props.value}
            role="tabpanel"
            id={`${groupId}-panel-${item.props.value}`}
            aria-labelledby={`${groupId}-tab-${item.props.value}`}
            hidden={!selected}
            className={styles.panel}>
            {item.props.children}
          </div>
        );
      })}
    </div>
  );
}

export default Tabs;
