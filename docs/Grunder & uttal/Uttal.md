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

# <Highlight color="#0b00d1">Uttal</Highlight>

Uttalet i spanska är inte precis som i svenskan, men beroende på dialekt kan det vara olika svårt. Det är nog lättare för en göteborgare än vad det är för en skåning. 

## <Highlight color="#ff4802">Uttal av alfabetet</Highlight>

<div class="bokstavstable">  
<p>
<table>
  <thead>
    <tr>
      <th> Bokstav</th>
      <th> Namn</th>
      <th> Uttal</th>
      <th> IPA</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">A a</div></div></td>
      <td> **a**</td>
      <td><figure>
  <audio controls src="/audio/a.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[a]</div></div></td>
    </tr>
  </tbody>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">B b</div></div></td>
      <td> **be**</td>
      <td><figure>
  <audio controls src="/audio/b.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[β]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">C c</div></div></td>
      <td> **ce**</td>
      <td><figure>
  <audio controls src="/audio/c.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[k, θ, s]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">D d</div></div></td>
      <td> **de**</td>
      <td><figure>
  <audio controls src="/audio/d.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[d]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">E e</div></div></td>
      <td> **e**</td>
      <td><figure>
  <audio controls src="/audio/e.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[e, ɛ]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">F f</div></div></td>
      <td> **efe**</td>
      <td><figure>
  <audio controls src="/audio/f.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[f]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">G g</div></div></td>
      <td> **ge**</td>
      <td><figure>
  <audio controls src="/audio/g.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[g, x]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">H h</div></div></td>
      <td> **hache**</td>
      <td><figure>
  <audio controls src="/audio/h.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[ ]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">I i</div></div></td>
      <td> **i**</td>
      <td><figure>
  <audio controls src="/audio/i.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[i, j]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">J j</div></div></td>
      <td> **jota**</td>
      <td><figure>
  <audio controls src="/audio/j.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[x]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">K k</div></div></td>
      <td> **ka**</td>
      <td><figure>
  <audio controls src="/audio/k.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[k]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">L l</div></div></td>
      <td> **ele**</td>
      <td><figure>
  <audio controls src="/audio/l.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[l]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">M m</div></div></td>
      <td> **eme**</td>
      <td><figure>
  <audio controls src="/audio/m.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[m]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">N n</div></div></td>
      <td> **ene**</td>
      <td><figure>
  <audio controls src="/audio/n.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[n]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">Ñ ñ</div></div></td>
      <td> **eñe**</td>
      <td><figure>
  <audio controls src="/audio/ñ.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[ɲ]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">O o</div></div></td>
      <td> **o**</td>
      <td><figure>
  <audio controls src="/audio/o.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[ɔ]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">P p</div></div></td>
      <td> **pe**</td>
      <td><figure>
  <audio controls src="/audio/p.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[p]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">Q q</div></div></td>
      <td> **cu**</td>
      <td><figure>
  <audio controls src="/audio/q.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[k]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">R r</div></div></td>
      <td> **erre**</td>
      <td><figure>
  <audio controls src="/audio/r.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[r, ɾ]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">S s</div></div></td>
      <td> **ese**</td>
      <td><figure>
  <audio controls src="/audio/s.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[s, z]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">T t</div></div></td>
      <td> **te**</td>
      <td><figure>
  <audio controls src="/audio/t.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[t]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">U u</div></div></td>
      <td> **u**</td>
      <td><figure>
  <audio controls src="/audio/u.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[u]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">V v</div></div></td>
      <td> **uve**</td>
      <td><figure>
  <audio controls src="/audio/v.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[b]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">W w</div></div></td>
      <td> **uve doble**</td>
      <td><figure>
  <audio controls src="/audio/w.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[w, bw]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">X x</div></div></td>
      <td> **equis**</td>
      <td><figure>
  <audio controls src="/audio/x.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[ks, x]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">Y y</div></div></td>
      <td> **ye**</td>
      <td><figure>
  <audio controls src="/audio/y.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[ʝ, i]</div></div></td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">Z z</div></div></td>
      <td> **zeta**</td>
      <td><figure>
  <audio controls src="/audio/z.mp3"></audio>
</figure></td>
      <td><div className="bokstavsbox-container"><div className="IPA">[θ]</div></div></td>
    </tr>
</table>
</p>
</div>

:::info Vad är IPA?

Det *internationella fonetiska alfabetet*, förkortat **IPA**, är ett fonetiskt alfabet. Det används inom lingvistiken för att så tydligt som möjligt representera språkljud som återfinns i de talade språken.

:::

:::danger H

Observera att **H** inte uttalas.

:::

## <Highlight color="#ff4802">Bokstävernas uttal i ord</Highlight>

<div class="bokstavstable">  
<p>
<table>
  <thead>
    <tr>
      <th> Bokstav</th>
      <th> Exempel</th>
      <th> Uttal</th>
      <th> Bokstavens uttal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">A a</div></div></td>
      <td> **casa**</td>
      <td><figure>
  <audio controls src="/audio/casa.mp3"></audio>
</figure></td>
      <td>uttalas som **ah** på svenska</td>
    </tr>
  </tbody>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">B b</div></div></td>
      <td> **beber**</td>
      <td><figure>
  <audio controls src="/audio/beber.mp3"></audio>
</figure></td>
      <td>uttalas som **beh** på svenska</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">C c</div></div></td>
      <td> **cerca**</td>
      <td><figure>
  <audio controls src="/audio/cerca.mp3"></audio>
</figure></td>
      <td>uttalas som **k** när den följs av ett **a**, **o** eller **u**, men som **s** när den följs av ett **e** eller **i**</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">D d</div></div></td>
      <td> **adelante**</td>
      <td><figure>
  <audio controls src="/audio/adelante.mp3"></audio>
