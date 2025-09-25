// src/pages/homepage/parts/about-us.tsx/AboutUs.styles.ts

import React from "react";
import { Theme } from "../../../../styles";
const theme = Theme(0);

export const titleStyle: React.CSSProperties = {
	fontSize: "2rem",
	fontWeight: "400",
	textAlign: "center",
	color: theme.tertiaryColor,
};
export const footerStyle: React.CSSProperties = {
	fontSize: "2rem",
	textAlign: "center",
	color: theme.primaryColor,
};

export const imageStyling: React.CSSProperties = {};
export const hexCallStyle: React.CSSProperties = {};
export const HexWapStyle: React.CSSProperties = {
	backgroundColor: "white",
};
