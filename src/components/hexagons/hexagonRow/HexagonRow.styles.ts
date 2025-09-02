// src/components/hexagons/hexagonRow/HexagonRow.styles.ts

import React from "react";

const vertSF = Math.sqrt(3) / 2;
// const vertSF = 2 / Math.sqrt(3);
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
	return {
		background: bgAxis,

		...(isLeft
			? {
					marginLeft: `${25}%`,
					marginRight: `-${25}%`,
			  }
			: {
					marginRight: `${25}%`,
					marginLeft: `-${25}%`,
			  }),
		// marginBottom: `${25 * vertSF}%`,
		// marginTop: `${relative_spacing * vertSF}%`,
		// marginBottom: `-${relative_spacing * vertSF}%`,
		// ...(isLeft
		// 	? { paddingRight: `${absolute_spacing}px` }
		// 	: { paddingLeft: `${absolute_spacing}px` }),
		// marginTop: `${relative_spacing * vertSF}%`,
		// paddingTop: `${absolute_spacing * vertSF}px`,
	};
};
export const midStyle = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): React.CSSProperties => {
	return {
		background: bgAxis,

		// marginTop: `${50 * vertSF}%`,
		// marginBottom: `-${50 * vertSF}%`,
		marginTop: `${(50 + relative_spacing / vertSF) * vertSF}%`,
		marginBottom: `-${(50 + relative_spacing / vertSF) * vertSF}%`,
		// marginTop: `${50 * vertSF + relative_spacing}%`,
		// marginBottom: `-${50 * vertSF + relative_spacing}%`,
		// marginTop: `${(50 + relative_spacing / 2) * vertSF}%`,
		// marginBottom: `-${(50 + relative_spacing / 2) * vertSF}%`,

		// marginBottom: `-${(50 + relative_spacing * 2) * vertSF}%`,
		// marginBottom: `-${(50 - relative_spacing) * vertSF}%`,
		// marginLeft: `-${relative_spacing / 2}%`,
		// marginRight: `-${relative_spacing / 2}%`,
		// paddingTop: `${absolute_spacing * vertSF}px`,
		// paddingLeft: `${absolute_spacing / 2}px`,
		// paddingRight: `${absolute_spacing / 2}px`,
	};
};

export const container = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): React.CSSProperties => {
	return {
		position: "relative",
		// columnGap: `${relative_spacing / 2.19}%`,
		columnGap: `${relative_spacing / 2}%`,
		rowGap: `${(relative_spacing * 3) / 4}%`,
		// rowGap: `${relative_spacing / 1.6}%`,

		// rowGap: `${relative_spacing * vertSF * 2}%`,

		display: "grid",
		// gridTemplateColumns: `repeat(3, minmax(0, 1fr))`,
		gridTemplateColumns: `repeat(3, 30%)`,
		overflow: "visible",
		// margin: "0 auto",
		// width: "100%",
		// paddingBottom: `${1.5 * relative_spacing}%`,
		// marginBottom: `${10 * absolute_spacing}px`,
	};
};
