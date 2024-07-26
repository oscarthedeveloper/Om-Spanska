import React, { useState } from 'react';
import './TableSwitch.css';

const KonjunktivIMPERIR = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="table-switch">
      <div className="switch-container">
        <label className="switch">
          <input type="checkbox" checked={isChecked} onChange={handleToggle} />
          <span className="slider"></span>
        </label>
        <span className="switch-label">{isChecked ? 'Konjunktiv' : 'Indikativ'}</span>
      </div>
      <div className="table-container">
        {isChecked ? (
          <table className="table-content konjunktiv">
<tbody>
<tr>
    <td rowspan="3"> <b>Singular</b></td>
    <td> <b>1:a</b></td>
    <td> <i>yo</i></td>
    <th width="150px"> <span style={{ color: '#d83d01' }}> -iera </span></th>
    <th width="150px"> <span style={{ color: '#d83d01' }}> -iese </span></th>
    <td> <i>comiera</i> </td>
    <td> <i>viviera</i> </td>
    <td> <i>comiese</i> </td>
    <td> <i>viviese</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th width="150px"> <span style={{ color: '#d83d01' }}> -ieras </span></th>
    <th width="150px"> <span style={{ color: '#d83d01' }}> -ieses </span></th>
    <td> <i>comieras</i> </td>
    <td> <i>vivieras</i> </td>
    <td> <i>comieses</i> </td>
    <td> <i>vivieses</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él</i><br></br>
    <i>ella</i><br></br>
    <i>ello</i></td>
    <th width="150px"> <span style={{ color: '#d83d01' }}> -iera </span></th>
    <th width="150px"> <span style={{ color: '#d83d01' }}> -iese </span></th>
    <td> <i>comiera</i> </td>
    <td> <i>viviera</i> </td>
    <td> <i>comiese</i> </td>
    <td> <i>viviese</i> </td>
</tr>
<tr>
    <td rowspan="3"> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th width="150px"> <span style={{ color: '#d83d01' }}> -iéramos </span></th>
    <th width="150px"> <span style={{ color: '#d83d01' }}> -iésemos </span></th>
    <td> <i>comiéramos</i> </td>
    <td> <i>viviéramos</i> </td>
    <td> <i>comiésemos</i> </td>
    <td> <i>viviésemos</i> </td>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th width="150px"> <span style={{ color: '#d83d01' }}> -ierais </span></th>
    <th width="150px"> <span style={{ color: '#d83d01' }}> -ieseis </span></th>
    <td> <i>comierais</i> </td>
    <td> <i>vivierais</i> </td>
    <td> <i>comieseis</i> </td>
    <td> <i>vivieseis</i> </td>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th width="150px"> <span style={{ color: '#d83d01' }}> -ieran </span></th>
    <th width="150px"> <span style={{ color: '#d83d01' }}> -iesen </span></th>
    <td> <i>comieran</i> </td>
    <td> <i>vivieran</i> </td>
    <td> <i>comiesen</i> </td>
    <td> <i>viviesen</i> </td>
</tr>
</tbody>
</table>  
        ) : (
          <table className="table-content indikativ">
<tbody>
<tr>
    <td rowspan="3"> <b>Singular</b></td>
    <td> <b>1:a</b></td>
    <td> <i>yo</i></td>
    <th width="100px"> <b>ía</b></th>
    <td> <i>comía</i> </td>
    <td> <i>vivía</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th width="100px"> <b>ías</b></th>
    <td> <i>comías</i> </td>
    <td> <i>vivías</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él</i><br></br>
    <i>ella</i><br></br>
    <i>ello</i></td>
    <th width="100px"> <b>ía</b></th>
    <td> <i>comía</i> </td>
    <td> <i>vivía</i> </td>
</tr>
<tr>
    <td rowspan="3"> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th width="100px"> <b>íamos</b></th>
    <td> <i>comíamos</i> </td>
    <td> <i>vivíamos</i> </td>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th width="100px"> <b>íais</b></th>
    <td> <i>comíais</i> </td>
    <td> <i>vivíais</i> </td>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th width="100px"> <b>ían</b></th>
    <td> <i>comían</i> </td>
    <td> <i>vivían</i> </td>
</tr>
</tbody>
</table>  
        )}
      </div>
    </div>
  );
};

export default KonjunktivIMPERIR;