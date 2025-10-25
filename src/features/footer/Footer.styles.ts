import React from "react";

const CenterableStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",

	margin: "auto 0",
};
const scrollVisabilityStyle = (
	isVisible: boolean,
	opacity: number,
	styling: React.CSSProperties
): React.CSSProperties => ({
	...styling,

	visibility: isVisible ? "visible" : "hidden",
	opacity: opacity,
	filter: `blur(${(1 - opacity) ** 2 * 16}px)`,
});
export { CenterableStyle, scrollVisabilityStyle };
