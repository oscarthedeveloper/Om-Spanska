---
sidebar_position: 6
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

# Imperfekt

Imperfekt används i 🇪🇸 spanskan när man pratar om:

- 🌃 **beskrivningar i dåtid**
- 🏌️‍♂️ **vanor i dåtid**
- ⬅️ **något som pågick**
- 🙏🏼 **en artig förfrågan**

## Exempel

### <Highlight color="#ff4802">Vid beskrivningar i dåtid</Highlight>
 
<div class="custom-quote">  
El sol **brillaba**. No **había** nadie en la playa. Solo **tomábamos** el sol y **leíamos**.   
</div>

### <Highlight color="#ff4802">För att återge vanor i dåtid</Highlight>
 
<div class="custom-quote">  
Cuando **hacía** sol, **cenábamos** en la terraza.   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *När det var soligt åt vi på terrassen.*</small>    
Yo siempre **comía** en este café.    
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag åt alltid på detta café.*</small>    
**¿Solías** jugar al fútbol?    
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Brukade du spela fotboll?*</small>
</div>

### <Highlight color="#ff4802">Om något som pågick</Highlight>
 
<div class="custom-quote">  
**Hacía** frío cuando llegaron.   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Det var kallt när de kom fram.*</small>    
En 1983 **vivían** en Estocolmo.    
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *1983 bodde de i Stockholm.*</small>    
Te pregunté de dónde **venías**.    
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag frågade dig var du kom ifrån.*</small>     
</div>

### <Highlight color="#ff4802">För att uttrycka en artig förfrågan</Highlight>
 
<div class="custom-quote">  
**Quería** preguntarle algo.   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag ville fråga dig något.*</small>    
Me **preguntaba** si usted aún lo **tenía**.    
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag undrade om du fortfarande har den.*</small>    
</div>

## Bildning

Alla spanska verb har en **stam** (den del som förblir oförändrad) och en **ändelse** (som visar vem som gör något). I imperfekt byts verbets ändelse ut mot följande:

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
    <th width="100px"> -<b>aba</b> </th>
    <td> <i>hablaba</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th width="100px"> -<b>abas</b> </th>
    <td> <i>hablabas</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él</i><br></br>
    <i>ella</i><br></br>
    <i>ello</i></td>
    <th width="100px"> -<b>aba</b></th>
    <td> <i>hablaba</i> </td>
</tr>
<tr>
    <td rowspan="3"> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th width="100px"> -<b>ábamos</b> </th>
    <td> <i>hablábamos</i> </td>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th width="100px"> -<b>abais</b> </th>
    <td> <i>hablabais</i> </td>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th width="100px"> -<b>aban</b> </th>
    <td> <i>hablaban</i> </td>
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
    <th width="100px"> -<b>ía</b> </th>
    <td> <i>comía</i> </td>
    <td> <i>vivía</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th width="100px"> -<b>ías</b> </th>
    <td> <i>comías</i> </td>
    <td> <i>vivías</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él</i><br></br>
    <i>ella</i><br></br>
    <i>ello</i></td>
    <th width="100px"> -<b>ía</b></th>
    <td> <i>comía</i> </td>
    <td> <i>vivía</i> </td>
</tr>
<tr>
    <td rowspan="3"> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th width="100px"> -<b>íamos</b> </th>
    <td> <i>comíamos</i> </td>
    <td> <i>vivíamos</i> </td>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th width="100px"> -<b>íais</b> </th>
    <td> <i>comíais</i> </td>
    <td> <i>vivíais</i> </td>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th width="100px"> -<b>ían</b> </th>
    <td> <i>comían</i> </td>
    <td> <i>vivían</i> </td>
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
    <th width="100px"> -<b>aba</b> </th>
    <th colspan="2" width="100px"> -<b>ías</b> </th>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th width="100px"> -<b>abas</b> </th>
    <th colspan="2" width="100px"> -<b>ías</b> </th>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él</i><br></br>
    <i>ella</i><br></br>
    <i>ello</i></td>
    <th width="100px"> -<b>aba</b> </th>
    <th colspan="2" width="100px"> -<b>ía</b> </th>
