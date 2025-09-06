// src/components/hexagons/hexagonRow/HexagonRow.styles.ts

import React from "react";
import { rspacing, aspace } from "./HexagonRow.consts";

/*
	CONSTANT DEFINITIONS 
*/

const ASPECT_RATIO = 2 / Math.sqrt(3); // Width/Height,  W=H.r
const n = 3;
const CONTAINER_per_Element = 1 / n;

const colGap = (relative_spacing: number = 0, absolute_spacing: number = 0) => {
	const HORIZONTAL_SPACE_SF = ASPECT_RATIO;
	//  Makes sense since devolves into an equilateral triangle problem
	// == 1/cos(30)
	const horizontal_spacing = relative_spacing * HORIZONTAL_SPACE_SF;
	return horizontal_spacing;
};
/* 
**IMPORTANT**:

row-gap is CANNONICALLY DEFINED in terms of item **width**
*/
const rowGap = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): number | [number, number] => {
	const verticalSpacing = relative_spacing;
	return [verticalSpacing, absolute_spacing];
};

/*
	SCALING CORRECTION FACTOR: k


k(relative_space) scales, transformed % into % of orignal element (container/n)
g:= col-gap
Derivation:

W.n = W'.n +(n-1).g
g = Wx/100
	W. (n-(n-1).(x/100))/n = W'
let W=kW'
k = n/(n-(n-1).(x/100))

*/

const K = (relative_spacing: number = 0) => {
	const gap = colGap(relative_spacing);
	const k = n / (n - (n - 1) * (gap / 100));

	return k;
};

/*
SCALING CORRECTION FACTOR RESULTS
*/

const delta_W = (relative_spacing: number = 0) => {
	return K(relative_spacing) - 1;
};

// Mathematical Definitons

const centerVertTranslation = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	const κ = 1 / ASPECT_RATIO;
	return 50 * κ;
};

const gapMidpointTranslation = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	const κ = 1 / ASPECT_RATIO;

	const row_gap = relative_spacing * κ;
	// Since it is relative to width **already** by definition no need for kappa scaling
	const row_midpoint = row_gap / 2;
	return row_midpoint;
};

/* 
**IMPORTANT**:

	- CANNONICALLY DEFINED in terms of item **width**
*/
const centreYOffset = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): number | [number, number] => {
	return [
		centerVertTranslation(relative_spacing) +
			gapMidpointTranslation(relative_spacing),
		+absolute_spacing / 2,
	];
};

const edgeYOffset = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	return 0;
};

const overlapTranslation = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	const shift_percentage = 25;
	const k = K(relative_spacing);
	return shift_percentage * k * 1; // Since column-gap is our cannonical inner translation we need to maintain the absolute shift
};

const PositionCorrectionFactor = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	//overlapTranslation would shift the sclaed hexagon correctly if the centered at the same point
	// They are actually centered at +- Delta_w/2 (I think so need to correct back for that)
	return +delta_W(relative_spacing) / 2;
};

const XScaleCorrectionFactor = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	const k = K(relative_spacing);

	return (k * relative_spacing) / 4;
};

const edgeXOffset = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): number | [number, number] => {
	const multiplier = absolute_spacing >= 0 ? 4 : 3; // Idk why we need a multiplier nor the divisor by 5
	// something to do with repeat(3,1fr)
	return [
		overlapTranslation(relative_spacing) +
			PositionCorrectionFactor(relative_spacing) +
			XScaleCorrectionFactor(relative_spacing),
		-absolute_spacing * ASPECT_RATIO,
	];
};

// Util Functions

const getCalc = (vals: number | [number, number], dual: boolean = false) => {
	let rel = 0;
	let abs = 0;

	if (typeof vals === "number") {
		rel = vals;
	} else {
		rel = vals[0];
		abs = vals[1];
	}
	const innerStr = `(${rel}% + ${abs}px)`;
	if (dual) return [`calc(${innerStr})`, `calc(-1*${innerStr})`];
	return `calc(${innerStr})`;
};

const withCalc =
	(fn: (...args: any[]) => number | [number, number], dual = false) =>
	(...args: Parameters<typeof fn>) =>
		getCalc(fn(...args), dual);

// Valid CSS of Mathematical Definitions
const calculateRowGap = withCalc(rowGap);
const calculateColGap = withCalc(colGap);

