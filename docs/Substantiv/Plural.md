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

# Plural

Ett substantiv kan vara i antingen **singular** (t.ex. casa) eller **plural** (t.ex. casas)

Precis som i 🇸🇪 **svenskan** används **singular** för att beteckna **en sak**, och **plural** för att beteckna **flera saker**.

Att **bilda plural** är ganska simpelt: man lägger på ett **-s**, och slutar det på en konsonant lägger man på ett **-es**.

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


:::tip Substantiv som slutar på -z

Substantiv som slutar på **-z** genomgår en stavningsförändring där **-z** omvandlas till **-ces** i **plural**.

| Singular | Plural          |
| -------- | --------------- |
| la vez    | las ve**ces**     |
| la voz    | las vo**ces**  |  

:::