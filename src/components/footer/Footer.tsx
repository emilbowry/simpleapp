import React from 'react';
import logo from '../../assets/logo.svg';
import styles from './Footer.module.css';
import globalstyles from '../../GlobalStyles.module.css' ;
import { CallOut } from '../callingcard/CallOut';
import { CallingCard } from '../callingcard/CallingCard';
import { LogoBox } from '../callingcard/LogoBox';

const FooterBody: React.FC = () => <h1>The way to be 'AI-first'...</h1>;
const OriginalLogoboxContent: React.FC = () => <img src={logo} alt="logo" />;

export const Footer: React.FC = () => {
  const componentsToRender = [
    <CallOut Component={FooterBody}/>,

    <LogoBox Component={OriginalLogoboxContent} scale={0.3} />,
  ];

  const ccElement = <CallingCard components={componentsToRender}  index={1}/>;

  return (
    <section className={styles.footer}>
      {ccElement}
    </section>
  );
};