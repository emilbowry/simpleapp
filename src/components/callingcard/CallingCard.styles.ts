// src/components/callingcard/CallingCard.styles.ts

import React from "react";
import { borderGrad } from "../../styles";
const GridBodyStyle: React.CSSProperties = {
	borderImage: borderGrad,
	display: "grid",
};

const GridItemStyle: React.CSSProperties = {
	height: "100%",
	width: "100%",
	margin: 0,
	padding: 0,
};
const containerStyle: React.CSSProperties = {
	position: "relative",
	display: "flex",
	zIndex: 10,
	flexDirection: "column",
	height: "100%",
};

const SideBarOverlapStyle: React.CSSProperties = {
	paddingBottom: "20%",
	marginBottom: "-20%",
	zIndex: 10,
};
const SideBarFullOverlapStyle: React.CSSProperties = {
	...SideBarOverlapStyle,
	paddingTop: "66%",
	marginTop: "-66%",
	zIndex: 5,
};

export {
	containerStyle,
	GridBodyStyle,
	GridItemStyle,
	SideBarFullOverlapStyle,
	SideBarOverlapStyle,
};
