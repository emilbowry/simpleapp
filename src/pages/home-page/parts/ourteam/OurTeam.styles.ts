// src/pages/homepage/parts/ourteam/OurTeam.styles.ts

import React from "react";

const personaWrapperStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "30% 70%",
	width: "100%",
	justifyContent: "center",
	// fontSize: "min(1.5rem,calc(1rem * 90vw/100vh + 1rem * 10vh/100vw))",
};

const PersonaTextStyle: React.CSSProperties = {
	borderRadius: "calc(75px*calc(1vw/1vh)) 0 0 calc(75px*calc(1vw/1vh))",
	fontSize: "calc(2vw*sqrt(calc(1vw/1vw)*calc(1vh/1vw)))",
	// fontSize: "2vh",
	padding: "5%",
	height: "30vh",
};

const _PersonaTextStyle = (scale = 1): React.CSSProperties => ({
	borderRadius: "calc(75px*calc(1vw/1vh)) 0 0 calc(75px*calc(1vw/1vh))",
	fontSize: "calc(2vw*sqrt(calc(1vw/1vw)*calc(1vh/1vw)))",
	// fontSize: "2vh",
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

	// padding: "auto",
	paddingBottom: "10vh",
	// height: "fit-content",
};
export {
	OurTeamContainerStyle,
	PersonaHeadshotStyle,
	PersonaTextStyle,
	personaWrapperStyle,
	_PersonaTextStyle,
};
