import React from 'react';
import styles from './CallingCard.module.css';
import { CallOut,ICallOutProps } from './CallOut';
import logo from '/src/assets/logo.svg';



// The LogoBox props extends CallOut and adds scale
export interface ILogoBoxProps extends ICallOutProps {
  scale: number;
}
// The LogoBox class behaves identically to CallOut for now
export class LogoBox extends React.Component<ILogoBoxProps> {
  render() {
    const { Component } = this.props;
    return <Component />;
  }
}

// export const Logobox: React.FC = () => {

//   return (
//     <div className={styles.logobox}>
//       <img src={logo} alt="AI Compatible logo" className={styles.logobox}/>
//     </div>
//   );
// }
