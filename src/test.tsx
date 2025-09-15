import React from "react";

type TDefKey = `def_${string}`;
type TDefEntries<T> = {
	[key: TDefKey]: T;
};

type TDefUpdate = TDefEntries<any>;
type TGetEntries<T extends TDefUpdate> = (style_based: T) => T;

type TStaticCSS = TDefEntries<React.CSSProperties>;
type TStylingArgs = TDefEntries<any[]>;
type TStylingFunction = TDefEntries<
	<T extends TStylingArgs>(
		default_arguments: T,
		...args: any[]
	) => React.CSSProperties
>;

type TProtoStyle = Pick<TStaticCSS, "def_default_static_css"> &
	Pick<TStylingArgs, "def_default_args"> &
	Pick<TStylingFunction, "def_default_styling_function">;

type TDefinition = TDefUpdate & TProtoStyle;

type TProcessor<T> = (arg: T) => void;
type TProcessors = {
	[K in keyof TDefinition]: TProcessor<TDefinition[K]>;
};

export interface IStyle extends React.CSSProperties {
	getDefinition: () => ReturnType<TGetEntries<TDefinition>>;

	definitions: TDefinition;
	processors: TProcessors;
	constructor: Function;
	construction: {
		computer: <T extends TProtoStyle>(proto_style: T) => void;

		resolver: <T extends React.CSSProperties>(
			style_based?: T,
			...args: any[]
		) => void;
	};

	functor: (self: TStyleFunctor, ...args: any[]) => TStyleFunctor;
	invocation: {
		computer: (...args: any[]) => React.CSSProperties;

		resolver: <T extends React.CSSProperties>(
			self: TStyleFunctor,
			style_based?: T,
			...args: any[]
		) => void;
	};
}

interface IFunctor {
	(...args: any[]): TStyleFunctor;
	new (...args: any): TStyleFunctor;
}
type TStyleFunctor = Style & IFunctor;

const getUpdate: TGetEntries<TDefUpdate> = (style_based) => {
	let def: TDefUpdate = {};
	Object.entries(style_based).forEach((item) => {
		if (item[0].startsWith("def_")) {
			Object.assign(def, { [item[0]]: item[1] });
		}
	});
	return def;
};

class Style implements IStyle {
	functor = (self: TStyleFunctor, ...args: any[]) => {
		const computed_style = self.invocation.computer(...args);
		self.invocation.resolver(self, computed_style);
		return self;
	};

	definitions: TDefinition = {
		def_default_static_css: {},
		def_default_styling_function: () => ({}),
		def_default_args: [],
	};
	processors = {
		def_default_static_css: (static_style: React.CSSProperties): void => {
			this.definitions.def_default_static_css = static_style;
			Object.assign(this, { ...static_style });
		},

		def_default_styling_function: (
			styling_function: <T extends TStylingArgs>(
				default_arguments: T,
				...args: any[]
			) => React.CSSProperties
		): void => {
			this.definitions.def_default_styling_function = styling_function;
		},
		def_default_args: (default_arguments: any[]) => {
			this.definitions.def_default_args = default_arguments;
		},
	};
	construction = {
		computer: <T extends TProtoStyle>(proto_style: T): void => {
			const definitionsToProcess = getUpdate(proto_style);

			for (const key in definitionsToProcess) {
				const defKey = key as keyof TDefinition;

				if (defKey in this.processors) {
					const processor =
						this.processors[
							defKey as keyof TProcessors & keyof TProtoStyle
						];

					const value = definitionsToProcess[defKey];
					(processor as any)(value);
				}
			}
		},
		resolver: <T extends React.CSSProperties>(
			style_based?: T,
			...args: any[]
		) => {},
	};
	invocation = {
		computer: (...args: any[]) => {
			return this.definitions.def_default_styling_function(
				{ def_default_args: this.definitions.def_default_args }, //obey interface correctly
				...args
			);
		},
		resolver: <T extends React.CSSProperties>(
			self: TStyleFunctor,
			style_based?: T,
			...args: any[]
		) => {
			Object.assign(self, { ...style_based });
		},
	};

	constructor(proto_style?: TDefUpdate) {
		this.construction.computer({ ...this.definitions, ...proto_style });
		this.construction.resolver(proto_style);

		let self = this;
		function functor(...args: any[]) {
			if (new.target) {
				const def = self.getDefinition();
				return new Style(def);
			}

			self.functor(functor as unknown as TStyleFunctor, ...args);
			return functor;
		}
		Object.assign(functor, { ...this });
		Object.setPrototypeOf(functor, Style.prototype);
		functor.functor = functor;

		return functor as unknown as TStyleFunctor;
	}
	getDefinition() {
		return (getUpdate as unknown as TGetEntries<TDefinition>)(
			this.definitions
		);
	}
}

const static_style: React.CSSProperties = {
	margin: "10%",
};

const some_styling_function = (
	default_arguments: TStylingArgs,
	input: string
): React.CSSProperties => {
	return { border: input };
};
const proto_style: TProtoStyle = {
	def_default_args: [],
	def_default_static_css: static_style,
	def_default_styling_function: some_styling_function,
};

const s = new Style(proto_style) as TStyleFunctor;
// console.log(s);

console.log(s("green"));
// console.log(s);
// console.log(s());
console.log(s === s());
// /* Dont even have to annotate it after the first construction */
// const s2 = new s();
// console.log(s2);
