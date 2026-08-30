# Designspec för videorna — Om Spanska

Videorna ska se ut som sajten. Inte "i samma anda", inte "inspirerat av" — samma
CSS, samma tokens, samma komponenter. Den här filen är regelverket, och
`mall/` innehåller de filer som gör regelverket automatiskt uppfyllt.

---

## 1. Grundregeln

**Ingenting i en bildruta får uppfinnas.** Varje färg, typsnitt, radie,
mellanrum och textstorlek finns redan i `app/globals.css`. Om något behövs som
inte finns där är svaret nej, inte "vi lägger till en ny färg".

Konkret innebär det:

- Färg får bara hämtas ur en `--token`. Inga hexvärden skrivs i scenmarkupen.
- Typsnitt är Inter och JetBrains Mono. Inga andra, inga undantag.
- Radier är `--r-xs` … `--r-pill`. Inga andra värden.
- Mellanrum är `--s-xxs` … `--s-section`. Ingen fri pixelpassning.
- Komponenter byggs med sajtens egna klassnamn: `.custom-quote`, `.regelruta`,
  `.mdxHighlight`, `.table-content`, `.pillButton`, `.eyebrow`, `.bokstavsbox`,
  `.subject-box`, `.g-subjekt` och så vidare.

## 2. Så produceras en bildruta

Det finns exakt en tillåten väg:

```
manus (.md)  →  scen-HTML som importerar app/globals.css
             →  Chromium renderar
             →  PNG-sekvens
             →  klipp + speakerröst
```

Mallen ligger i `mall/scen.html`. Den laddar `../../app/globals.css` direkt.
Det är därför designen blir exakt densamma: det *är* sajtens CSS som ritar
bilden, inte en tolkning av den.

**Om AI:n som bygger videon i stället genererar bilder ur en promptbeskrivning
går den här garantin förlorad.** Bildgeneratorer kan inte träffa `#dceeb1`,
Inters vikt 340 eller `--r-lg` — de gör något som liknar. Använd AI:n till det
den är bra på: skriva scen-HTML från manuset, generera speakerröst, och klippa.
Själva pixlarna ska komma från Chromium.

### Typsnitten måste faktiskt laddas

Sajten självhostar Inter och JetBrains Mono via `next/font`. Scenmallen hämtar
samma två familjer från Google Fonts, och **Inter måste laddas som variabel
font** — designsystemet använder vikterna 320, 330, 340 och 540, som inte finns
i de statiska filerna. Laddas de inte faller sidan tillbaka på Helvetica, och
då är det inte längre sajtens design.

Kontroll innan rendering: `document.fonts.check('340 80px Inter')` ska svara
`true`. `render.mjs` väntar redan på `document.fonts.ready`, men den väntan
säger inte att rätt font kom fram.

Alternativet, om nätet strular eller om du vill vara helt säker: lägg scenerna
som en route i själva appen — `app/scen/page.tsx`, utesluten ur `sitemap.ts`
och `robots.ts` — och fotografera `localhost:3000/scen`. Då är det bokstavligen
sajten som ritar bildrutan, med sajtens självhostade typsnitt.

## 3. Bildrutan

| | |
|---|---|
| Slutformat | 1920 × 1080, 30 bilder/s, H.264 |
| Renderas i | viewport 1280 × 720 CSS-px, `deviceScaleFactor: 1.5` |
| Skalning | `.scen__yta` är 948 × 533 px med `transform: scale(1.35)` |
| Marginal | 64 px topp/botten, 80 px sidor (i skalade px: 47 / 59) |
| Bakgrund | alltid `var(--canvas)` under färgblocket |

Varför 1.35: sajtens brödtext är 18 px. Skalad 1,35 gånger landar den på
ungefär 36 px i den färdiga rutan, vilket är läsbart på mobil. Videon är
alltså sajten sedd på 135 % zoom — inte en ny typografi.

Ser texten mjuk ut i exporten: rendera med `deviceScaleFactor: 2` och skala ner
till 1920 × 1080 i klippet.

## 4. Färg

