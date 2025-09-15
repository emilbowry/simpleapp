// import React from "react";

// type TDefKey = `def_${string}`;
// type TDefEntries<T> = {
// 	[key: TDefKey]: T;
// };

// type TDefUpdate = TDefEntries<any>;
// type TGetEntries<T extends TDefUpdate> = (style_based: T) => T | TDefUpdate;

// type TStaticCSS = TDefEntries<React.CSSProperties>;
// type TStylingArgs = TDefEntries<any[]>;
// type TStylingFunction = TDefEntries<
// 	<T extends TStylingArgs>(
// 		default_arguments: T,
// 		...args: any[]
// 	) => React.CSSProperties
// >;

// type TProtoStyle = Pick<TStaticCSS, "def_default_static_css"> &
// 	Pick<TStylingArgs, "def_default_args"> &
// 	Pick<TStylingFunction, "def_default_styling_function">;
// type TDefinition = TDefUpdate & TProtoStyle;
// interface IDefinition extends TProtoStyle {}

// type TProcessor<T> = (arg: T) => void;
// type TProcessors<T extends IDefinition> = {
// 	[K in keyof T]: TProcessor<T[K]>;
// };
// type TMasterProc<T extends IDefinition> = {
// 	[key in keyof T]: undefined;
// }; // for subclasses

// export interface IStyle<TDefs extends IDefinition> extends React.CSSProperties {
// 	getDefinition: () => ReturnType<TGetEntries<TDefs>>;

// 	// definitions: IDefinition | TDefs;
// 	definitions: IDefinition;

// 	processors: TProcessors<TDefs> | TMasterProc<TDefs>;

// 	constructor: Function; // just for convenient grouping
// 	construction: {
// 		computer: <T extends TProtoStyle>(proto_style: T) => void;

// 		resolver: <T extends React.CSSProperties>(
// 			style_based?: T,
// 			...args: any[]
// 		) => void;
// 	};

// 	functor: (
// 		self: TStyleFunctor<TDefs>,
// 		...args: any[]
// 	) => TStyleFunctor<TDefs>;
// 	invocation: {
// 		computer: (...args: any[]) => React.CSSProperties;

// 		resolver: <T extends React.CSSProperties>(
// 			self: TStyleFunctor<TDefs>,
// 			style_based?: T,
// 			...args: any[]
// 		) => void;
// 	};
// }

// const getUpdate: TGetEntries<TDefUpdate> = (style_based) => {
// 	let def: TDefUpdate = {};
// 	Object.entries(style_based).forEach((item) => {
// 		if (item[0].startsWith("def_")) {
// 			Object.assign(def, { [item[0]]: item[1] });
// 		}
// 	});
// 	return def;
// };
// interface IFunctor<TDefs extends IDefinition> {
// 	(...args: any[]): TStyleFunctor<TDefs>;
// 	new <T extends TDefs>(...args: any): TStyleFunctor<T>;
// }
// type TStyleFunctor<T extends IDefinition> = Style<T> & IFunctor<T>;

// // type TDefEntries<T> = {
// // 	[key: TDefKey]: T;
// // };
// type FormOf<T> = T;

// // type TProcessor<T> = (arg: T) => void;
// // type TProcessors<T extends IDefinition> = {
// // 	[K in keyof T]: TProcessor<T[K]>;
// // type TMasterProc<T extends IDefinition> = {
// // 	[key in keyof T]: undefined;
// // }; // for subclasses
// type T_Def<T extends IDefinition> = {
// 	[K in keyof T]: T[K];
// };
// type TMasterDef<T extends IDefinition> = {
// 	[key in keyof T]: undefined;
// }; // for subclasses

// class ProtoStyle {
// 	definitions = {
// 		def_default_static_css: {},
// 		def_default_styling_function: (...args: any[]) => {},
// 		def_default_args: [,], // i dont know why this prevents err in process.default_args
// 	};

// 	processors = {
// 		def_default_static_css: (static_style: React.CSSProperties): void => {},

// 		def_default_styling_function: (
// 			styling_function: <T extends TStylingArgs>(
// 				default_arguments: T,
// 				...args: any[]
// 			) => React.CSSProperties
// 		): void => {},
// 		def_default_args: (default_arguments: any[]) => {},
// 	};
// 	// processors = {
// 	// 	def_default_static_css: (static_style: React.CSSProperties): void => {
// 	// 		this.definitions.def_default_static_css = static_style;
// 	// 		Object.assign(this, { ...static_style });
// 	// 	},

