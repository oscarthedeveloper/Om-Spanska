# V01 — Verbsystemet i överblick

**Sida:** /verb/introduktion
**Längd:** 3:30 · 14 scener · 525 ord speakertext
**Placering:** sist på sidan, före "Öva det här"-knappen
**Mål:** Efter videon vet tittaren att ett spanskt verb bär fyra upplysningar
samtidigt — person, konjugation, tempus och modus — och varför pronomenet
därför oftast kan strykas.
**Förkunskaper:** inga. Detta är kursens första video.
**Design:** följer `01-designspec.md`. Scentyperna nedan hänvisar till dess
tabell i avsnitt 6, ytklasserna till `mall/video.css`.

---

### Scen 1 · 0:00–0:14 (14 s)

**Scentyp:** T9 · `scen--vit`

**Speaker**
> Prata. Pratar. Pratade. På svenska ändrar sig verbet knappt. Jag pratar, du pratar, vi pratar — samma ord varje gång. Spanskan gör tvärtom.

**Bild:** Vit botten. Tre svenska meningar staplade på varandra, vänsterställda.
Ordet *pratar* står i magenta i alla tre och är exakt identiskt.

**Text på skärmen**
```
jag pratar
du pratar
vi pratar
```

**Animering:** Meningarna tonar in en och en, 0,4 s mellanrum. På sista raden
dras en tunn svart linje ner genom alla tre *pratar* — de ligger perfekt i linje.

---

### Scen 2 · 0:14–0:26 (12 s)

**Scentyp:** T9 · `scen--lime`

**Speaker**
> Yo hablo. Tú hablas. Nosotros hablamos. Verbet byter form varje gång, och det är inte slarv — det är hela poängen.

**Bild:** Samma layout, nu på spanska på limegrön färgblocksyta `#dceeb1`.
Stammen *habl-* i svart, ändelserna `-o`, `-as`, `-amos` i magenta och mono.

**Text på skärmen**
```
yo         habl·o
tú         habl·as
nosotros   habl·amos
```

**Animering:** Den svarta linjen från scen 1 följer med in och bryts sedan
i tre olika längder — ändelserna är olika långa. Linjen faller isär.

---

### Scen 3 · 0:26–0:44 (18 s)

**Scentyp:** T9 · `scen--vit`

**Speaker**
> Ett spanskt verb bär fyra upplysningar på samma gång. Vem som gör det. Vilken av de tre verbtyperna det tillhör. När det sker. Och hur talaren förhåller sig till det. Fyra saker, ett enda ord.

**Bild:** Ordet **hablamos** stort i mitten, svart på vitt. Fyra tunna linjer
pekar ut från ordet till fyra etiketter i mono, en i vart hörn.

**Text på skärmen**
```
                PERSON
                  ↑
KONJUGATION ← hablamos → TEMPUS
                  ↓
                MODUS
```

**Animering:** Etiketterna kommer in en i taget i takt med speakern, medurs
från *person*. Ordet i mitten står still hela tiden.

---

### Scen 4 · 0:44–0:57 (13 s)

**Scentyp:** T9 · `scen--kram`

**Speaker**
> Grunden är enkel. Varje verb består av en stam, som bär betydelsen, och en ändelse, som bär all den där informationen. Stammen får du genom att klippa bort infinitivens sista två bokstäver.

**Bild:** Kräm färgblock `#f4ecd6`. Ordet **hablar** stort. En sax-linje klipper
mellan *habl* och *ar*.

**Text på skärmen**
```
habl | ar   →   habl-  +  ändelse
```

**Animering:** *-ar* glider bort åt höger och tonar ut. *habl-* blir kvar och
flyttar sig till vänsterkanten, där en tom ruta öppnas efter bindestrecket.

---

### Scen 5 · 0:57–1:12 (15 s)

**Scentyp:** T4 · `scen--vit`

**Speaker**
> Först person. Svenskan har sex personer också — jag, du, han eller hon, vi, ni, de — men vi låter verbet vara i fred. Spanskan ger varje person sin egen ändelse.

**Bild:** Tvåspaltig tabell, svart text på vitt, tunna hårstreck `#e6e6e6`.
Vänster: svenska personer. Höger: spanska.

