// src/features/hero/Tagline.tsx
import React from 'react';
import styles from '../Hero.module.css';




export const Tagline: React.FC = () => {
  return (
    <p className={styles.tagline}>
      <em>Not everyone needs to be an AI expert. But everyone needs to be AI compatible.</em>
    </p>
  );
}