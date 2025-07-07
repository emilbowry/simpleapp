import React from 'react';
import logo from '../../assets/logo.svg';
import styles from './Footer.module.css';
import globalstyles from '../../GlobalStyles.module.css' ;


export const Footer: React.FC = () => {
	return(
		<footer className={globalstyles.body}>

			<section className={styles.footer}>


				<div>

				<h1 >
				The way to be 'AI-first' is to <em>explore AI first</em>
				</h1>
				</div>

				<div className={styles.logobox}>
				<img src={logo} alt="AI Compatible logo"/>

				</div>
			</section>

		</footer>


)
};
