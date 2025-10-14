const a = false;
type test1 = typeof a extends boolean
	? typeof a extends true
		? true
		: false
	: false;
const b = {} as any;

b["h"] = 3;
console.log(b);
