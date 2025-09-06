import React from "react";

const vertSF = Math.sqrt(3) / 2;
const CONVERSION_FACTOR = 1 / 3;

const _rspace = 50 + 10 / 2;
const _urspace = 50 - 10 / 2;

const bgAxis = `
		    linear-gradient(150deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
		    linear-gradient(30deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
            linear-gradient(to bottom, red 0%, transparent 1%),
            linear-gradient(to top,  red 0%, transparent 1%),
            linear-gradient(to right, red 0%, transparent 1%),
            linear-gradient(to left, red 0%, transparent 1%),
			linear-gradient(90deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
			linear-gradient(0deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
			linear-gradient(0deg, transparent calc(${_urspace}% - 1px), red ${_urspace}%, transparent calc(${_urspace}% + 1px)),
			linear-gradient(0deg, transparent calc(${_rspace}% - 1px), red ${_rspace}%, transparent calc(${_rspace}% + 1px))


        `;
const widthToSL = 1 / 2;
const heightToWidth = vertSF;
const containerToCompact = 5 / 6;
const containerToSideLength = 1 / 3;
``;
const compactToElement = 4 / 5;
const elementFromContainerWidth = (relative_spacing: number) => {
	const TotalSpacing = 2 * relative_spacing;
	return 5 / 6 / vertSF;
};
const calculateRowGap = (
	relative_spacing: number = 10,
	absolute_spacing: number = 0
) => {
	/*
		cannonically take the vertical gap by definition to be the row gap
		height == element height so no conversion needed
	 */
	// const vertical_gap = relative_spacing; // By definition this is the row gap

	// return `calc(${relative_spacing}% + ${absolute_spacing}px)`;
	return `calc(${relative_spacing}%)`;

	return 0; //debugging return
};

const calculateColGap = (
	relative_spacing: number = 10,
	absolute_spacing: number = 0
) => {
	/*
		// for unit shift up, we need a cos(30), aka root(3)/2 horizontal shift
		// applied at the column gap level since this *shift* is universal between all columns
	 */

	// const horizontal_gap = relative_spacing * CONVERSION_FACTOR * 0.25;
	const old_horizontal_gap = relative_spacing * (5 / 6) * vertSF; // CONVERSION_FACTOR is probably incorrect

	// return `calc(${horizontal_gap}%)`;
	return `calc(${old_horizontal_gap}%)`;

	return 0; //debugging return
};

const sideShift = (
	relative_spacing: number = 10,
	absolute_spacing: number = 0
) => {
	const sf = 1 - (2 * relative_spacing) / 100;
	/*
		Scale factor to correct for the scaling when we apply column gapn
	*/
	// const horizontal_spacing = 25 - relative_spacing / 2;
	const innerStr = `(${25 * sf}% - ${absolute_spacing}px)`;
	/*
		25 is probably incorrect, consider the default layout is 6 side lengths across, 
		We need to move each individual element in by 1/4, which supposedly leads to the whole row being 5 side lengths accross,
		**however** by inspection of the result at 0 spacing 25 seems correct
	*/
	return [`calc(${innerStr})`, `calc(-1*${innerStr})`];
	const innerStr2 = `(${25 * sf}%)`;
	return [`calc(${innerStr2})`, `calc(-1*${innerStr2})`];

	return [0, 0]; //debugging return
};

const vertShifts = (
	relative_spacing: number = 10,
	absolute_spacing: number = 0
) => {
	const vertical_spacing_add = (relative_spacing * vertSF) / 2;
	const vsf = vertSF * (1 + relative_spacing / 100);

	const innerStr = `(${50 * vsf + vertical_spacing_add}% + ${
		(absolute_spacing * vertSF) / 2
	}px)`;
	return [`calc(${innerStr})`, `calc(-1*${innerStr})`];

	const innerStr2 = `(${50 * vertSF}%)`;
	// return [`calc(${innerStr2})`, `calc(-1*${innerStr2})`];

	const innerStr3 = `(${50 * vsf + vertical_spacing_add}% `;
	return [`calc(${innerStr3})`, `calc(-1*${innerStr3})`];
	return [0, 0]; //debugging return
};

export const sideStyle = (
	relative_spacing: number = 10,
	absolute_spacing: number = 0,
	isLeft: boolean = true
): React.CSSProperties => {
	const shifts = sideShift(relative_spacing, absolute_spacing);
	return {
		background: bgAxis,
		// ...(isLeft
		// 	? {
		// 			marginLeft: shifts[0],

		// 			marginRight: shifts[1],
		// 	  }
		// 	: {
		// 			marginRight: shifts[0],

		// 			marginLeft: shifts[1],
		// 	  }),
	};
};

export const midStyle = (
	relative_spacing: number = 10,
	absolute_spacing: number = 0
): React.CSSProperties => {
	const shifts = vertShifts(relative_spacing, absolute_spacing);

	return {
		background: bgAxis,
		// marginTop: shifts[0],
		// marginBottom: shifts[1],
	};
};

export const container = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): React.CSSProperties => {
	return {
		position: "relative",

		// rowGap: calculateRowGap(relative_spacing, absolute_spacing),
		columnGap: "10%",

		// columnGap: calculateColGap(relative_spacing, absolute_spacing),
		display: "grid",
		gridTemplateColumns: `repeat(3, 1fr)`,
		overflow: "visible",
	};
};
