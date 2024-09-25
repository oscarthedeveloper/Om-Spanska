---
sidebar_position: 3
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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Highlight color="var(--highlight)">Numerus</Highlight>

Substantiv böjs efter 👱‍♀️ [genus](/docs/Substantiv/Genus) och 🔢 [numerus](/docs/Substantiv/Numerus). Ett substantiv kan vara **maskulint** eller **feminint**, och i **singular** eller i **plural**.

I spanskan finns **två** numerus:

- 1️⃣ **Singular**
- 2️⃣ **Plural**

Precis som i 🇸🇪 **svenskan** används **singular** för att beteckna **en sak** och **plural** för att beteckna **flera saker**.

## <Highlight color="#ff4802">Bildning av plural</Highlight>

För att bilda plural av ett substantiv är **genus** inte intressant. Det är ganska simpelt: man lägger på ett **-s**, och slutar det på en konsonant lägger man på ett **-es**.

<Tabs>
  <TabItem value="vokal" label="Vokal" default>
<table>
  <tbody>
    <tr>
      <td> </td>
      <td>**Singular**</td>
      <td>**Plural**</td>
    </tr>
    <tr>
      <td>**Maskulinum**</td>
      <td> el perro</td>
      <td> los perro**s**</td>
    </tr>
      <td>**Femininum**</td>
      <td> la casa</td>
      <td> las casa**s**</td>
  </tbody>
</table>
  </TabItem>
  <TabItem value="konsonant" label="Konsonant">
<table>
  <tbody>
    <tr>
      <td> </td>
      <td>**Singular**</td>
      <td>**Plural**</td>
    </tr>
    <tr>
      <td>**Maskulinum**</td>
      <td> el papel</td>
      <td> los papel**es**</td>
    </tr>
      <td>**Femininum**</td>
      <td> la catedral</td>
      <td> las casadral**es**</td>
  </tbody>
</table>
  </TabItem>
</Tabs>

### <Highlight color="#ff4802">Substantiv som slutar på -z</Highlight>

Substantiv som slutar på **-z** genomgår en stavningsförändring där **-z** omvandlas till **-ces** i **plural**.

| Singular | Plural          |
| -------- | --------------- |
| la vez    | las ve**ces**     |
| la voz    | las vo**ces**  |  