import React from 'react';
import styles from './FounderPage.module.css';

// Assume your images are in the assets folder and named appropriately
import founderImage from 'src/assets/joefennel.png';
// import backgroundPattern from 'src/assets/background.png';
import backgroundPattern from '/src/assets/background.png';

// This is the hero section component
const FounderHero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1>Joe Fennell</h1>
          <p>Founder</p>
        </div>
        <div className={styles.heroImageContainer}>
          <img src={founderImage} alt="Joe Fennell" className={styles.heroImage} />
        </div>
      </div>
    </section>
  );
};

// This is the main page component
export const FounderPage: React.FC = () => {ß
  return (
    <div className={styles.founderPage}>
      <FounderHero />
      {/* The decorative background is a separate element that sits below the hero */}
      <div
        className={styles.backgroundPattern}
        style={{ backgroundImage: `url(${backgroundPattern})` }}
      ></div>
      {/* The next sections of the page will be added below this */}
    </div>
  );
};