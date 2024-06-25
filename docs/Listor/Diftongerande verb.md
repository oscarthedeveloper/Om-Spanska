---
sidebar_position: 2
---

import React from 'react';
import DataTable from '/src/components/DataTable';
import data from '/src/data/DiftongerandeVerb';

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

# <Highlight color="var(--highlight)">Diftongerande verb</Highlight>

<DataTable data={data}/>