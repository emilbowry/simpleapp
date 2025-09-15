import React from "react";
// import { TDefinition } from "./themecomp_v2 copy";

type TDefKey = `def_${string}`;
type TDefEntries<T> = {
	[key: TDefKey]: T;
};

/* Arbitrary functions that can take arbitrary arguments, any is valid here */
type ArbitraryArgs = any[];

/* Arbitrary extensions, any is valid here */
type ArbitraryValue = any;

type TDefUpdate = TDefEntries<ArbitraryValue>;
// type TGetEntries<T extends TDefUpdate> = (style_based: T) => T | TDefUpdate;
type TGetEntries<T extends TDefUpdate> = (
	style_based: T
) => T extends IDefinition ? IDefinition : TDefUpdate;

type TStaticCSS = TDefEntries<React.CSSProperties>;
type TStylingArgs = TDefEntries<ArbitraryArgs>;

type TStyleFunction<I extends ArbitraryArgs> = <T extends TStylingArgs>(
	default_arguments: T,
	...args: I
) => React.CSSProperties;

type TCSSApplicator<TStyleArgs extends React.CSSProperties[] | IDefinition[]> =
	(...args: [...TStyleArgs, ...ArbitraryArgs]) => void;

type TStylingFunction = TDefEntries<TStyleFunction<ArbitraryArgs>>;

type TProtoStyle = Pick<TStaticCSS, "def_default_static_css"> &
	Pick<TStylingArgs, "def_default_args"> &
	Pick<TStylingFunction, "def_default_styling_function">;
// type IDefinition = TDefUpdate & TProtoStyle; // cant remember why chose interface
interface IDefinition extends TDefEntries<ArbitraryValue>, TProtoStyle {}

type TProcessor<T> = (arg: T) => void;
type TProcessors<T extends IDefinition> = {
	[K in keyof T]: TProcessor<T[K]>;
};

/*

Sanity check


type a = TCSSApplicator<
	[React.CSSProperties]
> extends TProcessor<React.CSSProperties>
	? true
	: false;

Returns True

*/
interface BaseStyle {
	processors: TProcessors<TProtoStyle>;
	definitions: TProtoStyle;
}

export interface IStyle<TDefs extends IDefinition>
	extends React.CSSProperties,
		BaseStyle {
	getDefinition: () => ReturnType<TGetEntries<TDefs>>;

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
interface IFunctor<in out I extends IDefinition> {
	(...args: ArbitraryArgs): TStyleFunctor<I>;
	new <O extends I>(...args: ArbitraryArgs): TStyleFunctor<O>;
}

type TStyleFunctor<T extends IDefinition> = Style<T> &
	IFunctor<T> &
	React.CSSProperties;

class ProtoStyle implements BaseStyle {
	definitions: TProtoStyle = {
		def_default_static_css: {},
		def_default_styling_function: (...args) => ({}),
		def_default_args: [,], // i dont know why this prevents err in process.default_args
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
	/* 
	This is still statically type checkable! (from some initial testing)
	any is the cannonical way to access the upper class, additionally

	- we cant inspect what our superclass has as its generic extension
	- super class may have a different restriction, not TDefs
	- TProtoStyle is too restrictive
	- IDefinition is too broad to be checked
	
	- (this as any).definitions preserves static checking: LHS RHS comparison

	- ergo any
	*/
	definitions: TDefs = {
		...(this as any).definitions,
	};

	/*
	Same as above
	*/
	processors: TProcessors<TDefs> = {
		...(this as any).processors,
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

		/* 
		Maybe Definitions should be static

		// this.definitions = {
		// 	...(super.constructor as typeof Style).definitions,
		// 	...(this.constructor as typeof Style).definitions,
		// } as T;
		*/
		this.construction.computer({ ...this.definitions, ...proto_style });
		this.construction.resolver(proto_style);

		let self = this;
		const functor = function (...args: ArbitraryArgs) {
			if (new.target) {
				const def = self.getDefinition();
				return new Style(def);
			}
			// self.functor(functor, ...args);
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
				const defKey = key as keyof IDefinition;

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
		/*
		if input of `getUpdate` is complete, so is output
		 so this is correct
	*/
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
