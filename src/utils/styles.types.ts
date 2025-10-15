import type * as CSS from "csstype";
type THtmlAttributes =
	| `[abbr${string}]`
	| `[accept-charset${string}]`
	| `[accept${string}]`
	| `[accesskey${string}]`
	| `[action${string}]`
	| `[align${string}]`
	| `[alink${string}]`
	| `[allow${string}]`
	| `[allowfullscreen${string}]`
	| `[allowpaymentrequest${string}]`
	| `[alt${string}]`
	| `[archive${string}]`
	| `[async${string}]`
	| `[attributionsrc${string}]`
	| `[autobuffer${string}]`
	| `[autocapitalize${string}]`
	| `[autocomplete${string}]`
	| `[autofocus${string}]`
	| `[autoplay${string}]`
	| `[axis${string}]`
	| `[background${string}]`
	| `[behavior${string}]`
	| `[bgcolor${string}]`
	| `[blocking${string}]`
	| `[border${string}]`
	| `[bottommargin${string}]`
	| `[browsingtopics${string}]`
	| `[capture${string}]`
	| `[cellpadding${string}]`
	| `[cellspacing${string}]`
	| `[char${string}]`
	| `[charoff${string}]`
	| `[charset${string}]`
	| `[checked${string}]`
	| `[cite${string}]`
	| `[class${string}]`
	| `[classid${string}]`
	| `[clear${string}]`
	| `[codebase${string}]`
	| `[codetype${string}]`
	| `[color${string}]`
	| `[cols${string}]`
	| `[colspan${string}]`
	| `[compact${string}]`
	| `[content${string}]`
	| `[contenteditable${string}]`
	| `[contextmenu${string}]`
	| `[controls${string}]`
	| `[coords${string}]`
	| `[credentialless${string}]`
	| `[crossorigin${string}]`
	| `[data${string}]`
	| `[datetime${string}]`
	| `[declare${string}]`
	| `[decoding${string}]`
	| `[default${string}]`
	| `[defer${string}]`
	| `[dir${string}]`
	| `[direction${string}]`
	| `[dirname${string}]`
	| `[disabled${string}]`
	| `[download${string}]`
	| `[draggable${string}]`
	| `[enctype${string}]`
	| `[enterkeyhint${string}]`
	| `[exportparts${string}]`
	| `[face${string}]`
	| `[fetchpriority${string}]`
	| `[for${string}]`
	| `[form${string}]`
	| `[formaction${string}]`
	| `[formenctype${string}]`
	| `[formmethod${string}]`
	| `[formnovalidate${string}]`
	| `[formtarget${string}]`
	| `[frame${string}]`
	| `[frameborder${string}]`
	| `[headers${string}]`
	| `[height${string}]`
	| `[hidden${string}]`
	| `[high${string}]`
	| `[href${string}]`
	| `[hreflang${string}]`
	| `[hspace${string}]`
	| `[http-equiv${string}]`
	| `[id${string}]`
	| `[imagesizes${string}]`
	| `[imagesrcset${string}]`
	| `[inert${string}]`
	| `[inputmode${string}]`
	| `[integrity${string}]`
	| `[is${string}]`
	| `[ismap${string}]`
	| `[itemid${string}]`
	| `[itemprop${string}]`
	| `[itemref${string}]`
	| `[itemscope${string}]`
	| `[itemtype${string}]`
	| `[kind${string}]`
	| `[label${string}]`
	| `[lang${string}]`
	| `[language${string}]`
	| `[leftmargin${string}]`
	| `[link${string}]`
	| `[list${string}]`
	| `[loading${string}]`
	| `[longdesc${string}]`
	| `[loop${string}]`
	| `[low${string}]`
	| `[manifest${string}]`
	| `[marginheight${string}]`
	| `[marginwidth${string}]`
	| `[max${string}]`
	| `[maxlength${string}]`
	| `[media${string}]`
	| `[method${string}]`
	| `[methods${string}]`
	| `[min${string}]`
	| `[minlength${string}]`
	| `[moz-opaque${string}]`
	| `[mozactionhint${string}]`
	| `[mozallowfullscreen${string}]`
	| `[msallowfullscreen${string}]`
	| `[multiple${string}]`
	| `[muted${string}]`
	| `[name${string}]`
	| `[nohref${string}]`
	| `[nomodule${string}]`
	| `[nonce${string}]`
	| `[noresize${string}]`
	| `[noshade${string}]`
	| `[novalidate${string}]`
	| `[nowrap${string}]`
	| `[onerror${string}]`
	| `[open${string}]`
	| `[optimum${string}]`
	| `[part${string}]`
	| `[pattern${string}]`
	| `[ping${string}]`
	| `[placeholder${string}]`
	| `[popover${string}]`
	| `[popovertarget${string}]`
	| `[popovertargetaction${string}]`
	| `[poster${string}]`
	| `[preload${string}]`
	| `[profile${string}]`
	| `[readonly${string}]`
	| `[referrerpolicy${string}]`
	| `[rel${string}]`
	| `[required${string}]`
	| `[rev${string}]`
	| `[reversed${string}]`
	| `[rightmargin${string}]`
	| `[rows${string}]`
	| `[rowspan${string}]`
	| `[rules${string}]`
	| `[sandbox${string}]`
	| `[scope${string}]`
	| `[scrollamount${string}]`
	| `[scrolldelay${string}]`
	| `[scrolling${string}]`
	| `[selected${string}]`
	| `[shadowroot${string}]`
	| `[shadowrootmode${string}]`
	| `[shape${string}]`
	| `[size${string}]`
	| `[sizes${string}]`
	| `[slot${string}]`
	| `[span${string}]`
	| `[spellcheck${string}]`
	| `[src${string}]`
	| `[srcdoc${string}]`
	| `[srclang${string}]`
	| `[srcset${string}]`
	| `[standby${string}]`
	| `[start${string}]`
	| `[step${string}]`
	| `[style${string}]`
	| `[summary${string}]`
	| `[tabindex${string}]`
	| `[target${string}]`
	| `[text${string}]`
	| `[title${string}]`
	| `[topmargin${string}]`
	| `[translate${string}]`
	| `[truespeed${string}]`
	| `[type${string}]`
	| `[usemap${string}]`
	| `[valign${string}]`
	| `[value${string}]`
	| `[valuetype${string}]`
	| `[version${string}]`
	| `[virtualkeyboardpolicy${string}]`
	| `[vlink${string}]`
	| `[vspace${string}]`
	| `[webkitallowfullscreen${string}]`
	| `[width${string}]`
	| `[wrap${string}]`
	| `[x-moz-errormessage${string}]`
	| `[xmlns]`;
