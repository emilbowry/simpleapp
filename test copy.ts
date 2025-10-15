import type * as CSS from "csstype";
import type { THtmlAttributes } from "./T3";
type TAtRule = CSS.AtRules | `${CSS.AtRules}${string})`;

type TAllPseudos = CSS.Pseudos | `${CSS.Pseudos | ":matches("}${string}`;
type TClassSelector = `.${string}`;
type TIDSelector = `#${string}`;
type TElementTag = `${keyof React.JSX.IntrinsicElements}`;
type TValidKeys =
	| THtmlAttributes
	| TAtRule
	| TAllPseudos
	| TClassSelector
	| TIDSelector
	| TElementTag
	| "*";

type ValidAttr<T extends string, U extends string> = U extends TValidNested<U>
	? TValidNested<U, T>
	: TValidInner<U, T>;

type TCases<
	T extends string,
	U extends string = T,
	V extends string = T,
	W extends string = T,
	A extends string | never = never,
	B extends string | never = never
> = T extends U ? (T extends V ? A : T extends W ? A : B) : never;

type TValidNested<T extends string, U extends string = string> = TCases<
	T,
	U,
	`&${TAtRule}`,
	`&${TElementTag}`,
	never,
	T
>;

type TValidInner<T extends string, U extends string = TValidKeys> = TCases<
	T,
	U,
	TAtRule,
	TElementTag,
	T,
	`&${T}`
>;
type TValidStyle<T extends string, U extends string = T> = {
	[k in T]: TValidCSS<ValidAttr<T, U>>;
};
type TValidCSS<T extends string> = TValidStyle<TValidInner<T>> | CSS.Properties;

export {
	TAllPseudos,
	TAtRule,
	TClassSelector,
	TElementTag,
	THtmlAttributes,
	TIDSelector,
	TValidCSS,
	TValidKeys,
	TValidStyle,
	ValidAttr,
};

// // Testing whether it gives any false positives or false negatives
const a: TValidStyle<TElementTag | TClassSelector | TAllPseudos> = {
	".btn": {
		padding: "auto",
		"&.btn": { padding: "auto" },
		"&:hover": {
			transform: "translateY(-2px)",
		},
	},
	div: { padding: "auto", div: { padding: "auto" } },
};

// let y: TValidStyle<TClassSelector> = { ".btn": { padding: "auto" } }; // Should Pass

// const b: TValidCSS<TClassSelector> = {
// 	// Should Pass
// 	padding: "auto",

// 	"&.btn": { padding: "auto", "&.btn": { padding: "auto" } },
// };
// const c: TValidCSS<TClassSelector> = {
// 	// Should Pass
// 	padding: "auto",

// 	".btn": { padding: "auto", "&.btn": { padding: "auto" } }, // Should ERR
// };
// type a<T> = T extends TElementTag ? true : false;
// let v:a<".btn">
const styleObjectToString = <T extends string, U extends string = T>(
	styleObject: TValidCSS<T> | TValidStyle<T, U>
): string => {
	let cssString = "";

	for (const [key, value] of Object.entries(styleObject)) {
		if (typeof value === "object" && value !== null) {
			cssString += `${key}{${styleObjectToString(value as any)}}`;
		} else {
			const propertyName = key.replace(
				/[A-Z]/g,
				(letter) => `-${letter.toLowerCase()}`
			);
			cssString += `${propertyName}:${value};`;
		}
	}

	return cssString;
};

const myStyle: TValidStyle<TAtRule | TClassSelector | TAllPseudos> = {
	"@media (min-width: 900px)": {
		".container": {
			maxWidth: "850px",
		},
	},

	".card": {
		display: "block",
		backgroundColor: "white",

		"&:hover": {
			transform: "translateY(-2px)",
		},
	},
};
export {
	TAllPseudos,
	TAtRule,
	TClassSelector,
	TElementTag,
	THtmlAttributes,
	TIDSelector,
	TValidCSS,
	TValidKeys,
	TValidStyle,
	ValidAttr,
};
