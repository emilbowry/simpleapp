// src/components/timeline/newTimeline.styles.ts

import React from "react";

export const rowstyle = (
	colSize: number,
	spacing: number
): React.CSSProperties => ({
	display: "grid",
	gridTemplateColumns: `${colSize - 200}px ${colSize - 200}px ${
		colSize - 200
	}px`,
	gridTemplateRows: `${colSize + spacing}px`,
	justifyContent: "center",
	overflow: "visible",
	alignItems: "center",
});

export const hexWrapAndContentContainer = (
	colSize: number
): React.CSSProperties => ({
	width: `${colSize}px`,
	height: `${colSize}px`,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	position: "relative",
	overflow: "hidden",
	minWidth: 0,
	minHeight: 0,
});

export const hexagonVisualStyle: React.CSSProperties = {
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	zIndex: 1,
	opacity: 0.7,
};

export const contentStyle: React.CSSProperties = {
	position: "absolute",
	top: "10%",
	left: "25%",
	width: "50%",
	height: "90%",
	display: "flex",
	justifyContent: "center",
	// alignItems: "center",
	zIndex: 2,
	boxSizing: "border-box",

	overflowY: "auto",
	overflowX: "hidden",
};
