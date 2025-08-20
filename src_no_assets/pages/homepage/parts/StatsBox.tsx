// src/pages/homepage/parts/StatsBox.tsx

import React from "react";
import { Theme } from "../../../styles";
import { ITriPartCalloutProps } from "../../../components/callingcard/callout/CallOut";
const statValueStyle = (colour: string): React.CSSProperties => ({
	color: colour,
	fontSize: "2.5rem",
});

const statDescriptionStyle = (colour: string): React.CSSProperties => ({
	letterSpacing: "0.2rem",
	color: colour,
	textTransform: "uppercase",
	fontWeight: "500",
});

export const StatBox = (
	header: string,
	body: string,
	footer: string,
	index = 0
) => {
	let theme = Theme(index);

	const props: ITriPartCalloutProps = {
		header: (
			<p style={statDescriptionStyle(theme.secondaryColor)}>{header}</p>
		),
		body: <div style={statValueStyle(theme.tertiaryColor)}>{body}</div>,
		footer: (
			<p style={statDescriptionStyle(theme.secondaryColor)}>{footer}</p>
		),
		index: index,
	};
	return props;
};
