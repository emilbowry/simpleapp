import React from "react";
import logo from "../../assets/logo.svg";
import styles from "./Footer.module.css";
import globalstyles from "../../GlobalStyles.module.css";
import { CallOut } from "../callingcard/CallOut";
import { getImageEl } from "../../utils/reactUtils";
// src/components/callingcard/CallOut.tsx

// import React from 'react';
// import globalstyles from '../../GlobalStyles.module.css' ;

import { CallingCard } from "../callingcard/CallingCard";

const FooterBody: React.FC = () => <h1>The way to be 'AI-first'...</h1>;

export const Footer: React.FC = () => {
	const componentsToRender = [
		<CallOut data={getImageEl(logo)} />,
		<CallOut data={FooterBody} />,
	];
	const ccElement = <CallingCard components={componentsToRender} index={1} />;
	return <section className={styles.footer}>{ccElement}</section>;
};