const centreHexYShift = withCalc(centreYOffset, true);
const edgeHexYShift = withCalc(edgeYOffset, true);
const edgeHexXShift = withCalc(edgeXOffset, true);

/*
Defining a debugging background
*/

const offset = (rspacing * K(rspacing / ASPECT_RATIO)) / (2 * ASPECT_RATIO); // * aspect_ratio/aspect_ratio
const Pos_Y = 50 + offset;
// const Neg_y = 50 - (rspacing * K(rspacing)) / ASPECT_RATIO / 2;
const Neg_y = 50 - offset;

// Helpful debugging background
const border_background = `
            linear-gradient(to bottom, red 0%, transparent 4px),
            linear-gradient(to top,  red 0%, transparent 4px),
            linear-gradient(to right, red 0%, transparent 4px),
            linear-gradient(to left, red 0%, transparent 4px)
`;
const bgAxis = `
			${border_background},
			linear-gradient(90deg, transparent calc(50% - 2px), red 50%, transparent calc(50% + 2px)),
			linear-gradient(90deg, transparent calc(25% - 2px), red 25%, transparent calc(25% + 2px)),
			linear-gradient(90deg, transparent calc(75% - 2px), red 75%, transparent calc(75% + 2px)),
		    linear-gradient(150deg, transparent calc(50% - 2px), red 50%, transparent calc(50% + 2px)),
		    linear-gradient(30deg, transparent calc(50% - 2px), red 50%, transparent calc(50% + 2px)),
			linear-gradient(0deg, transparent calc(${Neg_y}% - 2px), red ${Neg_y}%, transparent calc(${Neg_y}% + 2px)),
			linear-gradient(0deg, transparent calc(${Pos_Y}% - 2px), red ${Pos_Y}%, transparent calc(${Pos_Y}% + 2px)),
			linear-gradient(0deg, transparent calc(50% - 2px), red 50%, transparent calc(50% + 2px))
        `;

export const sideStyle = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0,
	isLeft: boolean = true
): React.CSSProperties => {
	const Xshifts = edgeHexXShift(relative_spacing, absolute_spacing);
	const Yshifts = edgeHexYShift(relative_spacing, absolute_spacing);

	return {
		// background: bgAxis,

		...(isLeft
			? {
					marginLeft: Xshifts[0],

					marginRight: Xshifts[1],
			  }
			: {
					marginRight: Xshifts[0],

					marginLeft: Xshifts[1],
			  }),
		marginTop: Yshifts[0],
		marginBottom: Yshifts[1],
	};
};

export const midStyle = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): React.CSSProperties => {
	const Yshifts = centreHexYShift(relative_spacing, absolute_spacing);

	return {
		// background: bgAxis,

		marginTop: Yshifts[0],
		marginBottom: Yshifts[1],
	};
};

/**
 * Grid container: grid-template-columns: repeat(3, 1fr).
 *
 * Each item spans 1/3 container width → explains /3 in gap formulas.
 */
export const container = (
	_relative_spacing: number = 0,
	absolute_spacing: number = 0,
	length: number = 1
): React.CSSProperties => {
	const col_rel_spacing = _relative_spacing * CONTAINER_per_Element;
	const row_rel_spacing = _relative_spacing / length;

	return {
		// background: border_background,
		position: "relative",
		margin: `calc(${_relative_spacing / 2}% + ${
			(absolute_spacing > 0 ? absolute_spacing : 0) / 2
		}px)`,
		marginTop: "0px",
		// marginTop: `calc(${_relative_spacing / 4}% + ${
		// 	(absolute_spacing > 0 ? absolute_spacing : 0) / 2
		// }px)`,

		// These two are equivalent but allow for negative absolute spacing
		gridAutoRows: `calc(${
			100 + _relative_spacing
		}% / ${length} + ${absolute_spacing}px)`,

		// rowGap: calculateRowGap(
		// 	row_rel_spacing,
		// 	absolute_spacing,
		// 	length
		// ) as string,

		columnGap: calculateColGap(col_rel_spacing, absolute_spacing) as string,
		display: "grid",
		// gridTemplateColumns: `repeat(${n}, ${1/3})`,
		gridTemplateColumns: `repeat(${n}, 1fr)`,

		overflow: "visible",
	};
};
