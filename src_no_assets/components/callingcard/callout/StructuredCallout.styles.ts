// src/components/callingcard/callout/StructuredCallout.styles.ts

import React from "react";
import {
	title_font_colour,
	body_font_colour,
} from "../../../utils/defaultColours";
export const _style_structuredCalloutTitle: React.CSSProperties = {
	color: title_font_colour,
};
export const style_StructuredCallOutTitle = `${_style_structuredCalloutTitle}`;

export const _style_structuredCalloutBody: React.CSSProperties = {
	color: body_font_colour,
};
export const style_StructuredCallOutBody = `${_style_structuredCalloutBody}`;

export const _style_BorderedCalloutHeading: React.CSSProperties = {
	borderTop: "2px solid",
	borderBottom: "2px solid",
};

export const style_BorderedCalloutHeading = `${_style_BorderedCalloutHeading}`;
