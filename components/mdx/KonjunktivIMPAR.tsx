'use client';

import {useState} from 'react';

export default function KonjunktivIMPAR() {
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
    <th className="endingCell"> <span className="ending"> -ara </span></th>
    <th className="endingCell"> <span className="ending"> -ase </span></th>
    <td> <i>hablara</i> </td>
    <td> <i>hablase</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th className="endingCell"> <span className="ending"> -aras </span></th>
    <th className="endingCell"> <span className="ending"> -ases </span></th>
    <td> <i>hablaras</i> </td>
    <td> <i>hablases</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él</i><br />
    <i>ella</i><br />
    <i>ello</i></td>
    <th className="endingCell"> <span className="ending"> -ara </span></th>
    <th className="endingCell"> <span className="ending"> -ase </span></th>
    <td> <i>hablara</i> </td>
    <td> <i>hablase</i> </td>
</tr>
<tr>
    <td rowSpan={3}> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th className="endingCell"> <span className="ending"> -áramos </span></th>
    <th className="endingCell"> <span className="ending"> -ásemos </span></th>
    <td> <i>habláramos</i> </td>
    <td> <i>hablásemos</i> </td>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th className="endingCell"> <span className="ending"> -arais </span></th>
    <th className="endingCell"> <span className="ending"> -aseis </span></th>
    <td> <i>hablarais</i> </td>
    <td> <i>hablaseis</i> </td>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th className="endingCell"> <span className="ending"> -aran </span></th>
    <th className="endingCell"> <span className="ending"> -asen </span></th>
    <td> <i>hablaran</i> </td>
    <td> <i>hablasen</i> </td>
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
    <th className="endingCell"> -<b>aba</b> </th>
    <td> <i>hablaba</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th className="endingCell"> -<b>abas</b> </th>
    <td> <i>hablabas</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él</i><br />
    <i>ella</i><br />
    <i>ello</i></td>
    <th className="endingCell"> -<b>aba</b></th>
    <td> <i>hablaba</i> </td>
</tr>
<tr>
    <td rowSpan={3}> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th className="endingCell"> -<b>ábamos</b> </th>
    <td> <i>hablábamos</i> </td>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th className="endingCell"> -<b>abais</b> </th>
    <td> <i>hablabais</i> </td>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th className="endingCell"> -<b>aban</b> </th>
    <td> <i>hablaban</i> </td>
</tr>
</tbody>
</table>  
        )}
      </div>
    </div>
  );
}
