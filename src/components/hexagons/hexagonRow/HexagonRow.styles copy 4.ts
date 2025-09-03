import React from "react";

const vertSF = Math.sqrt(3) / 2;
const CONVERSION_FACTOR = 1 / 3;

const _rspace = 50 + 30 / 2;
const _urspace = 50 - 30 / 2;
const ab = 100 / 2;
const bgAxis = `
			linear-gradient(150deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
			linear-gradient(30deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
			linear-gradient(to bottom, red 0%, transparent 1%),
			linear-gradient(to top,  red 0%, transparent 1%),
			linear-gradient(to right, red 0%, transparent 1%),
			linear-gradient(to left, red 0%, transparent 1%),
			linear-gradient(90deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
			linear-gradient(0deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
			linear-gradient(0deg, transparent calc(50% + ${ab}px - 1px), red calc(50% + ${ab}px), transparent calc(50% + ${ab}px + 1px)),
			linear-gradient(0deg, transparent calc(50% + ${-ab}px - 1px), red calc(50% + ${-ab}px), transparent calc(50% + ${-ab}px + 1px))

		`;

export const sideStyle = (
	relative_spacing: number = 10,
	absolute_spacing: number = 0,
	isLeft: boolean = true
): React.CSSProperties => {
	const horizontal_spacing = 25 - relative_spacing / 2;

	return {
		background: bgAxis,

		...(isLeft
			? {
					marginLeft: `calc(${horizontal_spacing}% - ${
						absolute_spacing * vertSF
					}px)`,

					marginRight: `calc(-1*(${horizontal_spacing}% - ${
						absolute_spacing * vertSF
					}px))`,
			  }
			: {
					marginRight: `calc(${horizontal_spacing}% - ${
						absolute_spacing * vertSF
					}px)`,

					marginLeft: `calc(-1*(${horizontal_spacing}% - ${
						absolute_spacing * vertSF
					}px))`,
			  }),
	};
};
export const midStyle = (
	relative_spacing: number = 10,
	absolute_spacing: number = 0
): React.CSSProperties => {
	const vsf = vertSF * (1 + relative_spacing / 100);

	return {
		background: bgAxis,

		...(absolute_spacing >= 0
			? {
					marginTop: `calc(${50 * vsf}%  + ${
						absolute_spacing / 2
					}px)`,
					marginBottom: `calc(-1*(${50 * vsf}%  + ${
						absolute_spacing / 2
					}px))`,
			  }
			: {
					marginTop: `calc(${50 * vsf}%  + ${
						absolute_spacing / 2
					}px)`,
					marginBottom: `calc(-1*(${50 * vsf}%  + ${
						absolute_spacing / 2
					}px))`,
			  }),
	};
};

export const container = (
	relative_spacing: number = 10,
	absolute_spacing: number = 0,
	length: number = 1
): React.CSSProperties => {
	const vertical_gap = relative_spacing * CONVERSION_FACTOR;
	const horizontal_gap = relative_spacing * CONVERSION_FACTOR * 0.25;

	const n = `calc((100%  / ${length}) + ${vertical_gap}% + ${absolute_spacing}px)`;

	return {
		position: "relative",

		...(absolute_spacing >= 0
			? {
					rowGap: `calc(${vertical_gap}% + ${absolute_spacing}px)`,
			  }
			: {
					gridAutoRows: n,
			  }),
		columnGap: `${horizontal_gap}%`,
		display: "grid",
		gridTemplateColumns: `repeat(3, 1fr)`,
		overflow: "visible",
	};
};
