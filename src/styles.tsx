// src/styles.tsx

import React from "react";

import backgroundPattern from "./assets/tileablebackground.png";
import background from "./assets/Untitled.png";

export const BackgroundStyle: React.CSSProperties = {
	backgroundImage: `url(${background})`,
	backgroundRepeat: "repeat",

	backgroundSize: "cover",
	backgroundAttachment: "fixed",

	width: "100vw",
	position: "fixed",
	zIndex: -20,
	inset: 0,
};
import {
	midnight_green,
	dark_midnight_green,
	logo_blue,
	l_midnight_green,
	dark_mix_green,
	light_logo_blue,
	logo_yellow,
	light_mix_green,
	lighter_logo_blue,
	bgwhite,
	o_mix_green,
} from "./utils/defaultColours";
export const borderGrad = `linear-gradient(to right, ${logo_yellow} 0%, ${logo_blue} 100%) 1`;
export const genericSectionStyle: React.CSSProperties = {
	border: "1px solid black",
	backgroundColor: "rgba(255, 0, 0, 0.2)",
	boxSizing: "border-box",
};
export const Theme = (index: number) => {
	const theme = {
		backgroundColor: bgwhite,
		primaryColor: midnight_green,
		secondaryColor: dark_mix_green,
		tertiaryColor: logo_blue,
	};
	if (index === -1) {
		theme.backgroundColor = "transparent";
		theme.primaryColor = light_logo_blue;
		theme.secondaryColor = lighter_logo_blue;
		theme.tertiaryColor = logo_yellow;
	} else if (index % 2 === 1) {
		theme.backgroundColor = dark_midnight_green;
		theme.primaryColor = light_logo_blue;
		theme.secondaryColor = o_mix_green;
		theme.tertiaryColor = logo_yellow;
		// theme.backgroundColor = light_mix_green;
		// theme.primaryColor = dark_midnight_green;
		// theme.secondaryColor = dark_mix_green;
		// theme.tertiaryColor = midnight_green;
	}
	return theme;
};
