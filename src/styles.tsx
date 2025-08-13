import React, { useEffect } from "react";
import backgroundPattern from "./assets/bavkground.png";
import bg_m from "./assets/bg_mirror.png";

export const BackgroundStyle: React.CSSProperties = {
	backgroundImage: `url(${backgroundPattern})`,

	backgroundRepeat: "repeat",
	backgroundPosition: "center",
	backgroundSize: "cover", // Or '100px 100px' as discussed for specific tile size
	backgroundAttachment: "fixed",

	zIndex: -1, // z-index in React style objects is a number, not a string "-1"

	backgroundColor: "#f0f0f0",
	paddingBottom: "100px",
};
