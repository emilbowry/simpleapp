// src/components/partnershipbar/PartnershipBar.styles.ts

import React from "react";

import { title_font_colour } from "../../utils/defaultColours";
export const PartnerStyles: {
	Small: React.CSSProperties;
	Large: React.CSSProperties;
} = {
	Small: {
		display: "grid",
		gridTemplateRows: "1fr",
		alignItems: "center",
		justifyContent: "space-between",
		gap: "2rem",
		padding: "1rem",
		borderTop: "3px solid",
		borderBottom: "3px solid",
		borderColor: title_font_colour,
	},
	Large: {
		display: "flex",
		flexWrap: "nowrap",
		overflowX: "auto",
		alignItems: "center",
		justifyContent: "space-between",
		gap: "2rem",
		padding: "1rem",
		borderTop: "2px solid",
		borderBottom: "2px solid",
		borderColor: title_font_colour,
	},
};

export const imageStyle: React.CSSProperties = {
	maxWidth: "100%",
	height: "auto",
	display: "block",
	// animation: "2s linear 1s infinite running slide-in",

	margin: "0 auto",
};
