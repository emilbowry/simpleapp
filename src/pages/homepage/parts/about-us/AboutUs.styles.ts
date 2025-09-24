// src/pages/homepage/parts/about-us.tsx/AboutUs.styles.ts

import React from "react";
import { Theme } from "../../../../styles";
const theme = Theme(0);

export const titleStyle: React.CSSProperties = {
	fontSize: "2rem",
	fontWeight: "400",
	textAlign: "center",
	// margin: "1%",
	color: theme.tertiaryColor,
};
export const footerStyle: React.CSSProperties = {
	fontSize: "2rem",
	textAlign: "center",
	color: theme.primaryColor,
};

export const imageStyling: React.CSSProperties = {
	// marginTop: "-10%",
	// marginBottom: "10%",
};
export const hexCallStyle: React.CSSProperties = {
	// display: "flex",
	// width: "100%",
	// minWidth: 0,
	// minHeight: 0,
	// margin: "0 auto",
	// marginTop: "-15%",
};
export const HexWapStyle: React.CSSProperties = {
	backgroundColor: "white",
	// margin: "0 5%",
	// height: "100%",
};
