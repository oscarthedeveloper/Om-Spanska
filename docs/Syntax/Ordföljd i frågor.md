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

# Ordföljd i frågor

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

## Subjektet syns ofta inte alls

I praktiken hoppar spansktalande ofta över subjektspronomenet helt — verbändelsen avslöjar ju redan vem det handlar om! Då blir frågan och påståendet **identiska i skrift**, och bara frågetecknen (och tonläget i tal) skiljer dem åt:

<div class="custom-quote">  
*¿Quieres comer?*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Vill du äta?*</small>    
*Quieres comer.*   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Du vill äta.*</small>    
</div>

I tal höjer man tonen i slutet av frågan — precis som på svenska. Det är därför det inledande **¿** är så praktiskt i skrift: det varnar läsaren om att en fråga är på väg!

## Bekräftelsefrågor med ¿verdad? och ¿no?

Ett superenkelt sätt att ställa frågor är att lägga en liten svans på ett vanligt påstående:

<div class="custom-quote">  
*Hablas español, **¿verdad?***   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Du talar spanska, eller hur?*</small>    
*Hace calor hoy, **¿no?***   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Det är varmt idag, eller hur?*</small>    
</div>

Svansen motsvarar svenskans *eller hur?* / *va?* och är extremt vanlig i vardagligt tal.

:::tip Frågor är enklare än de ser ut

Sammanfattningsvis finns tre sätt att fråga på spanska: (1) frågeord + VSO (*¿Dónde vives?*), (2) bara frågetecken + tonhöjning (*¿Quieres café?*) och (3) påstående + svans (*Quieres café, ¿no?*). Det svåraste är faktiskt att komma ihåg det upp-och-nervända frågetecknet!

:::