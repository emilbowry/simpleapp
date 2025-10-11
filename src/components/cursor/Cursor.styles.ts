// src/components/cursor/Cursor.styles.ts

import React from "react";
import { s_size, l_size } from "./Cursor.consts";
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
		width: `${s_size}px`,
		height: `${s_size}px`,
		left: `${mousePosition.x - s_size / 2}px`,
		top: `${mousePosition.y - s_size / 2}px`,
	};
};
const largeCursorStyle = (largerCursorPosition: {
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
export { smallCursorStyle, largeCursorStyle };
