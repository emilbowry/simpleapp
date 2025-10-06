import { borderGrad, Theme } from "../../../../styles";

const idx = 1;
let theme = Theme(idx);

export const stat_value_style: React.CSSProperties = {
	color: theme.tertiaryColor,
	fontSize: "3rem",
	margin: "1%",
	height: "5rem",
	minHeight: "5rem",
	maxHeight: "5rem",

	fontWeight: "500",
	justifySelf: "center",
	textAlign: "center",
	overflow: "visible",
};

export const stat_body_style: React.CSSProperties = {
	color: theme.primaryColor,
	borderTop: `1px solid`,
	borderImage: borderGrad,
	margin: "auto 0",
	padding: "1%",

	textAlign: "center",
	overflow: "visible",

	fontSize: "2rem",
};
export const LetterFooterContainerStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "30% 70%",
	textAlign: "left",
	width: "100%",
};
export const LetterFooterWrapperStyle: React.CSSProperties = {};
export const FounderLetterWrapperStyle: React.CSSProperties = { width: "100%" };
