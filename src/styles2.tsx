// src/styles.tsx

import React from "react";

import backgroundPattern from "./assets/tileablebackground.png";

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
// src/styles.tsx
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

type ThemeMapping = {
	[key in keyof ReturnType<typeof Theme>]?: (keyof React.CSSProperties)[];
};

export interface IThemedComponentProps {
	theme_index?: number;
}

interface IStyle {
	// potentially interface IStyle extends React.CSSProperties {

	static_css?: React.CSSProperties;
	styleOverides?: React.CSSProperties;
	styling_function?: (...args: any[]) => React.CSSProperties;
	default_args?: any[];
	theme_args?: ThemeMapping;
	themeIdx?: number;
}
type TName = string;

class Style {
	/* 
		potentially class Style extends IStyle{...}

		may be an even cleaner api than using computedStyle if:
	=> computeUpdate sets actual class attributes to the css values.
	=> then if called acts as the functor itself?

	*/
	static_css?: React.CSSProperties;
	styleOverides?: React.CSSProperties;
	default_args?: any[];
	theme_args?: ThemeMapping;
	themeIdx?: number;
	public computedStyle = {};
	private _definition: IStyle = {};

	private _styleFN: (...args: any[]) => React.CSSProperties = (
		..._args: any[]
	) => ({});

	private styleFN(...args: any[]) {
		this._styleFN(this._definition.default_args, ...args);
	}
	public theme;
	constructor(definition: IStyle) {
		const { themeIdx: theme_index } = definition;
		if (theme_index !== undefined) {
			this.theme = Theme(theme_index);
		}
	}
	needsUpdating(definition: IStyle) {
		return JSON.stringify(definition) !== JSON.stringify(this._definition);
	}
	update(definition: IStyle) {
		this._styleFN = definition.styling_function ?? this._styleFN;
		this._definition = definition;
		this.computeUpdate();
		return this;
	}

	public updateDef(definition: IStyle): void {
		if (definition.static_css) {
			if (Object.keys(definition.static_css).length === 0) {
				delete this._definition.static_css;
			} else {
				if (!this._definition.static_css) {
					this._definition.static_css = {};
				}

				for (const [cssKey, cssValue] of Object.entries(
					definition.static_css
				)) {
					if (this._definition.theme_args) {
						for (const themeKey in this._definition.theme_args) {
							const cssProps =
								this._definition.theme_args[
									themeKey as keyof typeof this._definition.theme_args
								];
							if (
								cssProps?.includes(
									cssKey as keyof React.CSSProperties
								)
							) {
								this._definition.theme_args[
									themeKey as keyof typeof this._definition.theme_args
								] = cssProps.filter((prop) => prop !== cssKey);
							}
						}
					}
					(this._definition.static_css as any)[cssKey] = cssValue;
				}
			}
		}

		this._styleFN = definition.styling_function ?? this._styleFN;
		this._definition.styling_function =
			definition.styling_function ?? this._definition.styling_function;

		if (definition.default_args) {
			this._definition.default_args = definition.default_args;
		}

		if (definition.theme_args) {
			if (!this._definition.theme_args) {
				this._definition.theme_args = {};
			}

			for (const [themeKey, newCssProps] of Object.entries(
				definition.theme_args
			)) {
				for (const cssPropToRemove of newCssProps) {
					for (const existingThemeKey in this._definition
						.theme_args) {
						const existingCssProps =
							this._definition.theme_args[
								existingThemeKey as keyof typeof this._definition.theme_args
							];
						if (existingCssProps?.includes(cssPropToRemove)) {
							this._definition.theme_args[
								existingThemeKey as keyof typeof this._definition.theme_args
							] = existingCssProps.filter(
								(p) => p !== cssPropToRemove
							);
						}
					}
				}
				(this._definition.theme_args as any)[themeKey] = newCssProps;
			}
		}
	}

	public computeUpdate() {
		const themedCSS = this._getThemedCSS(this._definition.theme_args || {});
		const baseStyle = { ...this._definition.static_css, ...themedCSS };

		const callableFunc = (...runtimeArgs: any[]): React.CSSProperties => {
			const defaultArgs = this._definition.default_args || [];
			const dynamicArgs = [...defaultArgs, ...runtimeArgs];
			const dynamicStyle = this._styleFN(...dynamicArgs);
			return { ...baseStyle, ...dynamicStyle };
		};

		const styleForSpreading = callableFunc();

		Object.assign(callableFunc, styleForSpreading);

		this.computedStyle = callableFunc as React.CSSProperties &
			((...args: any[]) => React.CSSProperties);
	}

	private _getThemedCSS(mapping: ThemeMapping): React.CSSProperties {
		const cssProperties: React.CSSProperties = {};
		if (!this.theme) {
			return cssProperties;
		}
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

type GuardFn<TArgs extends any[], TResult> = (
	name: TName,
	...args: TArgs
) => TResult;
class Styler {
	private _styles: Record<TName, Style> = {} as Record<TName, Style>;

	private guard<TArgs extends any[], TTruthy, TFalsy>(
		name: TName,
		truthy: (name: TName, ...args: TArgs) => TTruthy,
		falsy: (name: TName, ...args: TArgs) => TFalsy,
		...args: TArgs
	): TTruthy | TFalsy {
		return this._styles[name]
			? truthy(name, ...args)
			: falsy(name, ...args);
	}
	private addStyle(name: TName, definition?: IStyle) {
		this._styles[name] = new Style(definition || {});
		return this._styles[name];
	}
	private _updateStyle() {
		return [
			(name: TName, definition: IStyle) => {
				const style = this._styles[name];
				if (style.needsUpdating(definition)) {
					style.update(definition);
				}
			},
			this.addStyle,
		] as const;
	}
	private _getStyle() {
		return [
			(name: TName, definition?: IStyle) => {
				return this._styles[name];
			},
			this.addStyle,
		] as const;
	}
	updateStyle(name: TName, definition: IStyle) {
		return this.guard(name, ...this._updateStyle(), definition);
	}
	getStyle(name: TName, definition?: IStyle) {
		return this.guard(name, ...this._getStyle(), definition);
	}
}
