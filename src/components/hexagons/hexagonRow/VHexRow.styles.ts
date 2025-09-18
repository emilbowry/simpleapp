// src/components/hexagons/hexagonRow/VHexRow.styles.ts

import React from "react";
/* Vert Hex Style (old) */

export const vertContainer = (
	containerWidth: number,
	containerHeight: number
): React.CSSProperties => ({
	position: "relative",
	width: containerWidth,
	height: containerHeight,
	margin: "0 auto",
});

export const vertHexStyle = (x: number, y: number): React.CSSProperties => ({
	position: "absolute",
	left: x,
	top: y,
});
