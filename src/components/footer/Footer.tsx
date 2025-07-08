import React from 'react';
import logo from '../../assets/logo.svg';
import styles from './Footer.module.css';
import globalstyles from '../../GlobalStyles.module.css' ;
import { createCallingCard } from '../callingcard/CallingCard';
const FooterBody : React.FC = () => {
	return(
		<h1 >
		The way to be 'AI-first' is to <em>explore AI first</em>
		</h1>
)}



export const Footer: React.FC = () => {
  const ccElement = createCallingCard({ Body: FooterBody, ratio: 0.3 });

  return (
    <section className={styles.footer}>
      {ccElement} 
    </section>
  );
};