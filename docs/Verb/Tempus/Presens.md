---
sidebar_position: 1
---

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '3px',
      color: '#fff',
      padding: '0.15rem 0.4rem',
    }}>
    {children}
  </span>
);

# Presens

Presens används i 🇪🇸 spanskan när man pratar om:

- 👇 **något som sker nu**
- 🔄 **något som sker regelbundet**
- 👮‍♂️ **tillstånd**
- 🔜 **något som sker i framtiden**

## Exempel

### <Highlight color="#ff4802">Något som sker nu</Highlight>

<div class="custom-quote">
¿Qué **haces**?   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 Vad gör du?</small>     
No **entiendo** la pregunta del profe.    
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag förstår inte lärarens fråga.*</small>     
Hoy **hace** un frío horrible.      
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Idag är det fruktansvärt kallt.*</small>
</div>

### <Highlight color="#ff4802">Något som sker regelbundet</Highlight>

<div class="custom-quote">
**Quedo** con mis amigos los viernes.     
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag träffar mina kompisar på fredagarna.*</small>      
**Tenemos** clase de español los martes y jueves.      
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Vi har spanska på tisdagar och torsdagar.*</small>     
Mi hermano **escucha** música todo el día.     
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Min bror lyssnar på musik hela dagen.*</small>
</div>

### <Highlight color="#ff4802">Tillstånd</Highlight>

<div class="custom-quote">
**Soy** estudiante y **vivo** en Gotemburgo.     
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag är elev och bor i Göteborg.*</small>.     
**Tengo** dieciséis años y **me llamo** Erik.     
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag är sexton år och heter Erik.*</small>     
Mi mejor amiga **se llama** Julia y **es** muy divertida.      
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Min bästa kompis heter Julia och hon är väldigt rolig.*</small>
</div>

### <Highlight color="#ff4802">Något som sker i nära framtid</Highlight>

<div class="custom-quote">
¿**Vienes** a la fiesta este sábado?      
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Kommer du på festen i lördag?*</small>      
Te **llamo** luego, ahora no **puedo** hablar.      
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag ringer dig senare, nu kan jag inte prata.*</small>     
**Salimos** mañana a las ocho, ¿vale?      
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Vi åker imorgon klockan åtta, okej?*</small>
</div>

## Bildning

Alla spanska verb har en **stam** (den del som förblir oförändrad) och en **ändelse** (som visar vem som gör något). I presens byts verbets ändelse ut mot följande:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="ar" label="-AR" default>

Exempelverb: **hablar** (tala/prata) → stam: **habl-**

<table>
<tbody>
<tr>
    <td rowspan="3"> <b>Singular</b></td>
    <td> <b>1:a</b></td>
    <td> <i>yo</i></td>
    <th width="100px"> -<b>o</b> </th>
    <td> <i>hablo</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th width="100px"> -<b>as</b> </th>
    <td> <i>hablas</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él / ella</i></td>
    <th width="100px"> -<b>a</b></th>
    <td> <i>habla</i> </td>
</tr>
<tr>
    <td rowspan="3"> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th width="100px"> -<b>amos</b> </th>
    <td> <i>hablamos</i> </td>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th width="100px"> -<b>áis</b> </th>
    <td> <i>habláis</i> </td>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th width="100px"> -<b>an</b> </th>
    <td> <i>hablan</i> </td>
</tr>
</tbody>
</table>

  </TabItem>
  <TabItem value="er" label="-ER">

Exempelverb: **comer** (äta) → stam: **com-**

<table>
<tbody>
<tr>
    <td rowspan="3"> <b>Singular</b></td>
    <td> <b>1:a</b></td>
    <td> <i>yo</i></td>
    <th width="100px"> -<b>o</b> </th>
    <td> <i>como</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th width="100px"> -<b>es</b> </th>
    <td> <i>comes</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él / ella</i></td>
    <th width="100px"> -<b>e</b></th>
    <td> <i>come</i> </td>
</tr>
<tr>
    <td rowspan="3"> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th width="100px"> -<b>emos</b> </th>
    <td> <i>comemos</i> </td>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th width="100px"> -<b>éis</b> </th>
    <td> <i>coméis</i> </td>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th width="100px"> -<b>en</b> </th>
    <td> <i>comen</i> </td>
</tr>
</tbody>
</table>

  </TabItem>
  <TabItem value="ir" label="-IR">

Exempelverb: **vivir** (leva/bo) → stam: **viv-**

<table>
<tbody>
<tr>
    <td rowspan="3"> <b>Singular</b></td>
    <td> <b>1:a</b></td>
    <td> <i>yo</i></td>
    <th width="100px"> -<b>o</b> </th>
    <td> <i>vivo</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th width="100px"> -<b>es</b> </th>
    <td> <i>vives</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él / ella</i></td>
    <th width="100px"> -<b>e</b></th>
    <td> <i>vive</i> </td>
