import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataSource = readFileSync(join(root, 'data/verbs.ts'), 'utf8');
const preteriteSource = readFileSync(
  join(root, 'content/docs/Verb/Tempus/Preteritum.mdx'),
  'utf8',
);
const irregularSource = readFileSync(
  join(root, 'content/docs/Verb/Oregelbundna verb.mdx'),
  'utf8',
);

const errors = [];
let checkedParadigms = 0;

function fail(message) {
  errors.push(message);
}

function sameForms(label, actual, expected) {
  checkedParadigms += 1;
  if (actual.length !== 6) {
    fail(`${label}: förväntade 6 former, hittade ${actual.length}`);
    return;
  }
  expected.forEach((form, index) => {
    if (actual[index] !== form) {
      const persons = ['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos'];
      fail(`${label}, ${persons[index]}: "${actual[index]}" ska vara "${form}"`);
    }
  });
}

function parseVerbData(source) {
  const categories = new Map();
  const categoryPattern = /^  ([a-z0-9_]+): \[\n([\s\S]*?)^  \],/gm;

  for (const categoryMatch of source.matchAll(categoryPattern)) {
    const entries = [];
    const entryPattern = /\{[\s\S]*?inf:\s*'([^']+)'[\s\S]*?forms:\s*\[([^\]]+)\][\s\S]*?\}/g;
    for (const entryMatch of categoryMatch[2].matchAll(entryPattern)) {
      const forms = [...entryMatch[2].matchAll(/'([^']*)'/g)].map((match) => match[1]);
      entries.push({ inf: entryMatch[1], forms });
    }
    categories.set(categoryMatch[1], entries);
  }

  return categories;
}

const categories = parseVerbData(dataSource);

function entryFor(category, infinitive) {
  const aliases = infinitive === 'ser' || infinitive === 'ir'
    ? [infinitive, 'ser / ir']
    : [infinitive];
  return (categories.get(category) ?? []).find((entry) => aliases.includes(entry.inf));
}

for (const [category, entries] of categories) {
  for (const entry of entries) {
    if (entry.forms.length !== 6) {
      fail(`${category}/${entry.inf}: har ${entry.forms.length} former i stället för 6`);
    }
  }
}

function regularStem(infinitive) {
  return infinitive.slice(0, -2);
}

function regularForms(infinitive, endings, useInfinitive = false) {
  const base = useInfinitive ? infinitive : regularStem(infinitive);
  return endings.map((ending) => `${base}${ending}`);
}

function auditGenerated(category, generator) {
  const entries = categories.get(category) ?? [];
  if (entries.length === 0) fail(`${category}: kategorin saknas eller är tom`);
  for (const entry of entries) {
    sameForms(`${category}/${entry.inf}`, entry.forms, generator(entry.inf));
  }
}

auditGenerated('presens_indikativ_regular', (inf) => {
  const ending = inf.slice(-2);
  const endings = ending === 'ar'
    ? ['o', 'as', 'a', 'amos', 'áis', 'an']
    : ending === 'er'
      ? ['o', 'es', 'e', 'emos', 'éis', 'en']
      : ['o', 'es', 'e', 'imos', 'ís', 'en'];
  return regularForms(inf, endings);
});

auditGenerated('presens_konjunktiv_regular', (inf) => regularForms(
  inf,
  inf.endsWith('ar')
    ? ['e', 'es', 'e', 'emos', 'éis', 'en']
    : ['a', 'as', 'a', 'amos', 'áis', 'an'],
));

auditGenerated('presens_imperativ_regular', (inf) => {
  const stem = regularStem(inf);
  const ar = inf.endsWith('ar');
  const er = inf.endsWith('er');
  return [
    '—',
    `${stem}${ar ? 'a' : 'e'}`,
    `${stem}${ar ? 'e' : 'a'}`,
    `${stem}${ar ? 'emos' : 'amos'}`,
    `${stem}${ar ? 'ad' : er ? 'ed' : 'id'}`,
    `${stem}${ar ? 'en' : 'an'}`,
  ];
});

