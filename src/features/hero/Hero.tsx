// src/features/hero/Hero.tsx
import React from 'react';
import styles from './Hero.module.css';

import { Body } from './components/Body';
import { Logobox } from './components/Logobox';

export function Hero() {
  return (
    <section className={styles.hero}>
      <Body/>
      <Logobox />
    </section>
  );
}
