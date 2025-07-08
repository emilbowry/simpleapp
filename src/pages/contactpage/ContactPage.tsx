import React from 'react';
import styles from './ContactPage.module.css';
import globalstyles from '../../GlobalStyles.module.css';


// Reuse the assets from the previous pages
import logo from '../../assets/logo.svg'; // Assuming this is the large logo
import backgroundPattern from '../../assets/background.png';
import { createCallingCard } from '../../components/callingcard/CallingCard';

const ContactPageBody : React.FC = () => {
  return(
        <div className={styles.contactText}>
          <h2>Reach Joe at:</h2>
          <p>
            Email: <a href="mailto:Joe@aicompatible.co.uk">Joe@aicompatible.co.uk</a>
          </p>
          <p>
            Linkedin: <a href="https://www.linkedin.com/in/joe-fennell-379466170/" target="_blank" rel="noopener noreferrer">Joe Fennell</a>
          </p>
        </div>
)}



export const ContactPage: React.FC = () => {
  const ccElement = createCallingCard({ Body: ContactPageBody, ratio: 0.8 });

  return (
    <div className={styles.contactPageWrapper}>
    {ccElement}

      <div
        className={globalstyles.backgroundPattern}
        style={{ backgroundImage: `url(${backgroundPattern})` }}
      ></div>
    </div>
  );
};