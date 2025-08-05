import React from 'react';
import globalstyles from '../../GlobalStyles.module.css' ;
import styles from './CallingCard.module.css' ;
import { Logobox } from './LogoBox';



export interface ICallingCard {
  Body: React.FC;
  ratio?: number;
}


export const createCallingCard = (
  { Body, ratio = 0.2 }: ICallingCard
): React.ReactElement => {

  const template = `minmax(0, ${ratio * 100}%) minmax(0, 1fr)`;
  return (
    <section className={styles.callingCard}
             style={{ gridTemplateColumns: template }}>
      <Body />
      <Logobox />
    </section>
  );
};


export class CallingCard extends React.Component<ICallingCard> {
  // Use static defaultProps for setting default values in class components.
  static defaultProps = {
    ratio: 0.2,
  };

  render() {
    // Access `Body` and `ratio` from `this.props`.
    const { Body, ratio = 0.2  } = this.props;

    // The logic for creating the template string is identical.
    const template = `minmax(0, ${ratio * 100}%) minmax(0, 1fr)`;

    // The render method returns the React element directly.
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
export const addCallingCard = (
  { Body, ratio = 0.2 }: ICallingCard
): React.ReactElement => {


  return (<CallingCard Body={Body} ratio={ratio} />)
  
};
