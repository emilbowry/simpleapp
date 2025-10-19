// src/pages/home-page/parts/impact/impact.styles.ts

import { borderGrad, Theme } from "../../../../styles";

const idx = 1;
let theme = Theme(idx);

const stat_value_style: React.CSSProperties = {
	color: theme.tertiaryColor,
	// fontSize: "3rem",
	paddingTop: "15%",
	// ["--h"]: "calc(2vw)",
	// fontSize: "100%",
	// fontSize: "calc(((4vw /var(--h))vw))",
	// fontSize: "calc(2rem + 1px * pow(1px / 2vw, 1))",
	// fontSize: "calc(2rem + 1px * calc(1px / 2vw))",
	fontSize: "200%",

	// height: "10%",
	width: "100%",
	fontWeight: "500",
	justifySelf: "center",
	textAlign: "center",
	overflow: "visible",
	textWrap: "nowrap",
};

const stat_body_style: React.CSSProperties = {
	color: theme.primaryColor,
	borderTop: `1px solid`,
	borderImage: borderGrad,
	margin: "auto",
	padding: "1%",

	textAlign: "center",
	overflow: "visible",
	fontSize: "100%",
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
