// src/components/titlebar/TitleBar.styles.ts

import React from "react";

export const hamburgerStyle: React.CSSProperties = {
	background: "none",
	border: "none",
	cursor: "none",
	marginLeft: "1rem",
};

export const VISIBLE_TITLEBAR_HEIGHT = 60;

export const interactionWrapperStyles: React.CSSProperties = {
	width: "100%",
	position: "fixed",
	top: 0,
	zIndex: "100",
	// backdropFilter: "blur(10px)",
	// alignItems: "center",
	// height: "60px",

	// opacity: 0,
};

export const _titleBarStyles = (): React.CSSProperties => {
	return {
		// position: "absolute",
		// position: "fixed",
		// width: "fit-content",
		// top: 0,
		// left: "50%",
		display: "flex",
		alignContent: "center",

		alignItems: "center",
		justifyContent: "space-between",
		height: `${VISIBLE_TITLEBAR_HEIGHT}px`,
		// marginBottom: `${VISIBLE_TITLEBAR_HEIGHT}px`,

		// backgroundColor: "white",
		// backdropFilter: "blur(1px)",
		backgroundColor: "rgb(255 255 255 / 90%)",

		// filter: "blur(10px)",
		// opacity: "0",
		// opacity: 0.6,
		// zIndex: "99",

		padding: "10px",
		// minWidth: `fit-content`,
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

export const navLinkStyles = (isUnderlined: boolean): React.CSSProperties => ({
	// isolation: "isolate",
	// filter: "none",

	textDecoration: isUnderlined ? "underline" : "none",
	color: "#333",
	fontSize: "16px",
	opacity: "inherit",
	padding: "5px 0",
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
	// position: "relative",
	left: "0",
	right: "0",

	margin: "0 auto",

	top: `-${VISIBLE_TITLEBAR_HEIGHT}px`,

	marginTop: `${VISIBLE_TITLEBAR_HEIGHT - 10}px`,

	backgroundColor: "transparent",
	paddingTop: "10px",

	width: "fit-content",
};

export const dropdownLinksColumnStyles: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "10px",
	opacity: 0,
};

export const dropdownLinkStyles: React.CSSProperties = {
	color: "#333",

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
