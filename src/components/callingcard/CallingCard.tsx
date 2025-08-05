import React from 'react';
import globalstyles from '../../GlobalStyles.module.css' ;
import styles from './CallingCard.module.css' ;
import { Logobox } from './LogoBox';



export interface ICallingCard {
  Body: React.FC;
  ratio?: number;
}



export class CallingCard extends React.Component<ICallingCard> {


  render() {
    const { Body, ratio = 0.2  } = this.props;

    const template = `minmax(0, ${ratio * 100}%) minmax(0, 1fr)`;

    return (
      <section
        className={styles.callingCard}
        style={{ gridTemplateColumns: template }}
      >
        <Body />
        <Logobox />
      </section>
    );
  }
}
