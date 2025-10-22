// src/pages/home-page/parts/ourteam/OurTeam.styles.ts

import React from "react";
import { volume_constant_size } from "../../../../styles";

const personaWrapperStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "30% 70%",
	width: "100%",
	justifyContent: "center",
};

const PersonaTextStyle: React.CSSProperties = {
	padding: "5%",
	height: "30vh",
};
const _PersonaTextStyle = (
	scale = 1
): React.CSSProperties & { [key: string]: string } => ({
	fontSize: `calc(2*${volume_constant_size})`,

	["--borderrad"]: `calc(4*${volume_constant_size})`,

	borderRadius: "var(--borderrad) 0 0 var(--borderrad)",

	padding: "5%",
	height: `30vh*${scale}`,
});

const PersonaHeadshotStyle: React.CSSProperties = {
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

const OurTeamContainerStyle: React.CSSProperties = {
	display: "grid",
	rowGap: "1%",
	width: "100%",

	paddingBottom: "10vh",
};
export {
	OurTeamContainerStyle,
	PersonaHeadshotStyle,
	PersonaTextStyle,
	personaWrapperStyle,
	_PersonaTextStyle,
};
