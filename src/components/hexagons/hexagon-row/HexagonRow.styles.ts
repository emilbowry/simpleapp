// src/components/hexagons/hexagonRow/HexagonRow.styles.ts

/**
	@improvement 
	- Generalise for n >3
	- integrate pointed top (VHex) hexagon logic into centralised styling system

 */
import React from "react";

import { ValidComponent } from "../../../utils/reactUtils";
import {
	ASPECT_RATIO,
	CONTAINER_per_Element,
	n,
	RELATIVE_SPACING,
	SIDE_SHIFT,
} from "./HexagonRow.consts";
import {
	IScaleParams,
	TDualScalingFunction,
	TScalingFunction,
	TWithCalc,
} from "./HexagonRow.types";
import { debug_background } from "./_debugstylesbackground";
/* 	 Makes sense since devolves into an equilateral triangle problem
	== 1/cos(30) */
const colGap: TScalingFunction = ({ relative_spacing = 0 }) =>
	relative_spacing * ASPECT_RATIO;

/*
 **IMPORTANT**:row-gap is CANNONICALLY DEFINED in terms of item **width**
 */
const rowGap: TDualScalingFunction = ({
	relative_spacing = 0,
	absolute_spacing = 0,
}) => [relative_spacing, absolute_spacing];

/** 
	* SCALING CORRECTION FACTOR: k
	* @derivation 
		k(relative_space) scales, transformed % into % of orignal element (container/n)
		g:= col-gap
		Derivation:W.n = W'.n +(n-1).g
		g = Wx/100
			W. (n-(n-1).(x/100))/n = W'
		let W=kW'
		k = n/(n-(n-1).(x/100))
 */
const K: TScalingFunction = (scale_params) =>
	n / (n - (n - 1) * (colGap(scale_params) / 100));
/*
SCALING CORRECTION FACTOR RESULTS
*/
const delta_W: TScalingFunction = (scale_params) => K(scale_params) - 1;
/* Mathematical Definitons */
const centerVertTranslation: TScalingFunction = () => 50 / ASPECT_RATIO;

/* Since it is relative to width **already** by definition no need for kappa scaling */

const gapMidpointTranslation: TScalingFunction = ({ relative_spacing = 0 }) =>
	relative_spacing / ASPECT_RATIO / 2;

/*
 **IMPORTANT**:	- CANNONICALLY DEFINED in terms of item **width**
 */
const centreYOffset: TDualScalingFunction = (
	scale_params,
	hasTopOffset: boolean = true
): [number, number] => {
	const sign = hasTopOffset ? -1 : 1;
	return [
		sign *
			(centerVertTranslation(scale_params) +
				gapMidpointTranslation(scale_params)),
		(sign * scale_params.absolute_spacing) / 2,
	];
};
const edgeYOffset: TScalingFunction = () => 0;
/* Since column-gap is our cannonical inner translation we need to maintain the absolute shift */

const overlapTranslation: TScalingFunction = (scale_params) =>
	SIDE_SHIFT * K(scale_params) * 1;
/* overlapTranslation would shift the sclaed hexagon correctly if the centered at the same point */

const PositionCorrectionFactor: TScalingFunction = (scale_params) =>
	+delta_W(scale_params) / 2;

const XScaleCorrectionFactor: TScalingFunction = (scale_params) =>
	(K(scale_params) * scale_params.relative_spacing) / 4;
const edgeXOffset: TDualScalingFunction = (scale_params) => [
	overlapTranslation(scale_params) +
		PositionCorrectionFactor(scale_params) +
		XScaleCorrectionFactor(scale_params),
	-scale_params.absolute_spacing * ASPECT_RATIO,
];

/* Util Functions */
const getCalc = (
	vals: ReturnType<TScalingFunction | TDualScalingFunction>,
	dual: boolean = false
) => {
	const [rel, abs] = ([] as number[]).concat(vals, 0);
	const innerStr = `(${rel}% + ${abs}px)`;
	return dual
		? [`calc(${innerStr})`, `calc(-1*${innerStr})`]
		: `calc(${innerStr})`;
};

const withCalc: TWithCalc = (fn, dual) => {
	return (...args) => {
		return getCalc(fn(...(args as [any])), dual) as any;
	};
};

const calculateColGap = withCalc(colGap, false);

const centreHexYShift = withCalc(centreYOffset, true);

const edgeHexYShift = withCalc(edgeYOffset, true);
const edgeHexXShift = withCalc(edgeXOffset, true);

