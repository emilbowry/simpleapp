// // The broader set of all possible style names

// type A = `${string}_style`;
// type B = `${string}_style.${number}`;

// const someName: any = (st: string) => `getDynamicData${st}`; // Type is inferred as `string`, not `"getDynamicData"`
// class SomeClass {
// 	// [key: string]: string;
// 	// public y = 4;
// 	// get [someName]() {
// 	// 	const t = someName;
// 	// 	console.log(t);
// 	// 	// console.log(t());
// 	// 	// console.log("g");
// 	// 	return t;
// 	// 	// return "This is some dynamic data!";
// 	// }
// 	// // get() {
// 	// // 	console.log("h");
// 	// }
// }

// // const store = new SomeClass();
// // console.log(store[someName]("f")); // Error: Property 'getDynamicData' does not exist on type 'DataStore'.
// console.log(SomeClass.prototype);
// type TStyle = `${string}_style${string | ""}`;

// type TName = `${string}_style`;
// type TThemeName = `${string}_style.${number}`;

// type Themed<T> = T extends TThemeName
// 	? TThemeName
// 	: T extends TName
// 	? true
// 	: false;

// let a: Themed<"fas_style.1">;

// console.log(<Themed>"fas_style.1");

type AnyRecord = Record<string, unknown>;

const dynamicObj: AnyRecord = { foo: 123, bar: "hello" };

type AnyRecord2 = Record<string, AnyRecord>;

const dynamicObj2: AnyRecord2 = { a: dynamicObj, b: dynamicObj };

const proxy = new Proxy<AnyRecord2>(dynamicObj2, {
	get(target, prop: string) {
		console.log(`Access: ${prop}`);
		const val = Reflect.get(target, prop);
		const a = { ...dynamicObj2[prop], new: "3" };
		Object.assign(a, {
			call: () => {
				console.log("hi");
			},
			apply: (...args: any[]) => {
				console.log("hi");
			},
		});
		return a;
		// return Reflect.get(target, prop);
	},
	apply(fnTarget, thisArg, argArray) {
		console.log(`CALL:`);
		// return Reflect.apply(fnTarget as any, thisArg, argArray);
	},
});
Object.assign(proxy, {
	f: (...args: any[]) => {
		console.log("hi");
	},
});
console.log(proxy); // logs "Access: foo" → 123
console.log(proxy.f); // logs "Access: bar" → "hello"