</tr>
<tr>
    <td rowspan="3"> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th width="100px"> -<b>imos</b> </th>
    <td> <i>vivimos</i> </td>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th width="100px"> -<b>ís</b> </th>
    <td> <i>vivís</i> </td>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th width="100px"> -<b>en</b> </th>
    <td> <i>viven</i> </td>
</tr>
</tbody>
</table>

  </TabItem>
  <TabItem value="full" label="Alla ändelser">

<table>
<tbody>
<tr>
    <td colspan="3"></td>
    <th>-AR</th>
    <th>-ER</th>
    <th>-IR</th>
</tr>
<tr>
    <td rowspan="3"> <b>Singular</b></td>
    <td> <b>1:a</b></td>
    <td> <i>yo</i></td>
    <th width="90px"> -<b>o</b> </th>
    <th width="90px"> -<b>o</b> </th>
    <th width="90px"> -<b>o</b> </th>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th width="90px"> -<b>as</b> </th>
    <th width="90px"> -<b>es</b> </th>
    <th width="90px"> -<b>es</b> </th>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él / ella</i></td>
    <th width="90px"> -<b>a</b> </th>
    <th width="90px"> -<b>e</b> </th>
    <th width="90px"> -<b>e</b> </th>
</tr>
<tr>
    <td rowspan="3"> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th width="90px"> -<b>amos</b> </th>
    <th width="90px"> -<b>emos</b> </th>
    <th width="90px"> -<b>imos</b> </th>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th width="90px"> -<b>áis</b> </th>
    <th width="90px"> -<b>éis</b> </th>
    <th width="90px"> -<b>ís</b> </th>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th width="90px"> -<b>an</b> </th>
    <th width="90px"> -<b>en</b> </th>
    <th width="90px"> -<b>en</b> </th>
</tr>
</tbody>
</table>

  </TabItem>
</Tabs>

:::tip Minnestips — ändelserna

**-ER och -IR** är nästan identiska — skillnaden är bara i **nosotros**: *-emos* vs *-imos*, och i **vosotros**: *-éis* vs *-ís*. Kan du -ER kan du nästan -IR automatiskt.

**Yo** slutar alltid på **-o** oavsett verbtyp. Det är den enda ändelsen som är samma för alla tre grupper.

:::

---

## Klurigheter

Tyvärr är det inte alltid så enkelt. I presens förekommer fyra sorters klurigheter som du stöter på hela tiden:

- 🦺 **Reflexiva verb** — tar ett pronomen (me, te, se...)
- 🔃 **Diftongerande verb** — vokalen i stammen förändras
- 🦄 **Vokalskiftande verb** — e i stammen blir i
- 🖕 **Oregelbundna verb** — får läras utantill


### <Highlight color="#ff4802">Reflexiva verb</Highlight>

Reflexiva verb är verb där handlingen "studsar tillbaka" på den som utför den — man gör något med/åt sig själv. De identifieras av ändelsen **-se** i infinitiv, t.ex. *levantarse*, *ducharse*, *llamarse*.

I presens sätts det reflexiva pronomet (t.ex. me, te, se etc.) alltid före verbet, t.ex. *te bañas*.

<table>
  <tbody>
  <tr>
      <td rowspan="3"> **Singular**</td>
      <td> **1:a**</td>
      <td> *yo*</td>
      <td> **me** bañ**o**</td>
      <td rowspan="3"> **Plural**</td>
      <td> **1:a**</td>
      <td> *nosotros*</td>
      <td> **nos** bañ**amos**</td>
  </tr>
  <tr>
      <td> **2:a**</td>
      <td> *tú*</td>
      <td> **te** bañ**as**</td>
      <td> **2:a**</td>
      <td> *vosotros*</td>
      <td> **os** bañ**áis**</td>
  </tr>
  <tr>
      <td> **3:e**</td>
      <td> *él / ella*</td>
      <td> **se** bañ**a**</td>
      <td> **3:e**</td>
      <td> *ellos*</td>
      <td> **se** bañ**an**</td>
  </tr>
  </tbody>
</table>

#### Exempel

<div class="custom-quote">
**Me levanto** a las siete menos cuarto.     
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag vaknar kvart i sju.*</small>      
¿A qué hora **te acuestas** normalmente?      
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Hur dags lägger du dig normalt?*</small>     
Mi hermano **se enfada** cuando pierde en el FIFA.       
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Min bror blir arg när han förlorar i FIFA.*</small>
</div>

### <Highlight color="#ff4802">Diftongerande verb</Highlight>

Diftongerande verb är verb vars stamvokal förändras när den är **betonad** — alltså i alla former utom nosotros och vosotros. Det finns två mönster:

