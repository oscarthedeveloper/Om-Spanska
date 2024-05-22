import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Gratis resurs',
    description: (
<>
      <p>
        Denna hemsida är en helt gratis resurs för dig som studerar spanska. 
      </p>
      <p>
      Om du upplever att hemsidan är hjälpsam, tipsa en kompis!
      </p>
    </>
    ),
  },
  {
    title: 'Förståelig och konsis',
    description: (
<>
      <p>
      Hemsidan är konstruerad för att vara lätt att förstå, men samtidigt ingående och detaljerande.
      </p>
      <p>
      Den är gjord utifrån pedagogiska tillvägagångssätt för att simplifiera det som ofta framstår som svårt.
      </p>
     </>
    ),
  },
  {
    title: 'Säker källa',
    description: (
<>
      <p>
      Denna hemsida är en pålitlig resurs för alla som vill förbättra sina kunskaper i det spanska språket.
      </p>
      <p>
      Den är gjord i strävan efter att erbjuda korrekt, tydlig och aktuell information av hög kvalitet.      
      </p>
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--left padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
