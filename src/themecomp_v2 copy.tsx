// // src/themecomp_v2.tsx

// import React from "react";

// import {
// 	midnight_green,
// 	l_midnight_green,
// 	logo_blue,
// 	light_logo_blue,
// 	lighter_logo_blue,
// 	logo_yellow,
// 	light_mix_green,
// 	dark_midnight_green,
// 	dark_mix_green,
// } from "./utils/defaultColours";
// import { Property } from "csstype";

// export const Theme = (index: number) => {
// 	const theme = {
// 		backgroundColor: "#FFFFFF",
// 		primaryColor: midnight_green,
// 		secondaryColor: l_midnight_green,
// 		tertiaryColor: logo_blue,
// 	};
// 	if (index === -1) {
// 		theme.backgroundColor = "transparent";
// 		theme.primaryColor = light_logo_blue;
// 		theme.secondaryColor = lighter_logo_blue;
// 		theme.tertiaryColor = logo_yellow;
// 	} else if (index % 2 === 1) {
// 		theme.backgroundColor = light_mix_green;
// 		theme.primaryColor = dark_midnight_green;
// 		theme.secondaryColor = dark_mix_green;
// 		theme.tertiaryColor = midnight_green;
// 	}
// 	return theme;
// };
// export type ThemeObject = ReturnType<typeof Theme>;
// export type ThemeMapping = {
// 	[key in keyof ThemeObject]?: (keyof React.CSSProperties)[];
// };

// export const getThemedCSS = (
// 	theme: ThemeObject,
// 	mapping: ThemeMapping
// ): React.CSSProperties => {
// 	const cssProperties: React.CSSProperties = {};

// 	for (const themeKey in mapping) {
// 		if (Object.prototype.hasOwnProperty.call(theme, themeKey)) {
// 			const cssPropertyNames = mapping[themeKey as keyof ThemeMapping];
// 			const colorValue = theme[themeKey as keyof typeof theme];

// 			cssPropertyNames?.forEach((cssPropertyName) => {
// 				(cssProperties as any)[cssPropertyName] = colorValue;
// 			});
// 		}
// 	}
// 	return cssProperties;
// };

// // export interface IS extends React.CSSProperties {
// // 	def_static_css?: React.CSSProperties;
// // 	def_styling_function?: (...args: any[]) => React.CSSProperties;
// // 	def_default_args?: any[];
// // 	def_theme_args?: ThemeMapping;
// // 	def_themeIdx?: number | undefined;
// // }

// export interface IProtoStyle {
// 	def_static_css: React.CSSProperties;
// 	def_styling_function: (...args: any[]) => React.CSSProperties;
// 	def_default_args: any[];
// }
// export type TDefinition = Partial<IProtoStyle>;
// export interface IStyle extends IProtoStyle, React.CSSProperties {
// 	[key: string]: any;
// 	getDefinition: () => IProtoStyle;
// 	updateDef: (definition: TDefinition) => void;
// }

// export class Style implements IStyle {
// 	[key: string]: any;

// 	def_static_css: React.CSSProperties = {};
// 	def_styling_function: (...args: any[]) => React.CSSProperties = () => ({});
// 	def_default_args: any[] = [];
// 	_assignedCssKeys: Set<string> = new Set();

// 	public getDefinition(): IProtoStyle {
// 		return {
// 			def_static_css: this.def_static_css,
// 			def_styling_function: this.def_styling_function,
// 			def_default_args: this.def_default_args,
// 		};
// 	}

// 	constructor(definition?: IProtoStyle) {
// 		if (definition) this.updateDef(definition);
// 	}

// 	public needsUpdating(definition: TDefinition): boolean {
// 		if (
// 			definition.def_styling_function &&
// 			definition.def_styling_function !== this.def_styling_function
// 		)
// 			return true;

// 		if (
// 			JSON.stringify(definition.def_static_css) !==
// 			JSON.stringify(this.def_static_css)
// 		)
// 			return true;
// 		if (
// 			JSON.stringify(definition.def_default_args) !==
// 			JSON.stringify(this.def_default_args)
// 		)
// 			return true;

