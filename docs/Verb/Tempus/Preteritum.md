---
sidebar_position: 5
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

# Preteritum

Preteritum används i 🇪🇸 spanskan när man ska:

- ⏮️ **återge ett händelseförlopp**
- ✅ **återge en fullbordad händelse**
- 📅 **återge något som skedde under en bestämd tid**
- 👨‍⚖️ **ge ett omdöme om något i det förflutna**

## Exempel

### <Highlight color="#ff4802">Återge ett händelseförlopp</Highlight>
 
<div class="custom-quote">  
**Oímos** un tren. **Empezamos** a correr y **llegamos** a una casa grande.
Entonces **empezó** a llover. Nos **sentimos** felices.     
</div>

### <Highlight color="#ff4802">Återge en fullbordad händelse</Highlight>
 
<div class="custom-quote">  
Los españoles **perdieron** el primer set.   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Spanjorerna förlorade det första settet.*</small>    
La **conocí** en mi primera visita a Barcelona.    
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag lärde känna henne under mitt första besök i Barcelona.*</small>    
¿**Comisteis** las albondigas?    
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Åt ni köttbullarna?*</small>
</div>

### <Highlight color="#ff4802">Återge något som skedde under en bestämd tid</Highlight>
 
<div class="custom-quote">  
Luis **jugó** al fútbol durante cinco años.   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Luis spelade fotboll i fem år.*</small>    
La Guerra Civil **duró** de 1936 a 1939.    
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Inbördeskriget varade från 1936 till 1939.*</small>    
**Vivimos** en España durante veinte años.    
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Vi bodde i Spanien under 20 år.*</small>     
</div>

### <Highlight color="#ff4802">Ge ett omdöme om något i det förflutna</Highlight>
 
<div class="custom-quote">  
La película **fue** muy divertida.   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Filmen var mycket rolig.*</small>    
</div>

## Bildning

Alla spanska verb har en **stam** (den del som förblir oförändrad) och en **ändelse** (som visar vem som gör något). I preteritum byts verbets ändelse ut mot följande:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="ar" label="-AR" default>
<table>
<tbody>
<tr>
    <td rowspan="3"> <b>Singular</b></td>
    <td> <b>1:a</b></td>
    <td> <i>yo</i></td>
    <th width="100px"> -<b>é</b> </th>
    <td> <i>hablé</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th width="100px"> -<b>aste</b> </th>
    <td> <i>hablaste</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él</i><br></br>
    <i>ella</i><br></br>
    <i>ello</i></td>
    <th width="100px"> -<b>ó</b></th>
    <td> <i>habló</i> </td>
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
    <th width="100px"> -<b>asteis</b> </th>
    <td> <i>hablasteis</i> </td>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th width="100px"> -<b>aron</b> </th>
    <td> <i>hablaron</i> </td>
</tr>
</tbody>
</table>  
</TabItem>
  <TabItem value="erir" label="-ER & -IR" default>
<table>
<tbody>
<tr>
    <td rowspan="3"> <b>Singular</b></td>
    <td> <b>1:a</b></td>
    <td> <i>yo</i></td>
    <th width="100px"> -<b>í</b> </th>
    <td> <i>comí</i> </td>
    <td> <i>viví</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th width="100px"> -<b>iste</b> </th>
    <td> <i>comiste</i> </td>
    <td> <i>viviste</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él</i><br></br>
    <i>ella</i><br></br>
    <i>ello</i></td>
    <th width="100px"> -<b>ió</b></th>
    <td> <i>comió</i> </td>
    <td> <i>vivió</i> </td>
</tr>
<tr>
    <td rowspan="3"> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th width="100px"> -<b>imos</b> </th>
    <td> <i>comimos</i> </td>
    <td> <i>vivimos</i> </td>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th width="100px"> -<b>isteis</b> </th>
    <td> <i>comisteis</i> </td>
    <td> <i>vivisteis</i> </td>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th width="100px"> -<b>ieron</b> </th>
    <td> <i>comieron</i> </td>
    <td> <i>vivieron</i> </td>
