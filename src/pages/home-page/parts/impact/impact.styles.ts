// src/pages/home-page/parts/impact/impact.styles.ts

import { borderGrad, Theme } from "../../../../styles";

const idx = 1;
let theme = Theme(idx);

const stat_value_style: React.CSSProperties = {
	color: theme.tertiaryColor,
	fontSize: "3rem",
	paddingTop: "10rem",

	height: "5rem",
	width: "100%",
	fontWeight: "500",
	justifySelf: "center",
	textAlign: "center",
	overflow: "visible",
};

const stat_body_style: React.CSSProperties = {
	color: theme.primaryColor,
	borderTop: `1px solid`,
	borderImage: borderGrad,
	margin: "auto",
	padding: "1%",

	textAlign: "center",
	overflow: "visible",

	fontSize: "2rem",
};
const LetterFooterContainerStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "30% 70%",
	textAlign: "left",
	width: "100%",
};
const LetterFooterWrapperStyle: React.CSSProperties = {};
const FounderLetterWrapperStyle: React.CSSProperties = { width: "100%" };
export {
	FounderLetterWrapperStyle,
	LetterFooterContainerStyle,
	LetterFooterWrapperStyle,
	stat_body_style,
	stat_value_style,
};
