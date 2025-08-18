import React from "react";
import backgroundPattern from "./assets/bavkground.png";

export const BackgroundStyle: React.CSSProperties = {
	backgroundImage: `url(${backgroundPattern})`,

	backgroundRepeat: "repeat",
	backgroundPosition: "center",
	backgroundSize: "cover",
	backgroundAttachment: "fixed",

	zIndex: -1,

	backgroundColor: "#f0f0f0",
	paddingBottom: "100px",
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
} from "./utils/defaultColours";
export const Theme = (index: number) => {
	const theme = {
		backgroundColor: "#FFFFFF",
		primaryColor: midnight_green,
		secondaryColor: l_midnight_green,
		tertiaryColor: logo_blue,
	};
	if (index === -1) {
		theme.backgroundColor = "transparent";
		theme.primaryColor = light_logo_blue;
		theme.secondaryColor = lighter_logo_blue;
		theme.tertiaryColor = logo_yellow;
	} else if (index % 2 === 1) {
		theme.backgroundColor = light_mix_green;
		theme.primaryColor = dark_midnight_green;
		theme.secondaryColor = dark_mix_green;
		theme.tertiaryColor = midnight_green;
	}
	return theme;
};
