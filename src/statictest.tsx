// import React from "react";

// type TDefKey = `def_${string}`;
// type TDefEntries<T> = {
// 	[key: TDefKey]: T;
// };

// /* Arbitrary functions that can take arbitrary arguments, any is valid here */
// type ArbitraryArgs = any[];
// /* Arbitrary extensions, any is valid here */
// type ArbitraryValue = any;

// type TDefUpdate = TDefEntries<ArbitraryValue>;
// type TGetEntries<T extends TDefUpdate> = (
// 	style_based: T
// ) => T extends TDefinition ? TDefinition : TDefUpdate;

// type TDefStaticCSS = TDefEntries<React.CSSProperties>;
// type TDefStylingArgs = TDefEntries<ArbitraryArgs>;

// type TStyleFunction<I extends ArbitraryArgs> = <T extends TDefStylingArgs>(
// 	default_arguments: T,
// 	...args: I
// ) => React.CSSProperties;
// type TDefStylingFunction = TDefEntries<TStyleFunction<ArbitraryArgs>>;

// type TProtoStyle = Pick<TDefStaticCSS, "def_default_static_css"> &
// 	Pick<TDefStylingArgs, "def_default_args"> &
// 	Pick<TDefStylingFunction, "def_default_styling_function">;
// type TDefinition = TDefUpdate & TProtoStyle;

// type TCSSApplicator<TStyleArgs extends React.CSSProperties[] | TDefinition[]> =
// 	(...args: [...TStyleArgs, ...ArbitraryArgs]) => void;

// type TProcessor<T> = (arg: T) => void;
// type TProcessors<T extends TDefinition> = {
// 	[K in keyof T]: TProcessor<T[K]>;
// };

// interface BaseStyle {
// 	processors: TProcessors<TProtoStyle>;
// 	definitions: TProtoStyle;
// }

// interface IStyle<TDefs extends TDefinition>
// 	extends React.CSSProperties,
// 		BaseStyle {
// 	buildFunctor: (CSS: React.CSSProperties) => TStyleFunctor<TProtoStyle>;
// 	extractCSS: (this: TStyleFunctor<any>) => React.CSSProperties;
// 	getDefinition: () => ReturnType<TGetEntries<TDefs>>;

// 	definitions: TDefs;
// 	processors: TProcessors<TDefs>;

// 	/* Construct Time procedure */
// 	constructor: TStyleFunctor<TDefs> | Function;
// 	initialisation: {
// 		computer: <T extends TDefs>(proto_style: T) => void;

// 		resolver: TCSSApplicator<[TDefUpdate]>;
// 	};

// 	/* Call Time procedure */
// 	functor: TStyleFunctor<TDefs>;
// 	mapping: {
// 		computer: (...args: ArbitraryArgs) => React.CSSProperties;

// 		resolver: TCSSApplicator<[React.CSSProperties]>;
// 	};
// }

// const getUpdate = <T extends TDefUpdate>(
// 	...args: Parameters<TGetEntries<T>>
// ) => {
// 	let def: TDefUpdate = {};
// 	Object.entries(args[0]).forEach((item) => {
// 		if (item[0].startsWith("def_")) {
// 			Object.assign(def, { [item[0]]: item[1] });
// 		}
// 	});
// 	return def as ReturnType<TGetEntries<T>>;
// };

// interface IFunctor<in out I extends TDefinition> {
// 	(...args: ArbitraryArgs): TStyleFunctor<I>;
// 	new <O extends I>(...args: ArbitraryArgs): TStyleFunctor<O>;
// }

// type TStyleFunctor<T extends TDefinition> = Style<T> &
// 	IFunctor<T> &
// 	React.CSSProperties;

// class ProtoStyle implements BaseStyle {
// 	definitions: TProtoStyle = {
// 		def_default_static_css: {},
// 		def_default_styling_function: (...args) => ({}),
// 		def_default_args: [],
// 	};

// 	processors: TProcessors<TProtoStyle> = {
// 		def_default_static_css: (static_style) => {},
// 		def_default_styling_function: (styling_function): void => {},
// 		def_default_args: (default_arguments) => {},
// 	};

// 	static definitions: TProtoStyle = {
// 		def_default_static_css: {},
// 		def_default_styling_function: (...args) => ({}),
// 		def_default_args: [],
// 	};

// 	static processors: TProcessors<TProtoStyle> = {
// 		def_default_static_css: (static_style) => {},
// 		def_default_styling_function: (styling_function): void => {},
// 		def_default_args: (default_arguments) => {},
// 	};
// }

// class Style<TDefs extends Required<TProtoStyle>>
// 	extends ProtoStyle
// 	implements IStyle<TDefs>
// {
// 	definitions: TDefs = {
// 		...(this as typeof this).definitions,
// 	};

// 	processors: TProcessors<TDefs> = {
// 		...(this as typeof this).processors,
// 		...{
// 			def_default_static_css: (static_style) => {
// 				this.definitions.def_default_static_css = static_style;
// 				Object.assign(this, { ...static_style });
// 			},

