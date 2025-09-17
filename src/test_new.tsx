import React from "react";

type TDefKey = `def_${string}`;
type TDefEntries<T> = {
	[key: TDefKey]: T;
};

/* Arbitrary functions that can take arbitrary arguments, any is valid here */
type ArbitraryArgs = any[];
/* Arbitrary extensions, any is valid here */
type ArbitraryValue = any;

type TDefUpdate = TDefEntries<ArbitraryValue>;
type TGetEntries<T extends TDefUpdate> = (
	style_based: T
) => T extends TDefinition ? TDefinition : TDefUpdate;

type TDefStaticCSS = TDefEntries<React.CSSProperties>;
type TDefStylingArgs = TDefEntries<ArbitraryArgs>;

type TStyleFunction<I extends ArbitraryArgs> = <T extends TDefStylingArgs>(
	default_arguments: T,
	...args: I
) => React.CSSProperties;
type TDefStylingFunction = TDefEntries<TStyleFunction<ArbitraryArgs>>;

type TProtoStyle = Pick<TDefStaticCSS, "def_default_static_css"> &
	Pick<TDefStylingArgs, "def_default_args"> &
	Pick<TDefStylingFunction, "def_default_styling_function">;
type TDefinition = TDefUpdate & TProtoStyle;

type TCSSApplicator<TStyleArgs extends React.CSSProperties[] | TDefinition[]> =
	(...args: [...TStyleArgs, ...ArbitraryArgs]) => void;

type TProcessor<T> = (arg: T) => void;
type TProcessors<T extends TDefinition> = {
	[K in keyof T]: TProcessor<T[K]>;
};

interface BaseStyle {
	definitions: TProtoStyle;
	processors: TProcessors<TProtoStyle>;

	getDefinitions: () => TProtoStyle;
	getProcessors: () => TProcessors<TProtoStyle>;
}

interface IStyle<TDefs extends TDefinition>
	extends React.CSSProperties,
		BaseStyle {
	buildFunctor: (CSS: React.CSSProperties) => TStyleFunctor<TProtoStyle>;
	extractCSS: (this: TStyleFunctor<any>) => React.CSSProperties;
	getDefinitions: () => TDefs;

	getDefinition: () => ReturnType<TGetEntries<TDefs>>;

	getProcessors: () => TProcessors<TDefs>;

	definitions: TDefs;
	processors: TProcessors<TDefs>;

	/* Construct Time procedure */
	constructor: TStyleFunctor<TDefs> | Function;
	init_computer: <T extends TDefs>(proto_style: T) => void;
	init_resolver: TCSSApplicator<[TDefUpdate]>;

	/* Call Time procedure */
	functor: TStyleFunctor<TDefs>;
	func_computer: (...args: ArbitraryArgs) => React.CSSProperties;

	func_resolver: TCSSApplicator<[React.CSSProperties]>;
}

const getUpdate = <T extends TDefUpdate>(
	...args: Parameters<TGetEntries<T>>
) => {
	let def: TDefUpdate = {};
	Object.entries(args[0]).forEach((item) => {
		if (item[0].startsWith("def_")) {
			Object.assign(def, { [item[0]]: item[1] });
		}
	});
	return def as ReturnType<TGetEntries<T>>;
};

interface IFunctor<in out I extends TDefinition> {
	(...args: ArbitraryArgs): TStyleFunctor<I>;
	new <O extends I>(...args: ArbitraryArgs): TStyleFunctor<O>;
}

type TStyleFunctor<T extends TDefinition> = Style<T> &
	IFunctor<T> &
	React.CSSProperties;

class ProtoStyle implements BaseStyle {
	definitions: TProtoStyle;
	processors: TProcessors<TProtoStyle>;

	getDefinitions() {
		const definitions: TProtoStyle = {
			def_default_static_css: {},
			def_default_styling_function: (...args) => ({}),
			def_default_args: [],
		};
		// return definitions;
		return definitions as this["definitions"];
	}
	getProcessors() {
		const processors: TProcessors<TProtoStyle> = {
			def_default_static_css: (static_style) => {},
			def_default_styling_function: (styling_function): void => {},
			def_default_args: (default_arguments) => {},
		};
		return processors as this["processors"];
	}
	constructor() {
		this.definitions = this.getDefinitions();
		this.processors = this.getProcessors();
	}
}

