// src/pages/home-page/parts/impact/impact.styles.ts

import { borderGrad, Theme, volume_constant_size } from "../../../../styles";

const idx = 1;
let theme = Theme(idx);

const stat_value_style: React.CSSProperties = {
	color: theme.tertiaryColor,
	paddingTop: "20%",
	fontSize: `calc(3*${volume_constant_size})`,

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
	fontSize: `calc(2*${volume_constant_size})`,

	textAlign: "center",
	overflow: "visible",
	// fontSize: "100%",
};
const LetterFooterContainerStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "30% 70%",
	textAlign: "left",
	width: "100%",
};
const LetterFooterWrapperStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "row",

	maxWidth: "100vw",
};
const FounderLetterWrapperStyle: React.CSSProperties = {
	width: "100%",
	fontSize: `calc(2*${volume_constant_size})`,
	// display: "flex",
	// flexDirection: "column",
};
export {
	FounderLetterWrapperStyle,
	LetterFooterContainerStyle,
	LetterFooterWrapperStyle,
	stat_body_style,
	stat_value_style,
};