**Text på skärmen**
```
1:a  jag        yo              vi     nosotros / nosotras
2:a  du         tú              ni     vosotros / vosotras
3:e  han, hon   él, ella        de     ellos / ellas
```

**Animering:** Rad för rad, uppifrån och ner. Ingen färg än.

---

### Scen 6 · 1:12–1:26 (14 s)

**Scentyp:** T4 · `scen--lila`

**Speaker**
> Två former till som svenskan saknar: usted och ustedes. Det är du och ni, fast artigt — och de böjs som om du pratade om personen i tredje person, inte till den.

**Bild:** Samma tabell, nedtonad till 30 % opacitet. Två nya rader i lila
färgblock `#c5b0f4` skjuts in underifrån.

**Text på skärmen**
```
usted     ni (till en person, artigt)     → böjs som él/ella
ustedes   ni (till flera, artigt)         → böjs som ellos/ellas
```

**Animering:** Pilen `→` ritas ut från vänster till höger när speakern säger
"tredje person".

---

### Scen 7 · 1:26–1:42 (16 s)

**Scentyp:** T9 · `scen--vit`

**Speaker**
> Sedan konjugationen. Alla spanska verb slutar på -ar, -er eller -ir i infinitiv, och den ändelsen bestämmer vilket böjningsmönster verbet följer resten av livet. Hablar, comer, vivir — tala, äta, leva.

**Bild:** Vit scenyta. Tre kolumner åtskilda av lodräta hårstreck
`--hairline`. Ett verb överst i varje kolumn, infinitivändelsen i magenta
(`.poang`). Ingen pastellyta här — färgen skulle konkurrera med magentan.

**Text på skärmen**
```
   habl·AR        com·ER        viv·IR
   tala           äta           leva
```

**Animering:** Kolumnerna reser sig underifrån, 0,15 s isär.

---

### Scen 8 · 1:42–1:58 (16 s)

**Scentyp:** T4 · `scen--vit`

**Speaker**
> Så här ser skillnaden ut i presens. Titta bara på ändelserna: -ar-verben har a, -er-verben har e, och -ir-verben lånar e:et överallt utom i vi- och ni-formen. Det är hela skillnaden.

**Bild:** De tre kolumnerna fylls med presensböjningen i mono, allt i svart.
Magentan sparas till de två former som är poängen — se animeringen.

**Text på skärmen**
```
yo          hablo       como        vivo
tú          hablas      comes       vives
él          habla       come        vive
nosotros    hablamos    comemos     vivimos
vosotros    habláis     coméis      vivís
ellos       hablan      comen       viven
```

**Animering:** Raderna fylls i uppifrån. När speakern säger "utom i vi- och
ni-formen" ramas `vivimos` och `vivís` in med en tunn magentaram.

---

### Scen 9 · 1:58–2:14 (16 s)

**Scentyp:** T5 · `korall/mint`

**Speaker**
> Tredje upplysningen: tempus. Här gör spanskan mest jobb. Svenskan sätter ut hjälpord — jag ska prata, jag har pratat. Spanskan bygger in tiden i själva ändelsen.

**Bild:** T5-jämförelse. Vänster sida korall `--block-coral` med de svenska
konstruktionerna, höger sida mint `--block-mint` med de spanska. Hjälpverben
i `--muted`.

**Text på skärmen**
```
jag ska prata      →   hablaré
jag har pratat     →   he hablado
jag pratade        →   hablé
```

**Animering:** De grå hjälpverben *ska* och *har* tonar ut och glider åt höger,
mot den spanska formen, som står helt still. Ingen storleksändring — text växer
aldrig i de här videorna.

---

### Scen 10 · 2:14–2:29 (15 s)

**Scentyp:** T7 · `scen--vit`

**Speaker**
> Samma verb, samma person, tre olika tider. Hablo — jag pratar, nu. Hablé — jag pratade, klart och avslutat. Hablaba — jag brukade prata, om och om igen.

**Bild:** En vågrät tidslinje, svart hårstreck. Tre noder märkta med form
och översättning. Nutid till höger, dåtid till vänster.

**Text på skärmen**
```
hablaba ·········· hablé ────────── hablo
brukade prata      pratade          pratar
(upprepat)         (avslutat)       (nu)
```

