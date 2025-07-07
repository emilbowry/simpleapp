// src/features/hero/Logo.tsx
import React from 'react';
import logo from '../../assets/logo.svg';
import styles from './Hero.module.css';

export function Logo() {
  return (
    <div className={styles.right}>
      <img src={logo} alt="AI Compatible logo" className={styles.logo}/>
    </div>
  );
}