</tr>
</tbody>
</table>  
</TabItem>
  <TabItem value="full" label="Alla ändelser" default>
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
    <th width="100px"> -<b>é</b> </th>
    <th colspan="2" width="100px"> -<b>í</b> </th>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th width="100px"> -<b>aste</b> </th>
    <th colspan="2" width="100px"> -<b>iste</b> </th>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él</i><br></br>
    <i>ella</i><br></br>
    <i>ello</i></td>
    <th width="100px"> -<b>ó</b> </th>
    <th colspan="2" width="100px"> -<b>ió</b> </th>
</tr>
<tr>
    <td rowspan="3"> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th width="100px"> -<b>amos</b> </th>
    <th colspan="2" width="100px"> -<b>imos</b> </th>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th width="100px"> -<b>asteis</b> </th>
    <th colspan="2" width="100px"> -<b>isteis</b> </th>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th width="100px"> -<b>eron</b> </th>
    <th colspan="2" width="100px"> -<b>ieron</b> </th>
</tr>
</tbody>
</table>  
</TabItem>
</Tabs>

---

## Klurigheter

I preteritum förekommer fyra sorters klurigheter:

- 🦺 **Reflexiva verb**
- 🦄 **Vokalskiftande verb**
- 🔄 **Verb som slutar på -zar, -gar och -car**
- 🖕 **Oregelbundna verb**

### <Highlight color="#ff4802">Reflexiva verb</Highlight>

<table>
  <tbody>
  <tr>
      <td rowspan="3"> **singular**</td>
      <td> **1:a**</td>
      <td> *yo*</td>
      <td> **me**</td>
      <td> *bañé*</td>
      <td rowspan="3"> **plural**</td>
      <td> **1:a**</td>
      <td> *nosotros*</td>
      <td> **nos**</td>
      <td> *bañamos*</td>
      </tr>
    <tr>
      <td> **2:a**</td>
      <td> *tú*</td>
      <td> **te**</td>
      <td> *bañaste*</td>
      <td> **2:a**</td>
      <td> *vosotros*</td>
      <td> **os**</td>
      <td> *bañasteis*</td>
    </tr>
    <tr>
      <td> **3:e**</td>
      <td> *él    
      ella       
      ello*</td>
      <td> **se**</td>
      <td> *bañó*</td>
      <td> **3:e**</td>
      <td> *ellos*</td>
      <td> **se**</td>
      <td> *bañaron*</td>
    </tr>
  </tbody>
</table> 

#### Exempel
 
<div class="custom-quote">  
**Me bañé** en el mar ayer.   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag badade i havet igår.*</small>    
¿**Te duchaste** hoy?   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Duschade du idag?*</small>    
Creen que **os relajasteis** todo el tiempo.   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *De tror att ni chillade hela tiden.*</small> 
</div>

### <Highlight color="#ff4802">Vokalskiftande verb</Highlight>

I preteritum erfar vokalskiftande verb en vokalförändring för alla personer utom **nosotros** och **vosotros**.

- **e** ➡️ **i**

<table>
  <tbody>
  <tr>
      <td rowspan="3"> **singular**</td>
      <td> **1:a**</td>
      <td> *yo*</td>
      <td> *pido*</td>
      <td rowspan="3"> **plural**</td>
      <td> **1:a**</td>
      <td> *nosotros*</td>
      <td> *pedimos*</td>
      </tr>
    <tr>
      <td> **2:a**</td>
      <td> *tú*</td>
      <td> *pides*</td>
      <td> **2:a**</td>
      <td> *vosotros*</td>
      <td> *pedís*</td>
    </tr>
    <tr>
      <td> **3:e**</td>
      <td> *él    
      ella       
      ello*</td>
      <td> *p**i**dió*</td>
      <td> **3:e**</td>
      <td> *ellos*</td>
      <td> *p**i**dieron*</td>
    </tr>
  </tbody>
</table>

#### Exempel
 
<div class="custom-quote">  
¿Qué p**i**dió?   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Vad beställde han?*</small>    
Ayer rep**i**tieron todo.   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Igår upprepade de allt.*</small>     
Me s**i**rvieron comida rica.   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *De serverade mig god mat.*</small>
</div>

