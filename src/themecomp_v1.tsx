// src/themecomp_v1.tsx

import React from "react";
import {
	midnight_green,
	l_midnight_green,
	logo_blue,
	light_logo_blue,
	lighter_logo_blue,
	logo_yellow,
	light_mix_green,
	dark_midnight_green,
	dark_mix_green,
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

type ThemeMapping = {
	[key in keyof ReturnType<typeof Theme>]?: (keyof React.CSSProperties)[];
};

interface IStyle {
	static_css?: React.CSSProperties;
	styleOverides?: React.CSSProperties;
	styling_function?: (...args: any[]) => React.CSSProperties;
	default_args?: any[];
	theme_args?: ThemeMapping;
}

export interface IThemedComponentProps {
	theme_index?: number;
}

export class ThemedComponent<P = {}, S = {}> extends React.Component<
	P & IThemedComponentProps,
	S
> {
	static styleDefinitions: { [key: string]: IStyle } = {};
	static declareStyle(key: string, value: IStyle) {
		if (!this.hasOwnProperty("styleDefinitions")) {
			this.styleDefinitions = Object.create(this.styleDefinitions);
		}

		this.styleDefinitions[key] = value;
	}
	public theme = {};

	private _styleCache: {
		[key: string]: {
			staticAndThemedCSS?: React.CSSProperties;
			dynamicCSS?: React.CSSProperties;
			lastDynamicArgs?: string;
		};
	} = {};

	constructor(props: P & IThemedComponentProps) {
		super(props);
		if (this.props.theme_index !== undefined) {
			this.theme = Theme(this.props.theme_index);
		}
	}

	protected getStyle(
		key: string,
		runtimeArgs: any[] = [],
		runTimeOverrides: React.CSSProperties = {}
	): React.CSSProperties {
		this._styleCache[key] = this._styleCache[key] || {};
		const cache = this._styleCache[key];

		const finalDefinition = this.getMergedStyleDefinition(key);

		if (!cache.staticAndThemedCSS) {
			const themedCSS = this.getThemedCSS(
				finalDefinition.theme_args || {}
			);
			cache.staticAndThemedCSS = {
				...finalDefinition.static_css,
				...themedCSS,
			};
		}

		const { styling_function, default_args = [] } = finalDefinition;
		const currentDynamicArgs = [...default_args, ...runtimeArgs];
		const currentDynamicArgsString = JSON.stringify(currentDynamicArgs);

		if (
			styling_function &&
			cache.lastDynamicArgs !== currentDynamicArgsString
		) {
			cache.dynamicCSS = styling_function(...currentDynamicArgs);
			cache.lastDynamicArgs = currentDynamicArgsString;
		}
		const returnObj = {
			...cache.staticAndThemedCSS,
			...cache.dynamicCSS,
			...finalDefinition.styleOverides,
			...runTimeOverrides,
		};
		if (finalDefinition.styleOverides) {
			cache.staticAndThemedCSS = {
				...cache.staticAndThemedCSS,
				...finalDefinition.styleOverides,
			};
		}
		return returnObj;
	}

	private getMergedStyleDefinition(key: string): IStyle {
		let finalDefinition: IStyle = {};
		let currentClass = this.constructor as typeof ThemedComponent;
		const definitionsToMerge: IStyle[] = [];

		while (currentClass && currentClass.styleDefinitions) {
			if (
				Object.prototype.hasOwnProperty.call(
					currentClass.styleDefinitions,
					key
				)
			) {
				definitionsToMerge.push(currentClass.styleDefinitions[key]);
			}
			currentClass = Object.getPrototypeOf(currentClass);
		}

		for (const def of definitionsToMerge) {
			finalDefinition = {
				...finalDefinition,
				static_css: {
					...def.static_css,

					...finalDefinition.static_css,
				},
				styleOverides: {
					...def.styleOverides,

					...finalDefinition.styleOverides,
				},
				theme_args: {
					...def.theme_args,

					...finalDefinition.theme_args,
				},
				default_args: finalDefinition.default_args || def.default_args,
				styling_function:
					finalDefinition.styling_function || def.styling_function,
			};
		}
		return finalDefinition;
	}

	private getThemedCSS(mapping: ThemeMapping): React.CSSProperties {
		const cssProperties: React.CSSProperties = {};
		for (const themeKey in mapping) {
			if (Object.prototype.hasOwnProperty.call(this.theme, themeKey)) {
				const cssPropertyNames =
					mapping[themeKey as keyof ThemeMapping];
				const colorValue =
					this.theme[themeKey as keyof typeof this.theme];
				cssPropertyNames?.forEach((cssPropertyName) => {
					(cssProperties as any)[cssPropertyName] = colorValue;
				});
			}
		}
		return cssProperties;
	}
}
