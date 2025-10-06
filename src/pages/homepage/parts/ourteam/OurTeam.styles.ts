// src/pages/homepage/parts/ourteam/OurTeam.styles.ts

import React from "react";

export const personaWrapperStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "30% 70%",
	height: "100%",
	width: "100%",
	justifyContent: "center",
};

export const PersonaTextStyle: React.CSSProperties = {
	borderRadius: "100px 0 0 100px",
	margin: "auto",
};

export const PersonaHeadshotStyle: React.CSSProperties = {
	boxSizing: "border-box",
	maxHeight: "30vh",
	minHeight: 0,
	minWidth: 0,
	maxWidth: "100%",
	height: "100%",
	aspectRatio: `${2 / Math.sqrt(3)}`,
	padding: "5%",
	margin: "auto",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignContent: "center",
};

export const OurTeamContainerStyle: React.CSSProperties = {
	display: "grid",
	rowGap: "1%",
	width: "100%",
	padding: "auto",
	paddingBottom: "10%",
};