class Style<TDefs extends TProtoStyle>
	extends ProtoStyle
	implements IStyle<TDefs>
{
	definitions!: TDefs;
	processors!: TProcessors<TDefs>;
	getDefinitions() {
		return super.getDefinitions();
	}
	getProcessors() {
		const processors: TProcessors<TDefs> = {
			...super.getProcessors(),
			...{
				def_default_static_css: (static_style) => {
					this.definitions.def_default_static_css = static_style;
					Object.assign(this, { ...static_style });
				},

				def_default_styling_function: (styling_function): void => {
					this.definitions.def_default_styling_function =
						styling_function;
				},
				def_default_args: (default_arguments) => {
					this.definitions.def_default_args = default_arguments;
				},
			},
		};
		return processors;
	}

	extractCSS() {
		const exclusionList = Object.getOwnPropertyNames(
			new (this.constructor as typeof this.functor)()
		);

		const css = {} as React.CSSProperties;
		for (const key in this) {
			if (!exclusionList.includes(key)) {
				Object.assign(css, { [key]: this[key] });
			}
		}
		return css;
	}
	buildFunctor(css: React.CSSProperties) {
		return new Style<TProtoStyle>({
			def_default_static_css: css,
		}) as TStyleFunctor<TProtoStyle>;
	}
	functor: TStyleFunctor<TDefs>;
	constructor(proto_style: TDefUpdate = {}) {
		super();
		this.definitions = this.getDefinitions();
		this.processors = this.getProcessors();
		this.init_computer({
			...this.definitions,
			...proto_style,
		});
		this.init_resolver(proto_style);
		console.log(this);
		let self = this;

		this.functor = function functor(...args: ArbitraryArgs) {
			if (new.target) {
				const def = self.functor.getDefinition();
				return new Style(def);
			}
			const computed_style = self.functor.func_computer(...args);

			self.functor.func_resolver(computed_style);
			return self.functor;
		} as TStyleFunctor<TDefs>;

		Object.assign(this.functor, { ...this });

		Object.setPrototypeOf(this.functor, this);
		return this.functor;
	}

	init_computer<T extends TDefs>(proto_style: T) {
		const definitionsToProcess = getUpdate(proto_style);
		console.log(this.processors);

		for (const key in definitionsToProcess) {
			const defKey = key as keyof TDefinition;

			if (defKey in this.processors) {
				const processor =
					this.processors[
						defKey as keyof TProcessors<TDefs> & keyof TDefs
					];
				const value = definitionsToProcess[defKey];
				processor(value);
			}
		}
	}
	init_resolver(style_based: TDefUpdate, ...args: ArbitraryArgs) {}

	func_computer(...args: ArbitraryArgs) {
		return this.definitions.def_default_styling_function(
			{ def_default_args: this.definitions.def_default_args }, //obey interface correctly
			...args
		);
	}
	func_resolver(style_based: React.CSSProperties, ...args: ArbitraryArgs) {
		Object.assign(this.functor, { ...style_based });
	}
	getDefinition() {
		return getUpdate(this.definitions);
	}
}

const static_style: React.CSSProperties = {
	margin: "10%",
};

const some_styling_function: TStyleFunction<[string]> = (
	default_arguments,
	input
) => {
	return { border: input };
};
const proto_style: TProtoStyle = {
	def_default_args: [],
	def_default_static_css: static_style,
	def_default_styling_function: some_styling_function,
};

/* This works Perfectly and as expected */

// const s = new Style<TProtoStyle>(proto_style) as TStyleFunctor<TProtoStyle>;

// console.log(s);
// console.log(s("green"));

// console.log(s.extractCSS());
// console.log(s);
// console.log(s());
// console.log(s === s("green"));
// /* Dont even have to annotate it after the first construction */
// const s2 = new s();
// console.log(s2);
// console.log(s2 instanceof s);
// console.log(new s2());
// console.log();

// interface IOverridableProtoStyle extends TProtoStyle {
// 	;
// }
type TOverridable = { def_overrides: React.CSSProperties } & TProtoStyle;

class OverridableStyle<T extends Required<TOverridable>> extends Style<T> {
	getDefinitions() {
		return { ...super.getDefinitions(), def_overrides: {} };
	}

	getProcessors() {
		return {
			...super.getProcessors(),
			def_overrides: (overrides: React.CSSProperties) => {
				this.definitions.def_overrides = overrides;

				Object.assign(this, { ...overrides });
			},
		};
	}
	def_overrides(overrides: React.CSSProperties) {
		this.definitions.def_overrides = overrides;

		Object.assign(this, { ...overrides });
	}

