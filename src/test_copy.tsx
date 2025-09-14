interface IStyle {}

class Style implements IStyle {
	functor = (self: any, ...args: any[]) => {
		self["color"] = "red";
		return self;
	};
	constructor(initialValue: number = 0) {
		let self = this;
		const functor = function (): unknown {
			self.functor(functor);
			return functor;
		};
		Object.assign(functor, {
			value: initialValue,
		});
		Object.setPrototypeOf(functor, Style.prototype);

		return functor as any;
	}
}
interface C {
	new (...args: any): any;
}
type StyleFunctor = Style & (() => any) & C;

const myOtherStyle = new Style(10) as StyleFunctor;
console.log(myOtherStyle);

const s = new myOtherStyle();
console.log(s);
console.log(s()); //this works fine
console.log(s === s()); //this works fine