// 			def_default_styling_function: (styling_function): void => {
// 				this.definitions.def_default_styling_function =
// 					styling_function;
// 			},
// 			def_default_args: (default_arguments) => {
// 				this.definitions.def_default_args = default_arguments;
// 			},
// 		},
// 	};
// 	extractCSS() {
// 		const exclusionList = Object.getOwnPropertyNames(
// 			new (this.constructor as typeof this.functor)()
// 		);

// 		const css = {} as React.CSSProperties;
// 		for (const key in this) {
// 			if (!exclusionList.includes(key)) {
// 				Object.assign(css, { [key]: this[key] });
// 			}
// 		}
// 		return css;
// 	}
// 	buildFunctor(css: React.CSSProperties) {
// 		return new Style<TProtoStyle>({
// 			def_default_static_css: css,
// 		}) as TStyleFunctor<TProtoStyle>;
// 	}
// 	functor: TStyleFunctor<TDefs>;
// 	constructor(proto_style: TDefUpdate = {}) {
// 		super();
// 		// console.log(this.constructor.toString());
// 		// console.log(Object.getOwnPropertyNames(this.processors));
// 		// this.initialisation.computer({
// 		// 	...this.definitions,
// 		// 	...proto_style,
// 		// });
// 		this.computer({
// 			...this.definitions,
// 			...proto_style,
// 		});

// 		let self = this;
// 		// this.initialisation.resolver(proto_style);

// 		this.functor = function functor(...args: ArbitraryArgs) {
// 			if (new.target) {
// 				const def = self.functor.getDefinition();
// 				return new Style(def);
// 			}
// 			const computed_style = self.functor.mapping.computer(...args);

// 			self.functor.mapping.resolver(computed_style);
// 			return self.functor;
// 		} as TStyleFunctor<TDefs>;
// 		this.init_resolver(proto_style);

// 		// console.log((this.constructor as any).something);
// 		Object.assign(this.functor, { ...this });
// 		// this.functor.init_resolver(proto_style);

// 		Object.setPrototypeOf(this.functor, this);
// 		return this.functor;
// 	}

// 	initialisation = {
// 		computer: <T extends TDefs>(proto_style: T): void => {
// 			const definitionsToProcess = getUpdate(proto_style);
// 			for (const key in definitionsToProcess) {
// 				const defKey = key as keyof TDefinition;
// 				(this as any)[defKey] = definitionsToProcess[defKey];
// 				if (defKey in this.processors) {
// 					const processor =
// 						this.processors[
// 							defKey as keyof TProcessors<TDefs> & keyof TDefs
// 						];

// 					const value = definitionsToProcess[defKey];
// 					processor(value);
// 				}
// 			}
// 		},
// 		resolver: ((style_based, ...args) => {}) as TCSSApplicator<
// 			[TDefUpdate]
// 		>,
// 	};
// 	computer<T extends TDefs>(proto_style: T) {
// 		// const definitionsToProcess = getUpdate(proto_style);
// 		// console.log(definitionsToProcess)
// 		// for (const key in definitionsToProcess) {
// 		// 	const defKey = key as keyof TDefinition;

// 		// 	if (defKey in this.processors) {
// 		// 		const processor =
// 		// 			this.processors[
// 		// 				defKey as keyof TProcessors<TDefs> & keyof TDefs
// 		// 			];

// 		// 		const value = definitionsToProcess[defKey];
// 		// 		processor(value);
// 		// 	}
// 		// }
// 		const definitionsToProcess = getUpdate(proto_style);
// 		for (const key in definitionsToProcess) {
// 			// (this as any)[key] = definitionsToProcess[key];

// 			const defKey = key as keyof TDefinition;
// 			(this as any)[defKey] = definitionsToProcess[defKey];
// 			// if (defKey in this.processors) {
// 			// 	const processor =
// 			// 		this.processors[
// 			// 			defKey as keyof TProcessors<TDefs> & keyof TDefs
// 			// 		];

// 			// 	const value = definitionsToProcess[defKey];
// 			// 	processor(value);
// 			// }
// 		}
// 		this.processor();
// 	}

// 	processor = () => {
// 		const definitionsToProcess = getUpdate(this as any);

// 		for (const key in definitionsToProcess) {
// 			// (this as any)[key] = definitionsToProcess[key];
// 			// const defKey = key as keyof TDefinition;
// 			// if (defKey in this.processors) {
// 			// 	const processor =
// 			// 		this.processors[
// 			// 			defKey as keyof TProcessors<TDefs> & keyof TDefs
// 			// 		];
// 			// 	const value = definitionsToProcess[defKey];
// 			// 	processor(value);
// 			// }
// 		}
// 	};
// 	init_resolver(style_based: any, ...args: any[]) {
// 		console.log("resolve proto");
// 		// super.init_resolver(style_based,...args)

