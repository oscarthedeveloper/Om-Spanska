'use client';

import {useState} from 'react';

export default function KonjunktivERIR() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="table-switch">
      <div className="switch-container">
        <label className="switch">
          <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(v => !v)} />
          <span className="slider"></span>
        </label>
        <span className="switch-label">{isChecked ? 'Konjunktiv' : 'Indikativ'}</span>
      </div>
      <div className="table-container">
        {isChecked ? (
          <table className="table-content konjunktiv">
<tbody>
<tr>
    <td rowSpan={3}> <b>Singular</b></td>
    <td> <b>1:a</b></td>
    <td> <i>yo</i></td>
    <th width="125px"> <span className="ending"> -a </span> </th>
    <td> <i>coma</i> </td>
    <td> <i>viva</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th width="125px"> <span className="ending"> -as </span> </th>
    <td> <i>comas</i> </td>
    <td> <i>vivas</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él</i><br />
    <i>ella</i><br />
    <i>ello</i></td>
    <th width="125px"> <span className="ending"> -a </span></th>
    <td> <i>coma</i> </td>
    <td> <i>viva</i> </td>
</tr>
<tr>
    <td rowSpan={3}> <b>Plural</b></td>
    <td> <b>1:a</b></td>
    <td> <i>nosotros</i></td>
    <th width="125px"> <span className="ending"> -amos </span> </th>
    <td> <i>comamos</i> </td>
    <td> <i>vivamos</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>vosotros</i></td>
    <th width="125px"> <span className="ending"> -áis </span> </th>
    <td> <i>comáis</i> </td>
    <td> <i>viváis</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>ellos</i></td>
    <th width="125px"> <span className="ending"> -an  </span> </th>
    <td> <i>coman</i> </td>
    <td> <i>vivan</i> </td>
</tr>
</tbody>
</table>  
        ) : (
          <table className="table-content indikativ">
<tbody>
<tr>
    <td rowSpan={3}> <b>Singular</b></td>
    <td> <b>1:a</b></td>
    <td> <i>yo</i></td>
    <th width="125px"> -<b>o</b> </th>
    <td> <i>como</i> </td>
    <td> <i>vivo</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th width="125px"> -<b>es</b> </th>
    <td> <i>comes</i> </td>
    <td> <i>vives</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él</i><br />
    <i>ella</i><br />
    <i>ello</i></td>
    <th width="125px"> -<b>e</b></th>
    <td> <i>come</i> </td>
    <td> <i>vive</i> </td>
</tr>
<tr>
    <td rowSpan={3}> <b>Plural</b></td>
    <td> <b>1:a</b></td>
    <td> <i>nosotros</i></td>
    <th width="125px"> -<b>emos/imos</b> </th>
    <td> <i>comemos</i> </td>
    <td> <i>vivimos</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>vosotros</i></td>
    <th width="125px"> -<b>éis/ís</b> </th>
    <td> <i>coméis</i> </td>
    <td> <i>vivís</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>ellos</i></td>
    <th width="125px"> -<b>en</b> </th>
    <td> <i>comen</i> </td>
    <td> <i>viven</i> </td>
</tr>
</tbody>
</table>  
        )}
      </div>
    </div>
  );
}
