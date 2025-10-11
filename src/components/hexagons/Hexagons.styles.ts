import React from "react";

// import { genericSectionStyle } from "../../styles";
import { HexagonStyleParams } from "./Hexagons.types";

const containerStyle = ({
	opacity = 0.8,
}: HexagonStyleParams): React.CSSProperties => {
	return {
		position: "relative",
		fontSize: 0,
		overflow: "visible",

		opacity: `${opacity}`,
	};
};

const svgStyle = ({}: HexagonStyleParams): React.CSSProperties => {
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

const PolyCutout = (
	usePointedTop: boolean,
	isLeft: boolean
): React.CSSProperties => {
	return {
		position: "relative",

		shapeOutside: isLeft
			? leftCutout(usePointedTop)
			: rightCutout(usePointedTop),
		shapeMargin: "5%",

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
const elementSection: React.CSSProperties = {
	position: "relative",
	top: 0,

	// ...genericSectionStyle,
	width: "100%",
	height: `calc(100%)`,
};

const elementWrapper: React.CSSProperties = {
	position: "relative",

	width: "100%",
	display: "block",
	height: `calc(100%)`, // 100% doesnt work out correct unles using calc
};

const hexagonalContentStyle: React.CSSProperties = {
	position: "absolute",
	height: `calc(100%)`,

	width: "100%",
	// left: 0,
	top: 0,
};

const ELWrapperStyle: React.CSSProperties = {
	position: "relative",
	height: "100%",
	margin: 0,
};

const ElContainerStyle: React.CSSProperties = {
	position: "relative",
	margin: 0,
	padding: 0,
	height: "100%",
	top: 0,
};

export {
	containerStyle,
	ElContainerStyle,
	elementSection,
	elementWrapper,
	ELWrapperStyle,
	hexagonalContentStyle,
	PolyCutout,
	svgStyle,
};
