import React from 'react';
import { CallOut,ICallOutProps } from './CallOut';



export interface ILogoBoxProps extends ICallOutProps {
  scale: number;
}
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
