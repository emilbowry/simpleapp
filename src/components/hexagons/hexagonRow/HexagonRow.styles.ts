import React from "react";

const vertSF = Math.sqrt(3) / 2;
const CONVERSION_FACTOR = 1 / 3;
const bgAxis = `
		    linear-gradient(150deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
		    linear-gradient(30deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
            linear-gradient(to bottom, red 0%, transparent 1%),
            linear-gradient(to top,  red 0%, transparent 1%),
            linear-gradient(to right, red 0%, transparent 1%),
            linear-gradient(to left, red 0%, transparent 1%)
        `;
export const sideStyle = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0,
	isLeft: boolean = true
): React.CSSProperties => {
	let _relative_spacing = 0;
	const horizontal_spacing_add =
		relative_spacing * vertSF * CONVERSION_FACTOR;
	return {
		background: bgAxis,

		...(isLeft
			? {
					marginLeft: `${25 + horizontal_spacing_add}%`,
					marginRight: `-${25 + horizontal_spacing_add}%`,
			  }
			: {
					marginRight: `${25 + horizontal_spacing_add}%`,
					marginLeft: `-${25 + horizontal_spacing_add}%`,
			  }),
	};
};
export const midStyle = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): React.CSSProperties => {
	// The additional vertical margin must be scaled.
	const vertical_spacing_add = relative_spacing / 2; //* CONVERSION_FACTOR;

	return {
		background: bgAxis,
		marginTop: `${50 * vertSF + vertical_spacing_add}%`,
		marginBottom: `-${50 * vertSF + vertical_spacing_add}%`,
	};
};

export const container = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): React.CSSProperties => {
	// The rowGap should be purely vertical and must also be scaled.
	// The 'vertSF' was geometrically incorrect here.
	const vertical_gap = relative_spacing * CONVERSION_FACTOR;

	return {
		position: "relative",
		rowGap: `${vertical_gap}%`, // Corrected calculation
		display: "grid",
		gridTemplateColumns: `repeat(3, 1fr)`,
		overflow: "visible",
	};
};