// 	// 	def_default_styling_function: (
// 	// 		styling_function: <T extends TStylingArgs>(
// 	// 			default_arguments: T,
// 	// 			...args: any[]
// 	// 		) => React.CSSProperties
// 	// 	): void => {
// 	// 		this.definitions.def_default_styling_function = styling_function;
// 	// 	},
// 	// 	def_default_args: (default_arguments: any[]) => {
// 	// 		this.definitions.def_default_args = default_arguments;
// 	// 	},
// 	// };
// }
// // class _Style<T extends TProtoStyle> extends ProtoStyle {
// // 	definitions: T = {
// // 		...(this as any).definitions,
// // 	};

// // 	processors: TProcessors<T> = {
// // 		...(this as any).processors,
// // 		...{
// // 			def_default_static_css: (
// // 				static_style: React.CSSProperties
// // 			): void => {
// // 				this.definitions.def_default_static_css = static_style;
// // 				Object.assign(this, { ...static_style });
// // 			},

// // 			def_default_styling_function: (
// // 				styling_function: <T extends TStylingArgs>(
// // 					default_arguments: T,
// // 					...args: any[]
// // 				) => React.CSSProperties
// // 			): void => {
// // 				this.definitions.def_default_styling_function =
// // 					styling_function;
// // 			},
// // 			def_default_args: (default_arguments: any[]) => {
// // 				this.definitions.def_default_args = default_arguments;
// // 			},
// // 		},
// // 	};
// // 	constructor(initial_proto?: Partial<T>) {
// // 		super();
// // 		// this.definitions = {
// // 		// 	// ...(super.constructor as typeof _Style).definitions,
// // 		// 	// ...(this.constructor as typeof _Style).definitions,
// // 		// 	...initial_proto,
// // 		// } as T;
// // 	}
// // }
// class Style<TDefs extends IDefinition>
// 	extends ProtoStyle
// 	implements IStyle<TDefs>
// {

// 	definitions: TDefs = {
// 		...(this as any).definitions,
// 	};
// 	processors: TProcessors<TDefs> = {
// 		...(this as any).processors,
// 		...{
// 			def_default_static_css: (
// 				static_style: React.CSSProperties
// 			): void => {
// 				this.definitions.def_default_static_css = static_style;
// 				Object.assign(this, { ...static_style });
// 			},

// 			def_default_styling_function: (
// 				styling_function: <T extends TStylingArgs>(
// 					default_arguments: T,
// 					...args: any[]
// 				) => React.CSSProperties
// 			): void => {
// 				this.definitions.def_default_styling_function =
// 					styling_function;
// 			},
// 			def_default_args: (default_arguments: any[]) => {
// 				this.definitions.def_default_args = default_arguments;
// 			},
// 		},
// 	};
// 	constructor(proto_style?: TDefUpdate) {
// 		super();
// 		this.construction.computer({ ...this.definitions, ...proto_style });
// 		this.construction.resolver(proto_style);

// 		let self = this;
// 		function functor(...args: any[]) {
// 			if (new.target) {
// 				const def = self.getDefinition();
// 				return new Style(def);
// 			}

// 			self.functor(functor as unknown as TStyleFunctor<TDefs>, ...args);
// 			return functor;
// 		}
// 		Object.assign(functor, { ...this });
// 		Object.setPrototypeOf(functor, Style.prototype);
// 		functor.functor = functor;

// 		return functor as unknown as TStyleFunctor<TDefs>;
// 	}
// 	functor = (self: TStyleFunctor<TDefs>, ...args: any[]) => {
// 		const computed_style = self.invocation.computer(...args);
// 		self.invocation.resolver(self, computed_style);
// 		return self;
// 	};

// 	construction = {
// 		computer: <T extends TProtoStyle>(proto_style: T): void => {
// 			const definitionsToProcess = getUpdate(proto_style);

// 			for (const key in definitionsToProcess) {
// 				const defKey = key as keyof IDefinition;

// 				if (defKey in this.processors) {
// 					const processor =
// 						this.processors[
// 							defKey as keyof TProcessors<TDefs> &
// 								keyof TProtoStyle
// 						];

