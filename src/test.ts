// // import React from "react";

// // type TDefKey = `def_${string}`;
// // type TDefEntries<T> = {
// // 	[key: TDefKey]: T;
// // };

// // type TDefUpdate = TDefEntries<any>;
// // type TGetEntries<T extends TDefUpdate> = (style_based: T) => T;

// // type TStaticCSS = TDefEntries<React.CSSProperties>;
// // type TStylingArgs = TDefEntries<any[]>;
// // type TStylingFunction = TDefEntries<
// // 	<T extends TStylingArgs>(
// // 		default_arguments: T,
// // 		...args: any[]
// // 	) => React.CSSProperties
// // >;

// // type TProtoStyle = Pick<TStaticCSS, "def_default_static_css"> &
// // 	Pick<TStylingArgs, "def_default_args"> &
// // 	Pick<TStylingFunction, "def_default_styling_function">;

// // type TDefinition = TDefUpdate & TProtoStyle;

// // type TProcessor<T> = (arg: T) => void;
// // // type TProcessors = {
// // // 	[K in keyof TDefinition]: TProcessor<TDefinition[K]>;
// // // };

// // type TProcessors<T extends TDefinition> = {
// // 	[K in keyof T]: TProcessor<T[K]>;
// // };

// // type TMasterProc<T extends TDefinition> = TProcessor<T> & {
// // 	[key in keyof T]: undefined;
// // };

// // export interface IStyle<TDefs extends TDefinition> extends React.CSSProperties {
// // 	getDefinition: () => ReturnType<TGetEntries<TDefs>>;

// // 	definitions: TDefinition;
// // 	processors: TProcessors<TDefs> | TMasterProc<TDefs>;

// // 	constructor: Function;
// // 	construction: {
// // 		computer: <T extends TProtoStyle>(proto_style: T) => void;

// // 		resolver: <T extends React.CSSProperties>(
// // 			style_based?: T,
// // 			...args: any[]
// // 		) => void;
// // 	};

// // 	functor: (
// // 		self: TStyleFunctor<TDefs>,
// // 		...args: any[]
// // 	) => TStyleFunctor<TDefs>;
// // 	invocation: {
// // 		computer: (...args: any[]) => React.CSSProperties;

// // 		resolver: <T extends React.CSSProperties>(
// // 			self: TStyleFunctor<TDefs>,
// // 			style_based?: T,
// // 			...args: any[]
// // 		) => void;
// // 	};
// // }

// // const getUpdate: TGetEntries<TDefUpdate> = (style_based) => {
// // 	let def: TDefUpdate = {};
// // 	Object.entries(style_based).forEach((item) => {
// // 		if (item[0].startsWith("def_")) {
// // 			Object.assign(def, { [item[0]]: item[1] });
// // 		}
// // 	});
// // 	return def;
// // };
// // interface IFunctor<T extends TDefinition> {
// // 	(...args: any[]): TStyleFunctor<T>;
// // 	new <TDefs extends T>(...args: any): TStyleFunctor<T>;
// // }
// // type TStyleFunctor<T extends TDefinition> = Style<T> & IFunctor<T>;
// // // type StyleClass<TDefs extends TDefinition> = {
// // //   new (...args: any[]): IStyle<TDefs>;
// // // } & IStyle<TDefs>;

// // interface StyleConstructor<T extends TDefinition> extends Style<T> {
// // 	// new (...args: any): TStyleFunctor<any>;
// // 	B: string;
// // }
// // // class Style<TDefs extends TDefinition>
// // // 	implements IStyle<TDefs>
// // // {
// // interface SomeConstructor<T extends any> {
// // 	new (...args: any): any|undefined;
// // 	B: T;
// // }
// // const T:SomeConstructor<number> =,{
// // 	constructor:()=>{} ,
// // 	 B : 2,

// // 	// constructor{}
// // }

// // class C extends T {

// // }

// // class Style<TDefs extends TDefinition> implements IStyle<TDefs> {
// // 	constructor(proto_style?: TDefUpdate) {
// // 		this.construction.computer({ ...this.definitions, ...proto_style });
// // 		this.construction.resolver(proto_style);

// // 		let self = this;
// // 		function functor(...args: any[]) {
// // 			if (new.target) {
// // 				const def = self.getDefinition();
// // 				return new Style(def);
// // 			}

// // 			self.functor(functor as unknown as TStyleFunctor<TDefs>, ...args);
// // 			return functor;
// // 		}
// // 		Object.assign(functor, { ...this });
// // 		Object.setPrototypeOf(functor, Style.prototype);
// // 		functor.functor = functor;

