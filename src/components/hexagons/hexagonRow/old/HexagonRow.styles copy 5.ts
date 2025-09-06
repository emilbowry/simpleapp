// // import React from "react";

// // const vertSF = Math.sqrt(3) / 2;
// // const CONVERSION_FACTOR = 1 / 3;

// // const _rspace = 50 + 30 / 2;
// // const _urspace = 50 - 30 / 2;

// // const bgAxis = `
// // 			linear-gradient(150deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
// // 			linear-gradient(30deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
// // 			linear-gradient(to bottom, red 0%, transparent 1%),
// // 			linear-gradient(to top,  red 0%, transparent 1%),
// // 			linear-gradient(to right, red 0%, transparent 1%),
// // 			linear-gradient(to left, red 0%, transparent 1%),
// // 			linear-gradient(90deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
// // 			linear-gradient(0deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
// // 			linear-gradient(0deg, transparent calc(${_urspace}% - 1px), red ${_urspace}%, transparent calc(${_urspace}% + 1px)),
// // 			linear-gradient(0deg, transparent calc(${_rspace}% - 1px), red ${_rspace}%, transparent calc(${_rspace}% + 1px))

// // 		`;

// // export const sideStyle = (
// // 	relative_spacing: number = 10,
// // 	absolute_spacing: number = 0,
// // 	isLeft: boolean = true
// // ): React.CSSProperties => {
// // 	// const hsf = 1 - (2 * relative_spacing) / 100; // 25*sf = hsf
// // 	const horizontal_spacing = 25 - relative_spacing / 2;

// // 	return {
// // 		background: bgAxis,

// // 		...(isLeft
// // 			? {
// // 					// marginLeft: `calc(${horizontal_spacing}%)`,
// // 					marginLeft: `calc(${horizontal_spacing}% - ${
// // 						absolute_spacing * vertSF
// // 					}px)`,

// // 					// marginRight: `calc(-${horizontal_spacing}%)`,
// // 					marginRight: `calc(-1*(${horizontal_spacing}% - ${
// // 						absolute_spacing * vertSF
// // 					}px))`,
// // 			  }
// // 			: {
// // 					// marginRight: `calc(${horizontal_spacing}%)`,
// // 					marginRight: `calc(${horizontal_spacing}% - ${
// // 						absolute_spacing * vertSF
// // 					}px)`,

// // 					// marginLeft: `calc(-${horizontal_spacing}%)`,
// // 					marginLeft: `calc(-1*(${horizontal_spacing}% - ${
// // 						absolute_spacing * vertSF
// // 					}px))`,
// // 			  }),
// // 		// marginTop: `calc(-${absolute_spacing / 2}px)`,
// // 		// marginBottom: `calc(1*(${absolute_spacing / 2}px))`,
// // 	};
// // };
// // export const midStyle = (
// // 	relative_spacing: number = 10,
// // 	absolute_spacing: number = 0
// // ): React.CSSProperties => {
// // 	// const vertical_spacing = 50 + (relative_spacing * vertSF) / 2;

// // 	const vsf = vertSF * (1 + relative_spacing / 100);

// // 	return {
// // 		background: bgAxis,
// // 		marginTop: `calc(${50 * vsf}% + ${absolute_spacing / 2}px)`,
// // 		marginBottom: `calc(-1*(${50 * vsf}%  + ${absolute_spacing / 2}px))`,
// // 		// marginTop: `calc(${50 * vsf}%)`,
// // 		// marginBottom: `calc(-1*(${50 * vsf}% ))`,
// // 	};
// // };

// // export const container = (
// // 	relative_spacing: number = 10,
// // 	absolute_spacing: number = 0
// // ): React.CSSProperties => {
// // 	const vertical_gap = relative_spacing * CONVERSION_FACTOR;
// // 	const horizontal_gap = relative_spacing * CONVERSION_FACTOR * 0.25;
// // 	return {
// // 		position: "relative",
// // 		rowGap: `calc(${vertical_gap} + ${absolute_spacing})%`,
// // 		columnGap: `${horizontal_gap}%`,

