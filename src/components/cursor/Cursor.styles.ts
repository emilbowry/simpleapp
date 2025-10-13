// src/components/cursor/Cursor.styles.ts

import React from "react";
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
}): React.CSSProperties => {
	return {
		...baseCursorStyle,
		width: `${INNER_RADIUS}px`,
		height: `${INNER_RADIUS}px`,
		left: `${mousePosition.x - INNER_RADIUS / 2}px`,
		top: `${mousePosition.y - INNER_RADIUS / 2}px`,
	};
};
const largeCursorStyle = (largerCursorPosition: {
	x: number;
	y: number;
}): React.CSSProperties => {
	return {
		...baseCursorStyle,
		width: `${OUTER_RADIUS}px`,
		height: `${OUTER_RADIUS}px`,
		left: `${largerCursorPosition.x - OUTER_RADIUS / 2}px`,
		top: `${largerCursorPosition.y - OUTER_RADIUS / 2}px`,
	};
};
export { largeCursorStyle, smallCursorStyle };
