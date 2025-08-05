import React from 'react';
import globalstyles from '../../GlobalStyles.module.css' ;
import styles from './CallingCard.module.css' ;
// import { Logobox } from './LogoBox';
import logo from '/src/assets/logo.svg';
import { LogoBox, ILogoBoxProps } from './LogoBox';








// export interface ICallingCard {
//   Components: React.ComponentType[];
// }

// // export interface ICallingCard {
// //   Body: React.FC;
// //   ratio?: number;
// // }

// // export const Logobox: React.FC = () => {
// //   return (
// //     <div className={styles.logobox}>
// //       <img src={logo} alt="AI Compatible logo" className={styles.logobox}/>
// //     </div>
// //   );
// // } 


// export interface ICallOut {
//   Compoment: React.ComponentType;
// }
// export class CallOut extends React.Component<ICallOut>{

// }



// export interface ILogoBox extends ICallOut {
//   scale: number;
// }

// export class LogoBox extends React.Component<ILogoBox>{

// }


// export class CallingCard extends React.Component<ICallingCard> {

//   render() {
//     const { Body, ratio = 0.2  } = this.props;

//     const template = `minmax(0, ${ratio * 100}%) minmax(0, 1fr)`;

//     return (
//       <section
//         className={styles.callingCard}
//         style={{ gridTemplateColumns: template }}
//       >
//         <Body />
//         <Logobox />
//       </section>
//     );
//   }
// }


// Ecample Usage
// const FooterBody : React.FC = () => {
//   return(
//     <h1 >
//     The way to be 'AI-first' is to <em>explore AI first</em>
//     </h1>
// )}

// export const Footer: React.FC = () => {
//   const args: ICallingCard = { Body: FooterBody, ratio: 0.3 };

//   const ccElement = <CallingCard {...args} />;

//   return (
//     <section className={styles.footer}>
//       {ccElement}
//     </section>
//   );
// };
// The interface for a basic CallOut's props
// export interface ICallOutProps {
//   Component: React.ComponentType;
// }
// // The CallOut class now renders the component it is passed
// export class CallOut extends React.Component<ICallOutProps> {
//   render() {
//     const { Component } = this.props;
//     return <Component />;
//   }
// }

// // The LogoBox props extends CallOut and adds scale
// export interface ILogoBoxProps extends ICallOutProps {
//   scale: number;
// }
// // The LogoBox class behaves identically to CallOut for now
// export class LogoBox extends React.Component<ILogoBoxProps> {
//   render() {
//     const { Component } = this.props;
//     return <Component />;
//   }
// }

// The props for the main CallingCard component
export interface ICallingCardProps {
  components: React.ReactElement[];
}

export class CallingCard extends React.Component<ICallingCardProps> {
  render() {
    const { components } = this.props;

    // Default to a uniform grid
    let gridTemplate = `repeat(${components.length}, 1fr)`;

    // DEGENERATE CASE LOGIC:
    // Check if we have 2 components AND the second one is a LogoBox instance
    if (components.length === 2 && components[1].type === LogoBox) {
      // Get the scale from the LogoBox's props to define the layout
      const props = components[1].props as ILogoBoxProps;
      const ratio = props.scale || 0.2;
      
      gridTemplate = `1fr minmax(0, ${ratio * 100}%)`;
    }

    return (
      <section
        className={styles.callingCard}
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {/* Render the components from the array */}
        {components}
      </section>
    );
  }
}