### <Highlight color="#ff4802">Verb som slutar på -zar, -gar och -car</Highlight>

🦄 **Verb som slutar på -zar, -gar och -car** genom går en stavningsförändring i preteritum när de böjs i **första person**.

- **-zar** ➡️ **-cé**
- **-gar** ➡️ **-gué**
- **-car** ➡️ **-qué**

<table>
  <tbody>
  <tr>
      <td></td>
      <td> **Empezar**</td>
      <td> **Llegar**</td>
      <td> **Dedicar**</td>
  </tr>
  <tr>
      <td> **Yo**</td>
      <td><span style={{color: 'green'}}>*empecé*</span></td>
      <td> <span style={{color: 'green'}}>*llegué*</span></td>
      <td><span style={{color: 'green'}}>*dediqué*</span></td>
  </tr>
  </tbody>
</table>

### <Highlight color="#ff4802">Oregelbundna verb</Highlight>

<table>
  <thead>
    <tr>
      <th> Person</th>
      <th> Decir</th>
      <th> Hacer</th>
      <th> Ser & Ir</th>
      <th> Estar</th>
      <th> Poner</th>
      <th> Tener</th>
      <th> Ver</th>
      <th> Dar</th>
      <th> Venir</th>
      <th> Saber</th>
      <th> Haber</th>
      <th> Oír</th>
      <th> Conducir</th>
      <th> Traer</th>
      <th> Caber</th>
      <th> Caer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**Yo**</td>
      <td><span style={{color: 'red'}}>dije</span></td>
      <td><span style={{color: 'red'}}>hice</span></td>
      <td><span style={{color: 'red'}}>fui</span></td>
      <td><span style={{color: 'red'}}>estuve</span></td>
      <td><span style={{color: 'red'}}>puse</span></td>
      <td><span style={{color: 'red'}}>tuve</span></td>
      <td><span style={{color: 'red'}}>vi</span></td>
      <td><span style={{color: 'red'}}>di</span></td>
      <td><span style={{color: 'red'}}>vine</span></td>
      <td><span style={{color: 'red'}}>supe</span></td>
      <td><span style={{color: 'red'}}>hube</span></td>
      <td>oí</td>
      <td><span style={{color: 'red'}}>conduje</span></td>
      <td><span style={{color: 'red'}}>traje</span></td>
      <td><span style={{color: 'red'}}>cupe</span></td>
      <td>caí</td>
    </tr>
    <tr>
      <td>**Tú**</td>
      <td><span style={{color: 'red'}}>dijiste</span></td>
      <td><span style={{color: 'red'}}>hiciste</span></td>
      <td><span style={{color: 'red'}}>fuiste</span></td>
      <td><span style={{color: 'red'}}>estuviste</span></td>
      <td><span style={{color: 'red'}}>pusiste</span></td>
      <td><span style={{color: 'red'}}>tuviste</span></td>
      <td> viste</td>
      <td><span style={{color: 'red'}}>diste</span></td>
      <td><span style={{color: 'red'}}>viniste</span></td>
      <td><span style={{color: 'red'}}>supiste</span></td>
      <td><span style={{color: 'red'}}>hubiste</span></td>
      <td><span style={{color: 'red'}}>oíste</span></td>
      <td><span style={{color: 'red'}}>condujiste</span></td>
      <td><span style={{color: 'red'}}>trajiste</span></td>
      <td><span style={{color: 'red'}}>cupiste</span></td>
      <td><span style={{color: 'red'}}>caíste</span></td>
    </tr>
    <tr>
      <td>**Él, ella**</td>
      <td><span style={{color: 'red'}}>dijo</span></td>
      <td><span style={{color: 'red'}}>hizo</span></td>
      <td><span style={{color: 'red'}}>fue</span></td>
      <td><span style={{color: 'red'}}>estuvo</span></td>
      <td><span style={{color: 'red'}}>puso</span></td>
      <td><span style={{color: 'red'}}>tuvo</span></td>
      <td><span style={{color: 'red'}}>vio</span></td>
      <td><span style={{color: 'red'}}>dio</span></td>
      <td><span style={{color: 'red'}}>vino</span></td>
      <td><span style={{color: 'red'}}>supo</span></td>
      <td><span style={{color: 'red'}}>hubo</span></td>
      <td><span style={{color: 'red'}}>oyó</span></td>
      <td><span style={{color: 'red'}}>condujo</span></td>
      <td><span style={{color: 'red'}}>trajo</span></td>
      <td><span style={{color: 'red'}}>cupo</span></td>
      <td><span style={{color: 'red'}}>cayó</span></td>
    </tr>
    <tr>
      <td>**Nosotros**</td>
      <td><span style={{color: 'red'}}>dijimos</span></td>
      <td><span style={{color: 'red'}}>hicimos</span></td>
      <td><span style={{color: 'red'}}>fuimos</span></td>
      <td><span style={{color: 'red'}}>estuvimos</span></td>
      <td><span style={{color: 'red'}}>pusimos</span></td>
      <td><span style={{color: 'red'}}>tuvimos</span></td>
      <td> vimos</td>
      <td><span style={{color: 'red'}}>dimos</span></td>
      <td><span style={{color: 'red'}}>vinimos</span></td>
      <td><span style={{color: 'red'}}>supimos</span></td>
      <td><span style={{color: 'red'}}>hubimos</span></td>
      <td><span style={{color: 'red'}}>oímos</span></td>
      <td><span style={{color: 'red'}}>condujimos</span></td>
      <td><span style={{color: 'red'}}>trajimos</span></td>
      <td><span style={{color: 'red'}}>cupimos</span></td>
      <td><span style={{color: 'red'}}>caímos</span></td>
    </tr>
    <tr>
      <td>**Vosotros**</td>
      <td><span style={{color: 'red'}}>dijisteis</span></td>
      <td><span style={{color: 'red'}}>hicisteis</span></td>
      <td><span style={{color: 'red'}}>fuisteis</span></td>
      <td><span style={{color: 'red'}}>estuvisteis</span></td>
      <td><span style={{color: 'red'}}>pusisteis</span></td>
      <td><span style={{color: 'red'}}>tuvisteis</span></td>
      <td> visteis</td>
      <td><span style={{color: 'red'}}>disteis</span></td>
      <td><span style={{color: 'red'}}>vinisteis</span></td>
      <td><span style={{color: 'red'}}>supisteis</span></td>
      <td><span style={{color: 'red'}}>hubisteis</span></td>
      <td><span style={{color: 'red'}}>oísteis</span></td>
      <td><span style={{color: 'red'}}>condujisteis</span></td>
      <td><span style={{color: 'red'}}>trajisteis</span></td>
      <td><span style={{color: 'red'}}>cupisteis</span></td>
      <td><span style={{color: 'red'}}>caísteis</span></td>
    </tr>
    <tr>
      <td>**Ellos**</td>
      <td><span style={{color: 'red'}}>dijeron</span></td>
      <td><span style={{color: 'red'}}>hicieron</span></td>
      <td><span style={{color: 'red'}}>fueron</span></td>
      <td><span style={{color: 'red'}}>estuvieron</span></td>
      <td><span style={{color: 'red'}}>pusieron</span></td>
      <td><span style={{color: 'red'}}>tuvieron</span></td>
      <td> vieron</td>
      <td><span style={{color: 'red'}}>dieron</span></td>
      <td><span style={{color: 'red'}}>vinisteis</span></td>
      <td><span style={{color: 'red'}}>supisteis</span></td>
      <td><span style={{color: 'red'}}>hubieron</span></td>
      <td><span style={{color: 'red'}}>oyeron</span></td>
      <td><span style={{color: 'red'}}>condujeron</span></td>
      <td><span style={{color: 'red'}}>trajeron</span></td>
      <td><span style={{color: 'red'}}>cupieron</span></td>
      <td><span style={{color: 'red'}}>cayeron</span></td>
    </tr>
  </tbody>
</table>

:::info OBS

Vissa verb har ett oregelbundet verb "inbyggt" i sig, t.ex. con**tener**, su**poner** och con**venir**.

Dessa blir ***contuve***, ***supuse***, ***convine*** etc.

:::


