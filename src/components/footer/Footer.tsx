import React from 'react';
import logo from '../../assets/logo.svg';
import styles from './Footer.module.css';
import globalstyles from '../../GlobalStyles.module.css' ;
import { CallOut, ICallOutProps } from '../callingcard/CallOut';
import { CallingCard,ICallingCardProps } from '../callingcard/CallingCard';
import { LogoBox } from '../callingcard/LogoBox';

// import { createCallingCard, CallingCard, addCallingCard, ICallingCard } from '../callingcard/CallingCard';
// const FooterBody : React.FC = () => {
// 	return(
// 		<h1 >
// 		The way to be 'AI-first' is to <em>explore AI first</em>
// 		</h1>
// )}

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
// export const Footer: React.FC = () => {
//   const args: ICallingCardProps = { Body: FooterBody, ratio: 0.3 };

//   const ccElement = <CallingCard {...args} />;

//   return (
//     <section className={styles.footer}>
//       {ccElement}
//     </section>
//   );
// };
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


// The original content components remain the same
const FooterBody: React.FC = () => <h1>The way to be 'AI-first'...</h1>;
const OriginalLogoboxContent: React.FC = () => <img src={logo} alt="logo" />;

export const Footer: React.FC = () => {
  // Create an array of components using your new classes as wrappers
  const componentsToRender = [
    // A CallOut that renders the FooterBody content
    <CallOut Component={FooterBody} />,

    // A LogoBox that renders the original logo content and carries the scale prop
    <LogoBox Component={OriginalLogoboxContent} scale={0.3} />,
  ];

  // Pass this array to the CallingCard
  const ccElement = <CallingCard components={componentsToRender} />;

  return (
    <section className={styles.footer}>
      {ccElement}
    </section>
  );
};