**Animering:** Noderna tänds i den ordning speakern nämner dem: först *hablo*
till höger, sedan *hablé*, sedan *hablaba*. Den prickade linjen till vänster
pulserar svagt en gång vid "om och om igen".

---

### Scen 11 · 2:29–2:47 (18 s)

**Scentyp:** T9 · `scen--vit`

**Speaker**
> Och den fjärde: modus. Modus är verbets sätt att visa vad meningen gör. Indikativ konstaterar något: hablas, du pratar. Konjunktiv hanterar det som bara önskas eller tvivlas på: hables. Imperativ befaller: ¡habla!

**Bild:** Vit scenyta, tre kolumner åtskilda av lodräta hårstreck. Överst
formen i mono och stort, under den etiketten i `.eyebrow`, under den en kort
mening i `.custom-quote`-stil utan egen bakgrund. Konjunktivformen får
`.g-konjunktiv`, imperativformen `.poang`.

**Text på skärmen**
```
hablas              hables               ¡habla!
INDIKATIV           KONJUNKTIV           IMPERATIV
Hablas mucho.       Quiero que hables.   ¡Habla más alto!
Du pratar mycket.   Jag vill att du      Prata högre!
                    pratar.
```

**Animering:** Rutorna kommer in från vänster i takt med speakern. Ingen
rörelse efteråt — tittaren behöver läsa.

---

### Scen 12 · 2:47–3:02 (15 s)

**Scentyp:** T9 · `scen--kram`

**Speaker**
> Det här är också anledningen till att spanjorer sällan säger yo. Ändelsen har redan talat om vem som gör det. Hablo kan bara betyda jag pratar — pronomenet vore en upprepning.

**Bild:** Meningen **Yo hablo español.** stor i mitten. Ordet *Yo* tonar ut och
försvinner, resten sluter sig.

**Text på skärmen**
```
Yo hablo español.
   ↓
Hablo español.
🇸🇪 Jag pratar spanska.
```

**Animering:** *Yo* bleknar till 0 på 0,6 s, resten av meningen glider vänster
och centreras om. Ändelsen `-o` blinkar magenta en gång.

---

### Scen 13 · 3:02–3:18 (16 s)

**Scentyp:** T4 · `scen--vit`

**Speaker**
> Så: stam plus ändelse, och ändelsen bär person, konjugation, tempus och modus. Resten av verbkursen är bara att fylla i rutorna — ett tempus i taget.

**Bild:** Ett tomt rutnät ritas upp: rader för tempus, kolumner för person.
Rutan för presens fylls med magenta.

**Text på skärmen**
```
              yo    tú    él   nosotros  vosotros  ellos
PRESENS        ■     ■     ■      ■         ■        ■
PRETERITUM     □     □     □      □         □        □
IMPERFEKT      □     □     □      □         □        □
FUTURUM        □     □     □      □         □        □
KONDITIONALIS  □     □     □      □         □        □
KONJUNKTIV     □     □     □      □         □        □
```

**Animering:** Presensraden fylls från vänster till höger, som en laddningsrad.
De övriga raderna står kvar tomma.

---

### Scen 14 · 3:18–3:30 (12 s)

**Scentyp:** T8 · `scen--vit`

**Speaker**
> Nästa video tar presens från början. Och böjningen sitter inte förrän du skrivit den själv — verbdrillen ligger under videon.

**Bild:** Vit botten, svart text. Sajtens pillerknapp i magenta.

**Text på skärmen**
```
NÄSTA:  Presens 1 — de tre konjugationerna

[ Öva verbböjning → ]
```

**Länk i beskrivningen och under spelaren:**
`/verbdrillen?tempus=presens&modus=indikativ`

---

## Faktakontroll

- *vosotros/vosotras* används i Spanien; i Latinamerika används *ustedes* även
  informellt. Videon säger inte emot detta, men nämner det inte heller —
  sidan gör det, och V32 tar upp det ordentligt.
- *hablaba* översätts "brukade prata" i scen 10. Det är imperfektens vanligaste
  användning och den som skiljer den från preteritum, men imperfekt gör mer än
  så. V05 och V06 nyanserar.
- Modusetiketterna i scen 11 stämmer med sidans egen indelning.
