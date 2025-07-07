// src/features/hero/Hero.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { setHeroText } from './heroSlice';
import logo from '../../assets/logo.svg';  // now resolves correctly
import styles from './Hero.module.css';


export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <h1 className={styles.title}>
          AI Compatible<br/>ltd
        </h1>

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

        <p className={styles.tagline}>
          <em>Not everyone needs to be an AI expert. But everyone needs to be AI compatible.</em>
        </p>
      </div>

      <div className={styles.right}>
        <img src={logo} alt="AI Compatible logo" className={styles.logo}/>
      </div>
    </section>
  )
}