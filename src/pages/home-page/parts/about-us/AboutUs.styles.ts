// src/pages/homepage/parts/about-us.tsx/AboutUs.styles.ts

import React from "react";
import { Theme } from "../../../../styles";
import { bgwhite } from "../../../../utils/defaultColours";
const theme = Theme(0);

const titleStyle: React.CSSProperties = {
	// fontSize: "2rem",
	fontSize: "calc(1.6rem*calc(1vw/1vh))",

	fontWeight: "400",
	textAlign: "center",
	color: theme.tertiaryColor,
};
const footerStyle: React.CSSProperties = {
	// fontSize: "2rem",
	fontSize: "calc(1.6rem*calc(1vw/1vh))",

	textAlign: "center",
	color: theme.primaryColor,
};

const imageStyling: React.CSSProperties = {};
const hStyle = { colour: bgwhite };
export { footerStyle, hStyle, imageStyling, titleStyle };
