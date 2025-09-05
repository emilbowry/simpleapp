import React from "react";

const vertSF = Math.sqrt(3) / 2;
const CONVERSION_FACTOR = 1 / 3;

const _rspace = 50 + 10 / 2;
const _urspace = 50 - 10 / 2;

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
			linear-gradient(0deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),


		    linear-gradient(150deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
		    linear-gradient(30deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),


			linear-gradient(0deg, transparent calc(${_urspace}% - 1px), red ${_urspace}%, transparent calc(${_urspace}% + 1px)),
			linear-gradient(0deg, transparent calc(${_rspace}% - 1px), red ${_rspace}%, transparent calc(${_rspace}% + 1px))


        `;

const widthToSL = 1 / 2;
const heightToWidth = vertSF;
const containerToCompact = 5 / 6;
const compactToElement = 4 / 5;
const elementFromContainerWidth = (relative_spacing: number) => {
	const TotalSpacing = 2 * relative_spacing;
	return 5 / 6 / vertSF;
};

const TEST_COL_GAP = 10;
const aspect_ratio = 2 / Math.sqrt(3);
const ELEMENT_per_CONTAINER = 1 / 3;
const calculateRowGap = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	const verticalSpacing = relative_spacing * ELEMENT_per_CONTAINER;
	const innerStr = `(${verticalSpacing}%)`;
	return `calc(${innerStr})`;

	return 0; //debugging return
};

const calculateColGap = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	const horizontal_gap_ratio = 1 / aspect_ratio;
	const horizontal_spacing =
		relative_spacing * horizontal_gap_ratio * ELEMENT_per_CONTAINER;
	const innerStr = `(${horizontal_spacing}%)`;
	return `calc(${innerStr})`;
	//debugging returns
	// return 0;
};

const edgeHexXShift = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	const container_shift_percent = 25;
	const innerStr = `(${container_shift_percent}%)`; // Side Shift by half so flush when no gap
	const upshift =
		(relative_spacing * (100 - 2 * relative_spacing)) / (3 * aspect_ratio);
	return [`calc(${innerStr})`, `calc(-1*${innerStr})`];
};
const edgeHexYShift = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	// const upshift =
	// 	(relative_spacing * (100 - 2 * relative_spacing)) / (3 * aspect_ratio);

	// const innerStr = `(${upshift}%)`; // Item defined by container edges
	return [0, 0]; //debugging return

	// return [`calc(${innerStr})`, `calc(-1*${innerStr})`];
};
const vertShifts = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
) => {
	const container_shift_percent = (50 * 1) / aspect_ratio; // Downshift by half so flush when no gap
	const innerStr = `(${container_shift_percent}% + ${TEST_COL_GAP / 6}%)`;

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
	const shifts = vertShifts(relative_spacing, absolute_spacing);

	return {
		background: bgAxis,
		marginTop: shifts[0],
		marginBottom: shifts[1],
	};
};

export const container = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): React.CSSProperties => {
	return {
		background: border_background,

		position: "relative",

		rowGap: calculateRowGap(TEST_COL_GAP, absolute_spacing),

		columnGap: calculateColGap(TEST_COL_GAP, absolute_spacing),
		display: "grid",
		gridTemplateColumns: `repeat(3, 1fr)`,
		overflow: "visible",
	};
};
