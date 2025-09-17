class A<T extends any> {
	static def = {
		// throw new Error("Method not implemented.");
	};
	// def: any;
	// static {
	// 	if (!this.hasOwnProperty("def")) {
	// 		this.def = Object.create(this.def);
	// 	}
	// }
	def = { a: { b: 2, c: 3 }, d: { e: 2, f: 3 } };

	constructor() {
		// const ctor = this.constructor as any;
		let desc = Object.getOwnPropertyDescriptor(this, "def");
		// console.log(ctor.toString());
		console.log(desc);

		// this.getdef();
	}
}

class B<T extends any> extends A<T> {
	def: any = {
		...(this as typeof this).def,
		d: { e: 4, f: 7 },
		// g: { e: 4, f: 6 },
	};

	constructor() {
		super();
		// let desc = Object.getOwnPropertyDescriptor(this, "def");
		// console.log(desc);
		console.log(this.def);

		// console.log(this.constructor.toString());
	}
}
// new A();
const b = new B();

console.log(B.def);
