import React from "react";

import { HexagonStyleParams } from "./Hexagons.types";
import { genericSectionStyle } from "../../styles";

export const containerStyle = ({
	size = 500,
	scale = 1,
	opacity = 0.8,
}: HexagonStyleParams): React.CSSProperties => {
	return {
		position: "relative",
		fontSize: 0,
		overflow: "visible",

		opacity: `${opacity}`,
	};
};

export const svgStyle = ({
	size = 500,
	scale = 1,
}: HexagonStyleParams): React.CSSProperties => {
	return {};
};

const s = 1;

const pointedLeftCutout =
	"polygon(0% 0%, 100% 0%, 0% 25%, 0% 100%, 100% 100%, 0% 75%)";
const pointedRightCutout =
	"polygon(100% 0%, 0% 0%, 100% 25%, 100% 100%, 0% 100%, 100% 75%)";
const flattopLeftCutout =
	"polygon(0 0,0 100%,100% 100%,50% 100%,0% 50%,50% 0%)";
const flattopRightCutout =
	"polygon(100% 50%,100% 100%,50% 100%,100% 50%,50% 0%, 100% 0%)";
const leftCutout = (usePointedTop: boolean) =>
	usePointedTop ? pointedLeftCutout : flattopLeftCutout;
const rightCutout = (usePointedTop: boolean) =>
	usePointedTop ? pointedRightCutout : flattopRightCutout;

export const PolyCutout = (
	usePointedTop: boolean,
	isLeft: boolean
): React.CSSProperties => {
	return {
		position: "relative",

		shapeOutside: isLeft
			? leftCutout(usePointedTop)
			: rightCutout(usePointedTop),
		// shapeMargin: "5%",

		/**
    @debug - used to visually display the shape

 */
		// clipPath: isLeft
		// 	? leftCutout(usePointedTop)
		// 	: rightCutout(usePointedTop),
		// backgroundColor: isLeft ? "rgb(0,255,0,40%)" : "rgb(255,0,0,40%)",
		float: isLeft ? "left" : "right",
		width: `${50 * s}%`,
		height: `calc(${100 * s}%)`,
	};
};

/* some of these 100% and calc(100%) and inherit's are unnecessary but i cant remember which ones i can safely remove*/
export const elementSection: React.CSSProperties = {
	position: "relative",
	top: 0,

	// ...genericSectionStyle,
	width: "100%",
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

export const ELWrapperStyle: React.CSSProperties = {
	position: "relative",
	height: "100%",
	margin: 0,
};

export const flattop_ElGhostStyle: React.CSSProperties = {
	margin: 0,
	padding: 0,
	visibility: "hidden",
	fontSize: 0,
};

export const ElContainerStyle: React.CSSProperties = {
	position: "relative",
	margin: 0,
	padding: 0,
	height: "100%",
	top: 0,
};

export const pointedtop_ElInnerGhostStyle: React.CSSProperties = {
	visibility: "hidden",
};
