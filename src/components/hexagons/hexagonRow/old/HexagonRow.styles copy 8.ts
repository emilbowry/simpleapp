/*
I want to arrange a set of flat-topped regular hexagon items into a honeycomb pattern, 
using CSS grid as the base layout. The goal is to introduce a single control variable, 
relative_spacing, which determines the separation between parallel edges of adjacent 
hexagons. From this variable, I compute row gaps and margin translations so that all 
parallel edges of the hexagons remain equally spaced — i.e. the perpendicular distance 
(the normal) between any two neighboring parallel edges is the same. This keeps the 
tiling visually consistent while allowing the overall spacing of the honeycomb to be 
adjusted smoothly.
*/

import React from "react";

// relative_spacing and hardcoded relative_spacing are defined as % of width of the grid items

const TEST_REL_SPACE = 10;

const _rspace = 50 + TEST_REL_SPACE / 2;
const _urspace = 50 - TEST_REL_SPACE / 2;

// Helpful debugging background
const border_background = `
            linear-gradient(to bottom, red 0%, transparent 1%),
            linear-gradient(to top,  red 0%, transparent 1%),
            linear-gradient(to right, red 0%, transparent 1%),
            linear-gradient(to left, red 0%, transparent 1%)
`;
const bgAxis = `
			${border_background},

			linear-gradient(90deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
			linear-gradient(90deg, transparent calc(25% - 1px), red 25%, transparent calc(25% + 1px)),
			linear-gradient(90deg, transparent calc(75% - 1px), red 75%, transparent calc(75% + 1px)),


		    linear-gradient(150deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
		    linear-gradient(30deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),

			linear-gradient(0deg, transparent calc(${_urspace}% - 1px), red ${_urspace}%, transparent calc(${_urspace}% + 1px)),
			linear-gradient(0deg, transparent calc(${_rspace}% - 1px), red ${_rspace}%, transparent calc(${_rspace}% + 1px)),
			linear-gradient(0deg, transparent calc(50% - 2px), red 50%, transparent calc(50% + 2px))


        `;

// Some constants

const aspect_ratio = 2 / Math.sqrt(3);
const ELEMENT_per_CONTAINER = 1 / 3;
const HORIZONTAL_per_VERTICAL_SPACE = Math.sqrt(3) / 2; // Ratio of Horizontal gap to Vetical Gap

/**
 * Row gap: RowGap(x) = (x / 3)%
 *
 * /3 comes from 3 columns (1/3 container width per item).
 * Row gaps add vertical whitespace only; they do not shrink items.
 */
const calculateRowGap = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	const verticalSpacing = relative_spacing * ELEMENT_per_CONTAINER; // Defined from container width
	const innerStr = `(${verticalSpacing}%)`;
	return `calc(${innerStr})`;
};
/**
 * Column gap: ColGap(x) = (x * h / 3)%
 *
 * /3 from 3 columns; h converts vertical to horizontal spacing.
 * Column gaps reduce available width, so items shrink.
 */

const calculateColGap = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	const horizontal_spacing =
		relative_spacing *
		HORIZONTAL_per_VERTICAL_SPACE *
		ELEMENT_per_CONTAINER;
	const innerStr = `(${horizontal_spacing}%)`;
	return `calc(${innerStr})`;
};

/**
 * Horizontal correction C_horiz(x).
 *
 * Formula: C_horiz(x) = 1 / (1 - ((1 - ELEMENT_per_CONTAINER) * x * h) / 100)
 *
 * (1 - ELEMENT_per_CONTAINER) accounts for gaps in an n-column grid.
 * Corrects item shrinkage from column gaps so 30° hex edges stay aligned.
 */

const horizontal_scale_correction = (relative_spacing: number = 0) => {
	const horizontal_sf = HORIZONTAL_per_VERTICAL_SPACE * ELEMENT_per_CONTAINER;
	return (
		1 /
		(1 -
			((1 - ELEMENT_per_CONTAINER) * relative_spacing * horizontal_sf) /
				100)
	);
};