	init_resolver(update: T, ...args: ArbitraryArgs) {
		console.log("H");
		super.init_resolver(update);
		console.log(update);

		const { def_overrides } = update;
		console.log();
		this.definitions.def_overrides = def_overrides;
		console.log(this.definitions.def_overrides);

		Object.assign(this, {
			...this.definitions.def_overrides,
		});
	}
	func_resolver(overrides: React.CSSProperties, ...arg: ArbitraryArgs) {
		Object.assign(this.functor, {
			...overrides,
			...this.definitions.def_overrides,
		});
	}
}

console.log("\n--- Test Case 1: Simple Static Overrides ---");
const staticBaseStyle: React.CSSProperties = {
	backgroundColor: "blue",
	padding: "10px",
};
const overrideStyle: React.CSSProperties = {
	backgroundColor: "red", // Should override blue
	borderRadius: "5px", // Should be added
};

const protoStyle1: TOverridable = {
	def_default_static_css: staticBaseStyle,
	def_overrides: overrideStyle,
	def_default_styling_function: () => ({}), // No dynamic function for this test
	def_default_args: [],
};

const s1 = new OverridableStyle<TOverridable>(protoStyle1) as any;

console.log(s1);
// Expected: { backgroundColor: 'red', padding: '10px', borderRadius: '5px' }
console.log("s1 (callable):", s1());
// Expected: { backgroundColor: 'red', padding: '10px', borderRadius: '5px' }
// console.log("s1 (after call) === s1 (before call):", s1 === s1());
// Expected: true (due to in-place mutation and return of self)

// const f = () => {};

type TStyle = `${string}_style${string | ""}`;

type TName = `${string}_style`;
type TThemeName = `${string}_style.${number}`;

type GuardFn<TArgs extends any[], TResult> = (
	name: TName,
	...args: TArgs
) => TResult;

// class Styler<T extends TDefinition, S extends Style<T>> {
// 	[key: string]: S;
// 	stype: S;
// 	// /* convenience function as a guard */
// 	constructor(style: S) {
// 		this.stype = style;
// 	}
// 	private guard<TArgs extends any[], TTruthy, TFalsy>(
// 		name: TName,
// 		truthy: GuardFn<TArgs, TTruthy>,
// 		falsy: GuardFn<TArgs, TFalsy>,
// 		...args: TArgs
// 	): TTruthy | TFalsy {
// 		return this[name] ? truthy(name, ...args) : falsy(name, ...args);
// 	}

// 	private addStyle = (name: TName, update?: Partial<T>) => {
// 		this[name] = new (this.stype as any)(update);
// 		return this[name];
// 	};
// 	// private _updateStyle() {
// 	// 	return [
// 	// 		(name: TName, definition: Partial<IProtoStyle>) => {
// 	// 			// const style = this[name];
// 	// 			if (this[name].needsUpdating(definition)) {
// 	// 				this[name].updateDef(definition);
// 	// 			}
// 	// 		},
// 	// 		this.addStyle,
// 	// 	] as const;
// 	// }

// 	// private _getStyle() {
// 	// 	const truthyFn = (
// 	// 		name: string,
// 	// 		definition?: IProtoStyle,
// 	// 		invoke?: boolean
// 	// 	) => {
// 	// 		return this[name];
// 	// 	};

// 	// 	const falsyFn = (
// 	// 		name: string,
// 	// 		definition?: IProtoStyle,
// 	// 		invoke?: boolean
// 	// 	) => {
// 	// 		return this.addStyle(name as TName, definition);
// 	// 	};

// 	// 	return [truthyFn, falsyFn] as const;
// 	// }
// 	// updateStyle(name: TName, definition: IProtoStyle) {
// 	// 	return this.guard(name, ...this._updateStyle(), definition);
// 	// }
// 	// getStyle(name: TName, definition?: IProtoStyle, invoke?: boolean) {
// 	// 	return this.guard(name, ...this._getStyle(), definition, invoke);
// 	// }
// 	// public applyOverride(
// 	// 	name: TName,
// 	// 	css: React.CSSProperties = {}
// 	// ): React.CSSProperties & ((...args: any[]) => React.CSSProperties) {
// 	// 	const functor = (...runtimeArgs: any[]): React.CSSProperties => {
// 	// 		const baseStyleObject = this.getStyle(name);
// 	// 		if (!baseStyleObject) {
// 	// 			return css;
// 	// 		}

// 	// 		const computedBase = baseStyleObject.call(...runtimeArgs);

// 	// 		return { ...computedBase, ...css };
// 	// 	};

// 	// 	const styleForSpreading = functor();

// 	// 	Object.assign(functor, styleForSpreading);
// 	// 	return functor as React.CSSProperties &
// 	// 		((...args: any[]) => React.CSSProperties);
// 	// }
// }
