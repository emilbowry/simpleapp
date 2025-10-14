import React from "react";

const centerable: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",

	margin: "auto 0",
};
const scrollVisabilityStyling = (
	isVisible: boolean,
	opacity: number,
	styling: React.CSSProperties
): React.CSSProperties => ({
	...styling,

	visibility: isVisible ? "visible" : "hidden",
	opacity: opacity,
	filter: `blur(${(1 - opacity) ** 2 * 16}px)`,
});
export { centerable, scrollVisabilityStyling };
