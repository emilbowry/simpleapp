import React from 'react';
import globalstyles from '../../GlobalStyles.module.css' ;
import styles from './CallingCard.module.css' ;
import { Logobox } from './LogoBox';



interface ICallingCard {
  Body: React.FC;
  ratio?: number;
}


export const createCallingCard = (
  { Body, ratio = 0.2 }: ICallingCard
): React.ReactElement => {      // <-- explicit *sync* return type
  // const template = `${ratio * 100}% ${100 - ratio * 100}%`;
  const template = `minmax(0, ${ratio * 100}%) minmax(0, 1fr)`;
  return (
    <section className={styles.callingCard}
             style={{ gridTemplateColumns: template }}>
      <Body />
      <Logobox />
    </section>
  );
};


