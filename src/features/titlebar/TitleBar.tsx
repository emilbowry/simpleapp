// src/features/titlebar/TitleBar.tsx

import React from "react";
import dropdownImage from "../../assets/dude1.jpg";
import logo from "../../assets/logo.png";
import { PillTitleBar } from "./Bars";
import { ITitleBarLink } from "./TitleBar.types";
const navLinks: ITitleBarLink[][] = [
	[
		{ path: "/", alias: "Home", image: dropdownImage },
		{ path: "/demo_and_testing", alias: "Demo Page" },
		{ path: "/dpotool", alias: "DPO Tool" },
	],
	[{ path: "/thejourney", alias: "The Journey" }],

	[{ path: "/ourservices", alias: "Our Services" }],
	[{ path: "/contact", alias: "Contact" }],
	// [{ path: "/dpotool", alias: "DPO Tool" }],
];
const AppTitleBar: React.FC = () => {
	return (
		<PillTitleBar
			logoSrc={logo}
			links={navLinks}
		/>
	);
};

export { AppTitleBar };
