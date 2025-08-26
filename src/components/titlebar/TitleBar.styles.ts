// src/features/titlebar/TitleBar.styles.ts

import React from "react";

export const headerStyle: React.CSSProperties = {
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "1rem 2rem",
	background: "white",
	zIndex: 100,
};

export const logoStyle: React.CSSProperties = {
	height: "2.5rem",
};

export const hamburgerStyle: React.CSSProperties = {
	background: "none",
	border: "none",
	cursor: "pointer",
	marginLeft: "1rem",
};

export const inlineNavStyle: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	marginLeft: "2rem",
	gap: "1.5rem",
};

export const linkStyle: React.CSSProperties = {
	margin: "0 1rem",
	fontSize: "1rem",
	textDecoration: "none",
	color: "#333",
};

export const activeLinkStyle: React.CSSProperties = {
	...linkStyle,
	fontWeight: 600,
	borderBottom: "2px solid #333",
};

export const navOverlayStyle: React.CSSProperties = {
	position: "fixed",
	top: "4rem",
	right: 0,
	width: "300px",
	// Change height to cover the full viewport height below the header
	// height: "calc(100vh - 4rem)", // Use 100vh to ensure it covers the entire viewport height
	// height: "calc(100% - 4rem)",
	background: "rgba(255,255,255,0.95)",
	// background: "white",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "flex-start",
	paddingTop: "2rem",
	paddingBottom: "2rem",
	transform: "translateX(100%+4rem)",
	// transition: "transform 0.3s ease-in-out",
	zIndex: 90,
};

export const navOverlayOpen: React.CSSProperties = {
	// transform: "translateX(0)",
};

export const closeButtonStyle: React.CSSProperties = {
	position: "absolute",
	top: "1rem",
	right: "1.5rem",
	background: "none",
	border: "none",
	fontSize: "2rem",
	cursor: "pointer",
};

export const dropdownLinkStyle: React.CSSProperties = {
	margin: "1rem 0",
	fontSize: "1.25rem",
	textDecoration: "none",
	color: "#333",
};

export const dropdownActiveLinkStyle: React.CSSProperties = {
	margin: "1rem 0",
	fontSize: "1.25rem",
	textDecoration: "none",
	background: "#c43c00",
	color: "white",
	padding: "0.5rem 2rem",
	borderRadius: "0.25rem",
};
