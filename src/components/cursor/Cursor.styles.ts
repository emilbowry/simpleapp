// src/components/cursor/Cursor.styles.ts

import React from "react";
import { logo_yellow, logo_blue } from "../../utils/defaultColours";
const HEXAGON_CURSOR_SIZE = 20;
const hoverTime = 1;
const TRIANGLE_SIDE_LENGTH = HEXAGON_CURSOR_SIZE / 4;
const TRIANGLE_HEIGHT = Math.round(TRIANGLE_SIDE_LENGTH * Math.sqrt(3));
export const baseCursorStyle: React.CSSProperties = {
	position: "fixed",
	backgroundColor: "white",
	borderRadius: "50%",
	pointerEvents: "none",
	mixBlendMode: "difference",
	zIndex: 9999,
};
export const s_size = 10;
export const smallCursorStyle = (mousePosition: {
	x: number;
	y: number;
}): React.CSSProperties => {
	return {
		...baseCursorStyle,
		width: `${s_size}px`,
		height: `${s_size}px`,
		left: `${mousePosition.x - s_size / 2}px`,
		top: `${mousePosition.y - s_size / 2}px`,
	};
};
export const l_size = 30;
export const largeCursorStyle = (largerCursorPosition: {
	x: number;
	y: number;
}): React.CSSProperties => {
	return {
		...baseCursorStyle,
		width: `${l_size}px`,
		height: `${l_size}px`,
		left: `${largerCursorPosition.x - l_size / 2}px`,
		top: `${largerCursorPosition.y - l_size / 2}px`,
	};
};
export const triangleColors = [
	...Array(12).fill(logo_yellow),
	...Array(12).fill(logo_blue),
];
export const keyframes = `
    @keyframes blink {
      0% { opacity: 0.1; }
      30% { opacity: 1; }
      100% { opacity: 0.1; }
    }
  `;
export const hexagonContainerStyle = (mousePosition: {
	x: number;
	y: number;
}): React.CSSProperties => {
	return {
		position: "fixed",
		left: `${mousePosition.x}px`,
		top: `${mousePosition.y}px`,
		transform: "translate(-50%, -50%)",
		pointerEvents: "none",
		zIndex: 9999,
		width: `${HEXAGON_CURSOR_SIZE}px`,
		height: `${Math.round(Math.sqrt(3) * (HEXAGON_CURSOR_SIZE / 2))}px`,
	};
};
export const hexagonLoaderStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	width: "100%",
	height: "100%",
};
export const rowStyle: React.CSSProperties = {
	display: "flex",
};
export const baseArrowStyle: React.CSSProperties = {
	width: 0,
	height: 0,
	margin: `0 ${-TRIANGLE_SIDE_LENGTH / 2}px`,
	borderLeft: `${TRIANGLE_SIDE_LENGTH}px solid transparent`,
	borderRight: `${TRIANGLE_SIDE_LENGTH}px solid transparent`,
	borderBottom: `${TRIANGLE_HEIGHT}px solid transparent`,
	animation: `blink ${hoverTime}s infinite`,
};
export const downArrowStyle: React.CSSProperties = {
	transform: "rotate(180deg)",
};
export const getAnimationDelay = (
	type: "outer" | "inner",
	index: number
): React.CSSProperties => {
	const delay =
		type === "outer"
			? -((hoverTime / 18) * index)
			: -((hoverTime / 6) * index);
	return { animationDelay: `${delay}s` };
};