// 		return false;
// 	}

// 	/*
// private resolveCollisions(
// 		definition: TDefinition & Pick<IProtoStyle, "def_static_css">
// 	): void {}
//  */

// 	public updateDef(definition: TDefinition): void {
// 		this._def_styling_function =
// 			definition.def_styling_function ?? this._def_styling_function;
// 		if (definition.def_default_args) {
// 			this.def_default_args = definition.def_default_args;
// 		}
// 		if (definition.def_static_css) {
// 			if (Object.keys(definition.def_static_css).length === 0) {
// 				this.def_static_css = {};
// 			}
// 			if (!this.def_static_css) this.def_static_css = {};
// 			for (const [cssKey, cssValue] of Object.entries(
// 				definition.def_static_css
// 			)) {
// 				// this.def_static_css[cssKey] = cssValue;
// 				(this.def_static_css as any)[cssKey] = cssValue;
// 			}
// 		}

// 		this._recompute(); /* cant remember why we call this */
// 	}

// 	private _recompute(): void {
// 		this._assignedCssKeys.forEach((key) => delete this[key]);
// 		this._assignedCssKeys.clear();

// 		const baseStyle = { ...this.def_static_css };

// 		for (const [key, value] of Object.entries(baseStyle)) {
// 			this[key] = value;
// 			this._assignedCssKeys.add(key);
// 		}
// 	}
// 	/*
// 	private _rrecompute(): void {
// 		const clean = new Style(this);
// 		Object.keys(this).forEach((key) => {
// 			delete this[key];
// 		});
// 		Object.assign(this, clean);
// 	}
// 	*/
// 	public call(...runtimeArgs: any[]): React.CSSProperties {
// 		const defaultArgs = this.def_default_args || [];

// 		const finalArgs = [...defaultArgs];

// 		for (let i = 0; i < runtimeArgs.length; i++) {
// 			finalArgs[i] = runtimeArgs[i];
// 		}

// 		const dynamicStyle = this.def_styling_function(...finalArgs);

// 		return { ...this, ...dynamicStyle };
// 	}
// }

// type TStyle = `${string}_style${string | ""}`;

// type TName = `${string}_style`;
// type TThemeName = `${string}_style.${number}`;

// type GuardFn<TArgs extends any[], TResult> = (
// 	name: TName,
// 	...args: TArgs
// ) => TResult;

// class Styler {
// 	[key: string]: any;

// 	/* convenience function as a guard */
// 	private guard<TArgs extends any[], TTruthy, TFalsy>(
// 		name: TName,
// 		truthy: GuardFn<TArgs, TTruthy>,
// 		falsy: GuardFn<TArgs, TFalsy>,
// 		...args: TArgs
// 	): TTruthy | TFalsy {
// 		return this[name] ? truthy(name, ...args) : falsy(name, ...args);
// 	}

// 	private addStyle = (name: TName, definition?: IProtoStyle) => {
// 		this[name] = new Style(definition);
// 		return this[name];
// 	};
// 	private _updateStyle() {
// 		return [
// 			(name: TName, definition: Partial<IProtoStyle>) => {
// 				// const style = this[name];
// 				if (this[name].needsUpdating(definition)) {
// 					this[name].updateDef(definition);
// 				}
// 			},
// 			this.addStyle,
// 		] as const;
// 	}

// 	private _getStyle() {
// 		const truthyFn = (
// 			name: string,
// 			definition?: IProtoStyle,
// 			invoke?: boolean
// 		) => {
// 			return this[name];
// 		};

// 		const falsyFn = (
// 			name: string,
// 			definition?: IProtoStyle,
// 			invoke?: boolean
// 		) => {
// 			return this.addStyle(name as TName, definition);
// 		};

