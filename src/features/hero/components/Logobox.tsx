// src/features/hero/Logo.tsx
import React from 'react';
import styles from '../Hero.module.css';

import logo from '/src/assets/logo.svg';



export const Logobox: React.FC = () => {

  return (
    <div className={styles.logobox}>
      <img src={logo} alt="AI Compatible logo" className={styles.logobox}/>
    </div>
  );
}
