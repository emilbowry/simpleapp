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
            linear-gradient(to bottom, red 0%, transparent 2px),
            linear-gradient(to top,  red 0%, transparent 2px),
            linear-gradient(to right, red 0%, transparent 2px),
            linear-gradient(to left, red 0%, transparent 2px)
`;
// const bgAxis = `
// 			${border_background},
// 			linear-gradient(90deg, transparent calc(50% - 2px), red 50%, transparent calc(50% + 2px)),
// 			linear-gradient(90deg, transparent calc(25% - 2px), red 25%, transparent calc(25% + 2px)),
// 			linear-gradient(90deg, transparent calc(75% - 2px), red 75%, transparent calc(75% + 2px)),
// 		    linear-gradient(150deg, transparent calc(50% - 2px), red 50%, transparent calc(50% + 2px)),
// 		    linear-gradient(30deg, transparent calc(50% - 2px), red 50%, transparent calc(50% + 2px)),
// 			linear-gradient(0deg, transparent calc(${_urspace}% - 2px), red ${_urspace}%, transparent calc(${_urspace}% + 2px)),
// 			linear-gradient(0deg, transparent calc(${_rspace}% - 2px), red ${_rspace}%, transparent calc(${_rspace}% + 2px)),
// 			linear-gradient(0deg, transparent calc(50% - 2px), red 50%, transparent calc(50% + 2px))

//         `;
const bgAxis = `
			${border_background}


        `;
// Some constants

const aspect_ratio = 2 / Math.sqrt(3);
const CONTAINER_per_Element = 1 / 3;
const HORIZONTAL_per_VERTICAL_SPACE = Math.sqrt(3) / 2; // Ratio of Horizontal gap to Vetical Gap

// Util Function

const getCalc = (value: number, dual = false) => {
	const innerStr = `(${value}%)`;
	if (dual) return [`calc(${innerStr})`, `calc(-1*${innerStr})`];
	return `calc(${innerStr})`;
};
// Gap Definitions

const calculateRowGap = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	// Compromise, to actually define row gap using an addition delta_H so the non linearities resolve
	const verticalSpacing = relative_spacing / aspect_ratio;
	const shrink_compensation = -2 * delta_H(relative_spacing);
	return `calc(${
		relative_spacing / aspect_ratio + delta_H(relative_spacing)
	}%)`;
	// return getCalc(2 * (verticalSpacing + shrink_compensation)); // doubling seems odd cant derive it
};

const calculateColGap = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	const horizontal_spacing = relative_spacing;
	return getCalc(horizontal_spacing);
};

// Correction Factors

const column_gap_correction_factor = (relative_spacing: number = 0) => {
	// x:=relative_spacing/100
	// L:container_width
	// W:= original_width
	// W_prime:= current_width

	// Wx=GAP
	//
	// W=L/n
	// W_prime*n = L -(n-1)*Wx/100
	// W_prime*n = Wn  -(n-1)*Wx/100

	// W_prime*n = W(n  -(n-1)x/100)
	// W = W_prime *n/(n  -(n-1)x/100)

	const n = 1 / CONTAINER_per_Element;
	const k = n / (n - (n - 1) * (relative_spacing / 100));

	return k;
};

const delta_W = (relative_spacing: number = 0) => {
	// return `(100% * ${(column_gap_correction_factor(relative_spacing) - 1)/aspect_ratio})`;
	return column_gap_correction_factor(relative_spacing) - 1;
};

const delta_H = (relative_spacing: number = 0) => {
	// return `(100% * ${(column_gap_correction_factor(relative_spacing) - 1)/aspect_ratio})`;
	return delta_W(relative_spacing) / aspect_ratio;
};

const edgeHexXShift = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	const SIDE_SHIFT = 25; // Ensures "translation" in by 1/4 for honeycomb
	const horizontal_shift = SIDE_SHIFT; //* column_gap_correction_factor(relative_spacing); //* column_gap_correction_factor(relative_spacing);
	const scaling_compensation = delta_W(relative_spacing); // Compensates for decreased width, unsure if necessary so == 0
	const total = SIDE_SHIFT * (1 + 2 * scaling_compensation);
	return [0, 0]; //NO-OP

	return getCalc(total, true);
};

const edgeHexYShift = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	return [0, 0]; //NO-OP
};

// const centreHexYShift = (
// 	relative_spacing: number = 0,
// 	absolute_spacing: number = 0
// ) => {
// 	const vert_offset = 50 / aspect_ratio; // Ensures "translation" down by half for honeycomb
// 	const container_shift_percent = vert_offset; //* column_gap_correction_factor(relative_spacing);

// 	const centering_correction =
// 		(relative_spacing * column_gap_correction_factor(relative_spacing)) / 2; // Ensure's center of row gap, shift by half row gap

// 	const scaling_compensation = -delta_H(relative_spacing); // Compensates for decreased height
// 	// console.log(column_gap_correction_factor(relative_spacing));
// 	return getCalc(
// 		container_shift_percent + centering_correction + scaling_compensation,
// 		true
// 	);
// };
const centreHexYShift = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	const vert_offset = 50 / aspect_ratio; // Ensures "translation" down by half for honeycomb
	const container_shift_percent = vert_offset; //* column_gap_correction_factor(relative_spacing);

	const centering_correction =
		(relative_spacing * column_gap_correction_factor(relative_spacing)) / 2; // Ensure's center of row gap, shift by half row gap

	const scaling_compensation = -delta_H(relative_spacing); // Compensates for decreased height
	// console.log(column_gap_correction_factor(relative_spacing));
	return [0, 0]; //NO-OP

	return getCalc(vert_offset, true);
	// return getCalc(
	// 	(50 + 2.21 * delta_W(relative_spacing)) / aspect_ratio,
	// 	true
	// );
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

		// ...(isLeft
		// 	? {
		// 			marginLeft: Xshifts[0],

		// 			marginRight: Xshifts[1],
		// 	  }
		// 	: {
		// 			marginRight: Xshifts[0],

		// 			marginLeft: Xshifts[1],
		// 	  }),
		// marginTop: Yshifts[0],
		// marginBottom: Yshifts[1],
	};
};

export const midStyle = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): React.CSSProperties => {
	const Xshifts = centreHexYShift(relative_spacing, absolute_spacing);

	return {
		background: bgAxis,
		// borderTop: `solid transparent`,
		// borderBottom: `${4 / 2}px solid transparent`,

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
	_relative_spacing: number = 0,
	absolute_spacing: number = 0
): React.CSSProperties => {
	const relative_spacing = _relative_spacing * CONTAINER_per_Element;
	return {
		background: border_background,

		position: "relative",
		// columnGap: `3%`,
		rowGap: `calc(${
			relative_spacing / aspect_ratio + delta_H(relative_spacing)
		}%)`,

		// rowGap: calculateRowGap(relative_spacing, absolute_spacing) as string,

		columnGap: calculateColGap(
			relative_spacing,
			absolute_spacing
		) as string,
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
