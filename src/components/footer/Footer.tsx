import React from "react";
import logo from "../../assets/logo.svg";
import styles from "./Footer.module.css";
import { CallOut } from "../callingcard/CallOut";
import { getImageEl } from "../../utils/reactUtils";

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
