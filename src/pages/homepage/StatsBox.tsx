import React from "react";
import { subtitle_colour } from "../../utils/defaultColours";

export const StatBox = (
	preamble: string,
	stat: string,
	body: string
): React.ReactNode => {
	const statValueStyle: React.CSSProperties = {
		color: subtitle_colour,
		fontSize: "2.5rem",
	};

	const statDescriptionStyle: React.CSSProperties = {
		letterSpacing: "0.2rem",
		textTransform: "uppercase",
		fontWeight: "500",
	};

	return (
		<>
			<p style={statDescriptionStyle}>{preamble}</p>
			<div style={statValueStyle}>{stat}</div>
			<p style={statDescriptionStyle}>{body}</p>
		</>
	);
};
