'use client';

import {useState} from 'react';

export default function KonjunktivAR() {
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
    <th className="endingCell"> <span className="ending"> -e </span></th>
    <td> <i>hable</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th className="endingCell"> <span className="ending"> -es </span></th>
    <td> <i>hables</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él</i><br />
    <i>ella</i><br />
    <i>ello</i></td>
    <th className="endingCell"> <span className="ending"> -e </span></th>
    <td> <i>hable</i> </td>
</tr>
<tr>
    <td rowSpan={3}> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th className="endingCell"> <span className="ending"> -emos </span></th>
    <td> <i>hablemos</i> </td>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th className="endingCell"> <span className="ending"> -éis </span></th>
    <td> <i>habléis</i> </td>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th className="endingCell"> <span className="ending"> -en </span></th>
    <td> <i>hablen</i> </td>
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
    <th className="endingCell"> -<b>o</b> </th>
    <td> <i>hablo</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th className="endingCell"> -<b>as</b> </th>
    <td> <i>hablas</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él</i><br />
    <i>ella</i><br />
    <i>ello</i></td>
    <th className="endingCell"> -<b>a</b></th>
    <td> <i>habla</i> </td>
</tr>
<tr>
    <td rowSpan={3}> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th className="endingCell"> -<b>amos</b> </th>
    <td> <i>hablamos</i> </td>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th className="endingCell"> -<b>áis</b> </th>
    <td> <i>habláis</i> </td>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th className="endingCell"> -<b>an</b> </th>
    <td> <i>hablan</i> </td>
</tr>
</tbody>
</table>  
        )}
      </div>
    </div>
  );
}
