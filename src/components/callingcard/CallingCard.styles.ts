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
