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
	functor: () => StyleFunctor; //
}
type StyleFunctor = Style & { (...args: any[]): StyleFunctor };

let my_track = 0;
const y = () => {
	my_track += 1;
	return my_track;
};
let exp = "1";
class Style implements IStyle {
	// var_z = my_track;
	unset = true;
	// [exp] = exp;
	var_one = this.unset ? y() : 0;
	z = 0;

	var_two = 0;
	functor = (...args: any[]) => {
		// (this.functor as any).var_two = (this.functor as any).var_two + 1;
		(this.functor as any).z = my_track;

		const computed_style = this.def_styling_function(...args);
		this.processRuntimeStyle(computed_style);
		// (this.functor as any).unset = true;

		// (this.functor as any).var_one = y();
		return this.functor as StyleFunctor;
	};
	// var_three = 0;
	var_four = 0;
	not_c = false;
	c = () => {
		Object.assign(this, { var_four: this.var_four + 1 });
		this.var_four = this.var_four + 1;
		(this.functor as any).var_four = this.var_four + 1;
		this.not_c = true;
		return this.c;
	};
	var_five = this.c();
	d = () => {
		Object.defineProperty(this.functor, "e", {
			get() {
				return this.d();
			},
			set(args: any[]) {
				this.d = args;
			},
		});
		Object.defineProperty(this.functor, "d", {
			get() {
				return this.e;
			},
		});
		// Object.defineProperty(this, "e", {
		// 	get() {
		// 		return this.d();
		// 	},
		// });
		return my_track;
	};

	get e() {
		return this.d();
	}
	var_d = this.e;

	[key: string]: any;
	// functor = (...args: any[]) => {
	// 	(this.functor as any).var_two = (this.functor as any).var_two + 1;

	// 	const computed_style = this.def_styling_function(...args);
	// 	this.processRuntimeStyle(computed_style);
	// 	(this.functor as any).var_three = y;
	// 	return this.functor as StyleFunctor;
	// };
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
		this.computeStyle(proto_style || this);
		Object.assign(this.functor, { ...this });
		Object.setPrototypeOf(this.functor, Style.prototype);
		return this.functor as StyleFunctor;
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

const some_styling_function = (input: "red" | "blue"): React.CSSProperties => {
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
console.log(my_track);

const s = new Style(proto_style) as StyleFunctor;
console.log("----");

console.log(s);
console.log(s("red"));
console.log(s); //still has border set, unsure if its an issue?
console.log(s("blue"));
console.log(s); //still has border set, unsure if its an issue?
