// src/pages/homepage/parts/StatsBox.tsx

import React from "react";
import { subtitle_colour } from "../../../utils/defaultColours";
import { IStructuredCalloutData } from "../../../components/callingcard/StructuredCallout";
import { Theme } from "../../../styles";

// export const StatBox = (
// 	preamble: string,
// 	stat: string,
// 	body: string
// ): React.ReactNode => {

export const StatBox = (
	preamble: string,
	stat: string,
	body: string,
	index = 0
) => {
	let theme = Theme(index);
	const statValueStyle: React.CSSProperties = {
		color: theme.tertiaryColor,
		fontSize: "2.5rem",
	};

	const statDescriptionStyle: React.CSSProperties = {
		letterSpacing: "0.2rem",
		color: theme.secondaryColor,

		textTransform: "uppercase",
		fontWeight: "500",
	};

	const props: IStructuredCalloutData = {
		title: <p style={statDescriptionStyle}>{preamble}</p>,
		subtitle: <div style={statValueStyle}>{stat}</div>,
		body: <p style={statDescriptionStyle}>{body}</p>,
	};
	return props;

	// return (
	// 	<>
	// 		<p style={statDescriptionStyle}>{preamble}</p>
	// 		<div style={statValueStyle}>{stat}</div>
	// 		<p style={statDescriptionStyle}>{body}</p>
	// 	</>
	// );
};