// 					const value = definitionsToProcess[defKey];
// 					(processor as any)(value);
// 				}
// 			}
// 		},
// 		resolver: <T extends React.CSSProperties>(
// 			style_based?: T,
// 			...args: any[]
// 		) => {},
// 	};
// 	invocation = {
// 		computer: (...args: any[]) => {
// 			return this.definitions.def_default_styling_function(
// 				{ def_default_args: this.definitions.def_default_args }, //obey interface correctly
// 				...args
// 			);
// 		},
// 		resolver: <T extends React.CSSProperties>(
// 			self: TStyleFunctor<TDefs>,
// 			style_based?: T,
// 			...args: any[]
// 		) => {
// 			Object.assign(self, { ...style_based });
// 		},
// 	};

// 	getDefinition() {
// 		return (getUpdate as unknown as TGetEntries<TDefs>)(
// 			this.definitions as TDefs
// 		);
// 	}
// }

// const static_style: React.CSSProperties = {
// 	margin: "10%",
// };

// const some_styling_function = (
// 	default_arguments: TStylingArgs,
// 	input: string
// ): React.CSSProperties => {
// 	return { border: input };
// };
// const proto_style: TProtoStyle = {
// 	def_default_args: [],
// 	def_default_static_css: static_style,
// 	def_default_styling_function: some_styling_function,
// };

// /* This works Perectly and as expected */

// const s = new Style<TProtoStyle>(proto_style) as TStyleFunctor<TProtoStyle>;

// console.log(s);
// console.log(s("green"));
// console.log(s);
// console.log(s());
// console.log(s === s());
// // /* Dont even have to annotate it after the first construction */
// const s2 = new s();
// console.log(s2);
// console.log(s2 !== s);

// // trying to subclass
// type TSubclassProtoStyle = TProtoStyle & {
// 	def_custom_color: string;
// 	def_custom_size: number;
// };

// class B extends Style<TSubclassProtoStyle> {
// 	/* Invalid, gives err
// 	-	**correct**

// 	*/
// 	/* Invalid, gives err
// 	-	**correct**

// 	*/
// 	// processors = {} //gives err correctly
// 	/* Invalid, gives err
// 	-	**correct**

// 	*/
// 	// nothing is valid since should be inherited
// 	/* Invalid, gives err
// 		- wrong type sig
// 	-	**correct**
// 	*/
// 	// processors = {
// 	// 	def_default_static_css: (static_style: React.CSSProperties): void => {
// 	// 		this.definitions.def_default_static_css = static_style;
// 	// 		Object.assign(this, { ...static_style });
// 	// 	},
// 	// 	def_default_styling_function: (
// 	// 		styling_function: <T extends TStylingArgs>(
// 	// 			default_arguments: T,
// 	// 			...args: any[]
// 	// 		) => React.CSSProperties
// 	// 	): void => {
// 	// 		this.definitions.def_default_styling_function = styling_function;
// 	// 	},
// 	// 	def_default_args: (default_arguments: any[]) => {
// 	// 		this.definitions.def_default_args = default_arguments;
// 	// 	},
// 	// 	def_custom_color: (default_arguments: string) => {},
// 	// 	def_custom_size: (default_arguments: string) => {},
// 	// };

// 	/* Valid, doesnt err
// 	-	**correct**
// 	- annoying to write out everythin
// 	*/
// 	// processors = {
// 	// 	def_default_static_css: (static_style: React.CSSProperties): void => {
// 	// 		this.definitions.def_default_static_css = static_style;
// 	// 		Object.assign(this, { ...static_style });
// 	// 	},
// 	// 	def_default_styling_function: (
// 	// 		styling_function: <T extends TStylingArgs>(
// 	// 			default_arguments: T,
// 	// 			...args: any[]
// 	// 		) => React.CSSProperties
// 	// 	): void => {
// 	// 		this.definitions.def_default_styling_function = styling_function;
// 	// 	},
// 	// 	def_default_args: (default_arguments: any[]) => {
// 	// 		this.definitions.def_default_args = default_arguments;
// 	// 	},
// 	// 	def_custom_color: (default_arguments: string) => {},
// 	// 	def_custom_size: (default_arguments: number) => {},
// 	// };

// 	processors = {
// 		// also not type checking definitions
// 		...(this as any).processors, //clumsy
// 		def_custom_color: (default_arguments: string) => {},
// 	};
// }