type TAtRule = CSS.AtRules | `${CSS.AtRules}${string}` | `@media(${string}`;

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

type ValidAttr<T extends string, U extends string> = U extends T
	? TValidNested<U, T>
	: TValidInner<U, T>;
type TCases<
	T extends string,
	U extends string = T,
	V extends string = T,
	A extends string | never = never,
	B extends string | never = never
> = T extends U ? (T extends V ? A : B) : never;

type TValidNested<T extends string, U extends string = string> = TCases<
	T,
	U,
	`&${TAtRule | TElementTag}`,
	never,
	T
>;
let a: TValidInner<"cow">;
type TValidInner<T extends string, U extends string = TValidKeys> = TCases<
	T,
	U,
	TAtRule | TElementTag,
	T,
	`&${T}`
>;
type ValidStyle<T, U> = {
	[k in TValidInner<T>]?: TValidInner;
};
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
// type TValidStyle<T, U = undefined> = T extends string
// 	? U extends string
// 		? {
// 				[k in T]?: U extends undefined ? TValidCSS<ValidAttr<T, T>> : U;
// 		  }
// 		: never
// 	: never;

// Valid Style:
// Accepts keys defined by T
// Value =CSS.Properties | ValidStyle<T_prime> for nested styles | U | ValidStyle
type TValidStyle<T, U = T> = T extends string
	? U extends string
		? {
				[k in T]?: TValidCSS<ValidAttr<T, U>>;
		  }
		: never
	: never;
type TValidCSS<T> = NoInfer<T> extends string
	? TValidStyle<TValidInner<T>> | CSS.Properties
	: never;

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
// 	HTMLTags,
// };
const HTMLTags = [
	"a",
	"abbr",
	"address",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"base",
	"bdi",
	"bdo",
	"big",
	"blockquote",
	"body",
	"br",
	"button",
	"canvas",
	"caption",
	"center",
	"cite",
	"code",
	"col",
	"colgroup",
	"data",
	"datalist",
	"dd",
	"del",
	"details",
	"dfn",
	"dialog",
	"div",
	"dl",
	"dt",
	"em",
	"embed",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hgroup",
	"hr",
	"html",
	"i",
	"iframe",
	"img",
	"input",
	"ins",
	"kbd",
	"keygen",
	"label",
	"legend",
	"li",
	"link",
	"main",
	"map",
	"mark",
	"menu",
	"menuitem",
	"meta",
	"meter",
	"nav",
	"noindex",
	"noscript",
	"object",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"param",
	"picture",
	"pre",
	"progress",
	"q",
	"rp",
	"rt",
	"ruby",
	"s",
	"samp",
	"search",
	"slot",
	"script",
	"section",
	"select",
	"small",
	"source",
	"span",
	"strong",
	"style",
	"sub",
	"summary",
	"sup",
	"table",
	"template",
	"tbody",
	"td",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"title",
	"tr",
	"track",
	"u",
	"ul",
	"var",
	"video",
	"wbr",
	"webview",
	"svg",
	"animate",
	"animateMotion",
	"animateTransform",
	"circle",
	"clipPath",
	"defs",
	"desc",
	"ellipse",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"filter",
	"foreignObject",
	"g",
	"image",
	"line",
	"linearGradient",
	"marker",
	"mask",
	"metadata",
	"mpath",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialGradient",
	"rect",
	"set",
	"stop",
	"switch",
	"symbol",
	"text",
	"textPath",
	"tspan",
	"use",
	"view",
];

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

// console.log(styleObjectToString(gfs));
