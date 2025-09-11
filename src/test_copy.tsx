import React from "react";
import { Theme } from "./styles"; // Assuming 'styles' is the correct path

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

interface IThemedComponentProps {
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
		if (this.props.theme_index) {
			this.theme = Theme(this.props.theme_index);
		}
	}

	protected getStyle(
		key: string,
		runtimeArgs: any[] = []
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

		return {
			...cache.staticAndThemedCSS,
			...cache.dynamicCSS,
			...finalDefinition.styleOverides,
		};
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

const some_element_static_style: React.CSSProperties = {
	border: "2px solid black",
};

export class DemoClassA extends ThemedComponent {
	static {
		this.declareStyle("SomeElementStyle", {
			static_css: some_element_static_style,
			theme_args: {
				primaryColor: ["backgroundColor"],

				secondaryColor: ["borderColor"],
			},
		});
	}

	render() {
		return <div style={this.getStyle("SomeElementStyle")}>Class A</div>;
	}
}

export class DemoClassB extends DemoClassA {
	static {
		this.declareStyle("SomeElementStyle", {
			theme_args: {
				primaryColor: ["borderColor"],
				secondaryColor: ["backgroundColor"],
				tertiaryColor: ["color"],
			},
		});
	}

	render() {
		return (
			<div style={this.getStyle("SomeElementStyle")}>
				Class B (Inherited & Overridden)
			</div>
		);
	}
}
