// src/test.tsx

import React from "react";
import { Theme } from "./styles";

type ThemeMapping = {
	[key: string]: (keyof React.CSSProperties)[];
};

export type Styles =
	| (React.CSSProperties & ((...args: any[]) => React.CSSProperties))
	| (() => {}); // necessary since i cant declare it as undefined if i wanna use instance attributes

interface IStyle {
	static_css?: React.CSSProperties;
	styleOverides?: React.CSSProperties;
	styling_function?: (...args: any[]) => React.CSSProperties;
	default_args?: any[];
	theme_args?: ThemeMapping;
}

interface IThemeableComponentProps {
	theme_index?: number;
}

interface IStyleFunction {
	default_args?: any[];
}

export const styles = (style_properties: IStyle): Styles => {
	const {
		static_css = {},
		styleOverides = {},
		styling_function = (...a: any[]) => ({ a }),
		default_args = [],
	} = style_properties;
	const _inner: any = (
		args: any[] = [],
		propOverrides: React.CSSProperties = {}
	) => {
		return {
			...static_css,
			...styling_function(...args, ...default_args),
			...styleOverides,
			...propOverrides,
		};
	};

	Object.assign(_inner, { ...static_css, ...styleOverides });
	return _inner;
};
class Styler {
	public theme = {};
	getThemedCSS = (mapping: ThemeMapping): React.CSSProperties => {
		const cssProperties: React.CSSProperties = {};

		for (const themeKey in mapping) {
			if (Object.prototype.hasOwnProperty.call(this.theme, themeKey)) {
				const cssPropertyNames = mapping[themeKey];
				if (this.theme) {
					const colorValue =
						this.theme[themeKey as keyof typeof this.theme];

					cssPropertyNames.forEach((cssPropertyName) => {
						(cssProperties as any)[cssPropertyName] = colorValue;
					});
				}
			}
		}

		return cssProperties;
	};

	process_style = (style_properties: IStyle): Styles => {
		const {
			static_css = {},
			styleOverides = {},
			styling_function = (...a: any[]) => ({ a }),
			default_args = [],
			theme_args = {},
		} = style_properties;
		const _inner: any = (
			args: any[] = [],
			propOverrides: React.CSSProperties = {}
		) => {
			return {
				...static_css,
				...styling_function(...args, ...default_args, theme_args),
				...styleOverides,
				...propOverrides,
				...this.getThemedCSS(theme_args),
			};
		};

		Object.assign(_inner, {
			...static_css,
			...styleOverides,
			...this.getThemedCSS(theme_args),
		});
		return _inner;
	};
	constructor(theme_index?: number) {
		if (theme_index !== undefined) {
			this.theme = Theme(theme_index);
		}
	}
}

export class ThemedComponent<P = {}, S = {}> extends React.Component<
	P & IThemeableComponentProps, // Combines subclass props with our base props
	S
> {
	public _style;
	style(style_properties: IStyle) {
		return this._style.process_style(style_properties);
	}
	constructor(props: P & IThemeableComponentProps) {
		super(props);
		this._style = new Styler(this.props.theme_index);
	}
}
const some_element_static_style: React.CSSProperties = {
	border: "1px solid",
};
export class DemoClassA extends ThemedComponent {
	SomeElementStyle() {
		return {
			...this.style({
				static_css: some_element_static_style,
				theme_args: {
					tertiaryColor: ["borderColor"],
				},
			}),
		};
	}
	render() {
		console.log(this.SomeElementStyle());

		return (
			<div style={this.SomeElementStyle()}>
				<div style={{ width: "100px", height: "100px" }}></div>
			</div>
		);
	}
}

export class DemoClass extends ThemedComponent {
	SomeElementStyle() {
		return {
			...this.style({
				static_css: some_element_static_style,
				theme_args: {
					tertiaryColor: ["borderColor"],
				},
			}),
		};
	}
	render() {
		console.log(this.SomeElementStyle());

		return (
			<div style={this.SomeElementStyle()}>
				<div style={{ width: "100px", height: "100px" }}></div>
			</div>
		);
	}
}