const sideStyle = (
	scale_params: IScaleParams,
	isLeft: boolean = true
): React.CSSProperties => {
	const Xshifts = edgeHexXShift(scale_params);
	const Yshifts = edgeHexYShift(scale_params);
	return {
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
const midStyle = (scale_params: IScaleParams): React.CSSProperties => {
	const Yshifts = centreHexYShift(scale_params);
	return {
		// background: "rgb(0,0,255,0.1)",
		// border: "1px solid black",
		marginTop: Yshifts[0],
		marginBottom: `calc(${Yshifts[1]})`,
		// height: `calc(calc(${Yshifts[1]}) )`,
	};
};

/**
 * Grid container: grid-template-columns: repeat(3, 1fr).
 *
 * Each item spans 1/3 container width → explains /3 in gap formulas.

 * @equivalent The GridAutoRows is essentially equivalent to:
	
		const row_rel_spacing = _relative_spacing / length;
			...
		rowGap: calculateRowGap(
			row_rel_spacing,
			absolute_spacing,
			length
		) as string

 * But it is now defined for "negative"/overlapping rows

	Later work out why this doesnt work for templateCols
	gridTemplateColumns: `repeat(${n}, ${1/3})`,

 */

const background_override = (
	scale_params: IScaleParams,
	useDebugBackground = false
) => (useDebugBackground ? debug_background(scale_params) : {});
const vertGap = (
	scale_params: IScaleParams,
	length: number = 1,
	useRowGap = false
): React.CSSProperties => {
	return useRowGap
		? { rowGap: calculateRowGap(scale_params) }
		: { gridAutoRows: calculateRowHeight(scale_params, length) };
};
const rowHeight: TDualScalingFunction = (scale_params, length: number) => [
	100 / length + scale_params.relative_spacing,
	scale_params.absolute_spacing,
];
const calculateRowHeight = withCalc(rowHeight, false);
const calculateRowGap = withCalc(rowGap, false);

const container = (
	_relative_spacing: number = 0,
	absolute_spacing: number = 0,
	length: number = 1,
	useRowGap = false,
	useDebugBackground = false
): React.CSSProperties => {
	const col_rel_spacing = _relative_spacing * CONTAINER_per_Element;
	const row_rel_spacing = _relative_spacing / length;
	const k = K({
		relative_spacing: _relative_spacing,
		absolute_spacing,
	});
	const Yshifts = centreHexYShift({
		relative_spacing: row_rel_spacing,
		absolute_spacing,
	})[1];
	// console.log(k);
	// console.log(50 / ASPECT_RATIO / 3);
	// console.log(k * (100 / length));
	// console.log(Yshifts);

	return {
		// border: "1px red solid",
		// background: "rgb(255,0,0,0.5)",
		...background_override(
			{
				relative_spacing: row_rel_spacing,
				absolute_spacing,
			},
			useDebugBackground
		),
		...vertGap(
			{
				relative_spacing: row_rel_spacing,
				absolute_spacing,
			},
			length,
			useRowGap
		),
		position: "relative",

		columnGap: calculateColGap({
			relative_spacing: col_rel_spacing,
			absolute_spacing,
		}),
		display: "grid",
		gridTemplateColumns: `repeat(${n}, 1fr)`,
		overflow: "visible",
	};
};

const gridPositionCSS = (
	midTop: ValidComponent,
	lBot: ValidComponent,
	rBot: ValidComponent,

	length: number,
	relative_spacing: number,
	absolute_spacing: number
) => {
	const k = K({ relative_spacing, absolute_spacing });
	const base_row_height = ((3 / 2) * (1 / ASPECT_RATIO) * 100) / 3;

	const relative_correction =
		(base_row_height * (1 / 3) * (relative_spacing / 100)) / k;
	const rel_padding_bottom_offset = lBot === null && rBot === null ? 2 : 1;
	const rel_padding_top_factor = midTop === null ? 0 : 2;
	const abs_padding_bottom_offset = lBot === null && rBot === null ? 1.5 : 1;
	const abs_padding_top_factor = midTop === null ? 0 : 0.5;

	return {
		paddingTop: `calc(${rel_padding_top_factor * relative_correction}% + ${
			absolute_spacing * abs_padding_top_factor
		}px)`,

		paddingBottom: `calc(${
			(length - rel_padding_bottom_offset) * 2 * relative_correction
		}% + ${absolute_spacing * (length - abs_padding_bottom_offset)}px)`,
	};
};

export { container, gridPositionCSS, K, midStyle, sideStyle };
