// src/components/callingcard/newCallingCard.styles.ts

import React from "react";
import { genericSectionStyle } from "../../styles";

export const containerStyle: React.CSSProperties = {
	// ...genericSectionStyle,
	position: "relative",
	display: "flex",
	zIndex: 10,
	padding: "2%",
	flexDirection: "column",
};

export const headerContainerStyle: React.CSSProperties = {
	width: "75%",
	position: "relative",
	margin: "0 auto",
	display: "flex",
	justifyContent: "center",
	justifyItems: "center",
	alignContent: "center",
	alignItems: "center",
};

export const headerContentStyle: React.CSSProperties = {
	flexGrow: 1,

	display: "flex",
	justifyContent: "center",
	justifyItems: "center",

	alignItems: "center",
	marginBottom: "1%",
	paddingBottom: "2%",
};

export const lowerContainerStyle = (
	borderColour: string | undefined
): React.CSSProperties => ({
	flexGrow: 1,
	marginTop: "1%",
	paddingTop: "2%",

	display: "flex",
	borderTop: borderColour ? `2px solid ${borderColour}` : "",
});
export const lowerHalfWrapperStyle: React.CSSProperties = {
	flexGrow: 1,
	display: "flex",
};

export const leftBodyColumnStyle: React.CSSProperties = {
	marginRight: "1%",
	display: "flex",
	flexDirection: "column",
	width: `${2 * (100 / 3)}%` /* Double since its half the container */,
};

export const titleContainerStyle: React.CSSProperties = {
	width: "100%",

	marginBottom: "2%",
	display: "flex",
	alignItems: "center",
};

export const titleHeadingStyle = (_colour: string): React.CSSProperties => ({
	textAlign: "left",
	margin: 0,

	fontSize: "2.5rem",
	fontWeight: "100",
	color: _colour,
	[":hover" as any]: { color: "red" },
});

export const textBodyContainerStyle: React.CSSProperties = {
	height: "100%",
	marginBottom: "1%",
	display: "flex",
	alignItems: "flex-start",
	fontSize: "1.5rem",
	textAlign: "left",
};

export const textBodyContentStyle: React.CSSProperties = {
	textAlign: "left",

	margin: 0,
};

export const rightBodyColumnStyle: React.CSSProperties = {
	height: "inherit",
	margin: "0 1%",
	flexGrow: 1,
	display: "flex",
	width: "100%",
	alignContent: "center",

	justifyContent: "center",
	alignItems: "center",
};

export const rightBodyGridStyle: React.CSSProperties = {
	width: "100%",
	display: "grid",
	alignItems: "center",
	alignContent: "center",

	textAlign: "center",
};

export const gridItemStyle: React.CSSProperties = {
	height: "100%",
	width: "100%",

	justifyContent: "center",
	alignContent: "center",

	alignItems: "center",
};
