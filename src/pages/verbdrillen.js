import React, { useState, useRef, useCallback } from 'react';
import Layout from '@theme/Layout';
import styles from './verbdrillen.module.css';

// ─── FILTER OPTIONS ───────────────────────────────────────────────────────────

const TEMPUS_OPTIONS = [
  { id: 'presens',    label: 'Presens' },
  { id: 'preteritum', label: 'Preteritum' },
  { id: 'imperfekt',  label: 'Imperfekt' },
  { id: 'perfekt',    label: 'Perfekt' },
  { id: 'gerundium',  label: 'Gerundium' },
];

const MODUS_OPTIONS = [
  { id: 'indikativ',  label: 'Indikativ' },
  { id: 'konjunktiv', label: 'Konjunktiv' },
  { id: 'imperativ',  label: 'Imperativ' },
];

const TYP_OPTIONS = [
  { id: 'regular',        label: 'Regelbundna' },
  { id: 'reflexiva',      label: '🦺 Reflexiva' },
  { id: 'diftongerande',  label: '🔃 Diftongerande' },
  { id: 'vokalskiftande', label: '🦄 Vokalskiftande' },
  { id: 'oregelbundna',   label: '🖕 Oregelbundna' },
];

// ─── VALID COMBINATIONS ───────────────────────────────────────────────────────

const VALID_COMBOS = {
  presens:    {
    indikativ:  ['regular', 'reflexiva', 'diftongerande', 'vokalskiftande', 'oregelbundna'],
    konjunktiv: ['regular', 'oregelbundna'],
    imperativ:  ['regular', 'oregelbundna'],
  },
  preteritum: {
    indikativ:  ['regular', 'oregelbundna'],
    konjunktiv: [],
    imperativ:  [],
  },
  imperfekt:  {
    indikativ:  ['regular', 'oregelbundna'],
    konjunktiv: ['regular', 'oregelbundna'],
    imperativ:  [],
  },
  perfekt:    {
    indikativ:  ['regular', 'oregelbundna'],
    konjunktiv: [],
    imperativ:  [],
  },
  gerundium:  {
    indikativ:  ['regular', 'oregelbundna'],
    konjunktiv: [],
    imperativ:  [],
  },
};

// ─── PRONOUNS ─────────────────────────────────────────────────────────────────

const PRONOUNS_DEFAULT   = ['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos/ellas'];
const PRONOUNS_IMPERATIV = ['—',  'tú', 'él/usted', 'nosotros', 'vosotros', 'ellos/ustedes'];

const ACCENT_CHARS = ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'];

// ─── VERB DATA ────────────────────────────────────────────────────────────────

