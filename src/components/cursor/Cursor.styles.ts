// src/components/cursor/Cursor.styles.ts

import React from "react";
import { ASPECT_RATIO } from "../hexagons/hexagon-grid/honeycomb/HexagonRow.consts";
import {
	CHEV_GAP,
	DIAMOND_SPACE,
	HEX_SIZE,
	INNER_RADIUS,
	OUTER_RADIUS,
} from "./Cursor.consts";
import { IPosition } from "./Cursor.types";
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

// import { logo_blue } from "../../utils/defaultColours";
import { logo_gradient_prime } from "../../styles";
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

const BaseHexStyle: React.CSSProperties = {
	position: "fixed",
	backgroundImage: `${logo_gradient_prime}`,
	pointerEvents: "none",
	mixBlendMode: "difference",
	width: `${HEX_SIZE}px`,
	height: `${HEX_SIZE / ASPECT_RATIO}px`,
	zIndex: 9999,
};

const baseHexStyle = (mousePosition: {
	x: number;
	y: number;
}): React.CSSProperties => ({
	...BaseHexStyle,

	left: `${mousePosition.x - HEX_SIZE / 2}px`,
	top: `${mousePosition.y - HEX_SIZE / 2}px`,
});

const chevStyle = (mousePosition: IPosition): React.CSSProperties => ({
	...baseHexStyle(mousePosition),
	clipPath: "polygon(25% 0, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 50% 50%)",
});

const hexStyle = (mousePosition: IPosition): React.CSSProperties => ({
	...baseHexStyle(mousePosition),
	clipPath: "polygon(25% 0, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
});
const diamondStyle = (mousePosition: IPosition): React.CSSProperties => ({
	...baseHexStyle(mousePosition),
	clipPath: `polygon(0% 50%, ${DIAMOND_SPACE}% ${
		DIAMOND_SPACE * ASPECT_RATIO
	}%, ${2 * DIAMOND_SPACE}% 50%, ${DIAMOND_SPACE}% ${
		100 - DIAMOND_SPACE * ASPECT_RATIO
	}%)`,
});

// const clickInsertStyle = (mousePosition: IPosition): React.CSSProperties => ({
// 	...baseHexStyle(mousePosition),
// 	clipPath: `polygon(50% 50%,  ${50 - CHEV_GAP / 2}% ${
// 		50 - CHEV_GAP * ASPECT_RATIO
// 	}%,  ${100 - CHEV_GAP / 2}% ${50 - CHEV_GAP * ASPECT_RATIO}%, 100% 50%,  ${
// 		100 - CHEV_GAP / 2
// 	}% ${50 + CHEV_GAP * ASPECT_RATIO}%, ${50 - CHEV_GAP / 2}% ${
// 		50 + CHEV_GAP * ASPECT_RATIO
// 	}%)`,
// });
const clickInsertStyleA = (mousePosition: IPosition): React.CSSProperties => ({
	...baseHexStyle(mousePosition),

	clipPath: `polygon(25% 0, 75% 0%, ${100 - CHEV_GAP / 2}% ${
		50 - CHEV_GAP * ASPECT_RATIO
	}%, ${50 - CHEV_GAP / 2}% ${50 - CHEV_GAP * ASPECT_RATIO}%)`,
});
const clickInsertStyleB = (mousePosition: IPosition): React.CSSProperties => ({
	...baseHexStyle(mousePosition),

	clipPath: `polygon(${50 - CHEV_GAP / 2}% ${
		50 + CHEV_GAP * ASPECT_RATIO
	}%,  ${100 - CHEV_GAP / 2}% ${
		50 + CHEV_GAP * ASPECT_RATIO
	}%, 75% 100%, 25% 100%)`,
});
export {
	chevStyle,
	clickInsertStyleA,
	clickInsertStyleB,
	diamondStyle,
	hexStyle,
	largeCursorStyle,
	smallCursorStyle,
};
