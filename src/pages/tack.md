---
title: Tack
id: tack
slug: /tack
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

# <Highlight color="var(--highlight)">Tack!</Highlight>

Ditt meddelande har skickats ✅

Med vänliga hälsningar 🕺😊