const VERB_DATA = {

  // ═══ PRESENS INDIKATIV ═══════════════════════════════════════════════════════

  presens_indikativ_regular: [
    { inf: 'hablar',   swe: 'prata / tala',       forms: ['hablo',    'hablas',    'habla',    'hablamos',    'habláis',    'hablan']    },
    { inf: 'escuchar', swe: 'lyssna',              forms: ['escucho',  'escuchas',  'escucha',  'escuchamos',  'escucháis',  'escuchan']  },
    { inf: 'trabajar', swe: 'arbeta / jobba',      forms: ['trabajo',  'trabajas',  'trabaja',  'trabajamos',  'trabajáis',  'trabajan']  },
    { inf: 'mirar',    swe: 'titta / se på',       forms: ['miro',     'miras',     'mira',     'miramos',     'miráis',     'miran']     },
    { inf: 'comprar',  swe: 'köpa',                forms: ['compro',   'compras',   'compra',   'compramos',   'compráis',   'compran']   },
    { inf: 'necesitar',swe: 'behöva',              forms: ['necesito', 'necesitas', 'necesita', 'necesitamos', 'necesitáis', 'necesitan'] },
    { inf: 'comer',    swe: 'äta',                 forms: ['como',     'comes',     'come',     'comemos',     'coméis',     'comen']     },
    { inf: 'beber',    swe: 'dricka',              forms: ['bebo',     'bebes',     'bebe',     'bebemos',     'bebéis',     'beben']     },
    { inf: 'leer',     swe: 'läsa',                forms: ['leo',      'lees',      'lee',      'leemos',      'leéis',      'leen']      },
    { inf: 'aprender', swe: 'lära sig',            forms: ['aprendo',  'aprendes',  'aprende',  'aprendemos',  'aprendéis',  'aprenden']  },
    { inf: 'vivir',    swe: 'leva / bo',           forms: ['vivo',     'vives',     'vive',     'vivimos',     'vivís',      'viven']     },
    { inf: 'escribir', swe: 'skriva',              forms: ['escribo',  'escribes',  'escribe',  'escribimos',  'escribís',   'escriben']  },
    { inf: 'recibir',  swe: 'ta emot / få',        forms: ['recibo',   'recibes',   'recibe',   'recibimos',   'recibís',    'reciben']   },
    { inf: 'abrir',    swe: 'öppna',               forms: ['abro',     'abres',     'abre',     'abrimos',     'abrís',      'abren']     },
  ],

  presens_indikativ_reflexiva: [
    { inf: 'bañarse',      swe: 'bada',                 note: 'reflexivt',                      forms: ['me baño',      'te bañas',      'se baña',      'nos bañamos',      'os bañáis',      'se bañan']      },
    { inf: 'ducharse',     swe: 'duscha',               note: 'reflexivt',                      forms: ['me ducho',     'te duchas',     'se ducha',     'nos duchamos',     'os ducháis',     'se duchan']     },
    { inf: 'levantarse',   swe: 'stiga upp / resa sig', note: 'reflexivt',                      forms: ['me levanto',   'te levantas',   'se levanta',   'nos levantamos',   'os levantáis',   'se levantan']   },
    { inf: 'llamarse',     swe: 'heta',                 note: 'reflexivt',                      forms: ['me llamo',     'te llamas',     'se llama',     'nos llamamos',     'os llamáis',     'se llaman']     },
    { inf: 'afeitarse',    swe: 'raka sig',             note: 'reflexivt',                      forms: ['me afeito',    'te afeitas',    'se afeita',    'nos afeitamos',    'os afeitáis',    'se afeitan']    },
    { inf: 'peinarse',     swe: 'kamma / borsta håret', note: 'reflexivt',                      forms: ['me peino',     'te peinas',     'se peina',     'nos peinamos',     'os peináis',     'se peinan']     },
    { inf: 'preocuparse',  swe: 'oroa sig',             note: 'reflexivt',                      forms: ['me preocupo',  'te preocupas',  'se preocupa',  'nos preocupamos',  'os preocupáis',  'se preocupan']  },
    { inf: 'aburrirse',    swe: 'tråkas',               note: 'reflexivt',                      forms: ['me aburro',    'te aburres',    'se aburre',    'nos aburrimos',    'os aburrís',     'se aburren']    },
    { inf: 'divertirse',   swe: 'ha roligt / roa sig',  note: 'reflexivt + diftong (e→ie)',     forms: ['me divierto',  'te diviertes',  'se divierte',  'nos divertimos',   'os divertís',    'se divierten']  },
    { inf: 'acostarse',    swe: 'lägga sig',            note: 'reflexivt + diftong (o→ue)',     forms: ['me acuesto',   'te acuestas',   'se acuesta',   'nos acostamos',    'os acostáis',    'se acuestan']   },
    { inf: 'despertarse',  swe: 'vakna',                note: 'reflexivt + diftong (e→ie)',     forms: ['me despierto', 'te despiertas', 'se despierta', 'nos despertamos',  'os despertáis',  'se despiertan'] },
    { inf: 'sentirse',     swe: 'känna sig / må',       note: 'reflexivt + diftong (e→ie)',     forms: ['me siento',    'te sientes',    'se siente',    'nos sentimos',     'os sentís',      'se sienten']    },
    { inf: 'vestirse',     swe: 'klä på sig',           note: 'reflexivt + vokalskifte (e→i)',  forms: ['me visto',     'te vistes',     'se viste',     'nos vestimos',     'os vestís',      'se visten']     },
  ],

  presens_indikativ_diftongerande: [
    { inf: 'pensar',    swe: 'tänka / tycka',           note: '(ie)', forms: ['pienso',    'piensas',    'piensa',    'pensamos',    'pensáis',    'piensan']    },
    { inf: 'poder',     swe: 'kunna',                   note: '(ue)', forms: ['puedo',     'puedes',     'puede',     'podemos',     'podéis',     'pueden']     },
    { inf: 'querer',    swe: 'vilja / tycka om',        note: '(ie)', forms: ['quiero',    'quieres',    'quiere',    'queremos',    'queréis',    'quieren']    },
    { inf: 'jugar',     swe: 'spela / leka',            note: '(ue)', forms: ['juego',     'juegas',     'juega',     'jugamos',     'jugáis',     'juegan']     },
    { inf: 'volver',    swe: 'återvända / komma tillbaka', note: '(ue)', forms: ['vuelvo', 'vuelves',    'vuelve',    'volvemos',    'volvéis',    'vuelven']    },
    { inf: 'encontrar', swe: 'hitta / träffa',          note: '(ue)', forms: ['encuentro', 'encuentras', 'encuentra', 'encontramos', 'encontráis', 'encuentran'] },
    { inf: 'perder',    swe: 'förlora / tappa',         note: '(ie)', forms: ['pierdo',    'pierdes',    'pierde',    'perdemos',    'perdéis',    'pierden']    },
    { inf: 'entender',  swe: 'förstå',                  note: '(ie)', forms: ['entiendo',  'entiendes',  'entiende',  'entendemos',  'entendéis',  'entienden']  },
    { inf: 'dormir',    swe: 'sova',                    note: '(ue)', forms: ['duermo',    'duermes',    'duerme',    'dormimos',    'dormís',     'duermen']    },
    { inf: 'preferir',  swe: 'föredra',                 note: '(ie)', forms: ['prefiero',  'prefieres',  'prefiere',  'preferimos',  'preferís',   'prefieren']  },
    { inf: 'contar',    swe: 'räkna / berätta',         note: '(ue)', forms: ['cuento',    'cuentas',    'cuenta',    'contamos',    'contáis',    'cuentan']    },
    { inf: 'empezar',   swe: 'börja',                   note: '(ie)', forms: ['empiezo',   'empiezas',   'empieza',   'empezamos',   'empezáis',   'empiezan']   },
    { inf: 'cerrar',    swe: 'stänga',                  note: '(ie)', forms: ['cierro',    'cierras',    'cierra',    'cerramos',    'cerráis',    'cierran']    },
  ],

  presens_indikativ_vokalskiftande: [
    { inf: 'pedir',    swe: 'be om / beställa',   note: '(i)', forms: ['pido',    'pides',    'pide',    'pedimos',    'pedís',    'piden']    },
    { inf: 'seguir',   swe: 'följa / fortsätta',  note: '(i)', forms: ['sigo',    'sigues',   'sigue',   'seguimos',   'seguís',   'siguen']   },
    { inf: 'servir',   swe: 'servera / duga till', note: '(i)', forms: ['sirvo',   'sirves',   'sirve',   'servimos',   'servís',   'sirven']   },
    { inf: 'repetir',  swe: 'upprepa',            note: '(i)', forms: ['repito',  'repites',  'repite',  'repetimos',  'repetís',  'repiten']  },
    { inf: 'reír',     swe: 'skratta',            note: '(i)', forms: ['río',     'ríes',     'ríe',     'reímos',     'reís',     'ríen']     },
    { inf: 'conseguir', swe: 'lyckas med / få tag på', note: '(i)', forms: ['consigo', 'consigues', 'consigue', 'conseguimos', 'conseguís', 'consiguen'] },
    { inf: 'elegir',   swe: 'välja',              note: '(i)', forms: ['elijo',   'eliges',   'elige',   'elegimos',   'elegís',   'eligen']   },
    { inf: 'medir',    swe: 'mäta',               note: '(i)', forms: ['mido',    'mides',    'mide',    'medimos',    'medís',    'miden']    },
  ],

  presens_indikativ_oregelbundna: [
    { inf: 'ser',     swe: 'vara (bestående)',       forms: ['soy',     'eres',    'es',    'somos',    'sois',    'son']     },
    { inf: 'estar',   swe: 'vara (tillstånd / plats)',forms: ['estoy',   'estás',   'está',  'estamos',  'estáis',  'están']   },
    { inf: 'tener',   swe: 'ha / äga',              forms: ['tengo',   'tienes',  'tiene', 'tenemos',  'tenéis',  'tienen']  },
    { inf: 'ir',      swe: 'gå / åka',              forms: ['voy',     'vas',     'va',    'vamos',    'vais',    'van']     },
    { inf: 'hacer',   swe: 'göra / tillverka',       forms: ['hago',    'haces',   'hace',  'hacemos',  'hacéis',  'hacen']   },
    { inf: 'decir',   swe: 'säga',                  forms: ['digo',    'dices',   'dice',  'decimos',  'decís',   'dicen']   },
    { inf: 'venir',   swe: 'komma',                 forms: ['vengo',   'vienes',  'viene', 'venimos',  'venís',   'vienen']  },
    { inf: 'saber',   swe: 'veta / kunna',           forms: ['sé',      'sabes',   'sabe',  'sabemos',  'sabéis',  'saben']   },
    { inf: 'conocer', swe: 'känna (till)',            forms: ['conozco', 'conoces', 'conoce','conocemos','conocéis','conocen'] },
    { inf: 'ver',     swe: 'se / titta',             forms: ['veo',     'ves',     've',    'vemos',    'veis',    'ven']     },
    { inf: 'dar',     swe: 'ge',                     forms: ['doy',     'das',     'da',    'damos',    'dais',    'dan']     },
    { inf: 'poner',   swe: 'lägga / ställa',         forms: ['pongo',   'pones',   'pone',  'ponemos',  'ponéis',  'ponen']   },
    { inf: 'salir',   swe: 'gå ut / lämna',          forms: ['salgo',   'sales',   'sale',  'salimos',  'salís',   'salen']   },
    { inf: 'traer',   swe: 'ta med / apportera',     forms: ['traigo',  'traes',   'trae',  'traemos',  'traéis',  'traen']   },
    { inf: 'oír',     swe: 'höra',                   forms: ['oigo',    'oyes',    'oye',   'oímos',    'oís',     'oyen']    },
  ],

  // ═══ PRESENS KONJUNKTIV ══════════════════════════════════════════════════════

  presens_konjunktiv_regular: [
    { inf: 'hablar',   swe: 'prata / tala',  forms: ['hable',   'hables',   'hable',   'hablemos',   'habléis',   'hablen']   },
    { inf: 'escuchar', swe: 'lyssna',        forms: ['escuche', 'escuches', 'escuche', 'escuchemos', 'escuchéis', 'escuchen'] },
    { inf: 'trabajar', swe: 'arbeta',        forms: ['trabaje', 'trabajes', 'trabaje', 'trabajemos', 'trabajéis', 'trabajen'] },
    { inf: 'mirar',    swe: 'titta',         forms: ['mire',    'mires',    'mire',    'miremos',    'miréis',    'miren']    },
    { inf: 'comprar',  swe: 'köpa',          forms: ['compre',  'compres',  'compre',  'compremos',  'compréis',  'compren']  },
    { inf: 'comer',    swe: 'äta',           forms: ['coma',    'comas',    'coma',    'comamos',    'comáis',    'coman']    },
    { inf: 'beber',    swe: 'dricka',        forms: ['beba',    'bebas',    'beba',    'bebamos',    'bebáis',    'beban']    },
    { inf: 'leer',     swe: 'läsa',          forms: ['lea',     'leas',     'lea',     'leamos',     'leáis',     'lean']     },
    { inf: 'vivir',    swe: 'leva / bo',     forms: ['viva',    'vivas',    'viva',    'vivamos',    'viváis',    'vivan']    },
    { inf: 'escribir', swe: 'skriva',        forms: ['escriba', 'escribas', 'escriba', 'escribamos', 'escribáis', 'escriban'] },
  ],

  presens_konjunktiv_oregelbundna: [
    { inf: 'ser',     swe: 'vara',           forms: ['sea',     'seas',     'sea',     'seamos',     'seáis',     'sean']     },
    { inf: 'estar',   swe: 'vara',           forms: ['esté',    'estés',    'esté',    'estemos',    'estéis',    'estén']    },
    { inf: 'ir',      swe: 'gå / åka',       forms: ['vaya',    'vayas',    'vaya',    'vayamos',    'vayáis',    'vayan']    },
    { inf: 'saber',   swe: 'veta',           forms: ['sepa',    'sepas',    'sepa',    'sepamos',    'sepáis',    'sepan']    },
    { inf: 'haber',   swe: 'ha (hjälpverb)', forms: ['haya',    'hayas',    'haya',    'hayamos',    'hayáis',    'hayan']    },
    { inf: 'dar',     swe: 'ge',             forms: ['dé',      'des',      'dé',      'demos',      'deis',      'den']      },
    { inf: 'tener',   swe: 'ha / äga',       forms: ['tenga',   'tengas',   'tenga',   'tengamos',   'tengáis',   'tengan']   },
    { inf: 'hacer',   swe: 'göra',           forms: ['haga',    'hagas',    'haga',    'hagamos',    'hagáis',    'hagan']    },
    { inf: 'venir',   swe: 'komma',          forms: ['venga',   'vengas',   'venga',   'vengamos',   'vengáis',   'vengan']   },
    { inf: 'decir',   swe: 'säga',           forms: ['diga',    'digas',    'diga',    'digamos',    'digáis',    'digan']    },
    { inf: 'poner',   swe: 'lägga',          forms: ['ponga',   'pongas',   'ponga',   'pongamos',   'pongáis',   'pongan']   },
    { inf: 'salir',   swe: 'gå ut',          forms: ['salga',   'salgas',   'salga',   'salgamos',   'salgáis',   'salgan']   },
    { inf: 'ver',     swe: 'se',             forms: ['vea',     'veas',     'vea',     'veamos',     'veáis',     'vean']     },
    { inf: 'conocer', swe: 'känna till',     forms: ['conozca', 'conozcas', 'conozca', 'conozcamos', 'conozcáis', 'conozcan'] },
  ],

  // ═══ IMPERATIV ═══════════════════════════════════════════════════════════════

  presens_imperativ_regular: [
    { inf: 'hablar',   swe: 'prata / tala', forms: ['—', 'habla',    'hable',    'hablemos',   'hablad',    'hablen']   },
    { inf: 'escuchar', swe: 'lyssna',       forms: ['—', 'escucha',  'escuche',  'escuchemos', 'escuchad',  'escuchen'] },
    { inf: 'trabajar', swe: 'arbeta',       forms: ['—', 'trabaja',  'trabaje',  'trabajemos', 'trabajad',  'trabajen'] },
    { inf: 'mirar',    swe: 'titta',        forms: ['—', 'mira',     'mire',     'miremos',    'mirad',     'miren']    },
    { inf: 'comprar',  swe: 'köpa',         forms: ['—', 'compra',   'compre',   'compremos',  'comprad',   'compren']  },
    { inf: 'comer',    swe: 'äta',          forms: ['—', 'come',     'coma',     'comamos',    'comed',     'coman']    },
    { inf: 'beber',    swe: 'dricka',       forms: ['—', 'bebe',     'beba',     'bebamos',    'bebed',     'beban']    },
    { inf: 'leer',     swe: 'läsa',         forms: ['—', 'lee',      'lea',      'leamos',     'leed',      'lean']     },
    { inf: 'vivir',    swe: 'leva / bo',    forms: ['—', 'vive',     'viva',     'vivamos',    'vivid',     'vivan']    },
    { inf: 'escribir', swe: 'skriva',       forms: ['—', 'escribe',  'escriba',  'escribamos', 'escribid',  'escriban'] },
    { inf: 'abrir',    swe: 'öppna',        forms: ['—', 'abre',     'abra',     'abramos',    'abrid',     'abran']    },
  ],

  presens_imperativ_oregelbundna: [
    { inf: 'ser',   swe: 'vara',      forms: ['—', 'sé',    'sea',   'seamos',  'sed',     'sean']   },
    { inf: 'estar', swe: 'vara',      forms: ['—', 'está',  'esté',  'estemos', 'estad',   'estén']  },
    { inf: 'ir',    swe: 'gå / åka',  forms: ['—', 've',    'vaya',  'vayamos', 'id',      'vayan']  },
    { inf: 'tener', swe: 'ha / äga',  forms: ['—', 'ten',   'tenga', 'tengamos','tened',   'tengan'] },
    { inf: 'hacer', swe: 'göra',      forms: ['—', 'haz',   'haga',  'hagamos', 'haced',   'hagan']  },
    { inf: 'decir', swe: 'säga',      forms: ['—', 'di',    'diga',  'digamos', 'decid',   'digan']  },
    { inf: 'poner', swe: 'lägga',     forms: ['—', 'pon',   'ponga', 'pongamos','poned',   'pongan'] },
    { inf: 'salir', swe: 'gå ut',     forms: ['—', 'sal',   'salga', 'salgamos','salid',   'salgan'] },
    { inf: 'venir', swe: 'komma',     forms: ['—', 'ven',   'venga', 'vengamos','venid',   'vengan'] },
    { inf: 'saber', swe: 'veta',      forms: ['—', 'sabe',  'sepa',  'sepamos', 'sabed',   'sepan']  },
    { inf: 'dar',   swe: 'ge',        forms: ['—', 'da',    'dé',    'demos',   'dad',     'den']    },
    { inf: 'ver',   swe: 'se',        forms: ['—', 've',    'vea',   'veamos',  'ved',     'vean']   },
  ],

  // ═══ PRETERITUM INDIKATIV ════════════════════════════════════════════════════

  preteritum_indikativ_regular: [
    { inf: 'hablar',    swe: 'prata / tala',  forms: ['hablé',    'hablaste',    'habló',    'hablamos',    'hablasteis',    'hablaron']    },
    { inf: 'escuchar',  swe: 'lyssna',        forms: ['escuché',  'escuchaste',  'escuchó',  'escuchamos',  'escuchasteis',  'escucharon']  },
    { inf: 'trabajar',  swe: 'arbeta',        forms: ['trabajé',  'trabajaste',  'trabajó',  'trabajamos',  'trabajasteis',  'trabajaron']  },
    { inf: 'mirar',     swe: 'titta',         forms: ['miré',     'miraste',     'miró',     'miramos',     'mirasteis',     'miraron']     },
    { inf: 'comprar',   swe: 'köpa',          forms: ['compré',   'compraste',   'compró',   'compramos',   'comprasteis',   'compraron']   },
    { inf: 'llegar',    swe: 'anlända / komma',forms: ['llegué',  'llegaste',    'llegó',    'llegamos',    'llegasteis',    'llegaron']    },
    { inf: 'comer',     swe: 'äta',           forms: ['comí',     'comiste',     'comió',    'comimos',     'comisteis',     'comieron']    },
    { inf: 'beber',     swe: 'dricka',        forms: ['bebí',     'bebiste',     'bebió',    'bebimos',     'bebisteis',     'bebieron']    },
    { inf: 'vivir',     swe: 'bo / leva',     forms: ['viví',     'viviste',     'vivió',    'vivimos',     'vivisteis',     'vivieron']    },
    { inf: 'escribir',  swe: 'skriva',        forms: ['escribí',  'escribiste',  'escribió', 'escribimos',  'escribisteis',  'escribieron'] },
    { inf: 'recibir',   swe: 'ta emot',       forms: ['recibí',   'recibiste',   'recibió',  'recibimos',   'recibisteis',   'recibieron']  },
    { inf: 'salir',     swe: 'gå ut',         forms: ['salí',     'saliste',     'salió',    'salimos',     'salisteis',     'salieron']    },
  ],

  preteritum_indikativ_oregelbundna: [
    { inf: 'ser / ir', swe: 'vara / gå', note: 'delar former i preteritum', forms: ['fui',   'fuiste',    'fue',    'fuimos',    'fuisteis',    'fueron']    },
    { inf: 'tener',    swe: 'ha / äga',                                      forms: ['tuve',  'tuviste',   'tuvo',   'tuvimos',   'tuvisteis',   'tuvieron']  },
    { inf: 'estar',    swe: 'vara',                                           forms: ['estuve','estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron'] },
    { inf: 'hacer',    swe: 'göra',                                           forms: ['hice',  'hiciste',   'hizo',   'hicimos',   'hicisteis',   'hicieron']  },
    { inf: 'poder',    swe: 'kunna',                                          forms: ['pude',  'pudiste',   'pudo',   'pudimos',   'pudisteis',   'pudieron']  },
    { inf: 'venir',    swe: 'komma',                                          forms: ['vine',  'viniste',   'vino',   'vinimos',   'vinisteis',   'vinieron']  },
    { inf: 'querer',   swe: 'vilja',                                          forms: ['quise', 'quisiste',  'quiso',  'quisimos',  'quisisteis',  'quisieron'] },
    { inf: 'saber',    swe: 'veta',                                           forms: ['supe',  'supiste',   'supo',   'supimos',   'supisteis',   'supieron']  },
    { inf: 'decir',    swe: 'säga',                                           forms: ['dije',  'dijiste',   'dijo',   'dijimos',   'dijisteis',   'dijeron']   },
    { inf: 'poner',    swe: 'lägga',                                          forms: ['puse',  'pusiste',   'puso',   'pusimos',   'pusisteis',   'pusieron']  },
    { inf: 'traer',    swe: 'ta med',                                         forms: ['traje', 'trajiste',  'trajo',  'trajimos',  'trajisteis',  'trajeron']  },
    { inf: 'dar',      swe: 'ge',                                             forms: ['di',    'diste',     'dio',    'dimos',     'disteis',     'dieron']    },
    { inf: 'ver',      swe: 'se',                                             forms: ['vi',    'viste',     'vio',    'vimos',     'visteis',     'vieron']    },
    { inf: 'andar',    swe: 'gå / vandra',                                    forms: ['anduve','anduviste', 'anduvo', 'anduvimos', 'anduvisteis', 'anduvieron'] },
  ],

  // ═══ IMPERFEKT INDIKATIV ═════════════════════════════════════════════════════

  imperfekt_indikativ_regular: [
    { inf: 'hablar',    swe: 'prata / tala',  forms: ['hablaba',   'hablabas',   'hablaba',   'hablábamos',   'hablabais',   'hablaban']   },
    { inf: 'escuchar',  swe: 'lyssna',        forms: ['escuchaba', 'escuchabas', 'escuchaba', 'escuchábamos', 'escuchabais', 'escuchaban'] },
    { inf: 'trabajar',  swe: 'arbeta',        forms: ['trabajaba', 'trabajabas', 'trabajaba', 'trabajábamos', 'trabajabais', 'trabajaban'] },
    { inf: 'mirar',     swe: 'titta',         forms: ['miraba',    'mirabas',    'miraba',    'mirábamos',    'mirabais',    'miraban']    },
    { inf: 'comprar',   swe: 'köpa',          forms: ['compraba',  'comprabas',  'compraba',  'comprábamos',  'comprabais',  'compraban']  },
    { inf: 'vivir',     swe: 'bo / leva',     forms: ['vivía',     'vivías',     'vivía',     'vivíamos',     'vivíais',     'vivían']     },
    { inf: 'comer',     swe: 'äta',           forms: ['comía',     'comías',     'comía',     'comíamos',     'comíais',     'comían']     },
    { inf: 'beber',     swe: 'dricka',        forms: ['bebía',     'bebías',     'bebía',     'bebíamos',     'bebíais',     'bebían']     },
    { inf: 'leer',      swe: 'läsa',          forms: ['leía',      'leías',      'leía',      'leíamos',      'leíais',      'leían']      },
    { inf: 'escribir',  swe: 'skriva',        forms: ['escribía',  'escribías',  'escribía',  'escribíamos',  'escribíais',  'escribían']  },
    { inf: 'recibir',   swe: 'ta emot',       forms: ['recibía',   'recibías',   'recibía',   'recibíamos',   'recibíais',   'recibían']   },
  ],

  imperfekt_indikativ_oregelbundna: [
    { inf: 'ser', swe: 'vara (bestående)',  forms: ['era',  'eras',  'era',  'éramos',  'erais',  'eran']  },
    { inf: 'ir',  swe: 'gå / åka',         forms: ['iba',  'ibas',  'iba',  'íbamos',  'ibais',  'iban']  },
    { inf: 'ver', swe: 'se',               forms: ['veía', 'veías', 'veía', 'veíamos', 'veíais', 'veían'] },
  ],

  // ═══ IMPERFEKT KONJUNKTIV ════════════════════════════════════════════════════

  imperfekt_konjunktiv_regular: [
    { inf: 'hablar',   swe: 'prata / tala',  forms: ['hablara',   'hablaras',   'hablara',   'habláramos',   'hablarais',   'hablaran']   },
    { inf: 'escuchar', swe: 'lyssna',        forms: ['escuchara', 'escucharas', 'escuchara', 'escucháramos', 'escucharais', 'escucharan'] },
    { inf: 'trabajar', swe: 'arbeta',        forms: ['trabajara', 'trabajaras', 'trabajara', 'trabajáramos', 'trabajarais', 'trabajaran'] },
    { inf: 'mirar',    swe: 'titta',         forms: ['mirara',    'miraras',    'mirara',    'miráramos',    'mirarais',    'miraran']    },
    { inf: 'comer',    swe: 'äta',           forms: ['comiera',   'comieras',   'comiera',   'comiéramos',   'comierais',   'comieran']   },
    { inf: 'beber',    swe: 'dricka',        forms: ['bebiera',   'bebieras',   'bebiera',   'bebiéramos',   'bebierais',   'bebieran']   },
    { inf: 'vivir',    swe: 'leva / bo',     forms: ['viviera',   'vivieras',   'viviera',   'viviéramos',   'vivierais',   'vivieran']   },
    { inf: 'escribir', swe: 'skriva',        forms: ['escribiera','escribieras','escribiera','escribiéramos','escribierais','escribieran'] },
  ],

  imperfekt_konjunktiv_oregelbundna: [
    { inf: 'ser / ir', swe: 'vara / gå',   forms: ['fuera',     'fueras',     'fuera',     'fuéramos',     'fuerais',     'fueran']     },
    { inf: 'tener',    swe: 'ha / äga',    forms: ['tuviera',   'tuvieras',   'tuviera',   'tuviéramos',   'tuvierais',   'tuvieran']   },
    { inf: 'estar',    swe: 'vara',        forms: ['estuviera', 'estuvieras', 'estuviera', 'estuviéramos', 'estuvierais', 'estuvieran'] },
    { inf: 'hacer',    swe: 'göra',        forms: ['hiciera',   'hicieras',   'hiciera',   'hiciéramos',   'hicierais',   'hicieran']   },
    { inf: 'poder',    swe: 'kunna',       forms: ['pudiera',   'pudieras',   'pudiera',   'pudiéramos',   'pudierais',   'pudieran']   },
    { inf: 'venir',    swe: 'komma',       forms: ['viniera',   'vinieras',   'viniera',   'viniéramos',   'vinierais',   'vinieran']   },
    { inf: 'querer',   swe: 'vilja',       forms: ['quisiera',  'quisieras',  'quisiera',  'quisiéramos',  'quisierais',  'quisieran']  },
    { inf: 'decir',    swe: 'säga',        forms: ['dijera',    'dijeras',    'dijera',    'dijéramos',    'dijerais',    'dijeran']    },
    { inf: 'saber',    swe: 'veta',        forms: ['supiera',   'supieras',   'supiera',   'supiéramos',   'supierais',   'supieran']   },
    { inf: 'poner',    swe: 'lägga',       forms: ['pusiera',   'pusieras',   'pusiera',   'pusiéramos',   'pusierais',   'pusieran']   },
    { inf: 'traer',    swe: 'ta med',      forms: ['trajera',   'trajeras',   'trajera',   'trajéramos',   'trajerais',   'trajeran']   },
    { inf: 'dar',      swe: 'ge',          forms: ['diera',     'dieras',     'diera',     'diéramos',     'dierais',     'dieran']     },
  ],

  // ═══ PERFEKT ═════════════════════════════════════════════════════════════════

  perfekt_indikativ_regular: [
    { inf: 'hablar',    swe: 'prata / tala',  forms: ['he hablado',    'has hablado',    'ha hablado',    'hemos hablado',    'habéis hablado',    'han hablado']    },
    { inf: 'escuchar',  swe: 'lyssna',        forms: ['he escuchado',  'has escuchado',  'ha escuchado',  'hemos escuchado',  'habéis escuchado',  'han escuchado']  },
    { inf: 'trabajar',  swe: 'arbeta',        forms: ['he trabajado',  'has trabajado',  'ha trabajado',  'hemos trabajado',  'habéis trabajado',  'han trabajado']  },
    { inf: 'comprar',   swe: 'köpa',          forms: ['he comprado',   'has comprado',   'ha comprado',   'hemos comprado',   'habéis comprado',   'han comprado']   },
    { inf: 'comer',     swe: 'äta',           forms: ['he comido',     'has comido',     'ha comido',     'hemos comido',     'habéis comido',     'han comido']     },
    { inf: 'beber',     swe: 'dricka',        forms: ['he bebido',     'has bebido',     'ha bebido',     'hemos bebido',     'habéis bebido',     'han bebido']     },
    { inf: 'vivir',     swe: 'bo / leva',     forms: ['he vivido',     'has vivido',     'ha vivido',     'hemos vivido',     'habéis vivido',     'han vivido']     },
    { inf: 'recibir',   swe: 'ta emot',       forms: ['he recibido',   'has recibido',   'ha recibido',   'hemos recibido',   'habéis recibido',   'han recibido']   },
  ],

  perfekt_indikativ_oregelbundna: [
    { inf: 'hacer',   swe: 'göra',              note: 'participio: hecho',    forms: ['he hecho',    'has hecho',    'ha hecho',    'hemos hecho',    'habéis hecho',    'han hecho']    },
    { inf: 'decir',   swe: 'säga',              note: 'participio: dicho',    forms: ['he dicho',    'has dicho',    'ha dicho',    'hemos dicho',    'habéis dicho',    'han dicho']    },
    { inf: 'ver',     swe: 'se',                note: 'participio: visto',    forms: ['he visto',    'has visto',    'ha visto',    'hemos visto',    'habéis visto',    'han visto']    },
    { inf: 'escribir',swe: 'skriva',            note: 'participio: escrito',  forms: ['he escrito',  'has escrito',  'ha escrito',  'hemos escrito',  'habéis escrito',  'han escrito']  },
    { inf: 'poner',   swe: 'lägga / ställa',   note: 'participio: puesto',   forms: ['he puesto',   'has puesto',   'ha puesto',   'hemos puesto',   'habéis puesto',   'han puesto']   },
    { inf: 'volver',  swe: 'återvända',         note: 'participio: vuelto',   forms: ['he vuelto',   'has vuelto',   'ha vuelto',   'hemos vuelto',   'habéis vuelto',   'han vuelto']   },
    { inf: 'abrir',   swe: 'öppna',             note: 'participio: abierto',  forms: ['he abierto',  'has abierto',  'ha abierto',  'hemos abierto',  'habéis abierto',  'han abierto']  },
    { inf: 'romper',  swe: 'bryta / slå sönder',note: 'participio: roto',     forms: ['he roto',     'has roto',     'ha roto',     'hemos roto',     'habéis roto',     'han roto']     },
    { inf: 'morir',   swe: 'dö',                note: 'participio: muerto',   forms: ['he muerto',   'has muerto',   'ha muerto',   'hemos muerto',   'habéis muerto',   'han muerto']   },
    { inf: 'ser',     swe: 'vara',              note: 'participio: sido',     forms: ['he sido',     'has sido',     'ha sido',     'hemos sido',     'habéis sido',     'han sido']     },
  ],

  // ═══ GERUNDIUM (estar-progressivo) ═══════════════════════════════════════════

  gerundium_indikativ_regular: [
    { inf: 'hablar',    swe: 'prata / tala',  forms: ['estoy hablando',    'estás hablando',    'está hablando',    'estamos hablando',    'estáis hablando',    'están hablando']    },
    { inf: 'escuchar',  swe: 'lyssna',        forms: ['estoy escuchando',  'estás escuchando',  'está escuchando',  'estamos escuchando',  'estáis escuchando',  'están escuchando']  },
    { inf: 'trabajar',  swe: 'arbeta',        forms: ['estoy trabajando',  'estás trabajando',  'está trabajando',  'estamos trabajando',  'estáis trabajando',  'están trabajando']  },
    { inf: 'mirar',     swe: 'titta',         forms: ['estoy mirando',     'estás mirando',     'está mirando',     'estamos mirando',     'estáis mirando',     'están mirando']     },
    { inf: 'comer',     swe: 'äta',           forms: ['estoy comiendo',    'estás comiendo',    'está comiendo',    'estamos comiendo',    'estáis comiendo',    'están comiendo']    },
    { inf: 'beber',     swe: 'dricka',        forms: ['estoy bebiendo',    'estás bebiendo',    'está bebiendo',    'estamos bebiendo',    'estáis bebiendo',    'están bebiendo']    },
    { inf: 'vivir',     swe: 'bo / leva',     forms: ['estoy viviendo',    'estás viviendo',    'está viviendo',    'estamos viviendo',    'estáis viviendo',    'están viviendo']    },
    { inf: 'escribir',  swe: 'skriva',        forms: ['estoy escribiendo',  'estás escribiendo', 'está escribiendo', 'estamos escribiendo', 'estáis escribiendo', 'están escribiendo'] },
    { inf: 'caminar',   swe: 'gå / vandra',   forms: ['estoy caminando',   'estás caminando',   'está caminando',   'estamos caminando',   'estáis caminando',   'están caminando']   },
  ],

  gerundium_indikativ_oregelbundna: [
    { inf: 'leer',    swe: 'läsa',              note: 'gerundio: leyendo',    forms: ['estoy leyendo',   'estás leyendo',   'está leyendo',   'estamos leyendo',   'estáis leyendo',   'están leyendo']   },
    { inf: 'dormir',  swe: 'sova',              note: 'gerundio: durmiendo',  forms: ['estoy durmiendo', 'estás durmiendo', 'está durmiendo', 'estamos durmiendo', 'estáis durmiendo', 'están durmiendo'] },
    { inf: 'pedir',   swe: 'be om / beställa', note: 'gerundio: pidiendo',   forms: ['estoy pidiendo',  'estás pidiendo',  'está pidiendo',  'estamos pidiendo',  'estáis pidiendo',  'están pidiendo']  },
    { inf: 'seguir',  swe: 'följa',             note: 'gerundio: siguiendo',  forms: ['estoy siguiendo', 'estás siguiendo', 'está siguiendo', 'estamos siguiendo', 'estáis siguiendo', 'están siguiendo'] },
    { inf: 'venir',   swe: 'komma',             note: 'gerundio: viniendo',   forms: ['estoy viniendo',  'estás viniendo',  'está viniendo',  'estamos viniendo',  'estáis viniendo',  'están viniendo']  },
    { inf: 'ir',      swe: 'gå / åka',          note: 'gerundio: yendo',      forms: ['estoy yendo',     'estás yendo',     'está yendo',     'estamos yendo',     'estáis yendo',     'están yendo']     },
    { inf: 'decir',   swe: 'säga',              note: 'gerundio: diciendo',   forms: ['estoy diciendo',  'estás diciendo',  'está diciendo',  'estamos diciendo',  'estáis diciendo',  'están diciendo']  },
    { inf: 'poder',   swe: 'kunna',             note: 'gerundio: pudiendo',   forms: ['estoy pudiendo',  'estás pudiendo',  'está pudiendo',  'estamos pudiendo',  'estáis pudiendo',  'están pudiendo']  },
    { inf: 'servir',  swe: 'servera',           note: 'gerundio: sirviendo',  forms: ['estoy sirviendo', 'estás sirviendo', 'está sirviendo', 'estamos sirviendo', 'estáis sirviendo', 'están sirviendo'] },
    { inf: 'traer',   swe: 'ta med',            note: 'gerundio: trayendo',   forms: ['estoy trayendo',  'estás trayendo',  'está trayendo',  'estamos trayendo',  'estáis trayendo',  'están trayendo']  },
  ],
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const norm = s =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function Verbdrillen() {
  const [tempus,  setTempus]  = useState(null);
  const [modus,   setModus]   = useState(null);
  const [typ,     setTyp]     = useState(null);
  const [verb,    setVerb]    = useState(null);
  const [answers, setAnswers] = useState(['', '', '', '', '', '']);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState([null, null, null, null, null, null]);
  const [usedIdx, setUsedIdx] = useState(new Set());
  const [shake,   setShake]   = useState(false);

  const inputRefs    = useRef([]);
  const focusedIdxRef = useRef(null);

  // ── Derived ────────────────────────────────────────────────────────────────

  const dataKey   = tempus && modus && typ ? `${tempus}_${modus}_${typ}` : null;
  const verbList  = dataKey ? (VERB_DATA[dataKey] || []) : [];
  const pronouns  = modus === 'imperativ' ? PRONOUNS_IMPERATIV : PRONOUNS_DEFAULT;
  const canStart  = verbList.length > 0;
  const isImperativ = modus === 'imperativ';

  const availableModus = tempus
    ? MODUS_OPTIONS.filter(m => (VALID_COMBOS[tempus]?.[m.id] || []).length > 0)
    : [];

  const availableTyp = tempus && modus
    ? (VALID_COMBOS[tempus]?.[modus] || [])
    : [];

  // Score (imperativ: yo doesn't count)
  const fillableCount = isImperativ ? 5 : 6;
  const correctCount  = results.filter((r, i) => !(isImperativ && i === 0) && r === true).length;
  const allCorrect    = checked && correctCount === fillableCount;

  // ── Selection handlers ─────────────────────────────────────────────────────

  const reset = useCallback(() => {
    setVerb(null);
    setAnswers(['', '', '', '', '', '']);
    setChecked(false);
    setResults([null, null, null, null, null, null]);
    setUsedIdx(new Set());
  }, []);

  const handleTempus = id => { setTempus(id); setModus(null); setTyp(null); reset(); };
  const handleModus  = id => { setModus(id);  setTyp(null);              reset(); };
  const handleTyp    = id => { setTyp(id);                               reset(); };

  // ── Verb picking ───────────────────────────────────────────────────────────

  const pickNext = useCallback((list, used) => {
    const available = list.map((_, i) => i).filter(i => !used.has(i));
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
  }, []);

  const startDrill = useCallback(() => {
    const idx = pickNext(verbList, new Set());
    if (idx === null) return;
    setVerb({ ...verbList[idx], _idx: idx });
    setUsedIdx(new Set([idx]));
    setAnswers(['', '', '', '', '', '']);
    setChecked(false);
    setResults([null, null, null, null, null, null]);
    setTimeout(() => {
      const firstInput = isImperativ ? 1 : 0;
      inputRefs.current[firstInput]?.focus();
    }, 80);
  }, [verbList, pickNext, isImperativ]);

  const nextVerb = useCallback(() => {
    let newUsed = new Set(usedIdx);
    if (newUsed.size >= verbList.length) newUsed = new Set();
    const idx = pickNext(verbList, newUsed);
    if (idx === null) return;
    newUsed.add(idx);
    setVerb({ ...verbList[idx], _idx: idx });
    setUsedIdx(newUsed);
    setAnswers(['', '', '', '', '', '']);
    setChecked(false);
    setResults([null, null, null, null, null, null]);
    setTimeout(() => {
      const firstInput = isImperativ ? 1 : 0;
      inputRefs.current[firstInput]?.focus();
    }, 80);
  }, [verbList, usedIdx, pickNext, isImperativ]);

  const retryVerb = useCallback(() => {
    setAnswers(['', '', '', '', '', '']);
    setChecked(false);
    setResults([null, null, null, null, null, null]);
    setTimeout(() => {
      const firstInput = isImperativ ? 1 : 0;
      inputRefs.current[firstInput]?.focus();
    }, 80);
  }, [isImperativ]);

  // ── Check ──────────────────────────────────────────────────────────────────

  const checkAnswers = useCallback(() => {
    if (!verb || checked) return;
    const newResults = verb.forms.map((correct, i) => {
      if (isImperativ && i === 0) return true;
      return norm(answers[i]) === norm(correct);
    });
    setResults(newResults);
    setChecked(true);
    if (newResults.some((r, i) => !(isImperativ && i === 0) && !r)) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [verb, answers, checked, isImperativ]);

  // ── Input handling ─────────────────────────────────────────────────────────

  const handleAnswer = (i, val) => {
    const a = [...answers]; a[i] = val; setAnswers(a);
  };

  const handleKeyDown = (e, i) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    // Find next unfilled (non-imperativ-yo) input
    const next = answers.findIndex((a, idx) => idx > i && !(isImperativ && idx === 0) && a === '' && !checked);
    if (next !== -1) {
      inputRefs.current[next]?.focus();
    } else {
      checkAnswers();
    }
  };

  const insertAccent = char => {
    const i = focusedIdxRef.current;
    if (i === null || i === undefined) return;
    const el = inputRefs.current[i];
    if (!el) return;
    const s = el.selectionStart, end = el.selectionEnd;
    const a = [...answers];
    a[i] = a[i].slice(0, s) + char + a[i].slice(end);
    setAnswers(a);
    setTimeout(() => { el.focus(); el.setSelectionRange(s + 1, s + 1); }, 0);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  const verbsDone  = usedIdx.size;
  const verbsTotal = verbList.length;

  return (
    <Layout title="Verbdrillen" description="Öva på att böja spanska verb">
      <div className={styles.page}>

        {/* ── HEADER ── */}
        <div className={styles.header}>
          <div className={styles.headerInner}>
            <span className={styles.eyebrow}>Övningar</span>
            <h1 className={styles.title}>Verbdrillen</h1>
            <p className={styles.desc}>Välj tempus, modus och verbtyp — fyll sedan i den tomma konjugationstabellen.</p>
          </div>
        </div>

        <div className={styles.main}>

          {/* ── FILTERS ── */}
          <div className={styles.filters}>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Tempus</span>
              <div className={styles.filterBtns}>
                {TEMPUS_OPTIONS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => handleTempus(t.id)}
                    className={`${styles.filterBtn} ${tempus === t.id ? styles.filterBtnActive : ''}`}
                  >{t.label}</button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Modus</span>
              <div className={styles.filterBtns}>
                {MODUS_OPTIONS.map(m => {
                  const ok = availableModus.some(o => o.id === m.id);
                  return (
                    <button
                      key={m.id}
                      onClick={() => ok && handleModus(m.id)}
                      disabled={!ok}
                      className={`${styles.filterBtn} ${modus === m.id ? styles.filterBtnActive : ''} ${!ok ? styles.filterBtnDisabled : ''}`}
                    >{m.label}</button>
                  );
                })}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Verbtyp</span>
              <div className={styles.filterBtns}>
                {TYP_OPTIONS.map(t => {
                  const ok = availableTyp.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => ok && handleTyp(t.id)}
                      disabled={!ok}
                      className={`${styles.filterBtn} ${typ === t.id ? styles.filterBtnActive : ''} ${!ok ? styles.filterBtnDisabled : ''}`}
                    >{t.label}</button>
                  );
                })}
              </div>
            </div>

          </div>

          <div className={styles.rule} />

          {/* ── DRILL AREA ── */}
          <div className={styles.drillArea}>

            {/* Empty state */}
            {!typ && (
              <div className={styles.emptyState}>
                <div className={styles.emptyGlyph}>∅</div>
                <p className={styles.emptyText}>Välj tempus, modus och verbtyp ovan för att börja.</p>
              </div>
            )}

            {/* Start box */}
            {typ && !verb && canStart && (
              <div className={styles.startBox}>
                <div className={styles.startMeta}>
                  <span className={styles.startChip}>{TEMPUS_OPTIONS.find(t => t.id === tempus)?.label}</span>
                  <span className={styles.startChip}>{MODUS_OPTIONS.find(m => m.id === modus)?.label}</span>
                  <span className={styles.startChip}>{TYP_OPTIONS.find(t => t.id === typ)?.label}</span>
                </div>
                <p className={styles.startCount}>{verbsTotal} verb i den här kategorin</p>
                <button className={styles.primaryBtn} onClick={startDrill}>Börja öva →</button>
              </div>
            )}

            {/* Active drill */}
            {verb && (
              <div className={styles.drillWrap}>

                {/* Progress + verb info */}
                <div className={styles.verbHeader}>
                  <div className={styles.verbLeft}>
                    <p className={styles.verbInf}>
                      {verb.inf}
                      {verb.note && <span className={styles.verbNote}> {verb.note}</span>}
                    </p>
                    <p className={styles.verbSwe}>{verb.swe}</p>
                  </div>
                  <div className={styles.verbRight}>
                    <span className={styles.verbProgress}>{verbsDone} / {verbsTotal}</span>
                    {!checked && (
                      <button className={styles.skipBtn} onClick={nextVerb}>hoppa över</button>
                    )}
                  </div>
                </div>

                {/* Conjugation table — centred, full focus */}
                <div className={`${styles.tableWrap} ${shake ? styles.shake : ''}`}>
                  <table className={styles.conjTable}>
                    <tbody>
                      {pronouns.map((pron, i) => {
                        const isYo    = isImperativ && i === 0;
                        const isOk    = results[i] === true  && !(isImperativ && i === 0);
                        const isErr   = results[i] === false;
                        return (
                          <tr key={i} className={isYo ? styles.imperativYo : ''}>
                            <td className={styles.pronCell}>{pron}</td>
                            <td className={styles.inputCell}>
                              {isYo ? (
                                <span className={styles.noForm}>—</span>
                              ) : (
                                <div className={styles.inputWrap}>
                                  <input
                                    ref={el => inputRefs.current[i] = el}
                                    className={`${styles.inputField} ${isOk ? styles.inputOk : ''} ${isErr ? styles.inputErr : ''}`}
                                    type="text"
                                    value={answers[i]}
                                    onChange={e => handleAnswer(i, e.target.value)}
                                    onKeyDown={e => handleKeyDown(e, i)}
                                    onFocus={() => { focusedIdxRef.current = i; }}
                                    disabled={checked}
                                    placeholder="..."
                                    autoComplete="off"
                                    spellCheck={false}
                                  />
                                  {checked && isErr && (
                                    <span className={styles.correctAnswer}>{verb.forms[i]}</span>
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Accent buttons */}
                {!checked && (
                  <div className={styles.accentRow}>
                    <span className={styles.accentLabel}>Accentknappar</span>
                    {ACCENT_CHARS.map(c => (
                      <button
                        key={c}
                        className={styles.accentBtn}
                        onMouseDown={e => { e.preventDefault(); insertAccent(c); }}
                        tabIndex={-1}
                      >{c}</button>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className={styles.actions}>
                  {!checked ? (
                    <button className={styles.primaryBtn} onClick={checkAnswers}>Kontrollera</button>
                  ) : (
                    <div className={styles.resultRow}>
                      <div className={styles.scorePart}>
                        {allCorrect ? (
                          <span className={styles.scoreAll}>Perfekt! 🎉</span>
                        ) : (
                          <span className={styles.score}>{correctCount} / {fillableCount} rätt</span>
                        )}
                        <div className={styles.dots}>
                          {results.map((r, i) => {
                            if (isImperativ && i === 0) return null;
                            return <span key={i} className={r ? styles.dotOk : styles.dotErr} />;
                          })}
                        </div>
                      </div>
                      <div className={styles.btnGroup}>
                        {!allCorrect && (
                          <button className={styles.ghostBtn} onClick={retryVerb}>Prova igen</button>
                        )}
                        <button className={styles.primaryBtn} onClick={nextVerb}>Nästa verb →</button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
