// src/components/callingcard/callout/CallOut.styles.ts

import React from "react";
import {
	body_font_colour,
	title_font_colour,
} from "../../../utils/defaultColours";

export const CallOut_Style = (
	background_colour: string = "transparent"
): React.CSSProperties => ({
	marginLeft: "10px",
	paddingTop: "10px",
	paddingBottom: "10px",
	marginRight: "10px",
	backgroundColor: background_colour,
});

export const CallOutBody_Style = (
	body_colour: string = body_font_colour
): React.CSSProperties => ({
	color: body_colour,
});

export const CallOutHeader_Style = (
	header_colour: string = title_font_colour
): React.CSSProperties => ({
	color: header_colour,
});
export const Bordered_TriPartCallout_Style: React.CSSProperties = {
	borderTop: "2px solid",
	borderBottom: "2px solid",
	textAlign: "center",
};
