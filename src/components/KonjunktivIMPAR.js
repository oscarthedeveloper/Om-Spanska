import React, { useState } from 'react';
import './TableSwitch.css';

const KonjunktivIMPAR = () => {
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
    <th width="100px"> <span style={{ color: '#d83d01' }}> -ara </span></th>
    <th width="100px"> <span style={{ color: '#d83d01' }}> -ase </span></th>
    <td> <i>hablara</i> </td>
    <td> <i>hablase</i> </td>
</tr>
<tr>
<td> <b>2:a</b></td>
    <td> <i>tú</i></td>
    <th width="100px"> <span style={{ color: '#d83d01' }}> -aras </span></th>
    <th width="100px"> <span style={{ color: '#d83d01' }}> -ases </span></th>
    <td> <i>hablaras</i> </td>
    <td> <i>hablases</i> </td>
  </tr>
<tr>
<td> <b>3:e</b></td>
    <td> <i>él</i><br></br>
    <i>ella</i><br></br>
    <i>ello</i></td>
    <th width="100px"> <span style={{ color: '#d83d01' }}> -ara </span></th>
    <th width="100px"> <span style={{ color: '#d83d01' }}> -ase </span></th>
    <td> <i>hablara</i> </td>
    <td> <i>hablase</i> </td>
</tr>
<tr>
    <td rowspan="3"> <b>Plural</b></td>
    <td> <b>1:a</b> </td>
    <td> <i>nosotros</i></td>
    <th width="100px"> <span style={{ color: '#d83d01' }}> -áramos </span></th>
    <th width="100px"> <span style={{ color: '#d83d01' }}> -ásemos </span></th>
    <td> <i>habláramos</i> </td>
    <td> <i>hablásemos</i> </td>
</tr>
<tr>
<td> <b>2:a</b> </td>
    <td> <i>vosotros</i></td>
    <th width="100px"> <span style={{ color: '#d83d01' }}> -arais </span></th>
    <th width="100px"> <span style={{ color: '#d83d01' }}> -aseis </span></th>
    <td> <i>hablarais</i> </td>
    <td> <i>hablaseis</i> </td>
  </tr>
<tr>
<td> <b>3:e</b> </td>
    <td> <i>ellos</i></td>
    <th width="100px"> <span style={{ color: '#d83d01' }}> -aran </span></th>
    <th width="100px"> <span style={{ color: '#d83d01' }}> -asen </span></th>
    <td> <i>hablaran</i> </td>
    <td> <i>hablasen</i> </td>
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
        )}
      </div>
    </div>
  );
};

export default KonjunktivIMPAR;