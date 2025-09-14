import React from "react";

type TDefKey = `def_${string}`;

type TDefEntries<T> = {
	[key: TDefKey]: T;
};

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

type TDefUpdate = TDefEntries<any>;

type TDefinition = TDefUpdate & TProtoStyle;
type processor<T> = (arg: T) => void;
type TProcessors = {
	[K in keyof TDefinition]: processor<TDefinition[K]>;
};
type TGetEntries<T extends TDefUpdate> = (style_based: T) => T;
const getUpdate: TGetEntries<TDefUpdate> = (style_based) => {
	let def: TDefUpdate = {};
	Object.entries(style_based).forEach((item) => {
		if (item[0].startsWith("def_")) {
			Object.assign(def, { [item[0]]: item[1] });
		}
	});
	return def;
};
export interface IStyle extends React.CSSProperties {
	[key: string]: any;
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
	invokation: {
		computer: <T extends React.CSSProperties>(
			style_based?: T,
			...args: any[]
		) => React.CSSProperties;

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
class Style implements IStyle {
	[key: TDefKey]: any;

	functor = (self: TStyleFunctor, ...args: any[]) => {
		// const computed_style = self.definitions.def_default_styling_function(
		// 	this.def_default_args,
		// 	...args
		// );
		console.log(args);
		const computed_style = self.invokation.computer(
			this.def_default_args,
			...args
		);
		self.invokation.resolver(self, computed_style);
		// since abstracted have to call resolver directly on self
		return self;
	};

	definitions: TDefinition = {
		def_default_static_css: {},
		def_default_styling_function: () => ({}),
		def_default_args: [],
	};
	processors = {
		def_default_static_css: (static_style: React.CSSProperties): void => {
			this.def_default_static_css = static_style;
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
			this.definitions.def_default_args =
				Object.values(default_arguments);
		},
	};
	construction = {
		computer: <T extends TProtoStyle>(proto_style: T): void => {
			//probably can iterate now
			if (proto_style.def_default_static_css)
				this.processors.def_default_static_css(
					proto_style.def_default_static_css
				);
			if (proto_style.def_default_styling_function)
				this.processors.def_default_styling_function(
					proto_style.def_default_styling_function
				);
			if (proto_style.def_default_args)
				this.processors.def_default_args(proto_style.def_default_args);
		},
		resolver: <T extends React.CSSProperties>(
			style_based?: T,
			...args: any[]
		) => {},
	};
	invokation = {
		computer: <T extends React.CSSProperties>(
			style_based?: T,
			...args: any[]
		) => {
			return this.definitions.def_default_styling_function(
				this.def_default_args,
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

	// resolveCollisions<T extends React.CSSProperties>(
	// 	style_based?: T,
	// 	...args: any[]
	// ) {}

	// resolveRuntimeCollisions<T extends React.CSSProperties>(
	// 	style_based?: T,
	// 	...args: any[]
	// ) {}

	// computeRuntimeStyle<T extends React.CSSProperties>(
	// 	style_based?: T,
	// 	...args: any[]
	// ) {
	// 	Object.assign(this, { ...style_based });
	// }
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

	processStylingFunction(
		styling_function: (...args: any[]) => React.CSSProperties
	) {
		this.def_default_styling_function = styling_function;
	}
	processDefaultArguments = (default_arguments: any[]) => {
		this.def_default_args = default_arguments;
	};
	updateDef(definition: TDefUpdate): void {}
	computeStyle<T extends TProtoStyle>(proto_style: T): void {
		//probably can iterate now
		if (proto_style.def_default_static_css)
			this.processors.def_default_static_css(
				proto_style.def_default_static_css
			);
		if (proto_style.def_default_styling_function)
			this.processors.def_default_styling_function(
				proto_style.def_default_styling_function
			);
		if (proto_style.def_default_args)
			this.processors.def_default_args(proto_style.def_default_args);
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

// console.log(s("green"));
// console.log(s);
// console.log(s());
console.log(s === s());
// /* Dont even have to annotate it after the first construction */
// const s2 = new s();
// console.log(s2);

// type a = number[] extends number ? true : false;
