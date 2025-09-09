// src/components/partnershipbar/PartnershipBar.styles.ts

import React from "react";

import { light_grey, title_font_colour } from "../../utils/defaultColours";
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
		justifyContent: "center",
		alignItems: "center",
	},
};

export const marqueeFrameStyle: React.CSSProperties = {
	isolation: "isolate",

	border: "1px solid",
	borderColor: light_grey,
	height: "10vh",

	// alignItems: "center",

	backgroundColor: "white",
	borderRadius: "10vh",
	overflow: "hidden",
};

export const marqueeWindowStyle: React.CSSProperties = {
	position: "relative",

	height: "10vh",
	maskImage:
		"linear-gradient(to right, transparent 1%, black 10%, black 90%, transparent 99%)",

	display: "grid",

	alignContent: "center",
};

export const marqueeContentStyle: React.CSSProperties = {
	display: "flex",

	alignItems: "center",

	animation: `90s linear infinite slide-in`,
};

export const partnerWrapperStyle: React.CSSProperties = {
	flexShrink: 0,

	// marginRight: "50px",

	justifyContent: "space-between",
};
export const keyframes = `
  @keyframes slide-in {
	from {
	  transform: translateX(0%);
	}
	to {
	  transform: translateX(-100%);
	}
  }
`;
export const imageStyle: React.CSSProperties = {
	display: "block",
	alignContent: "center",
	justifyContent: "center",
	alignItems: "center",
};

export const rowLayout = (
	n_bricks: number,
	maxBricks: number
): React.CSSProperties => {
	return {
		justifyContent: "center",
		alignItems: "center",

		display: "grid",
		gridTemplateColumns: `repeat(${n_bricks}, ${100 / maxBricks}%)`,
	};
};
