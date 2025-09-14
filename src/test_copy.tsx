interface ITest {}

class Test implements ITest {
	constructor(initialValue: number = 0) {
		const functor = function (): unknown {
			return functor;
		};
		Object.assign(functor, {
			value: initialValue,
		});
		Object.setPrototypeOf(functor, Test.prototype);

		return functor;
	}
}
interface C {
	new (...args: any): any;
}
type TestFunctor = Test & (() => number) & C;

const myOtherTest = new Test(10) as TestFunctor;
console.log(myOtherTest);

const s = new myOtherTest();
console.log(s);
console.log(s()); //this works fine
