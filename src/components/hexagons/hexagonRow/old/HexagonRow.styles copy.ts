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
// const bgAxis = `
// 		    linear-gradient(150deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
// 		    linear-gradient(30deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px))        `;
// const bgAxis = `
// 		    linear-gradient(150deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
// 		    linear-gradient(30deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
//         `;
const rs = 1.05;

export const sideStyle = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0,
	isLeft: boolean = true
): React.CSSProperties => {
	let _relative_spacing = 0;
	return {
		background: bgAxis,
		// ...(isLeft
		// 	? {
		// 			marginLeft: `${25 - relative_spacing * vertSF}%`,
		// 			marginRight: `-${25 - relative_spacing * vertSF}%`,
		// 	  }
		// 	: {
		// 			marginRight: `${25 - relative_spacing * vertSF}%`,
		// 			marginLeft: `-${25 - relative_spacing * vertSF}%`,
		// 	  }),
		...(isLeft
			? {
					translate: `${-25 + relative_spacing * 0}%`,
					// marginLeft: `${25 + relative_spacing * 0}%`,
					// marginRight: `-${25 + relative_spacing * 0}%`,
			  }
			: {
					translate: `${25 + relative_spacing * 0}%`,

					// marginRight: `${25 + relative_spacing * 0}%`,
					// marginLeft: `-${25 + relative_spacing * 0}%`,
			  }),
		// marginTop: `calc((${50 * 0}%) - ${2 * vertSF}%)`,
		// marginBottom: `calc((${50 * 0}%) + ${2 * vertSF}%)`,
		// marginTop: `${50 * 0 + relative_spacing * 2}%`,
		// marginBottom: `${50 * 0 + relative_spacing * 2}%`,

		// padding: `-76% 0% 26% 0%`,
		// margin: "5% 0% 5 /% 0%",
		// paddingTop: `-${relative_spacing * 2}%`,
		// margin: "50% 0% -50% 0%",
	};
};
const _relative_spacing = 10;
export const midStyle = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): React.CSSProperties => {
	return {
		background: bgAxis,
		// margin: "-50% 0% -50% 0%",
		// marginTop: `calc(${2 * vertSF}%)`,
		// marginBottom: `calc(${2 * -vertSF}%)`,
		// paddingTop: `calc(${2}%)`,
		// padding: `-54% 0% -54% 0%`,
		// left: "1%",
		// marginRight: `-${50}%`,
		// marginLeft: `${50}%`,
		// marginTop: `calc((${50 * vertSF}%) + ${relative_spacing}%)`,
		// // paddingTop: ` ${relative_spacing}%)`,
		// marginTop: `${50 * vertSF + relative_spacing * 2}%`,
		// marginBottom: `-${50 * vertSF + relative_spacing * 2}%`,
		translate: `0 ${50 * vertSF + relative_spacing / vertSF}%`,

		// marginBottom: `-${50 * vertSF + 0}%`,

		// marginBottom: `-${50 * vertSF}%)`,

		// marginBottom: `calc(((${50 * vertSF}%) + ${relative_spacing}%)*-1)`,

		// marginBottom: `calc(-(${50 * vertSF}% - ${relative_spacing / 2}%))`,

		// marginBottom: `calc((-${50 * vertSF}% - ${2 * vertSF}%)`,
		// marginBottom: `calc((-${50 * vertSF}% - ${2 * 0}%)`,
	};
};

export const container = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): React.CSSProperties => {
	return {
		position: "relative",
		flexShrink: 0,
		// columnGap: `${(relative_spacing * 2) / 3}%`,
		// columnGap: `${relative_spacing * 0.23}%`,
		//
		// columnGap: `${10}px`,
		// rowGap: `${10}px`,

		// columnGap: `${relative_spacing * Math.sqrt(3)}%`,
		// columnGap: `${relative_spacing * vertSF}%`,
		// columnGap: `${relative_spacing / vertSF}%`,
		// columnGap: `${relative_spacing}%`,

		// rowGap: `${relative_spacing / 2}%`,

		// rowGap: `${relative_spacing}%`,
		rowGap: `${relative_spacing / vertSF}%`,
		// translate: `0 ${relative_spacing / vertSF}%`,

		// rowGap: `${relative_spacing * vertSF}%`,

		// rowGap: `${1 / vertSF}%`,

		// rowGap: `${relative_spacing * Math.sqrt(3)}%`,

		display: "grid",

		gridTemplateColumns: `repeat(3, 30%)`,
		// gridTemplateColumns: `repeat(3, 1fr)`,

		overflow: "visible",
	};
};