/**
 * Vertical correction C_vert(x).
 *
 * Formula: C_vert(x) = (r / (2 * 100 * ELEMENT_per_CONTAINER)) * C_horiz(x)
 *
 * Division by (2 * ELEMENT_per_CONTAINER) comes from the half-height
 * stagger of honeycomb tiling. Ensures margin-top shifts keep
 * parallel hex edges equally spaced under scaling.
 */

const vertical_scale_correction = (relative_spacing: number = 0) => {
	return (
		(aspect_ratio / (2 * 100 * ELEMENT_per_CONTAINER)) *
		horizontal_scale_correction(relative_spacing)
	);
};
/**
 * Horizontal shift of edge hexes for honeycomb tiling.
 *
 * Base = 25% of item width (aligns edge hex centres for hex packing).
 * Multiply by C_horiz(x) so 30° diagonals remain collinear when gaps shrink items.
 */

const edgeHexXShift = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	const container_shift_percent =
		25 * horizontal_scale_correction(relative_spacing); // In shift by 25%
	const innerStr = `(${container_shift_percent}%)`;
	return [`calc(${innerStr})`, `calc(-1*${innerStr})`];
};
const edgeHexYShift = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	return [0, 0]; //NO-OP
};

/**
 * Vertical stagger of centre hex for honeycomb tiling.
 *
 * Base = (50 / r)% = half a hex height drop, scaled by (1 / C_horiz(x)).
 * Extra correction = (x / 2) * C_horiz(x) * C_vert(x) keeps parallel edges equally spaced.
 */
const centreHexYShift = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	const container_shift_percent =
		(50 / aspect_ratio) * // Downshift by 50% of **height* hence incl aspect ratio
		(1 / horizontal_scale_correction(relative_spacing));

	const centering_correction =
		(relative_spacing / 2) * vertical_scale_correction(relative_spacing);
	console.log(centering_correction);
	const innerStr = `(${container_shift_percent}% + ${centering_correction}%)`;

	return [`calc(${innerStr})`, `calc(-1*${innerStr})`];
};

export const sideStyle = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0,
	isLeft: boolean = true
): React.CSSProperties => {
	const Xshifts = edgeHexXShift(relative_spacing, absolute_spacing);
	const Yshifts = edgeHexYShift(relative_spacing, absolute_spacing);

	return {
		background: bgAxis,

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
	const Xshifts = centreHexYShift(relative_spacing, absolute_spacing);

	return {
		background: bgAxis,
		marginTop: Xshifts[0],
		marginBottom: Xshifts[1],
	};
};

/**
 * Grid container: grid-template-columns: repeat(3, 1fr).
 *
 * Each item spans 1/3 container width → explains /3 in gap formulas.
 */
export const container = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): React.CSSProperties => {
	return {
		background: border_background,

		position: "relative",

		rowGap: calculateRowGap(relative_spacing, absolute_spacing),

		columnGap: calculateColGap(relative_spacing, absolute_spacing),
		display: "grid",
		gridTemplateColumns: `repeat(3, 1fr)`,
		overflow: "visible",
	};
};

/*  
	=======================
    ===  EXAMPLE USAGE  ===
    =======================

export const rspacing = 10;

const aspace = 0;
export class HexagonRow extends React.Component<IHexagonRowElements> {
	render() {
		const { elements, len = 1 } = this.props;

		return (
			<>
				<div style={sideStyle(rspacing, aspace, true)}>
					{formatComponent(elements[0], true)}
				</div>
				<div style={midStyle(rspacing, aspace)}>
					{formatComponent(elements[1], true)}
				</div>
				<div style={sideStyle(rspacing, aspace, false)}>
					{formatComponent(elements[2], true)}
				</div>
			</>
		);
	}
}
export class HexagonGrid extends React.Component<IHexagonGridElements> {
	render() {
		const { rows } = this.props;
		const l = rows.length;
		return (
			<div style={container(rspacing, aspace)}>
				{rows.map((row, _index) => (
					<HexagonRow
						elements={row.elements}
						len={l}
					/>
				))}
			</div>
		);
	}
}
*/
