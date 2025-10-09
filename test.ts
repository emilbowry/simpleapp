type TSanitationFunction = (
	args: TOptionalParameters,
	optional_f_params: any
) => any;
type ValidInput =
	| object
	| TSanitationFunction
	| string
	| number
	| boolean
	| bigint
	| symbol
	| null
	| undefined;

type TOptionalParameters = any;

interface IOptionalParametersAssignments {
	key: string;
	key_alias?: string;
	return_value: ValidInput;

	optional_f_params?: any;
}

const santiseOptionalParameters = (
	args: TOptionalParameters,
	assignments: IOptionalParametersAssignments[] | undefined
): any => {
	const sanitisedArgs: any = {};

	if (!assignments) {
		return sanitisedArgs;
	}
	for (const assignment of assignments) {
		const { key, key_alias, return_value, optional_f_params } = assignment;
		const outKey = key_alias || key;
		const _return_value =
			typeof return_value === "function"
				? return_value(args, optional_f_params)
				: return_value;
		sanitisedArgs[outKey] = args?.[key] ? args[key] : _return_value;
	}

	return sanitisedArgs;
};

const refactoredSimplifiedFtypeFunction = (args: TOptionalParameters) => {
	const myAssignments: IOptionalParametersAssignments[] = [
		{
			key: "borderWidth",
			return_value: (original_args) =>
				original_args?.borderColour ? "2px" : undefined,
		},
		{ key: "colour", key_alias: "color", return_value: "#003845" },
		{
			key: "borderColour",
			key_alias: "borderColor",
			return_value: undefined,
		},
	];

	const processedArgs = santiseOptionalParameters(args, myAssignments);

	return processedArgs;
};

console.log("--- Test Case 1: No args ---");
console.log("Result:", refactoredSimplifiedFtypeFunction(undefined));

console.log("\n--- Test Case 2: All args ---");
const allArgs = { colour: "#FFF", borderColour: "black", borderWidth: "5px" };
console.log("Result:", refactoredSimplifiedFtypeFunction(allArgs));

console.log("\n--- Test Case 3: Only border color ---");
const borderOnly = { borderColour: "red" };
console.log("Result:", refactoredSimplifiedFtypeFunction(borderOnly));

console.log("\n--- Test Case 4: Only color ---");
const colorOnly = { colour: "blue" };
console.log("Result:", refactoredSimplifiedFtypeFunction(colorOnly));
