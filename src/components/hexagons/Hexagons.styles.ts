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
		// 	? "polygon(100% 0%, 0% 0%, 100% 25%, 100% 100%, 0% 100%, 100% 75%)"
		// 	: "polygon(100% 50%,100% 100%,50% 100%,100% 50%,50% 0%, 100% 0% )",

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
