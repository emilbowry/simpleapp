// src/components/callingcard/CallingCard.styles.ts

import React from "react";
import { borderGrad } from "../../styles";
export const GridBodyStyle: React.CSSProperties = {
	borderImage: borderGrad,
	display: "grid",
};

export const GridItemStyle: React.CSSProperties = {
	height: "100%",
	width: "100%",
	margin: 0,
	padding: 0,
};
export const containerStyle: React.CSSProperties = {
	position: "relative",
	display: "flex",
	zIndex: 10,
	flexDirection: "column",
	height: "100%",
};
export const NewCallingCardOverlapStyle: React.CSSProperties = {
	paddingBottom: "20%",
	marginBottom: "-20%",
	paddingTop: "66%",
	marginTop: "-66%",
	zIndex: 5,
};
