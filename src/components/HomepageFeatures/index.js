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
      Om du upplever att hemsidan är hjälpsam och vill göra den bättre, varför inte tipsa en kompis?
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
    title: 'En del av en familj',
    description: (
<>
      <p>
        Hemsidan är en del av en liten mysig familj av hemsidor. Spana in dess syskon! 😎
      </p>
      <p>
        <ul>
        <li> <a href="https://" class="my-special-links" target="_blank">X</a> </li>         
        <li> <a href="https://" class="my-special-links" target="_blank">X</a> </li>

        </ul>
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
