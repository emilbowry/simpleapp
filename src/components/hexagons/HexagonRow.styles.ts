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
	marginTop: "-550px",
};
export const rowstyle = (spacing: number): React.CSSProperties => ({
	display: "grid",
	gridTemplateColumns: `${500 + spacing}px ${500 + spacing}px ${
		500 + spacing
	}px`,
	gridTemplateRows: `${500 + spacing}px`,
	justifyContent: "center",

	overflow: "visible",
	alignItems: "center",
});