auditGenerated('preteritum_indikativ_regular', (inf) => {
  const stem = regularStem(inf);
  const ar = inf.endsWith('ar');
  const forms = regularForms(
    inf,
    ar
      ? ['é', 'aste', 'ó', 'amos', 'asteis', 'aron']
      : ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
  );
  if (ar && inf.endsWith('car')) forms[0] = `${stem.slice(0, -1)}qué`;
  if (ar && inf.endsWith('gar')) forms[0] = `${stem.slice(0, -1)}gué`;
  if (ar && inf.endsWith('zar')) forms[0] = `${stem.slice(0, -1)}cé`;
  return forms;
});

auditGenerated('imperfekt_indikativ_regular', (inf) => regularForms(
  inf,
  inf.endsWith('ar')
    ? ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban']
    : ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
));

auditGenerated('imperfekt_konjunktiv_regular', (inf) => regularForms(
  inf,
  inf.endsWith('ar')
    ? ['ara', 'aras', 'ara', 'áramos', 'arais', 'aran']
    : ['iera', 'ieras', 'iera', 'iéramos', 'ierais', 'ieran'],
));

auditGenerated('perfekt_indikativ_regular', (inf) => {
  const participle = `${regularStem(inf)}${inf.endsWith('ar') ? 'ado' : 'ido'}`;
  return ['he', 'has', 'ha', 'hemos', 'habéis', 'han'].map((aux) => `${aux} ${participle}`);
});

auditGenerated('gerundium_indikativ_regular', (inf) => {
  const gerund = `${regularStem(inf)}${inf.endsWith('ar') ? 'ando' : 'iendo'}`;
  return ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'].map((aux) => `${aux} ${gerund}`);
});

auditGenerated('futurum_indikativ_regular', (inf) =>
  ['voy', 'vas', 'va', 'vamos', 'vais', 'van'].map((aux) => `${aux} a ${inf}`));

auditGenerated('futurum2_indikativ_regular', (inf) =>
  regularForms(inf, ['é', 'ás', 'á', 'emos', 'éis', 'án'], true));

