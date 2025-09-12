import React from "react";

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

/* 

The following is an excerpt of the file  src/styles.tsx, so dont worry about the missing imports, they exist in the actual file
*/

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
export type ThemeObject = ReturnType<typeof Theme>;
export type ThemeMapping = {
	[key in keyof ThemeObject]?: (keyof React.CSSProperties)[];
};

export const getThemedCSS = (
	theme: ThemeObject,
	mapping: ThemeMapping
): React.CSSProperties => {
	const cssProperties: React.CSSProperties = {};

	for (const themeKey in mapping) {
		if (Object.prototype.hasOwnProperty.call(theme, themeKey)) {
			const cssPropertyNames = mapping[themeKey as keyof ThemeMapping];
			const colorValue = theme[themeKey as keyof typeof theme];

			cssPropertyNames?.forEach((cssPropertyName) => {
				(cssProperties as any)[cssPropertyName] = colorValue;
			});
		}
	}
	return cssProperties;
};

export interface IStyle extends React.CSSProperties {
	def_static_css?: React.CSSProperties;
	def_styling_function?: (...args: any[]) => React.CSSProperties;
	def_default_args?: any[];
	def_theme_args?: ThemeMapping;
	_def_themeId?: number | undefined;
}