- **e** ➡️ **ie** &nbsp; (t.ex. *pensar → pienso*)
- **o** ➡️ **ue** &nbsp; (t.ex. *poder → puedo*)

<table>
  <tbody>
  <tr>
      <td rowspan="3"> **Singular**</td>
      <td> **1:a**</td>
      <td> *yo*</td>
      <td> *p**ie**nso / p**ue**do*</td>
      <td rowspan="3"> **Plural**</td>
      <td> **1:a**</td>
      <td> *nosotros*</td>
      <td> *pensamos / podemos*</td>
  </tr>
  <tr>
      <td> **2:a**</td>
      <td> *tú*</td>
      <td> *p**ie**nsas / p**ue**des*</td>
      <td> **2:a**</td>
      <td> *vosotros*</td>
      <td> *pensáis / podéis*</td>
  </tr>
  <tr>
      <td> **3:e**</td>
      <td> *él / ella*</td>
      <td> *p**ie**nsa / p**ue**de*</td>
      <td> **3:e**</td>
      <td> *ellos*</td>
      <td> *p**ie**nsan / p**ue**den*</td>
  </tr>
  </tbody>
</table>

:::caution OBS — nosotros och vosotros

Vokalen förändras **inte** i nosotros och vosotros, eftersom betoningen inte faller på stammen i de formerna. Kom ihåg det — det är en vanlig fälla!

:::

:::tip Tips för glosplugget

Skriv alltid diftongen i parentes när du pluggar glosor: ***Pensar (ie)***, ***Poder (ue)***. Då sitter det på minnet automatiskt.

:::

#### Exempel

<div class="custom-quote">
¿**Puedes** venir a mi cumpleaños el sábado?      
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Kan du komma på min födelsedag på lördag?*</small>      
¿Qué **quieres** hacer este fin de semana?       
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Vad vill du göra i helgen?*</small>      
El partido **empieza** a las nueve.       
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Matchen börjar klockan nio.*</small>
</div>

### <Highlight color="#ff4802">Vokalskiftande verb</Highlight>

Vokalskiftande verb har alltid **e** i stammen och **-ir** som ändelse. I alla betonade former omvandlas detta **e** till **i**:

- **e** ➡️ **i** &nbsp; (t.ex. *pedir → pido*)

<table>
  <tbody>
  <tr>
      <td rowspan="3"> **Singular**</td>
      <td> **1:a**</td>
      <td> *yo*</td>
      <td> *p**i**do*</td>
      <td rowspan="3"> **Plural**</td>
      <td> **1:a**</td>
      <td> *nosotros*</td>
      <td> *pedimos*</td>
  </tr>
  <tr>
      <td> **2:a**</td>
      <td> *tú*</td>
      <td> *p**i**des*</td>
      <td> **2:a**</td>
      <td> *vosotros*</td>
      <td> *pedís*</td>
  </tr>
  <tr>
      <td> **3:e**</td>
      <td> *él / ella*</td>
      <td> *p**i**de*</td>
      <td> **3:e**</td>
      <td> *ellos*</td>
      <td> *p**i**den*</td>
  </tr>
  </tbody>
</table>

:::caution OBS — nosotros och vosotros

Precis som hos diftongerande verb förändras vokalen **inte** i nosotros och vosotros.

:::

#### Exempel

<div class="custom-quote">
**Pido** siempre la misma pizza cuando salimos.     
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag beställer alltid samma pizza när vi går ut.*</small>     
¿Qué **dice** el profe?      
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Vad säger läraren?*</small>      
Él **sigue** su cuenta en Instagram.      
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Han följer hennes konto på Instagram.*</small>
</div>

### <Highlight color="#ff4802">Oregelbundna verb</Highlight>

Oregelbundna verb följer inte det vanliga mönstret och måste läras utantill. Men det finns ett mönster värt att känna till: **väldigt många** av dem är **bara oregelbundna i yo-formen** och följer annars normala ändelser.

:::tip Yo-go verben

Många supervanliga verb slutar på **-go** i yo-formen: **digo, hago, pongo, tengo, salgo, traigo, vengo, oigo**. Känner du igen mönstret sitter hela gruppen snabbare.

:::

