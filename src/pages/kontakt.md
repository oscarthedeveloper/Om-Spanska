---
title: Kontakt
id: kontakt
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

# <Highlight color="var(--highlight)">Kontakt</Highlight>

Denna hemsida är ett **pågående arbete** och **uppdateras ständigt** för bästa upplevelse. Om du har en **fråga**, **förfrågan** eller bara ett **meddelande** så kan du skriva det nedan. 

<form name="kontact" method="POST" data-netlify="true" action="/tack">
  <input type="hidden" name="form-name" value="contact" />
  <p>
<label><strong>Ditt namn:</strong></label>      
<input type="text" name="name" />
  </p>
  <p>
    <label><strong>Din e-mail:</strong></label>      
    <input type="email" name="email" />
  </p>
  <p>
    <label><strong>Ditt meddelande:</strong></label>     
    <textarea name="message"></textarea>
  </p>
  <p>
    <button type="submit">Skicka</button>
  </p>
 </form>
