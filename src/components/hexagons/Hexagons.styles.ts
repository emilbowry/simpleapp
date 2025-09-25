// // src/components/hexagons/Hexagons.styles.ts
// import React from "react";

// import { HexagonStyleParams } from "./Hexagons.types";
// import { genericSectionStyle } from "../../styles";

// const vertSafeZoneCoords = {
// 	minX: 13.3975,
// 	maxX: 186.6025,
// 	minY: -50,
// 	maxY: 50,
// 	width: 173.205,
// 	height: 100,
// };

// export const getFinalDimensions = ({
// 	size = 100,
// 	scale = 1,
// }: HexagonStyleParams) => {
// 	return {
// 		width: size * scale,
// 		height: size * scale,
// 	};
// };

// export const containerStyle = ({
// 	size = 500,
// 	scale = 1,
// 	opacity = 0.8,
// }: HexagonStyleParams): React.CSSProperties => {
// 	const { width, height } = getFinalDimensions({ size, scale });
// 	return {
// 		fontSize: 0,
// 		overflow: "visible",

// 		opacity: `${opacity}`,
// 	};
// };

// // No-op
// export const svgStyle = ({
// 	size = 500,
// 	scale = 1,
// }: HexagonStyleParams): React.CSSProperties => {
// 	const { width, height } = getFinalDimensions({ size, scale });
// 	return {};
// };

// //
// // ===== Content Zones =====
// //
// /**
//  *
//  * @depreciated
//  Replaced with shape-outside methodology

// const horizontalSafeZoneCoords = {
// 	minX: 50,
// 	maxX: 150,
// 	minY: -86.6025,
// 	maxY: 86.6025,
// 	width: 100,
// 	height: 173.205,
// };

// export const horizontalContentStyle = (): React.CSSProperties => {
// 	const left = `${((horizontalSafeZoneCoords.minX - 0) / 200) * 100}%`;
// 	const top = `${((horizontalSafeZoneCoords.minY - -100) / 200) * 100}%`;
// 	const width = `${(horizontalSafeZoneCoords.width / 200) * 100}%`;
// 	const height = `${(horizontalSafeZoneCoords.height / 200) * 100}%`;

// 	return {
// 		position: "absolute",
// 		left,
// 		top,
// 		width,
// 		fontSize: "initial",
// 		height,
// 		display: "flex",
// 		overflow: "visible",

// 		justifyContent: "center",
// 		alignItems: "center",
// 	};
// };
//  */

// export const verticalContentStyle = (): React.CSSProperties => {
// 	const left = `${((vertSafeZoneCoords.minX - 0) / 200) * 100}%`;
// 	const top = `${((vertSafeZoneCoords.minY - -100) / 200) * 100}%`;
// 	const width = `${((vertSafeZoneCoords.width * 1) / 200) * 100}%`;
// 	const height = `${(vertSafeZoneCoords.height / 200) * 100}%`;

// 	return {
// 		position: "absolute",
// 		// height: `calc(100%)`,
// 		// width: "100%",

// 		// left: 0,
// 		// top: 0,
// 		left,
// 		top,
// 		width,
// 		height,
// 		maxHeight: height,
// 		fontSize: "initial",

// 		display: "flex",
// 		justifyContent: "center",
// 		alignItems: "center",
// 	};
// };
// const s = 1;

// export const LeftCutout: React.CSSProperties = {
// 	position: "relative",

// 	shapeOutside: "polygon(0 0,0 100%,100% 100%,50% 100%,0% 50%,50% 0%)",
// 	shapeMargin: "5%",

// 	/**
// 	@debug - used to visually display the shape

//  */

// 	// clipPath: "polygon(0 0,0 100%,100% 100%,50% 100%,0% 50%,50% 0%)",
// 	// backgroundColor: "rgb(0,255,0,40%)",
// 	float: "left",
// 	width: `${50 * s}%`,
// 	height: `calc(${100 * s}%)`,
// };
// export const RightCutout: React.CSSProperties = {
// 	position: "relative",

// 	shapeOutside:
// 		"polygon(100% 50%,100% 100%,50% 100%,100% 50%,50% 0%, 100% 0% )",
// 	shapeMargin: "5%",

// 	/**
// 	shapeMargin: "2%",

// 	@debug - used to visually display the shape

//  */
// 	// clipPath: "polygon(100% 50%,100% 100%,50% 100%,100% 50%,50% 0%, 100% 0% )",
// 	// backgroundColor: "rgb(255,0,0,40%)",
// 	float: "right",
// 	width: `${50 * s}%`,
// 	height: `calc(${100 * s}%)`,
// };
// /* some of these 100% and calc(100%) and inherit's are unnecessary but i cant remember which ones i can safely remove*/
// export const textSex: React.CSSProperties = {
// 	// ...genericSectionStyle,

// 	width: "100%",
// 	height: `calc(100%)`,
// };
// export const _contentSection: React.CSSProperties = {
// 	width: "inherit",
// 	height: `calc(100%)`,
// 	position: "absolute",
// };
// export const textSec: React.CSSProperties = {
// 	width: "100%",
// 	display: "block",
// 	height: `calc(100%)`, // 100% doesnt work out correct unles using calc
// };

// export const LWRap: React.CSSProperties = {
// 	width: "100%",
// 	height: "100%",
// };
// export const hexagonalContentStyle: React.CSSProperties = {
// 	position: "absolute",
// 	height: `calc(100%)`,

