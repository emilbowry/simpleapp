// src/components/callingcard/callout/CallOut.styles.ts

import React from "react";
import {
	body_font_colour,
	title_font_colour,
} from "../../../utils/defaultColours";

export const _CallOut_Style = (
	background_colour: string = "transparent"
): React.CSSProperties => ({
	width: "100%",

	display: "flex",
	flexDirection: "column",

	backgroundColor: background_colour,
});

export const _CallOutBody_Style = (
	body_colour: string = body_font_colour
): React.CSSProperties => ({
	color: body_colour,
});

export const _CallOutHeader_Style = (
	header_colour: string = title_font_colour
): React.CSSProperties => ({
	color: header_colour,
});

export const _CallOutFooter_Style = (
	footer_colour: string = title_font_colour
): React.CSSProperties => ({
	color: footer_colour,
});
export const _Bordered_TriPartCallout_Style: React.CSSProperties = {
	borderTop: "2px solid",
	borderBottom: "2px solid",
	textAlign: "center",
};
