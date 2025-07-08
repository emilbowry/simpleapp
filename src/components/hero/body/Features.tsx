// src/features/hero/Features.tsx
import React from 'react';
import styles from '../Hero.module.css';



export const Features: React.FC = () => {
  return (
    <ul className={styles.features}>
      <li>
        <strong>Prompt</strong><br/>
        Engineering
      </li>
      <li>
        <strong>Matching</strong><br/>
        Tasks to Tools
      </li>
      <li>
        <strong>Developing</strong><br/>
        Ethical Policy
      </li>
    </ul>
  );
}
