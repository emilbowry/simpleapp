// src/components/cursor/Cursor.styles.ts

import React from "react";
import { ASPECT_RATIO } from "../hexagons/hexagon-grid/honeycomb/HexagonRow.consts";
import { INNER_RADIUS, OUTER_RADIUS } from "./Cursor.consts";
const baseCursorStyle: React.CSSProperties = {
	position: "fixed",
	backgroundColor: "white",
	borderRadius: "50%",

	pointerEvents: "none",
	mixBlendMode: "difference",
	zIndex: 9999,
};

const smallCursorStyle = (mousePosition: {
	x: number;
	y: number;
}): React.CSSProperties => ({
	...baseCursorStyle,
	width: `${INNER_RADIUS}px`,
	height: `${INNER_RADIUS}px`,
	left: `${mousePosition.x - INNER_RADIUS / 2}px`,
	top: `${mousePosition.y - INNER_RADIUS / 2}px`,
});
const largeCursorStyle = (largerCursorPosition: {
	x: number;
	y: number;
}): React.CSSProperties => ({
	...baseCursorStyle,
	width: `${OUTER_RADIUS}px`,
	height: `${OUTER_RADIUS}px`,
	left: `${largerCursorPosition.x - OUTER_RADIUS / 2}px`,
	top: `${largerCursorPosition.y - OUTER_RADIUS / 2}px`,
});

const baseHexStyle: React.CSSProperties = {
	position: "fixed",
	backgroundColor: "white",

	pointerEvents: "none",
	mixBlendMode: "difference",
	width: `${INNER_RADIUS}px`,
	height: `${INNER_RADIUS / ASPECT_RATIO}px`,
	zIndex: 9999,
};
const _baseCursorStyle = (mousePosition: {
	x: number;
	y: number;
}): React.CSSProperties => ({
	position: "fixed",
	backgroundColor: "white",

	pointerEvents: "none",
	mixBlendMode: "difference",
	width: `${INNER_RADIUS}px`,
	height: `${INNER_RADIUS / ASPECT_RATIO}px`,
	left: `${mousePosition.x - 10}px`,
	top: `${mousePosition.y - 10}px`,
	zIndex: 9999,
});
const chevStyle = (mousePosition: {
	x: number;
	y: number;
}): React.CSSProperties => ({
	...baseHexStyle,
	clipPath: "polygon(25% 0, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 50% 50%)",

	left: `${mousePosition.x}px`,
	top: `${mousePosition.y}px`,
});

const hexStyle = (mousePosition: {
	x: number;
	y: number;
}): React.CSSProperties => ({
	...baseHexStyle,
	clipPath: "polygon(25% 0, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",

	left: `${mousePosition.x}px`,
	top: `${mousePosition.y}px`,
});
const diamondStyle = (largerCursorPosition: {
	x: number;
	y: number;
}): React.CSSProperties => ({
	...baseHexStyle,
	clipPath: `polygon(0% 50%, 15% ${15 * ASPECT_RATIO}%, 30% 50%, 15% ${
		100 - 15 * ASPECT_RATIO
	}%)`,

	left: `${largerCursorPosition.x}px`,
	top: `${largerCursorPosition.y}px`,
});

const clickInsertStyle = (mousePosition: {
	x: number;
	y: number;
}): React.CSSProperties => ({
	...baseHexStyle,
	clipPath: `polygon(50% 50%,  ${50 - 7 / ASPECT_RATIO}% ${
		50 - 7 * ASPECT_RATIO
	}%,  ${100 - 7 / ASPECT_RATIO}% ${50 - 7 * ASPECT_RATIO}%, 100% 50%,  ${
		100 - 7 / ASPECT_RATIO
	}% ${50 + 7 * ASPECT_RATIO}%, ${50 - 7 / ASPECT_RATIO}% ${
		50 + 7 * ASPECT_RATIO
	}%)`,
	left: `${mousePosition.x}px`,
	top: `${mousePosition.y}px`,
});

export {
	_baseCursorStyle,
	baseCursorStyle,
	chevStyle,
	clickInsertStyle,
	diamondStyle,
	hexStyle,
	largeCursorStyle,
	smallCursorStyle,
};
