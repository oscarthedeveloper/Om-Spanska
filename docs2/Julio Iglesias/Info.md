---
title: Info
sidebar_position: 1
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

# <Highlight color="var(--highlight)">Julio Iglesias</Highlight>

<div class="text-and-image-container">
  <div class="image">
    <img src="/img/julio_cool.jpeg" alt="Example Image"/>
  </div>
  <div class="text">
    <p> **Julio Iglesias** är Spaniens mest säljande sångare genom tiderna. Han är känd för sina lugna, kärleksfulla och harmoniska låtar, men även för att han var en riktig tjejtjusare. </p>

    <p> Hans musik är väldig skön att spela i bakgrunden om man t.ex. äter middag eller bara vill ha lite skön musik att ha i bakgrunden under en lugn och härlig sommarkväll.</p>
  </div>
</div>

<div class="text-and-image-container">
  <div class="text">
    <p> **Julio** studerade juridik och var målvakt i *Real Madrid Castilla* på professionell nivå, men efter en skada blev drömmen om en karriär i fotboll omöjlig.</p>

    <p> På sjukhuset hade han inget annat att göra än att spela på sin gitarr, vilket blev starten på hans musikala karriär. Hans son **Enrique Iglesias** har gått i samma musikaliska fotspår som sin far, och är också en mycket framgångsrik artist.</p>
  </div>
  <div class="image">
    <img src="/img/julio_tjejtjusare.jpeg" alt="Example Image"/>
  </div>
</div>

---

Här kan du få höra en liten snutt av några av hans mest spelade låtar.

<iframe src="https://open.spotify.com/embed/artist/4etuCZVdP8yiNPn4xf0ie5?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>