// src/components/hexagons/HexagonsRow.styles.ts

import React from "react";

export const hexWrap: React.CSSProperties = {
	display: "flex",
	justifyContent: "center",
	overflow: "visible",
	alignItems: "center",
	width: "500px",
	height: "500px",
};

export const hexWrap_middle: React.CSSProperties = {
	...hexWrap,
	marginTop: `-500px`,
	// marginTop: "-100%",
};
export const rowstyle = (spacing: number): React.CSSProperties => ({
	display: "grid",
	gridTemplateColumns: `${500 + Math.sqrt(3) * 2 * spacing}px ${
		500 + Math.sqrt(3) * 2 * spacing
	}px ${500 + Math.sqrt(3) * 2 * spacing}px`,

	// gridTemplateColumns: `33% 33% 33%`,
	// gridTemplateRows: `${500 + spacing}px`,
	gridTemplateRows: `${500 + 0}px`,

	// gridTemplateRows: `33%`,

	justifyContent: "center",
	// paddingTop: "10px",
	// margin:"10%",
	// marginBottom: `-${500 + Math.sqrt(3) * 500}px`,

	overflow: "visible",
	// flexGrow: 0,
	alignItems: "center",
});