// 	width: "100%",

// 	top: 0,
// };
// export const VertLeftCutout: React.CSSProperties = {
// 	position: "relative",
// 	shapeOutside: "polygon(0% 0%, 100% 0%, 0% 25%, 0% 100%, 100% 100%, 0% 75%)",
// 	shapeMargin: "5%",

// 	float: "left",
// 	width: `${50 * s}%`,
// 	height: `calc(${100 * s}%)`,
// 	// @debug - use clipPath for visual confirmation
// 	// clipPath: "polygon(0% 0%, 98% 0%, 0% 25%, 0% 100%, 98% 100%, 0% 75%)",
// 	// backgroundColor: "rgb(0,255,0,40%)", // Green for left
// };

// export const VertRightCutout: React.CSSProperties = {
// 	position: "relative",

// 	shapeOutside:
// 		"polygon(100% 0%, 0% 0%, 100% 25%, 100% 100%, 0% 100%, 100% 75%)",
// 	shapeMargin: "5%",
// 	float: "right",
// 	width: `${50 * s}%`,
// 	height: `calc(${100 * s}%)`,
// 	// @debug - use clipPath for visual confirmation
// 	// clipPath: "polygon(100% 0%, 0% 0%, 100% 25%, 100% 100%, 2% 100%, 100% 75%)",
// 	// backgroundColor: "rgb(255,0,0,40%)", // Red for right
// 	// 	position: "relative",
// };
// export const vertHexagonalContentStyle: React.CSSProperties = {
// 	position: "absolute",
// 	height: `calc(100%)`,
// 	width: "100%",
// 	top: 0,
// };

// export const vertTextSec: React.CSSProperties = {
// 	width: "100%",
// 	display: "block",
// 	height: `calc(100%)`,
// };

// export const vertTextContentWrapperStyle: React.CSSProperties = {
// 	width: "100%",
// 	height: `calc(100%)`,
// };

// src/components/hexagons/Hexagons.styles.ts
import React from "react";

import { HexagonStyleParams } from "./Hexagons.types";
import { genericSectionStyle } from "../../styles";

export const getFinalDimensions = ({
	size = 100,
	scale = 1,
}: HexagonStyleParams) => {
	return {
		width: size * scale,
		height: size * scale,
	};
};

export const containerStyle = ({
	size = 500,
	scale = 1,
	opacity = 0.8,
}: HexagonStyleParams): React.CSSProperties => {
	const { width, height } = getFinalDimensions({ size, scale });
	return {
		fontSize: 0,
		overflow: "visible",

		opacity: `${opacity}`,
	};
};

// No-op
export const svgStyle = ({
	size = 500,
	scale = 1,
}: HexagonStyleParams): React.CSSProperties => {
	const { width, height } = getFinalDimensions({ size, scale });
	return {};
};

const s = 1;

export const LeftCutout = (useVert: boolean): React.CSSProperties => {
	return {
		position: "relative",

		shapeOutside: useVert
			? "polygon(0% 0%, 100% 0%, 0% 25%, 0% 100%, 100% 100%, 0% 75%)"
			: "polygon(0 0,0 100%,100% 100%,50% 100%,0% 50%,50% 0%)",
		shapeMargin: "5%",

		/**
    @debug - used to visually display the shape

 */

		// clipPath:  useVert? "polygon(0% 0%, 100% 0%, 0% 25%, 0% 100%, 100% 100%, 0% 75%)":"polygon(0 0,0 100%,100% 100%,50% 100%,0% 50%,50% 0%)",
		// backgroundColor: "rgb(0,255,0,40%)",
		float: "left",
		width: `${50 * s}%`,
		height: `calc(${100 * s}%)`,
	};
};
export const RightCutout = (useVert: boolean): React.CSSProperties => {
	return {
		position: "relative",

		shapeOutside: useVert
			? "polygon(100% 0%, 0% 0%, 100% 25%, 100% 100%, 0% 100%, 100% 75%)"
			: "polygon(100% 50%,100% 100%,50% 100%,100% 50%,50% 0%, 100% 0% )",
		shapeMargin: "5%",

		/**
    shapeMargin: "2%",

    @debug - used to visually display the shape

 */
		// clipPath: useVert
		//  ? "polygon(100% 0%, 0% 0%, 100% 25%, 100% 100%, 0% 100%, 100% 75%)"
		//  : "polygon(100% 50%,100% 100%,50% 100%,100% 50%,50% 0%, 100% 0% )",

		// backgroundColor: "rgb(255,0,0,40%)",
		float: "right",
		width: `${50 * s}%`,
		height: `calc(${100 * s}%)`,
	};
};
/* some of these 100% and calc(100%) and inherit's are unnecessary but i cant remember which ones i can safely remove*/
export const elementSection: React.CSSProperties = {
	position: "relative",

	// ...genericSectionStyle,
	width: "100%",
	height: `calc(100%)`,
};
export const _contentSection: React.CSSProperties = {
	position: "relative",

	width: "inherit",
	height: `calc(100%)`,
};
export const elementWrapper: React.CSSProperties = {
	position: "relative",

	width: "100%",
	display: "block",
	height: `calc(100%)`, // 100% doesnt work out correct unles using calc
};

export const hexagonalContentStyle: React.CSSProperties = {
	position: "absolute",
	height: `calc(100%)`,

	width: "100%",
	// left: 0,
	top: 0,
};
