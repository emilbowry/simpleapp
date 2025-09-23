import React from "react";
import { Theme } from "../../styles";

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
) => T extends TProtoStyle ? T : TDefUpdate;

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

	init_computer(proto_style: TDefs) {
		const definitionsToProcess = getUpdate(proto_style) as TDefs; // SEEMS dumb as hell why not infered since it extends protostyle

		for (const key in definitionsToProcess) {
			if (key in this.processors) {
				const processor = this.processors[key];
				const value = definitionsToProcess[key];
				processor(value);
			}
		}
	}
	init_resolver(style_based: TDefUpdate, ...args: ArbitraryArgs) {}

	func_computer(...args: ArbitraryArgs) {
		return this.definitions.def_default_styling_function(
			/* to obey interface correctly */
			{ def_default_args: this.definitions.def_default_args },
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
