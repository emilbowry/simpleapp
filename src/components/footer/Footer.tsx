import React from "react";
import logo from "../../assets/logo.svg";
import styles from "./Footer.module.css";
import globalstyles from "../../GlobalStyles.module.css";
import { _CallOut as CallOut } from "../callingcard/CallOut";

// src/components/callingcard/CallOut.tsx

// import React from 'react';
// import globalstyles from '../../GlobalStyles.module.css' ;

import { CallingCard } from "../callingcard/CallingCard";
import { LogoBox } from "../callingcard/LogoBox";

const FooterBody: React.FC = () => <h1>The way to be 'AI-first'...</h1>;
const OriginalLogoboxContent: React.FC = () => <img src={logo} alt="logo" />;
// <CallOut Component={OriginalLogoboxContent} />,
// <CallOut Component={FooterBody} />

// <LogoBox Component={OriginalLogoboxContent} scale={0.3} />,
export const Footer: React.FC = () => {
	const c = <div></div>;
	const componentsToRender = [
		<CallOut Component={OriginalLogoboxContent} />,
		<CallOut Component={FooterBody} />,
	];
	const ccElement = <CallingCard components={componentsToRender} index={1} />;
	return <section className={styles.footer}>{ccElement}</section>;
};
