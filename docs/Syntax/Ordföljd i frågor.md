---
sidebar_position: 2
---

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

# <Highlight color="var(--highlight)">Ordföljd i frågor</Highlight>

Som du läste i [introduktionen till syntax](/docs/Syntax/Introduktion) är ordföljden ofta **subjekt-verb-objekt** (**SVO**), men i **frågor** kan ordföljden bli annorlunda.

<div class="custom-quote">  
*¿<span style={{color: 'magenta'}}>Dónde</span> <span style={{color: 'red'}}>están</span> <span style={{color: 'var(--highlight)'}}>los niños</span>?*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Hunden äter kött.*</small>    
*¿<span style={{color: 'magenta'}}>De dónde</span> <span style={{color: 'red'}}>eres</span> <span style={{color: 'var(--highlight)'}}>tú</span>?*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Var kommer du ifrån?*</small>       
</div>

<div class="subject-box">
  <span class="magenta-dot"></span>
  <span class="subject-text">Frågepronomen</span>
    <span class="red-dot"></span>
  <span class="subject-text">Verb</span>
  <span class="blue-dot"></span>
  <span class="subject-text">Subjekt</span>
</div>

Som du ser ovan har ordföljden ändrats till **verb-subjekt-objekt** (**VSO**), då verbet och subjektet har bytt plats. I 🇸🇪 **svenskan** gör man detta i nästan alla frågor, men i spanskan är det **lite** mer omständigt.

## Lite minitips

När man använder **frågepronomina**, t.ex. *qué*, *quién*, *cómo*, *dónde* etc, byter man **oftast** plats på subjekt och verb till **VSO**.

<div class="custom-quote">  
*¿<span style={{color: 'magenta'}}>Dónde</span> <span style={{color: 'red'}}>están</span> <span style={{color: 'var(--highlight)'}}>los niños</span>?*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Var är barnen?*</small>    
*¿<span style={{color: 'magenta'}}>De dónde</span> <span style={{color: 'red'}}>eres</span> <span style={{color: 'var(--highlight)'}}>tú</span>?*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Var kommer du ifrån?*</small>      
*¿<span style={{color: 'magenta'}}>Qué</span> <span style={{color: 'red'}}>habéis hecho</span> <span style={{color: 'var(--highlight)'}}>vosotros</span>?*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Vad har ni gjort?*</small>    
</div>

<div class="subject-box">
  <span class="magenta-dot"></span>
  <span class="subject-text">Frågepronomen</span>
    <span class="red-dot"></span>
  <span class="subject-text">Verb</span>
  <span class="blue-dot"></span>
  <span class="subject-text">Subjekt</span>
</div>

:::tip que

Läs mer om **que** [här](/docs/Syntax/Que).

:::

När man **inte** använder **frågepronomina** och bara stället en fråga som '*vill du äta*', brukar man hålla sig till **SVO**.

<div class="custom-quote">  
*¿<span style={{color: 'var(--highlight)'}}>Tú</span> <span style={{color: 'red'}}>quieres</span> <span style={{color: 'red'}}>comer</span>?*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Vill du äta?*</small>    
*¿<span style={{color: 'var(--highlight)'}}>Ustedes</span> <span style={{color: 'red'}}>han reservado</span> <span style={{color: 'lightseagreen'}}>una mesa</span>?*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Har Ni bokat ett bord?*</small>      
</div>

<div class="subject-box">
  <span class="blue-dot"></span>
  <span class="subject-text">Subjekt</span>
  <span class="red-dot"></span>
  <span class="subject-text">Verb</span>
  <span class="aqua-dot"></span>
  <span class="subject-text">Objekt</span>
</div>
