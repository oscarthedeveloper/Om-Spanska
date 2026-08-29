import Link from 'next/link';
import type {AnchorHTMLAttributes, HTMLAttributes, ReactNode} from 'react';

import Admonition from './Admonition';
import BrowserWindow from './BrowserWindow';
import {Tabs, TabItem} from './Tabs';
import KonjunktivAR from './KonjunktivAR';
import KonjunktivERIR from './KonjunktivERIR';
import KonjunktivIMPAR from './KonjunktivIMPAR';
import KonjunktivIMPERIR from './KonjunktivIMPERIR';

/** Pastellmarkering i rubriker och löptext. */
function Highlight({children}: {children: ReactNode}) {
  return <span className="mdxHighlight">{children}</span>;
}

/** Rubrik med länkbart ankare. id:t kommer från rehype-slug. */
function heading(Tag: 'h2' | 'h3' | 'h4') {
  return function Heading({id, children, ...rest}: HTMLAttributes<HTMLHeadingElement>) {
    return (
      <Tag id={id} {...rest} className="anchorHeading">
        {children}
        {id ? (
          <a className="anchorLink" href={`#${id}`} aria-label="Direktlänk till avsnittet">
            #
          </a>
        ) : null}
      </Tag>
    );
  };
}

/** Breda tabeller ska scrolla i sin egen behållare, inte dra iväg sidan. */
function Table(props: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="tableScroll">
      <table {...props} />
    </div>
  );
}

function Anchor({href = '', children, ...rest}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const internal = href.startsWith('/') && !href.startsWith('//');
  if (internal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
      {...rest}>
      {children}
    </a>
  );
}

export const mdxComponents = {
  a: Anchor,
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  table: Table,
  Highlight,
  Admonition,
  BrowserWindow,
  Tabs,
  TabItem,
  KonjunktivAR,
  KonjunktivERIR,
  KonjunktivIMPAR,
  KonjunktivIMPERIR,
};

export default mdxComponents;
