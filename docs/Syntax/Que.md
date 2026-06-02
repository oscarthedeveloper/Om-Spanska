---
sidebar_position: 3
---

import BrowserWindow from '@site/src/components/BrowserWindow/BrowserWindow';

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

# Que

**Que** kan vara både **frågeord** och **relativpronomen**!

## Frågeord

När **que** är ett frågeord sätts en accent på e:et, *qué*. Det motsvaras ofta av svenskans *vad*.

<div className="custom-quote">  
*¿<span style={{color: 'magenta'}}>Qué</span> <span style={{color: 'red'}}>haces</span> <span style={{color: 'var(--highlight)'}}>tú</span>?*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Vad gör du?*</small>   
*¿<span style={{color: 'magenta'}}>Qué</span> <span style={{color: 'red'}}>quieren hacer</span> <span style={{color: 'var(--highlight)'}}>los niños</span>?*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Vad vill barnen göra?*</small>   
</div>

<div className="subject-box">
  <span className="magenta-dot"></span>
  <span className="subject-text">Frågepronomen</span>
  <span className="red-dot"></span>
  <span className="subject-text">Verb</span>
  <span className="blue-dot"></span>
  <span className="subject-text">Subjekt</span>
</div>

Som du läste i [ordföljd i frågor](/docs/Syntax/Ordföljd%20i%20frågor) blir ordföljden ofta annorlunda efter frågeord, som i meningen ovan. 

## Relativpronomen

Det som gör **que** till ett så underbart ord är att det kan vara **relativpronomen** också. Men vad innebär det? 

<div className="browser-container">
  <BrowserWindow title="https://sv.wikipedia.org/wiki/Relativpronomen">
<p>
Relativpronomen är ett pronomen i början av en relativsats, där det hänvisar till korrelatet i den överordnade satsen.[1]

Svenska relativpronomina är ”vilken” och ”vars”. Liknande funktion har också subjunktionen ”som”.
Mina föräldrar, vilka båda är döda, var djupt troende.
Jag har en tröja som är röd.  

...
</p>
    {/* Add more content as needed */}
  </BrowserWindow>
</div>

Nu när du vet vad ett relativpronomen är kan vi kolla på hur **que** fungerar som det i spanska meningar.

<div className="custom-quote">  
*<span style={{color: 'var(--highlight)'}}>Yo</span> <span style={{color: 'red'}}>tengo</span> <span style={{color: 'lightseagreen'}}>un hermano</span> <span style={{color: 'magenta'}}>que</span> <span style={{color: 'red'}}>tiene</span>  <span style={{color: 'lightseagreen'}}>cinco años</span>.*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag har en bror som är fem år.*</small>   
*<span style={{color: 'red'}}>Buscamos</span> <span style={{color: 'lightseagreen'}}>una casa</span> <span style={{color: 'magenta'}}>que</span> <span style={{color: 'red'}}>tenga</span>  <span style={{color: 'lightseagreen'}}>dos pisos</span>.*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Vi söker ett hus som har två våningar.*</small>   
</div>

<div className="subject-box">
  <span className="blue-dot"></span>
  <span className="subject-text">Subjekt</span>
  <span className="red-dot"></span>
  <span className="subject-text">Verb</span>
  <span className="aqua-dot"></span>
  <span className="subject-text">Objekt</span>
  <span className="magenta-dot"></span>
  <span className="subject-text">Relativpronomen</span>
</div>

## SVO eller VSO?

Som du vet används ofta **VSO** i meningen när **qué** inleder som frågeord. Men hur blir det när **qué** används i en vanlig mening?

<div className="custom-quote">  
*<span style={{color: 'var(--highlight)'}}>Yo</span> <span style={{color: 'red'}}>sabía</span> <span style={{color: 'magenta'}}>qué</span> <span style={{color: 'red'}}>quería</span> <span style={{color: 'var(--highlight)'}}>ella</span>.*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag visste vad hon ville.*</small>   
</div>

<div className="subject-box">
  <span className="blue-dot"></span>
  <span className="subject-text">Subjekt</span>
  <span className="red-dot"></span>
  <span className="subject-text">Verb</span>
    <span className="aqua-dot"></span>
  <span className="subject-text">Objekt</span>
  <span className="magenta-dot"></span>
  <span className="subject-text">Frågeord</span>
</div>

I fall som detta skulle vi i svenskan använda **SVO**, men i spanskan vill man gärna använda **VSO** efter frågeord, oavsett om det är en fråga eller inte.

<div className="custom-quote">  
*<span style={{color: 'red'}}>Recuerdo</span> <span style={{color: 'magenta'}}>cómo</span> <span style={{color: 'red'}}>se llamaban</span> <span style={{color: 'var(--highlight)'}}>los niños</span>.*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag minns vad barnen hette.*</small>   
*<span style={{color: 'red'}}>Recuerdo</span> <span style={{color: 'magenta'}}>de dónde</span> <span style={{color: 'red'}}>eran</span> <span style={{color: 'var(--highlight)'}}>los niños</span>.*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag minns var barnen kom ifrån.*</small>   
*<span style={{color: 'red'}}>Recuerdo</span> <span style={{color: 'magenta'}}>adónde</span> <span style={{color: 'red'}}>fueron</span> <span style={{color: 'var(--highlight)'}}>los niños</span>.*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag minns vart barnen gick.*</small>  
</div>

<div className="subject-box">
  <span className="blue-dot"></span>
  <span className="subject-text">Subjekt</span>
  <span className="red-dot"></span>
  <span className="subject-text">Verb</span>
    <span className="aqua-dot"></span>
  <span className="subject-text">Objekt</span>
  <span className="magenta-dot"></span>
  <span className="subject-text">Frågeord</span>
</div>