// // 		display: "grid",
// // 		gridTemplateColumns: `repeat(3, 1fr)`,
// // 		overflow: "visible",
// // 	};
// // };
// import React from "react";

// const vertSF = Math.sqrt(3) / 2;
// const CONVERSION_FACTOR = 1 / 3;

// const _rspace = 50 + 30 / 2;
// const _urspace = 50 - 30 / 2;
// const ab = 100 / 2;
// const bgAxis = `
// 			linear-gradient(150deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
// 			linear-gradient(30deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
// 			linear-gradient(to bottom, red 0%, transparent 1%),
// 			linear-gradient(to top,  red 0%, transparent 1%),
// 			linear-gradient(to right, red 0%, transparent 1%),
// 			linear-gradient(to left, red 0%, transparent 1%),
// 			linear-gradient(90deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
// 			linear-gradient(0deg, transparent calc(50% - 1px), red 50%, transparent calc(50% + 1px)),
// 			linear-gradient(0deg, transparent calc(50% + ${ab}px - 1px), red calc(50% + ${ab}px), transparent calc(50% + ${ab}px + 1px)),
// 			linear-gradient(0deg, transparent calc(50% + ${-ab}px - 1px), red calc(50% + ${-ab}px), transparent calc(50% + ${-ab}px + 1px))

// 		`;

// // linear-gradient(0deg, transparent calc(${_urspace}% - 1px), red ${_urspace}%, transparent calc(${_urspace}% + 1px)),
// // linear-gradient(0deg, transparent calc(${_rspace}% - 1px), red ${_rspace}%, transparent calc(${_rspace}% + 1px))
// // linear-gradient(0deg, transparent calc(${_rspace}% - 1px), red ${_rspace}%, transparent calc(${_rspace}% + 1px))

// export const sideStyle = (
// 	relative_spacing: number = 10,
// 	absolute_spacing: number = 0,
// 	isLeft: boolean = true
// ): React.CSSProperties => {
// 	const horizontal_spacing = 25 - relative_spacing / 2;
// 	// const hsf = 1 - (2 * relative_spacing) / 100; // 25*sf = hsf
// 	return {
// 		background: bgAxis,

// 		...(isLeft
// 			? {
// 					marginLeft: `calc(${horizontal_spacing}% - ${
// 						absolute_spacing * vertSF
// 					}px)`,

// 					marginRight: `calc(-1*(${horizontal_spacing}% - ${
// 						absolute_spacing * vertSF
// 					}px))`,
// 			  }
// 			: {
// 					marginRight: `calc(${horizontal_spacing}% - ${
// 						absolute_spacing * vertSF
// 					}px)`,

// 					marginLeft: `calc(-1*(${horizontal_spacing}% - ${
// 						absolute_spacing * vertSF
// 					}px))`,
// 			  }),
// 	};
// };
// export const midStyle = (
// 	relative_spacing: number = 10,
// 	absolute_spacing: number = 0
// ): React.CSSProperties => {
// 	// const vertical_spacing = 50 + (relative_spacing * vertSF) / 2;
// 	const vsf = vertSF * (1 + (relative_spacing * vertSF) / 100);

// 	return {
// 		background: bgAxis,

// 		...(absolute_spacing >= 0
// 			? {
// 					marginTop: `calc(${50 * vsf}%  + ${
// 						absolute_spacing / 2
// 					}px)`,
// 					marginBottom: `calc(-1*(${50 * vsf}%  + ${
// 						absolute_spacing / 2
// 					}px))`,
// 			  }
// 			: {
// 					marginTop: `calc(${50 * vsf}%  + ${
// 						absolute_spacing / 2
// 					}px)`,
// 					marginBottom: `calc(-1*(${50 * vsf}%  + ${
// 						absolute_spacing / 2
// 					}px))`,
// 			  }),
// 	};
// };

