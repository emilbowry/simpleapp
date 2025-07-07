// src/features/hero/Logo.tsx
import React from 'react';
import styles from '../Hero.module.css';

import logo from '/src/assets/logo.svg';



export function Logobox() {
  return (
    <div className={styles.logobox}>
      <img src={logo} alt="AI Compatible logo" className={styles.logobox}/>
    </div>
  );
}