// 		return [truthyFn, falsyFn] as const;
// 	}
// 	updateStyle(name: TName, definition: IProtoStyle) {
// 		return this.guard(name, ...this._updateStyle(), definition);
// 	}
// 	getStyle(name: TName, definition?: IProtoStyle, invoke?: boolean) {
// 		return this.guard(name, ...this._getStyle(), definition, invoke);
// 	}
// 	public applyOverride(
// 		name: TName,
// 		css: React.CSSProperties = {}
// 	): React.CSSProperties & ((...args: any[]) => React.CSSProperties) {
// 		const functor = (...runtimeArgs: any[]): React.CSSProperties => {
// 			const baseStyleObject = this.getStyle(name);
// 			if (!baseStyleObject) {
// 				return css;
// 			}

// 			const computedBase = baseStyleObject.call(...runtimeArgs);

// 			return { ...computedBase, ...css };
// 		};

// 		const styleForSpreading = functor();

// 		Object.assign(functor, styleForSpreading);
// 		return functor as React.CSSProperties &
// 			((...args: any[]) => React.CSSProperties);
// 	}
// }

// export interface IThemedComponentProps {
// 	themeId?: number;
// 	debugStyles?: boolean | string[];
// }
// export const DebugSectionStyle: React.CSSProperties = {
// 	border: "1px solid fuchsia !important", // Changed color to be obvious
// 	backgroundColor: "rgba(255, 0, 255, 0.2) !important",
// 	boxSizing: "border-box",
// };

// export class ThemedComponent<P = {}, S = {}> extends React.Component<
// 	P & IThemedComponentProps,
// 	S
// > {
// 	static styler: Styler = new Styler();
// 	static {
// 		if (!this.hasOwnProperty("styler")) {
// 			this.styler = Object.create(this.styler);
// 		}
// 	}

// 	private _proxyCache: { [key: string]: any } = {};
// 	public styler?: Styler;

// 	constructor(props: P & IThemedComponentProps) {
// 		super(props);

// 		const staticStyler = (this.constructor as typeof ThemedComponent)
// 			.styler;

// 		// If no theming or debugging is needed, just use the static styler directly.
// 		if (props.themeId === undefined && !props.debugStyles) {
// 			// this.styler = staticStyler;
// 			return;
// 		}
// 		// Otherwise, create a proxy to handle instance-specific logic.
// 		this.styler = new Proxy(staticStyler, {
// 			get: (target: Styler, prop: string, receiver): any => {
// 				// Return cached version if available
// 				if (this._proxyCache[prop]) {
// 					return this._proxyCache[prop];
// 				}

// 				// Only operate on style objects
// 				const baseStyleObject = Reflect.get(target, prop, receiver);
// 				if (!(baseStyleObject instanceof Style)) {
// 					return baseStyleObject;
// 				}

// 				// --- 1. Determine Theming ---
// 				const localTheme =
// 					props.themeId !== undefined
// 						? Theme(props.themeId)
// 						: undefined;
// 				const themedCssPart = localTheme
// 					? getThemedCSS(
// 							localTheme,
// 							baseStyleObject.def_theme_args || {}
// 					  )
// 					: {};

// 				// --- 2. Determine Debugging ---
// 				const debugMode = props.debugStyles;
// 				const applyDebug =
// 					debugMode === true ||
// 					(Array.isArray(debugMode) &&
// 						debugMode.includes(prop as TName));

// 				const debugCssPart = applyDebug ? DebugSectionStyle : {};

// 				// --- 3. Create the new, enhanced style object ---

// 				// This part is for spreading: { ...styler.some_style }
// 				const spreadablePart = {
// 					...baseStyleObject,
// 					...themedCssPart,
// 					...debugCssPart,
// 				};

// 				// This part is for calling: styler.some_style.call()
// 				const wrappedCall = (
// 					...runtimeArgs: any[]
// 				): React.CSSProperties => {
// 					const dynamicallyComputedBase = baseStyleObject.call(
// 						...runtimeArgs
// 					);
// 					return {
// 						...dynamicallyComputedBase,
// 						...themedCssPart,
// 						...debugCssPart,
// 					};
// 				};

// 				const wrapper = {
// 					...spreadablePart,
// 					call: wrappedCall,
// 				};

// 				this._proxyCache[prop] = wrapper;
// 				return wrapper;
// 			},
// 		});
// 	}
// }
