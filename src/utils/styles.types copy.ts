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
type TAtRule = CSS.AtRules | `${CSS.AtRules}${string})`;

type TAllPseudos = CSS.Pseudos | `${CSS.Pseudos | ":matches("}${string}`;
type TClassSelector = `.${string}`;
type TIDSelector = `#${string}`;
type TElementTag = keyof React.JSX.IntrinsicElements;
type TValidKeys =
	| THtmlAttributes
	| TAtRule
	| TAllPseudos
	| TClassSelector
	| TIDSelector
	| TElementTag
	| "*";

type ValidAttr<T extends string> = T extends TValidNested<T>
	? TValidNested<T>
	: TValidInner<T>;

type TCases<
	T extends string,
	U extends string = T,
	V extends string = T,
	W extends string = T,
	A extends string | never = never,
	B extends string | never = never
> = T extends U ? (T extends V ? A : T extends W ? A : B) : never;

// type TValidNested<T> = T extends `&${TAtRule}`
// 	? never
// 	: T extends `&${TElementTag}`
// 	? never
// 	: T;
type TValidNested<T extends string> = TCases<
	T,
	string,
	`&${TAtRule}`,
	`&${TElementTag}`,
	never,
	T
>;

type TValidInner<T extends string> = TCases<
	T,
	TValidKeys,
	TAtRule,
	TElementTag,
	T,
	`&${T}`
>;

type TValidStyle<T extends string, U extends string = T> = {
	[k in T]: TValidCSS<ValidAttr<U>>;
};
type TValidCSS<T extends string> = TValidStyle<TValidInner<T>> | CSS.Properties;

export {
	TAllPseudos,
	TAtRule,
	TClassSelector,
	THtmlAttributes,
	TIDSelector,
	TValidCSS,
	TValidKeys,
	TValidStyle,
	ValidAttr,
};

// Testing whether it gives any false positives or false negatives
const a: TValidStyle<TClassSelector> = {
	".btn": { padding: "auto", "&.btn": { padding: "auto" } },
	padding: "auto", // Should ERR
};

let y: TValidStyle<TClassSelector> = { ".btn": { padding: "auto" } }; // Should Pass

const b: TValidCSS<TClassSelector> = {
	// Should Pass
	padding: "auto",

	"&.btn": { padding: "auto", "&.btn": { padding: "auto" } },
};
const c: TValidCSS<TClassSelector> = {
	// Should Pass
	padding: "auto",

	".btn": { padding: "auto", "&.btn": { padding: "auto" } }, // Should ERR
};
type a = TElementTag extends string ? true : false;
/*
//OLD

type TValidKeys =
	| THtmlAttributes
	| TAtRule
	| TAllPseudos
	| TClassSelector
	| TIDSelector
	| "*";

type ValidAttr<T extends string> = T extends `&${TValidKeys}`
	? T
	: T extends TValidKeys
	? `&${T}`
	: never;

type TValidStyle<T extends string, U extends string = T> = {
	[k in T]: TValidCSS<ValidAttr<U>>;
};

type TValidCSS<T extends string> = TValidStyle<ValidAttr<T>> | CSS.Properties;
*/