auditGenerated('konditionalis_indikativ_regular', (inf) =>
  regularForms(inf, ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'], true));

const exactCategories = {
  preteritum_indikativ_oregelbundna: {
    'ser / ir': ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
    tener: ['tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis', 'tuvieron'],
    estar: ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron'],
    hacer: ['hice', 'hiciste', 'hizo', 'hicimos', 'hicisteis', 'hicieron'],
    poder: ['pude', 'pudiste', 'pudo', 'pudimos', 'pudisteis', 'pudieron'],
    venir: ['vine', 'viniste', 'vino', 'vinimos', 'vinisteis', 'vinieron'],
    querer: ['quise', 'quisiste', 'quiso', 'quisimos', 'quisisteis', 'quisieron'],
    saber: ['supe', 'supiste', 'supo', 'supimos', 'supisteis', 'supieron'],
    decir: ['dije', 'dijiste', 'dijo', 'dijimos', 'dijisteis', 'dijeron'],
    poner: ['puse', 'pusiste', 'puso', 'pusimos', 'pusisteis', 'pusieron'],
    traer: ['traje', 'trajiste', 'trajo', 'trajimos', 'trajisteis', 'trajeron'],
    dar: ['di', 'diste', 'dio', 'dimos', 'disteis', 'dieron'],
    ver: ['vi', 'viste', 'vio', 'vimos', 'visteis', 'vieron'],
    andar: ['anduve', 'anduviste', 'anduvo', 'anduvimos', 'anduvisteis', 'anduvieron'],
  },
  imperfekt_indikativ_oregelbundna: {
    ser: ['era', 'eras', 'era', 'éramos', 'erais', 'eran'],
    ir: ['iba', 'ibas', 'iba', 'íbamos', 'ibais', 'iban'],
    ver: ['veía', 'veías', 'veía', 'veíamos', 'veíais', 'veían'],
  },
};

for (const [category, expectedEntries] of Object.entries(exactCategories)) {
  const actualEntries = categories.get(category) ?? [];
  for (const [inf, expected] of Object.entries(expectedEntries)) {
    const entry = actualEntries.find((candidate) => candidate.inf === inf);
    if (!entry) fail(`${category}/${inf}: saknas`);
    else sameForms(`${category}/${inf}`, entry.forms, expected);
  }
}

function stripMarkup(value) {
  return value
    .replace(/<br\s*\/>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/[\*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function tableRows(source) {
  return [...source.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((rowMatch) =>
    [...rowMatch[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((cell) => stripMarkup(cell[1])));
}

const stemSection = preteriteSource.slice(
  preteriteSource.indexOf('### <Highlight>Vokalskiftande verb</Highlight>'),
  preteriteSource.indexOf('### <Highlight>Verb som slutar på -zar'),
);
const stemRows = tableRows(stemSection);
const stemFormsInSourceOrder = stemRows.flat().filter((cell) =>
  ['pedí', 'pedimos', 'pediste', 'pedisteis', 'pidió', 'pidieron'].includes(cell));
const expectedStemOrder = ['pedí', 'pedimos', 'pediste', 'pedisteis', 'pidió', 'pidieron'];
if (JSON.stringify(stemFormsInSourceOrder) !== JSON.stringify(expectedStemOrder)) {
  fail(`Preteritum/Vokalskiftande verb: ${stemFormsInSourceOrder.join(', ')} ska vara ${expectedStemOrder.join(', ')}`);
}
checkedParadigms += 1;

if (!stemSection.includes('**tredje person singular och plural**')) {
  fail('Preteritum/Vokalskiftande verb: regeln måste ange tredje person singular och plural');
}
if (!stemSection.includes('- **e** ➡️ **i**') || !stemSection.includes('- **o** ➡️ **u**')) {
  fail('Preteritum/Vokalskiftande verb: både e→i och o→u måste anges');
}

const summarySection = preteriteSource.slice(preteriteSource.indexOf('### <Highlight>Oregelbundna verb</Highlight>'));
const summaryRows = tableRows(summarySection);
const expectedSummary = {
  Yo: ['dije', 'hice', 'fui', 'estuve', 'puse', 'tuve', 'vi', 'di', 'vine', 'supe', 'hube', 'oí', 'conduje', 'traje', 'cupe', 'caí'],
  Tú: ['dijiste', 'hiciste', 'fuiste', 'estuviste', 'pusiste', 'tuviste', 'viste', 'diste', 'viniste', 'supiste', 'hubiste', 'oíste', 'condujiste', 'trajiste', 'cupiste', 'caíste'],
  'Él, ella': ['dijo', 'hizo', 'fue', 'estuvo', 'puso', 'tuvo', 'vio', 'dio', 'vino', 'supo', 'hubo', 'oyó', 'condujo', 'trajo', 'cupo', 'cayó'],
  Nosotros: ['dijimos', 'hicimos', 'fuimos', 'estuvimos', 'pusimos', 'tuvimos', 'vimos', 'dimos', 'vinimos', 'supimos', 'hubimos', 'oímos', 'condujimos', 'trajimos', 'cupimos', 'caímos'],
  Vosotros: ['dijisteis', 'hicisteis', 'fuisteis', 'estuvisteis', 'pusisteis', 'tuvisteis', 'visteis', 'disteis', 'vinisteis', 'supisteis', 'hubisteis', 'oísteis', 'condujisteis', 'trajisteis', 'cupisteis', 'caísteis'],
  Ellos: ['dijeron', 'hicieron', 'fueron', 'estuvieron', 'pusieron', 'tuvieron', 'vieron', 'dieron', 'vinieron', 'supieron', 'hubieron', 'oyeron', 'condujeron', 'trajeron', 'cupieron', 'cayeron'],
};

for (const [person, expected] of Object.entries(expectedSummary)) {
  const row = summaryRows.find((cells) => cells[0] === person);
  if (!row) {
    fail(`Preteritum/Oregelbundna verb: raden ${person} saknas`);
    continue;
  }
  const actual = row.slice(1);
  checkedParadigms += 1;
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    fail(`Preteritum/Oregelbundna verb, ${person}: ${actual.join(', ')} ska vara ${expected.join(', ')}`);
  }
}

const individualPreterite = {
  Ser: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
  Estar: ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron'],
  Decir: ['dije', 'dijiste', 'dijo', 'dijimos', 'dijisteis', 'dijeron'],
  Ir: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
  Hacer: ['hice', 'hiciste', 'hizo', 'hicimos', 'hicisteis', 'hicieron'],
  Venir: ['vine', 'viniste', 'vino', 'vinimos', 'vinisteis', 'vinieron'],
  Haber: ['hube', 'hubiste', 'hubo', 'hubimos', 'hubisteis', 'hubieron'],
};

for (const [verb, expected] of Object.entries(individualPreterite)) {
  const verbStart = irregularSource.indexOf(`## ${verb}\n`);
  const nextVerb = irregularSource.indexOf('\n## ', verbStart + 4);
  const verbSection = irregularSource.slice(verbStart, nextVerb === -1 ? undefined : nextVerb);
  const tenseStart = verbSection.indexOf('#### <Highlight>Preteritum</Highlight>');
  const nextTense = verbSection.indexOf('\n#### ', tenseStart + 5);
  const tenseSection = verbSection.slice(tenseStart, nextTense === -1 ? undefined : nextTense);
  const rows = tableRows(tenseSection);
  const sourceOrder = rows.flat().filter((cell) => expected.includes(cell));
  const actual = [sourceOrder[0], sourceOrder[2], sourceOrder[4], sourceOrder[1], sourceOrder[3], sourceOrder[5]];
  sameForms(`Oregelbundna verb/${verb}/Preteritum`, actual, expected);
}

const individualTableCategories = {
  Presens: 'presens_indikativ_oregelbundna',
  Preteritum: 'preteritum_indikativ_oregelbundna',
  Imperfekt: 'imperfekt_indikativ_oregelbundna',
  'Konjunktiv presens': 'presens_konjunktiv_oregelbundna',
  'Konjunktiv imperfekt': 'imperfekt_konjunktiv_oregelbundna',
  'Futurum II': 'futurum2_indikativ_oregelbundna',
  Konditionalis: 'konditionalis_indikativ_oregelbundna',
};

for (const verb of Object.keys(individualPreterite)) {
  const verbStart = irregularSource.indexOf(`## ${verb}\n`);
  const nextVerb = irregularSource.indexOf('\n## ', verbStart + 4);
  const verbSection = irregularSource.slice(verbStart, nextVerb === -1 ? undefined : nextVerb);

  for (const [heading, category] of Object.entries(individualTableCategories)) {
    const expectedEntry = entryFor(category, verb.toLowerCase());
    if (!expectedEntry) continue;

    const tenseStart = verbSection.indexOf(`#### <Highlight>${heading}</Highlight>`);
    if (tenseStart === -1) continue;
    const nextTense = verbSection.indexOf('\n#### ', tenseStart + 5);
    const tenseSection = verbSection.slice(tenseStart, nextTense === -1 ? undefined : nextTense);
    const sourceOrder = tableRows(tenseSection)
      .flat()
      .filter((cell) => expectedEntry.forms.includes(cell));
    const actual = [sourceOrder[0], sourceOrder[2], sourceOrder[4], sourceOrder[1], sourceOrder[3], sourceOrder[5]];
    sameForms(`Oregelbundna verb/${verb}/${heading}`, actual, expectedEntry.forms);
  }
}

function visibleSource(source) {
  return stripMarkup(source).normalize('NFC');
}

function containsForm(source, form) {
  const escaped = form.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?<![\\p{L}])${escaped}(?![\\p{L}])`, 'u').test(source);
}

const contentCategoryMap = {
  'content/docs/Verb/Tempus/Presens.mdx': [
    'presens_indikativ_regular',
    'presens_indikativ_reflexiva',
    'presens_indikativ_diftongerande',
    'presens_indikativ_vokalskiftande',
    'presens_indikativ_oregelbundna',
  ],
  'content/docs/Verb/Tempus/Preteritum.mdx': [
    'preteritum_indikativ_regular',
    'preteritum_indikativ_oregelbundna',
  ],
  'content/docs/Verb/Tempus/Imperfekt.mdx': [
    'imperfekt_indikativ_regular',
    'imperfekt_indikativ_oregelbundna',
  ],
  'content/docs/Verb/Tempus/Perfekt.mdx': [
    'perfekt_indikativ_regular',
    'perfekt_indikativ_oregelbundna',
  ],
  'content/docs/Verb/Tempus/Gerundium.mdx': [
    'gerundium_indikativ_regular',
    'gerundium_indikativ_oregelbundna',
  ],
  'content/docs/Verb/Tempus/Futurum.mdx': ['futurum_indikativ_regular'],
  'content/docs/Verb/Tempus/Futurum II.mdx': [
    'futurum2_indikativ_regular',
    'futurum2_indikativ_oregelbundna',
  ],
  'content/docs/Verb/Tempus/Konditionalis.mdx': [
    'konditionalis_indikativ_regular',
    'konditionalis_indikativ_oregelbundna',
  ],
  'content/docs/Verb/Imperativ.mdx': [
    'presens_imperativ_regular',
    'presens_imperativ_oregelbundna',
  ],
  'content/docs/Verb/Konjunktiv.mdx': [
    'presens_konjunktiv_regular',
    'presens_konjunktiv_oregelbundna',
    'imperfekt_konjunktiv_regular',
    'imperfekt_konjunktiv_oregelbundna',
  ],
};

for (const [relativePath, categoryNames] of Object.entries(contentCategoryMap)) {
  const rawSource = readFileSync(join(root, relativePath), 'utf8');
  const source = visibleSource(rawSource);
  for (const category of categoryNames) {
    for (const entry of categories.get(category) ?? []) {
      const uniqueForms = [...new Set(entry.forms)];
      const presentForms = uniqueForms.filter((form) => containsForm(source, form));
      if (presentForms.length >= 3 && presentForms.length !== uniqueForms.length) {
        const missing = uniqueForms.filter((form) => !presentForms.includes(form));
        fail(`${relativePath}/${entry.inf}: ofullständig böjningsserie, saknar ${missing.join(', ')}`);
      }
    }
  }

  for (const tableMatch of rawSource.matchAll(/<table>[\s\S]*?<thead>([\s\S]*?)<\/thead>[\s\S]*?<tbody>([\s\S]*?)<\/tbody>[\s\S]*?<\/table>/g)) {
    const header = tableRows(tableMatch[1])[0] ?? [];
    if (header[0]?.toLowerCase() !== 'person') continue;

    const rows = tableRows(tableMatch[2]);
    const personIndexes = new Map([
      ['Yo', 0],
      ['Tú', 1],
      ['Él, ella', 2],
      ['Nosotros', 3],
      ['Vosotros', 4],
      ['Ellos', 5],
    ]);

    for (let column = 1; column < header.length; column += 1) {
      const heading = header[column].toLowerCase().replace('&', '/').replace(/\s+/g, ' ').trim();
      const candidates = categoryNames
        .flatMap((category) => categories.get(category) ?? [])
        .filter((entry) => entry.inf === heading);
      if (candidates.length === 0) continue;

      const scoredCandidates = candidates.map((entry) => ({
        entry,
        score: rows.reduce((score, row) => {
          const personIndex = personIndexes.get(row[0]);
          return score + (personIndex !== undefined && row[column] === entry.forms[personIndex] ? 1 : 0);
        }, 0),
      })).sort((left, right) => right.score - left.score);
      const { entry: expectedEntry, score } = scoredCandidates[0];
      if (score < 3) continue;

      for (const row of rows) {
        const personIndex = personIndexes.get(row[0]);
        if (personIndex === undefined || row[column] === undefined) continue;
        checkedParadigms += 1;
        if (row[column] !== expectedEntry.forms[personIndex]) {
          fail(`${relativePath}/${header[column]}/${row[0]}: "${row[column]}" ska vara "${expectedEntry.forms[personIndex]}"`);
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`Verbkontrollen hittade ${errors.length} fel:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const entryCount = [...categories.values()].reduce((sum, entries) => sum + entries.length, 0);
console.log(`Verbkontrollen godkände ${entryCount} drillposter och ${checkedParadigms} fullständiga böjningsserier.`);
