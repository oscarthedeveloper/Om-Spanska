export type LearningPathStep = {
  id: string;
  title: string;
  description: string;
  href: string;
  time: string;
};

export type LearningPathPhase = {
  id: string;
  title: string;
  description: string;
  steps: LearningPathStep[];
};

export const LEARNING_PATH: LearningPathPhase[] = [
  {
    id: 'kom-igang',
    title: 'Kom igång',
    description: 'Lär känna bokstäverna och ljuden innan du börjar bygga ord.',
    steps: [
      {
        id: 'alfabet',
        title: 'Det spanska alfabetet',
        description: 'Bokstäverna, deras namn och de tecken som skiljer sig från svenskan.',
        href: '/docs/grunder/alfabet',
        time: '10 min',
      },
      {
        id: 'uttal',
        title: 'Uttal',
        description: 'Vokaler, konsonanter, betoning och ljud som är nya för svensktalande.',
        href: '/docs/grunder/uttal',
        time: '15 min',
      },
    ],
  },
  {
    id: 'bygg-ordgrupper',
    title: 'Bygg ordgrupper',
    description: 'Få substantiv, artiklar och adjektiv att passa ihop.',
    steps: [
      {
        id: 'genus',
        title: 'Genus',
        description: 'Förstå maskulinum, femininum och de vanligaste ändelserna.',
        href: '/docs/substantiv/genus',
        time: '12 min',
      },
      {
        id: 'artiklar',
        title: 'Artiklar',
        description: 'Lär dig el, la, los, las, un och una – och när de används.',
        href: '/docs/substantiv/artiklar',
        time: '12 min',
      },
      {
        id: 'plural',
        title: 'Plural',
        description: 'Gör ett ord till flera med -s, -es och rätt stavningsändringar.',
        href: '/docs/substantiv/plural',
        time: '10 min',
      },
      {
        id: 'kongruens',
        title: 'Kongruens',
        description: 'Böj adjektivet så att genus och antal stämmer med substantivet.',
        href: '/docs/adjektiv/kongruens',
        time: '15 min',
      },
    ],
  },
  {
    id: 'bygg-meningar',
    title: 'Bygg meningar',
    description: 'Sätt ihop personer och verb till fullständiga meningar i nutid.',
    steps: [
      {
        id: 'personliga-pronomen',
        title: 'Personliga pronomen',
        description: 'Lär dig yo, tú, él, nosotros och hur pronomen fungerar i en mening.',
        href: '/docs/pronomen/personliga',
        time: '18 min',
      },
      {
        id: 'verbintroduktion',
        title: 'Introduktion till verb',
        description: 'Få grepp om infinitiv, person, tempus och de tre verbgrupperna.',
        href: '/docs/verb/introduktion',
        time: '15 min',
      },
      {
        id: 'presens',
        title: 'Presens',
        description: 'Böj regelbundna verb och lär dig de vanligaste mönstren i nutid.',
        href: '/docs/verb/tempus/presens',
        time: '20 min',
      },
      {
        id: 'syntax',
        title: 'Introduktion till syntax',
        description: 'Se hur subjekt, verb och objekt sätts samman på spanska.',
        href: '/docs/syntax/introduktion',
        time: '15 min',
      },
    ],
  },
  {
    id: 'uttryck-mer',
    title: 'Uttryck mer',
    description: 'Ta steget från enkla nutidsmeningar till ett mer användbart språk.',
    steps: [
      {
        id: 'oregelbundna-verb',
        title: 'Oregelbundna verb',
        description: 'Lär känna ser, estar, ir, tener och andra verb du använder hela tiden.',
        href: '/docs/verb/oregelbundna-verb',
        time: '20 min',
      },
      {
        id: 'reflexiva-pronomen',
        title: 'Reflexiva pronomen',
        description: 'Använd me, te, se och nos när någon gör något med sig själv.',
        href: '/docs/pronomen/reflexiva',
        time: '15 min',
      },
      {
        id: 'fragor',
        title: 'Ordföljd i frågor',
        description: 'Ställ ja- och nejfrågor och använd de vanligaste frågeorden.',
        href: '/docs/syntax/ordfoljd-i-fragor',
        time: '12 min',
      },
      {
        id: 'perfekt',
        title: 'Perfekt',
        description: 'Berätta vad du har gjort med haber och perfekt particip.',
        href: '/docs/verb/tempus/perfekt',
        time: '18 min',
      },
      {
        id: 'preteritum',
        title: 'Preteritum',
        description: 'Berätta om avslutade händelser och handlingar i det förflutna.',
        href: '/docs/verb/tempus/preteritum',
        time: '20 min',
      },
    ],
  },
  {
  "id": "valj-och-bygg",
  "title": "Välj form och bygg vidare",
  "description": "Jämför dåtider, få ordning på småorden och se hur meningens delar hänger ihop.",
  "steps": [
    {
      "id": "betoning",
      "title": "Betoning och accenttecken",
      "description": "Läs betoningen och förstå när accenten behövs.",
      "href": "/docs/grunder/betoning-och-accenter",
      "time": "12 min"
    },
    {
      "id": "prepositioner",
      "title": "Prepositioner",
      "description": "Visa plats, riktning och samband med småord.",
      "href": "/docs/prepositioner/introduktion",
      "time": "15 min"
    },
    {
      "id": "personligt-a",
      "title": "Personligt a",
      "description": "Förstå a framför personer som direkt objekt.",
      "href": "/docs/prepositioner/personligt-a",
      "time": "10 min"
    },
    {
      "id": "objektspronomen",
      "title": "Objektspronomen tillsammans",
      "description": "Bygg om meningar med se lo, te la och andra kombinationer.",
      "href": "/docs/pronomen/objektspronomen-tillsammans",
      "time": "18 min"
    },
    {
      "id": "imperfekt",
      "title": "Imperfekt",
      "description": "Beskriv bakgrund, vanor och pågående situationer i dåtid.",
      "href": "/docs/verb/tempus/imperfekt",
      "time": "15 min"
    },
    {
      "id": "datidsval",
      "title": "Preteritum eller imperfekt?",
      "description": "Välj perspektiv och sätt ihop en liten berättelse.",
      "href": "/docs/verb/tempus/preteritum-eller-imperfekt",
      "time": "15 min"
    },
    {
      "id": "pluskvamperfekt",
      "title": "Pluskvamperfekt",
      "description": "Berätta vad som redan hade hänt.",
      "href": "/docs/verb/tempus/pluskvamperfekt",
      "time": "12 min"
    }
  ]
},
];

export const LEARNING_STEPS = LEARNING_PATH.flatMap(phase => phase.steps);

export function getLearningStep(href: string): LearningPathStep | undefined {
  return LEARNING_STEPS.find(step => step.href === href);
}

export function getNextLearningStep(href: string): LearningPathStep | undefined {
  const index = LEARNING_STEPS.findIndex(step => step.href === href);
  return index >= 0 ? LEARNING_STEPS[index + 1] : undefined;
}

