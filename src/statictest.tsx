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

/* Logically correct, any object with complete definitions returns a complete definition */
type TGetEntries<T extends TDefUpdate> = (
	style_based: T
) => T extends TDefinition ? TDefinition : TDefUpdate;

type TStaticCSS = TDefEntries<React.CSSProperties>;
type TStylingArgs = TDefEntries<ArbitraryArgs>;

type TStyleFunction<I extends ArbitraryArgs> = <T extends TStylingArgs>(
	default_arguments: T,
	...args: I
) => React.CSSProperties;

type TCSSApplicator<TStyleArgs extends React.CSSProperties[] | TDefinition[]> =
	(...args: [...TStyleArgs, ...ArbitraryArgs]) => void;

type TStylingFunction = TDefEntries<TStyleFunction<ArbitraryArgs>>;

type TProtoStyle = Pick<TStaticCSS, "def_default_static_css"> &
	Pick<TStylingArgs, "def_default_args"> &
	Pick<TStylingFunction, "def_default_styling_function">;
type TDefinition = TDefUpdate & TProtoStyle; // cant remember why chose interface

type TProcessor<T> = (arg: T) => void;
type TProcessors<T extends TDefinition> = {
	[K in keyof T]: TProcessor<T[K]>;
};

interface BaseStyle {
	processors: TProcessors<TProtoStyle>;
	definitions: TProtoStyle;
}

export interface IStyle<TDefs extends TDefinition>
	extends React.CSSProperties,
		BaseStyle {
	getDefinition: () => ReturnType<TGetEntries<TDefs>>;
	buildFunctor: (CSS: React.CSSProperties) => TStyleFunctor<TProtoStyle>;
	extractCSS: (this: TStyleFunctor<any>) => React.CSSProperties;
	definitions: TDefs;
	processors: TProcessors<TDefs>;

	/* Construct Time procedure */
	constructor: Function;
	construction: {
		computer: <T extends TDefs>(proto_style: T) => void;

		resolver: TCSSApplicator<[TDefUpdate]>;
	};

	/* Call Time procedure */
	functor: TStyleFunctor<TDefs>;
	invocation: {
		computer: (...args: ArbitraryArgs) => React.CSSProperties;

		resolver: TCSSApplicator<[TStyleFunctor<TDefs>, React.CSSProperties]>;
	};
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
	definitions: TProtoStyle = {
		def_default_static_css: {},
		def_default_styling_function: (...args) => ({}),
		def_default_args: [],
	};

	processors: TProcessors<TProtoStyle> = {
		def_default_static_css: (static_style) => {},
		def_default_styling_function: (styling_function): void => {},
		def_default_args: (default_arguments) => {},
	};
}

class Style<TDefs extends Required<TProtoStyle>>
	extends ProtoStyle
	implements IStyle<TDefs>
{
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
	definitions: TDefs = {
		...(this as typeof this).definitions,
	};

	processors: TProcessors<TDefs> = {
		...(this as typeof this).processors,
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
	constructor(proto_style: TDefUpdate = {}) {
		super();

		this.construction.computer({ ...this.definitions, ...proto_style });
		this.construction.resolver(proto_style);

		let self = this;
		const functor = function (...args: ArbitraryArgs) {
			if (new.target) {
				const def = self.getDefinition();
				return new Style(def);
			}
			return self.functor(functor, ...args);
		} as TStyleFunctor<TDefs>;
		Object.assign(functor, { ...this });
		Object.setPrototypeOf(functor, Style.prototype);
		functor.functor = functor;
		return functor;
	}
	functor = ((self: TStyleFunctor<TDefs>, ...args: ArbitraryArgs) => {
		const computed_style = self.invocation.computer(...args);
		self.invocation.resolver(self, computed_style);
		return self;
	}) as TStyleFunctor<TDefs>;
	// necessary casting since cannonically arrow functions cant be newable, but this can

	construction = {
		computer: <T extends TDefs>(proto_style: T): void => {
			const definitionsToProcess = getUpdate(proto_style);

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
		},
		resolver: ((style_based, ...args) => {}) as TCSSApplicator<
			[TDefUpdate]
		>,
	};
	invocation = {
		computer: (...args: ArbitraryArgs) => {
			return this.definitions.def_default_styling_function(
				{ def_default_args: this.definitions.def_default_args }, //obey interface correctly
				...args
			);
		},
		resolver: ((self, style_based, ...args) => {
			Object.assign(self, { ...style_based });
		}) as TCSSApplicator<[TStyleFunctor<TDefs>, React.CSSProperties]>,
	};

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

const s = new Style<TProtoStyle>(proto_style) as TStyleFunctor<TProtoStyle>;

console.log(s);
console.log(s("green"));
console.log(s);
console.log(s());
console.log(s === s());
// /* Dont even have to annotate it after the first construction */
const s2 = new s();
console.log(s2());
console.log(s2 !== s);
console.log(new s2());
