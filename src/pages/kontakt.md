---
title: Kontakt
description: Hör av dig till Om Spanska med frågor, förslag eller rättelser i grammatiken.
slug: /kontakt
---

# Kontakt

Sajten byggs ut löpande. Har du en fråga, ett förslag på ett avsnitt som saknas, eller har du hittat ett fel i grammatiken — skriv det här nedan.

<form className="contactForm" name="kontakt" method="POST" data-netlify="true" action="/tack">
  <input type="hidden" name="form-name" value="kontakt" />
  <p hidden>
    <label>Lämna detta fält tomt: <input name="bot-field" /></label>
  </p>
  <div className="contactField">
    <label htmlFor="namn">Ditt namn</label>
    <input id="namn" type="text" name="namn" autoComplete="name" required />
  </div>
  <div className="contactField">
    <label htmlFor="epost">Din e-post</label>
    <input id="epost" type="email" name="epost" autoComplete="email" required />
  </div>
  <div className="contactField">
    <label htmlFor="meddelande">Ditt meddelande</label>
    <textarea id="meddelande" name="meddelande" rows="7" required></textarea>
  </div>
  <button className="pillButton pillButton--primary" type="submit">Skicka</button>
</form>
