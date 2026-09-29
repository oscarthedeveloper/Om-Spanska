import type {MiniQuizQuestion} from '@/components/mdx/MiniQuiz';

export type LearningQuiz = {
  title: string;
  questions: MiniQuizQuestion[];
};

export const LEARNING_QUIZZES: Record<string, LearningQuiz> = {
  '/docs/grunder/alfabet': {
    title: 'Alfabetet',
    questions: [
      {
        prompt: 'Hur många bokstäver har det spanska alfabetet?',
        options: ['26', '27', '29'],
        answer: 1,
        explanation: 'Det spanska alfabetet har 27 bokstäver, inklusive ñ.',
      },
      {
        prompt: 'Vad heter bokstaven ñ när man bokstaverar?',
        options: ['ene', 'eñe', 'elle'],
        answer: 1,
        explanation: 'Ñ heter eñe. N heter däremot ene.',
      },
      {
        prompt: 'Vilken bokstav är normalt stum i spanskan?',
        options: ['h', 'j', 'r'],
        answer: 0,
        explanation: 'H är normalt stumt och hörs därför inte i uttalet.',
      },
    ],
  },
  '/docs/grunder/uttal': {
    title: 'Uttal',
    questions: [
      {
        prompt: 'Hur uttalas h i det spanska ordet hola?',
        options: ['Som svenskt h', 'Det är stumt', 'Som ett j-ljud'],
        answer: 1,
        explanation: 'H är stumt: hola börjar direkt med vokalljudet.',
      },
      {
        prompt: 'Vilket ljud förknippas bokstaven ñ med?',
        options: ['Ett nj-ljud', 'Ett sj-ljud', 'Ett ng-ljud'],
        answer: 0,
        explanation: 'Ñ uttalas ungefär som nj-ljudet i svenskans linje.',
      },
      {
        prompt: 'Vilken bokstav kan ha både ett enkelt och ett rullande ljud?',
        options: ['m', 'r', 't'],
        answer: 1,
        explanation: 'R kan uttalas med ett enkelt tungslag eller som ett rullande r.',
      },
    ],
  },
  '/docs/substantiv/genus': {
    title: 'Genus',
    questions: [
      {
        prompt: 'Vilken artikel passar till libro?',
        options: ['la', 'el', 'las'],
        answer: 1,
        explanation: 'Libro slutar på -o och är maskulint: el libro.',
        feedback: [
          'La används med feminina ord i singular. Libro är maskulint.',
          'Libro slutar på -o och är maskulint: el libro.',
          'Las är feminin plural, men libro står i singular.',
        ],
      },
      {
        prompt: 'Vilket genus har ord på -ción oftast?',
        options: ['Maskulinum', 'Femininum', 'Alltid båda'],
        answer: 1,
        explanation: 'Ändelsen -ción är en stark ledtråd för femininum, som i la canción.',
      },
      {
        prompt: 'Vilken form är korrekt?',
        options: ['el agua frío', 'la agua fría', 'el agua fría'],
        answer: 2,
        explanation: 'Agua är feminint, men tar el i singular framför betonat a-. Adjektivet förblir feminint: fría.',
      },
    ],
  },
  '/docs/substantiv/artiklar': {
    title: 'Artiklar',
    questions: [
      {
        prompt: 'Vilken är den bestämda pluralformen av casa?',
        options: ['los casas', 'las casas', 'la casas'],
        answer: 1,
        explanation: 'Casa är feminint och plural: las casas.',
      },
      {
        prompt: 'Fyll i: ¿Dónde está ___ libro?',
        options: ['el', 'un', 'la'],
        answer: 0,
        explanation: 'Frågan gäller en bestämd bok: el libro.',
      },
      {
        prompt: 'Fyll i: Voy al cine ___ viernes.',
        options: ['un', 'el', 'los'],
        answer: 1,
        explanation: 'Veckodagar tar bestämd artikel: el viernes.',
      },
    ],
  },
  '/docs/substantiv/plural': {
    title: 'Plural',
    questions: [
      {
        prompt: 'Vilken är pluralformen av casa?',
        options: ['casas', 'casaes', 'cases'],
        answer: 0,
        explanation: 'Ord som slutar på obetonad vokal får normalt -s: casas.',
      },
      {
        prompt: 'Vilken är pluralformen av papel?',
        options: ['papels', 'papeles', 'papel'],
        answer: 1,
        explanation: 'Ord som slutar på konsonant får normalt -es: papeles.',
      },
      {
        prompt: 'Vilken är pluralformen av voz?',
        options: ['vozes', 'voces', 'vozs'],
        answer: 1,
        explanation: 'När ett ord slutar på -z ändras z till c före -es: voces.',
      },
    ],
  },
  '/docs/adjektiv/kongruens': {
    title: 'Kongruens',
    questions: [
      {
        prompt: 'Vad ska ett spanskt adjektiv stämma överens med?',
        options: ['Verbets tempus', 'Substantivets genus och numerus', 'Meningens längd'],
        answer: 1,
        explanation: 'Adjektivet böjs efter substantivets genus och numerus.',
      },
      {
        prompt: 'Vilken form passar till las chicas?',
        options: ['hermosa', 'hermosos', 'hermosas'],
        answer: 2,
        explanation: 'Las chicas är feminin plural, så adjektivet blir hermosas.',
      },
      {
        prompt: 'Vilken pluralform får feliz?',
        options: ['felizes', 'felices', 'felizs'],
        answer: 1,
        explanation: 'I plural ändras z till c och ordet får -es: felices.',
      },
    ],
  },
  '/docs/pronomen/personliga': {
    title: 'Personliga pronomen',
    questions: [
      {
        prompt: 'Varför kan subjektspronomenet ofta utelämnas på spanska?',
        options: ['Verbet visar personen', 'Pronomen är förbjudna', 'Subjektet står alltid sist'],
        answer: 0,
        explanation: 'Verbformen visar oftast vem som utför handlingen, så pronomenet behövs inte alltid.',
      },
      {
        prompt: 'Vilket direkt objektspronomen används för honom?',
        options: ['lo', 'le', 'se'],
        answer: 0,
        explanation: 'Lo är direkt objektsform för honom eller ett maskulint ord.',
      },
      {
        prompt: 'Vilket pronomen används efter en preposition för yo?',
        options: ['me', 'mí', 'yo'],
        answer: 1,
        explanation: 'Efter en preposition blir yo formen mí, som i para mí.',
      },
    ],
  },
  '/docs/verb/introduktion': {
    title: 'Verbsystemet',
    questions: [
      {
        prompt: 'Vilken infinitivgrupp tillhör comer?',
        options: ['-ar', '-er', '-ir'],
        answer: 1,
        explanation: 'Infinitiven comer slutar på -er och tillhör därför -er-gruppen.',
      },
      {
        prompt: 'Vilken presensform hör till tú + comer?',
        options: ['como', 'comes', 'comemos'],
        answer: 1,
        explanation: 'Tú-formen av ett regelbundet -er-verb får ändelsen -es: comes.',
      },
      {
        prompt: 'Vilken person uttrycker hablamos?',
        options: ['yo', 'nosotros', 'ellos'],
        answer: 1,
        explanation: 'Ändelsen -amos visar första person plural: nosotros hablamos.',
      },
    ],
  },
  '/docs/verb/tempus/presens': {
    title: 'Presens',
    questions: [
      {
        prompt: 'Böj hablar för yo.',
        options: ['hablas', 'hablo', 'habla'],
        answer: 1,
        explanation: 'Ta bort -ar och lägg till yo-ändelsen -o: hablo.',
      },
      {
        prompt: 'Böj comer för nosotros.',
        options: ['comimos', 'comen', 'comemos'],
        answer: 2,
        explanation: 'Nosotros-ändelsen för regelbundna -er-verb är -emos: comemos.',
      },
      {
        prompt: 'Böj vivir för vosotros.',
        options: ['vivís', 'vivis', 'viven'],
        answer: 0,
        explanation: 'Vosotros-ändelsen för -ir-verb är -ís. Accenttecknet är en del av formen: vivís.',
      },
    ],
  },
  '/docs/syntax/introduktion': {
    title: 'Ordföljd',
    questions: [
      {
        prompt: 'Vilken grundordföljd är vanligast i en enkel spansk mening?',
        options: ['Verb–objekt–subjekt', 'Subjekt–verb–objekt', 'Objekt–subjekt–verb'],
        answer: 1,
        explanation: 'Spanskan använder ofta subjekt–verb–objekt, precis som svenskan.',
      },
      {
        prompt: 'Vad är subjektet i El perro come carne?',
        options: ['El perro', 'come', 'carne'],
        answer: 0,
        explanation: 'El perro utför handlingen och är därför subjektet.',
      },
      {
        prompt: 'Var står objektspronomenet lo i La chica lo quiere?',
        options: ['Före verbet', 'Efter verbet', 'Före subjektet'],
        answer: 0,
        explanation: 'Ett obetonat objektspronomen står normalt före det böjda verbet: lo quiere.',
      },
    ],
  },
  '/docs/verb/oregelbundna-verb': {
    title: 'Oregelbundna verb',
    questions: [
      {
        prompt: 'Vilken är presensformen av ser för yo?',
        options: ['soy', 'estoy', 'es'],
        answer: 0,
        explanation: 'Ser är oregelbundet: yo soy.',
      },
      {
        prompt: 'Vilken är presensformen av ir för nosotros?',
        options: ['imos', 'vamos', 'van'],
        answer: 1,
        explanation: 'Ir är oregelbundet: nosotros vamos.',
      },
      {
        prompt: 'Vilken är presensformen av tener för yo?',
        options: ['teno', 'tiene', 'tengo'],
        answer: 2,
        explanation: 'Tener får en oregelbunden yo-form: tengo.',
      },
    ],
  },
  '/docs/pronomen/reflexiva': {
    title: 'Reflexiva pronomen',
    questions: [
      {
        prompt: 'Vilket reflexivt pronomen hör till yo?',
        options: ['me', 'te', 'se'],
        answer: 0,
        explanation: 'Till yo hör det reflexiva pronomenet me.',
      },
      {
        prompt: 'Vilket reflexivt pronomen hör till nosotros?',
        options: ['os', 'nos', 'se'],
        answer: 1,
        explanation: 'Till nosotros och nosotras hör pronomenet nos.',
      },
      {
        prompt: 'Vilken mening betyder ”Jag tvättar mig”?',
        options: ['Yo lo lavo', 'Yo me lavo', 'Yo te lavo'],
        answer: 1,
        explanation: 'När subjekt och objekt är samma person används me: yo me lavo.',
      },
    ],
  },
  '/docs/syntax/ordfoljd-i-fragor': {
    title: 'Frågor',
    questions: [
      {
        prompt: 'Vilket tecken ska stå först i en spansk fråga?',
        options: ['¿', '?', '¡'],
        answer: 0,
        explanation: 'En spansk fråga omges av ett inledande ¿ och ett avslutande ?.',
      },
      {
        prompt: 'Vilket frågeord betyder ”var”?',
        options: ['cuándo', 'dónde', 'quién'],
        answer: 1,
        explanation: 'Dónde betyder var och skrivs med accent när det är ett frågeord.',
      },
      {
        prompt: 'Vilken ordföljd är vanlig efter ett frågeord?',
        options: ['Frågeord–verb–subjekt', 'Subjekt–frågeord–verb', 'Verb–objekt–frågeord'],
        answer: 0,
        explanation: 'Efter frågeordet står verbet ofta före subjektet: ¿Dónde están los niños?',
      },
    ],
  },
  '/docs/verb/tempus/perfekt': {
    title: 'Perfekt',
    questions: [
      {
        prompt: 'Vad består spansk perfekt av?',
        options: ['Haber + perfekt particip', 'Ser + infinitiv', 'Estar + preteritum'],
        answer: 0,
        explanation: 'Perfekt bildas med haber i presens och perfekt particip.',
      },
      {
        prompt: 'Vilken form betyder ”jag har talat”?',
        options: ['soy hablado', 'he hablado', 'hablé'],
        answer: 1,
        explanation: 'Yo-formen av haber är he och participet är hablado: he hablado.',
      },
      {
        prompt: 'Vilket regelbundet particip får comer?',
        options: ['comado', 'comido', 'comiendo'],
        answer: 1,
        explanation: '-er-verb byter -er mot -ido i perfekt particip: comido.',
      },
    ],
  },
  '/docs/verb/tempus/preteritum': {
    title: 'Preteritum',
    questions: [
      {
        prompt: 'När används preteritum typiskt?',
        options: ['För avslutade händelser', 'Bara för framtid', 'För pågående vanor i nutid'],
        answer: 0,
        explanation: 'Preteritum används bland annat för fullbordade händelser i det förflutna.',
      },
      {
        prompt: 'Böj hablar för yo i preteritum.',
        options: ['hablo', 'hablé', 'hablaba'],
        answer: 1,
        explanation: 'Yo-ändelsen för regelbundna -ar-verb är -é: hablé.',
      },
      {
        prompt: 'Böj comer för ellos i preteritum.',
        options: ['comen', 'comieron', 'comían'],
        answer: 1,
        explanation: 'Ellos-ändelsen för regelbundna -er-verb är -ieron: comieron.',
      },
    ],
  },
  "/docs/verb/tempus/preteritum-eller-imperfekt": {
  "title": "Välj perspektiv i dåtid",
  "questions": [
    {
      "prompt": "Du höll på att läsa när Ana ringde. Vilken mening visar det tydligast?",
      "options": [
        "Leía cuando llamó Ana.",
        "Leí cuando llamó Ana."
      ],
      "answer": 0,
      "explanation": "Leía ger den pågående bakgrunden; llamó är händelsen.",
      "feedback": [
        "Precis: leía visar vad som redan pågick.",
        "Leí presenterar läsningen som en avgränsad helhet. Här vill vi uttrycka en pågående bakgrund med leía."
      ]
    },
    {
      "prompt": "Vad uttrycker Viví allí diez años?",
      "options": [
        "En avgränsad period på tio år.",
        "Att jag säkert fortfarande bor där.",
        "En handling som måste ha varit kort."
      ],
      "answer": 0,
      "explanation": "Även långa perioder kan presenteras som avgränsade helheter i preteritum."
    },
    {
      "prompt": "Som liten brukade jag besöka min mormor varje söndag.",
      "options": [
        "De pequeña visité a mi abuela el domingo pasado.",
        "De pequeña visitaba a mi abuela todos los domingos."
      ],
      "answer": 1,
      "explanation": "Visitaba beskriver vanan. El domingo pasado betyder förra söndagen och passar inte den avsedda betydelsen."
    }
  ]
},
  "/docs/pronomen/objektspronomen-tillsammans": {
  "title": "Vem får vad?",
  "questions": [
    {
      "prompt": "Ersätt el libro och a Ana i Doy el libro a Ana.",
      "options": [
        "Le lo doy.",
        "Se lo doy.",
        "Lo se doy."
      ],
      "answer": 1,
      "explanation": "Le blir se framför lo. Indirekt objekt kommer före direkt objekt.",
      "feedback": [
        "Le byter form till se framför lo.",
        "Precis: se står för mottagaren och lo för boken.",
        "Pronomenen behöver stå i ordningen se lo."
      ]
    },
    {
      "prompt": "Ersätt las llaves i Te doy las llaves.",
      "options": [
        "Te lo doy.",
        "Te la doy.",
        "Te las doy."
      ],
      "answer": 2,
      "explanation": "Las llaves är femininum plural och ersätts av las."
    },
    {
      "prompt": "Vilken placering fungerar med voy a mandar?",
      "options": [
        "Te voy a lo mandar.",
        "Voy a mandártelo."
      ],
      "answer": 1,
      "explanation": "Pronomenen hålls ihop. Voy a mandártelo och Te lo voy a mandar fungerar båda."
    }
  ]
},
  "/docs/verb/tempus/pluskvamperfekt": {
  "title": "Det som hade hänt",
  "questions": [
    {
      "prompt": "Cuando llegué, Ana ya había cenado. Vad hände först?",
      "options": [
        "Ana åt middag.",
        "Jag kom fram."
      ],
      "answer": 0,
      "explanation": "Había cenado placerar middagen före ankomsten."
    },
    {
      "prompt": "Vi hade sett filmen.",
      "options": [
        "Habíamos visto la película.",
        "Habíamos vido la película.",
        "Hemos visto la película."
      ],
      "answer": 0,
      "explanation": "Habíamos är haber i imperfekt. Ver har participet visto."
    },
    {
      "prompt": "Vilken mening har rätt particip efter haber?",
      "options": [
        "Ellas habían llegadas.",
        "Ellas habían llegado."
      ],
      "answer": 1,
      "explanation": "Particip efter haber ändras inte efter subjektets genus eller antal."
    }
  ]
},
  "/docs/prepositioner/introduktion": {
  "title": "Plats och riktning",
  "questions": [
    {
      "prompt": "Jag är på stationen.",
      "options": [
        "Estoy a la estación.",
        "Estoy en la estación."
      ],
      "answer": 1,
      "explanation": "En anger platsen där du befinner dig."
    },
    {
      "prompt": "Sätt ihop de + el trabajo.",
      "options": [
        "del trabajo",
        "de el trabajo",
        "de la trabajo"
      ],
      "answer": 0,
      "explanation": "De + artikeln el blir del."
    },
    {
      "prompt": "Vilket uttryck betyder jag tänker på semestern?",
      "options": [
        "Pienso de las vacaciones.",
        "Pienso en las vacaciones."
      ],
      "answer": 1,
      "explanation": "Lär dig pensar en som ett paket. Svenskans på översätts inte alltid med samma preposition."
    }
  ]
},
  "/docs/prepositioner/personligt-a": {
  "title": "Personen som objekt",
  "questions": [
    {
      "prompt": "Jag väntar på min syster.",
      "options": [
        "Espero mi hermana.",
        "Espero a mi hermana."
      ],
      "answer": 1,
      "explanation": "En identifierad person som direkt objekt får normalt personligt a."
    },
    {
      "prompt": "Vilken funktion har a Ana i Veo a Ana?",
      "options": [
        "Direkt objekt.",
        "Indirekt objekt eftersom a står framför."
      ],
      "answer": 0,
      "explanation": "Ana är den som ses. A gör inte automatiskt ett objekt indirekt."
    },
    {
      "prompt": "Jag har två syskon.",
      "options": [
        "Tengo a dos hermanos.",
        "Tengo dos hermanos."
      ],
      "answer": 1,
      "explanation": "Tener i vanlig betydelse ha använder normalt inte personligt a."
    }
  ]
},
  "/docs/grunder/betoning-och-accenter": {
  "title": "Var ligger betoningen?",
  "questions": [
    {
      "prompt": "Vilken stavelse betonas i teléfono?",
      "options": [
        "te",
        "lé",
        "fo",
        "no"
      ],
      "answer": 1,
      "explanation": "Accenttecknet visar betoningen: te-LÉ-fo-no."
    },
    {
      "prompt": "Välj rätt stavning för han/hon pratade.",
      "options": [
        "hablo",
        "habló"
      ],
      "answer": 1,
      "explanation": "Habló betonas på sista stavelsen. Hablo betyder jag pratar."
    },
    {
      "prompt": "Ditt hus — vilken form behövs?",
      "options": [
        "tú casa",
        "tu casa"
      ],
      "answer": 1,
      "explanation": "Tu utan accent anger ägande. Tú med accent är subjektspronomenet du."
    }
  ]
},
  "/docs/verb/tempus/imperfekt": {
  "title": "Bakgrund och vanor",
  "questions": [
    {
      "prompt": "Vi brukade äta hemma.",
      "options": [
        "Comíamos en casa.",
        "Comimos en casa."
      ],
      "answer": 0,
      "explanation": "Comíamos uttrycker här vanan. Comimos presenterar en avgränsad händelse eller period."
    },
    {
      "prompt": "Vilken är jag-formen av ir i imperfekt?",
      "options": [
        "fui",
        "iba",
        "voy"
      ],
      "answer": 1,
      "explanation": "Ir är oregelbundet i imperfekt: iba, ibas, iba, íbamos, ibais, iban."
    },
    {
      "prompt": "Vilken form passar som väderbakgrund: Det var kallt?",
      "options": [
        "Hacía frío.",
        "Hizo frío durante toda la semana."
      ],
      "answer": 0,
      "explanation": "Hacía frío beskriver bakgrunden. Den andra meningen sammanfattar en avgränsad vecka."
    }
  ]
},
};
