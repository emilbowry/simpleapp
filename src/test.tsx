import React from "react";

export interface IProtoStyle {
	def_static_css: React.CSSProperties;
	def_styling_function: (...args: any[]) => React.CSSProperties;
	def_default_args: any[] | undefined;
}
export type TDefinition = Partial<IProtoStyle>;
export interface IStyle extends IProtoStyle, React.CSSProperties {
	[key: string]: any;
	getDefinition: (style_based: IProtoStyle) => Partial<IProtoStyle>;
	updateDef: (definition: TDefinition) => void;
	computeStyle: (proto_style: IProtoStyle) => void;
	functor: (...args: any[]) => StyleFunctor; //
}
type StyleFunctor = Style & {
	(...args: any[]): StyleFunctor;
	new (...args: any): any;
};

class Style implements IStyle {
	functor = (...args: any[]) => {
		console.log("called actual functor");
		const computed_style = this.def_styling_function(...args);
		this.processRuntimeStyle(computed_style);

		return this.functor as StyleFunctor;
	};

	// functor = function (this: any, ...args: any[]) {
	// 	// console.log(this);
	// 	const computed_style = this.def_styling_function(...args);
	// 	this.processRuntimeStyle(computed_style);

	// 	return this.functor as StyleFunctor;
	// };
	// functor(...args: any[]) {
	// 	const computed_style = this.def_styling_function(...args);
	// 	this.processRuntimeStyle(computed_style);

	// 	return this.functor as StyleFunctor;
	// }
	// [key: string]: any;

	def_static_css: React.CSSProperties = {};
	def_styling_function: (...args: any[]) => React.CSSProperties = () => ({});
	def_default_args: any[] = [];
	resolveCollisions<T extends React.CSSProperties>(
		style_based?: T,
		...args: any[]
	) {}

	processRuntimeStyle<T extends React.CSSProperties>(
		style_based?: T,
		...args: any[]
	) {
		Object.assign(this.functor, { ...style_based });
	}
	constructor(proto_style?: IProtoStyle) {
		console.log("constructor invoked");
		this.computeStyle(proto_style || this);
		// const boundFunctor = this.functor.bind(this);
		// this.functor.bind(this);
		// function functor(this: any) {
		// 	return this.functor();
		// }
		let a = this;
		function _functor(...args: any[]) {
			// console.log(args);
			// return a.functor;
			const computed_style = a.def_styling_function(...args);
			a.processRuntimeStyle(computed_style);

			return a.functor as StyleFunctor;
		}
		// Object.assign(functor, { ...this });
		Object.setPrototypeOf(_functor, Style.prototype);

		// Object.assign(_functor, { ...a });
		Object.assign(_functor, { ...this });

		// Object.assign(this.functor, { ...this });
		// Object.assign(boundFunctor, { ...this });

		// Object.setPrototypeOf(this.functor, Style);
		Object.setPrototypeOf(_functor, Style);
		Object.assign(a, { functor: _functor });

		// Object.assign(this, { functor: _functor });

		// Object.setPrototypeOf(boundFunctor, Style);

		// Object.setPrototypeOf(this, Style.prototype);
		// Object.setPrototypeOf(this, Style);

		// Object.setPrototypeOf(this.functor, Style.prototype);
		Object.setPrototypeOf(this.functor, Style.prototype);

		// Object.setPrototypeOf(functor, Style.prototype);

		// Object.setPrototypeOf(boundFunctor, Style.prototype);
		// this.functor.constructor = Style;
		// this.functor.prototype = Object.create(Style);
		// this.functor.constructor = Object.create(Style.prototype);

		// return a.functor as StyleFunctor;
		return this.functor as StyleFunctor;

		// return boundFunctor as StyleFunctor;
	}
	getDefinition<T extends Partial<IProtoStyle>>(style_based: T): TDefinition {
		let def: TDefinition = {};
		Object.entries(this).forEach((item) => {
			if (item[0].startsWith("def")) {
				Object.assign(def, { item });
			}
		});
		return def;
	}
	processStaticStyle(static_style: React.CSSProperties) {
		this.def_static_css = static_style;
		Object.assign(this, { ...static_style });
	}
	processStylingFunction(
		styling_function: (...args: any[]) => React.CSSProperties
	) {
		this.def_styling_function = styling_function;
	}
	processDefaultArguments(default_arguments: any[]) {
		this.def_default_args = default_arguments;
	}
	updateDef(definition: TDefinition): void {}
	computeStyle<T extends IProtoStyle>(proto_style: T): void {
		this.getDefinition(proto_style);
		if (proto_style.def_static_css)
			this.processStaticStyle(proto_style.def_static_css);
		if (proto_style.def_styling_function)
			this.processStylingFunction(proto_style.def_styling_function);
		if (proto_style.def_default_args)
			this.processDefaultArguments(proto_style.def_default_args);
	}
}

const some_styling_function = (
	input: "1px solid red" | "1px solid blue"
): React.CSSProperties => {
	return { border: input };
};
const static_style: React.CSSProperties = {
	margin: "10%",
};

const proto_style: IProtoStyle = {
	def_default_args: [],
	def_static_css: static_style,
	def_styling_function: some_styling_function,
};

const s = new Style(proto_style) as StyleFunctor;

console.log(s);
/*
<ref *1> [Function (anonymous)] Style {
  functor: [Circular *1],
  def_static_css: { margin: '10%' },
  def_styling_function: [Function: some_styling_function],
  def_default_args: [],
  margin: '10%'
}
*/
console.log(s("red"));
/*
<ref *1> [Function (anonymous)] Style {
  functor: [Circular *1],
  def_static_css: { margin: '10%' },
  def_styling_function: [Function: some_styling_function],
  def_default_args: [],
  margin: '10%',
  border: 'red'
}
*/
console.log(s); //still has border set
/*
<ref *1> [Function (anonymous)] Style {
  functor: [Circular *1],
  def_static_css: { margin: '10%' },
  def_styling_function: [Function: some_styling_function],
  def_default_args: [],
  margin: '10%',
  border: 'red'
}
*/
console.log(s("blue"));
/*
<ref *1> [Function (anonymous)] Style {
  functor: [Circular *1],
  def_static_css: { margin: '10%' },
  def_styling_function: [Function: some_styling_function],
  def_default_args: [],
  margin: '10%',
  border: 'blue'
}
*/
console.log(s); //still has border set, unsure if its an issue?
/*
<ref *1> [Function (anonymous)] Style {
  functor: [Circular *1],
  def_static_css: { margin: '10%' },
  def_styling_function: [Function: some_styling_function],
  def_default_args: [],
  margin: '10%',
  border: 'blue'
}
*/
console.log(Style);

const s2 = new s();
console.log(s2);
