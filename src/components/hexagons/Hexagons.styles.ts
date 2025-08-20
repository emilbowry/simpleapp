// src/components/hexagons/Hexagons.styles.ts

import React from "react";

//
// ===== Layout Safe Zones =====
//
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

//
// ===== Helpers =====
//
interface HexagonStyleParams {
	size?: number;
	scale?: number;
	opacity?: number;
}

export const getFinalDimensions = ({
	size = 500,
	scale = 1,
}: HexagonStyleParams) => {
	return {
		width: size * scale,
		height: size * scale,
	};
};

//
// ===== Containers =====
//
export const containerStyle = ({
	size = 500,
	scale = 1,
	opacity = 1,
}: HexagonStyleParams): React.CSSProperties => {
	const { width, height } = getFinalDimensions({ size, scale });
	return {
		position: "relative",
		width,
		height,
		opacity,
	};
};

export const svgStyle = ({
	size = 500,
	scale = 1,
}: HexagonStyleParams): React.CSSProperties => {
	const { width, height } = getFinalDimensions({ size, scale });
	return {
		width,
		height,
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
	const width = `${(vertSafeZoneCoords.width / 200) * 100}%`;
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
