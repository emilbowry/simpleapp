// src/components/hexagons/hexagonRow/HexagonRow.styles.ts

import React from "react";

export const hexWrap: React.CSSProperties = {
	// display: "flex",
	justifyContent: "center",
	overflow: "visible",
	// alignItems: "center",
	width: "500px",

	height: "500px",
};

export const hexWrap_middle: React.CSSProperties = {
	...hexWrap,
	marginTop: `-50%`,
	// top: "-20000%",
};
export const rowstyle = (spacing: number): React.CSSProperties => ({
	// display: "grid",
	// position: "absolute",
	display: "flex",

	// gridTemplateColumns: `${500 + Math.sqrt(3) * 2 * spacing}px ${
	// 	500 + Math.sqrt(3) * 2 * spacing
	// }px ${500 + Math.sqrt(3) * 2 * spacing}px`,

	// gridTemplateRows: `${500 + 0}px`,

	justifyContent: "center",

	overflow: "visible",
	// width: "auto",
	// width: "min-content",
	alignItems: "center",
});
