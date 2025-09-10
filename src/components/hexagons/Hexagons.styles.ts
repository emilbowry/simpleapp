// src/components/hexagons/Hexagons.styles.ts

import React from "react";
import { HexagonStyleParams } from "./Hexagons.types";

const horizontalSafeZoneCoords = {
	minX: 50,
	maxX: 150,
	minY: -86.6025,
	maxY: 86.6025,
	width: 100,
	height: 173.205,
};

const vertSafeZoneCoords = {
	minX: 13.3975,
	maxX: 186.6025,
	minY: -50,
	maxY: 50,
	width: 173.205,
	height: 100,
};

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
		fontSize: 0, // Remeber to reset
		overflow: "visible",
		opacity, // why can i return like this this is odd
	};
};

export const svgStyle = ({
	size = 500,
	scale = 1,
}: HexagonStyleParams): React.CSSProperties => {
	const { width, height } = getFinalDimensions({ size, scale });
	return {};
};

//
// ===== Content Zones =====
//
export const horizontalContentStyle = (): React.CSSProperties => {
	const left = `${((horizontalSafeZoneCoords.minX - 0) / 200) * 100}%`;
	const top = `${((horizontalSafeZoneCoords.minY - -100) / 200) * 100}%`;
	const width = `${(horizontalSafeZoneCoords.width / 200) * 100}%`;
	const height = `${(horizontalSafeZoneCoords.height / 200) * 100}%`;

	return {
		position: "absolute",
		zIndex: "9999",
		left,
		top,
		width,
		fontSize: "initial",
		height,
		// overflow: "hidden",
		display: "flex",
		overflow: "visible",

		justifyContent: "center",
		alignItems: "center",
	};
};
import { genericSectionStyle } from "../../styles";
export const verticalContentStyle = (): React.CSSProperties => {
	const left = `${((vertSafeZoneCoords.minX - 0) / 200) * 100}%`;
	const top = `${((vertSafeZoneCoords.minY - -100) / 200) * 100}%`;
	const width = `${((vertSafeZoneCoords.width * 1) / 200) * 100}%`;
	const height = `${(vertSafeZoneCoords.height / 200) * 100}%`;

	return {
		// ...genericSectionStyle, // adds background and border debugging
		position: "absolute",
		left,
		top,
		width,
		height,
		maxHeight: height,
		fontSize: "initial",
		// fontSize: "1rem,",

		// overflow: "visible",

		// overflow: "hidden",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};
};