<table>
  <thead>
    <tr>
      <th>Person</th>
      <th>Decir</th>
      <th>Hacer</th>
      <th>Ser</th>
      <th>Estar</th>
      <th>Tener</th>
      <th>Ir</th>
      <th>Poner</th>
      <th>Salir</th>
      <th>Venir</th>
      <th>Saber</th>
      <th>Ver</th>
      <th>Dar</th>
      <th>Conocer</th>
      <th>Seguir</th>
      <th>Haber</th>
      <th>Oír</th>
      <th>Traer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**Yo**</td>
      <td><span style={{color: 'red'}}>digo</span></td>
      <td><span style={{color: 'red'}}>hago</span></td>
      <td><span style={{color: 'red'}}>soy</span></td>
      <td><span style={{color: 'red'}}>estoy</span></td>
      <td><span style={{color: 'red'}}>tengo</span></td>
      <td><span style={{color: 'red'}}>voy</span></td>
      <td><span style={{color: 'red'}}>pongo</span></td>
      <td><span style={{color: 'red'}}>salgo</span></td>
      <td><span style={{color: 'red'}}>vengo</span></td>
      <td><span style={{color: 'red'}}>sé</span></td>
      <td><span style={{color: 'red'}}>veo</span></td>
      <td><span style={{color: 'red'}}>doy</span></td>
      <td><span style={{color: 'red'}}>conozco</span></td>
      <td><span style={{color: 'red'}}>sigo</span></td>
      <td><span style={{color: 'red'}}>he</span></td>
      <td><span style={{color: 'red'}}>oigo</span></td>
      <td><span style={{color: 'red'}}>traigo</span></td>
    </tr>
    <tr>
      <td>**Tú**</td>
      <td>dices</td>
      <td>haces</td>
      <td><span style={{color: 'red'}}>eres</span></td>
      <td><span style={{color: 'red'}}>estás</span></td>
      <td>tienes</td>
      <td><span style={{color: 'red'}}>vas</span></td>
      <td>pones</td>
      <td>sales</td>
      <td>vienes</td>
      <td>sabes</td>
      <td>ves</td>
      <td>das</td>
      <td>conoces</td>
      <td>sigues</td>
      <td><span style={{color: 'red'}}>has</span></td>
      <td><span style={{color: 'red'}}>oyes</span></td>
      <td>traes</td>
    </tr>
    <tr>
      <td>**Él, ella**</td>
      <td>dice</td>
      <td>hace</td>
      <td><span style={{color: 'red'}}>es</span></td>
      <td><span style={{color: 'red'}}>está</span></td>
      <td>tiene</td>
      <td><span style={{color: 'red'}}>va</span></td>
      <td>pone</td>
      <td>sale</td>
      <td>viene</td>
      <td>sabe</td>
      <td>ve</td>
      <td>da</td>
      <td>conoce</td>
      <td>sigue</td>
      <td><span style={{color: 'red'}}>ha</span></td>
      <td><span style={{color: 'red'}}>oye</span></td>
      <td>trae</td>
    </tr>
    <tr>
      <td>**Nosotros**</td>
      <td>decimos</td>
      <td>hacemos</td>
      <td><span style={{color: 'red'}}>somos</span></td>
      <td>estamos</td>
      <td>tenemos</td>
      <td><span style={{color: 'red'}}>vamos</span></td>
      <td>ponemos</td>
      <td>salimos</td>
      <td>venimos</td>
      <td>sabemos</td>
      <td>vemos</td>
      <td>damos</td>
      <td>conocemos</td>
      <td>seguimos</td>
      <td><span style={{color: 'red'}}>hemos</span></td>
      <td><span style={{color: 'red'}}>oímos</span></td>
      <td>traemos</td>
    </tr>
    <tr>
      <td>**Vosotros**</td>
      <td>decís</td>
      <td>hacéis</td>
      <td><span style={{color: 'red'}}>sois</span></td>
      <td>estáis</td>
      <td>tenéis</td>
      <td><span style={{color: 'red'}}>vais</span></td>
      <td>ponéis</td>
      <td>salís</td>
      <td>venís</td>
      <td>sabéis</td>
      <td><span style={{color: 'red'}}>veis</span></td>
      <td><span style={{color: 'red'}}>dais</span></td>
      <td>conocéis</td>
      <td>seguís</td>
      <td>habéis</td>
      <td>oís</td>
      <td>traéis</td>
    </tr>
    <tr>
      <td>**Ellos**</td>
      <td>dicen</td>
      <td>hacen</td>
      <td><span style={{color: 'red'}}>son</span></td>
      <td><span style={{color: 'red'}}>están</span></td>
      <td>tienen</td>
      <td><span style={{color: 'red'}}>van</span></td>
      <td>ponen</td>
      <td>salen</td>
      <td>vienen</td>
      <td>saben</td>
      <td>ven</td>
      <td>dan</td>
      <td>conocen</td>
      <td>siguen</td>
      <td><span style={{color: 'red'}}>han</span></td>
      <td><span style={{color: 'red'}}>oyen</span></td>
      <td>traen</td>
    </tr>
  </tbody>
</table>

:::info Verb med oregelbundna verb inbyggda

Verb som *con**tener**, su**poner**, con**venir*** följer sina grundverbs oregelbundenhet: *contengo, supongo, convengo* osv.

:::