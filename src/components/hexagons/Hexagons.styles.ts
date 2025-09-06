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
		// marginTop: "-1px",
		// marginBottom: "-1px",
		// marginLeft: "-3px",
		// marginRight: "-3px",
		// display: "block",
		// verticalAlign: "bottom",
		// margin: 0,
		// border: "1px solid black",
		// position: "relative",
		// width,
		// height,
		// width: "100%",
		// height: "auto",
		fontSize: 0, // Remeber to reset
		overflow: "visible",
		// width: "stretch",
		// height: "min-content%",
		// flexShrink: 0,
		// width: "70vw",
		// height: "70vh",
		// width
		// border: "1px solid black",
		// display: "block",
		// boxSizing: "border-box",
		width: "100%",
		opacity, // why can i return like this this is odd
	};
};

export const svgStyle = ({
	size = 500,
	scale = 1,
}: HexagonStyleParams): React.CSSProperties => {
	const { width, height } = getFinalDimensions({ size, scale });
	return {
		// overflow: "visible",
		// 		border: "1px solid black",
		// boxSizing: border-box;
		// width: "stretch",
		// width,
		// width: "stretch",
		// height: "stretch",
	};
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
		left,
		top,
		width,
		fontSize: "unset",
		height,
		overflow: "hidden",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};
};

export const verticalContentStyle = (): React.CSSProperties => {
	const left = `${((vertSafeZoneCoords.minX - 0) / 200) * 100}%`;
	const top = `${((vertSafeZoneCoords.minY - -100) / 200) * 100}%`;
	const width = `${((vertSafeZoneCoords.width * 1) / 200) * 100}%`;
	const height = `${(vertSafeZoneCoords.height / 200) * 100}%`;

	return {
		position: "absolute",
		left,
		top,
		width,
		height,
		overflow: "hidden",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};
};