// // 		return functor as unknown as TStyleFunctor<TDefs>;
// // 	}
// // 	static B: "hello";
// // 	functor = (self: TStyleFunctor<TDefs>, ...args: any[]) => {
// // 		const computed_style = self.invocation.computer(...args);
// // 		self.invocation.resolver(self, computed_style);
// // 		return self;
// // 	};

// // 	definitions: TDefinition = {
// // 		def_default_static_css: {},
// // 		def_default_styling_function: () => ({}),
// // 		def_default_args: [],
// // 	};

// // 	processors: TProcessors<TDefs> | TMasterProc<TDefs> = {
// // 		def_default_static_css: (static_style: React.CSSProperties): void => {
// // 			this.definitions.def_default_static_css = static_style;
// // 			Object.assign(this, { ...static_style });
// // 		},

// // 		def_default_styling_function: (
// // 			styling_function: <T extends TStylingArgs>(
// // 				default_arguments: T,
// // 				...args: any[]
// // 			) => React.CSSProperties
// // 		): void => {
// // 			this.definitions.def_default_styling_function = styling_function;
// // 		},
// // 		def_default_args: (default_arguments: any[]) => {
// // 			this.definitions.def_default_args = default_arguments;
// // 		},
// // 	};
// // 	construction = {
// // 		computer: <T extends TProtoStyle>(proto_style: T): void => {
// // 			const definitionsToProcess = getUpdate(proto_style);

// // 			for (const key in definitionsToProcess) {
// // 				const defKey = key as keyof TDefinition;

// // 				if (defKey in this.processors) {
// // 					const processor =
// // 						this.processors[
// // 							defKey as keyof TProcessors<TDefs> &
// // 								keyof TProtoStyle
// // 						];

// // 					const value = definitionsToProcess[defKey];
// // 					(processor as any)(value);
// // 				}
// // 			}
// // 		},
// // 		resolver: <T extends React.CSSProperties>(
// // 			style_based?: T,
// // 			...args: any[]
// // 		) => {},
// // 	};
// // 	invocation = {
// // 		computer: (...args: any[]) => {
// // 			return this.definitions.def_default_styling_function(
// // 				{ def_default_args: this.definitions.def_default_args }, //obey interface correctly
// // 				...args
// // 			);
// // 		},
// // 		resolver: <T extends React.CSSProperties>(
// // 			self: TStyleFunctor<TDefs>,
// // 			style_based?: T,
// // 			...args: any[]
// // 		) => {
// // 			Object.assign(self, { ...style_based });
// // 		},
// // 	};

// // 	getDefinition() {
// // 		return (getUpdate as unknown as TGetEntries<TDefs>)(
// // 			this.definitions as TDefs
// // 		);
// // 	}
// // }

// // const static_style: React.CSSProperties = {
// // 	margin: "10%",
// // };

// // const some_styling_function = (
// // 	default_arguments: TStylingArgs,
// // 	input: string
// // ): React.CSSProperties => {
// // 	return { border: input };
// // };
// // const proto_style: TProtoStyle = {
// // 	def_default_args: [],
// // 	def_default_static_css: static_style,
// // 	def_default_styling_function: some_styling_function,
// // };
// // interface SubclassProtoStyle extends TProtoStyle {
// // 	def_custom_color: string;
// // 	def_custom_size: number;
// // }

// // const s = new Style(proto_style) as TStyleFunctor<TProtoStyle>;

// // type TSubclassProtoStyle = TProtoStyle & {
// // 	def_custom_color: string;
// // 	def_custom_size: number;
// // };

// // class B extends Style<TSubclassProtoStyle> {
// // 	/* Invalid, gives err
// // 	-	**correct**

// // 	*/

// // 	/* Invalid, gives err
// // 	-	**correct**

// // 	*/
// // 	// processors = {} //gives err correctly

// // 	/* Invalid, gives err
// // 	-	**correct**

// // 	*/
// // 	// nothing is valid since should be inherited

// // 	/* Invalid, gives err
// // 		- wrong type sig
// // 	-	**correct**
// // 	*/

// // 	// processors = {
// // 	// 	def_default_static_css: (static_style: React.CSSProperties): void => {
// // 	// 		this.definitions.def_default_static_css = static_style;
// // 	// 		Object.assign(this, { ...static_style });
// // 	// 	},

// // 	// 	def_default_styling_function: (
// // 	// 		styling_function: <T extends TStylingArgs>(
// // 	// 			default_arguments: T,
// // 	// 			...args: any[]
// // 	// 		) => React.CSSProperties
// // 	// 	): void => {
// // 	// 		this.definitions.def_default_styling_function = styling_function;
// // 	// 	},
// // 	// 	def_default_args: (default_arguments: any[]) => {
// // 	// 		this.definitions.def_default_args = default_arguments;
// // 	// 	},
// // 	// 	def_custom_color: (default_arguments: string) => {},
// // 	// 	def_custom_size: (default_arguments: string) => {},
// // 	// };

