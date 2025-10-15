// import type * as CSS from "csstype";
// import type { THtmlAttributes } from "../T3";
// type TAtRule = CSS.AtRules | `${CSS.AtRules}${string})` | `@media(${string}`;

// type TAllPseudos = CSS.Pseudos | `${CSS.Pseudos | ":matches("}${string}`;
// type TClassSelector = `.${string}`;
// type TIDSelector = `#${string}`;
// type TElementTag = `${keyof React.JSX.IntrinsicElements}`;
// type TValidKeys =
// 	| THtmlAttributes
// 	| TAtRule
// 	| TAllPseudos
// 	| TClassSelector
// 	| TIDSelector
// 	| TElementTag
// 	| "*";

// type ValidAttr<T extends string, U extends string> = U extends TValidNested<U>
// 	? TValidNested<U, T>
// 	: TValidInner<U, T>;

// type TCases<
// 	T extends string,
// 	U extends string = T,
// 	V extends string = T,
// 	W extends string = T,
// 	A extends string | never = never,
// 	B extends string | never = never
// > = T extends U ? (T extends V ? A : T extends W ? A : B) : never;

// type TValidNested<T extends string, U extends string = string> = TCases<
// 	T,
// 	U,
// 	`&${TAtRule}`,
// 	`&${TElementTag}`,
// 	never,
// 	T
// >;

// type TValidInner<T extends string, U extends string = TValidKeys> = TCases<
// 	T,
// 	U,
// 	TAtRule,
// 	TElementTag,
// 	T,
// 	`&${T}`
// >;
// type TValidStyle<T extends string, U extends string = T> = {
// 	[k in T]?: TValidCSS<ValidAttr<T, U>>;
// };
// type TValidCSS<T extends string> = TValidStyle<TValidInner<T>> | CSS.Properties;

// export {
// 	TAllPseudos,
// 	TAtRule,
// 	TClassSelector,
// 	TElementTag,
// 	THtmlAttributes,
// 	TIDSelector,
// 	TValidCSS,
// 	TValidKeys,
// 	TValidStyle,
// 	ValidAttr,
// };

// // // Testing whether it gives any false positives or false negatives

// // div: { padding: "auto", div: { padding: "auto" } },

// // let y: TValidStyle<TClassSelector> = { ".btn": { padding: "auto" } }; // Should Pass

// // const b: TValidCSS<TClassSelector> = {
// // 	// Should Pass
// // 	padding: "auto",

// // 	"&.btn": { padding: "auto", "&.btn": { padding: "auto" } },
// // };
// // const c: TValidCSS<TClassSelector> = {
// // 	// Should Pass
// // 	padding: "auto",

// // 	".btn": { padding: "auto", "&.btn": { padding: "auto" } }, // Should ERR
// // };
// // type a<T> = T extends TElementTag ? true : false;
// // let v:a<".btn">

// const HTMLTags = ["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noindex","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","search","slot","script","section","select","small","source","span","strong","style","sub","summary","sup","table","template","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul",""var"","video","wbr","webview",""svg",""animate","animateMotion","animateTransform","circle","clipPath","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","switch","symbol","text","textPath","tspan","use","view"]
// const styleObjectToString = <T extends string, U extends string = T>(
// 	styleObject: TValidCSS<T> | TValidStyle<T, U>
// ): string => {
// 	let cssString = "";

// 	for (const [key, value] of Object.entries(styleObject)) {
// 		if (typeof value === "object" && value !== null) {
// 			cssString += `${key}{${styleObjectToString(value as any)}}`;
// 		} else {
// 			const propertyName = key.replace(
// 				/[A-Z]/g,
// 				(letter) => `-${letter.toLowerCase()}`
// 			);
// 			cssString += `${propertyName}:${value};`;
// 		}
// 	}

// 	return cssString;
// };

// // const myStyle: TValidStyle<TAtRule | TClassSelector | TAllPseudos> = {
// // 	"@media (min-width: 900px)": {
// // 		".container": {
// // 			maxWidth: "850px",
// // 		},
// // 	},

// // 	".card": {
// // 		display: "block",
// // 		backgroundColor: "white",
// // 		"&:hover": {
// // 			transform: "translateY(-2px)",
// // 		},
// // 	},
// // };
// // type a = "@media (min-width: 900px)" extends
// // 	| TAtRule
// // 	| TClassSelector
// // 	| TAllPseudos
// // 	? true
// // 	: false;

// const gfs: TValidStyle<TAtRule | TClassSelector | TAllPseudos> = {
// 	"@media(min-width: 900px)": {
// 		padding: "auto",
// 		".container": {
// 			maxWidth: "850px",
// 		},
// 	},
// 	".card": {
// 		display: "block",
// 		backgroundColor: "white",
// 		"&:hover": {
// 			transform: "translateY(-2px)",
// 		},
// 	},
// };

// // type A = ValidAttr<TAtRule, TAtRule>;

// // const a = gfs;
// console.log(styleObjectToString(gfs));
// // type B = "@media (min-width: 900px)" extends TAtRule ? true : false; //true
