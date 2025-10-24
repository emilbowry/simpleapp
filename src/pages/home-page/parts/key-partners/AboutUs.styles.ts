// src/pages/homepage/parts/about-us.tsx/AboutUs.styles.ts

import React from "react";
import { Theme, volume_constant_size } from "../../../../styles";
import { bgwhite } from "../../../../utils/defaultColours";
const theme = Theme(0);

const titleStyle: React.CSSProperties = {
	fontSize: `calc(2*${volume_constant_size})`,
	fontWeight: "400",
	textAlign: "center",
	color: theme.tertiaryColor,
};
const footerStyle: React.CSSProperties = {
	fontSize: `calc(1.5*${volume_constant_size})`,

	textAlign: "center",
	color: theme.primaryColor,
};

const imageStyling: React.CSSProperties = {};
const hStyle = { colour: bgwhite };
export { footerStyle, hStyle, imageStyling, titleStyle };