// // 	/* Valid, doesnt err
// // 	-	**correct**
// // 	*/

// // 	processors = {
// // 		def_default_static_css: (static_style: React.CSSProperties): void => {
// // 			this.definitions.def_default_static_css = static_style;
// // 			Object.assign(this, { ...static_style });
// // 		},

// // 		def_default_styling_function: (
// // 			styling_function: <T extends TStylingArgs>(
// // 				default_arguments: T,
// // 				...args: any[]
// // 			) => React.CSSProperties
// // 		): void => {
// // 			this.definitions.def_default_styling_function = styling_function;
// // 		},
// // 		def_default_args: (default_arguments: any[]) => {
// // 			this.definitions.def_default_args = default_arguments;
// // 		},
// // 		def_custom_color: (default_arguments: string) => {},
// // 		def_custom_size: (default_arguments: number) => {},
// // 	};

// // 	/* Broken
// // 	-	**Incorrect**
// // 	- Property 'super' does not exist on type 'B'.ts(2339)
// // 	*/

// // 	// processors = {
// // 	// 	...this.super.processors,
// // 	// 	def_custom_color: (default_arguments: string) => {},
// // 	// 	def_custom_size: (default_arguments: number) => {},
// // 	// };
// // }
// // // const s = new Style(proto_style) as TStyleFunctor<TProtoStyle>;

// // // console.log(s);

// // console.log(s("green"));
// // // console.log(s);
// // // console.log(s());
// // console.log(s === s());
// // // /* Dont even have to annotate it after the first construction */
// // // const s2 = new s();
// // // console.log(s2);

// // interface Car {
// // 	a: string;
// // }

// // interface CarConstructor {
// // 	new <T>(args: Car): T;
// // }

// // function C<T extends TDefinition>(this: any) {
// // 	return this as unknown as T;
// // }

// // const Car = {
// // 	// __proto__: C,
// // };
// // Object.setPrototypeOf(Car, C);
// // Car.constructor = C;
// // // const Car: <T>CarConstructor = function (args: Car) {
// // //   args.a = "hello";
// // // 	return args as T
// // // } ;

// // const c = new Car();
// // console.log(c.a);
// // interface Car<T> {
// // 	a: string;
// // }

// // interface Car<T> {
// // 	new <T>(...args: any[]): Car<T>;
// // 	some_thing_static: T;
// // }

// // const Car: {
// // 	new <T>(...args: any[]): Car<T>;
// // 	some_thing_static: string;
// // } = function <T>(this: Car<T>) {} as {
// // 	new <T>(...args: any[]): Car<T>;
// // 	some_thing_static: string;
// // };

// // // const c = new Car<string>();

// // // console.log(c);
// // // console.log(Car.some_thing_static);

// // class B extends Car<string> {
// // 	// static some_thing_static = "f";
// // }

// // // const obj:typeof Car<string> = {
// // // 	//   foo: 1,
// // // 	// prototype:Car,
// // // 	constructor:Function
// // // 	// new (): Cars<string>,
// // // 	// new:<T extends string>()=>{
// // // 	// 	// return Car<string> ;
// // // 	// },
// // // 	some_thing_static: "g",
// // // };

// // interface Car {
// // 	a: string;
// // }
// // type A<T> = { new <T>(): Car; some_thing_static: T };
// // class a<T> implements A<T> {
// // 	some_thing_static: T = {};
// // 	function<T extends unknown>(this: Car) {
// // 		// this.a = "hello";
// // 		(this.constructor as any).some_thing_static = "g";
// // 	}
// // }

// // //as unknown as A<unknown>;

// // const c = new Car<string>();

// // console.log(c);
// // console.log(Car.some_thing_static);

// // class B extends Car<number> {
// // 	static some_thing_static; //="g"
// // }

// class A{

// // 	definitions: TDefinition = {
// // 		def_default_static_css: {},
// // 		def_default_styling_function: () => ({}),
// // 		def_default_args: [],
// // 	};

// // 	processors: TProcessors<TDefs> | TMasterProc<TDefs> = {
// // 		def_default_static_css: (static_style: React.CSSProperties): void => {
// // 			this.definitions.def_default_static_css = static_style;
// // 			Object.assign(this, { ...static_style });
// // 		},

// // 		def_default_styling_function: (
// // 			styling_function: <T extends TStylingArgs>(
// // 				default_arguments: T,
// // 				...args: any[]
// // 			) => React.CSSProperties
// // 		): void => {
// // 			this.definitions.def_default_styling_function = styling_function;
// // 		},
// // 		def_default_args: (default_arguments: any[]) => {
// // 			this.definitions.def_default_args = default_arguments;
// // 		},
// // 	};
// }
