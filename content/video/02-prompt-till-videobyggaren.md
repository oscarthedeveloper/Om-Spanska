# Prompt till AI:n som bygger scenerna

Samma prompt varje gång, med videonumret utbytt. Byt `V01` mot rätt nummer och
klistra in. Allt sammanhang står i filerna — prompten ska inte upprepa dem.

---

```
Du ska bygga bildrutorna till en videogenomgång för omspanska.se.
Du har hela projektmappen. Börja med att läsa, i den här ordningen:

1. content/video/01-designspec.md   — regelverket, läs det helt
2. content/video/mall/scen.html     — scenmallen
3. content/video/mall/video.css     — det enda som ligger ovanpå sajtens CSS
4. app/globals.css                  — sajtens designsystem, källan till allt
5. content/video/V01-verbsystemet-i-overblick.md  — manuset du ska bygga

UPPGIFT
Skapa content/video/scener/V01.html med en <section class="scen"> per scen i
manuset — fjorton stycken, i manusets ordning. Varje section ska ha
data-scen="V01-01" (löpnummer) och data-langd="14" (scenens längd i sekunder,
tagen ur manusets tidsangivelse). Följ manusets "Scentyp" och ytklass för varje
scen; de är redan bestämda och ska inte omtolkas.

Rendera sedan:
  node content/video/mall/render.mjs content/video/scener/V01.html ut/V01
Kontrollera att varje PNG blir exakt 1920 × 1080.

REGLER
- Skriv aldrig ett hexvärde, ett typsnittsnamn eller en pixelstorlek i HTML:en.
  Färg kommer ur en token, komponenter ur befintliga klasser i globals.css och
  video.css. Behöver du något som inte finns: fråga mig, hitta inte på.
- Ändra ingenting i app/, content/docs/ eller content/mer/. De är läsvärda,
  inte skrivbara. video.css får du bara ändra om jag godkänt det först.
- Installera inga bibliotek utöver playwright. Ingen animeringsmotor, inga
  ikonpaket, inga typsnitt utöver Inter och JetBrains Mono.
- Generera inga bilder. Bildrutorna ritas av Chromium, inte av en bildmodell.

KONTROLLERA INNAN DU RAPPORTERAR
- document.fonts.check('340 80px Inter') === true i renderingen. Är den false
  laddades inte Inter, och då är utfallet inte sajtens design — säg det.
- Exakt en pastellyta per scen (undantag: T5-jämförelsen, korall mot mint).
- Högst en magentapoäng per bildruta, och noll är normalt. Samma poäng får
  upprepas i parallella former; två olika poänger i magenta får aldrig samsas.
- Högst sju textrader per bildruta.
- Alla spanska former stämmer bokstav för bokstav med manuset.

RAPPORTERA
En kort lista: scener som blev som manuset säger, scener där du fick tolka
något, och allt du inte kunde bygga utan att bryta mot designspecen. Ändra
hellre ingenting och fråga än att kompromissa med specen.
```

---

## När första videon sitter

Byt bara ut de två raderna som nämner V01. Är återkommande fel på väg in i varje
video hör de hemma i designspecen eller i `video.css`, inte i prompten — prompten
ska förbli identisk mellan videorna.