| Token | Värde | Så används den i video |
|---|---|---|
| `--ink` | `#000000` | All text på ljus botten. Aldrig grå brödtext. |
| `--canvas` | `#ffffff` | Grundbotten. |
| `--surface-soft` | `#f7f7f5` | Tabellhuvuden och etikettceller. Aldrig som scenyta. |
| `--hairline` | `#e6e6e6` | Ramar och linjer. Aldrig tjockare än 1 px (skalat). |
| `--muted` | `#666666` | Endast metatext: scennummer, källhänvisning. |
| `--block-lime` | `#dceeb1` | Scenyta. Kursens "grundregel"-färg. |
| `--block-lilac` | `#c5b0f4` | Scenyta. Undantag och specialformer. |
| `--block-cream` | `#f4ecd6` | Scenyta. Exempelmeningar (samma som `.custom-quote`). |
| `--block-pink` | `#efd4d4` | Scenyta. Fällor och vanliga fel. |
| `--block-mint` | `#c8e6cd` | Scenyta. Jämförelsers "höger sida". |
| `--block-coral` | `#f3c9b6` | Scenyta. Jämförelsers "vänster sida". |
| `--block-navy` | `#1f1d3d` | Scenyta med `color: var(--inverse-ink)`. Kapitelbyten. |
| `--accent-magenta` | `#ff3d8b` | Endast accent. Se regeln nedan. |
| `--success` | `#1ea64a` | Endast bekräftelse: "rätt form". |

**En pastellyta per scen.** Aldrig två blockfärger i samma bildruta. Byter
scenen färg är det för att ämnet byter karaktär, inte för variationens skull.

**Magentaregeln.** Magenta markerar **högst en sak per bildruta** — den
ändelse, det ord eller den siffra som är hela poängen. Tre förtydliganden, i
den ordning de brukar behövas:

- **Noll magenta är normalt.** De flesta bildrutor har ingen accent alls.
  Regeln är ett tak, inte ett krav. Säger manuset "ingen färg än" är det
  manuset som gäller.
- **Samma sak får synas flera gånger.** Är poängen en ändelse som återkommer i
  tre parallella kolumner får alla tre vara magenta — det är en sak, visad tre
  gånger. Två *olika* saker i magenta i samma bildruta förekommer aldrig.
- Magenta som yta bakom löpande text förekommer inte. Magenta som knappfärg är
  tillåtet, det är `.pillButton--magenta`.

När en hel tabell fylls med former är det aldrig alla ändelser som ska bli
magenta. Markera den rad eller den cell som speakern faktiskt pekar på, och låt
resten vara svart.

**Grammatikfärgerna** (`--g-subjekt` blå, `--g-verb` röd, `--g-objekt` grön,
`--g-bindeord` lila, `--g-konjunktiv` mörkgrön) används bara på ord inuti en
spansk mening, och alltid med `.subject-box`-förklaringen synlig i samma scen
första gången de dyker upp i en video. De blandas aldrig med magenta i samma
mening.

## 5. Typografi

Rollerna är sajtens, oförändrade:

| Roll i videon | Klass / element | Storlek |
|---|---|---|
| Videotitel på titelkortet | `.scen__titel` (= `.heroHeading`) | clamp, ~5.4rem |
| Scenrubrik | `h2` | ~2.1rem, vikt 540 |
| Underrubrik i scenen | `h3` | 1.375rem, vikt 600 |
| Brödtext / förklaring | `p` | 18 px, vikt 320 |
| Lead under rubrik | `.scen__lead` (= `.blockLead`) | ~1.375rem, vikt 340 |
| Scenetikett uppe till vänster | `.eyebrow` | 0.75rem mono, versaler, `0.09em` spärr |
| Böjningsformer, ändelser, IPA | `.ending`, `.IPA`, `<code>` | mono |
| Verbformer i böjningstabell | hela formen i mono, inte bara ändelsen | mono |
| Exempelmening + översättning | `.custom-quote` med `<small>` | 1.0625rem |
| Regel som ska fastna | `.regelruta` | 1.25rem, vikt 540, centrerad |

Ytterligare regler:

- **Aldrig versaler på brödtext.** Versaler finns bara i `.eyebrow`,
  `.switch-label` och `.subject-text` — alltid i mono, alltid spärrat.
- **Max sju rader text** i en bildruta. Behövs fler är det två scener.
- Radlängd max 46 tecken i lead, 60 i brödtext (`max-width` finns i mallen).
- Spanska exempel skrivs som på sidorna: spansk mening först, därunder
  `🇸🇪` plus svensk översättning i `<small>`.
- Bindestreck som visar stamgräns skrivs med mittpunkt: `habl·amos`. Det är
  ett tecken i mono, inte en grafisk effekt.

## 6. Åtta scentyper

Varje scen i ett manus anger sin typ. Fler typer ska inte uppfinnas utan att
den här listan uppdateras.

| Typ | Namn | Används till | Bygger på |
|---|---|---|---|
| **T1** | Titelkort | Första bildrutan | `.scen--navy`, `.eyebrow` + `h1` |
| **T2** | Påstående | En mening som ska landa | `.regelruta` centrerad på pastellyta |
| **T3** | Exempelrad | Spansk mening med översättning | `.custom-quote` |
| **T4** | Böjningstabell | Ändelser och former | `.table-content`, `.endingCell`, `.ending` |
| **T5** | Jämförelse | Två alternativ mot varandra | två spalter, korall vänster / mint höger |
| **T6** | Satsanalys | Ordföljd och satsdelar | `.subject-box` + `.g-*`-klasser |
| **T7** | Tidslinje | Tempus i förhållande till varandra | hårstreckslinje + noder, ingen fyllning |
| **T8** | Slutkort | Nästa video + drilllänk | `.pillButton--magenta` |
| **T9** | Ordbild | Ett fåtal ord eller former stora i bild | `.scen__rubrik`, mono, `.poang`, `.kolumner`, `.kors`, `.klipp` |

## 7. Rörelse

- Bara `opacity` och `transform`. Ingen färganimering, ingen storleksändring av
  text, ingen kameraåkning.
- Varaktighet: 0,18 s för små byten (samma som sajtens `.slider`), 0,4 s för
  att ett element ska komma in. `ease`, aldrig bounce.
- Element kommer in **uppifrån och ner** eller **vänster till höger**, i den
  ordning speakern nämner dem. Aldrig i annan ordning än talet.
- En ändelse som byts ut får animeras — det är rörelse som bär betydelse.
  Allt annat står stilla.
- Scenbyte är ett rakt klipp. Enda undantaget är byte mellan block i kursen,
  där 0,2 s övertoning är tillåten.
- Ingenting rör sig under de sista 1,5 sekunderna av en scen. Tittaren ska
  hinna läsa färdigt.

## 8. Förbjudet

Gradienter. Skuggor. 3D och perspektiv. Ikonbibliotek. Stockbilder. Illustrerade
personer. Andra emojier än `🇸🇪` och `🇪🇸` (som redan används i innehållet).
Mörkt läge — sajten har inget, videorna har inget. Färgade bakgrunder bakom
brödtext utöver de sju blockfärgerna. Kursiv spansk text utanför
`.custom-quote`. Ordet "AI" någonstans i bild.

## 9. Ljud och text

- Speaker: svensk röst, lugnt tempo, 150 ord per minut.
- Spanska ord i speakern uttalas med spanskt uttal, inte försvenskat.
- Undertext på svenska, brännbar av/på, i Inter 320 med `--ink` på vit platta
  med `--r-sm`. Aldrig gul text, aldrig svart låda.
- Ingen musik under förklaringar. Om en stinger används vid titelkort och
  slutkort ska det vara samma två sekunder i alla 49 videor.

## 10. Leverans

```
content/video/
  00-videoplan.md          hela listan
  01-designspec.md         den här filen
  V01-…md … V49-…md        manusen
  mall/
    scen.html              scenmall som laddar sajtens CSS
    video.css              det enda som läggs till globals.css
    render.mjs             renderar scener till PNG med Chromium
```

Exporterade videofiler hör inte hemma i repot. De laddas upp till Bunny Stream
och bäddas in med sitt id.