</tr>
<tr>
    <td rowspan="3"> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th width="100px"> -<b>ábamos</b> </th>
    <th colspan="2" width="100px"> -<b>íamos</b> </th>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th width="100px"> -<b>abais</b> </th>
    <th colspan="2" width="100px"> -<b>íais</b> </th>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th width="100px"> -<b>aban</b> </th>
    <th colspan="2" width="100px"> -<b>ían</b> </th>
</tr>
</tbody>
</table>  
</TabItem>
</Tabs>

---

## Klurigheter

I imperfekt förekommer två sorters klurigheter:

- 🦺 **Reflexiva verb**
- 🖕 **Oregelbundna verb**

### <Highlight color="#ff4802">Reflexiva verb</Highlight>

<table>
  <tbody>
  <tr>
      <td rowspan="3"> **singular**</td>
      <td> **1:a**</td>
      <td> *yo*</td>
      <td> **me**</td>
      <td> *bañaba*</td>
      <td rowspan="3"> **plural**</td>
      <td> **1:a**</td>
      <td> *nosotros*</td>
      <td> **nos**</td>
      <td> *bañábamos*</td>
      </tr>
    <tr>
      <td> **2:a**</td>
      <td> *tú*</td>
      <td> **te**</td>
      <td> *bañabas*</td>
      <td> **2:a**</td>
      <td> *vosotros*</td>
      <td> **os**</td>
      <td> *bañabais*</td>
    </tr>
    <tr>
      <td> **3:e**</td>
      <td> *él    
      ella       
      ello*</td>
      <td> **se**</td>
      <td> *bañaba*</td>
      <td> **3:e**</td>
      <td> *ellos*</td>
      <td> **se**</td>
      <td> *bañaban*</td>
    </tr>
  </tbody>
</table> 
 
#### Exempel

<div class="custom-quote">  
**Me bañaba** en el mar cada domingo.   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag badade i havet varje söndag.*</small>    
¿**Te duchabas** por las mañanas?   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Duchade du på morgnarna?*</small>    
Creen que **os relajabais** todo el tiempo.   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *De tror att ni chillade hela tiden.*</small> 
</div>

### <Highlight color="#ff4802">Oregelbundna verb</Highlight>

I imperfekt finns det endast **tre** oregelbundna verb! 😄

<table>
  <thead>
    <tr>
      <th> Person</th>
      <th> Ser</th>
      <th> Ver</th>
      <th> Ir</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**Yo**</td>
      <td><span style={{color: 'red'}}>era</span></td>
      <td><span style={{color: 'red'}}>veía</span></td>
      <td><span style={{color: 'red'}}>iba</span></td>
    </tr>
    <tr>
      <td>**Tú**</td>
      <td><span style={{color: 'red'}}>eras</span></td>
      <td><span style={{color: 'red'}}>veías</span></td>
      <td><span style={{color: 'red'}}>ibas</span></td>
    </tr>
    <tr>
      <td>**Él, ella**</td>
      <td><span style={{color: 'red'}}>era</span></td>
      <td><span style={{color: 'red'}}>veía</span></td>
      <td><span style={{color: 'red'}}>iba</span></td>
    </tr>
    <tr>
      <td>**Nosotros**</td>
      <td><span style={{color: 'red'}}>éramos</span></td>
      <td><span style={{color: 'red'}}>veíamos</span></td>
      <td><span style={{color: 'red'}}>íbamos</span></td>
    </tr>
    <tr>
      <td>**Vosotros**</td>
      <td><span style={{color: 'red'}}>erais</span></td>
      <td><span style={{color: 'red'}}>veíais</span></td>
      <td><span style={{color: 'red'}}>ibais</span></td>
    </tr>
    <tr>
      <td>**Ellos**</td>
      <td><span style={{color: 'red'}}>eran</span></td>
      <td><span style={{color: 'red'}}>veían</span></td>
      <td><span style={{color: 'red'}}>iban</span></td>
    </tr>
  </tbody>
</table>

#### Exempel
 
<div class="custom-quote">  
¡Yo **era** tu amigo!   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Jag var din vän!*</small>    
Siempre **ibas** al supermercado.   
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Du gick alltid till mataffären.*</small>    
**Veíamos** toda la ciudad aquí durante las madrugadas.    
&nbsp;&nbsp;&nbsp;<small>🇸🇪 *Vi såg hela staden här under solnedgångarna.*</small>  
</div>


