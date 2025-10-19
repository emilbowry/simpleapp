// src/components/titlebar/TitleBar.styles.ts
import React from "react";
import { linkStyle } from "../../styles";
import { VISIBLE_TITLEBAR_HEIGHT } from "./TitleBar.consts";
const hamburgerStyle: React.CSSProperties = {
	background: "none",
	border: "none",
	cursor: "none",
	marginLeft: "1rem",
};

const interactionWrapperStyles: React.CSSProperties = {
	width: "100%",
	position: "fixed",
	top: 0,
	zIndex: "100",
	fontSize: "min(1.5rem,calc(1.5rem*calc(1vw/1vh)))",
};
const titleBarStyles = (): React.CSSProperties => {
	return {
		maxWidth: "100%",
		display: "flex",
		alignContent: "center",
		alignItems: "center",
		justifyContent: "space-between",
		fontSize: "1rem",
		height: `${VISIBLE_TITLEBAR_HEIGHT}vh`,
		minHeight: "1rem",
		backgroundColor: "rgb(255 255 255 / 90%)",
		// minWidth: `fit-content`,
	};
};
const logoContainerStyles: React.CSSProperties = {
	flex: 1,
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
};
const logoStyles: React.CSSProperties = {
	height: `${VISIBLE_TITLEBAR_HEIGHT / 2}vh`,
};
const navLinksWrapperStyle: React.CSSProperties = {
	maxWidth: "100vw", //testing
	border: "red 1px solid",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",

	alignContent: "center",
	whiteSpace: "nowrap",
};

const navLinksContainerStyles: React.CSSProperties = {
	flex: 2,
	display: "flex",
	justifyContent: "center",
	gap: "2%",
	// border: "1px solid red",
	textWrap: "nowrap",
	textAlign: "center",
};
const rightHandContainerStyles: React.CSSProperties = {
	flex: 1,
	display: "flex",
	justifyContent: "flex-end",
	alignItems: "center",
};
const navLinkStyles = (isUnderlined = false): React.CSSProperties => ({
	...linkStyle(isUnderlined),
	transition: "background-size 0.3s ease-in",
	padding: 0,
	// fontSize: "1rem",
	cursor: "none",
});
const dropdownStyles: React.CSSProperties = {
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
const dropdownContainerStyles: React.CSSProperties = {
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
const dropdownLinksColumnStyles: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "10px",
};
const dropdownLinkStyles: React.CSSProperties = {
	color: "#333",
	cursor: "none",
	fontSize: "15px",
	textDecoration: "none",
	padding: "5px 0",
	whiteSpace: "nowrap",
};
const dropdownImageContainerStyles: React.CSSProperties = {
	width: "200px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "space-between",
};
const dropdownImageStyles: React.CSSProperties = {
	width: "99%",
	height: "120px",
	objectFit: "cover",
	borderRadius: "4px",
};
const dropdownImageViewOverviewStyles: React.CSSProperties = {
	marginTop: "10px",
	fontSize: "14px",
	display: "flex",
	alignItems: "center",
	gap: "5px",
};

const pillBarOverrides: React.CSSProperties = {
	borderRadius: "5vh",
	backgroundColor: "rgb(255 255 255 / 40%)",
	background: `linear-gradient(to right, rgb(255 222 89 / 10%), rgb(12 192 223 / 10%)),

		rgb(255 255 255 / 40%)`,
	backdropFilter: "blur(8px)",
	margin: "0 5%",
	marginTop: "3rem",
	// fontSize: "10%",
	// marginRight: "10%",
	// marginLeft: "10%",
};
export {
	dropdownContainerStyles,
	dropdownImageContainerStyles,
	dropdownImageStyles,
	dropdownImageViewOverviewStyles,
	dropdownLinksColumnStyles,
	dropdownLinkStyles,
	dropdownStyles,
	hamburgerStyle,
	interactionWrapperStyles,
	logoContainerStyles,
	logoStyles,
	navLinksContainerStyles,
	navLinkStyles,
	pillBarOverrides,
	rightHandContainerStyles,
	titleBarStyles,
	navLinksWrapperStyle,
};
