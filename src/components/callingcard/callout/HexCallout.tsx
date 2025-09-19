// src/components/callingcard/callout/hexCallout.tsx

import React from "react";
import { BoxedImage } from "../../../utils/reactUtils";

import bulb from "../../../assets/bulb.svg";
import minimal_bulb from "../../../assets/simplebulb.svg";
import minimal_target from "../../../assets/bullseye.svg";
import target from "../../../assets/target.svg";

import minimal_pencil from "../../../assets/pencil.svg";
import pencil from "../../../assets/pen.svg";

export const hexCallStyle: React.CSSProperties = {
	display: "flex",
	width: "100%",
	minWidth: 0,
	minHeight: 0,
	margin: "0 auto",
	marginTop: "-15%",
};

export const imageStyling: React.CSSProperties = {
	marginTop: "-10%",
	marginBottom: "10%",
};

export const titleStyle: React.CSSProperties = {
	fontSize: "2rem",
	fontWeight: "400",
	textAlign: "center",
	margin: "1%",
};

export const footerStyle: React.CSSProperties = {
	fontSize: "1.5rem",
	textAlign: "center",
};
