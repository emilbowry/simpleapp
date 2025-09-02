// src/components/callingcard/CallingCard.styles.ts

import React from "react";
export const style_CallingCardStyle = (
	fullSpread: boolean
): React.CSSProperties => ({
	padding: !fullSpread ? "2%" : "", //Works DO NOT TOUCH
	// paddingTop: "40px",

	alignItems: "center",
});
export const innerStyle = (fullSpread: boolean): React.CSSProperties => ({
	fontSize: "2rem",
	padding: "2%",
	borderRadius: !fullSpread ? "50px 10px" : "",
});

export const itemStyle: React.CSSProperties = {
	minWidth: 0,
	margin: "20px",
};
export const cardStyle = (_colour: string): React.CSSProperties => ({
	color: _colour,
	display: "grid",

	justifyContent: "space-evenly",
});

export const titleHeadingStyle = (_colour: string): React.CSSProperties => ({
	fontSize: "4rem",
	color: _colour,
});