// export const container = (
// 	relative_spacing: number = 10,
// 	absolute_spacing: number = 0,
// 	length: number = 1
// ): React.CSSProperties => {
// 	const vertical_gap = relative_spacing * CONVERSION_FACTOR;
// 	const horizontal_gap = relative_spacing * CONVERSION_FACTOR * 0.25;
// 	const n = `calc(((100% + ${(vertical_gap * (length - 1)) / 2}%  + ${
// 		absolute_spacing * (length - 1)
// 	}px) / ${length})  )`;
// 	// + (${vertical_gap / 2}% + ${absolute_spacing / 2}px)
// 	return {
// 		position: "relative",
// 		// rowGap: `calc(${vertical_gap}% + ${absolute_spacing}px)`,
// 		...(absolute_spacing >= 0
// 			? {
// 					rowGap: `calc(${vertical_gap}% + ${absolute_spacing}px)`,
// 			  } // effectively height + this value
// 			: {
// 					// gridAutoRows: `calc(100% / ${length})`,
// 					// gridAutoRows: n,
// 					// gridAutoRows: `calc(((100% )/ ${length}) + ${absolute_spacing}px + ${
// 					// 	vertical_gap / 1.92
// 					// }%)`, // 50,-470
// 					// gridAutoRows: `calc(((100% ) / ${length}) + ${absolute_spacing}px + ${vertical_gap}%)`, // 50,-470
// 					// gridAutoRows: `calc((100% / ${length}) - ${absolute_spacing}px - ${vertical_gap}%)`,
// 					// Experimental, can use this to make rows overlap
// 			  }),
// 		columnGap: `calc(${horizontal_gap}%)`,
// 		display: "grid",
// 		gridTemplateColumns: `repeat(3, 1fr)`,
// 		overflow: "visible",
// 	};
// };
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

export const sideStyle = (
	relative_spacing: number = 10,
	absolute_spacing: number = 0,
	isLeft: boolean = true
): React.CSSProperties => {
	const sf = 1 - (2 * relative_spacing) / 100;
	const horizontal_spacing = 25 - relative_spacing / 2;

	return {
		background: bgAxis,

		...(isLeft
			? {
					marginLeft: `calc(${25 * sf}% - ${
						absolute_spacing * 0.8
					}px)`,

					marginRight: `calc(-1*(${25 * sf}% - ${
						absolute_spacing * 0.8
					}px))`,
			  }
			: {
					marginRight: `calc(${25 * sf}% - ${
						absolute_spacing * 0.8
					}px)`,

					marginLeft: `calc(-1*(${25 * sf}% - ${
						absolute_spacing * 0.8
					}px))`,
			  }),
		// ...(isLeft
		// 	? {
		// 			marginLeft: `${25 * sf}%`,
		// 			marginRight: `-${25 * sf}%`,
		// 	  }
		// 	: {
		// 			marginRight: `${25 * sf}%`,
		// 			marginLeft: `-${25 * sf}%`,
		// 	  }),
	};
};
export const midStyle = (
	relative_spacing: number = 10,
	absolute_spacing: number = 0
): React.CSSProperties => {
	const vertical_spacing_add = (relative_spacing * 1) / 2;

	return {
		background: bgAxis,
		marginTop: `calc((${50 * vertSF + vertical_spacing_add}% + ${
			(absolute_spacing * vertSF) / 2
		}px))`,
		marginBottom: `calc(-1*(${50 * vertSF + vertical_spacing_add}% + ${
			(absolute_spacing * vertSF) / 2
		}px))`,
	};
};

export const container = (
	relative_spacing: number = 10,
	absolute_spacing: number = 0
): React.CSSProperties => {
	const vertical_gap = relative_spacing * CONVERSION_FACTOR;
	const old_horizontal_gap = relative_spacing * CONVERSION_FACTOR * vertSF;
	return {
		position: "relative",
		// rowGap: `${vertical_gap}%`,
		rowGap: `calc(${vertical_gap}% + ${absolute_spacing * vertSF}px)`, // slightly off

		columnGap: `${relative_spacing * CONVERSION_FACTOR * 0.25}%`,

		display: "grid",
		gridTemplateColumns: `repeat(3, 1fr)`,
		overflow: "visible",
	};
};
