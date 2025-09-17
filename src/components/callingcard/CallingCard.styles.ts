// src/components/callingcard/CallingCard.styles.ts

import React from "react";
export const style_CallingCardStyle = (
	fullSpread: boolean
): React.CSSProperties => ({
	padding: !fullSpread ? "2%" : "0", //Works DO NOT TOUCH
	height: "100%",
	alignItems: "center",
});
export const innerStyle = (fullSpread: boolean): React.CSSProperties => ({
	fontSize: "2rem",
	padding: !fullSpread ? "2%" : "0",
	borderRadius: !fullSpread ? "50px 10px" : "",
});

export const itemStyle: React.CSSProperties = {
	minWidth: 0,
	margin: "0",
};
export const cardStyle = (_colour: string): React.CSSProperties => ({
	color: _colour,
	display: "grid",
	// height: "100%",

	// columnGap: "20%",
	// justifyContent: "space-evenly",
});

export const titleHeadingStyle = (_colour: string): React.CSSProperties => ({
	fontSize: "3rem",
	color: _colour,
});
