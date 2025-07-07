import React from 'react';
import styles from '../Hero.module.css';

import { Features } from './body/Features';
import { Tagline } from './body/Tagline';
import { Title } from './body/Title';

export function Body() {
  return (
      <div className={styles.body}>
        <Title />
        <Features />
        <Tagline />
      </div>

  );
}