// 		// console.log(this.initialisation.resolver.toString());
// 	}
// 	mapping = {
// 		computer: (...args: ArbitraryArgs) => {
// 			return this.definitions.def_default_styling_function(
// 				{ def_default_args: this.definitions.def_default_args }, //obey interface correctly
// 				...args
// 			);
// 		},
// 		resolver: ((style_based, ...args) => {
// 			Object.assign(this.functor, { ...style_based });
// 		}) as TCSSApplicator<[React.CSSProperties]>,
// 	};

// 	getDefinition() {
// 		return getUpdate(this.definitions);
// 	}
// }

// const static_style: React.CSSProperties = {
// 	margin: "10%",
// };

// const some_styling_function: TStyleFunction<[string]> = (
// 	default_arguments,
// 	input
// ) => {
// 	return { border: input };
// };
// const proto_style: TProtoStyle = {
// 	def_default_args: [],
// 	def_default_static_css: static_style,
// 	def_default_styling_function: some_styling_function,
// };

// /* This works Perfectly and as expected */

// // const s = new Style<TProtoStyle>(proto_style) as TStyleFunctor<TProtoStyle>;

// // console.log(s);
// // console.log(s("green"));

// // console.log(s.extractCSS());
// // console.log(s);
// // console.log(s());
// // console.log(s === s("green"));
// // /* Dont even have to annotate it after the first construction */
// // const s2 = new s();
// // console.log(s2);
// // console.log(s2 instanceof s);
// // console.log(new s2());
// // console.log();

// type TOverridable = { def_overrides: React.CSSProperties } & TProtoStyle;

// class OverridableStyle<
// 	TDefs extends Required<TOverridable>
// > extends Style<TOverridable> {
// 	definitions: TDefs = {
// 		...(this as typeof this).definitions,
// 		def_overrides: {},
// 	};
// 	processors: TProcessors<TDefs> = {
// 		...(this as typeof this).processors,
// 		def_overrides: (overrides) => {
// 			this.definitions.def_overrides = overrides;

// 			Object.assign(this, { ...overrides });
// 		},
// 	};
// 	processor = (): void => {
// 		// this.definitions.def_overrides = overrides;
// 		console.log("procover");

// 		// super.processor();
// 		console.log(this.definitions);
// 		Object.assign(this, { ...this.definitions.def_overrides });
// 	};
// 	initialisation: any = {
// 		...(this as typeof this).initialisation,
// 		resolver: ((style_based, ...args) => {
// 			// console.log("resolve orverride");

// 			(this as typeof this).initialisation.resolver();
// 			Object.assign(this, { ...this.definitions.def_overrides });
// 		}) as TCSSApplicator<[TDefUpdate]>,
// 	};
// 	init_resolver(style_based: any, ...args: any[]) {
// 		console.log("resolve other");
// 		// console.log(this.initialisation.resolver.toString());
// 		super.init_resolver(style_based, ...args);

// 		Object.assign(this, { ...this.definitions.def_overrides });
// 	}
// 	computer<T extends TDefs>(proto_style: any) {
// 		super.computer(proto_style);
// 		const definitionsToProcess = getUpdate(proto_style);
// 		// console.log(definitionsToProcess)
// 		// for (const key in definitionsToProcess) {
// 		// 	const defKey = key as keyof TDefinition;

// 		// 	if (defKey in this.processors) {
// 		// 		const processor =
// 		// 			this.processors[
// 		// 				defKey as keyof TProcessors<TDefs> & keyof TDefs
// 		// 			];

// 		// 		const value = definitionsToProcess[defKey];
// 		// 		processor(value);
// 		// 	}
// 		// }
// 		// const definitionsToProcess = getUpdate(proto_style);
// 		for (const key in definitionsToProcess) {
// 			const defKey = key as keyof TDefinition;
// 			(this as any)[defKey] = definitionsToProcess[defKey];
// 		}
// 	}
// 	mapping: any = {
// 		...(this as typeof this).mapping,
// 		resolver: ((style_based, ...args) => {
// 			Object.assign(this.functor, {
// 				...style_based,
// 				...this.definitions.def_overrides,
// 			});
// 		}) as TCSSApplicator<[React.CSSProperties]>,
// 	};
// }

// console.log("\n--- Test Case 1: Simple Static Overrides ---");
// const staticBaseStyle: React.CSSProperties = {
// 	backgroundColor: "blue",
// 	padding: "10px",
// };
// const overrideStyle: React.CSSProperties = {
// 	backgroundColor: "red", // Should override blue
// 	borderRadius: "5px", // Should be added
// };

// const protoStyle1: TOverridable = {
// 	def_default_static_css: staticBaseStyle,
// 	def_overrides: overrideStyle,
// 	def_default_styling_function: () => ({}), // No dynamic function for this test
// 	def_default_args: [],
// };

// const s1 = new OverridableStyle<TOverridable>(protoStyle1) as any;
// // s1;
// // console.log(s1);