</figure></td>
<td> uttalas som **deh**</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">E e</div></div></td>
      <td> **espero**</td>
      <td><figure>
  <audio controls src="/audio/espero.mp3"></audio>
</figure></td>
      <td> uttalas som **eh**</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">F f</div></div></td>
      <td> **frío**</td>
      <td><figure>
  <audio controls src="/audio/frío.mp3"></audio>
</figure></td>
      <td> uttalas som i svenskan</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">G g</div></div></td>
      <td> **gusto**
      **gente**</td>
      <td><figure>
  <audio controls src="/audio/gusto.mp3"></audio>
</figure><figure>
  <audio controls src="/audio/gente.mp3"></audio>
</figure></td>
<td> har ett mjukare uttal när det följs av **E** eller **I**, men ett hårdare uttal när det följs av **A** eller **U**</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">H h</div></div></td>
      <td> **habilidad**</td>
      <td><figure>
  <audio controls src="/audio/habilidad.mp3"></audio>
</figure></td>
      <td> uttalas inte!</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">I i</div></div></td>
      <td> **idea**</td>
      <td><figure>
  <audio controls src="/audio/idea.mp3"></audio>
</figure></td>
      <td> uttalas som i svenskan</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">J j</div></div></td>
      <td> **juan**</td>
      <td><figure>
  <audio controls src="/audio/juan.mp3"></audio>
</figure></td>
<td> uttalas som **sk** i **ske**</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">K k</div></div></td>
      <td> **kilómetro**</td>
      <td><figure>
  <audio controls src="/audio/kilómetro.mp3"></audio>
</figure></td>
      <td> uttalas som **k** i **kajak**</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">L l</div></div></td>
      <td> **libertad**</td>
      <td><figure>
  <audio controls src="/audio/libertad.mp3"></audio>
</figure></td>
      <td> uttalas som i svenskan</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">M m</div></div></td>
      <td> **amor**</td>
      <td><figure>
  <audio controls src="/audio/amor.mp3"></audio>
</figure></td>
      <td> uttalas som i svenskan</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">N n</div></div></td>
      <td> **natural**</td>
      <td><figure>
  <audio controls src="/audio/natural.mp3"></audio>
</figure></td>
      <td> uttalas som i svenskan</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">Ñ ñ</div></div></td>
      <td> **año**</td>
      <td><figure>
  <audio controls src="/audio/año.mp3"></audio>
</figure></td>
      <td> uttalas som **nj**</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">O o</div></div></td>
      <td> **estoy**</td>
      <td><figure>
  <audio controls src="/audio/estoy.mp3"></audio>
</figure></td>
      <td> uttalas som **o** i **och**</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">P p</div></div></td>
      <td> **pintura**</td>
      <td><figure>
  <audio controls src="/audio/pintura.mp3"></audio>
</figure></td>
      <td> uttalas som i svenskan</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">Q q</div></div></td>
      <td> **querer**</td>
      <td><figure>
  <audio controls src="/audio/querer.mp3"></audio>
</figure></td>
      <td> uttalas som **k** i **kajak**</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">R r</div></div></td>
      <td> **descubrir**</td>
      <td><figure>
  <audio controls src="/audio/descubrir.mp3"></audio>
</figure></td>
      <td> uttalas som i svenskan fast mer rullande</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">S s</div></div></td>
      <td> **siento**</td>
      <td><figure>
  <audio controls src="/audio/siento.mp3"></audio>
</figure></td>
      <td> uttals som i svenskan</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">T t</div></div></td>
      <td> **todo**</td>
      <td><figure>
  <audio controls src="/audio/todo.mp3"></audio>
</figure></td>
      <td> uttalas som i svenskan</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">U u</div></div></td>
      <td> **urbano**</td>
      <td><figure>
  <audio controls src="/audio/urbano.mp3"></audio>
</figure></td>
      <td> uttalas som **o** i **bord**</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">V v</div></div></td>
      <td> **uva**</td>
      <td><figure>
  <audio controls src="/audio/uva.mp3"></audio>
</figure></td>
      <td> uttalas likt spanskans **b**</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">W w</div></div></td>
      <td> **whisky**</td>
      <td><figure>
  <audio controls src="/audio/whisky.mp3"></audio>
</figure></td>
      <td> uttalas som **w** i engelskans **win**</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">X x</div></div></td>
      <td> **conexión**</td>
      <td><figure>
  <audio controls src="/audio/conexión.mp3"></audio>
</figure></td>
      <td> uttalas som **ks**</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">Y y</div></div></td>
      <td> **yo**</td>
      <td><figure>
  <audio controls src="/audio/yo.mp3"></audio>
</figure></td>
      <td> uttalas som **j** i **jag**</td>
    </tr>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">Z z</div></div></td>
      <td> **zapatos**</td>
      <td><figure>
  <audio controls src="/audio/zapatos.mp3"></audio>
</figure></td>
      <td> uttalas som **s**, men ofta med läspning (**th**)</td>
    </tr>
</table>
</p>
</div>

<div class="bokstavstable">  
<p>
  <table>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">Ll ll</div></div></td>
      <td> **ella**</td>
      <td><figure>
  <audio controls src="/audio/ella.mp3"></audio>
</figure></td>
      <td> uttalas som **j** i **ja**</td>
    </tr>
  <tbody>
    <tr>
      <td><div className="bokstavsbox-container"><div className="bokstavsbox">Ch ch</div></div></td>
      <td> **escuchar**</td>
      <td><figure>
  <audio controls src="/audio/escuchar.mp3"></audio>
</figure></td>
      <td> uttalas som **tch** i blixtens **katchao**</td>
    </tr>
  </tbody>
</table>
</p>
</div>