import React from "react";

const vertSF = Math.sqrt(3) / 2;
// const vertSF = 2 / Math.sqrt(3);

// const bgAxis = `
// 		    linear-gradient(150deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
// 		    linear-gradient(30deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
//             linear-gradient(to bottom, red 0%, transparent 1%),
//             linear-gradient(to top,  red 0%, transparent 1%),
//             linear-gradient(to right, red 0%, transparent 1%),
//             linear-gradient(to left, red 0%, transparent 1%)
//         `;
const bgAxis = `
		    linear-gradient(150deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
		    linear-gradient(30deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px))        `;
// const bgAxis = `
// 		    linear-gradient(150deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
// 		    linear-gradient(30deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
//         `;
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
		// 			marginLeft: `${25 + relative_spacing / vertSF}%`,
		// 			marginRight: `-${25 + relative_spacing / vertSF}%`,
		// 	  }
		// 	: {
		// 			marginRight: `${25 + relative_spacing / vertSF}%`,
		// 			marginLeft: `-${25 + relative_spacing / vertSF}%`,
		// 	  }),

		// ...(isLeft
		// 	? {
		// 			marginLeft: `calc((25% + ((3*${relative_spacing}*1%)) / ${vertSF})`,
		// 			marginRight: `calc((25% + ((3*${relative_spacing}*1%)) / ${-vertSF})`,
		// 	  }
		// 	: {
		// 			marginRight: `calc((25% + ((3*${relative_spacing}*1%)) / ${vertSF})`,
		// 			marginLeft: `calc((25% + ((3*${relative_spacing}*1%)) / ${-vertSF})`,
		// 	  }),

		...(isLeft
			? {
					marginLeft: `calc((25% + (${relative_spacing * 1}*1%))*1)`,
					marginRight: `calc((25% + (${
						relative_spacing * 1
					}*1%))*-1)`,
			  }
			: {
					marginRight: `calc((25% + (${relative_spacing * 1}*1%))*1)`,
					marginLeft: `calc((25% + (${relative_spacing * 1}*1%))*-1)`,
			  }),
		// ...(isLeft
		// 	? {
		// 			marginLeft: `${25}%`,
		// 			marginRight: `-${25}%`,
		// 	  }
		// 	: {
		// 			marginRight: `${25}%`,
		// 			marginLeft: `-${25}%`,
		// 	  }),
	};
};
const _relative_spacing = 10;
export const midStyle = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): React.CSSProperties => {
	return {
		background: bgAxis,

		marginTop: ` calc(((50% * ${vertSF}) + ((3*${
			relative_spacing / 2
		}*1%))) * ${1})`,

		marginBottom: `calc(((50% * ${vertSF}) + ((3*${
			relative_spacing / 2
		}*1%))) * ${-1})`,

		// marginTop: `${(50 + _relative_spacing) * vertSF}%`,
		// marginBottom: `-${(50 + _relative_spacing) * vertSF}%`,
		// paddingLeft: `-${relative_spacing}%`,
		// paddingRight: `-${relative_spacing}%`,
	};
};

export const container = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): React.CSSProperties => {
	return {
		position: "relative",

		// columnGap: `${relative_spacing * 2 * vertSF}%`,
		columnGap: `${relative_spacing}%`,

		// columnGap: `${relative_spacing * vertSF}%`,
		// columnGap: `${relative_spacing * vertSF}%`,

		// rowGap: `${relative_spacing * vertSF}%`,
		rowGap: `${relative_spacing / vertSF}%`,

		display: "grid",

		// gridTemplateColumns: `repeat(3, 30%)`,
		gridTemplateColumns: `repeat(3, 1fr)`,

		// overflow: "visible",
	};
};
