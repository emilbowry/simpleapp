import React from 'react';
import logo from '../../assets/logo.svg';
import styles from './Footer.module.css';
import globalstyles from '../../GlobalStyles.module.css' ;
import { createCallingCard, CallingCard, addCallingCard, ICallingCard } from '../callingcard/CallingCard';
const FooterBody : React.FC = () => {
	return(
		<h1 >
		The way to be 'AI-first' is to <em>explore AI first</em>
		</h1>
)}

// export const Footer: React.FC = () => {
//   // Instead of creating an element in a variable,
//   // you declare the component directly in the return statement.
//   return (
//     <section className={styles.footer}>
//       <CallingCard Body={FooterBody} ratio={0.3} />
//     </section>
//   );
// };

// export const Footer: React.FC = () => {
//   const args: ICallingCard = { Body: FooterBody, ratio: 0.3 };
//   const ccElement = addCallingCard(args);

//   return (
//     <section className={styles.footer}>
//       {ccElement}
//     </section>
//   );
// };
export const Footer: React.FC = () => {
  const args: ICallingCard = { Body: FooterBody, ratio: 0.3 };

  const ccElement = <CallingCard {...args} />;

  return (
    <section className={styles.footer}>
      {ccElement}
    </section>
  );
};
// export const SomeReactComp: React.FC = () => {
//   const firstCallouts = [CallOutA, CallOutB, CallOut];
//   const secondCallouts = [CallOutX, CallOutY, CallOutZ];

//   const ccElement = new CallingCard({ index: 0, CallOuts: firstCallouts });
//   const ccElement2 = new CallingCard({ index: 0, CallOuts: secondCallouts });

//   return (
//     <section className={styles.footer}>
//       {ccElement} 
//       {ccElement2} 
//     </section>
//   );
// };