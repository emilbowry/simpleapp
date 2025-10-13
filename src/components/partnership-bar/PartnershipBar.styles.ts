// src/components/partnershipbar/PartnershipBar.styles.ts

import React from "react";
import { title_font_colour } from "../../utils/defaultColours";
const PartnerStyles: {
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
		position: "relative",

		justifyContent: "center",
		alignItems: "center",

		width: "100%",
	},
};

const marqueeFrameStyle: React.CSSProperties = {
	margin: "0 10%",
	position: "relative",
	border: "1px solid",
	borderColor: "rgb(255 255 255 / 20%)",
	height: "10vh",
	borderRadius: "10vh",
	zIndex: 99,

	backgroundColor: "rgb(255 255 255 / 40%)",
	background: `linear-gradient(to right, rgb(255 222 89 / 20%) 0%, rgb(12 192 223 / 20%)) 100%,

		rgb(255 255 255 / 20%)`,
	backdropFilter: "blur(8px)",
};

const marqueeWindowStyle: React.CSSProperties = {
	position: "relative",

	height: "10vh",
	maskOrigin: "content-box",
	maskImage:
		"linear-gradient(to right, transparent 1%, black 10%, black 90%, transparent 99%)",

	display: "grid",

	alignContent: "center",
};

const marqueeContentStyle: React.CSSProperties = {
	display: "flex",

	position: "relative",

	alignItems: "center",

	animation: `90s linear infinite slide-in`,
};

const partnerWrapperStyle: React.CSSProperties = {
	flexShrink: 0,
	zIndex: -1,
	position: "relative",
	margin: "0 30px",
	justifyContent: "space-between",
};
const keyframes = `
  @keyframes slide-in {
	from {
	  transform: translateX(0%);
	}
	to {
	  transform: translateX(-100%);
	}
  }
`;

const rowLayout = (
	n_bricks: number,
	maxBricks: number
): React.CSSProperties => {
	return {
		overflow: "visible",
		justifyContent: "center",
		justifyItems: "center",
		alignItems: "center",
		alignContent: "center",
		display: "grid",
		gridTemplateColumns: `repeat(${n_bricks}, ${100 / maxBricks}%)`,
	};
};
const PartnerImageWrapperStyle: React.CSSProperties = {
	aspectRatio: "2.5",
	justifyContent: "center",
	alignContent: "center",
};
const CompactViewStyle: React.CSSProperties = {
	display: "flex",
	flexWrap: "wrap",
	gap: "20px",
};

export {
	CompactViewStyle,
	keyframes,
	marqueeContentStyle,
	marqueeFrameStyle,
	marqueeWindowStyle,
	PartnerImageWrapperStyle,
	PartnerStyles,
	partnerWrapperStyle,
	rowLayout,
};
