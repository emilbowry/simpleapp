// src/components/titlebar/TitleBar.styles.ts
import React from "react";
import { logoGrag } from "../../styles";
import { logo_blue } from "../../utils/defaultColours";
import { VISIBLE_TITLEBAR_HEIGHT } from "./TitleBar.consts";
export const hamburgerStyle: React.CSSProperties = {
	background: "none",
	border: "none",
	cursor: "none",
	marginLeft: "1rem",
};

/**
	@improvement 
	- VISIBLE_TITLEBAR_HEIGHT should be inferred and responsive (not px based)
*/
// export const VISIBLE_TITLEBAR_HEIGHT = 5;
export const interactionWrapperStyles: React.CSSProperties = {
	width: "100vw",
	position: "fixed",
	top: 0,
	zIndex: "100",
};
export const _titleBarStyles = (): React.CSSProperties => {
	return {
		display: "flex",
		alignContent: "center",
		alignItems: "center",
		justifyContent: "space-between",
		height: `${VISIBLE_TITLEBAR_HEIGHT}vh`,
		backgroundColor: "rgb(255 255 255 / 90%)",
		// padding: "10px",
		minWidth: `max-content`,
	};
};
export const logoContainerStyles: React.CSSProperties = {
	flex: 1,
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
};
export const logoStyles: React.CSSProperties = {
	height: "40px",
};
export const navLinksContainerStyles: React.CSSProperties = {
	flex: 2,
	display: "flex",
	justifyContent: "center",
	gap: "15px",
};
export const rightHandContainerStyles: React.CSSProperties = {
	flex: 1,
	display: "flex",
	justifyContent: "flex-end",
	alignItems: "center",
};
import { linkStyle } from "../../styles";
export const navLinkStyles = (isUnderlined = false): React.CSSProperties => ({
	...linkStyle(isUnderlined),
	transition: "background-size 0.3s ease-in",

	cursor: "none",
});

export const dropdownStyles: React.CSSProperties = {
	left: "0",
	right: "0",
	margin: "0 auto",
	backgroundColor: "#fff",
	borderRadius: "8px",
	boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
	padding: "20px",
	marginTop: "20px",
	display: "flex",
	gap: "30px",
	width: "fit-content",
};
export const dropdownContainerStyles: React.CSSProperties = {
	position: "relative",
	left: "0",
	right: "0",
	cursor: "none",
	margin: "0 auto",
	top: `-${VISIBLE_TITLEBAR_HEIGHT}vh`,
	marginTop: `calc(${VISIBLE_TITLEBAR_HEIGHT}vh - 10px)`,
	backgroundColor: "transparent",
	paddingTop: "10px",
	width: "fit-content",
};
export const dropdownLinksColumnStyles: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "10px",
};
export const dropdownLinkStyles: React.CSSProperties = {
	color: "#333",
	cursor: "none",
	fontSize: "15px",
	textDecoration: "none",
	padding: "5px 0",
	whiteSpace: "nowrap",
};
export const dropdownImageContainerStyles: React.CSSProperties = {
	width: "200px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "space-between",
};
export const dropdownImageStyles: React.CSSProperties = {
	width: "99%",
	height: "120px",
	objectFit: "cover",
	borderRadius: "4px",
};
export const dropdownImageViewOverviewStyles: React.CSSProperties = {
	marginTop: "10px",
	fontSize: "14px",
	display: "flex",
	alignItems: "center",
	gap: "5px",
};

export const pillBarOverrides: React.CSSProperties = {
	borderRadius: "5vh",
	boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
	backgroundColor: "rgb(255 255 255 / 40%)",
	background: `linear-gradient(to right, rgb(255 222 89 / 10%), rgb(12 192 223 / 10%)),

		rgb(255 255 255 / 40%)`,
	backdropFilter: "blur(8px)",
	marginRight: "10%",
	marginTop: "3rem",
	marginLeft: "10%",
};
