# Om Spanska

En gratis digital spansk grammatika för svenska elever. Byggd med Next.js
(App Router, TypeScript, CSS-moduler) och driftad på Netlify.

## Kom igång

```bash
npm install
npm run dev        # http://localhost:3000
```

`npm run dev` bygger inte om sökindexet. Kör `npm run search-index` när du
lagt till eller döpt om innehåll och vill se det i sökrutan lokalt.
Vid `npm run build` byggs indexet automatiskt via `prebuild`.

## Struktur

```
app/                 Rutter (App Router)
  docs/[...slug]/    Grammatiksidorna
  blog/[slug]/       Bloggposterna
  globals.css        Designsystemets tokens och alla globala klasser
components/
  mdx/               Komponenter som innehållet får använda
  drills/            Verbdrillen och Glosdrillen
content/
  docs/              Grammatiksidor i MDX
  blog/              Bloggposter i MDX
data/                Typad glos- och verbdata
lib/content.ts       Läser innehållet: sidomeny, slugs, rubriker, grannar
scripts/             Sökindex + engångsmigreringen från Docusaurus
public/              Ljud, bilder, ads.txt, formulärdefinition
```

## Skriva innehåll

En grammatiksida är en `.mdx`-fil under `content/docs/<Kategori>/`. Frontmatter:

```yaml
---
sidebar_position: 3
slug: /verb/tempus/futurum
title: 'Futurum'
description: 'Visas i sökresultat och som ingress. Håll den under ~160 tecken.'
---
```

Kategorins namn och ordning styrs av `_category_.json` i mappen.

Komponenter som innehållet kan använda utan att importera något:
`<Highlight>`, `<Admonition type="info|tip|note|caution|danger" title="…">`,
`<Tabs>` med `<TabItem value label>`, `<BrowserWindow title>`, och de fyra
`<KonjunktivAR />`-tabellerna.

Klasser för de pedagogiska färgmarkörerna: `g-subjekt`, `g-verb`, `g-objekt`,
`g-bindeord`, `g-konjunktiv`. Övriga innehållsklasser (`custom-quote`,
`bokstavsbox`, `IPA`, `subject-box`, `regelruta`, `tablepronomina`,
`my-special-links`) finns i `app/globals.css`.

MDX tolkar inte `**fet**` när texten står i samma stycke som en JSX-tagg.
Använd `<strong>` och `<em>` inuti tabeller och `<div>`-block.

## Drift

Netlify bygger med `@netlify/plugin-nextjs`. `netlify.toml` innehåller
301-omdirigeringar från de gamla Docusaurus-URL:erna.

Kontaktformuläret postar till `public/__forms.html`, som är den definition
Netlify Forms läser av vid bygget. Ändrar du fälten i `components/ContactForm.tsx`
måste samma fältnamn finnas i `__forms.html`.

## Interaktiva grammatikgenomgångar

MDX kan använda `LessonIntro` (mål och förkunskaper), `RelatedLessons`
(relaterade länkar), `MeaningSwitch` (jämför betydelser), `SentenceSteps`
(stegvis förklaring med valfria etiketter) och `SentenceTransform`
(meningsomvandling med återkoppling per alternativ). Se de nya sidorna
Preteritum eller imperfekt och Objektspronomen tillsammans för exempel.

Skriv först situationen, sedan huvudregeln, ett genomarbetat exempel,
en egen uppgift och sist nyanserna. Markera spanska meningar med `lang="es"`
i komponenterna. Färg ska alltid kompletteras med en etikett.

Lägg nya lärsteg i `lib/learning-path.ts` med stabila id:n och slutquiz i
`data/learning-quizzes.ts`. Då sparas resultaten och missade frågor ingår i
Dagens repetition. Ändra inte ordningen på publicerade quizfrågor utan att
hantera redan sparade frågeindex. Läsmarkeringen är skild från quizresultat.
Grammatiköversikten på `/grammatik` läser kategorier och sidor automatiskt;
jämförelsekort och bloggingångar väljs redaktionellt.
