import Link from 'next/link';
import styles from './Drill.module.css';

const TEMPUS: Record<string, string> = {
  presens: 'Presens',
  preteritum: 'Preteritum',
  imperfekt: 'Imperfekt',
  perfekt: 'Perfekt',
  futurum: 'Futurum',
  futurum2: 'Futurum II',
  konditionalis: 'Konditionalis',
  gerundium: 'Presens progressiv',
};

const MODUS: Record<string, string> = {
  indikativ: 'indikativ',
  konjunktiv: 'konjunktiv',
  imperativ: 'imperativ',
};

const TYP: Record<string, string> = {
  regular: 'regelbundna verb',
  reflexiva: 'reflexiva verb',
  diftongerande: 'diftongerande verb',
  vokalskiftande: 'vokalskiftande verb',
  oregelbundna: 'oregelbundna verb',
};

type Props = {
  /** 'verb' öppnar Verbdrillen, 'glosor' öppnar Glosdrillen. */
  till: 'verb' | 'glosor';
  tempus?: string;
  modus?: string;
  typ?: string;
  kortlek?: string | number;
  /** Skriver över den automatiska beskrivningen. */
  text?: string;
};

export default function Drill({till, tempus, modus, typ, kortlek, text}: Props) {
  const isVerb = till === 'verb';

  const params = new URLSearchParams();
  if (isVerb) {
    if (tempus) params.set('tempus', tempus);
    if (modus) params.set('modus', modus);
    if (typ) params.set('typ', typ);
  } else if (kortlek !== undefined) {
    params.set('kortlek', String(kortlek));
  }

  const query = params.toString();
  const href = `${isVerb ? '/verbdrillen' : '/glosdrillen'}${query ? `?${query}` : ''}`;

  const parts = isVerb
    ? [tempus && TEMPUS[tempus], modus && MODUS[modus], typ && TYP[typ]].filter(Boolean)
    : [];

  const description =
    text ??
    (isVerb
      ? parts.length
        ? parts.join(' · ')
        : 'Alla tidsformer och verbtyper'
      : 'Öva glosorna som hör till det här avsnittet');

  return (
    <aside className={styles.box}>
      <div className={styles.text}>
        <p className={styles.eyebrow}>Öva det här</p>
        <p className={styles.what}>{description}</p>
      </div>
      <Link href={href} className="pillButton pillButton--onColor">
        {isVerb ? 'Öppna Verbdrillen' : 'Öppna Glosdrillen'}
      </Link>
    </aside>
  );
}
