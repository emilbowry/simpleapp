import React from "react";

import { THexagonStyleParams } from "./Hexagons.types";

const containerStyle = ({
	opacity = 0.8,
}: THexagonStyleParams): React.CSSProperties => {
	return {
		position: "relative",
		fontSize: 0,
		overflow: "visible",

		opacity: `${opacity}`,
	};
};

const svgStyle = ({}: THexagonStyleParams): React.CSSProperties => {
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

		float: isLeft ? "left" : "right",
		width: `${50 * s}%`,
		height: `calc(${100 * s}%)`,
	};
};

const elementSection: React.CSSProperties = {
	position: "relative",
	top: 0,

	width: "100%",
	height: `calc(100%)`,
};

const elementWrapper: React.CSSProperties = {
	position: "relative",

	width: "100%",
	display: "block",
	height: `calc(100%)`,
};

const hexagonalContentStyle: React.CSSProperties = {
	position: "absolute",
	height: `calc(100%)`,
	width: "100%",
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
